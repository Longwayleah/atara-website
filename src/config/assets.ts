/**
 * Asset paths for media and Blender → GLB pipeline.
 * Export from Blender: glTF Binary (.glb), Y-up, apply transforms.
 */

export const models = {
  vial: "/models/archon-vial.glb",
  vialSketchfab: "/models/archon-vial-sketchfab.glb",
  handVial: "/models/hand-vial.glb",
  handTest: "/models/hand-test.glb",
} as const;

export const vialTextures = {
  dir: "/models/archon-vial-textures",
  baseColorArchon: "/models/archon-vial-textures/Vial_BaseColor_archon.png",
  baseColor: "/models/archon-vial-textures/Vial_BaseColor.png",
  metallic: "/models/archon-vial-textures/Vial_Metallic.png",
  roughness: "/models/archon-vial-textures/Vial_Roughness.png",
  normal: "/models/archon-vial-textures/Vial_NormalOpenGL.png",
  transmission: "/models/archon-vial-textures/Vial_Transmission.png",
} as const;

export const images = {
  heroAtmosphere: "/images/hero-atmosphere.png",
  heroAtmosphere2x: "/images/Hero-atmosphere@2x.png",
  heroBackground: "/images/hero-image.png",
  poweredByMolecule: "/images/powered-by-molecule.png",
  featuredProtocolBackground: "/images/ribbon-without-glow.png",
  elevateRoutineBackground: "/images/elevate-routine-background.png",
  footerBackground: "/images/footer-background.png",
  menuBackground: "/images/menu-background.png",
  standardsWall: "/images/standards-sticky-wall.png",
  /** Atara brand assets */
  ataraHero: "/images/atara/Atara_Premium_Black_Woman_Hero_v3.png",
  ataraCoastal: "/images/atara/Atara_Luxury_Coastal_Landscape.jpg",
  ataraDroplet: "/images/atara/Atara_Champagne_Water_Droplet.jpg",
  ataraWarmStone: "/images/atara/Atara_Warm_Stone_Shadow.jpg",
  ataraCreamSand: "/images/atara/Atara_Cream_Sand_Texture.png",
  ataraEditorialPortrait: "/images/atara/Atara_Black_Woman_Editorial_Portrait.jpg",
  ataraBrandCard: "/images/atara/Atara_Cellular_Wellness_Brand_Card.jpg",
  ataraBrandStatement: "/images/atara/Atara_Brand_Statement_Card.jpg",
  ataraWordmark: "/images/atara/Atara_Charcoal_Wordmark.png",
  ataraCampaign: "/images/atara/Atara_Full_Product_Campaign.jpg",
  ataraStandardBg: "/images/atara/Atara_Standard_Background.jpg",
  ataraProtocolsGuide: "/images/atara/Atara_Our_Protocols_Guide.jpg",
  ataraInsideOut: "/images/atara/Atara_Inside_Out_Section.jpg",
  protocolRadiancePanel: "/images/atara/Atara_Protocol_Radiance_Panel.png",
  protocolRecoveryPanel: "/images/atara/Atara_Protocol_Recovery_Panel.png",
  protocolRenewPanel: "/images/atara/Atara_Protocol_Renew_Panel.png",
  protocolRefinePanel: "/images/atara/Atara_Protocol_Refine_Panel.jpg",
} as const;

export const ataraProducts = {
  radiance: "/products/Atara_Radiance_Card_45_v2.jpg",
  recovery: "/products/Atara_Recovery_Card_45_v2.jpg",
  renew: "/products/Atara_Renew_Card_45.jpg",
  refine: "/products/Atara_Refine_Card_45_v3.jpg",
  essential: "/products/Atara_Essential_Card_45.jpg",
} as const;

export type ModelKey = keyof typeof models;
