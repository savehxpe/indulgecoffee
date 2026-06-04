import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { SceneContent } from './SceneContent';

export const Coffee3DScene: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 6, 22]} />
        
        <ambientLight color="#2e1503" intensity={0.35} />
        <pointLight position={[2, 1.5, 3]} color="#d97706" intensity={2.5} decay={1} />
        <pointLight position={[-1.5, 0.5, -0.5]} color="#f5e6d3" intensity={0.8} decay={2} />
        <spotLight
          position={[0, 6, -1]}
          angle={0.6}
          penumbra={0.8}
          intensity={3}
          color="#f5e6d3"
          decay={1}
        />

        <SceneContent />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={0.5}
          />
          <ChromaticAberration offset={[0.0015, 0.0015]} />
          <Vignette eskil={false} offset={0.25} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
