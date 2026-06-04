import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';
import { CoffeeStillLife } from './CoffeeStillLife';
import { SteamSculpture } from './SteamSculpture';
import { GranuleField } from './GranuleField';
import { BeanComposition } from './BeanComposition';

export const ScrollDirector: React.FC = () => {
  const scene = cfg.scenes[cfg.activeScene];

  return (
    <>
      <CoffeeStillLife />
      <SteamSculpture />
      <GranuleField />
      <BeanComposition />
    </>
  );
};
