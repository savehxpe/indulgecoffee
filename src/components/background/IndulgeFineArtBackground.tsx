import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { CoffeeBean3D } from '../CoffeeBean3D';

gsap.registerPlugin(ScrollTrigger);

// ── Shared cursor ref (touched by CamRig, read by LightRig) ──
const cursorRef = { current: { x: 0, y: 0 } };
const torqueRef = { current: 0 };
const prevScroll = { current: 0 };

// ── 4 Camera States ──
const SHOTS = [
  { x: 0,    y: 0.05, z: 4.2 },  // Shot 1: The Roast
  { x: 0.35, y: 0.1,  z: 3.8 },  // Shot 2: The Reveal
  { x: 0,    y: 0.25, z: 4.5 },  // Shot 3: The Pour
  { x: 0.1,  y: 0.15, z: 5.2 },  // Shot 4: The Indulge
];
const LOOK = { x: 0, y: 0.1, z: 0 };

// ── Camera Rig ──
const CamRig: React.FC = () => {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0.1, z: 4.5 });
  const breathRef = useRef(0);

  useEffect(() => {
    const t = target.current;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      onUpdate: (s) => {
        const p = s.progress;
        const i = Math.min(Math.floor(p * 4), 3);
        const f = (p * 4) - i;
        const a = SHOTS[i];
        const b = SHOTS[Math.min(i + 1, 3)];
        t.x = a.x + (b.x - a.x) * f;
        t.y = a.y + (b.y - a.y) * f;
        t.z = a.z + (b.z - a.z) * f;
        torqueRef.current = Math.abs(p - prevScroll.current) * 120;
        prevScroll.current = p;
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const t = target.current;
    const qx = gsap.quickTo(t, 'x', { duration: 0.6 });
    const qy = gsap.quickTo(t, 'y', { duration: 0.6 });
    let baseX = SHOTS[0].x;
    let baseY = SHOTS[0].y;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      onUpdate: (s) => {
        const p = s.progress;
        const i = Math.min(Math.floor(p * 4), 3);
        const f = (p * 4) - i;
        const a = SHOTS[i];
        const b = SHOTS[Math.min(i + 1, 3)];
        baseX = a.x + (b.x - a.x) * f;
        baseY = a.y + (b.y - a.y) * f;
      },
    });

    const onMove = (e: MouseEvent) => {
      const px = ((e.clientX / window.innerWidth) - 0.5) * 2;
      const py = ((e.clientY / window.innerHeight) - 0.5) * 2;
      cursorRef.current.x = px;
      cursorRef.current.y = py;
      qx(baseX + px * 0.04);
      qy(baseY - py * 0.03);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { st.kill(); window.removeEventListener('mousemove', onMove); };
  }, []);

  useFrame((_, delta) => {
    const t = target.current;
    camera.position.x += (t.x - camera.position.x) * 0.04;
    camera.position.y += (t.y - camera.position.y) * 0.04;
    camera.position.z += (t.z - camera.position.z) * 0.04;
    camera.lookAt(LOOK.x, LOOK.y, LOOK.z);
    breathRef.current += delta;
    camera.position.y += Math.sin(breathRef.current * 0.5) * 0.004;
    torqueRef.current *= 0.9;
  });

  return null;
};

// ── Light Follows Cursor ──
const LightRig: React.FC = () => {
  const keyRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (keyRef.current) {
      keyRef.current.position.x = 1.8 + cursorRef.current.x * 0.25;
      keyRef.current.position.y = 1.8 + cursorRef.current.y * 0.15;
    }
  });

  return (
    <pointLight ref={keyRef} position={[1.8, 1.8, 2.5]} color="#d97706" intensity={2.8} decay={1} distance={10} />
  );
};

// ── Scroll-Driven Hero Bean ──
const HeroBean: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const rateRef = useRef(0.18);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = 0.18 + torqueRef.current * 0.4;
    rateRef.current += (target - rateRef.current) * 0.1;
    groupRef.current.rotation.y += delta * rateRef.current;
    const cx = cursorRef.current.x * 0.15;
    const cy = cursorRef.current.y * 0.1;
    groupRef.current.rotation.x += (0.1 + cy - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (cx - groupRef.current.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <CoffeeBean3D
        scale={2.0}
        color="#4A2C17"
        roughness={0.18}
        metalness={0.15}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        rotateRate={0}
      />
    </group>
  );
};

