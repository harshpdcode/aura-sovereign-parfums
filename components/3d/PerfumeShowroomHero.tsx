'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import PerfumeBottle3D from './PerfumeBottle3D';
import PerfumeMistParticles from './PerfumeMistParticles';

interface Hero3DProps {
  color?: string;
  liquidColor?: string;
  name?: string;
  enableOrbit?: boolean;
}

export default function PerfumeShowroomHero({
  color = '#C6A15B',
  liquidColor = '#DFC38A',
  name = 'AURA SOVEREIGN',
  enableOrbit = true,
}: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        eventSource={containerRef}
        camera={{ position: [0, 0.3, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Studio Multi-Point Lighting */}
          <ambientLight intensity={1.2} />
          
          {/* Key Light (Warm Luxury Gold) */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.8}
            color="#FFF5E0"
          />

          {/* Rim Light (Cold Crystalline Highlight) */}
          <directionalLight
            position={[-5, 5, -4]}
            intensity={2.2}
            color="#DCE9F6"
          />

          {/* Fill Light */}
          <pointLight position={[0, -2, 3]} intensity={1.4} color="#DFC38A" />

          {/* 3D Bottle Model */}
          <PerfumeBottle3D
            color={color}
            liquidColor={liquidColor}
            name={name}
            autoRotate={!enableOrbit}
          />

          {/* Ambient Vapor Mist */}
          <PerfumeMistParticles count={40} />

          {/* Cached Soft Ground Contact Shadow (frames=1 eliminates per-frame GPU shadow render) */}
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.6}
            scale={5}
            blur={2}
            far={3}
            frames={1}
            color="#050505"
          />

          {/* Controls */}
          {enableOrbit && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI / 2) + 0.1}
              dampingFactor={0.08}
              rotateSpeed={0.6}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
