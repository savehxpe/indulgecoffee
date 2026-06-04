export const SteamWisps: React.FC = () => {
  return (
    <svg
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-40"
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 5 }}
    >
      <path
        d="M100 140 C95 110, 110 90, 100 60 C90 90, 105 110, 100 140"
        stroke="rgba(217,119,6,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M100 140 C95 110,110 90,100 60 C90 90,105 110,100 140;
                  M100 140 C108 105,92 85,100 55 C108 85,92 105,100 140;
                  M100 140 C95 110,110 90,100 60 C90 90,105 110,100 140"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.15;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M70 145 C65 115,75 95,70 70 C60 95,80 115,70 145"
        stroke="rgba(217,119,6,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M70 145 C65 115,75 95,70 70 C60 95,80 115,70 145;
                  M70 145 C78 110,62 90,70 65 C78 90,62 110,70 145;
                  M70 145 C65 115,75 95,70 70 C60 95,80 115,70 145"
          dur="5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.08;0.2"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M130 145 C125 115,135 95,130 70 C120 95,140 115,130 145"
        stroke="rgba(217,119,6,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M130 145 C125 115,135 95,130 70 C120 95,140 115,130 145;
                  M130 145 C138 110,122 90,130 65 C138 90,122 110,130 145;
                  M130 145 C125 115,135 95,130 70 C120 95,140 115,130 145"
          dur="5.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.08;0.2"
          dur="5.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
