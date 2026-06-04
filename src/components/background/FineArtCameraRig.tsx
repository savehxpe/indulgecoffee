import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

gsap.registerPlugin(ScrollTrigger);

const LOOK_TARGET = { x: 0, y: 0.4, z: 0 };

export const FineArtCameraRig: React.FC = () => {
  const { camera } = useThree();
  const { scrollProgress, cursorX, cursorY, idleProgress, isReducedMotion, isPageHidden } = useBackgroundInteraction();
  const camTarget = useRef({ x: 0, y: 0.6, z: 6 });
  const timeRef = useRef(0);

  // Set camera target from scroll progress
  useEffect(() => {
    const st = STATES;
    const t = camTarget.current;
    const p = isReducedMotion ? 0 : scrollProgress;

    if (p < 0.25) {
      const f = p / 0.25;
      t.x = st[0].x + (st[1].x - st[0].x) * f;
      t.y = st[0].y + (st[1].y - st[0].y) * f;
      t.z = st[0].z + (st[1].z - st[0].z) * f;
    } else if (p < 0.7) {
      const f = (p - 0.25) / 0.45;
      t.x = st[1].x + (st[2].x - st[1].x) * f;
      t.y = st[1].y + (st[2].y - st[1].y) * f;
      t.z = st[1].z + (st[2].z - st[1].z) * f;
    } else {
      t.x = st[2].x;
      t.y = st[2].y;
      t.z = st[2].z;
    }
  }, [scrollProgress, isReducedMotion]);

  // Camera interpolation + cursor parallax + idle drift
  useFrame((_, delta) => {
    if (isPageHidden) return;
    timeRef.current += delta;

    const t = camTarget.current;
    const factor = isReducedMotion ? cfg.performance.reduceMotionFactor : 1;

    // Camera target with reduced motion scaling
    const targetX = t.x + cursorX * cfg.camera.mouseRotationMax * factor + (idleProgress * cfg.camera.idleDriftIntensity * factor * Math.sin(Date.now() * 0.0003));
    const targetY = t.y + cursorY * cfg.camera.mouseRotationMax * 0.7 * factor + (idleProgress * cfg.camera.idleDriftIntensity * 0.5 * factor * Math.cos(Date.now() * 0.0004));
    const targetZ = t.z;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(LOOK_TARGET.x, LOOK_TARGET.y, LOOK_TARGET.z);

    // Camera breathing
    if (!isReducedMotion && !isPageHidden) {
      const breathe = Math.sin(timeRef.current * 0.5) * cfg.camera.breathingIntensity * factor;
      const shake = Math.sin(timeRef.current * 13) * 0.004 * factor;
      camera.position.x += shake;
      camera.position.y += breathe;
    }
  });

  return null;
};

const STATES = [
  { x: 0, y: 0.8, z: 6 },
  { x: 0.15, y: 0.6, z: 4.2 },
  { x: -0.1, y: 0.45, z: 3.2 },
];
