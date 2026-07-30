"use client";

import { useEffect, useRef } from "react";

/** Layer 7 — perspective particle mesh floor (royal + silver, static) */
export function Layer07ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cols = width < 768 ? 44 : 68;
      const rows = width < 768 ? 26 : 34;
      const horizonY = height * 0.4;
      const floorY = height * 0.98;

      for (let row = 0; row < rows; row++) {
        const depth = row / (rows - 1);
        const perspective = 0.14 + depth * 0.86;
        const yBase = horizonY + (floorY - horizonY) * depth * depth;

        for (let col = 0; col < cols; col++) {
          const xNorm = (col / (cols - 1)) * 2 - 1;
          const x = width * 0.5 + xNorm * width * 0.52 * perspective;
          const wave =
            Math.sin(col * 0.2) * 7 * perspective +
            Math.cos(row * 0.32) * 5 * perspective;
          const y = yBase + wave;
          const size = (0.5 + depth * 1.6) * (width < 768 ? 0.85 : 1);
          const alpha = 0.06 + depth * 0.48;
          const isSilver = (col + row) % 5 === 0;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = isSilver
            ? `rgba(188, 196, 206, ${alpha * 0.85})`
            : `rgba(69, 89, 128, ${alpha})`;
          ctx.fill();

          if (depth > 0.6) {
            ctx.beginPath();
            ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(58, 106, 173, ${0.04 + depth * 0.06})`;
            ctx.fill();
          }
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-x-0 bottom-0 z-[4] h-[52%] w-full opacity-85 mix-blend-screen"
      aria-hidden
    />
  );
}
