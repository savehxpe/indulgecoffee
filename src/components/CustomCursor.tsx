import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const beanRef = useRef<HTMLDivElement>(null);
  const beanTween = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const bean = beanRef.current;
    if (!bean) return;

    beanTween.current = gsap.quickTo(bean, 'x', { duration: 0.04 });
    const beanYTween = gsap.quickTo(bean, 'y', { duration: 0.04 });

    const onMove = (e: MouseEvent) => {
      beanTween.current(e.clientX);
      beanYTween(e.clientY);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as Element;

      if (target.closest('#hero-heading')) {
        gsap.to(bean, { scale: 2, filter: 'drop-shadow(0 0 14px rgba(217,119,6,0.5))', rotate: -5, duration: 0.3 });
      } else if (target.closest('#hero-subtext')) {
        gsap.to(bean, { scale: 1.3, filter: 'drop-shadow(0 0 8px rgba(217,119,6,0.3))', duration: 0.3 });
      } else if (target.closest('#hero-primary-cta, #hero-secondary-cta')) {
        gsap.to(bean, { scale: 1.8, filter: 'drop-shadow(0 0 10px rgba(217,119,6,0.6))', duration: 0.3 });
      } else if (target.closest('h1, h2')) {
        gsap.to(bean, { scale: 2, filter: 'drop-shadow(0 0 14px rgba(217,119,6,0.5))', rotate: 3, duration: 0.3 });
      } else if (target.closest('h3, h4')) {
        gsap.to(bean, { scale: 1.6, filter: 'drop-shadow(0 0 8px rgba(217,119,6,0.3))', duration: 0.3 });
      } else if (target.closest('button, [role="button"]')) {
        gsap.to(bean, { scale: 1.7, filter: 'drop-shadow(0 0 10px rgba(217,119,6,0.5))', duration: 0.3 });
      } else if (target.closest('[class*="lucide"], svg')) {
        gsap.to(bean, { scale: 1.4, duration: 0.3 });
      } else if (target.closest('a')) {
        gsap.to(bean, { scale: 1.5, filter: 'drop-shadow(0 0 6px rgba(217,119,6,0.3))', duration: 0.3 });
      } else if (target.closest('[class*="liquid-glass"]')) {
        gsap.to(bean, { scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(217,119,6,0.25))', duration: 0.3 });
      } else if (target.closest('img, iframe')) {
        gsap.to(bean, { scale: 1.3, duration: 0.3 });
      } else if (target.closest('h5, h6, p, span, em')) {
        gsap.to(bean, { scale: 1.15, duration: 0.3 });
      }
    };

    const onLeave = () => {
      gsap.to(bean, { scale: 1, filter: 'drop-shadow(0 0 0px transparent)', rotate: -15, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onHover, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHover);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={beanRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: '20px',
          height: '24px',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
          willChange: 'transform, filter',
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="11" cy="12" rx="9" ry="12" fill="rgba(180,100,40,0.9)" />
          <ellipse cx="11" cy="12" rx="7.5" ry="10" fill="url(#beanGrad)" />
          <defs>
            <radialGradient id="beanGrad" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="rgba(230,150,60,0.4)" />
              <stop offset="100%" stopColor="rgba(100,50,20,0.3)" />
            </radialGradient>
          </defs>
          <path
            d="M8 5 Q11 12 8 19"
            stroke="rgba(60,25,5,0.6)"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
