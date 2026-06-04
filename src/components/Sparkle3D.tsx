import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sparkle3D: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null!);
  const sparkles = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 30; i++) {
      positions.push(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6,
      );
    }
    return new Float32Array(positions);
  }, []);

  const opacityRef = useRef(0);
  const flashTimer = useRef(0);

  useFrame((_, delta) => {
    flashTimer.current -= delta;
    if (flashTimer.current <= 0) {
      flashTimer.current = 0.5 + Math.random() * 1.5;
      opacityRef.current = 0.6 + Math.random() * 0.4;
    }
    opacityRef.current *= 0.95;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.PointsMaterial;
      mat.opacity = Math.max(0, opacityRef.current);
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(sparkles, 3));
    return geo;
  }, [sparkles]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#d97706"
        size={0.04}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
