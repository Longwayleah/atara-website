/** TurboSquid vial — tune look & hero framing here */
export const vialConfig = {
  modelPath: "/models/archon-vial.glb",
  textureDir: "/models/archon-vial-textures",
  /** Baked in Blender — full Archon label on TurboSquid UV */
  baseColorMap: "Vial_BaseColor_archon.png",

  targetHeight: 1.72,

  rotation: {
    /** Navy label square to camera */
    static: { x: -0.025, y: -1.38, z: 0 },
    interactive: { x: 0, y: -1.49, z: 0 },
  },

  /**
   * Real glass — trust PBR maps, avoid clearcoat (reads as plastic on vials).
   * transmissionMap masks label/cap vs borosilicate body.
   */
  material: {
    metalness: 1,
    roughness: 1,
    normalScale: 0.38,
    transmission: 1,
    thickness: 1.18,
    ior: 1.52,
    envMapIntensity: 2.35,
    /** Clearcoat on a single mesh = shiny plastic shell — keep near zero */
    clearcoat: 0,
    clearcoatRoughness: 0.08,
    specularIntensity: 1,
    /** Subtle chromatic dispersion — borosilicate edge realism (Three r152+) */
    dispersion: 0.045,
    attenuationColor: "#fafcff",
    attenuationDistance: 14,
  },

  camera: {
    static: {
      position: [0, -0.28, 5.9] as const,
      fov: 29,
      exposure: 1.02,
    },
    interactive: {
      position: [0, 0.02, 4.25] as const,
      fov: 34,
      exposure: 0.92,
    },
  },

  scene: {
    static: {
      groupY: -0.32,
      groupScale: 0.94,
      shadowY: -1.08,
      shadowOpacity: 0.32,
      shadowScale: 2.65,
      shadowBlur: 3.6,
      envIntensity: 1.45,
      ambient: 0.09,
      /** Hero chamber oval — vial centered vertically above contact shadow */
      centered: {
        groupY: -0.02,
        cameraY: -0.04,
        cameraZ: 5.55,
        groupScale: 1.12,
        shadowY: -1.02,
        shadowOpacity: 0.28,
        shadowBlur: 4.4,
        shadowScale: 2.9,
        shadowColor: "#525252",
        /** Studio product photo — soft key, silver edge read */
        lighting: {
          envIntensity: 0.72,
          keyIntensity: 0.78,
          fillIntensity: 0.22,
          rimIntensity: 0.95,
          spotIntensity: 0.08,
          keyColor: "#f4f2ee",
          fillColor: "#d8dce2",
          rimColor: "#c8d0da",
          edgeLeftIntensity: 0.88,
          edgeRightIntensity: 0.82,
          edgeLeftColor: "#a8b4c0",
          edgeRightColor: "#e2e8ee",
        },
        material: {
          envMapIntensity: 1.02,
          specularIntensity: 0.32,
          specularColor: "#d0dae4",
        },
      },
    },
    interactive: {
      groupY: -0.12,
      groupScale: 1,
      shadowY: -1.04,
      shadowOpacity: 0.46,
      shadowScale: 3,
      shadowBlur: 2.8,
      envIntensity: 1.25,
      ambient: 0.11,
    },
  },
} as const;
