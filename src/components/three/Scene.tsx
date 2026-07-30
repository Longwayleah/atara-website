"use client";

import { Environment, Float } from "@react-three/drei";
import { THREE_CONFIG } from "@/lib/three";
import { WebGLCanvas } from "./WebGLCanvas";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function Scene() {
  const { product } = THREE_CONFIG.lighting;

  return (
    <WebGLCanvas>
      <ambientLight intensity={product.ambient} />
      <directionalLight position={[5, 5, 5]} intensity={product.keyIntensity} />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={product.fillIntensity}
        color={THREE_CONFIG.colors.accent}
      />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <ProductPlaceholder />
      </Float>
      <Environment preset={THREE_CONFIG.environment.preset} />
    </WebGLCanvas>
  );
}
