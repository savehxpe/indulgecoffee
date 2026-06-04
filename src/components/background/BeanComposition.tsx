import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';
import { CoffeeBean3D } from '../CoffeeBean3D';

export const BeanComposition: React.FC = () => {
  const { scrollProgress, cursorX, cursorY, idleProgress, isReducedMotion, isPageHidden } = useBackgroundInteraction();
  const timeRef = useRef(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < cfg.performance.mobileBreakpoint;
  const count = isMobile ? cfg.beans.mobileCount : cfg.beans.desktopCount;

  const beans = useMemo(() => {
    const arr: { x: number; y: number; z: number; rotY: number; rotX: number; scale: number; color: string; zone: 'base' | 'mid' | 'upper' }[] = [];
    const baseCount = Math.floor(count * 0.6);
    const midCount = Math.floor(count * 0.25);
    const upperCount = count - baseCount - midCount;

    for (let i = 0; i < baseCount; i++) {
      const angle = (i / baseCount) * Math.PI * 2 + Math.random() * 0.8;
      const radius = 0.5 + Math.random() * 0.5;
      arr.push({
        x: Math.cos(angle) * radius,
        y: -0.08 + Math.random() * 0.06,
        z: Math.sin(angle) * radius,
        rotY: Math.random() * Math.PI * 2,
        rotX: (Math.random() - 0.5) * 0.4,
        scale: 0.22 + Math.random() * 0.2,
        color: Math.random() > 0.5 ? '#3E1E0F' : '#5C3A21',
        zone: 'base',
      });
    }
    for (let i = 0; i < midCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 1.4,
        y: 0.5 + Math.random() * 1.2,
        z: (Math.random() - 0.5) * 1.0,
        rotY: Math.random() * Math.PI * 2,
        rotX: (Math.random() - 0.5) * 0.6,
        scale: 0.18 + Math.random() * 0.15,
        color: '#6B3A2A',
        zone: 'mid',
      });
    }
    for (let i = 0; i < upperCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 1.8,
        y: 1.5 + Math.random() * 1.2,
        z: (Math.random() - 0.5) * 1.4,
        rotY: Math.random() * Math.PI * 2,
        rotX: (Math.random() - 0.5) * 0.5,
        scale: 0.12 + Math.random() * 0.12,
        color: '#8B5E3C',
        zone: 'upper',
      });
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (isReducedMotion || isPageHidden) return;
    timeRef.current += delta;
  });

  const reveal = Math.min(scrollProgress * 1.2, 1);

  return (
    <group position={[0, -0.75, 0]}>
      {beans.map((b, i) => (
        <group key={i} position={[
          b.x + cursorX * cfg.beans.cursorParallax * (b.zone === 'upper' ? 3 : b.zone === 'mid' ? 2 : 1) + idleProgress * cfg.beans.idleMicroOrbit * 2 * Math.sin(i + timeRef.current),
          b.y,
          b.z + cursorY * cfg.beans.cursorParallax * (b.zone === 'upper' ? 3 : b.zone === 'mid' ? 2 : 1),
        ]}>
          <CoffeeBean3D
            scale={b.scale * reveal}
            color={b.color}
            roughness={0.35}
            metalness={0.08}
            position={[0, 0, 0]}
            rotation={[b.rotX, b.rotY, 0]}
            rotateRate={0.08 + Math.random() * 0.15}
          />
        </group>
      ))}
    </group>
  );
};
