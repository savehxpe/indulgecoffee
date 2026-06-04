import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatUpProps {
  children: React.ReactNode;
  stagger?: number;
}

export const FloatUp: React.FC<FloatUpProps> = ({ children, stagger = 0.08 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children);
      gsap.fromTo(items,
        { y: 40, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref}>{children}</div>
  );
};
