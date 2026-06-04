import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EasyInProps {
  className?: string;
  children: React.ReactNode;
  direction?: 'left' | 'right';
}

export const EasyIn: React.FC<EasyInProps> = ({ children, direction = 'left', className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const offset = direction === 'left' ? -60 : 60;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: offset, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};
