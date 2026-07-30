"use client";

import { useMemo } from "react";
import { Capsule } from "@react-three/drei";
import type { MeshStandardMaterialParameters } from "three";

const SKIN: MeshStandardMaterialParameters = {
  color: "#2a1810",
  roughness: 0.88,
  metalness: 0.02,
};

type FingerProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  length?: number;
  radius?: number;
};

function Finger({ position, rotation, length = 0.42, radius = 0.075 }: FingerProps) {
  const seg = length / 3;

  return (
    <group position={position} rotation={rotation}>
      <Capsule args={[radius, seg, 8, 16]} position={[0, seg * 0.5, 0]}>
        <meshStandardMaterial {...SKIN} />
      </Capsule>
      <group position={[0, seg, 0]} rotation={[0.55, 0, 0]}>
        <Capsule args={[radius * 0.92, seg, 8, 16]} position={[0, seg * 0.5, 0]}>
          <meshStandardMaterial {...SKIN} />
        </Capsule>
        <group position={[0, seg, 0]} rotation={[0.45, 0, 0]}>
          <Capsule args={[radius * 0.82, seg * 0.85, 8, 16]} position={[0, seg * 0.42, 0]}>
            <meshStandardMaterial {...SKIN} />
          </Capsule>
        </group>
      </group>
    </group>
  );
}

export function HandMesh() {
  const fingers = useMemo(
    () => [
      { position: [-0.42, 0.18, 0.05] as [number, number, number], rotation: [0.15, 0.08, -0.12] as [number, number, number], length: 0.38, radius: 0.068 },
      { position: [-0.14, 0.22, 0.02] as [number, number, number], rotation: [0.1, 0, 0] as [number, number, number], length: 0.46, radius: 0.074 },
      { position: [0.16, 0.2, 0.02] as [number, number, number], rotation: [0.12, -0.04, 0.06] as [number, number, number], length: 0.44, radius: 0.072 },
      { position: [0.44, 0.14, 0.08] as [number, number, number], rotation: [0.18, -0.12, 0.18] as [number, number, number], length: 0.36, radius: 0.062 },
    ],
    [],
  );

  return (
    <group rotation={[-0.35, 0.08, 0]}>
      {/* Palm */}
      <mesh position={[0, -0.05, 0.02]} scale={[1.35, 0.28, 1.55]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial {...SKIN} />
      </mesh>

      {/* Heel / wrist */}
      <mesh position={[0, -0.42, 0.18]} rotation={[0.55, 0, 0]} scale={[0.85, 1, 0.9]}>
        <capsuleGeometry args={[0.28, 0.55, 8, 16]} />
        <meshStandardMaterial {...SKIN} />
      </mesh>

      {/* Forearm fade */}
      <mesh position={[0, -0.95, 0.35]} rotation={[0.75, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.32, 0.9, 16]} />
        <meshStandardMaterial {...SKIN} />
      </mesh>

      {/* Fingers */}
      {fingers.map((finger, i) => (
        <Finger key={i} {...finger} />
      ))}

      {/* Thumb */}
      <group position={[0.62, -0.02, 0.28]} rotation={[0.2, -0.65, -0.85]}>
        <Capsule args={[0.078, 0.22, 8, 16]} position={[0, 0.11, 0]}>
          <meshStandardMaterial {...SKIN} />
        </Capsule>
        <group position={[0, 0.22, 0]} rotation={[0.35, 0, 0]}>
          <Capsule args={[0.07, 0.18, 8, 16]} position={[0, 0.09, 0]}>
            <meshStandardMaterial {...SKIN} />
          </Capsule>
          <group position={[0, 0.18, 0]} rotation={[0.4, 0, 0]}>
            <Capsule args={[0.062, 0.14, 8, 16]} position={[0, 0.07, 0]}>
              <meshStandardMaterial {...SKIN} />
            </Capsule>
          </group>
        </group>
      </group>
    </group>
  );
}
