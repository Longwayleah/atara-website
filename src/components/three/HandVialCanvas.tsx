"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Box3, Color, Vector3 } from "three";
import type { Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

useGLTF.preload("/models/hand-vial.glb");

const TARGET_SIZE = 1.65;
const WRIST_OFFSET = 0.78;
const GROUP_Y_OFFSET = -0.1;
/** GLB vial cylinders are authored ~60× too small relative to the hand mesh */
const VIAL_SCALE = 48;
/** Nudge vial upward in palm after root rotation (local +Z → world +Y) */
const VIAL_UP_OFFSET = 0.028;

function brightenMaterials(object: Object3D) {
  object.traverse((child) => {
    if (!("isMesh" in child) || !(child as Mesh).isMesh) return;

    const mesh = child as Mesh;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    for (const material of materials) {
      if (!material || !("isMeshStandardMaterial" in material)) continue;
      const mat = material as MeshStandardMaterial;

      if (
        mat.name.startsWith("ArchonSkin") ||
        mat.name === "ArchonSkin" ||
        mesh.name.includes("Hand")
      ) {
        mat.color = new Color("#6b4535");
        mat.roughness = 0.68;
        mat.metalness = 0.02;
      }

      if (mat.name === "Navy" || mat.name.startsWith("Navy") || mat.name === "nv") {
        mat.color = new Color("#0f2848");
        mat.metalness = 0.15;
        mat.roughness = 0.55;
      }

      if (mat.name === "Glass" || mat.name.startsWith("Glass") || mat.name === "gl") {
        mat.color = new Color("#eef2f8");
        mat.roughness = 0.05;
        mat.transparent = true;
        mat.opacity = 0.92;
      }

      mat.needsUpdate = true;
    }
  });
}

function frameModel(root: Object3D) {
  root.rotation.set(0, 0, 0);
  root.position.set(0, 0, 0);
  root.scale.set(1, 1, 1);
  root.updateMatrixWorld(true);

  const hand = root.getObjectByName("ArchonHandReal");
  const vial = root.getObjectByName("ArchonVial");

  if (hand) {
    const handBox = new Box3().setFromObject(hand);
    const handSize = handBox.getSize(new Vector3());

    // Fingers along +Z in export → rotate to vertical (+Y)
    if (handSize.z >= handSize.y && handSize.z >= handSize.x) {
      root.rotation.x = -Math.PI / 2;
    } else if (handSize.x >= handSize.y && handSize.x >= handSize.z) {
      root.rotation.z = Math.PI / 2;
    }

    root.updateMatrixWorld(true);

    // Frame from hand bounds only — vial is tiny in export and must not drive scale
    const fittedHand = new Box3().setFromObject(hand);
    const maxDim = Math.max(...fittedHand.getSize(new Vector3()).toArray());
    if (maxDim > 0) {
      root.scale.setScalar(TARGET_SIZE / maxDim);
    }
  }

  if (vial) {
    vial.scale.multiplyScalar(VIAL_SCALE);
    vial.position.z += VIAL_UP_OFFSET;
  }

  root.updateMatrixWorld(true);

  if (hand) {
    const handBox = new Box3().setFromObject(hand);
    const handCenter = handBox.getCenter(new Vector3());
    // Anchor from hand bounds — scaled vial must not drive X/Z centering
    root.position.set(-handCenter.x, -handBox.min.y - WRIST_OFFSET, -handCenter.z);
  }
}

function HandVialModel() {
  const { scene } = useGLTF("/models/hand-vial.glb");
  const model = useMemo(() => {
    const clone = scene.clone(true);
    brightenMaterials(clone);
    const root = clone.getObjectByName("HandVialRoot") ?? clone;
    frameModel(root);
    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

function HandVialScene() {
  const groupRef = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = GROUP_Y_OFFSET + Math.sin(t * 0.55) * 0.012;
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#3d2818" />
      <directionalLight position={[2, 4, 5]} intensity={2.2} color="#ffbc7a" />
      <directionalLight position={[-2, 2, 3]} intensity={0.85} color="#ffd9b0" />
      <spotLight
        position={[1.5, 3.5, 4]}
        angle={0.45}
        penumbra={0.7}
        intensity={10}
        color="#ffb060"
      />
      <spotLight
        position={[-2, 1.5, 2]}
        angle={0.55}
        penumbra={1}
        intensity={2}
        color="#8090c0"
      />
      <Environment preset="city" environmentIntensity={0.35} />

      <group ref={groupRef} position={[0, GROUP_Y_OFFSET, 0]}>
        <HandVialModel />
      </group>
    </>
  );
}

type HandVialCanvasProps = {
  className?: string;
};

export function HandVialCanvas({ className }: HandVialCanvasProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.28, 3.0], fov: 28, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.45;
        }}
      >
        <Suspense fallback={null}>
          <HandVialScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
