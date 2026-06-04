import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Sparkles } from 'lucide-react';
import { ScaleBurst } from './ScaleBurst';
import { Unfold } from './Unfold';

export const MenuPreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'brewing' | 'meals'>('all');

  const menuItems: MenuItem[] = [
    {
      id: 'm1',
      name: 'Double Espresso',
      category: 'coffee',
      price: 'M 32',
      description: 'Bright citrus. Deep cocoa. Pulled at 1,600m.',
      altitude: '1,600m',
      isSignature: true
    },
    {
      id: 'm2',
      name: 'Mountain Flat White',
      category: 'coffee',
      price: 'M 42',
      description: 'House blend with micro-foamed local milk. Creamy, honeyed.',
      isSignature: false
    },
    {
      id: 'm3',
      name: 'AeroPress Maloti Blend',
      category: 'brewing',
      price: 'M 46',
      description: 'Slow extraction. Floral, stone fruit sweetness.',
      altitude: '1,800m',
      isSignature: true
    },
    {
      id: 'm4',
      name: 'Siphon Charcoal Brew',
      category: 'brewing',
      price: 'M 54',
      description: 'Theatrical siphon. Clean cup, dark woodsmoke notes.',
      isSignature: false
    },
    {
      id: 'm5',
      name: 'Rosemary Honey Cappuccino',
      category: 'coffee',
      price: 'M 48',
      description: 'Organic rosemary, mountain honey. Warmth defined.',
      isSignature: true
    },
    {
      id: 'm6',
      name: 'Sourdough Melt',
      category: 'meals',
      price: 'M 75',
      description: 'Smoked cheddar, wild herbs, toasty butter crust.',
      isSignature: false
    },
    {
      id: 'm7',
      name: 'Ginger Cinnamon Scones',
      category: 'meals',
      price: 'M 58',
      description: 'Fresh buttermilk scones. Double cream, spiced berry compote.',
      isSignature: true
    }
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-white/[0.02] relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2e1503]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.24em] text-accent font-medium mb-3">
            Our Menu
          </span>
          <ScaleBurst>
            <h2
              className="text-4xl md:text-5xl font-normal text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              What We Pour
            </h2>
          </ScaleBurst>
          <p className="text-muted-foreground text-sm max-w-xl mt-3">
            Handcrafted drinks and slow comfort food for crisp mountain air.
          </p>

          <ScaleBurst>
            <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 bg-white/[0.02] rounded-full">
              {([
                { key: 'all', label: 'All' },
                { key: 'coffee', label: 'Espresso' },
                { key: 'brewing', label: 'Slow Brews' },
                { key: 'meals', label: 'Comfort Food' }
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScaleBurst>
        </div>

        <Unfold stagger={0.06}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`menu-item-${item.id}`}
              className="group p-5 rounded-2xl hover:bg-white/[0.01] transition-all duration-300"
            >
              <div className="flex justify-between items-baseline gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg text-white font-medium group-hover:text-amber-500 transition-colors">
                    {item.name}
                  </span>
                  {item.isSignature && (
                    <span className="text-[9px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      Signature
                    </span>
                  )}
                  {item.altitude && (
                    <span className="text-[9px] font-mono text-muted-foreground/80 bg-white/[0.03] px-2 py-0.5 rounded">
                      {item.altitude} alt
                    </span>
                  )}
                </div>
                <span className="text-base text-accent font-medium font-mono whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </Unfold>

        <ScaleBurst>
          <div className="mt-12 p-6 liquid-glass rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-accent/10 rounded-full text-accent">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-normal text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Coming Soon
              </h4>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Maloti Cascara Tea', desc: 'Wild coffee cherry husk, steeped slow' },
                { name: 'Smoked Paprika Flatbread', desc: 'Charred over basalt stone, whipped butter' },
                { name: 'Winter Spice Latte', desc: 'Cinnamon, clove, mountain honey' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium">{item.name}</span>
                    <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScaleBurst>
      </div>
    </section>
  );
};
