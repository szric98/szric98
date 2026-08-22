"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const EARTH_ROTATION_SPEED = 0.05;
const CLOUD_ROTATION_MULTIPLIER = 1.1;
const TEXTURE_BASE = "/textures/earth";
const MAX_RENDER_SIZE = 1024;
const DRAG_SENSITIVITY = 0.005;
const MAX_POLAR_TILT = 1.1;

/** Smoothstep half-width for the terminator, in n·l units (~7°). */
const TWILIGHT_WIDTH = 0.12;
const SUN_INTENSITY = 2.8;
const AMBIENT_INTENSITY = 0.08;
const EMISSIVE_INTENSITY = 2.2;
const SPECULAR_SHININESS = 25;
const DAY_CLOUD_OPACITY = 0.8;
const NIGHT_CLOUD_OPACITY = 0.22;

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
    gl_FragColor = vec4(0.35, 0.65, 1.0, 1.0) * intensity;
  }
`;

const earthVertexShader = /* glsl */ `
  attribute vec4 tangent;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldTangent;
  varying vec3 vWorldBitangent;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    mat3 worldMatrix = mat3(modelMatrix);
    vWorldNormal = normalize(worldMatrix * normal);
    vWorldTangent = normalize(worldMatrix * tangent.xyz);
    vWorldBitangent = normalize(
      cross(vWorldNormal, vWorldTangent) * tangent.w
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D normalMap;
  uniform sampler2D specularMap;
  uniform vec3 sunDirection;
  uniform vec2 normalScale;
  uniform float twilightWidth;
  uniform float sunIntensity;
  uniform float ambientIntensity;
  uniform vec3 emissiveColor;
  uniform float emissiveIntensity;
  uniform float shininess;
  uniform vec3 specularColor;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldTangent;
  varying vec3 vWorldBitangent;
  varying vec3 vWorldPosition;

  void main() {
    vec3 geometricNormal = normalize(vWorldNormal);
    vec3 tangent = normalize(vWorldTangent);
    vec3 bitangent = normalize(vWorldBitangent);

    vec3 mapNormal = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
    mapNormal.xy *= normalScale;
    vec3 normal = normalize(
      mat3(tangent, bitangent, geometricNormal) * mapNormal
    );

    vec3 sunDir = normalize(sunDirection);
    float dayFactor = smoothstep(
      -twilightWidth,
      twilightWidth,
      dot(geometricNormal, sunDir)
    );
    float diffuse = max(dot(normal, sunDir), 0.0);

    vec3 dayColor = texture2D(dayMap, vUv).rgb;
    vec3 nightColor = texture2D(nightMap, vUv).rgb;
    vec3 albedo = mix(nightColor, dayColor, dayFactor);

    vec3 lit = albedo * (ambientIntensity + sunIntensity * diffuse);

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 halfDir = normalize(sunDir + viewDir);
    float specMask = texture2D(specularMap, vUv).r;
    float spec = pow(max(dot(normal, halfDir), 0.0), shininess) * specMask * diffuse;
    vec3 specular = specularColor * spec * sunIntensity;

    vec3 emissive =
      nightColor * emissiveColor * emissiveIntensity * (1.0 - dayFactor);

    vec3 color = lit + specular + emissive;

    #ifdef TONE_MAPPING
      color = toneMapping(color);
    #endif

    gl_FragColor = linearToOutputTexel(vec4(color, 1.0));
  }
`;

const cloudVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cloudFragmentShader = /* glsl */ `
  uniform sampler2D cloudMap;
  uniform vec3 sunDirection;
  uniform float twilightWidth;
  uniform float dayOpacity;
  uniform float nightOpacity;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 sunDir = normalize(sunDirection);
    float facing = dot(normal, sunDir);
    float dayFactor = smoothstep(-twilightWidth, twilightWidth, facing);

    vec4 cloud = texture2D(cloudMap, vUv);
    float alpha = cloud.a * mix(nightOpacity, dayOpacity, dayFactor);
    float light = 0.35 + 0.65 * max(facing, 0.0);
    vec3 color = cloud.rgb * light;

    #ifdef TONE_MAPPING
      color = toneMapping(color);
    #endif

    gl_FragColor = linearToOutputTexel(vec4(color, alpha));
  }
