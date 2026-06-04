import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const PARTICLE_COUNT = 35;

export const SteamParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];

    const spawn = () => {
      const size = Math.random() * 18 + 8;
      return {
        x: w * 0.3 + Math.random() * w * 0.4,
        y: h * 0.5 + Math.random() * h * 0.3,
        size,
        speed: Math.random() * 0.3 + 0.15,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 180 + 120,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', resize);

    let animId: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.life++;

        if (p.life < p.maxLife * 0.15) {
          p.opacity = (p.life / (p.maxLife * 0.15)) * 0.35;
        } else if (p.life > p.maxLife * 0.7) {
          p.opacity = ((p.maxLife - p.life) / (p.maxLife * 0.3)) * 0.35;
        }

        if (p.life >= p.maxLife || p.y < -p.size) {
          Object.assign(p, spawn());
        }

        const col = Math.random() > 0.7
          ? `rgba(217,119,6,${p.opacity})`
          : `rgba(251,246,240,${p.opacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.filter = `blur(${p.size * 0.4}px)`;
        ctx.fill();
        ctx.filter = 'none';
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};
