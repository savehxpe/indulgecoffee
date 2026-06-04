import { useMemo } from 'react';
import * as THREE from 'three';

const CUP_COLOR = '#f5ede3';
const LIQUID_COLOR = '#3E1E0F';

export const CoffeeStillLife: React.FC = () => {
  const cupGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const profile = [
      [0.75, -0.7],
      [0.73, -0.6],
      [0.76, -0.3],
      [0.80, 0],
      [0.86, 0.3],
      [0.92, 0.55],
      [0.96, 0.70],
      [1.0, 0.78],
      [0.88, 0.78],
      [0.84, 0.70],
      [0.80, 0.55],
      [0.76, 0.3],
      [0.72, 0],
      [0.68, -0.3],
      [0.66, -0.6],
      [0.65, -0.7],
    ];
    profile.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  const rimGeo = useMemo(() => new THREE.TorusGeometry(0.96, 0.04, 16, 48), []);
  const saucerGeo = useMemo(() => new THREE.CylinderGeometry(1.3, 1.1, 0.05, 32), []);

  const liquidGeo = useMemo(() => new THREE.CircleGeometry(0.76, 32), []);

  return (
    <group position={[0, -0.3, 0]}>
      {/* Saucer */}
      <mesh geometry={saucerGeo} position={[0, -0.73, 0]}>
        <meshPhysicalMaterial color="#e8ddd0" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Cup body */}
      <mesh geometry={cupGeo} position={[0, 0, 0]} castShadow>
        <meshPhysicalMaterial
          color={CUP_COLOR}
          roughness={0.4}
          metalness={0.05}
          clearcoat={0.15}
        />
      </mesh>

      {/* Rim */}
      <mesh geometry={rimGeo} position={[0, 0.78, 0]}>
        <meshPhysicalMaterial color="#f0eadd" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Coffee liquid */}
      <mesh geometry={liquidGeo} position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color={LIQUID_COLOR}
          roughness={0.15}
          metalness={0.0}
          clearcoat={0.1}
        />
      </mesh>
    </group>
  );
};
