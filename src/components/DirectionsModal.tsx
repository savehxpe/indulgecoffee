import React from 'react';
import { X, MapPin, Clock, Navigation, MessageCircle } from 'lucide-react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative liquid-glass rounded-3xl p-8 max-w-md w-full text-center animate-fade-rise z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer text-muted-foreground hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h3
          className="text-2xl text-white font-normal mb-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Indulge Coffee
        </h3>
        <p className="text-muted-foreground text-xs mb-8">Warmth at altitude.</p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 text-left">
            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">No 64 Malibamatso Street</p>
              <p className="text-muted-foreground text-xs">Lower Thetsane, Maseru, Lesotho</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Opening Hours</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Weekdays: 07:00 – 18:00<br />
                Saturdays: 08:00 – 17:00<br />
                Sundays: 09:00 – 15:00
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://maps.google.com/?q=No+64+Malibamatso+Street+Lower+Thetsane+Maseru+Lesotho"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-full text-xs uppercase tracking-wider font-semibold hover:scale-105 transition-transform cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </a>
          <a
            href="https://wa.me/26662406907?text=Hi%20Indulge%20Coffee%2C%20I%20need%20directions%20to%20your%20location."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Directions
          </a>
        </div>
      </div>
    </div>
  );
};
