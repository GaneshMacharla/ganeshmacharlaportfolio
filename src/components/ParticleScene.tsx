import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-page WebGL background: one particle cloud that morphs between six
 * sculptures as the visitor scrolls through the page sections.
 *
 *   0 core    (home)        – pulsing energy sphere
 *   1 knot    (about)       – neural torus knot
 *   2 lattice (skills)      – 3D grid of nodes
 *   3 wave    (projects)    – animated sound wave (voice agents)
 *   4 helix   (experience)  – DNA double helix
 *   5 galaxy  (contact)     – spiral galaxy
 */

const SECTION_SHAPES: Array<[id: string, shape: number]> = [
  ['home', 0],
  ['about', 1],
  ['skills', 2],
  ['projects', 3],
  ['experience', 4],
  ['achievements', 4],
  ['contact', 5],
];

type ShapeFn = (i: number, n: number, out: Float32Array, o: number) => void;

const TAU = Math.PI * 2;
const rand = (a = -1, b = 1) => a + Math.random() * (b - a);

const core: ShapeFn = (i, n, out, o) => {
  // 75% on a shell (fibonacci sphere), 25% in a dense inner core
  if (i % 4 !== 0) {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    const r = 1.75 + rand(-0.04, 0.04);
    out[o] = r * Math.cos(theta) * Math.sin(phi);
    out[o + 1] = r * Math.sin(theta) * Math.sin(phi);
    out[o + 2] = r * Math.cos(phi);
  } else {
    const r = Math.pow(Math.random(), 2.2) * 0.9;
    const u = rand();
    const t = rand(0, TAU);
    const s = Math.sqrt(1 - u * u);
    out[o] = r * s * Math.cos(t);
    out[o + 1] = r * s * Math.sin(t);
    out[o + 2] = r * u;
  }
};

const knot: ShapeFn = (i, n, out, o) => {
  const t = (i / n) * TAU;
  const p = 2;
  const q = 3;
  const r = 1.15 + 0.45 * Math.cos(q * t);
  const cx = r * Math.cos(p * t);
  const cy = r * Math.sin(p * t);
  const cz = 0.55 * Math.sin(q * t);
  const spread = 0.16;
  out[o] = cx + rand(-spread, spread);
  out[o + 1] = cy + rand(-spread, spread);
  out[o + 2] = cz + rand(-spread, spread);
};

const lattice: ShapeFn = (i, _n, out, o) => {
  // points travel along the edges of a 5x5x5 grid
  const g = 5;
  const size = 2.6;
  const step = size / (g - 1);
  const axis = i % 3;
  const a = Math.floor(Math.random() * g) * step - size / 2;
  const b = Math.floor(Math.random() * g) * step - size / 2;
  const c = rand(-size / 2, size / 2);
  const j = 0.015;
  const v = [a + rand(-j, j), b + rand(-j, j), c];
  out[o] = v[axis];
  out[o + 1] = v[(axis + 1) % 3];
  out[o + 2] = v[(axis + 2) % 3];
};

const wave: ShapeFn = (i, n, out, o) => {
  // flat ribbon; the vertical motion is animated in the shader
  const cols = Math.ceil(Math.sqrt(n * 4));
  const x = ((i % cols) / cols) * 7 - 3.5;
  const z = (Math.floor(i / cols) / (n / cols)) * 1.6 - 0.8;
  out[o] = x + rand(-0.01, 0.01);
  out[o + 1] = rand(-0.02, 0.02);
  out[o + 2] = z;
};

const helix: ShapeFn = (i, n, out, o) => {
  const t = i / n;
  const y = t * 5.2 - 2.6;
  const ang = t * TAU * 3;
  const r = 0.85;
  if (i % 5 === 0) {
    // rungs between the two strands
    const f = Math.random();
    const x1 = r * Math.cos(ang);
    const z1 = r * Math.sin(ang);
    out[o] = x1 * (1 - 2 * f);
    out[o + 1] = y;
    out[o + 2] = z1 * (1 - 2 * f);
  } else {
    const s = i % 2 === 0 ? 0 : Math.PI;
    out[o] = r * Math.cos(ang + s) + rand(-0.05, 0.05);
    out[o + 1] = y + rand(-0.05, 0.05);
    out[o + 2] = r * Math.sin(ang + s) + rand(-0.05, 0.05);
  }
};

