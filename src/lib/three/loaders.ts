import { useGLTF } from "@react-three/drei";
import { models, type ModelKey } from "@/config/assets";

/** Preload a Blender-exported GLB before it enters the viewport */
export function preloadModel(key: ModelKey) {
  useGLTF.preload(models[key]);
}

/** Preload all core Archon 3D assets (call from layout or hero) */
export function preloadCoreModels() {
  useGLTF.preload(models.vial);
}

export { useGLTF };
