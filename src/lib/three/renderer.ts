import { ACESFilmicToneMapping, type WebGLRenderer } from "three";
import { THREE_CONFIG } from "./config";

type RendererOptions = {
  exposure?: number;
  alpha?: boolean;
};

/** Apply consistent Archon render settings to an R3F WebGLRenderer */
export function configureRenderer(
  gl: WebGLRenderer,
  { exposure = THREE_CONFIG.renderer.toneMappingExposure, alpha = true }: RendererOptions = {},
) {
  gl.setClearColor(0x000000, alpha ? THREE_CONFIG.renderer.clearAlpha : 1);
  gl.toneMapping = ACESFilmicToneMapping;
  gl.toneMappingExposure = exposure;
  gl.outputColorSpace = "srgb";
}

/** Standard R3F `gl` prop for transparent product canvases */
export function createGlConfig() {
  return {
    antialias: true,
    alpha: true,
    powerPreference: THREE_CONFIG.renderer.powerPreference,
  } as const;
}
