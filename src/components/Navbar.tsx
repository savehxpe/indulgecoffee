import React from 'react';
import { CoffeeGrainLogo } from './CoffeeGrainLogo';
import { tap } from '../utils/haptic';
import { DotMenu } from './DotMenu';

interface NavbarProps {
  onScrollToForm: () => void;
  onOpenDirections: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm, onOpenDirections }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experience', href: '#experience' },
    { label: 'Visit', href: '#visit' },
    { label: 'Bookings', href: '#enquiry' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto flex row justify-between items-center px-6 md:px-8 py-4">
        <a href="#home" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <CoffeeGrainLogo className="w-9 h-9 drop-shadow-[0_0_6px_rgba(217,119,6,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(217,119,6,0.5)] transition-all duration-300" />
          </div>
          <div className="flex flex-col">
            <span
              id="nav-brand-title"
              className="text-xl md:text-2xl tracking-normal text-foreground leading-[1.1] font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Indulge Coffee
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-accent leading-none font-medium text-left">Lesotho</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-y-[-1px]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            id="nav-order-enquire-cta"
            onClick={() => { tap(); window.open('https://wa.me/26662406907?text=Hi%20Indulge%2C%20I%20want%20to%20place%20an%20order.', '_blank'); }}
            className="hidden md:flex liquid-glass rounded-full px-5 py-2 text-xs md:text-sm text-foreground hover:scale-[1.03] transition-transform shadow-md items-center gap-2 cursor-pointer"
          >
            Order / Enquire
          </button>
          <div className="md:hidden"><DotMenu onOpenDirections={onOpenDirections} /></div>
        </div>
      </div>
    </nav>
  );
};
