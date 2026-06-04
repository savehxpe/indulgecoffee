import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const GranuleField: React.FC = () => {
  const { scrollProgress, cursorX, cursorY, idleProgress, isReducedMotion, isPageHidden } = useBackgroundInteraction();
  const timeRef = useRef(0);

  const layers = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < cfg.performance.mobileBreakpoint;
    const count = isMobile ? cfg.particles.mobileGranules : cfg.particles.desktopGranules;
    const actual = isReducedMotion ? Math.floor(count * cfg.performance.reduceMotionFactor) : count;
    if (isPageHidden) return { fg: [] as number[][], mg: [] as number[][], bg: [] as number[][] };

    const make = (n: number, spread: number) =>
      Array.from({ length: n }, () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * spread;
        return [
          Math.cos(angle) * radius,
          Math.random() * 3 - 0.5,
          Math.sin(angle) * radius - 0.5,
        ];
      });

    return {
      fg: make(Math.floor(actual * 0.35), 1.0),
      mg: make(Math.floor(actual * 0.45), 1.4),
      bg: make(Math.floor(actual * 0.20), 2.0),
    };
  }, [isReducedMotion, isPageHidden]);

  const allLayers = [
    { key: 'fg', data: layers.fg ?? [], sizeMul: 1.4, cursorMul: cfg.particles.depthParallax * 1.5, speedMul: 1.3 },
    { key: 'mg', data: layers.mg ?? [], sizeMul: 1.0, cursorMul: cfg.particles.depthParallax, speedMul: 1.0 },
    { key: 'bg', data: layers.bg ?? [], sizeMul: 0.6, cursorMul: cfg.particles.depthParallax * 0.4, speedMul: 0.6 },
  ];

  const geo = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const meshRefs = useRef<THREE.InstancedMesh[]>([]);

  useFrame(() => {
    if (isReducedMotion || isPageHidden) return;
    timeRef.current += 0.016;

    meshRefs.current.forEach((mesh, li) => {
      if (!mesh) return;
      const layer = allLayers[li];
      const reveal = Math.min(scrollProgress * 1.3, 1);

      for (let i = 0; i < layer.data.length; i++) {
        const [bx, by0, bz] = layer.data[i];
        const idlePatternAngle = idleProgress > 0.3
          ? Math.atan2(bz, bx) + idleProgress * 0.04
          : 0;

        const y = (by0 + timeRef.current * cfg.particles.speed * layer.speedMul) % 3.5 - 0.8;
        const driftX = Math.sin(timeRef.current + i * 0.01) * 0.08 + cursorX * layer.cursorMul;
        const driftZ = Math.cos(timeRef.current + i * 0.01) * 0.06 + cursorY * layer.cursorMul;

        if (idlePatternAngle > 0) {
          const r = Math.sqrt(bx * bx + bz * bz);
          dummy.position.set(
            Math.cos(idlePatternAngle) * r + driftX,
            y,
            Math.sin(idlePatternAngle) * r + driftZ,
          );
        } else {
          dummy.position.set(bx + driftX, y, bz + driftZ);
        }

        const sz = (cfg.particles.granuleSizeMin + Math.sin(i + timeRef.current * 2) * 0.003) * layer.sizeMul * reveal;
        dummy.scale.set(sz, sz, sz);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <group>
      {allLayers.map((layer) => (
        <instancedMesh
          key={layer.key}
          ref={(el) => { if (el) meshRefs.current.push(el); }}
          args={[geo, undefined, layer.data.length]}
        >
          <meshBasicMaterial color="#d97706" transparent opacity={0.35} depthWrite={false} />
        </instancedMesh>
      ))}
    </group>
  );
};
