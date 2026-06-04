import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GranuleConfig {
  count: number;
  color1: string;
  color2: string;
  spread: number;
  speed: number;
}

interface GranuleFieldProps {
  config?: Partial<GranuleConfig>;
  count?: number;
  spread?: number;
  speed?: number;
}

export const GranuleField: React.FC<GranuleFieldProps> = ({ config: partial, count: propCount, spread: propSpread, speed: propSpeed }) => {
  const defaults: GranuleConfig = { count: 50, color1: '#d97706', color2: '#8B5E3C', spread: 1.2, speed: 0.15 };
  const merged = { ...defaults, ...partial };
  const cfg = { count: propCount ?? merged.count, color1: merged.color1, color2: merged.color2, spread: propSpread ?? merged.spread, speed: propSpeed ?? merged.speed };

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);

  const seeds = useMemo(() =>
    Array.from({ length: cfg.count }, () => ({
      x: (Math.random() - 0.5) * cfg.spread * 2,
      y0: Math.random() * 3 - 0.5,
      z: (Math.random() - 0.5) * cfg.spread * 2 - 0.5,
      speed: cfg.speed * (0.5 + Math.random()),
      drift: (Math.random() - 0.5) * 0.3,
    })),
    [cfg.count, cfg.spread, cfg.speed]
  );

  const geo = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    timeRef.current += 0.016;
    if (!meshRef.current) return;

    for (let i = 0; i < cfg.count; i++) {
      const s = seeds[i];
      const y = (s.y0 + timeRef.current * s.speed) % 3 - 0.5;
      const z = s.z + Math.sin(timeRef.current + s.drift) * 0.15;
      const sz = 0.012 + Math.sin(i + timeRef.current) * 0.006;

      dummy.position.set(s.x, y, z);
      dummy.scale.set(sz, sz, sz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, cfg.count]}>
      <meshBasicMaterial color="#d97706" transparent opacity={0.4} />
    </instancedMesh>
  );
};
