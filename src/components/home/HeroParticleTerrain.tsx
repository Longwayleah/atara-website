"use client";

import { useEffect, useRef } from "react";

type HeroParticleTerrainProps = {
  animated?: boolean;
  className?: string;
};

function drawTerrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  ctx.clearRect(0, 0, width, height);

  const cols = width < 768 ? 48 : 72;
  const rows = width < 768 ? 28 : 36;
  const horizonY = height * 0.38;
  const floorY = height * 0.98;

  for (let row = 0; row < rows; row++) {
    const depth = row / (rows - 1);
    const perspective = 0.15 + depth * 0.85;
    const yBase = horizonY + (floorY - horizonY) * depth * depth;

    for (let col = 0; col < cols; col++) {
      const xNorm = (col / (cols - 1)) * 2 - 1;
      const x = width * 0.5 + xNorm * width * 0.55 * perspective;

      const wave =
        Math.sin(col * 0.22 + time * 1.2) * 8 * perspective +
        Math.cos(row * 0.35 + time * 0.9) * 6 * perspective +
        Math.sin((col + row) * 0.15 + time) * 4 * perspective;

      const y = yBase + wave;
      const size = (0.6 + depth * 1.8) * (width < 768 ? 0.85 : 1);
      const alpha = 0.08 + depth * 0.55;
      const glow = depth > 0.55 ? 0.35 : 0;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 122, 255, ${alpha})`;
      ctx.fill();

      if (glow > 0) {
        ctx.beginPath();
        ctx.arc(x, y, size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 140, 255, ${glow * 0.12})`;
        ctx.fill();
      }
    }
  }
}

/** Bottom-third perspective dot terrain — mockup particle mesh */
export function HeroParticleTerrain({ animated = false, className }: HeroParticleTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const render = () => {
      drawTerrain(ctx, width, height, timeRef.current);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const draw = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      timeRef.current += 0.008;
      render();
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();

    if (animated) {
      draw();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animated]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
