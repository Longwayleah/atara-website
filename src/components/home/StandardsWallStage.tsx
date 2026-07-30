"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/config/assets";
import { homepageCopy } from "@/config/homepage";
import {
  STANDARDS_HOTSPOTS_STORAGE_KEY,
  STANDARDS_WALL_HOTSPOTS,
  type FactHotspot,
} from "@/config/standardsHotspots";

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hotspotsToCode(hotspots: FactHotspot[]) {
  return hotspots
    .map(
      (h) =>
        `  { factIndex: ${h.factIndex}, centerX: ${h.centerX}, centerY: ${h.centerY}, width: ${h.width}, height: ${h.height} },`,
    )
    .join("\n");
}

function isPlacementEnabled() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("placeStandards");
}

function cloneHotspots() {
  return STANDARDS_WALL_HOTSPOTS.map((hotspot) => ({ ...hotspot }));
}

function getValueFontClass(value: string) {
  const longestWord = Math.max(...value.split(/\s+/).map((word) => word.length), 0);

  if (longestWord >= 11) {
    return "max-w-[95%] max-md:text-[clamp(0.7rem,1.45vw,1.55rem)] max-md:leading-[0.94] md:text-[clamp(0.8rem,1.75vw,1.55rem)] md:leading-[0.92] tracking-[-0.04em]";
  }

  if (longestWord >= 9) {
    return "max-md:text-[clamp(0.88rem,2vw,2rem)] max-md:leading-[0.96] md:text-[clamp(1.05rem,2.45vw,2rem)] md:leading-[0.95] tracking-[-0.03em]";
  }

  return "max-md:text-[clamp(1rem,2.35vw,2.75rem)] max-md:leading-[0.96] md:text-[clamp(1.35rem,3.2vw,2.75rem)] md:leading-[0.95] tracking-[-0.03em]";
}

function getLabelFontClass(value: string) {
  const longestWord = Math.max(...value.split(/\s+/).map((word) => word.length), 0);

  if (longestWord >= 11) {
    return "max-md:text-[clamp(6.5px,0.78vw,9.5px)] max-md:tracking-[0.12em] md:text-[clamp(7px,0.9vw,9.5px)] md:tracking-[0.14em]";
  }

  return "max-md:text-[clamp(7px,0.88vw,11px)] max-md:tracking-[0.14em] md:text-[clamp(8px,1.05vw,11px)] md:tracking-[0.18em]";
}