// ── Steam Layer (InstancedMesh) ──
const SteamLayer: React.FC<{ speedMul: number; opacity: number; count: number; driftRange: number }> = ({ speedMul, opacity, count, driftRange }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);
  const geo = useMemo(() => new THREE.SphereGeometry(1, 8, 6), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * driftRange,
      z: (Math.random() - 0.5) * driftRange * 0.7,
      speed: (0.12 + Math.random() * 0.18) * speedMul,
      size: (0.03 + Math.random() * 0.05) * (1 + (1 - speedMul) * 0.3),
      phase: Math.random() * Math.PI * 2,
    })),
    [count, speedMul, driftRange]
  );

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const t = timeRef.current;
      const y = ((t * s.speed) % 2.6) - 0.2;
      const driftX = Math.sin(t * 0.7 + s.phase) * 0.06 + cursorRef.current.x * (speedMul > 0.7 ? 0.05 : 0.03);
      const driftZ = Math.cos(t * 0.5 + s.phase) * 0.04;
      const sz = s.size * (1 - Math.max(0, y) / 2.8 * 0.8);
      dummy.position.set(s.x + driftX, y, s.z + driftZ);
      dummy.scale.set(sz, sz * 1.6, sz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, count]} position={[0, 0.25, 0]}>
      <meshStandardMaterial color="#fbf6f0" transparent opacity={opacity} roughness={0.55} metalness={0.05} depthWrite={false} />
    </instancedMesh>
  );
};

// ── Granules (InstancedMesh) ──
const Granules: React.FC = () => {
  const count = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);
  const geo = useMemo(() => new THREE.SphereGeometry(1, 5, 5), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 3,
      y0: Math.random() * 2.5 - 0.3,
      z: (Math.random() - 0.5) * 2,
      depth: Math.random(),
      speed: 0.06 + Math.random() * 0.1,
      drift: (Math.random() - 0.5) * 0.2,
      size: 0.004 + Math.random() * 0.012,
    })),
    []
  );

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const t = timeRef.current;
      const y = ((s.y0 + t * s.speed) % 3.5) - 0.5;
      const z = s.z + Math.sin(t + s.drift) * 0.1;
      const parallax = 1.2 - s.depth * 0.8;
      const cx = cursorRef.current.x * 0.15 * parallax;
      const cy = cursorRef.current.y * 0.08 * parallax;
      const x = s.x + Math.cos(t * 0.7 + s.drift) * 0.05 + cx;
      const sz = s.size * (y > 0 && y < 2.5 ? 1 : 0.3);
      dummy.position.set(x, y, z + cy);
      dummy.scale.set(sz, sz, sz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, count]}>
      <meshBasicMaterial color="#d97706" transparent opacity={0.5} depthWrite={false} />
    </instancedMesh>
  );
};

// ── Main Scene ──
export const IndulgeFineArtBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true" style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0.1, 4.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        dpr={[1, 1.5]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 3.5, 14]} />

        {/* Static lights */}
        <ambientLight color="#2e1503" intensity={0.28} />
        <spotLight position={[-1.2, 2.5, -0.8]} angle={0.4} penumbra={0.9} intensity={3.5} color="#f5e6d3" decay={1} distance={8} />
        <pointLight position={[0, -0.1, 1.2]} color="#c44b0a" intensity={0.5} decay={2} distance={3} />

        <LightRig />
        <CamRig />

        {/* Hero bean + rotation group */}
        <HeroBean />

        {/* Companion beans — different depths, same glossy material */}
        <CoffeeBean3D scale={0.55} color="#3E1E0F" roughness={0.28} metalness={0.1} position={[1.2, -0.4, -2.0]} rotateRate={0.12} />
        <CoffeeBean3D scale={0.45} color="#5C3A21" roughness={0.32} metalness={0.08} position={[-0.7, 0.35, -2.8]} rotateRate={0.09} />
        <CoffeeBean3D scale={0.5} color="#4A2C17" roughness={0.25} metalness={0.1} position={[0.4, -0.55, -3.5]} rotateRate={0.14} />
        <CoffeeBean3D scale={0.35} color="#6B3A2A" roughness={0.3} metalness={0.08} position={[-1.0, -0.3, -1.5]} rotateRate={0.1} />
        <CoffeeBean3D scale={0.4} color="#3E1E0F" roughness={0.26} metalness={0.09} position={[0.8, 0.5, -3.0]} rotateRate={0.11} />

        {/* Far steam layer — slow, wide, faint */}
        <SteamLayer speedMul={0.55} opacity={0.14} count={45} driftRange={1.6} />

        {/* Close steam layer — faster, thinner, more visible */}
        <SteamLayer speedMul={1.0} opacity={0.25} count={60} driftRange={0.5} />

        <Granules />

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.28} />
          <Vignette eskil={false} offset={0.25} darkness={0.35} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
