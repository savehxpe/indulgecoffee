import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CoffeeBean3D } from './CoffeeBean3D';

interface RingConfig {
  radius: number;
  speed: number;
  count: number;
  color: string;
  roughness: number;
  metalness: number;
}

const rings: RingConfig[] = [
  { radius: 1.5, speed: 0.6, count: 3, color: '#3E1E0F', roughness: 0.25, metalness: 0.15 },
  { radius: 2.5, speed: 0.4, count: 4, color: '#6B3A2A', roughness: 0.28, metalness: 0.12 },
  { radius: 3.8, speed: 0.25, count: 5, color: '#8B5E3C', roughness: 0.3, metalness: 0.1 },
];

export const OrbitalBeans: React.FC = () => {
  const offsets = useRef(
    rings.map(r => 
      Array.from({ length: r.count }, (_, i) => ({
        angle: (i / r.count) * Math.PI * 2,
        tiltY: Math.random() * Math.PI * 2,
        tiltX: (Math.random() - 0.5) * 0.3,
      }))
    )
  );

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
  });

  return (
    <group>
      {rings.map((ring, ri) =>
        offsets.current[ri].map((bean, i) => (
          <OrbitalBeanMesh
            key={`${ri}-${i}`}
            ring={ring}
            bean={bean}
            scale={0.7 - ri * 0.18}
            timeRef={timeRef}
          />
        ))
      )}
    </group>
  );
};

const OrbitalBeanMesh: React.FC<{
  ring: RingConfig;
  bean: { angle: number; tiltY: number; tiltX: number };
  scale: number;
  timeRef: React.MutableRefObject<number>;
}> = ({ ring, bean, scale, timeRef }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const angle = bean.angle + timeRef.current * ring.speed;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * ring.radius;
      meshRef.current.position.z = Math.sin(angle) * ring.radius * 0.6;
      meshRef.current.position.y = Math.sin(angle * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <CoffeeBean3D
        scale={scale}
        color={ring.color}
        roughness={ring.roughness}
        metalness={ring.metalness}
        position={[0, 0, 0]}
        rotation={[bean.tiltX, bean.tiltY, 0]}
        rotateRate={0.2 + Math.random() * 0.3}
      />
    </group>
  );
};
