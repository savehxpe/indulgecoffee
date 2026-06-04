interface GlowOrbProps {
  className?: string;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({ className }) => {
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-[120px] ${className ?? ''}`}
      style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)' }}
    />
  );
};
