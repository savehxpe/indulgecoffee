import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { CoffeeBean3D } from './CoffeeBean3D';
import { OrbitalBeans } from './OrbitalBeans';
import { Steam3D } from './Steam3D';
import { Sparkle3D } from './Sparkle3D';

export const SceneContent: React.FC = () => {
  const { camera } = useThree();
  const camTarget = useRef({ x: 0, y: 0, z: 8 });
  const sceneRef = useRef<THREE.Group>(null);

  // Scroll-linked camera depth
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        camTarget.current.z = 8 + self.progress * 12;
      },
    });
    return () => st.kill();
  }, [camera]);

  // Cursor parallax
  useEffect(() => {
    const target = camTarget.current;
    const quickX = gsap.quickTo(target, 'x', { duration: 0.6 });
    const quickY = gsap.quickTo(target, 'y', { duration: 0.6 });

    const onMove = (e: MouseEvent) => {
      quickX(((e.clientX / window.innerWidth) - 0.5) * 4);
      quickY(((e.clientY / window.innerHeight) - 0.5) * 2.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Camera interpolation + breathing + shake
  let breatheTimer = 0;
  useFrame((_, delta) => {
    const t = camTarget.current;
    camera.position.x += (t.x - camera.position.x) * 0.05;
    camera.position.y += (t.y - camera.position.y) * 0.05;
    camera.position.z += (t.z - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);

    breatheTimer += delta;
    const breathe = Math.sin(breatheTimer * 0.7) * 0.015;
    const shake = Math.sin(breatheTimer * 13) * 0.008;
    const shake2 = Math.cos(breatheTimer * 17) * 0.006;
    camera.position.x += shake;
    camera.position.y += breathe + shake2;
  });

  return (
    <group ref={sceneRef}>
      <CoffeeBean3D 
        position={[0, 0, 0]} 
        scale={1} 
        rotateRate={0.3}
      />
      <OrbitalBeans />
      <Steam3D />
      <Sparkle3D />
    </group>
  );
};
