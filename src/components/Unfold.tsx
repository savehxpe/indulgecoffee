import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UnfoldProps {
  children: React.ReactNode;
  stagger?: number;
}

export const Unfold: React.FC<UnfoldProps> = ({ children, stagger = 0.06 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.children);
      gsap.fromTo(items,
        { scaleY: 0.1, scaleX: 0.7, rotateX: -3, rotateY: -2, opacity: 0 },
        {
          scaleY: 1,
          scaleX: 1,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          stagger,
          ease: 'power3.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
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
