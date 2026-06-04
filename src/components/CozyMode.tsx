import { useState, useEffect } from 'react';

export const CozyMode: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cozy_mode');
    if (saved === 'true') {
      setActive(true);
      document.body.classList.add('cozy');
    }
  }, []);

  const toggle = () => {
    const next = !active;
    setActive(next);
    localStorage.setItem('cozy_mode', String(next));
    if (next) {
      document.body.classList.add('cozy');
    } else {
      document.body.classList.remove('cozy');
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full liquid-glass hover:scale-110 transition-transform cursor-pointer shadow-lg"
      title={active ? 'Cozy mode on' : 'Cozy mode off'}
      aria-label="Toggle cozy mode"
    >
      <div
        className="w-3 h-3 rounded-full transition-colors duration-300"
        style={{ backgroundColor: active ? '#d97706' : '#4a4a4a' }}
      />
    </button>
  );
};
