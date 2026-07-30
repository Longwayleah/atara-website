"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import { vialConfig } from "@/config/vial";
import { VialMesh } from "./VialMesh";

type VialCanvasProps = {
  className?: string;
  staticView?: boolean;
  dark?: boolean;
  centered?: boolean;
};

export function VialCanvas({
  className,
  staticView = false,
  dark = false,
  centered = false,
}: VialCanvasProps) {
  const cam = staticView
    ? vialConfig.camera.static
    : vialConfig.camera.interactive;
  const scene = staticView
    ? vialConfig.scene.static
    : vialConfig.scene.interactive;
  const centeredScene =
    centered && staticView ? vialConfig.scene.static.centered : null;
  const heroLighting = centeredScene?.lighting;
  const heroMaterial = centeredScene?.material;
  const groupY = centeredScene?.groupY ?? scene.groupY;
  const groupScale = centeredScene?.groupScale ?? scene.groupScale;
  const shadowY = centeredScene?.shadowY ?? scene.shadowY;
  const shadowOpacity = centeredScene?.shadowOpacity ?? scene.shadowOpacity;
  const shadowBlur = centeredScene?.shadowBlur ?? scene.shadowBlur;
  const shadowScale = centeredScene?.shadowScale ?? scene.shadowScale;
  const shadowColor = centeredScene?.shadowColor ?? "#0b1f3a";
  const cameraPosition: [number, number, number] = centeredScene
    ? [cam.position[0], centeredScene.cameraY, centeredScene.cameraZ ?? cam.position[2]]
    : [...cam.position];

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: cam.fov,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = dark ? cam.exposure + 0.06 : cam.exposure;
        }}
      >
        <Suspense fallback={null}>
          {/* Low ambient — flat fill kills glass depth and reads plastic */}
          <ambientLight intensity={dark ? 0.14 : scene.ambient} />

          {/* Key — softened + offset to reduce front shine */}
          <directionalLight
            position={centered && staticView ? [7, 4, 7] : [6, 5, 9]}
            intensity={
              heroLighting?.keyIntensity ??
              (dark ? 2.1 : staticView ? 1.75 : 2.1)
            }
            color={heroLighting?.keyColor ?? "#fffef9"}
          />
          <directionalLight
            position={[-5, 1.5, 5]}
            intensity={
              heroLighting?.fillIntensity ??
              (dark ? 0.38 : staticView ? 0.32 : 0.38)
            }
            color={heroLighting?.fillColor ?? (dark ? "#f4f2ee" : "#e8eeff")}
          />
          <directionalLight
            position={[0, 2.5, -7]}
            intensity={
              heroLighting?.rimIntensity ??
              (dark ? 0.85 : staticView ? 0.95 : 1.05)
            }
            color={heroLighting?.rimColor ?? "#ffffff"}
          />
          {centered && staticView ? (
            <>
              <directionalLight
                position={[-7.5, 0.8, 2.5]}
                intensity={heroLighting?.edgeLeftIntensity ?? 0.95}
                color={heroLighting?.edgeLeftColor ?? "#c8d4e0"}
              />
              <directionalLight
                position={[7.5, 1.2, 2.5]}
                intensity={heroLighting?.edgeRightIntensity ?? 0.88}
                color={heroLighting?.edgeRightColor ?? "#eef1f5"}
              />
            </>
          ) : null}
          <spotLight
            position={[2.5, 7, 6]}
            angle={0.14}
            penumbra={1}
            intensity={
              heroLighting?.spotIntensity ??
              (dark ? 0.7 : staticView ? 0.55 : 0.75)
            }
            color={heroLighting?.keyColor ?? "#ffffff"}
          />

          <group position={[0, groupY, 0]} scale={groupScale}>
            <VialMesh
              static={staticView}
              centered={centered && staticView}
              envMapIntensity={heroMaterial?.envMapIntensity}
              specularIntensity={heroMaterial?.specularIntensity}
              specularColor={heroMaterial?.specularColor}
            />
          </group>

          <ContactShadows
            position={[0, shadowY, 0]}
            opacity={dark ? 0.24 : shadowOpacity}
            scale={shadowScale}
            blur={shadowBlur}
            far={1.45}
            color={shadowColor}
          />

          {/* Studio HDRI — realistic glass reflections vs flat plastic */}
          <Environment
            preset="studio"
            environmentIntensity={
              heroLighting?.envIntensity ??
              (dark ? scene.envIntensity + 0.2 : scene.envIntensity)
            }
            resolution={1024}
          >
            {centered && staticView ? (
              <>
                {/* Silver edge rims — silhouette without front glare */}
                <Lightformer
                  color="#d8dee6"
                  intensity={0.95}
                  position={[-5.8, 1.2, 3.2]}
                  scale={[1.1, 8.5, 1]}
                  rotation={[0, 0, Math.PI / 2]}
                />
                <Lightformer
                  color="#eef1f5"
                  intensity={0.88}
                  position={[5.8, 0.8, 2.8]}
                  scale={[1, 9, 1]}
                  rotation={[0, 0, -Math.PI / 2]}
                />
                <Lightformer
                  color="#b8c0c8"
                  intensity={0.35}
                  position={[0, 4, -4]}
                  scale={[5, 5, 1]}
                />
              </>
            ) : (
              <>
                <Lightformer
                  intensity={staticView ? 2.8 : 2.2}
                  position={[4, 4, 6]}
                  scale={[8, 2, 1]}
                  rotation={[0, 0, 0]}
                />
                <Lightformer
                  intensity={0.35}
                  position={[-5, 3, -2]}
                  scale={[6, 4, 1]}
                  rotation={[0, 0, Math.PI / 2]}
                />
              </>
            )}
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
