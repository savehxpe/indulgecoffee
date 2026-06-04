import React, { useState } from 'react';
import { MapPin, Clock, Send, Check, Sparkles, AlertCircle } from 'lucide-react';
import { LeadSubmission } from '../types';
import { EasyIn } from './EasyIn';
import { ScaleBurst } from './ScaleBurst';
import { GlowOrb } from './GlowOrb';

interface InteractiveHubProps {
  onAddSubmission: (lead: Omit<LeadSubmission, 'id' | 'createdAt'>) => void;
}

export const InteractiveHub: React.FC<InteractiveHubProps> = ({ onAddSubmission }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [purpose, setPurpose] = useState('Experience Tasting');
  const [guests, setGuests] = useState('5-10 guests');
  const [notes, setNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [directionsStatus, setDirectionsStatus] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    onAddSubmission({
      name,
      contact: `${contact} (${guests})`,
      type: 'event',
      message: `Enquiry: ${purpose}. Notes: ${notes || 'None'}`
    });

    setBookingSubmitted(true);
    setTimeout(() => {
      setName('');
      setContact('');
      setNotes('');
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    onAddSubmission({
      name: 'Guest Subscriber',
      contact: newsletterEmail,
      type: 'newsletter',
      message: 'Subscribed to coffee updates.'
    });

    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  const triggerDirectionsSim = () => {
    setDirectionsStatus("Opening GPS coordinates for No 64 Malibamatso Street, Lower Thetsane. Ready to visit.");
    setTimeout(() => {
      setDirectionsStatus(null);
    }, 6000);
  };

  return (
    <section id="visit" className="py-24 bg-white/[0.02] relative">
      <GlowOrb className="bottom-0 left-10 w-[400px] h-[400px]" />

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-12 gap-12">

          <EasyIn direction="left" className="lg:col-span-5">
            <div className="flex flex-col justify-between text-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-accent font-medium mb-3 block">
                  Visit Us
                </span>
                <h2
                  className="text-4xl md:text-5xl font-normal text-white mb-6 leading-[1.1]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Kingsway Road, Maseru
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Stone, fire, glass. Built for long conversations.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 justify-center">
                    <div className="p-3 bg-white/[0.02] rounded-full text-accent mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Address</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        No 64 Malibamatso Street, Lower Thetsane, Maseru.
                        <span className="block text-accent/80 mt-1 font-mono text-[10px]">Elevation: 1,600m</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 justify-center">
                    <div className="p-3 bg-white/[0.02] rounded-full text-accent mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Hours</h4>
                      <div className="text-muted-foreground text-xs mt-1 space-y-1">
                        <p>Weekdays: 07:00 – 18:00</p>
                        <p>Saturdays: 08:00 – 17:00</p>
                        <p>Sundays: 09:00 – 15:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                  <button
                    id="btn-trigger-directions-action"
                    onClick={triggerDirectionsSim}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap rounded-full hover:scale-105 active:scale-95 transition-transform text-xs font-semibold uppercase tracking-wider bg-white text-black cursor-pointer shadow-lg"
                  >
                    Get GPS Coordinates
                  </button>
                  </div>

                  {directionsStatus && (
                    <div className="mt-4 p-4 rounded-2xl bg-accent/10 text-xs text-white leading-relaxed animate-fade-rise flex gap-2">
                      <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{directionsStatus}</span>
                    </div>
                  )}
                </div>
              </div>

              <ScaleBurst>
                <div id="newsletter-segment" className="mt-12 p-8 rounded-3xl bg-accent/5 relative overflow-hidden" style={{ boxShadow: '0 0 40px rgba(217,119,6,0.06), 0 0 0 1px rgba(217,119,6,0.08)' }}>
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Coffee Letters
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    Small-batch news. No noise.
                  </p>

                  {newsletterSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-xs text-emerald-400 font-medium flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      You're on the list.
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 px-4 py-2 text-xs rounded-full bg-white/[0.03] text-white placeholder-muted-foreground focus:outline-none focus:border-accent duration-300"
                      />
                      <button
                        type="submit"
                        className="p-2.5 rounded-full bg-accent hover:bg-amber-600 transition-colors text-white cursor-pointer shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </ScaleBurst>
            </div>
          </EasyIn>

          <EasyIn direction="right" className="lg:col-span-7">
            <div id="enquiry">
              <div className="liquid-glass rounded-3xl p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

                <h3
                  className="text-3xl text-white font-normal mb-2 leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Book a Moment
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-8">
                  Private sessions, brand dinners, acoustic evenings.
                </p>

                {bookingSubmitted ? (
                  <div className="py-12 px-4 flex flex-col items-center text-center animate-fade-rise">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl text-white font-medium mb-2">Enquiry Pending</h4>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      We'll respond within 4–6 hours. Let's arrange something special.
                    </p>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => setBookingSubmitted(false)}
                        className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white px-5 py-2.5 rounded-full transition-all cursor-pointer"
                      >
                        New Request
                      </button>
                      <a
                        href="https://wa.me/26662406907?text=Hello%20Indulge%20Coffee%2C%20I%20just%20submitted%20an%20enquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5"
                      >
                        WhatsApp Chat
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lerato Ntsane"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.02] text-white focus:outline-none focus:border-accent duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">WhatsApp / Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +266 5800..."
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.02] text-white focus:outline-none focus:border-accent duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Purpose</label>
                        <select
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-black text-white focus:outline-none focus:border-accent duration-300"
                        >
                          <option value="Experience Tasting">Coffee Tasting</option>
                          <option value="Private Gathering">Private Gathering</option>
                          <option value="Creative Session">Brand Session</option>
                          <option value="Work/Group Study">Co-working Block</option>
                          <option value="Acoustic Enquiries">Acoustic Evening</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Guests</label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-black text-white focus:outline-none focus:border-accent duration-300"
                        >
                          <option value="1-4 guests">Small group (1-4)</option>
                          <option value="5-10 guests">Mid-size (5-10)</option>
                          <option value="10-20 guests">Lounge (10-20)</option>
                          <option value="20+ guests">Private venue (20+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Notes (Optional)</label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Custom AeroPress lessons, special dates..."
                        className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.02] text-white focus:outline-none focus:border-accent duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-amber-600 text-white font-medium text-xs uppercase tracking-widest py-4 rounded-full transition-colors font-mono cursor-pointer shadow-lg"
                    >
                      Send Enquiry
                    </button>
                    <p className="text-center text-[10px] text-muted-foreground mt-2 font-mono">
                      No spam. Requests logged to local dashboard.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </EasyIn>

        </div>
      </div>
    </section>
  );
};
