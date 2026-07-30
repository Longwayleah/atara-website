"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** Placeholder geometry — replace with Blender GLB model */
export function ProductPlaceholder() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <capsuleGeometry args={[0.6, 1.8, 16, 32]} />
      <meshStandardMaterial
        color="#FAF8F5"
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={1}
      />
    </mesh>
  );
}
