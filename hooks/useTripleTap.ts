'use client';

import { useCallback, useRef } from 'react';

export function useTripleTap(onSingle: () => void, onDouble: () => void, onTriple: () => void) {
  const count = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(() => {
    count.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (count.current === 1) onSingle();
      if (count.current === 2) onDouble();
      if (count.current >= 3) onTriple();
      count.current = 0;
    }, 280);
  }, [onSingle, onDouble, onTriple]);
}
