import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScaleBurstProps {
  children: React.ReactNode;
}

export const ScaleBurst: React.FC<ScaleBurstProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { scale: 0.85, opacity: 0 },
        {
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
  }, []);

  return (
    <div ref={ref} style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};
