'use client';

import { useCallback, useState } from 'react';

export type RobotState = 'idle' | 'chatbot' | 'transforming' | 'car' | 'driving';

const allowed: Record<RobotState, RobotState[]> = {
  idle: ['chatbot', 'transforming'],
  chatbot: ['idle', 'transforming'],
  transforming: ['car'],
  car: ['driving', 'idle', 'chatbot'],
  driving: ['idle', 'chatbot'],
};

export function useRobotState() {
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const transition = useCallback((next: RobotState) => {
    setRobotState((current) => allowed[current].includes(next) ? next : current);
  }, []);
  const reset = useCallback(() => setRobotState('idle'), []);

  return { robotState, transition, reset };
}
