"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as topojson from "topojson-client";

const ACID = 0xc0fc04;

function latLon(lat: number, lon: number, r = 1): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

// Arc endpoint cities (indexed by ARC_PAIRS)
const CITIES: [number, number][] = [
  [40.71,  -74.01],  // 0  New York
  [51.51,   -0.13],  // 1  London
  [35.68,  139.65],  // 2  Tokyo
  [37.77, -122.42],  // 3  San Francisco
  [ 1.35,  103.82],  // 4  Singapore
  [-33.87, 151.21],  // 5  Sydney
  [25.20,   55.27],  // 6  Dubai
  [-23.55, -46.63],  // 7  São Paulo
  [19.08,   72.88],  // 8  Mumbai
  [48.86,    2.35],  // 9  Paris
];

const ARC_PAIRS: [number, number][] = [
  [0, 1], [1, 9], [0, 7], [2, 4], [4, 5], [1, 6],
  [6, 8], [3, 4], [0, 9], [1, 2], [0, 2], [3, 7],
  [5, 6], [1, 8], [2, 5], [0, 6], [7, 9], [3, 6],
  [8, 4], [9, 6],
];

// Population density: [lat, lon, density 0–1]
// density drives dot size tier and glow intensity
const POPULATION: [number, number, number][] = [
  // East Asia
  [31.23, 121.47, 1.00], // Shanghai
  [39.91, 116.39, 0.95], // Beijing
  [35.68, 139.69, 0.95], // Tokyo
  [22.54, 114.06, 0.90], // Shenzhen
  [23.13, 113.26, 0.90], // Guangzhou
  [37.57, 126.98, 0.88], // Seoul
  [22.28, 114.16, 0.85], // Hong Kong
  [34.69, 135.50, 0.82], // Osaka
  [30.59, 114.31, 0.80], // Wuhan
  [29.56, 106.55, 0.78], // Chongqing
  [30.66, 104.07, 0.75], // Chengdu
  [30.27, 120.15, 0.75], // Hangzhou
  [32.06, 118.79, 0.72], // Nanjing
  [34.27, 108.95, 0.68], // Xi'an
  [36.06, 120.38, 0.65], // Qingdao
  [41.80, 123.43, 0.62], // Shenyang
  [26.07, 119.30, 0.65], // Fuzhou
  // South Asia
  [28.61,  77.23, 0.95], // Delhi
  [19.08,  72.88, 0.92], // Mumbai
  [22.57,  88.36, 0.88], // Kolkata
  [23.73,  90.40, 0.88], // Dhaka
  [24.86,  67.01, 0.82], // Karachi
  [12.97,  77.59, 0.80], // Bangalore
  [13.08,  80.27, 0.75], // Chennai
  [17.38,  78.49, 0.74], // Hyderabad
  [31.55,  74.34, 0.70], // Lahore
  [27.70,  85.31, 0.60], // Kathmandu
  // Southeast Asia
  [-6.21, 106.85, 0.85], // Jakarta
  [14.60, 120.98, 0.80], // Manila
  [13.75, 100.52, 0.76], // Bangkok
  [10.82, 106.63, 0.74], // Ho Chi Minh
  [ 1.35, 103.82, 0.80], // Singapore
  [21.03, 105.85, 0.68], // Hanoi
  [ 3.14, 101.69, 0.65], // Kuala Lumpur
  [16.87,  96.19, 0.60], // Yangon
  // Europe
  [51.51,  -0.13, 0.85], // London
  [55.75,  37.62, 0.82], // Moscow
  [48.86,   2.35, 0.80], // Paris
  [41.01,  28.95, 0.78], // Istanbul
  [52.52,  13.40, 0.75], // Berlin
  [41.90,  12.50, 0.70], // Rome
  [40.42,  -3.70, 0.70], // Madrid
  [52.37,   4.90, 0.68], // Amsterdam
  [59.95,  30.32, 0.66], // St. Petersburg
  [50.85,   4.35, 0.65], // Brussels
  [48.14,  11.58, 0.65], // Munich
  [52.23,  21.01, 0.64], // Warsaw
  [47.38,   8.54, 0.60], // Zurich
  [48.21,  16.37, 0.60], // Vienna
  [37.98,  23.73, 0.60], // Athens
  // North America — US Northeast corridor
  [40.71,  -74.01, 0.92], // New York
  [42.36,  -71.06, 0.78], // Boston
  [39.95,  -75.17, 0.76], // Philadelphia
  [38.91,  -77.04, 0.74], // Washington DC
  [39.30,  -76.61, 0.66], // Baltimore
  [40.44,  -79.99, 0.64], // Pittsburgh
  [41.50,  -81.69, 0.63], // Cleveland
  [42.89,  -78.87, 0.60], // Buffalo
  [41.76,  -72.68, 0.58], // Hartford
  [41.82,  -71.41, 0.57], // Providence
  [37.54,  -77.43, 0.60], // Richmond
  // US Southeast
  [33.75,  -84.39, 0.76], // Atlanta
  [25.77,  -80.19, 0.70], // Miami
  [35.23,  -80.84, 0.65], // Charlotte
  [35.78,  -78.64, 0.62], // Raleigh
  [36.17,  -86.78, 0.62], // Nashville
  [30.33,  -81.66, 0.60], // Jacksonville
  [27.95,  -82.46, 0.62], // Tampa
  [28.54,  -81.38, 0.60], // Orlando
  [29.95,  -90.07, 0.62], // New Orleans
  [32.36,  -86.30, 0.56], // Montgomery
  [35.15,  -90.05, 0.57], // Memphis
  [33.52,  -86.80, 0.60], // Birmingham
  // US Midwest
  [41.88,  -87.63, 0.84], // Chicago
  [39.10,  -94.58, 0.64], // Kansas City
  [38.63,  -90.20, 0.64], // St. Louis
  [39.96,  -82.99, 0.63], // Columbus
  [39.77,  -86.16, 0.62], // Indianapolis
  [42.33,  -83.05, 0.66], // Detroit
  [43.05,  -76.15, 0.58], // Syracuse
  [44.98,  -93.27, 0.64], // Minneapolis
  [43.04,  -87.91, 0.60], // Milwaukee
  [41.25,  -95.93, 0.58], // Omaha
  // US South / Texas
  [29.76,  -95.37, 0.80], // Houston
  [32.78,  -96.80, 0.74], // Dallas
  [29.42, -98.49, 0.66],  // San Antonio
  [30.27,  -97.74, 0.68], // Austin
  [35.47, -97.51, 0.60],  // Oklahoma City
  [32.45, -99.73, 0.55],  // Abilene area
  [31.75, -106.49, 0.56], // El Paso
  [20.97,  -89.62, 0.64], // Mérida
  [20.67, -103.35, 0.68], // Guadalajara
  [25.67, -100.31, 0.66], // Monterrey
  [19.43,  -99.13, 0.88], // Mexico City
  // US West
  [37.77, -122.42, 0.78], // San Francisco
  [34.05, -118.24, 0.88], // Los Angeles
  [32.72, -117.16, 0.70], // San Diego
  [33.45, -112.07, 0.66], // Phoenix
  [36.17, -115.14, 0.64], // Las Vegas
  [36.75, -119.77, 0.62], // Fresno
  [38.58, -121.49, 0.62], // Sacramento
  [47.61, -122.33, 0.68], // Seattle
  [45.52, -122.68, 0.64], // Portland
  [40.76, -111.89, 0.60], // Salt Lake City
  [39.74, -104.98, 0.62], // Denver
  [35.08, -106.65, 0.57], // Albuquerque
  [43.61, -116.20, 0.55], // Boise
  // Canada
  [43.65,  -79.38, 0.74], // Toronto
  [49.25, -123.12, 0.66], // Vancouver
  [45.51,  -73.55, 0.66], // Montreal
  [51.05, -114.07, 0.60], // Calgary
  [53.55, -113.49, 0.58], // Edmonton
  [45.42,  -75.70, 0.58], // Ottawa
  [49.90,  -97.14, 0.54], // Winnipeg
  [46.82,  -71.22, 0.54], // Quebec City
  // South America
  [-23.55, -46.63, 0.86], // São Paulo
  [-22.91, -43.17, 0.80], // Rio
  [-34.61, -58.38, 0.80], // Buenos Aires
  [  4.71, -74.07, 0.70], // Bogotá
  [-12.05, -77.04, 0.65], // Lima
  [-33.45, -70.67, 0.64], // Santiago
  [-15.78, -47.93, 0.58], // Brasília
  [ 10.48, -66.88, 0.58], // Caracas
  // Middle East / Africa
  [30.06,  31.25, 0.80], // Cairo
  [25.20,  55.27, 0.76], // Dubai
  [35.69,  51.42, 0.72], // Tehran
  [24.69,  46.72, 0.70], // Riyadh
  [33.34,  44.40, 0.65], // Baghdad
  [32.08,  34.78, 0.62], // Tel Aviv
  [ 6.45,   3.39, 0.76], // Lagos
  [-26.20,  28.04, 0.66], // Johannesburg
  [ 9.02,  38.75, 0.60], // Addis Ababa
  [-1.29,  36.82, 0.58], // Nairobi
  [-4.32,  15.32, 0.58], // Kinshasa
  [36.74,   3.06, 0.55], // Algiers
  [-33.93,  18.42, 0.55], // Cape Town
  // Australia
  [-33.87, 151.21, 0.70], // Sydney
  [-37.81, 144.96, 0.66], // Melbourne
  [-27.47, 153.03, 0.55], // Brisbane
];

