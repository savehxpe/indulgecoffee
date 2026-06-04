import { useMemo } from 'react';
import { CoffeeStillLife } from './CoffeeStillLife';
import { SteamSculpture } from './SteamSculpture';
import { GranuleField } from './GranuleField';
import { BeanComposition } from './BeanComposition';

export type VariationConfig = {
  beanCount: number;
  granuleCount: number;
  steamRibbons: number;
  granuleSpread: number;
  granuleSpeed: number;
};

const VARIATIONS: Record<string, VariationConfig> = {
  v1: { beanCount: 4, granuleCount: 30, steamRibbons: 5, granuleSpread: 0.8, granuleSpeed: 0.12 },
  v4: { beanCount: 6, granuleCount: 50, steamRibbons: 7, granuleSpread: 1.2, granuleSpeed: 0.15 },
};

interface ScrollDirectorProps {
  activeScene: 1 | 4;
}

export const ScrollDirector: React.FC<ScrollDirectorProps> = ({ activeScene }) => {
  const v: VariationConfig = activeScene === 4 ? VARIATIONS.v4 : VARIATIONS.v1;

  return (
    <>
      <CoffeeStillLife />
      <SteamSculpture />
      <GranuleField count={v.granuleCount} spread={v.granuleSpread} speed={v.granuleSpeed} />
      <BeanComposition count={v.beanCount} />
    </>
  );
};
