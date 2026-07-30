"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  Box3,
  Color,
  DoubleSide,
  LinearFilter,
  LinearSRGBColorSpace,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from "three";
import type { Group, Mesh, Object3D, Texture } from "three";
import { vialConfig } from "@/config/vial";

const { modelPath, textureDir, baseColorMap, targetHeight, rotation, material: mat } =
  vialConfig;
const NAVY = "#0b1f3a";

useGLTF.preload(modelPath);
useTexture.preload([
  `${textureDir}/${baseColorMap}`,
  `${textureDir}/Vial_Metallic.png`,
  `${textureDir}/Vial_Roughness.png`,
  `${textureDir}/Vial_NormalOpenGL.png`,
  `${textureDir}/Vial_Transmission.png`,
]);

type VialMeshProps = {
  static?: boolean;
  centered?: boolean;
  envMapIntensity?: number;
  specularIntensity?: number;
  specularColor?: string;
};

type PbrMaps = {
  map: Texture;
  metalnessMap: Texture;
  roughnessMap: Texture;
  normalMap: Texture;
  transmissionMap: Texture;
};

function configureTexture(
  tex: Texture,
  colorSpace: typeof SRGBColorSpace | typeof LinearSRGBColorSpace,
) {
  tex.colorSpace = colorSpace;
  /** glTF UVs expect image origin top-left — default flipY=true warps TurboSquid maps */
  tex.flipY = false;
  tex.anisotropy = 16;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
}

function isTurboSquidModel(object: Object3D) {
  let meshCount = 0;
  object.traverse((child) => {
    if ("isMesh" in child && (child as Mesh).isMesh) meshCount += 1;
  });
  return meshCount <= 2;
}

function applyTurboSquidMaterials(
  object: Object3D,
  maps: PbrMaps,
  overrides?: {
    envMapIntensity?: number;
    specularIntensity?: number;
    specularColor?: string;
  },
) {
  configureTexture(maps.map, SRGBColorSpace);
  configureTexture(maps.metalnessMap, LinearSRGBColorSpace);
  configureTexture(maps.roughnessMap, LinearSRGBColorSpace);
  configureTexture(maps.normalMap, LinearSRGBColorSpace);
  configureTexture(maps.transmissionMap, LinearSRGBColorSpace);

  object.traverse((child) => {
    if (!("isMesh" in child) || !(child as Mesh).isMesh) return;

    const mesh = child as Mesh;
    mesh.renderOrder = 2;
    mesh.material = new MeshPhysicalMaterial({
      map: maps.map,
      metalnessMap: maps.metalnessMap,
      metalness: mat.metalness,
      roughnessMap: maps.roughnessMap,
      roughness: mat.roughness,
      normalMap: maps.normalMap,
      normalScale: new Vector2(mat.normalScale, mat.normalScale),
      transmissionMap: maps.transmissionMap,
      transmission: mat.transmission,
      thickness: mat.thickness,
      ior: mat.ior,
      envMapIntensity: overrides?.envMapIntensity ?? mat.envMapIntensity,
      clearcoat: mat.clearcoat,
      clearcoatRoughness: mat.clearcoatRoughness,
      specularIntensity: overrides?.specularIntensity ?? mat.specularIntensity,
      specularColor: new Color(overrides?.specularColor ?? "#ffffff"),
      dispersion: mat.dispersion,
      side: DoubleSide,
      transparent: true,
      depthWrite: true,
      attenuationColor: new Color(mat.attenuationColor),
      attenuationDistance: mat.attenuationDistance,
    });
  });
}