export function GlobeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const SIZE = mount.clientWidth || 500;

    // ── Scene ──────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    // ── Base sphere ────────────────────────────────────────────────
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.997, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x05050a }),
    ));

    // ── Atmosphere halo ────────────────────────────────────────────
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.04, 32, 32),
      new THREE.MeshBasicMaterial({
        color: ACID, transparent: true, opacity: 0.04, side: THREE.BackSide,
      }),
    ));

    // ── Country outlines ──────────────────────────────────────────
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then((topo: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countries = topojson.feature(topo as any, (topo.objects as any).countries) as any;
        const lineMat   = new THREE.LineBasicMaterial({ color: ACID, transparent: true, opacity: 0.4 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        countries.features.forEach((feat: Record<string, unknown>) => {
          const geom = feat.geometry;
          if (!geom) return;
          const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
          polys.forEach((poly: number[][][]) => {
            poly.forEach((ring: number[][]) => {
              const pts: THREE.Vector3[] = [];
              ring.forEach(([ln, lt]: number[], i: number) => {
                if (i > 0 && Math.abs(ln - ring[i - 1][0]) > 180) {
                  if (pts.length > 1) globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
                  pts.length = 0;
                }
                pts.push(latLon(lt, ln, 1.002));
              });
              if (pts.length > 1) globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
            });
          });
        });
      });

    // ── Scatter clusters around population centers ────────────────
    function scatter(
      lat: number, lon: number, density: number,
      count: number, spreadDeg: number
    ): [number, number, number][] {
      return Array.from({ length: count }, () => {
        // Gaussian spread so dots cluster toward the center
        const u = Math.random() || 1e-10;
        const v = Math.random();
        const r = Math.sqrt(-2 * Math.log(u));
        return [
          lat + r * Math.cos(2 * Math.PI * v) * spreadDeg,
          lon + r * Math.sin(2 * Math.PI * v) * spreadDeg,
          density * (0.65 + Math.random() * 0.35),
        ] as [number, number, number];
      });
    }

    const CLUSTERS: [number, number, number][] = POPULATION.flatMap(([la, lo, d]) => {
      if (d >= 0.90) return scatter(la, lo, d, 28, 2.0);
      if (d >= 0.85) return scatter(la, lo, d, 18, 1.6);
      if (d >= 0.65) return scatter(la, lo, d, 10, 1.2);
      return             scatter(la, lo, d,  5, 0.8);
    });

    // ── Circular glow textures ────────────────────────────────────
    function makeGlowTex(sharpness: number): THREE.Texture {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0,          `rgba(192,252,4,1)`);
      g.addColorStop(sharpness,  `rgba(192,252,4,0.6)`);
      g.addColorStop(1,          `rgba(192,252,4,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }

    const coreTex = makeGlowTex(0.25);  // tight bright core
    const glowTex = makeGlowTex(0.08);  // wide soft halo

    // ── Population density layer ───────────────────────────────────
    const mega = CLUSTERS.filter(d => d[2] >= 0.88);
    const high = CLUSTERS.filter(d => d[2] >= 0.75 && d[2] < 0.88);
    const mid  = CLUSTERS.filter(d => d[2] >= 0.55 && d[2] < 0.75);
    const low  = CLUSTERS.filter(d => d[2] < 0.55);

    function makePoints(dots: [number, number, number][], size: number, opacity: number, tex: THREE.Texture, additive = false): THREE.Points {
      const pos = new Float32Array(dots.flatMap(([la, lo]) => { const v = latLon(la, lo, 1.009); return [v.x, v.y, v.z]; }));
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({
        map: tex, color: ACID, size, sizeAttenuation: true,
        transparent: true, opacity, depthWrite: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      }));
    }

    // Cores — sharp circular dots
    globe.add(makePoints(high, 0.048, 1.00, coreTex));
    globe.add(makePoints(mid,  0.026, 0.85, coreTex));
    globe.add(makePoints(low,  0.014, 0.65, coreTex));

    // Glow halos — soft circular bloom, additive so they stack
    const glowHigh = makePoints(high, 0.160, 0.18, glowTex, true);
    const glowMid  = makePoints(mid,  0.090, 0.12, glowTex, true);
    const glowMega = makePoints(mega, 0.280, 0.10, glowTex, true);
    globe.add(glowHigh);
    globe.add(glowMid);
    globe.add(glowMega);

    // ── Arc connection cities ─────────────────────────────────────
    const cityVecs = CITIES.map(([la, lo]) => latLon(la, lo, 1.009));

    // ── Connection arcs ───────────────────────────────────────────
    interface ArcState { curve: THREE.QuadraticBezierCurve3; t: number; speed: number; }
    const arcs: ArcState[] = ARC_PAIRS.map(([a, b]) => {
      const p1  = cityVecs[a].clone();
      const p2  = cityVecs[b].clone();
      const mid = p1.clone().add(p2).normalize().multiplyScalar(1.18 + Math.random() * 0.06);
      return { curve: new THREE.QuadraticBezierCurve3(p1, mid, p2), t: Math.random(), speed: 0.0018 + Math.random() * 0.001 };
    });

    arcs.forEach(({ curve }) => {
      globe.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
        new THREE.LineBasicMaterial({ color: ACID, transparent: true, opacity: 0.18 }),
      ));
    });

    const dotGeo  = new THREE.SphereGeometry(0.012, 8, 8);
    const arcDots = arcs.map(() => {
      const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: ACID }));
      globe.add(dot);
      return dot;
    });

    // ── Initial orientation ───────────────────────────────────────
    // Center lon = -90 - (rotation.y × 57.3°).
    // -1.2 → center ≈ lon -21° (South Atlantic, SA left / Africa right).
    globe.rotation.y = -1.2;
    globe.rotation.x = 0.18;

    // ── Drag to rotate ────────────────────────────────────────────
    const MAX_TILT = Math.PI / 2.2;
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let autoRotate = false; // stays false until section scrolls into view
    let hasActivated = false;
    let velX = 0, velY = 0;

    // Start spinning once the globe section enters the viewport
    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasActivated) {
          autoRotate = true;
          hasActivated = true;
          scrollObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    scrollObserver.observe(mount);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true; autoRotate = false;
      prevX = e.clientX; prevY = e.clientY;
      velX = 0; velY = 0;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerUp   = () => { isDragging = false; if (hasActivated) autoRotate = true; renderer.domElement.style.cursor = "grab"; };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      velX = (e.clientX - prevX) * 0.005; velY = (e.clientY - prevY) * 0.005;
      prevX = e.clientX; prevY = e.clientY;
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup",   onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // ── Animate ───────────────────────────────────────────────────
    let frameId: number;
    let glowT = 0;

    const tick = () => {
      frameId = requestAnimationFrame(tick);

      if (autoRotate) globe.rotation.y += 0.0018;
      globe.rotation.y += velX;
      globe.rotation.x  = Math.max(-MAX_TILT, Math.min(MAX_TILT, globe.rotation.x + velY));
      velX *= 0.88; velY *= 0.88;

      // Breathe the glow halos
      glowT += 0.018;
      (glowMega.material as THREE.PointsMaterial).opacity = 0.08 + Math.sin(glowT)        * 0.06;
      (glowHigh.material as THREE.PointsMaterial).opacity = 0.14 + Math.sin(glowT + 0.6)  * 0.08;
      (glowMid.material  as THREE.PointsMaterial).opacity = 0.09 + Math.sin(glowT + 1.4)  * 0.05;

      arcs.forEach((arc, i) => {
        arc.t = (arc.t + arc.speed) % 1;
        arcDots[i].position.copy(arc.curve.getPoint(arc.t));
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      scrollObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup",   onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
