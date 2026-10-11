'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';
import type { RobotState } from '@/hooks/useRobotState';

function EnergyRings({ state, particleCount }: { state: RobotState; particleCount: number }) {
  const ring = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.rotation.z = clock.getElapsedTime() * 0.09;
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.6) * 0.025;
      ring.current.scale.set(pulse, pulse, 1);
    }
  });
  return <>
    <mesh ref={ring} position={[0.55, -1.15, 0]} rotation={[-Math.PI / 2.65, 0, 0]}>
      <torusGeometry args={[1.55, 0.008, 6, 128]} />
      <meshBasicMaterial color={state === 'transforming' ? '#a3e635' : '#22d3ee'} transparent opacity={0.78} />
    </mesh>
    <Sparkles count={particleCount} scale={[3.1, 2.9, 1.2]} size={2.2} speed={0.22} color="#a5f3fc" opacity={0.55} />
  </>;
}

export default function RobotScene({ state }: { state: RobotState }) {
  const [particleCount, setParticleCount] = useState(40);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 760px)').matches;
    setParticleCount(reduced ? 0 : compact ? 14 : 40);
  }, []);
  return <div className="robot-canvas" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 38 }} gl={{ antialias: false, alpha: true }}>
      <ambientLight intensity={0.3} />
      <EnergyRings state={state} particleCount={particleCount} />
    </Canvas>
  </div>;
}
