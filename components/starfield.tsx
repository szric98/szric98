"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const STAR_COUNT = 6000;
const STAR_SPREAD = 2000;
const STAR_COLOR = 0x57707d; // rgb(87, 112, 125)
const FAR_STAR_WORLD_SIZE = 3;
const HERO_STAR_WORLD_SIZE = 4.5;
const MAX_STAR_SIZE_CSS_PX = 24;
const HERO_STAR_COUNT = 2;
const HERO_RADII = [58, 66] as const;
const STAR_FAR_MIN = 160;
const STAR_FAR_MAX = STAR_SPREAD * 0.5;
const INNER_ROTATION_SPEED = 0.018; // rad/s — nearby stars drift right
const OUTER_ROTATION_SPEED = -0.008; // rad/s — distant stars drift left

const FAR_STAR_COUNT = STAR_COUNT - HERO_STAR_COUNT;
const RADIUS_SPAN = STAR_FAR_MAX - HERO_RADII[0];

type StarLayer = {
  positions: Float32Array;
  omegas: Float32Array;
  positionAttribute: THREE.BufferAttribute;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
};

function sampleRadius(min: number, max: number): number {
  return Math.cbrt(min ** 3 + Math.random() * (max ** 3 - min ** 3));
}

function populateHeroStars(
  positions: Float32Array,
  omegas: Float32Array,
) {
  for (let i = 0; i < HERO_STAR_COUNT; i++) {
    const radius = HERO_RADII[i];
    // Space heroes apart so they rarely share the viewport at full size.
    const theta = i * Math.PI + Math.random() * 0.4;
    const phi = Math.acos(2 * Math.random() - 1);
    const sinPhi = Math.sin(phi);

    omegas[i] = INNER_ROTATION_SPEED;

    positions[i * 3] = radius * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
}

function populateFarStars(
  positions: Float32Array,
  omegas: Float32Array,
  count: number,
) {
  for (let i = 0; i < count; i++) {
    const radius = sampleRadius(STAR_FAR_MIN, STAR_FAR_MAX);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const sinPhi = Math.sin(phi);

    omegas[i] = THREE.MathUtils.lerp(
      INNER_ROTATION_SPEED,
      OUTER_ROTATION_SPEED,
      (radius - HERO_RADII[0]) / RADIUS_SPAN,
    );

    positions[i * 3] = radius * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
}

function createStarMaterial(
  worldSize: number,
  maxStarSize: { value: number },
): THREE.PointsMaterial {
  const material = new THREE.PointsMaterial({
    color: STAR_COLOR,
    size: worldSize,
    sizeAttenuation: true,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.maxStarSize = maxStarSize;
    shader.vertexShader = `uniform float maxStarSize;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      `#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif`,
      `#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	gl_PointSize = min( gl_PointSize, maxStarSize );`,
    );
  };

  material.customProgramCacheKey = () => `starfield-capped-${worldSize}`;

  return material;
}

function createHeroStarLayer(maxStarSize: { value: number }): StarLayer {
  const positions = new Float32Array(HERO_STAR_COUNT * 3);
  const omegas = new Float32Array(HERO_STAR_COUNT);
  populateHeroStars(positions, omegas);

  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionAttribute);

  const material = createStarMaterial(HERO_STAR_WORLD_SIZE, maxStarSize);
  const points = new THREE.Points(geometry, material);

  return {
    positions,
    omegas,
    positionAttribute,
    geometry,
    material,
    points,
  };
}

function createFarStarLayer(maxStarSize: { value: number }): StarLayer {
  const positions = new Float32Array(FAR_STAR_COUNT * 3);
  const omegas = new Float32Array(FAR_STAR_COUNT);
  populateFarStars(positions, omegas, FAR_STAR_COUNT);

  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionAttribute);

  const material = createStarMaterial(FAR_STAR_WORLD_SIZE, maxStarSize);
  const points = new THREE.Points(geometry, material);

  return {
    positions,
    omegas,
    positionAttribute,
    geometry,
    material,
    points,
  };
}

function rotateStars(
  layer: StarLayer,
  count: number,
  delta: number,
) {
  const { positions, omegas, positionAttribute } = layer;

  for (let i = 0; i < count; i++) {
    const omega = omegas[i] * delta;
    const cosO = Math.cos(omega);
    const sinO = Math.sin(omega);
    const x = positions[i * 3];
    const z = positions[i * 3 + 2];

    positions[i * 3] = x * cosO + z * sinO;
    positions[i * 3 + 2] = -x * sinO + z * cosO;
  }

  positionAttribute.needsUpdate = true;
}

export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090f1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      STAR_FAR_MAX * 2,
    );
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const maxStarSize = {
      value: MAX_STAR_SIZE_CSS_PX * renderer.getPixelRatio(),
    };

    const heroStars = createHeroStarLayer(maxStarSize);
    const farStars = createFarStarLayer(maxStarSize);

    scene.add(farStars.points);
    scene.add(heroStars.points);

    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(clientWidth, clientHeight);
      maxStarSize.value = MAX_STAR_SIZE_CSS_PX * renderer.getPixelRatio();
    };

    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const delta = clock.getDelta();
        rotateStars(heroStars, HERO_STAR_COUNT, delta);
        rotateStars(farStars, FAR_STAR_COUNT, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);

      for (const layer of [heroStars, farStars]) {
        layer.geometry.dispose();
        layer.material.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
