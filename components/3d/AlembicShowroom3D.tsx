'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Droplets, Flame, Wind } from 'lucide-react';

interface AlembicProps {
  onSelectNode?: (node: 'TOP' | 'HEART' | 'BASE') => void;
}

function EssenceOrb({
  position,
  color,
  glowColor,
  label,
  type,
  activeType,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  glowColor: string;
  label: string;
  type: 'TOP' | 'HEART' | 'BASE';
  activeType: string | null;
  onClick: (type: 'TOP' | 'HEART' | 'BASE') => void;
}) {
  const orbRef = useRef<THREE.Mesh>(null);
  const isSelected = activeType === type;

  useFrame((_, delta) => {
    if (orbRef.current) {
      const targetScale = isSelected ? 1.25 : 1.0;
      orbRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(type);
      }}
    >
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={isSelected ? 0.8 : 0.25}
          roughness={0.1}
          metalness={0.2}
          transmission={0.6}
          thickness={0.8}
          transparent
          opacity={0.9}
          clearcoat={1}
        />
      </mesh>

      {/* Orbiting Golden Halo Ring */}
      <Torus args={[0.55, 0.015, 16, 48]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#C6A15B" metalness={0.9} roughness={0.2} />
      </Torus>
    </group>
  );
}

function AlembicScene({
  activeType,
  setActiveType,
}: {
  activeType: 'TOP' | 'HEART' | 'BASE' | null;
  setActiveType: (type: 'TOP' | 'HEART' | 'BASE' | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (coilRef.current) {
      coilRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. Crystal Alembic Still Base (Maceration Chamber) */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.4, 1.8, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          transmission={0.85}
          thickness={0.6}
          transparent
          opacity={0.88}
          clearcoat={1}
          metalness={0.1}
        />
      </mesh>

      {/* Amber Distillation Liquid in Chamber */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[1.25, 1.6, 0.9, 32]} />
        <meshStandardMaterial color="#DFC38A" roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </mesh>

      {/* 2. French Copper Distillation Alembic Neck */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.35, 1.35, 0.8, 32]} />
        <meshStandardMaterial color="#C6A15B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Copper Swan-Neck Column */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.9, 24]} />
        <meshStandardMaterial color="#DFC38A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Floating Condenser Coil Ring */}
      <group ref={coilRef} position={[0, 1.1, 0]}>
        <Torus args={[1.5, 0.04, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#C6A15B" metalness={0.95} roughness={0.15} />
        </Torus>
      </group>

      {/* 4. Three Botanical Extraction Essence Nodes (Top, Heart, Base) */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.25}>
        {/* Top Note: Calabrian Bergamot / Cardamom */}
        <EssenceOrb
          position={[0, 1.6, 0]}
          color="#DFC38A"
          glowColor="#FFF1C2"
          label="Top Volatiles"
          type="TOP"
          activeType={activeType}
          onClick={(t) => setActiveType(activeType === t ? null : t)}
        />

        {/* Heart Note: Grasse Centifolia Rose / Jasmine */}
        <EssenceOrb
          position={[-1.1, 0.6, 0.6]}
          color="#E29578"
          glowColor="#FFB4A2"
          label="Heart Soul"
          type="HEART"
          activeType={activeType}
          onClick={(t) => setActiveType(activeType === t ? null : t)}
        />

        {/* Base Note: Mysore Sandalwood / Aged Cambodian Oud */}
        <EssenceOrb
          position={[1.1, 0.6, -0.6]}
          color="#8C6A3D"
          glowColor="#D4A373"
          label="Base Sillage"
          type="BASE"
          activeType={activeType}
          onClick={(t) => setActiveType(activeType === t ? null : t)}
        />
      </Float>

      {/* Ambient Floor Glow Circle */}
      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color="#C6A15B" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function AlembicShowroom3D({ onSelectNode }: AlembicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<'TOP' | 'HEART' | 'BASE' | null>('TOP');

  const handleSelect = (t: 'TOP' | 'HEART' | 'BASE' | null) => {
    setActiveType(t);
    if (t && onSelectNode) onSelectNode(t);
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[440px] relative flex items-center justify-center select-none">
      <Canvas
        eventSource={containerRef}
        camera={{ position: [0, 0.8, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFF5DC" />
          <pointLight position={[-5, -2, -2]} intensity={1.2} color="#C6A15B" />
          <pointLight position={[0, 3, 2]} intensity={1.5} color="#DFC38A" />
          <AlembicScene activeType={activeType} setActiveType={handleSelect} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Suspense>
      </Canvas>

      {/* Floating HUD Orb Selector */}
      <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-auto">
        <button
          onClick={() => handleSelect('TOP')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeType === 'TOP'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/80 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#DFC38A]" />
          <span>Top Node • Volatiles</span>
        </button>

        <button
          onClick={() => handleSelect('HEART')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeType === 'HEART'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/80 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#E29578]" />
          <span>Heart Node • Floral Core</span>
        </button>

        <button
          onClick={() => handleSelect('BASE')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all backdrop-blur-md ${
            activeType === 'BASE'
              ? 'bg-gold text-obsidian border-gold font-bold shadow-lg shadow-gold/30 scale-105'
              : 'bg-obsidian/80 border-white/10 text-smoke hover:border-gold/50 hover:text-ivory'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#8C6A3D]" />
          <span>Base Node • Resinous Woods</span>
        </button>
      </div>

      <div className="absolute bottom-3 right-3 bg-obsidian/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-smoke flex items-center gap-1.5 pointer-events-none">
        <Sparkles size={11} className="text-gold" />
        <span>3D Fractional Extraction Alembic</span>
      </div>
    </div>
  );
}
