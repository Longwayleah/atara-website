"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { cn } from "@/lib/utils/cn";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-archon-hero-bg/30">
      <div className="h-8 w-8 animate-pulse rounded-full bg-archon-electric/20" />
    </div>
  ),
});

type CanvasWrapperProps = {
  className?: string;
  fallback?: React.ReactNode;
};

/** Lazy-loaded 3D scene — use for below-fold or secondary WebGL */
export function CanvasWrapper({ className, fallback }: CanvasWrapperProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Suspense fallback={fallback ?? null}>
        <Scene />
      </Suspense>
    </div>
  );
}

export { WebGLCanvas } from "./WebGLCanvas";
