import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RIBBON_COUNT = 5;
const SEGMENTS_PER_RIBBON = 7;

export const SteamSculpture: React.FC = () => {
  const timeRef = useRef(0);

  const segments = useMemo(() =>
    Array.from({ length: RIBBON_COUNT }, () =>
      Array.from({ length: SEGMENTS_PER_RIBBON }, (_, si) => ({
        startX: (Math.random() - 0.5) * 0.15 + si * 0.02,
        startZ: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        size: 0.06 + Math.random() * 0.04,
      }))
    ), []);

  const geo = useMemo(() => new THREE.SphereGeometry(1, 12, 8), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fbf6f0', transparent: true, opacity: 0 }), []);

  const meshes = useMemo(() => {
    const list: THREE.Mesh[] = [];
    segments.forEach(() => {
      segments[0].forEach(() => list.push(new THREE.Mesh(geo, mat.clone())));
    });
    return list;
  }, [segments, geo, mat]);

  useFrame(() => {
    timeRef.current += 0.016;
    let idx = 0;

    segments.forEach((ribbon, ri) => {
      const baseT = timeRef.current + ri * 0.5;
      ribbon.forEach((seg, si) => {
        const mesh = meshes[idx];
        const t = baseT + si * 0.3;
        const height = ((t * seg.speed) % 2.5) - 0.5;
        const driftX = Math.sin(t * 1.1 + seg.phase) * 0.15;
        const driftZ = Math.cos(t * 0.7 + seg.phase) * 0.1;

        mesh.position.set(seg.startX + driftX, height, seg.startZ + driftZ);
        const normH = height / 2.0;
        const opacity = normH < 0.1 ? normH / 0.1 * 0.18 : normH > 0.7 ? (1 - normH) / 0.3 * 0.18 : 0.18;
        const scale = seg.size * (1 - normH * 0.5) * (0.6 + Math.sin(t * 2 + seg.phase) * 0.2);
        mesh.scale.set(scale, scale * 1.5, scale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
        idx++;
      });
    });
  });

  return (
    <group position={[0, -0.3, 0]}>
      {meshes.map((m, i) => (<primitive key={i} object={m} />))}
    </group>
  );
};
