import { useEffect, useRef } from 'react';

const IDLE_TIMEOUT = 8000;

export const IdleMode: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reset = () => {
      if (document.body.classList.contains('menu-open')) return;
      document.body.classList.remove('idle');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        document.body.classList.add('idle');
      }, IDLE_TIMEOUT);
    };

    reset();

    window.addEventListener('mousemove', reset, { passive: true });
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('touchmove', reset, { passive: true });
    window.addEventListener('keydown', reset, { passive: true });

    return () => {
      document.body.classList.remove('idle');
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('touchmove', reset);
      window.removeEventListener('keydown', reset);
    };
  }, []);

  return null;
};
