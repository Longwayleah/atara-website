"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { cn } from "@/lib/utils/cn";
import { THREE_CONFIG, clampDpr, configureRenderer, createGlConfig } from "@/lib/three";

type WebGLCanvasProps = {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  exposure?: number;
  dpr?: number | [number, number];
  camera?: CanvasProps["camera"];
  frameloop?: CanvasProps["frameloop"];
  onReady?: () => void;
};

/**
 * Standard R3F canvas shell for Blender GLB scenes.
 * Transparent background, ACES tone mapping, performance-safe DPR.
 */
export function WebGLCanvas({
  children,
  className,
  fallback = null,
  exposure,
  dpr = THREE_CONFIG.dpr,
  camera = {
    fov: THREE_CONFIG.camera.fov,
    near: THREE_CONFIG.camera.near,
    far: THREE_CONFIG.camera.far,
    position: THREE_CONFIG.camera.position,
  },
  frameloop = "always",
  onReady,
}: WebGLCanvasProps) {
  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden>
      <Canvas
        camera={camera}
        dpr={typeof dpr === "number" ? clampDpr(dpr) : dpr}
        frameloop={frameloop}
        gl={createGlConfig()}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          configureRenderer(gl, { exposure });
          onReady?.();
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
