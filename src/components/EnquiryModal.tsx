import React, { useState } from 'react';
import { X, Check, Coffee, MessageSquare, BookOpen, Clock } from 'lucide-react';
import { LeadSubmission } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubmission: (lead: Omit<LeadSubmission, 'id' | 'createdAt'>) => void;
  initialType?: 'order' | 'event';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  onAddSubmission,
  initialType = 'order'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [itemSelect, setItemSelect] = useState('High-Altitude Espresso');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddSubmission({
      name,
      contact: phone,
      type: 'order',
      message: `Selected Brew: ${itemSelect}. Custom orders: ${notes || 'None'}`
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setNotes('');
      onClose();
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-rise">
      <div className="w-full max-w-lg bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close Button top corner */}
        <button 
          id="enquiry-modal-close"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.03] border border-white/10 text-muted-foreground hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="p-8 text-center py-16 animate-fade-rise">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center text-accent mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
              <Check className="w-8 h-8" />
            </div>
            
            <h3 
              className="text-3xl text-white font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Enquiry Transmitted
            </h3>
            
            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm mx-auto">
              You request was stored on the local Maseru dashboard. For immediate bar updates, tap the link below to load standard pre-filled chat coordinates.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <a 
                href={`https://wa.me/26662406907?text=Hello%20Indulge%20Coffee%2C%20I%27d%20like%20to%20place%20an%20order%20for%20a%20${encodeURIComponent(itemSelect)}.%20My%20name%20is%20${encodeURIComponent(name)}.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs uppercase tracking-widest font-semibold transition-all hover:scale-103 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Launch WhatsApp Barista</span>
              </a>
              <button 
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white py-3.5"
              >
                Dismiss Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <span className="text-[9px] uppercase tracking-widest text-accent font-mono">Coffee Experience Lounge</span>
            
            <h3 
              className="text-3xl text-white font-normal mt-2 mb-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Place Brew Order / Enquiry
            </h3>
            
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-6">
              Our beans are freshly roasted and carefully ground at high altitude. Submit this placeholder order, or chat instantly.
            </p>

            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rethabile"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-white/[0.02] text-white border border-white/5 focus:outline-none focus:border-accent duration-300"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">WhatsApp Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. +266 5800 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-white/[0.02] text-white border border-white/5 focus:outline-none focus:border-accent duration-300"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Incline Signature Brew</label>
                <select 
                  value={itemSelect}
                  onChange={(e) => setItemSelect(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-black text-white border border-white/10 focus:outline-none focus:border-accent duration-300"
                >
                  <option value="High-Altitude Espresso">High-Altitude Double Espresso (M 32)</option>
                  <option value="Mountain Flat White">Mountain Flat White (M 42)</option>
                  <option value="AeroPress Maloti">AeroPress Maloti (M 46)</option>
                  <option value="Siphon Charcoal">Siphon Charcoal Infusion (M 54)</option>
                  <option value="Steeped Rosemary Cappuccino">Steeped Rosemary Cappuccino (M 48)</option>
                  <option value="Granule-Crusted Melt">Granule Sourdough Melt (M 75)</option>
                  <option value="Warm Spiced Scones">Spiced Scone Platter (M 58)</option>
                  <option value="General Conversation Slot">General Lounge Seat Inquiry</option>
                </select>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Add Custom Barista Requests (Optional)</label>
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra hot milk, double shot, sugar requests, or special pick-up slot..."
                  className="w-full px-4 py-3 text-xs rounded-xl bg-white/[0.02] text-white border border-white/5 focus:outline-none focus:border-accent duration-300 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-accent hover:bg-amber-600 text-white text-xs uppercase tracking-widest font-mono py-4 rounded-full transition-all mt-4 cursor-pointer shadow-lg hover:shadow-accent/15"
              >
                Transmit Order Code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