function applyLegacyMaterials(object: Object3D, labelMap: Texture | null) {
  object.traverse((child) => {
    if (!("isMesh" in child) || !(child as Mesh).isMesh) return;

    const mesh = child as Mesh;
    const meshName = mesh.name.toLowerCase();

    if (meshName.includes("glass")) {
      mesh.renderOrder = 2;
      mesh.material = new MeshPhysicalMaterial({
        color: new Color("#ffffff"),
        metalness: 0,
        roughness: 0.04,
        transmission: 0.88,
        thickness: 0.42,
        ior: 1.52,
        envMapIntensity: 1.75,
        clearcoat: 0.15,
        clearcoatRoughness: 0.05,
        transparent: true,
        attenuationColor: new Color("#eef3f8"),
        attenuationDistance: 3,
      });
      return;
    }

    if (meshName.includes("lid") || meshName.includes("cap")) {
      mesh.material = new MeshStandardMaterial({
        color: new Color(NAVY),
        metalness: 0.03,
        roughness: 0.6,
        envMapIntensity: 0.3,
      });
      return;
    }

    if (meshName.includes("powder") || meshName.includes("liquid")) {
      mesh.material = new MeshStandardMaterial({
        color: new Color("#f3f3f3"),
        roughness: 0.93,
        metalness: 0,
      });
      return;
    }

    if (meshName.includes("label")) {
      mesh.renderOrder = 3;
      if (labelMap) {
        labelMap.colorSpace = SRGBColorSpace;
        labelMap.anisotropy = 16;
      }
      mesh.material = new MeshStandardMaterial({
        map: labelMap ?? undefined,
        color: new Color("#ffffff"),
        metalness: 0,
        roughness: 0.8,
        envMapIntensity: 0.1,
      });
    }
  });
}

function frameVial(object: Object3D, centered: boolean, isStatic: boolean) {
  const rot = isStatic ? rotation.static : rotation.interactive;
  object.rotation.set(rot.x, rot.y, rot.z);
  object.position.set(0, 0, 0);
  object.scale.set(1, 1, 1);
  object.updateMatrixWorld(true);

  const box = new Box3().setFromObject(object);
  const size = box.getSize(new Vector3());

  if (size.y > 0) {
    object.scale.setScalar(targetHeight / size.y);
  }

  object.updateMatrixWorld(true);

  const fitted = new Box3().setFromObject(object);
  const center = fitted.getCenter(new Vector3());
  const fittedSize = fitted.getSize(new Vector3());

  if (centered) {
    object.position.set(-center.x, -center.y, -center.z);
  } else if (isStatic) {
    /** Hero — bottom-aligned with headroom so cap stays in frame */
    object.position.set(
      -center.x,
      -fitted.min.y + fittedSize.y * 0.12,
      -center.z,
    );
  } else {
    object.position.set(-center.x, -fitted.min.y, -center.z);
  }
}

export function VialMesh({
  static: isStatic = false,
  centered = false,
  envMapIntensity,
  specularIntensity,
  specularColor,
}: VialMeshProps) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();
  const { scene } = useGLTF(modelPath);
  const [map, metalnessMap, roughnessMap, normalMap, transmissionMap] =
    useTexture([
      `${textureDir}/${baseColorMap}`,
      `${textureDir}/Vial_Metallic.png`,
      `${textureDir}/Vial_Roughness.png`,
      `${textureDir}/Vial_NormalOpenGL.png`,
      `${textureDir}/Vial_Transmission.png`,
    ]);

  const labelMap = useTexture("/models/archon-vial-label.png");

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const maps: PbrMaps = {
      map,
      metalnessMap,
      roughnessMap,
      normalMap,
      transmissionMap,
    };

    if (isTurboSquidModel(clone)) {
      applyTurboSquidMaterials(clone, maps, {
        envMapIntensity,
        specularIntensity,
        specularColor,
      });
    } else {
      applyLegacyMaterials(clone, labelMap);
    }

    frameVial(clone, centered || !isStatic, isStatic);
    return clone;
  }, [
    scene,
    map,
    metalnessMap,
    roughnessMap,
    normalMap,
    transmissionMap,
    labelMap,
    isStatic,
    centered,
    envMapIntensity,
    specularIntensity,
    specularColor,
  ]);

  useFrame((_, delta) => {
    if (isStatic || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x +=
      (pointer.y * 0.12 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z +=
      (-pointer.x * 0.08 - groupRef.current.rotation.z) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}