`;

function loadTexture(
  path: string,
  colorSpace: THREE.ColorSpace = THREE.NoColorSpace,
): Promise<THREE.Texture> {
  const loader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (texture) => {
        texture.colorSpace = colorSpace;
        texture.anisotropy = 4;
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

function wrapRadians(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

/**
 * NOAA solar-calculator approximation: subsolar latitude is the
 * declination (Earth's axial tilt), longitude follows UTC + equation of time.
 */
function getSubsolarPoint(date: Date): { lat: number; lon: number } {
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600 +
    date.getUTCMilliseconds() / 3_600_000;

  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const dayOfYear = (date.getTime() - yearStart) / 86_400_000 + 1;
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + (utcHours - 12) / 24);

  const eqTimeMinutes =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const declination =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const longitude = wrapRadians(
    THREE.MathUtils.degToRad(-15 * (utcHours - 12) - eqTimeMinutes / 4),
  );

  return { lat: declination, lon: longitude };
}

/**
 * Object-space sun direction for Three's SphereGeometry + equirectangular maps:
 * +Y is north, +X is lon 0°, +Z is lon 90°W.
 */
function setSunDirectionFromDate(date: Date, target: THREE.Vector3): void {
  const { lat, lon } = getSubsolarPoint(date);
  const cosLat = Math.cos(lat);
  target
    .set(cosLat * Math.cos(lon), Math.sin(lat), -cosLat * Math.sin(lon))
    .normalize();
}

function formatUtcTimestamp(date: Date): string {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

function EarthLiveCaption() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <p className="label-meta mt-4 text-center text-muted tabular-nums">
      <time dateTime={now?.toISOString()}>
        {now ? formatUtcTimestamp(now) : "----.--.--T--:--:--Z"}
      </time>
      <span className="text-muted/50"> · </span>
      <span className="inline-flex items-center gap-1.5 text-star-bright">
        <span
          className="size-1.5 shrink-0 rounded-full bg-red-600"
          aria-hidden
        />
        LIVE
      </span>
    </p>
  );
}

export function HeroEarth({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let visible = !document.hidden;
    let animationFrameId = 0;
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let timer: THREE.Timer | undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.08, 3.35);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "none";
    container.appendChild(canvas);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.y = 4;
    earthGroup.rotation.x = 0.25;
    scene.add(earthGroup);

    const sunDirectionLocal = new THREE.Vector3();
    const sunDirectionWorld = new THREE.Vector3();
    setSunDirectionFromDate(new Date(), sunDirectionLocal);

    const disposables: Array<
      THREE.BufferGeometry | THREE.Material | THREE.Texture
    > = [];

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      isDragging = true;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousPointerX;
      const deltaY = event.clientY - previousPointerY;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;

      earthGroup.rotation.y += deltaX * DRAG_SENSITIVITY;
      earthGroup.rotation.x = THREE.MathUtils.clamp(
        earthGroup.rotation.x + deltaY * DRAG_SENSITIVITY,
        -MAX_POLAR_TILT,
        MAX_POLAR_TILT,
      );
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const onVisibilityChange = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width < 2 || height < 2) return;

      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      const renderW = Math.min(width, MAX_RENDER_SIZE);
      const renderH = Math.min(height, MAX_RENDER_SIZE);

      camera.aspect = renderW / renderH;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(renderW, renderH, false);
    };

    void (async () => {
      try {
        const [dayMap, nightMap, normalMap, specularMap, cloudMap] =
          await Promise.all([
            loadTexture(`${TEXTURE_BASE}/day.jpg`, THREE.SRGBColorSpace),
            loadTexture(`${TEXTURE_BASE}/night.jpg`, THREE.SRGBColorSpace),
            loadTexture(`${TEXTURE_BASE}/normal.jpg`),
            loadTexture(`${TEXTURE_BASE}/specular.jpg`),
            loadTexture(`${TEXTURE_BASE}/clouds.png`, THREE.SRGBColorSpace),
          ]);

        if (disposed) {
          for (const texture of [
            dayMap,
            nightMap,
            normalMap,
            specularMap,
            cloudMap,
          ]) {
            texture.dispose();
          }
          return;
        }

        disposables.push(dayMap, nightMap, normalMap, specularMap, cloudMap);

        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        earthGeometry.computeTangents();
        disposables.push(earthGeometry);

        const earthMaterial = new THREE.ShaderMaterial({
          uniforms: {
            dayMap: { value: dayMap },
            nightMap: { value: nightMap },
            normalMap: { value: normalMap },
            specularMap: { value: specularMap },
            sunDirection: { value: sunDirectionWorld },
            normalScale: { value: new THREE.Vector2(0.85, 0.85) },
            twilightWidth: { value: TWILIGHT_WIDTH },
            sunIntensity: { value: SUN_INTENSITY },
            ambientIntensity: { value: AMBIENT_INTENSITY },
            emissiveColor: { value: new THREE.Color(0xffe0b0) },
            emissiveIntensity: { value: EMISSIVE_INTENSITY },
            shininess: { value: SPECULAR_SHININESS },
            specularColor: { value: new THREE.Color(0x333333) },
          },
          vertexShader: earthVertexShader,
          fragmentShader: earthFragmentShader,
          glslVersion: THREE.GLSL1,
        });
        disposables.push(earthMaterial);

        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earthGroup.add(earth);

        const cloudGeometry = new THREE.SphereGeometry(1.008, 64, 64);
        disposables.push(cloudGeometry);

        const cloudMaterial = new THREE.ShaderMaterial({
          uniforms: {
            cloudMap: { value: cloudMap },
            sunDirection: { value: sunDirectionWorld },
            twilightWidth: { value: TWILIGHT_WIDTH },
            dayOpacity: { value: DAY_CLOUD_OPACITY },
            nightOpacity: { value: NIGHT_CLOUD_OPACITY },
          },
          vertexShader: cloudVertexShader,
          fragmentShader: cloudFragmentShader,
          transparent: true,
          depthWrite: false,
          glslVersion: THREE.GLSL1,
        });
        disposables.push(cloudMaterial);

        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        earthGroup.add(clouds);

        const atmosphereGeometry = new THREE.SphereGeometry(1.04, 64, 64);
        disposables.push(atmosphereGeometry);

        const atmosphereMaterial = new THREE.ShaderMaterial({
          vertexShader: atmosphereVertexShader,
          fragmentShader: atmosphereFragmentShader,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
          glslVersion: THREE.GLSL1,
        });
        disposables.push(atmosphereMaterial);

        const atmosphere = new THREE.Mesh(
          atmosphereGeometry,
          atmosphereMaterial,
        );
        earthGroup.add(atmosphere);

        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        const earthTimer = new THREE.Timer();
        earthTimer.connect(document);
        timer = earthTimer;
        const cloudDriftSpeed =
          EARTH_ROTATION_SPEED * (CLOUD_ROTATION_MULTIPLIER - 1);

        const updateSun = () => {
          setSunDirectionFromDate(new Date(), sunDirectionLocal);
          earthGroup.updateMatrixWorld();
          sunDirectionWorld
            .copy(sunDirectionLocal)
            .transformDirection(earthGroup.matrixWorld);
        };

        const animate = (timestamp: number) => {
          animationFrameId = requestAnimationFrame(animate);
          earthTimer.update(timestamp);

          if (!prefersReducedMotion && visible) {
            const delta = earthTimer.getDelta();

            if (!isDragging) {
              earthGroup.rotation.y += EARTH_ROTATION_SPEED * delta;
            }

            // Clouds keep a slight relative drift whether dragging or not.
            clouds.rotation.y += cloudDriftSpeed * delta;
          }

          updateSun();
          renderer.render(scene, camera);
        };

        animate(performance.now());
      } catch (error) {
        console.error("Failed to initialize HeroEarth:", error);
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      timer?.dispose();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      resizeObserver?.disconnect();

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }

      for (const item of disposables) {
        item.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={containerRef}
        aria-hidden
        className="aspect-square cursor-grab overflow-hidden active:cursor-grabbing"
      />
      <EarthLiveCaption />
    </div>
  );
}
