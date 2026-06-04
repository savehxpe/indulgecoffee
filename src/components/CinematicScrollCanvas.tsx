import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_BASE = '/frames/ezgif-frame';
const ZOOM_FACTOR = 1.35;
const MAX_PROBE = 210;
const MIN_READY = 40;

export const CinematicScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const totalRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'probing' | 'loading'>('probing');

  useEffect(() => {
    document.body.classList.add('loading');
    return () => document.body.classList.remove('loading');
  }, []);

  useEffect(() => {
    if (ready) document.body.classList.remove('loading');
  }, [ready]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img) return;

    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (iw === 0 || ih === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let sx = 0;
    let sy = 0;
    let sw = iw;
    let sh = ih;

    if (canvasRatio > imgRatio) {
      const neededH = iw / canvasRatio;
      sy = (ih - neededH) / 2;
      sh = neededH;
    } else {
      const neededW = ih * canvasRatio;
      sx = (iw - neededW) / 2;
      sw = neededW;
    }

    const cx = sx + sw / 2;
    const cy = sy + sh / 2;
    const zw = sw / ZOOM_FACTOR;
    const zh = sh / ZOOM_FACTOR;

    sx = Math.max(0, cx - zw / 2);
    sy = Math.max(0, cy - zh / 2);
    sw = Math.min(iw - sx, zw);
    sh = Math.min(ih - sy, zh);

    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const slots: (HTMLImageElement | null)[] = new Array(MAX_PROBE).fill(null);
    let pending = MAX_PROBE;
    let loadedCount = 0;

    const tryFinish = () => {
      if (pending > 0) return;

      let detected = 0;
      for (let i = 0; i < MAX_PROBE; i++) {
        if (slots[i] !== null) detected = i + 1;
        else break;
      }

      if (detected === 0) {
        setReady(true);
        return;
      }

      totalRef.current = detected;
      const valid = slots.slice(0, detected).filter((x): x is HTMLImageElement => x !== null);
      imagesRef.current = valid;
      const done = valid.length;
      loadedCount = done;

      if (done === detected) {
        complete(detected);
      } else if (done >= MIN_READY) {
        complete(detected);
      } else {
        setPhase('loading');
        setProgress(Math.round((done / detected) * 100));
      }
    };

    const complete = (total: number) => {
      setProgress(100);
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          setReady(true);
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        },
      });
    };

    const onFrameLoad = (idx: number, img: HTMLImageElement) => {
      slots[idx - 1] = img;
      loadedCount++;
      pending--;

      if (totalRef.current > 0) {
        const pct = Math.round((loadedCount / totalRef.current) * 100);
        setProgress(pct);
        if (loadedCount >= totalRef.current) {
          complete(totalRef.current);
          return;
        }
      }
      tryFinish();
    };

    const onFrameError = () => {
      pending--;
      tryFinish();
    };

    for (let i = 1; i <= MAX_PROBE; i++) {
      const img = new Image();
      const idx = i;

      img.onload = () => onFrameLoad(idx, img);
      img.onerror = () => onFrameError();

      const num = String(i).padStart(3, '0');
      img.src = `${FRAME_BASE}-${num}.jpg`;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (imagesRef.current.length > 0) {
        drawFrame(currentFrameRef.current);
      }
      ScrollTrigger.refresh();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!ready || imagesRef.current.length === 0) return;

    drawFrame(0);

    stRef.current = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const total = imagesRef.current.length;
        const idx = Math.min(total - 1, Math.max(0, Math.floor(self.progress * total)));
        if (currentFrameRef.current !== idx) {
          currentFrameRef.current = idx;
          drawFrame(idx);
        }
      },
    });

    return () => {
      stRef.current?.kill();
    };
  }, [ready]);

  useEffect(() => {
    const onMove = (xRatio: number, yRatio: number) => {
      gsap.to(canvasRef.current, {
        x: -xRatio * 22,
        y: -yRatio * 22,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouse = (e: MouseEvent) => onMove(
      (e.clientX / window.innerWidth) - 0.5,
      (e.clientY / window.innerHeight) - 0.5
    );
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      onMove(
        (e.touches[0].clientX / window.innerWidth) - 0.5,
        (e.touches[0].clientY / window.innerHeight) - 0.5
      );
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <>
      {/* Loading overlay */}
      {!ready && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black select-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          <div className="relative z-10 text-center flex flex-col items-center gap-5 px-4">
            <h2
              className="text-3xl md:text-5xl text-white font-normal tracking-wide"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Indulge Coffee
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {phase === 'probing' ? 'Warming the roasters…' : 'Loading Indulge Experience'}
            </p>

            <div className="w-44 h-px bg-white/10 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs font-mono text-accent tracking-widest">
              {progress}%
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen canvas background */}
      <div
        className="fixed inset-0 -z-20 bg-black overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </>
  );
};
