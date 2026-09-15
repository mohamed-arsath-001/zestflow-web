import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  baseHue?: number;
}

export function Vortex({
  children,
  className = "",
  containerClassName = "",
  particleCount = 200,
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // High performance particles flowing in an orbital vortex field
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.5 + 0.5,
      // Amber and warm ivory highlights
      color:
        Math.random() > 0.6
          ? "rgba(232, 102, 61, 0.45)"
          : Math.random() > 0.3
          ? "rgba(244, 241, 234, 0.25)"
          : "rgba(91, 123, 91, 0.3)",
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.2,
      distance: Math.random() * (Math.min(width, height) / 2.2),
    }));

    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.fillStyle = "rgba(24, 24, 27, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * 0.008;

        p.x = cx + Math.cos(p.angle) * p.distance + Math.sin(p.angle * 2) * 15;
        p.y = cy + Math.sin(p.angle) * (p.distance * 0.55) + Math.cos(p.angle * 2) * 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [particleCount]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-70"
      />
      {/* Ambient center amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-[#E8663D]/[0.12] blur-3xl pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}