import { useState } from 'react';
import { LeadSubmission } from '../types';

interface SecretMenuProps {
  onAddSubmission: (lead: Omit<LeadSubmission, 'id' | 'createdAt'>) => void;
}

const menuItems = [
  { name: 'Altitude Cold Brew', desc: '24-hour steep at 1,600m. Smooth, chocolatey, lethal.', price: 'M 48' },
  { name: 'Basalt Fire Smores Latte', desc: 'Toasted marshmallow, dark chocolate, espresso, graham crumb.', price: 'M 56' },
  { name: 'Mountain Honey Affogato', desc: 'Lesotho wildflower honey, double espresso, vanilla bean ice cream.', price: 'M 52' },
];

export const SecretMenu: React.FC<SecretMenuProps> = ({ onAddSubmission }) => {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onAddSubmission({
      name: 'QR Scan',
      contact: email,
      type: 'newsletter',
      message: 'Unlocked secret menu via QR code.'
    });
    setDone(true);
    setTimeout(() => setUnlocked(true), 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      {unlocked ? (
        <div className="animate-fade-rise max-w-md w-full">
          <h1 className="text-3xl font-normal text-accent mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Secret Menu
          </h1>
          <p className="text-muted-foreground text-xs mb-10">Off-menu. For those who ask nicely.</p>

          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.name} className="liquid-glass rounded-2xl p-5 text-left">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-white text-base font-medium">{item.name}</h3>
                  <span className="text-accent text-sm font-mono">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground/60 mt-10 font-mono">
            Show this at the counter. Whisper "secret menu."
          </p>
        </div>
      ) : (
        <div className="animate-fade-rise max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 4L24 24M24 4L4 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-normal text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            You found it.
          </h1>
          <p className="text-muted-foreground text-xs mb-8">
            Enter your email to unlock the secret menu.
          </p>

          {done ? (
            <div className="py-4 animate-pulse text-accent text-sm font-medium">Unlocking...</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-sm rounded-full bg-white/[0.03] text-white placeholder-muted-foreground focus:outline-none focus:border-accent border border-white/5"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-accent hover:bg-amber-600 text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
              >
                Unlock
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
