import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useSmoothedCursor(smoothing: number) {
  const posRef = useRef({ x: 0, y: 0 });
  const quickXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickYRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const pos = posRef.current;
    quickXRef.current = gsap.quickTo(pos, 'x', { duration: smoothing });
    quickYRef.current = gsap.quickTo(pos, 'y', { duration: smoothing });

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      quickXRef.current!(nx);
      quickYRef.current!(ny);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [smoothing]);

  return posRef;
}
