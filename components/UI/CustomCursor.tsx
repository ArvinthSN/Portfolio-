'use client';

import { useEffect, useMemo, useState } from 'react';

type Point = { x: number; y: number };

export function CustomCursor() {
  const [pointer, setPointer] = useState<Point>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    const syncViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    syncViewport();

    const move = (event: PointerEvent) => {
      setPointer({ x: event.clientX, y: event.clientY });
    };

    const enter = (event: Event) => {
      setLabel((event.currentTarget as HTMLElement).dataset.cursor ?? '');
    };

    const leave = () => setLabel('');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', syncViewport);

    const interactive = document.querySelectorAll<HTMLElement>('[data-cursor]');
    interactive.forEach((item) => {
      item.addEventListener('pointerenter', enter);
      item.addEventListener('pointerleave', leave);
    });

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', syncViewport);
      interactive.forEach((item) => {
        item.removeEventListener('pointerenter', enter);
        item.removeEventListener('pointerleave', leave);
      });
    };
  }, []);

  const arcPath = useMemo(() => {
    const startX = pointer.x - 10;
    const startY = pointer.y - 10;
    const endX = pointer.x + 26;
    const endY = pointer.y + 18;
    const controlX1 = pointer.x + 44;
    const controlY1 = pointer.y - 120;
    const controlX2 = pointer.x - 110;
    const controlY2 = pointer.y + 110;

    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
  }, [pointer]);

  return (
    <div className="arc-cursor" aria-hidden="true">
      <svg viewBox={`0 0 ${viewport.width || 100} ${viewport.height || 100}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="arc-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="30%" stopColor="rgba(34, 211, 238, 1)" />
            <stop offset="65%" stopColor="rgba(168, 85, 247, 1)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 1)" />
          </linearGradient>
        </defs>

        <path className="arc-cursor-glow" d={arcPath} />
        <path className="arc-cursor-trail" d={arcPath} />
      </svg>

      <div className={`arc-cursor-core ${label ? 'is-active' : ''}`} style={{ left: pointer.x, top: pointer.y }}>
        <span className="arc-cursor-ring" />
        <span className="arc-cursor-dot" />
      </div>

      {label && (
        <div className="arc-cursor-label" style={{ left: pointer.x + 18, top: pointer.y - 30 }}>
          {label}
        </div>
      )}
    </div>
  );
}
