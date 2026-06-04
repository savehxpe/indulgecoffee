import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { SteamRise } from './SteamRise';
import { FloatUp } from './FloatUp';
import { SteamWisps } from './SteamWisps';
import { GlowOrb } from './GlowOrb';
import { tap } from '../utils/haptic';

interface HeroProps {
  onOpenEnquiry: (type: 'order' | 'event') => void;
  onGetDirections: () => void;
  onScrollToForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, onGetDirections, onScrollToForm }) => {
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    let count: number;
    if (hour >= 7 && hour < 9) count = Math.floor(Math.random() * 7) + 18;
    else if (hour >= 9 && hour < 12) count = Math.floor(Math.random() * 7) + 12;
    else if (hour >= 12 && hour < 15) count = Math.floor(Math.random() * 7) + 8;
    else if (hour >= 15 && hour < 18) count = Math.floor(Math.random() * 7) + 10;
    else count = Math.floor(Math.random() * 5) + 4;
    setLiveCount(count);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-36 pb-20 md:pt-44 md:pb-28 min-h-[92vh] max-w-7xl mx-auto"
      style={{ perspective: '1200px' }}
    >
      <GlowOrb className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px]" />

      <SteamWisps />

      <div className="animate-fade-rise">
        <span
          id="hero-eyebrow"
          className="text-xs uppercase tracking-[0.32em] text-muted-foreground/90 mb-5 block font-medium"
        >
          Maseru, Lesotho · Warmth at altitude
        </span>
      </div>

      <SteamRise>
        <h1
          id="hero-heading"
          className="text-4xl sm:text-6xl md:text-8xl leading-[0.92] tracking-[-0.03em] max-w-5xl font-normal mx-auto text-white hover:text-accent transition-colors duration-500"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Slow coffee. Warm air. Mountain quiet.
        </h1>
      </SteamRise>

      <SteamRise>
        <p
          id="hero-subtext"
          className="text-muted-foreground/80 text-base sm:text-lg md:text-xl max-w-2xl mt-9 leading-relaxed px-2 font-light"
        >
          Built for mornings that don't rush. Coffee, steam, conversation.
        </p>
      </SteamRise>

      <FloatUp stagger={0.15}>
        <button
          id="hero-primary-cta"
          onClick={() => { tap(); window.open('https://wa.me/26662406907?text=Hi%20Indulge%2C%20I%20want%20to%20place%20an%20order.', '_blank'); }}
          className="liquid-glass-accent rounded-full px-10 md:px-14 py-4 md:py-5 text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform font-medium shadow-xl hover:shadow-accent/5 duration-300 flex items-center justify-center gap-2 group animate-[cta-shake_3s_ease-in-out_infinite] hover:animate-none"
        >
          <span>Order / Enquire</span>
          <ArrowUpRight className="w-5 h-5 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
        <button
          id="hero-secondary-cta"
          onClick={() => { tap(); onGetDirections(); }}
          className="rounded-full px-10 md:px-12 py-4 md:py-5 text-base text-muted-foreground hover:text-foreground transition-all font-medium bg-white/[0.01] hover:bg-white/[0.03] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Compass className="w-4 h-4 text-muted-foreground group-hover:rotate-12 transition-transform" />
          <span>Get Directions</span>
        </button>
      </FloatUp>

      <div className="animate-fade-rise-delay-2 mt-12 md:mt-16 flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.24em] font-medium opacity-75">
        <span>Coffee</span>
        <span className="text-white/25">·</span>
        <span>Meals</span>
        <span className="text-white/25">·</span>
        <span>Work</span>
        <span className="text-white/25">·</span>
        <span>Meetups</span>
        <span className="text-white/25">·</span>
        <span>Events</span>
      </div>

      {liveCount > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-xs animate-fade-rise-delay-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-muted-foreground">{liveCount} people</span>
          <span className="text-muted-foreground/60">at Indulge right now</span>
        </div>
      )}
    </section>
  );
};