export function StandardsWallStage() {
  const { trustSection } = homepageCopy;
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    index: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [placementMode, setPlacementMode] = useState(false);
  const [hotspots, setHotspots] = useState<FactHotspot[]>(cloneHotspots);
  const [activeIndex, setActiveIndex] = useState(2);
  const [copied, setCopied] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const activeHotspot = hotspots[activeIndex];

  useEffect(() => {
    if (!isPlacementEnabled()) return;
    setPlacementMode(true);
    const labelParam = new URLSearchParams(window.location.search).get("label");
    if (labelParam !== null) {
      setActiveIndex(Number(labelParam));
    }
  }, []);

  const patchHotspot = useCallback((index: number, patch: Partial<FactHotspot>) => {
    setHotspots((prev) =>
      prev.map((hotspot, hotspotIndex) =>
        hotspotIndex === index ? { ...hotspot, ...patch } : hotspot,
      ),
    );
  }, []);

  const nudgeHotspot = useCallback((index: number, dx: number, dy: number) => {
    setHotspots((prev) =>
      prev.map((hotspot, hotspotIndex) => {
        if (hotspotIndex !== index) return hotspot;
        return {
          ...hotspot,
          centerX: round1(clamp(hotspot.centerX + dx, 0, 100)),
          centerY: round1(clamp(hotspot.centerY + dy, 0, 100)),
        };
      }),
    );
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingIndex(null);
    document.body.style.overflow = "";
    document.documentElement.removeAttribute("data-standards-placement-drag");
  }, []);

  useEffect(() => {
    if (!placementMode) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragRef.current || !stageRef.current) return;
      event.preventDefault();

      const rect = stageRef.current.getBoundingClientRect();
      const dx = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
      const dy = ((event.clientY - dragRef.current.startY) / rect.height) * 100;
      const { index, originX, originY } = dragRef.current;

      setHotspots((prev) =>
        prev.map((hotspot, hotspotIndex) =>
          hotspotIndex === index
            ? {
                ...hotspot,
                centerX: round1(clamp(originX + dx, 0, 100)),
                centerY: round1(clamp(originY + dy, 0, 100)),
              }
            : hotspot,
        ),
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", endDrag);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", endDrag);
    };
  }, [placementMode, endDrag]);

  useEffect(() => {
    if (!placementMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const step = event.shiftKey ? 3 : 1;
      let dx = 0;
      let dy = 0;

      if (event.key === "ArrowLeft") dx = -step;
      if (event.key === "ArrowRight") dx = step;
      if (event.key === "ArrowUp") dy = -step;
      if (event.key === "ArrowDown") dy = step;
      if (!dx && !dy) return;

      event.preventDefault();
      nudgeHotspot(activeIndex, dx, dy);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [placementMode, activeIndex, nudgeHotspot]);

  const copyCoordinates = async () => {
    const snippet = `export const STANDARDS_WALL_HOTSPOTS: FactHotspot[] = [\n${hotspotsToCode(hotspots)}\n];`;
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const resetHotspots = () => {
    localStorage.removeItem(STANDARDS_HOTSPOTS_STORAGE_KEY);
    setHotspots(cloneHotspots());
  };

  const activePillar = trustSection.pillars[activeHotspot?.factIndex ?? 0];

  return (
    <div className="space-y-4">
      {placementMode ? (
        <div
          data-lenis-prevent="true"
          className="relative z-50 rounded-sm border border-archon-navy/15 bg-archon-cream/60 px-4 py-3 font-body text-xs text-archon-navy"
        >
          <p className="font-semibold uppercase tracking-[0.14em]">Placement mode</p>
          <p className="mt-1 text-archon-muted">
            Pick a label, then change the vertical number or press Down. Higher vertical = further
            down the image.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.14em] text-archon-muted">
                  Label
                </span>
                <select
                  value={activeIndex}
                  onChange={(event) => setActiveIndex(Number(event.target.value))}
                  className="rounded-sm border border-archon-navy/15 bg-white px-2 py-1.5 text-sm text-archon-navy"
                >
                  {hotspots.map((hotspot, index) => {
                    const pillar = trustSection.pillars[hotspot.factIndex];
                    return (
                      <option key={pillar?.label ?? index} value={index}>
                        {pillar?.value ?? `Label ${index + 1}`}
                      </option>
                    );
                  })}
                </select>
              </label>

              <div className="rounded-sm border border-archon-navy/10 bg-white p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-archon-muted">
                  Live position
                </p>
                <p className="mt-1 font-mono text-sm text-archon-navy">
                  X {activeHotspot?.centerX ?? 0}% · Y {activeHotspot?.centerY ?? 0}%
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="font-semibold uppercase tracking-[0.14em]">Horizontal %</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={activeHotspot?.centerX ?? 0}
                    onChange={(event) =>
                      patchHotspot(activeIndex, { centerX: Number(event.target.value) })
                    }
                    className="rounded-sm border border-archon-navy/15 bg-white px-2 py-2 text-base text-archon-navy"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-semibold uppercase tracking-[0.14em]">Vertical %</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={activeHotspot?.centerY ?? 0}
                    onChange={(event) =>
                      patchHotspot(activeIndex, { centerY: Number(event.target.value) })
                    }
                    className="rounded-sm border border-archon-navy/15 bg-white px-2 py-2 text-base text-archon-navy"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => nudgeHotspot(activeIndex, 0, -3)}
                className="rounded-sm border border-archon-navy/15 bg-white px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-archon-navy hover:text-white"
              >
                Move up
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => nudgeHotspot(activeIndex, 0, 3)}
                className="rounded-sm border border-archon-navy/20 bg-archon-navy px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-archon-navy/85"
              >
                Move down
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => nudgeHotspot(activeIndex, -3, 0)}
                className="rounded-sm border border-archon-navy/15 bg-white px-3 py-2 text-sm uppercase tracking-[0.12em] hover:bg-archon-navy hover:text-white"
              >
                Move left
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => nudgeHotspot(activeIndex, 3, 0)}
                className="rounded-sm border border-archon-navy/15 bg-white px-3 py-2 text-sm uppercase tracking-[0.12em] hover:bg-archon-navy hover:text-white"
              >
                Move right
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={copyCoordinates}
              className="rounded-sm border border-archon-navy/20 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-archon-navy transition-colors hover:bg-archon-navy hover:text-white"
            >
              {copied ? "Copied" : "Copy coordinates"}
            </button>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={resetHotspots}
              className="rounded-sm border border-archon-navy/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-archon-muted transition-colors hover:text-archon-navy"
            >
              Reset all
            </button>
          </div>

          {activePillar ? (
            <p className="mt-3 text-[11px] text-archon-muted">
              Editing: <span className="font-semibold text-archon-navy">{activePillar.value}</span>
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        ref={stageRef}
        data-lenis-prevent={placementMode ? "true" : undefined}
        className="standards-wall-stage relative mx-auto aspect-[4/3] w-full max-w-[1024px] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
          data-standards-wall-parallax
        >
          <div
            className="absolute inset-0 will-change-[opacity,transform]"
            data-standards-wall
          >
            <Image
              src={images.standardsWall}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-fill select-none"
              draggable={false}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2]">
          {hotspots.map((hotspot, index) => {
            const pillar = trustSection.pillars[hotspot.factIndex];
            if (!pillar) return null;

            const isActive = placementMode && activeIndex === index;
            const href = "href" in pillar ? pillar.href : undefined;
            const isLink = !placementMode && Boolean(href);

            const layerStyle = {
              left: `${hotspot.centerX}%`,
              top: `${hotspot.centerY}%`,
              width: `${hotspot.width}%`,
              height: `${hotspot.height}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 30 : 20,
            } as const;

            const isInteractive = !placementMode;

            const factClassName = isInteractive
              ? `standards-wall-fact standards-wall-fact--interactive block h-full w-full pointer-events-auto${
                  isLink ? " standards-wall-fact--link cursor-pointer" : ""
                }`
              : `standards-wall-fact block h-full w-full select-none ${
                  isActive
                    ? "outline outline-2 outline-red-500"
                    : "outline outline-2 outline-dashed outline-red-500/70"
                }`;

            const factContent = (
              <div className="standards-wall-fact__content flex h-full w-full flex-col items-center justify-center px-[5%] py-[6%] text-center text-archon-navy">
                <p className={`standards-wall-fact__value font-display ${getValueFontClass(pillar.value)}`}>
                  {pillar.value}
                </p>
                <h3
                  className={`standards-wall-fact__label mt-1 max-md:leading-[1.28] md:mt-1.5 md:leading-[1.35] font-body font-semibold uppercase text-archon-navy/80 ${getLabelFontClass(pillar.value)}`}
                >
                  {pillar.label.split(" ").map((word) => (
                    <span key={word} className="block">
                      {word}
                    </span>
                  ))}
                </h3>
                {isLink ? (
                  <span className="standards-wall-fact__hint mt-0.5 max-md:text-[7px] md:mt-1 font-body text-[clamp(7px,0.85vw,9px)] uppercase tracking-[0.12em] text-archon-navy/45 underline decoration-archon-navy/25 underline-offset-[3px] md:tracking-[0.14em]">
                    View library →
                  </span>
                ) : null}
              </div>
            );

            const layerProps = {
              className: "absolute will-change-transform",
              style: layerStyle,
              "data-standards-fact-parallax": true,
              "data-fact-depth": hotspot.centerY,
            } as const;

            if (isLink && href) {
              return (
                <div key={pillar.label} {...layerProps}>
                  <Link
                    href={href}
                    aria-label="View COA library"
                    className={factClassName}
                    data-standards-fact
                    data-fact-depth={hotspot.centerY}
                  >
                    {factContent}
                  </Link>
                </div>
              );
            }

            return (
              <div key={pillar.label} {...layerProps}>
                <div
                  className={factClassName}
                  data-standards-fact={placementMode ? undefined : true}
                  data-fact-depth={hotspot.centerY}
                  onMouseDown={
                    placementMode
                      ? (event) => {
                          event.preventDefault();
                          document.body.style.overflow = "hidden";
                          document.documentElement.setAttribute(
                            "data-standards-placement-drag",
                            "true",
                          );
                          dragRef.current = {
                            index,
                            startX: event.clientX,
                            startY: event.clientY,
                            originX: hotspot.centerX,
                            originY: hotspot.centerY,
                          };
                          setActiveIndex(index);
                          setDraggingIndex(index);
                        }
                      : undefined
                  }
                >
                  {factContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {placementMode ? (
        <pre className="overflow-x-auto rounded-sm border border-archon-navy/10 bg-white p-3 font-mono text-[10px] leading-relaxed text-archon-navy/80">
          {hotspotsToCode(hotspots)}
        </pre>
      ) : null}
    </div>
  );
}
