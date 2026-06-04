import { useEffect, useState } from 'react';
import { LeadSubmission } from '../types';

interface ExitPopupProps {
  onAddSubmission: (lead: Omit<LeadSubmission, 'id' | 'createdAt'>) => void;
}

export const ExitPopup: React.FC<ExitPopupProps> = ({ onAddSubmission }) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (dismissed) return;

    let timer: ReturnType<typeof setTimeout>;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', onLeave);

    timer = setTimeout(() => {
      const scrolled = window.scrollY > 800 && window.scrollY < document.body.scrollHeight - window.innerHeight - 200;
      if (!scrolled) {
        document.addEventListener('scroll', () => {
          if (window.scrollY > window.innerHeight * 0.8) {
            setVisible(true);
          }
        }, { once: true });
      }
    }, 30000);

    return () => {
      document.removeEventListener('mouseleave', onLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onAddSubmission({
      name: 'Exit Popup',
      contact: email,
      type: 'newsletter',
      message: 'Captured via exit popup.'
    });
    setDone(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('exit_popup_dismissed', '1');
    }, 3000);
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('exit_popup_dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleDismiss} />
      <div className="relative liquid-glass rounded-3xl p-8 max-w-sm w-full text-center animate-fade-rise z-10">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer text-muted-foreground hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {done ? (
          <div className="py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">You're in. Welcome.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl text-white font-normal mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Leaving already?
            </h3>
            <p className="text-muted-foreground text-xs mb-6">
              Join the Coffee Letters. Small-batch news, no noise.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-full bg-white/[0.03] text-white placeholder-muted-foreground focus:outline-none focus:border-accent border border-white/5"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-accent hover:bg-amber-600 text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
              >
                Stay
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
