import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PolaroidDropProps {
  children: React.ReactNode;
  stagger?: number;
}

export const PolaroidDrop: React.FC<PolaroidDropProps> = ({ children, stagger = 0.08 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children);
      gsap.fromTo(items,
        { scale: 0.8, opacity: 0, rotation: i => gsap.utils.random(-3, 3) },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} style={{ perspective: '800px' }}>{children}</div>
  );
};
