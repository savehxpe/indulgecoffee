import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SlideRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'bottom';
}

const offsets: Record<string, { x: number; y: number }> = {
  left: { x: -80, y: 30 },
  right: { x: 80, y: 30 },
  bottom: { x: 0, y: 80 },
};

export const SlideReveal: React.FC<SlideRevealProps> = ({ children, direction = 'left' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const off = offsets[direction];

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: off.x, y: off.y, scale: 0.85, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={ref} style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};
