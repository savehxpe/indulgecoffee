import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { tap } from '../utils/haptic';

interface BeanBotProps {
  onOpenDirections: () => void;
}

const BeanSVG: React.FC<{ w: number; h: number; paused?: boolean }> = ({ w, h, paused }) => (
  <svg
    viewBox="0 0 24 24"
    width={w}
    height={h}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
      animation: paused ? 'none' : 'pula-pulse 3s ease-in-out infinite',
    }}
  >
    <ellipse cx="12" cy="12" rx="10" ry="13" fill="rgba(180,100,40,0.7)" />
    <ellipse cx="12" cy="12" rx="8.5" ry="11" fill="url(#pulaGrad)" />
    <defs>
      <radialGradient id="pulaGrad" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="rgba(230,150,60,0.4)" />
        <stop offset="100%" stopColor="rgba(100,50,20,0.35)" />
      </radialGradient>
    </defs>
    <path d="M9 5.5 Q12 12 9 18.5" stroke="rgba(60,25,5,0.5)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
  </svg>
);

export const BeanBot: React.FC<BeanBotProps> = ({ onOpenDirections }) => {
  const [open, setOpen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const check = setInterval(() => {
      setIdle(document.body.classList.contains('idle'));
    }, 500);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    if (!idle) { setElapsed(0); return; }
    setElapsed(0);
    const tick = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(tick);
  }, [idle]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`;

  return (
    <>
      <style>{`
        @keyframes pula-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes brew-fade {
          0%, 100% { opacity: 0.2; letter-spacing: 0.4em; }
          50% { opacity: 0.5; letter-spacing: 0.55em; }
        }
      `}</style>

      {idle && (
        <div className="fixed inset-0 z-[9997] bg-black/20 pointer-events-none animate-fade-rise" />
      )}

      {idle && (
        <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center pointer-events-none animate-fade-rise" style={{ animationDuration: '1.5s' }}>
          <BeanSVG w={44} h={52} />
          <p
            className="text-accent/40 text-sm font-mono uppercase mt-5"
            style={{ animation: 'brew-fade 4s ease-in-out infinite' }}
          >
            Still brewing
          </p>
          <p className="text-accent/25 text-[10px] font-mono tracking-[0.3em] mt-2">{timeStr}</p>
          <p
            className="text-muted-foreground/25 text-[11px] mt-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Take your time.
          </p>
        </div>
      )}

      {!idle && (
        <button
          onClick={() => { tap(); setOpen(!open); }}
          className="fixed bottom-8 right-8 z-40 cursor-pointer group"
          aria-label="Chat with Pula"
        >
          <BeanSVG w={28} h={34} />
        </button>
      )}

      {!idle && open && (
        <div className="fixed bottom-24 right-6 z-50 liquid-glass rounded-2xl p-5 w-64 animate-fade-rise shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base text-white font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Pula</h3>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer text-muted-foreground hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-muted-foreground text-[11px] mb-4">Dumela! Nka u thusa joang?</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Menu & Hours', action: () => { setOpen(false); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); } },
              { label: 'Get Directions', action: () => { setOpen(false); onOpenDirections(); } },
              { label: 'Place Order', action: () => { setOpen(false); window.open('https://wa.me/26662406907?text=Hi%20Indulge%2C%20I%20want%20to%20place%20an%20order.', '_blank'); } },
              { label: 'Book Event', action: () => { setOpen(false); document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }); } },
            ].map((item) => (
              <button key={item.label} onClick={() => { tap(); item.action(); }} className="w-full text-left px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-medium transition-colors cursor-pointer">
                {item.label}
              </button>
            ))}
          </div>
          <a href="https://wa.me/26662406907?text=Dumela%20Pula!" target="_blank" rel="noopener noreferrer" className="mt-3 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer">
            Talk on WhatsApp →
          </a>
        </div>
      )}
    </>
  );
};
