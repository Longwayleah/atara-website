"use client";

import { useEffect } from "react";
import { preloadCoreModels } from "@/lib/three";

/** Preload Blender GLBs after hydration so hero 3D appears instantly */
export function ModelPreloader() {
  useEffect(() => {
    preloadCoreModels();
  }, []);

  return null;
}
