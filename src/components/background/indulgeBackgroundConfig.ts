export type SceneMode = 'black-cup-chapel' | 'steam-sculpture' | 'granule-constellation' | 'coffee-orbit' | 'indulge-ritual';

export const INDULGE_BACKGROUND_CONFIG = {
  activeScene: 'steam-sculpture' as SceneMode,

  scroll: {
    height: '500vh',
    scrub: 1,
    velocityInfluence: 0.18,
    settleSpeed: 0.08,
  },

  camera: {
    fov: 35,
    mouseRotationMax: 0.035,
    scrollDollyIntensity: 0.8,
    idleDriftIntensity: 0.025,
    breathingIntensity: 0.008,
    states: [
      { x: 0, y: 0.8, z: 6 },
      { x: 0.15, y: 0.6, z: 4.2 },
      { x: -0.1, y: 0.45, z: 3.2 },
    ] as const,
    lookTarget: { x: 0, y: 0.4, z: 0 } as const,
  },

  cursor: {
    enabled: true,
    smoothing: 0.08,
    granuleInfluence: 0.18,
    steamInfluence: 0.08,
    beanInfluence: 0.04,
  },

  idle: {
    enabled: true,
    delayMs: 7000,
    enterDuration: 1.2,
    exitDuration: 0.8,
    steamBoost: 0.22,
    granulePatternStrength: 0.18,
    cupGlowPulse: 0.16,
    beanMicroOrbit: 0.035,
  },

  particles: {
    desktopGranules: 260,
    mobileGranules: 80,
    granuleSizeMin: 0.006,
    granuleSizeMax: 0.022,
    depthParallax: 0.22,
    scrollBurst: 0.12,
    speed: 0.15,
  },

  steam: {
    opacity: 0.22,
    speed: 0.18,
    height: 2.8,
    cursorBend: 0.08,
    idleEleganceBoost: 0.18,
    fadeHeight: 2.6,
    ribbons: 6,
  },

  beans: {
    desktopCount: 14,
    mobileCount: 7,
    orbitIntensity: 0.025,
    cursorParallax: 0.035,
    idleMicroOrbit: 0.035,
  },

  lighting: {
    keyIntensity: 2.4,
    rimIntensity: 1.1,
    fillIntensity: 0.08,
    cupGlowIntensity: 0.45,
    idleCupGlowBoost: 0.16,
    lightBreathIntensity: 0.08,
  },

  performance: {
    dpr: [1, 1.5] as [number, number],
    mobileBreakpoint: 768,
    reduceMotionFactor: 0.18,
    pauseWhenHidden: true,
  },

  bloom: {
    intensity: 0.18,
    luminanceThreshold: 0.3,
    luminanceSmoothing: 0.9,
  },

  vignette: {
    darkness: 0.35,
    offset: 0.25,
  },

  debug: {
    enabledInDev: true,
    toggleKey: 'd',
  },

  scenes: {
    'black-cup-chapel':      { beans: 4,  granules: 30,  steamRibbons: 5 },
    'steam-sculpture':       { beans: 6,  granules: 50,  steamRibbons: 8 },
    'granule-constellation': { beans: 8,  granules: 200, steamRibbons: 4 },
    'coffee-orbit':          { beans: 16, granules: 80,  steamRibbons: 5 },
    'indulge-ritual':        { beans: 10, granules: 60,  steamRibbons: 6 },
  },
} as const;
