import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CoffeeBean3D: React.FC<{ 
  scale?: number; 
  color?: string; 
  roughness?: number; 
  metalness?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  rotateRate?: number;
}> = ({ 
  scale = 1, 
  color = '#5C3A21', 
  roughness = 0.22, 
  metalness = 0.18,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  rotateRate = 0.3,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.3);
    shape.bezierCurveTo(1.1, 0.85, 1.3, -0.35, 0.85, -1.05);
    shape.bezierCurveTo(0.45, -1.5, -0.45, -1.5, -0.85, -1.05);
    shape.bezierCurveTo(-1.3, -0.35, -1.1, 0.85, 0, 1.3);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelThickness: 0.3,
      bevelSize: 0.2,
      bevelSegments: 16,
    });
  }, []);

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * rotateRate;
    meshRef.current.rotation.x = rotation[0] + Math.sin(Date.now() * 0.0003) * 0.03;
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      scale={scale}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      castShadow
    >
      <meshPhysicalMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        clearcoat={0.6}
        clearcoatRoughness={0.15}
        reflectivity={0.5}
      />
    </mesh>
  );
};
