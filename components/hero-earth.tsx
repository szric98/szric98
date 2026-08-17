"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const EARTH_ROTATION_SPEED = 0.05;
const CLOUD_ROTATION_MULTIPLIER = 1.1;
const TEXTURE_BASE = "/textures/earth";
const MAX_RENDER_SIZE = 1024;
const DRAG_SENSITIVITY = 0.005;
const MAX_POLAR_TILT = 1.1;

type EarthMode = "day" | "night";

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

function applyEarthMode(
  mode: EarthMode,
  material: THREE.MeshPhongMaterial,
  maps: { day: THREE.Texture; night: THREE.Texture },
  ambientLight: THREE.AmbientLight,
  sunLight: THREE.DirectionalLight,
  cloudMaterial: THREE.MeshPhongMaterial,
) {
  if (mode === "night") {
    material.map = maps.night;
    material.emissiveMap = maps.night;
    material.emissive.set(0xffe0b0);
    material.emissiveIntensity = 2.4;
    ambientLight.intensity = 0.55;
    sunLight.intensity = 0.9;
    cloudMaterial.opacity = 0.25;
  } else {
    material.map = maps.day;
    material.emissiveMap = null;
    material.emissive.set(0x000000);
    material.emissiveIntensity = 0;
    ambientLight.intensity = 0.85;
    sunLight.intensity = 3.2;
    cloudMaterial.opacity = 0.8;
  }
  material.needsUpdate = true;
}

export function HeroEarth({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<EarthMode>("night");
  const [ready, setReady] = useState(false);

  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const cloudMaterialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const mapsRef = useRef<{ day: THREE.Texture; night: THREE.Texture } | null>(
    null,
  );
  const modeRef = useRef<EarthMode>(mode);
  modeRef.current = mode;

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const earthGroup = new THREE.Group();
    earthGroup.rotation.y = 3.6;
    scene.add(earthGroup);

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
        mapsRef.current = { day: dayMap, night: nightMap };

        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        disposables.push(earthGeometry);

        const earthMaterial = new THREE.MeshPhongMaterial({
          map: nightMap,
          normalMap,
          normalScale: new THREE.Vector2(0.85, 0.85),
          specularMap,
          specular: new THREE.Color(0x333333),
          shininess: 25,
        });
        disposables.push(earthMaterial);
        materialRef.current = earthMaterial;

        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earthGroup.add(earth);

        const cloudGeometry = new THREE.SphereGeometry(1.008, 64, 64);
        disposables.push(cloudGeometry);

        const cloudMaterial = new THREE.MeshPhongMaterial({
          map: cloudMap,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        });
        disposables.push(cloudMaterial);
        cloudMaterialRef.current = cloudMaterial;

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

        applyEarthMode(
          modeRef.current,
          earthMaterial,
          mapsRef.current,
          ambientLight,
          sunLight,
          cloudMaterial,
        );

        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        setReady(true);

        const earthTimer = new THREE.Timer();
        earthTimer.connect(document);
        timer = earthTimer;
        const cloudDriftSpeed =
          EARTH_ROTATION_SPEED * (CLOUD_ROTATION_MULTIPLIER - 1);

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
      setReady(false);

      materialRef.current = null;
      cloudMaterialRef.current = null;
      ambientLightRef.current = null;
      sunLightRef.current = null;
      mapsRef.current = null;

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }

      for (const item of disposables) {
        item.dispose();
      }

      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const maps = mapsRef.current;
    const ambientLight = ambientLightRef.current;
    const sunLight = sunLightRef.current;
    const cloudMaterial = cloudMaterialRef.current;
    if (!material || !maps || !ambientLight || !sunLight || !cloudMaterial) {
      return;
    }

    applyEarthMode(mode, material, maps, ambientLight, sunLight, cloudMaterial);
  }, [mode]);

  const isNight = mode === "night";

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={containerRef}
        aria-hidden
        className="aspect-square cursor-grab overflow-hidden active:cursor-grabbing"
      />

      <div className="absolute right-1 bottom-1 z-10 sm:right-2 sm:bottom-2">
        <button
          type="button"
          disabled={!ready}
          aria-pressed={isNight}
          aria-label={
            isNight ? "Switch Earth to day mode" : "Switch Earth to night mode"
          }
          onClick={() =>
            setMode((prev) => (prev === "night" ? "day" : "night"))
          }
          className="earth-mode-switch group relative flex items-center gap-2 border border-white/20 bg-black/50 px-2 py-1.5 transition-colors hover:border-white disabled:opacity-40"
        >
          <span
            className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase transition-colors ${
              !isNight ? "text-star-bright" : "text-muted/70"
            }`}
          >
            Day
          </span>

          <span className="relative h-5 w-10 border border-white/15 bg-black/50">
            <span
              className={`absolute top-0.5 left-0.5 h-4 w-4 transition-transform duration-300 ease-out ${
                isNight
                  ? "translate-x-5 bg-hero-blue"
                  : "translate-x-0 bg-star-bright"
              }`}
            />
          </span>

          <span
            className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase transition-colors ${
              isNight ? "text-hero-blue" : "text-muted/70"
            }`}
          >
            Night
          </span>
        </button>
      </div>
    </div>
  );
}
