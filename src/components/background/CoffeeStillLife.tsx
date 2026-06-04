import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const CoffeeStillLife: React.FC = () => {
  const { idleProgress, isReducedMotion } = useBackgroundInteraction();
  const cupGroupRef = useRef<THREE.Group>(null);

  const cupGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const profile = [
      [0.75, -0.7], [0.73, -0.6], [0.76, -0.3], [0.80, 0],
      [0.86, 0.3], [0.92, 0.55], [0.96, 0.70], [1.0, 0.78],
      [0.88, 0.78], [0.84, 0.70], [0.80, 0.55], [0.76, 0.3],
      [0.72, 0], [0.68, -0.3], [0.66, -0.6], [0.65, -0.7],
    ];
    profile.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  const rimGeo = useMemo(() => new THREE.TorusGeometry(0.96, 0.04, 16, 48), []);
  const saucerGeo = useMemo(() => new THREE.CylinderGeometry(1.3, 1.1, 0.05, 32), []);
  const shadowGeo = useMemo(() => new THREE.CylinderGeometry(1.4, 1.3, 0.02, 32), []);
  const liquidGeo = useMemo(() => new THREE.CircleGeometry(0.76, 32), []);

  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.92, 0.3, 0),
      new THREE.Vector3(1.30, 0.3, 0.05),
      new THREE.Vector3(1.10, -0.1, -0.05),
      new THREE.Vector3(0.84, -0.1, 0),
    ]);
    return new THREE.TubeGeometry(curve, 16, 0.06, 8, false);
  }, []);

  useFrame((_, delta) => {
    if (cupGroupRef.current && !isReducedMotion) {
      cupGroupRef.current.rotation.y += delta * 0.015 * (1 + idleProgress * 0.5);
    }
  });

  const glowBoost = idleProgress * cfg.idle.cupGlowPulse;

  return (
    <group position={[0, -0.3, 0]}>
      <group ref={cupGroupRef}>
        {/* Saucer */}
        <mesh geometry={saucerGeo} position={[0, -0.73, 0]}>
          <meshPhysicalMaterial color="#e8ddd0" roughness={0.5} metalness={0.05} />
        </mesh>

        {/* Saucer shadow */}
        <mesh geometry={shadowGeo} position={[0, -0.77, 0]}>
          <meshBasicMaterial color="#000000" transparent opacity={0.3} />
        </mesh>

        {/* Cup body */}
        <mesh geometry={cupGeo} castShadow>
          <meshPhysicalMaterial color="#f5ede3" roughness={0.4} metalness={0.05} clearcoat={0.15} />
        </mesh>

        {/* Rim */}
        <mesh geometry={rimGeo} position={[0, 0.78, 0]}>
          <meshPhysicalMaterial color="#f0eadd" roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Handle */}
        <mesh geometry={handleGeo}>
          <meshPhysicalMaterial color="#f3ebe0" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Coffee liquid */}
        <mesh geometry={liquidGeo} position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#3E1E0F"
            roughness={0.12}
            metalness={0.0}
            clearcoat={0.1}
            emissive="#2a1005"
            emissiveIntensity={0.05 + glowBoost * 0.08}
          />
        </mesh>
      </group>
    </group>
  );
};
