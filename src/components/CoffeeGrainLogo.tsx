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
      <radialGradient id="grain-body" cx="38%" cy="30%" r="68%" fx="30%" fy="24%">
        <stop offset="0%" stopColor="#8B5A3C" />
        <stop offset="30%" stopColor="#5C3A21" />
        <stop offset="65%" stopColor="#2E1503" />
        <stop offset="100%" stopColor="#140601" />
      </radialGradient>

      <radialGradient id="grain-rim" cx="50%" cy="50%" r="50%">
        <stop offset="72%" stopColor="transparent" />
        <stop offset="90%" stopColor="#d97706" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
      </radialGradient>

      <linearGradient id="grain-crease" x1="0.15" y1="0.25" x2="0.85" y2="0.8">
        <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
        <stop offset="35%" stopColor="#d97706" stopOpacity="0.4" />
        <stop offset="65%" stopColor="#1a0a02" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#140601" stopOpacity="0.9" />
      </linearGradient>

      <linearGradient id="grain-highlight" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="25%" stopColor="white" stopOpacity="0.12" />
        <stop offset="55%" stopColor="white" stopOpacity="0.02" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      <filter id="grain-shadow" x="-25%" y="-15%" width="150%" height="140%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.45" />
      </filter>
    </defs>

    <g transform="translate(24,24) rotate(-12) translate(-24,-24)">
      <path
        d="M24 6
           C13.5 7 7 13 6.5 20
           C6 27 7.5 33 14 38
           C20 42.5 28 42.5 34 38
           C40.5 33 42 27 41.5 20
           C41 13 34.5 7 24 6Z"
        fill="url(#grain-body)"
        filter="url(#grain-shadow)"
      />

      <path
        d="M24 6
           C13.5 7 7 13 6.5 20
           C6 27 7.5 33 14 38
           C20 42.5 28 42.5 34 38
           C40.5 33 42 27 41.5 20
           C41 13 34.5 7 24 6Z"
        fill="url(#grain-rim)"
      />

      <path
        d="M10 13 C14 17 18 22 19 30 C20 24 22 17 26 13"
        stroke="url(#grain-crease)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M10 14 C14 18 18 23 19 31 C20 25 22 18 26 14"
        stroke="#0a0400"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />

      <path
        d="M24 6
           C13.5 7 7 13 6.5 20
           C6 27 7.5 33 14 38
           C20 42.5 28 42.5 34 38
           C40.5 33 42 27 41.5 20
           C41 13 34.5 7 24 6Z"
        fill="url(#grain-highlight)"
      />

      <ellipse
        cx="18"
        cy="16"
        rx="4.5"
        ry="2"
        fill="white"
        opacity="0.35"
        transform="rotate(-20 18 16)"
      />

      <ellipse
        cx="17"
        cy="14"
        rx="2.2"
        ry="1"
        fill="white"
        opacity="0.5"
        transform="rotate(-18 17 14)"
      />
    </g>
  </svg>
);
