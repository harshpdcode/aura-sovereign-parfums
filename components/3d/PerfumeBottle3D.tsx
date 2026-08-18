'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PerfumeBottleProps {
  color?: string;
  liquidColor?: string;
  name?: string;
  autoRotate?: boolean;
  scale?: number;
}

export default function PerfumeBottle3D({
  color = '#C6A15B',
  liquidColor = '#DFC38A',
  name = 'AURA SOVEREIGN',
  autoRotate = true,
  scale = 1.05,
}: PerfumeBottleProps) {
  const bottleRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!bottleRef.current) return;

    if (autoRotate) {
      bottleRef.current.rotation.y += delta * 0.4;
    }

    // Smooth interactive mouse tilt
    const targetX = (state.pointer.y * Math.PI) / 16;
    const targetZ = -(state.pointer.x * Math.PI) / 16;

    bottleRef.current.rotation.x = THREE.MathUtils.lerp(bottleRef.current.rotation.x, targetX, 0.08);
    bottleRef.current.rotation.z = THREE.MathUtils.lerp(bottleRef.current.rotation.z, targetZ, 0.08);
  });

  return (
    <group scale={[scale, scale, scale]} position={[0, -0.3, 0]}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.25} floatingRange={[-0.04, 0.04]}>
        <group ref={bottleRef}>
          {/* 1. Heavy French Crystal Glass Flacon Body (Beveled Rectangular Column) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 2.3, 0.95]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.04}
              transmission={0.92}
              thickness={0.7}
              ior={1.54}
              transparent
              opacity={0.95}
              clearcoat={1}
              clearcoatRoughness={0.04}
              reflectivity={0.95}
              metalness={0.05}
            />
          </mesh>

          {/* 2. Inner Fragrance Liquid Core Reservoir */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[1.25, 1.95, 0.7]} />
            <meshPhysicalMaterial
              color={liquidColor}
              emissive={liquidColor}
              emissiveIntensity={0.25}
              roughness={0.08}
              transmission={0.75}
              thickness={0.5}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* 3. Slender Glass Dip Tube */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.0, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={0.1} />
          </mesh>

          {/* 4. Luxury Brushed Gold Shoulder Collar Plate */}
          <mesh position={[0, 1.18, 0]}>
            <cylinderGeometry args={[0.42, 0.7, 0.16, 32]} />
            <meshStandardMaterial
              color="#C6A15B"
              metalness={0.95}
              roughness={0.18}
            />
          </mesh>

          {/* 5. Vaporizer Atomizer Neck */}
          <mesh position={[0, 1.32, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.16, 24]} />
            <meshStandardMaterial
              color="#DFC38A"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>

          {/* 6. Heavy Obsidian Magnetic Cap with Gold Knurled Ring */}
          <group position={[0, 1.72, 0]}>
            {/* Main Cap Cylinder */}
            <mesh>
              <cylinderGeometry args={[0.48, 0.5, 0.65, 32]} />
              <meshStandardMaterial
                color="#121212"
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>

            {/* Inlaid Knurled Gold Ring */}
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.51, 0.51, 0.08, 32]} />
              <meshStandardMaterial
                color="#C6A15B"
                metalness={0.98}
                roughness={0.12}
              />
            </mesh>
          </group>

          {/* 7. Embossed Golden Brand Plaque */}
          <group position={[0, 0.05, 0.49]}>
            {/* Plaque Background */}
            <mesh>
              <planeGeometry args={[1.1, 0.7]} />
              <meshStandardMaterial
                color="#0B0B0B"
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {/* Gold Beveled Frame Border */}
            <mesh position={[0, 0, -0.005]}>
              <planeGeometry args={[1.16, 0.76]} />
              <meshStandardMaterial
                color="#C6A15B"
                metalness={0.98}
                roughness={0.15}
              />
            </mesh>

            {/* Typography */}
            <Text
              position={[0, 0.1, 0.02]}
              fontSize={0.085}
              color="#C6A15B"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.16}
            >
              AURA SOVEREIGN
            </Text>

            <Text
              position={[0, -0.08, 0.02]}
              fontSize={0.055}
              color="#F5F1E8"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              PARIS • EXTRAIT
            </Text>
          </group>
        </group>
      </Float>
    </group>
  );
}
