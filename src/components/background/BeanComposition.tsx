import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CoffeeBean3D } from '../CoffeeBean3D';

interface BeanCompositionProps {
  count?: number;
}

export const BeanComposition: React.FC<BeanCompositionProps> = ({ count = 6 }) => {
  const beans = useMemo(() => {
    const arr: {
      x: number; z: number; rotY: number; rotX: number; scale: number; color: string;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.6 + Math.random() * 0.5;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotY: Math.random() * Math.PI * 2,
        rotX: (Math.random() - 0.5) * 0.3,
        scale: 0.3 + Math.random() * 0.25,
        color: Math.random() > 0.5 ? '#3E1E0F' : '#5C3A21',
      });
    }
    return arr;
  }, [count]);

  const offsets = useRef(beans.map(() => ({
    phaseX: Math.random() * Math.PI * 2,
    phaseZ: Math.random() * Math.PI * 2,
    speed: 0.1 + Math.random() * 0.2,
  })));

  useFrame(() => {
    // Stub for potential parallax animation
  });

  return (
    <group position={[0, -0.75, 0]}>
      {beans.map((b, i) => (
        <group key={i} position={[b.x, -0.05, b.z]}>
          <CoffeeBean3D
            scale={b.scale}
            color={b.color}
            roughness={0.35}
            metalness={0.08}
            position={[0, 0, 0]}
            rotation={[b.rotX, b.rotY, Math.random() * 0.2]}
            rotateRate={0.1 + Math.random() * 0.2}
          />
        </group>
      ))}
    </group>
  );
};
