import { useState, useEffect } from 'react';

export function usePageVisibility() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onChange = () => setIsHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return isHidden;
}
