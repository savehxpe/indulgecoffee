import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { tap } from '../utils/haptic';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Visit', href: '#visit' },
  { label: 'Bookings', href: '#enquiry' },
];

export const DotMenu: React.FC<{ onOpenDirections: () => void }> = ({ onOpenDirections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
      document.body.classList.remove('idle');
      requestAnimationFrame(() => {
        if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        if (panelRef.current) gsap.fromTo(panelRef.current, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
      });
      setAnimating(false);
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const closeAnimated = () => {
    if (animating) return;
    setAnimating(true);
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(panelRef.current, { scale: 0.3, opacity: 0, duration: 0.3, ease: 'power3.in', onComplete: () => { setIsOpen(false); setAnimating(false); } });
  };

  return (
    <>
      <button
        onClick={() => { tap(); setIsOpen(true); }}
        className="flex flex-col gap-[4px] p-2.5 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0"
            onClick={closeAnimated}
          />
          <div ref={panelRef} className="relative liquid-glass rounded-3xl p-8 max-w-sm w-full text-center z-10" style={{ transform: 'scale(0.3)', opacity: 0 }}>
            <button
              onClick={closeAnimated}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer text-muted-foreground hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3
              className="text-2xl text-white font-normal mb-8"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Indulge Coffee
            </h3>

            <div className="flex flex-col gap-3 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); closeAnimated(); setTimeout(() => window.location.hash = link.href, 400); }}
                  className="text-base text-white font-medium py-2 hover:text-accent transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => { closeAnimated(); onOpenDirections(); }}
              className="w-full text-left px-5 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-white text-sm font-medium transition-colors cursor-pointer mb-3 flex items-center gap-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span className="text-accent">📍</span> Get Directions
            </button>

            <button
              onClick={() => {
                closeAnimated();
                window.open('https://wa.me/26662406907?text=Hi%20Indulge%2C%20I%20want%20to%20place%20an%20order.', '_blank');
              }}
              className="w-full liquid-glass-accent rounded-full px-6 py-4 text-base text-foreground hover:scale-[1.02] transition-transform font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              Order / Enquire
            </button>
          </div>
        </div>
      )}
    </>
  );
};
