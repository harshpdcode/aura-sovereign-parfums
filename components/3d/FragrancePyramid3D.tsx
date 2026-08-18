'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Layers, Clock } from 'lucide-react';

interface PyramidProps {
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
}

function PyramidGeometryTier({
  type,
  position,
  geometry,
  color,
  hoverColor,
  activeTier,
  setActiveTier,
}: {
  type: 'TOP' | 'HEART' | 'BASE';
  position: [number, number, number];
  geometry: React.ReactNode;
  color: string;
  hoverColor: string;
  activeTier: string | null;
  setActiveTier: (tier: 'TOP' | 'HEART' | 'BASE' | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = activeTier === type;

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.06 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setActiveTier(type);
      }}
      onPointerOut={() => setActiveTier(null)}
    >
      <mesh ref={meshRef}>
        {geometry}
        <meshPhysicalMaterial
          color={isHovered ? hoverColor : color}
          emissive={isHovered ? '#C6A15B' : '#000000'}
          emissiveIntensity={isHovered ? 0.35 : 0.05}
          roughness={0.15}
          metalness={0.4}
          transmission={0.65}
          thickness={1.2}
          transparent
          opacity={0.92}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

function PyramidScene({
  activeTier,
  setActiveTier,
}: {
  activeTier: 'TOP' | 'HEART' | 'BASE' | null;
  setActiveTier: (tier: 'TOP' | 'HEART' | 'BASE' | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* 1. TOP NOTES TIER (Apex Pyramid) */}
      <Float speed={1.8} rotationIntensity={0.05} floatIntensity={0.15}>
        <PyramidGeometryTier
          type="TOP"
          position={[0, 1.25, 0]}
          geometry={<coneGeometry args={[0.9, 0.85, 4]} />}
          color="#DFC38A"
          hoverColor="#FFF2D1"
          activeTier={activeTier}
          setActiveTier={setActiveTier}
        />
      </Float>

      {/* 2. HEART NOTES TIER (Middle Frustum) */}
      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.15}>
        <PyramidGeometryTier
          type="HEART"
          position={[0, 0.25, 0]}
          geometry={<cylinderGeometry args={[0.92, 1.62, 0.9, 4]} />}
          color="#C6A15B"
          hoverColor="#DFC38A"
          activeTier={activeTier}
          setActiveTier={setActiveTier}
        />
      </Float>

      {/* 3. BASE NOTES TIER (Foundation Frustum) */}
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.15}>
        <PyramidGeometryTier
          type="BASE"
          position={[0, -0.9, 0]}
          geometry={<cylinderGeometry args={[1.64, 2.35, 1.05, 4]} />}
          color="#8C6A3D"
          hoverColor="#C6A15B"
          activeTier={activeTier}
          setActiveTier={setActiveTier}
        />
      </Float>

      {/* Ambient Floor Glow Circle */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 32]} />
        <meshBasicMaterial color="#C6A15B" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function FragrancePyramid3D(props: PyramidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<'TOP' | 'HEART' | 'BASE' | null>(null);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[420px] relative flex items-center justify-center select-none">
      {/* 3D WebGL Canvas */}
      <Canvas
        eventSource={containerRef}
        camera={{ position: [0, 0.6, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFF5DC" />
          <pointLight position={[-5, -2, -2]} intensity={1.2} color="#C6A15B" />
          <pointLight position={[0, 4, 2]} intensity={1.5} color="#DFC38A" />
          <PyramidScene activeTier={activeTier} setActiveTier={setActiveTier} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.9} />
        </Suspense>
      </Canvas>

      {/* Floating Interactive Tier HUD Badges */}
      <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-auto">
        <button
          onClick={() => setActiveTier(activeTier === 'TOP' ? null : 'TOP')}
          onMouseEnter={() => setActiveTier('TOP')}
          onMouseLeave={() => setActiveTier(null)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeTier === 'TOP'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/75 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#DFC38A]" />
          <span>Apex • Top Notes</span>
        </button>

        <button
          onClick={() => setActiveTier(activeTier === 'HEART' ? null : 'HEART')}
          onMouseEnter={() => setActiveTier('HEART')}
          onMouseLeave={() => setActiveTier(null)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeTier === 'HEART'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/75 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
          <span>Heart • Soul Notes</span>
        </button>

        <button
          onClick={() => setActiveTier(activeTier === 'BASE' ? null : 'BASE')}
          onMouseEnter={() => setActiveTier('BASE')}
          onMouseLeave={() => setActiveTier(null)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeTier === 'BASE'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/75 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#8C6A3D]" />
          <span>Base • Enduring Sillage</span>
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 right-3 bg-obsidian/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-smoke flex items-center gap-1.5 pointer-events-none">
        <Sparkles size={11} className="text-gold" />
        <span>Interactive 3D Olfactory Pyramid</span>
      </div>
    </div>
  );
}
