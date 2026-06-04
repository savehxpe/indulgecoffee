import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const SteamSculpture: React.FC = () => {
  const { scrollProgress, cursorX, idleProgress, isReducedMotion } = useBackgroundInteraction();
  const timeRef = useRef(0);
  const ribbonCount = useMemo(() => cfg.scenes[cfg.activeScene].steamRibbons, []);

  const ribbons = useMemo(() => {
    return Array.from({ length: ribbonCount }, (_, i) => {
      const pts = Array.from({ length: 12 }, (_, j) => {
        const t = j / 11;
        return new THREE.Vector3(
          (Math.random() - 0.5) * 0.12 + i * 0.04 - ribbonCount * 0.02,
          t * cfg.steam.height - 0.3,
          (Math.random() - 0.5) * 0.1,
        );
      });
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, 24, 0.025, 8, false);
      const mat = new THREE.MeshBasicMaterial({
        color: '#fbf6f0',
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      return { mesh: new THREE.Mesh(geo, mat), pts, phase: Math.random() * Math.PI * 2, speed: 0.12 + Math.random() * 0.14 };
    });
  }, [ribbonCount]);

  useFrame((_, delta) => {
    if (isReducedMotion) return;
    timeRef.current += delta;

    const reveal = Math.min(scrollProgress * 1.5, 1);
    const baseOpacity = cfg.steam.opacity * reveal;
    const idleBonus = idleProgress * cfg.idle.steamBoost;
    const cursorOffset = cursorX * cfg.steam.cursorBend;

    ribbons.forEach((ribbon) => {
      const t = timeRef.current * cfg.steam.speed * (1 + idleProgress * 0.3);
      ribbon.pts.forEach((pt, j) => {
        const frac = j / (ribbon.pts.length - 1);
        pt.y = frac * (cfg.steam.height + idleBonus * 3) - 0.3;
        pt.x = (Math.sin(t * 0.7 + ribbon.phase + frac * 3) * 0.06 + cursorOffset * (1 - frac)) * (1 + idleProgress * 0.5);
        pt.z = Math.cos(t * 0.5 + ribbon.phase + frac * 2) * 0.04;
      });
      ribbon.mesh.geometry.dispose();
      const curve = new THREE.CatmullRomCurve3(ribbon.pts);
      ribbon.mesh.geometry = new THREE.TubeGeometry(curve, 24, 0.02 + (1 - idleProgress) * 0.008, 8, false);
      (ribbon.mesh.material as THREE.MeshBasicMaterial).opacity = baseOpacity * (1 - (idleProgress * 0.3));
    });
  });

  return (
    <group position={[0, -0.3, 0]}>
      {ribbons.map((r, i) => (<primitive key={i} object={r.mesh} />))}
    </group>
  );
};
