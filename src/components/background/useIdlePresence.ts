import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useIdlePresence(delayMs: number) {
  const [isIdle, setIsIdle] = useState(false);
  const progressRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInteractionRef = useRef(Date.now());
  const enterTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const reset = () => {
      lastInteractionRef.current = Date.now();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (enterTweenRef.current) enterTweenRef.current.kill();

      if (isIdle) {
        enterTweenRef.current = gsap.to(progressRef, {
          current: 0,
          duration: 0.8,
          ease: 'power3.out',
          onUpdate: () => {},
          onComplete: () => setIsIdle(false),
        });
      }

      timerRef.current = setTimeout(() => {
        setIsIdle(true);
        enterTweenRef.current = gsap.to(progressRef, {
          current: 1,
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }, delayMs);
    };

    reset();

    window.addEventListener('mousemove', reset, { passive: true });
    window.addEventListener('pointermove', reset, { passive: true });
    window.addEventListener('wheel', reset, { passive: true });
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('touchstart', reset, { passive: true });
    window.addEventListener('touchmove', reset, { passive: true });
    window.addEventListener('keydown', reset, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (enterTweenRef.current) enterTweenRef.current.kill();
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('pointermove', reset);
      window.removeEventListener('wheel', reset);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('touchstart', reset);
      window.removeEventListener('touchmove', reset);
      window.removeEventListener('keydown', reset);
    };
  }, [delayMs, isIdle]);

  return {
    isIdle,
    idleProgress: progressRef.current,
    lastInteractionAt: lastInteractionRef.current,
  };
}
