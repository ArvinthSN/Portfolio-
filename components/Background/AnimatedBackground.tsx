'use client';

import { useEffect } from 'react';

export function AnimatedBackground() {
  useEffect(() => {
    const update = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX / window.innerWidth}`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY / window.innerHeight}`);
    };
    window.addEventListener('pointermove', update, { passive: true });
    return () => window.removeEventListener('pointermove', update);
  }, []);
  return <div className="ambient-background" aria-hidden="true"><div className="star-field" /><div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="grid-floor" /><div className="light-beam" /></div>;
}
