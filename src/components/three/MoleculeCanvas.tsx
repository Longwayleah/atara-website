"use client";

import { WebGLCanvas } from "./WebGLCanvas";
import { MoleculeMesh } from "./MoleculeMesh";

type MoleculeCanvasProps = {
  className?: string;
  active?: boolean;
};

export function MoleculeCanvas({ className, active = true }: MoleculeCanvasProps) {
  return (
    <WebGLCanvas
      className={className}
      exposure={0.98}
      dpr={[1, 1.35]}
      frameloop={active ? "always" : "demand"}
      camera={{
        position: [0, 0.05, 4.35],
        fov: 30,
        near: 0.1,
        far: 100,
      }}
    >
      <ambientLight intensity={0.42} color="#d8e2ec" />
      <directionalLight
        position={[5, 7, 6]}
        intensity={1.2}
        color="#f4f7fb"
      />
      <directionalLight
        position={[-6, 2, 4]}
        intensity={0.62}
        color="#8fa4b8"
      />
      <directionalLight
        position={[0, -2, -4]}
        intensity={0.28}
        color="#455980"
      />
      <pointLight position={[0, -1.5, 2.5]} intensity={0.4} color="#6e86a0" />

      <MoleculeMesh active={active} />
    </WebGLCanvas>
  );
}
