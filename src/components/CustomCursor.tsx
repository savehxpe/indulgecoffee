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
          <defs>
            <radialGradient id="bean-body" cx="35%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#8B5A3C" />
              <stop offset="35%" stopColor="#4A2C17" />
              <stop offset="70%" stopColor="#2E1503" />
              <stop offset="100%" stopColor="#140601" />
            </radialGradient>
            <linearGradient id="bean-shadow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="55%" stopColor="transparent" />
              <stop offset="80%" stopColor="rgba(10,4,0,0.4)" />
              <stop offset="100%" stopColor="rgba(10,4,0,0.65)" />
            </linearGradient>
            <linearGradient id="bean-gloss" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g transform="translate(12,12.5) rotate(-15) translate(-12,-12.5)">
            <ellipse cx="12" cy="12.5" rx="5.2" ry="8.8" fill="url(#bean-body)" />
            <ellipse cx="12" cy="12.5" rx="5.2" ry="8.8" fill="url(#bean-shadow)" />
            <path d="M11 4.5 C13.8 7.5 15.2 10.5 13.5 14 C12 17 9.5 19.5 9.5 20.5" stroke="rgba(10,3,0,0.5)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M11.3 4.7 C14 7.7 15.2 10.5 13.5 13.8 C12.2 16.5 9.8 19 9.8 20" stroke="rgba(217,119,6,0.45)" strokeWidth="0.3" strokeLinecap="round" fill="none" />
            <ellipse cx="9.5" cy="6" rx="2.8" ry="1.4" fill="url(#bean-gloss)" transform="rotate(-14 9.5 6)" />
            <ellipse cx="9" cy="5.2" rx="1.2" ry="0.6" fill="white" opacity="0.4" transform="rotate(-10 9 5.2)" />
          </g>
        </svg>
      </div>
    </div>
  );
};
