import { useBackgroundInteraction } from './BackgroundInteractionContext';
import { INDULGE_BACKGROUND_CONFIG as cfg } from './indulgeBackgroundConfig';

export const ChiaroscuroLighting: React.FC = () => {
  const { scrollProgress, idleProgress, isReducedMotion } = useBackgroundInteraction();

  const keyIntensity = cfg.lighting.keyIntensity * Math.min(scrollProgress * 2, 1);
  const rimIntensity = cfg.lighting.rimIntensity * Math.min(Math.max(scrollProgress - 0.15, 0) * 3, 1);
  const cupGlowIntensity = cfg.lighting.cupGlowIntensity * (1 + idleProgress * cfg.idle.cupGlowPulse * 3);

  if (isReducedMotion) return (
    <>
      <ambientLight color="#2e1503" intensity={0.15} />
      <pointLight position={[1.8, 2.0, 2.2]} color="#d97706" intensity={1.2} decay={1} distance={10} />
      <spotLight position={[-1.2, 2.8, -0.6]} angle={0.35} penumbra={0.9} intensity={0.8} color="#f5e6d3" decay={1} distance={8} />
      <pointLight position={[0, 0.2, 0.9]} color="#c44b0a" intensity={0.4} decay={2} distance={3} />
    </>
  );

  return (
    <>
      <ambientLight color="#2e1503" intensity={cfg.lighting.fillIntensity} />
      <pointLight position={[1.8, 2.0, 2.2]} color="#d97706" intensity={keyIntensity} decay={1} distance={10} />
      <spotLight position={[-1.2, 2.8, -0.6]} angle={0.35} penumbra={0.9} intensity={rimIntensity} color="#f5e6d3" decay={1} distance={8} />
      <pointLight position={[0, 0.2, 0.9]} color="#c44b0a" intensity={cupGlowIntensity} decay={2} distance={3} />

      {idleProgress > 0.3 && (
        <pointLight position={[0, 0.3, 0.5]} color="#d97706" intensity={idleProgress * 0.3} decay={2} distance={2} />
      )}
    </>
  );
};
