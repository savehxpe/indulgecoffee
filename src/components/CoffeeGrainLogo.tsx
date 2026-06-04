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
      <radialGradient id="grain-body" cx="38%" cy="35%" r="65%" fx="32%" fy="28%">
        <stop offset="0%" stopColor="#7B4A2E" />
        <stop offset="35%" stopColor="#4A2C17" />
        <stop offset="70%" stopColor="#2E1503" />
        <stop offset="100%" stopColor="#140601" />
      </radialGradient>

      <radialGradient id="grain-gloss" cx="30%" cy="22%" r="55%">
        <stop offset="0%" stopColor="white" stopOpacity="0.45" />
        <stop offset="30%" stopColor="white" stopOpacity="0.12" />
        <stop offset="60%" stopColor="white" stopOpacity="0.02" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="grain-rim" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="transparent" />
        <stop offset="92%" stopColor="#d97706" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.55" />
      </radialGradient>

      <linearGradient id="grain-crease" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d97706" stopOpacity="0.15" />
        <stop offset="50%" stopColor="#d97706" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#140601" stopOpacity="0.8" />
      </linearGradient>

      <radialGradient id="grain-hotspot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d97706" stopOpacity="0.6" />
        <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </radialGradient>

      <filter id="grain-shadow" x="-20%" y="-10%" width="140%" height="130%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>

    <ellipse
      cx="24"
      cy="24"
      rx="16.5"
      ry="19"
      fill="url(#grain-body)"
      filter="url(#grain-shadow)"
    />

    <ellipse
      cx="24"
      cy="24"
      rx="16.5"
      ry="19"
      fill="url(#grain-rim)"
    />

    <ellipse
      cx="24"
      cy="24"
      rx="16.5"
      ry="19"
      fill="url(#grain-gloss)"
    />

    <path
      d="M13.5 28.5 Q20 14 34.5 17.5"
      stroke="url(#grain-crease)"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />

    <path
      d="M14 29 Q20.5 15.5 33.5 18.5"
      stroke="#140601"
      strokeWidth="0.7"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />

    <ellipse
      cx="20"
      cy="15"
      rx="7"
      ry="4"
      fill="url(#grain-hotspot)"
      transform="rotate(-18 20 15)"
      opacity="0.7"
    />

    <ellipse
      cx="19"
      cy="13.5"
      rx="3.5"
      ry="1.8"
      fill="white"
      opacity="0.55"
      transform="rotate(-16 19 13.5)"
    />
  </svg>
);
