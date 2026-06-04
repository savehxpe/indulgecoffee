import { useMemo } from 'react';

export const ChiaroscuroLighting: React.FC = () => {
  const warmColor = useMemo(() => ({ color: '#d97706' }), []);
  const rimColor = useMemo(() => ({ color: '#f5e6d3' }), []);

  return (
    <>
      {/* Fill ambient — keeps shadows from being pure black */}
      <ambientLight color="#2e1503" intensity={0.15} />

      {/* Key light — warm amber, upper left */}
      <pointLight position={[1.8, 2.0, 2.2]} color="#d97706" intensity={2.5} decay={1} distance={10} />

      {/* Rim light — cream behind steam, sculpts the steam edge */}
      <spotLight
        position={[-1.2, 2.8, -0.6]}
        angle={0.35}
        penumbra={0.9}
        intensity={3}
        color="#f5e6d3"
        decay={1}
        distance={8}
      />

      {/* Cup warmth — tiny glow right at the cup surface */}
      <pointLight position={[0, 0.2, 0.9]} color="#c44b0a" intensity={0.6} decay={2} distance={3} />
    </>
  );
};
