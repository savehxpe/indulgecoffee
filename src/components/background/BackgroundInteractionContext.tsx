import { createContext, useContext } from 'react';

export interface BackgroundInteraction {
  scrollProgress: number;
  scrollVelocity: number;
  cursorX: number;
  cursorY: number;
  idleProgress: number;
  isIdle: boolean;
  isReducedMotion: boolean;
  isPageHidden: boolean;
}

const defaultInteraction: BackgroundInteraction = {
  scrollProgress: 0,
  scrollVelocity: 0,
  cursorX: 0,
  cursorY: 0,
  idleProgress: 0,
  isIdle: false,
  isReducedMotion: false,
  isPageHidden: false,
};

export const BackgroundInteractionContext = createContext<BackgroundInteraction>(defaultInteraction);

export function useBackgroundInteraction() {
  return useContext(BackgroundInteractionContext);
}
