import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIdlePresence } from './useIdlePresence';
import { useSmoothedCursor } from './useSmoothedCursor';
import { usePageVisibility } from './usePageVisibility';
import { useReducedMotion } from './useReducedMotion';
import {
  BackgroundInteractionContext,
  type BackgroundInteraction,
} from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

gsap.registerPlugin(ScrollTrigger);

export const InteractionDirector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isIdle, idleProgress } = useIdlePresence(cfg.idle.enabled ? cfg.idle.delayMs : 9999999);
  const cursorRef = useSmoothedCursor(cfg.cursor.enabled ? cfg.cursor.smoothing : 99);
  const isPageHidden = usePageVisibility();
  const isReducedMotion = useReducedMotion();

  const scrollRef = useRef({ progress: 0, velocity: 0 });
  const prevProgress = useRef(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        scrollRef.current.velocity = Math.abs(p - prevProgress.current) * 100;
        scrollRef.current.progress = p;
        prevProgress.current = p;
      },
    });

    return () => st.kill();
  }, []);

  const value: BackgroundInteraction = useMemo(() => ({
    scrollProgress: isReducedMotion ? 0 : scrollRef.current.progress,
    scrollVelocity: isReducedMotion ? 0 : scrollRef.current.velocity,
    cursorX: cursorRef.current.x,
    cursorY: cursorRef.current.y,
    idleProgress: isPageHidden ? 0 : idleProgress,
    isIdle: isPageHidden ? false : isIdle,
    isReducedMotion,
    isPageHidden,
  }), [isIdle, idleProgress, isReducedMotion, isPageHidden]);

  return (
    <BackgroundInteractionContext.Provider value={value}>
      {children}
    </BackgroundInteractionContext.Provider>
  );
};
