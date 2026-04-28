"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PALETTE = [
  new THREE.Color("#1A8FFF"),
  new THREE.Color("#00E5CC"),
  new THREE.Color("#9B5FE3"),
  new THREE.Color("#AAFF00"),
  new THREE.Color("#FF5500"),
  new THREE.Color("#FF2D78"),
];

export function ThreeWaveBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 2000);
    camera.position.set(0, 35, 90);
    camera.lookAt(0, 0, 0);

    const COLS = 70;
    const ROWS = 70;
    const SPACING = 2.2;

    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const idx = i * COLS + j;
        const x = (j - COLS / 2) * SPACING;
        const z = (i - ROWS / 2) * SPACING;
        baseX[idx] = x;
        baseZ[idx] = z;
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;
        const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });

    const pointsMesh = new THREE.Points(geo, mat);
    scene.add(pointsMesh);

    let raf: number;
    let time = 0;
    const pos = geo.attributes.position.array as Float32Array;

    const animate = () => {
      time += 0.008;
      for (let i = 0; i < count; i++) {
        const x = baseX[i];
        const z = baseZ[i];
        pos[i * 3 + 1] =
          Math.sin(x * 0.22 + time) * Math.cos(z * 0.22 + time * 0.7) * 4 +
          Math.sin((x + z) * 0.12 + time * 1.3) * 1.5;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const W2 = window.innerWidth;
      const H2 = window.innerHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
