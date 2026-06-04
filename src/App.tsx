import React, { useState, useEffect } from 'react';
import { SeoJsonLd } from './components/SeoJsonLd';
import { IndulgeFineArtBackground } from './components/background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActionCards } from './components/ActionCards';
import { MenuPreview } from './components/MenuPreview';
import { InteractiveHub } from './components/InteractiveHub';
import { InstagramGrid } from './components/InstagramGrid';
import { PopReveal } from './components/PopReveal';
import { CustomCursor } from './components/CustomCursor';
import { DirectionsModal } from './components/DirectionsModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ExitPopup } from './components/ExitPopup';
import { SecretMenu } from './components/SecretMenu';
import { WeatherContext } from './components/WeatherContext';
import { CozyMode } from './components/CozyMode';
import { IdleMode } from './components/IdleMode';
import { BeanBot } from './components/BeanBot';
import { LeadSubmission } from './types';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);


export default function App() {
  // Store submissions in local state, initialized from localStorage
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<'order' | 'event'>('order');

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('indulge_leads_telemetry');
      if (stored) {
        setSubmissions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local storage telemetry", e);
    }
  }, []);

  // Central submission handler
  const handleAddSubmission = (lead: Omit<LeadSubmission, 'id' | 'createdAt'>) => {
    const newSubmission: LeadSubmission = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' UTC'
    };

    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('indulge_leads_telemetry', JSON.stringify(updated));
  };

  // Open Enquiry modal
  const handleOpenEnquiry = (type: 'order' | 'event') => {
    setEnquiryType(type);
    setIsEnquiryOpen(true);
  };

  // Smooth scroll helper using GSAP ScrollToPlugin
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, autoKill: false },
        ease: 'power3.inOut'
      });
    }
  };

  const handleScrollToForm = () => handleScrollToSection('enquiry');


  const isSecretRoute = window.location.pathname === '/secret' || window.location.pathname === '/qr';

  if (isSecretRoute) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SecretMenu onAddSubmission={handleAddSubmission} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white selection:bg-accent/40 font-sans antialiased overflow-x-hidden">
      <CustomCursor />
      {/* Structuring for SEO meta indices */}
      <SeoJsonLd />
      
      {/* Background container ready for cinematic assets */}
      <IndulgeFineArtBackground />

      {/* Embedded Fixed Header Nav */}
      <header>
        <Navbar 
          onScrollToForm={handleScrollToForm}
          onOpenDirections={() => setIsDirectionsOpen(true)}
        />
      </header>

      {/* Main Structural Flow */}
      <main className="relative min-h-[500vh] flex flex-col justify-between py-12 gap-32">
        
        {/* HERO SECTION */}
        <PopReveal>
          <Hero 
            onOpenEnquiry={handleOpenEnquiry}
            onGetDirections={() => setIsDirectionsOpen(true)}
            onScrollToForm={handleScrollToForm}
          />
        </PopReveal>

        {/* TRIPLE EXPERIENTIAL CARDS SECTION */}
        <ActionCards 
          onOpenEnquiry={handleOpenEnquiry}
          onScrollToSection={handleScrollToSection}
        />

        {/* AMBIENT MOUNTAIN CONDITIONS */}
        <section className="py-8 px-6">
          <WeatherContext />
        </section>

        {/* MENU TASTING PREVIEW SECTION */}
        <MenuPreview />

        {/* SENSORY SOCIAL MOOD PREVIEW SECTION */}
        <InstagramGrid />

        {/* INTERACTIVE VISIT & LEAD GATHERING HUB */}
        <InteractiveHub 
          onAddSubmission={handleAddSubmission}
        />

      </main>

      {/* STATIC SENSORY BRAND OUTCOME FOOTER */}
      <PopReveal>
        <footer className="bg-black/80 backdrop-blur-md py-16 px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] relative z-1 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="flex flex-col gap-2">
            <h4 
              className="text-2xl text-white font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Indulge Coffee
            </h4>
            <p className="text-muted-foreground text-xs max-w-sm mt-1 leading-relaxed">
              Maseru, Lesotho • Where warmth meets altitude. Pull up a comfortable chair, warm your pulse by the basalt fires, and celebrate the slow steam.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3 font-mono">
            <p className="text-[10px] text-muted-foreground/60">
              © {new Date().getFullYear()} Indulge Coffee. Handcrafted in Lesotho. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
      </PopReveal>

      {/* INTERACTIVE LIGHTBOX DIALOGS */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />

      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        onAddSubmission={handleAddSubmission}
        initialType={enquiryType}
      />

      <ExitPopup onAddSubmission={handleAddSubmission} />
      <CozyMode />
      <BeanBot onOpenDirections={() => setIsDirectionsOpen(true)} />
      <IdleMode />
    </div>
  );
}
