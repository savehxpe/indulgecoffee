import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 30;

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: (Math.random() - 0.5) * 4,
  z: (Math.random() - 0.5) * 3 - 1,
  speed: Math.random() * 0.3 + 0.1,
  drift: (Math.random() - 0.5) * 0.2,
  maxHeight: Math.random() * 3 + 2,
  size: Math.random() * 0.08 + 0.03,
  phase: Math.random() * Math.PI * 2,
}));

export const Steam3D: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const timeRef = useRef(0);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      const t = timeRef.current;
      const y = (t * p.speed) % (p.maxHeight + 1) - 1;
      const opacity = y < 0 
        ? 0 
        : y > p.maxHeight * 0.7 
          ? 1 - (y - p.maxHeight * 0.7) / (p.maxHeight * 0.3)
          : 1;
      const driftX = Math.sin(t * 0.5 + p.phase) * 0.3;

      dummy.position.set(p.x + driftX * (y + 1) * 0.3, y - 1, p.z + Math.sin(t * 0.3 + p.phase) * 0.2);
      dummy.scale.set(p.size, p.size, p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f5e6d3" transparent opacity={0.12} />
    </instancedMesh>
  );
};
