import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CameraState {
  x: number;
  y: number;
  z: number;
}

const STATES: CameraState[] = [
  { x: 0, y: 0.8, z: 6 },      // Gallery
  { x: 0.15, y: 0.6, z: 4.2 },  // Intimacy
  { x: -0.1, y: 0.45, z: 3.2 }, // Macro
];

const LOOK_TARGET = { x: 0, y: 0.4, z: 0 };

export const FineArtCameraRig: React.FC = () => {
  const { camera } = useThree();
  const camTarget = useRef({ x: 0, y: 0.6, z: 5 });
  const timeRef = useRef(0);

  // Scroll-driven camera interpolation between states
  useEffect(() => {
    const t = camTarget.current;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.25) {
          const f = p / 0.25;
          t.x = STATES[0].x + (STATES[1].x - STATES[0].x) * f;
          t.y = STATES[0].y + (STATES[1].y - STATES[0].y) * f;
          t.z = STATES[0].z + (STATES[1].z - STATES[0].z) * f;
        } else if (p < 0.7) {
          const f = (p - 0.25) / 0.45;
          t.x = STATES[1].x + (STATES[2].x - STATES[1].x) * f;
          t.y = STATES[1].y + (STATES[2].y - STATES[1].y) * f;
          t.z = STATES[1].z + (STATES[2].z - STATES[1].z) * f;
        } else {
          t.x = STATES[2].x;
          t.y = STATES[2].y;
          t.z = STATES[2].z;
        }
      },
    });

    return () => st.kill();
  }, [camera]);

  // Cursor parallax
  useEffect(() => {
    const t = camTarget.current;
    const qx = gsap.quickTo(t, 'x', { duration: 0.8 });
    const qy = gsap.quickTo(t, 'y', { duration: 0.8 });
    let baseX = STATES[2].x;
    let baseY = STATES[2].y;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (s) => {
        const p = s.progress;
        const sx = p < 0.25 ? STATES[0].x + (STATES[1].x - STATES[0].x) * p / 0.25
              : p < 0.7 ? STATES[1].x + (STATES[2].x - STATES[1].x) * (p - 0.25) / 0.45
              : STATES[2].x;
        const sy = p < 0.25 ? STATES[0].y + (STATES[1].y - STATES[0].y) * p / 0.25
              : p < 0.7 ? STATES[1].y + (STATES[2].y - STATES[1].y) * (p - 0.25) / 0.45
              : STATES[2].y;
        baseX = sx;
        baseY = sy;
      },
    });

    const onMove = (e: MouseEvent) => {
      const px = ((e.clientX / window.innerWidth) - 0.5) * 0.6;
      const py = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
      qx(baseX + px);
      qy(baseY - py);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener('mousemove', onMove);
    };
  }, [camera]);

  // Camera interpolation + breathing
  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = camTarget.current;
    camera.position.x += (t.x - camera.position.x) * 0.04;
    camera.position.y += (t.y - camera.position.y) * 0.04;
    camera.position.z += (t.z - camera.position.z) * 0.04;
    camera.lookAt(LOOK_TARGET.x, LOOK_TARGET.y, LOOK_TARGET.z);

    // Camera breathing — subtle 0.01 unit sine
    const breathe = Math.sin(timeRef.current * 0.5) * 0.008;
    const shake = Math.sin(timeRef.current * 13) * 0.005;
    camera.position.x += shake;
    camera.position.y += breathe;
  });

  return null;
};