const galaxy: ShapeFn = (i, _n, out, o) => {
  const arms = 4;
  const radius = Math.pow(Math.random(), 0.7) * 3.1;
  const armAngle = ((i % arms) / arms) * TAU;
  const spin = radius * 1.35;
  const scatter = Math.pow(Math.random(), 3) * (0.55 - radius * 0.06);
  const a = armAngle + spin;
  out[o] = Math.cos(a) * radius + rand(-1, 1) * scatter;
  out[o + 1] = rand(-1, 1) * scatter * 0.6;
  out[o + 2] = Math.sin(a) * radius + rand(-1, 1) * scatter;
};

const SHAPES: ShapeFn[] = [core, knot, lattice, wave, helix, galaxy];

const vertexShader = /* glsl */ `
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute vec3 aS5;
  attribute vec4 aRand;

  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uAspect;

  varying vec3 vColor;
  varying float vAlpha;

  float tent(float k) { return max(0.0, 1.0 - abs(uMorph - k)); }

  void main() {
    float w0 = tent(0.0), w1 = tent(1.0), w2 = tent(2.0);
    float w3 = tent(3.0), w4 = tent(4.0), w5 = tent(5.0);
    vec3 p = position * w0 + aS1 * w1 + aS2 * w2 + aS3 * w3 + aS4 * w4 + aS5 * w5;

    // particles burst outward while travelling between shapes
    float travel = 1.0 - abs(fract(uMorph) - 0.5) * 2.0;
    travel = fract(uMorph) < 0.001 ? 0.0 : travel;
    p += (aRand.xyz - 0.5) * travel * 1.6;

    // breathing core
    p *= 1.0 + w0 * 0.05 * sin(uTime * 1.6 + aRand.w * 6.2831);

    // living sound wave
    float env = smoothstep(3.6, 0.0, abs(p.x));
    p.y += w3 * env * (
      sin(p.x * 2.4 - uTime * 3.2) * 0.42 * cos(p.z * 2.0 + uTime) +
      sin(p.x * 5.1 + uTime * 4.5) * 0.12
    );

    // gentle drift so nothing is ever perfectly still
    p += 0.025 * vec3(
      sin(uTime * 0.7 + aRand.w * 20.0),
      cos(uTime * 0.9 + aRand.x * 20.0),
      sin(uTime * 0.8 + aRand.y * 20.0)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // push particles away from the pointer (in screen space)
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(d);
    float force = smoothstep(0.42, 0.0, dist);
    mv.xy += normalize(d + 1e-5) * force * 0.55 * -mv.z * 0.12;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.45 + aRand.x * 1.25) * uPixelRatio * (1.0 / -mv.z) * (1.0 + force * 1.5);

    vec3 indigo = vec3(0.39, 0.40, 0.95);
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    vec3 pink = vec3(0.91, 0.47, 0.98);
    vec3 col = mix(indigo, cyan, smoothstep(-1.5, 1.8, p.y + aRand.y * 0.8));
    col = mix(col, pink, smoothstep(0.72, 1.0, aRand.z) * 0.85);
    col = mix(col, vec3(1.0), force * 0.6 + w0 * smoothstep(1.0, 0.0, length(p)) * 0.5);
    vColor = col;
    vAlpha = 0.55 + aRand.w * 0.45;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = a * a;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

function supportsWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function ParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !supportsWebGL()) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const COUNT = isSmall || coarse ? 7000 : 16000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    const pixelRatio = Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // ---- morphing cloud ----------------------------------------------------
    const geometry = new THREE.BufferGeometry();
    const buffers = SHAPES.map((shape) => {
      const arr = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) shape(i, COUNT, arr, i * 3);
      return arr;
    });
    geometry.setAttribute('position', new THREE.BufferAttribute(buffers[0], 3));
    ['aS1', 'aS2', 'aS3', 'aS4', 'aS5'].forEach((name, k) =>
      geometry.setAttribute(name, new THREE.BufferAttribute(buffers[k + 1], 3)),
    );
    const randoms = new Float32Array(COUNT * 4);
    for (let i = 0; i < randoms.length; i++) randoms[i] = Math.random();
    geometry.setAttribute('aRand', new THREE.BufferAttribute(randoms, 4));

    const uniforms = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: isSmall ? 34 : 42 },
      uPixelRatio: { value: pixelRatio },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uOpacity: { value: 1 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(cloud);
    scene.add(group);

    // ---- distant starfield for depth ---------------------------------------
    const STARS = isSmall ? 600 : 1400;
    const starPos = new Float32Array(STARS * 3);
    for (let i = 0; i < STARS; i++) {
      starPos[i * 3] = rand(-14, 14);
      starPos[i * 3 + 1] = rand(-9, 9);
      starPos[i * 3 + 2] = rand(-14, -3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x8b93ff,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---- scroll → shape mapping -------------------------------------------
    let sections: Array<{ top: number; height: number; shape: number }> = [];
    const measure = () => {
      sections = SECTION_SHAPES.flatMap(([id, shape]) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const rect = el.getBoundingClientRect();
        return [{ top: rect.top + window.scrollY, height: rect.height, shape }];
      });
    };
    const targetMorph = () => {
      if (sections.length === 0) return 3; // project pages: the sound wave
      const marker = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) if (sections[i].top <= marker) idx = i;
      const cur = sections[idx];
      const next = sections[idx + 1];
      if (!next) return cur.shape;
      const frac = (marker - cur.top) / cur.height;
      const t = THREE.MathUtils.smoothstep(frac, 0.6, 1.0);
      return cur.shape + (next.shape - cur.shape) * t;
    };

    // ---- input -------------------------------------------------------------
    const mouseTarget = new THREE.Vector2(9, 9);
    const tilt = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    const onPointerLeave = () => mouseTarget.set(9, 9);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    if (coarse) window.addEventListener('pointerup', onPointerLeave, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uAspect.value = w / h;
      measure();
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    measure();
    // route changes swap the sections without resizing the window
    const remeasure = window.setInterval(measure, 700);

    // ---- loop --------------------------------------------------------------
    const clock = new THREE.Clock();
    let morph = targetMorph();
    let raf = 0;
    let running = true;

    const frame = () => {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const goal = targetMorph();
      morph += (goal - morph) * (reduceMotion ? 1 : 1 - Math.pow(0.02, dt));
      uniforms.uMorph.value = morph;
      if (!reduceMotion) uniforms.uTime.value = t;

      // pointer easing (if pointer is gone, ease far away so nothing is pushed)
      const m = uniforms.uMouse.value;
      if (mouseTarget.x > 5 || m.x > 5) m.copy(mouseTarget);
      else m.lerp(mouseTarget, 1 - Math.pow(0.001, dt));
      const tx = mouseTarget.x > 5 ? 0 : mouseTarget.x;
      const ty = mouseTarget.y > 5 ? 0 : mouseTarget.y;
      tilt.lerp(new THREE.Vector2(tx, ty), 1 - Math.pow(0.05, dt));

      // composition: sculpture sits to the right of the hero text on desktop
      const wide = window.innerWidth >= 1024;
      const heroWeight = THREE.MathUtils.clamp(1 - morph, 0, 1);
      group.position.x = wide ? 2.15 * heroWeight + 1.4 * (1 - heroWeight) : 0;
      group.position.y = wide ? 0 : 0.9 * heroWeight;
      const isProjectPage = sections.length === 0;
      uniforms.uOpacity.value = isProjectPage ? 0.35 : wide ? 0.6 + 0.4 * heroWeight : 0.42 + 0.3 * heroWeight;

      const spin = reduceMotion ? 0 : t * 0.08;
      // the wave and galaxy read best from a fixed, tilted viewpoint
      const flatShape = Math.max(1 - Math.abs(morph - 3), 1 - Math.abs(morph - 5), 0);
      group.rotation.y = spin * (1 - flatShape) + tilt.x * 0.35;
      group.rotation.x = -tilt.y * 0.25 + flatShape * 0.45;
      group.rotation.z = morph > 4.5 ? 0 : spin * 0.3 * (1 - flatShape);

      stars.position.y = (window.scrollY * 0.0015) % 4;
      stars.rotation.y = tilt.x * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerup', onPointerLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      window.clearInterval(remeasure);
      geometry.dispose();
      material.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
