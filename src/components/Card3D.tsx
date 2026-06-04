import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Card3DProps {
  children: React.ReactNode;
  intensity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({ children, intensity = 12 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className="preserve-3d"
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
    >
      {children}
    </div>
  );
};
