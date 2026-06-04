interface CoffeeGrainLogoProps {
  className?: string;
}

export const CoffeeGrainLogo: React.FC<CoffeeGrainLogoProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="grain-body-g" cx="35%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#8B5A3C" />
        <stop offset="30%" stopColor="#5C3A21" />
        <stop offset="60%" stopColor="#2E1503" />
        <stop offset="100%" stopColor="#140601" />
      </radialGradient>

      <linearGradient id="grain-shadow-r" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="transparent" />
        <stop offset="70%" stopColor="#0a0400" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0a0400" stopOpacity="0.55" />
      </linearGradient>

      <radialGradient id="grain-rim-g" cx="50%" cy="50%" r="50%">
        <stop offset="78%" stopColor="transparent" />
        <stop offset="94%" stopColor="#d97706" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.38" />
      </radialGradient>

      <linearGradient id="grain-gloss-g" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.45" />
        <stop offset="40%" stopColor="white" stopOpacity="0.08" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      <filter id="grain-shadow-f" x="-25%" y="-12%" width="150%" height="134%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>

    <g transform="translate(24,24) rotate(-12) translate(-24,-24)">
      <ellipse
        cx="24"
        cy="24.5"
        rx="10"
        ry="17"
        fill="url(#grain-body-g)"
        filter="url(#grain-shadow-f)"
      />

      <ellipse
        cx="24"
        cy="24.5"
        rx="10"
        ry="17"
        fill="url(#grain-shadow-r)"
      />

      <ellipse
        cx="24"
        cy="24.5"
        rx="10"
        ry="17"
        fill="url(#grain-rim-g)"
      />

      <path
        d="M22.5 8.5 C28 15 32 21 28 28 C24 33 18.5 37 18.5 40.5"
        stroke="#0a0300"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M23 9 C28.5 15.5 31.5 21 27.5 27.5 C24 32.5 19 36.5 19 39.5"
        stroke="#d97706"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      <ellipse
        cx="18.5"
        cy="12"
        rx="5.5"
        ry="2.8"
        fill="url(#grain-gloss-g)"
        transform="rotate(-14 18.5 12)"
      />

      <ellipse
        cx="17.5"
        cy="10.5"
        rx="2.5"
        ry="1.2"
        fill="white"
        opacity="0.35"
        transform="rotate(-11 17.5 10.5)"
      />

      <ellipse
        cx="17"
        cy="9.5"
        rx="1.3"
        ry="0.6"
        fill="white"
        opacity="0.55"
        transform="rotate(-9 17 9.5)"
      />
    </g>
  </svg>
);
