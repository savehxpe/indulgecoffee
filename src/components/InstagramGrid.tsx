import React, { useEffect, useState, useRef } from 'react';
import { Instagram, Flame } from 'lucide-react';
import { ScaleBurst } from './ScaleBurst';
import { PolaroidDrop } from './PolaroidDrop';
import { GlowOrb } from './GlowOrb';

const igBlock = (permalink: string, caption: string) =>
  `<blockquote class="instagram-media" data-instgrm-permalink="${permalink}?utm_source=ig_embed&hidecaption=1" data-instgrm-version="14" style="background:#0a0a0a;border:0;border-radius:12px;margin:1px;max-width:540px;min-width:326px;padding:0;width:100%"><div style="padding:16px"><a href="${permalink}?utm_source=ig_embed" style="background:#0a0a0a;line-height:0;padding:0;text-align:center;text-decoration:none;width:100%" target="_blank"><div style="padding:40% 0"></div><div style="padding-top:8px"><div style="color:#888;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:550;line-height:18px">View this post on Instagram</div></div><div style="padding:12.5% 0"></div></a><p style="color:#666;font-family:Arial,sans-serif;font-size:14px;line-height:17px;margin-bottom:0;margin-top:8px;overflow:hidden;padding:8px 0 7px;text-align:center;text-overflow:ellipsis;white-space:nowrap"><a href="${permalink}?utm_source=ig_embed" style="color:#666;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:normal;line-height:17px;text-decoration:none" target="_blank">${caption}</a></p></div></blockquote>`;

const posts = [
  { id: 'ig1', permalink: 'https://www.instagram.com/reel/DUIyn_cDOBL', caption: 'A post shared by iindulge coffee (@iindulge__)' },
  { id: 'ig2', permalink: 'https://www.instagram.com/reel/DX9QDBWINKJ', caption: 'A post shared by iindulge coffee (@iindulge__)' },
  { id: 'ig3', permalink: 'https://www.instagram.com/reel/DSHbPZGDvJb', caption: 'A post shared by iindulge coffee (@iindulge__)' },
  { id: 'ig4', permalink: 'https://www.instagram.com/reel/DVij9TeDEnX', caption: 'A post shared by iindulge coffee (@iindulge__)' },
];

export const InstagramGrid: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
          if (!existing) {
            const script = document.createElement('script');
            script.src = '//www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => setLoaded(true);
            document.body.appendChild(script);
          } else {
            setLoaded(true);
          }
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-white/[0.02] relative">
      <GlowOrb className="top-1/3 right-0 w-[400px] h-[400px]" />

      <div className="max-w-5xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.24em] text-accent font-medium mb-3 block">
              @iindulge__
            </span>
            <ScaleBurst>
              <h2
                className="text-4xl md:text-5xl font-normal text-white leading-none"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Inside Indulge
              </h2>
            </ScaleBurst>
            <p className="text-muted-foreground text-xs mt-3 max-w-md">
              Soft steam. Toasted grains. Warm fire. Mountain chill.
            </p>
          </div>

          <a
            href="https://instagram.com/iindulge__"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.02] transition-all text-xs tracking-wider uppercase font-semibold text-white cursor-pointer hover:scale-105 active:scale-95"
          >
            <Instagram className="w-4 h-4 text-accent" />
            <span>Follow @iindulge__</span>
          </a>
        </div>

        <PolaroidDrop stagger={0.08}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {posts.map((post) => (
              <div
                key={post.id}
                className="liquid-glass rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-300 max-h-[380px] relative"
              >
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: igBlock(post.permalink, post.caption) }} />
              </div>
            ))}
          </div>
        </PolaroidDrop>

        <ScaleBurst>
          <div className="mt-14 text-center p-6 bg-[#2e1503]/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3.5 text-left">
              <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase font-mono tracking-wider font-semibold text-white">Mountain Aroma Nights</p>
                <p className="text-muted-foreground text-[11px] mt-0.5 leading-relaxed">Slow-brew sessions, roasted grains, fireside acoustic evenings.</p>
              </div>
            </div>
            <button
              id="btn-discover-experience"
              className="px-6 py-3 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-full hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
              onClick={() => {
                const el = document.getElementById('enquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discover Nights
            </button>
          </div>
        </ScaleBurst>

      </div>
    </section>
  );
};
