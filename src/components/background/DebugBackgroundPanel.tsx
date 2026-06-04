import { useState, useEffect } from 'react';
import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const DebugBackgroundPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ctx = useBackgroundInteraction();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === cfg.debug.toggleKey && !e.metaKey && !e.ctrlKey) {
        setVisible(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;

  const scene = cfg.scenes[cfg.activeScene];

  return (
    <div className="fixed top-4 right-4 z-[99999] pointer-events-auto font-mono text-[10px] bg-black/85 text-white/70 rounded-lg p-3 space-y-1 leading-relaxed backdrop-blur">
      <div className="text-accent text-xs font-semibold mb-1">Background Debug</div>
      <div>Scene: <span className="text-accent">{cfg.activeScene}</span></div>
      <div>Granules: <span className="text-white/90">{scene.granules}</span> | Beans: <span className="text-white/90">{scene.beans}</span> | Steam: <span className="text-white/90">{scene.steamRibbons}</span></div>
      <div>Scroll: <span className="text-white/90">{(ctx.scrollProgress * 100).toFixed(1)}%</span> | Vel: <span className="text-white/90">{ctx.scrollVelocity.toFixed(2)}</span></div>
      <div>Cursor: <span className="text-white/90">{ctx.cursorX.toFixed(3)}, {ctx.cursorY.toFixed(3)}</span></div>
      <div>Idle: <span className="text-white/90">{ctx.isIdle ? 'YES' : 'no'}</span> | Prog: <span className="text-white/90">{ctx.idleProgress.toFixed(2)}</span></div>
      <div>Motion: <span className="text-white/90">{ctx.isReducedMotion ? 'REDUCED' : 'full'}</span> | Hidden: <span className="text-white/90">{ctx.isPageHidden ? 'YES' : 'no'}</span></div>
      <div>DPR: <span className="text-white/90">{cfg.performance.dpr.join('/')}</span></div>
      <div className="text-white/30 mt-1">Press <span className="text-accent">{cfg.debug.toggleKey.toUpperCase()}</span> to toggle</div>
    </div>
  );
};
