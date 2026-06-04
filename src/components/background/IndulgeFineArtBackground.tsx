import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { FineArtCameraRig } from './FineArtCameraRig';
import { ChiaroscuroLighting } from './ChiaroscuroLighting';
import { ScrollDirector } from './ScrollDirector';

const ACTIVE_SCENE: 1 | 4 = 4;

export const IndulgeFineArtBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.8, 6], fov: 35 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />

        <ChiaroscuroLighting />
        <FineArtCameraRig />
        <ScrollDirector activeScene={ACTIVE_SCENE} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.4} />
          <Vignette eskil={false} offset={0.25} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
