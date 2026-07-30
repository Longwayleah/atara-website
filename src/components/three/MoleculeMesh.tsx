"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Quaternion,
  Vector3,
  type Group,
} from "three";
import { useMotionSafe } from "@/hooks/useMotionSafe";

type AtomSpec = {
  position: [number, number, number];
  radius: number;
  color: string;
};

const ATOMS: AtomSpec[] = [
  { position: [0, 0.82, 0], radius: 0.13, color: "#eef2f7" },
  { position: [-0.58, 0.34, 0.22], radius: 0.1, color: "#c8d4e0" },
  { position: [0.54, 0.28, -0.24], radius: 0.1, color: "#9eb0c2" },
  { position: [-0.38, -0.42, -0.18], radius: 0.11, color: "#b8c6d4" },
  { position: [0.42, -0.48, 0.18], radius: 0.1, color: "#7f96ad" },
  { position: [0, -0.96, 0], radius: 0.13, color: "#dde6ef" },
  { position: [-0.74, -0.12, 0.42], radius: 0.08, color: "#6e86a0" },
  { position: [0.78, 0.02, 0.38], radius: 0.08, color: "#8fa4b8" },
  { position: [0.18, 0.62, 0.52], radius: 0.07, color: "#a8b8c8" },
  { position: [-0.22, 0.58, -0.48], radius: 0.07, color: "#95a8ba" },
];

const BONDS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [3, 5],
  [4, 5],
  [1, 3],
  [2, 4],
  [1, 6],
  [2, 7],
  [0, 8],
  [0, 9],
  [1, 9],
  [2, 8],
];

const BOND_RADIUS = 0.028;
const BOND_COLOR = "#8fa3b8";

const up = new Vector3(0, 1, 0);

function Bond({ start, end }: { start: Vector3; end: Vector3 }) {
  const { position, quaternion, length } = useMemo(() => {
    const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
    const direction = new Vector3().subVectors(end, start);
    const bondLength = direction.length();
    direction.normalize();

    const rotation = new Quaternion().setFromUnitVectors(up, direction);

    return {
      position: midpoint,
      quaternion: rotation,
      length: bondLength,
    };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[BOND_RADIUS, BOND_RADIUS, length, 10]} />
      <meshStandardMaterial
        color={BOND_COLOR}
        metalness={0.72}
        roughness={0.28}
        envMapIntensity={0.85}
      />
    </mesh>
  );
}

export function MoleculeMesh({ active = true }: { active?: boolean }) {
  const groupRef = useRef<Group>(null);
  const motionSafe = useMotionSafe();

  const atomVectors = useMemo(
    () => ATOMS.map((atom) => new Vector3(...atom.position)),
    [],
  );

  useFrame((state, delta) => {
    if (!active || !motionSafe || !groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.38) * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {BONDS.map(([from, to]) => (
        <Bond
          key={`${from}-${to}`}
          start={atomVectors[from]}
          end={atomVectors[to]}
        />
      ))}

      {ATOMS.map((atom, index) => (
        <mesh key={index} position={atom.position}>
          <sphereGeometry args={[atom.radius, 24, 24]} />
          <meshPhysicalMaterial
            color={atom.color}
            metalness={0.15}
            roughness={0.18}
            clearcoat={0.35}
            clearcoatRoughness={0.12}
            envMapIntensity={1.1}
            transparent
            opacity={0.96}
          />
        </mesh>
      ))}
    </group>
  );
}
