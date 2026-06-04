import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { FineArtCameraRig } from './FineArtCameraRig';
import { ChiaroscuroLighting } from './ChiaroscuroLighting';
import { ScrollDirector } from './ScrollDirector';
import { InteractionDirector } from './InteractionDirector';
import { DebugBackgroundPanel } from './DebugBackgroundPanel';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const IndulgeFineArtBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.8, 6], fov: cfg.camera.fov }}
        gl={{ antialias: true, alpha: false }}
        dpr={cfg.performance.dpr}
      >
        <color attach="background" args={['#000000']} />

        <InteractionDirector>
          <ChiaroscuroLighting />
          <FineArtCameraRig />
          <ScrollDirector />
        </InteractionDirector>

        <EffectComposer>
          <Bloom
            luminanceThreshold={cfg.bloom.luminanceThreshold}
            luminanceSmoothing={cfg.bloom.luminanceSmoothing}
            intensity={cfg.bloom.intensity}
          />
          <Vignette eskil={false} offset={cfg.vignette.offset} darkness={cfg.vignette.darkness} />
        </EffectComposer>
      </Canvas>

      {import.meta.env.DEV && cfg.debug.enabledInDev && <DebugBackgroundPanel />}
    </div>
  );
};
