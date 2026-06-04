import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { SlideReveal } from './SlideReveal';
import { Card3D } from './Card3D';
import { tap } from '../utils/haptic';

interface ActionCardsProps {
  onOpenEnquiry: (type: 'order' | 'event') => void;
  onScrollToSection: (id: string) => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({
  onOpenEnquiry,
  onScrollToSection
}) => {
  const WA_LINK = 'https://wa.me/26662406907';
const ORDER_TEXT = 'Hi%20Indulge%2C%20I%20want%20to%20place%20an%20order.';
const CLUB_TEXT = 'Hi%20Indulge%2C%20I%20want%20to%20join%20the%20Social%20Club.';

const cards = [
    {
      id: "come-through",
      title: "Pull up",
      copy: "Coffee, conversation, quiet work. No rush.",
      icon: Sparkles,
      actionLabel: "Hours & location",
      iconColor: "text-amber-400",
      direction: 'left' as const,
      onClick: () => { tap(); onScrollToSection("visit"); }
    },
    {
      id: "order-ease",
      title: "Order ahead",
      copy: "WhatsApp your order. We'll have it ready.",
      icon: MessageCircle,
      actionLabel: "Order on WhatsApp",
      iconColor: "text-emerald-400",
      direction: 'bottom' as const,
      onClick: () => { tap(); window.open(`${WA_LINK}?text=${ORDER_TEXT}`, '_blank'); }
    },
    {
      id: "join-club",
      title: "Join the Club",
      copy: "Exclusive tastings. Early menu. Birthday pour-over.",
      icon: Sparkles,
      actionLabel: "Join on WhatsApp",
      iconColor: "text-amber-400",
      direction: 'right' as const,
      onClick: () => { tap(); window.open(`${WA_LINK}?text=${CLUB_TEXT}`, '_blank'); }
    }
  ];

  return (
    <section className="bg-transparent relative z-10">
      <div
        id="action-cards-grid"
        className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto px-6 pb-24"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <SlideReveal key={card.id} direction={card.direction}>
              <Card3D>
                <div
                  id={`card-${card.id}`}
                  onClick={card.onClick}
                  className="liquid-glass rounded-3xl p-7 text-left group hover:bg-white/[0.05] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
                >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span
                      className="text-2xl font-normal text-white leading-none group-hover:accent-glow transition-all duration-300"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {card.title}
                    </span>
                    <div className={`p-2 rounded-xl bg-white/[0.03] group-hover:bg-white/5 transition-all text-muted-foreground ${card.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {card.copy}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>{card.actionLabel}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
                </div>
              </Card3D>
            </SlideReveal>
          );
        })}
      </div>
    </section>
  );
};
