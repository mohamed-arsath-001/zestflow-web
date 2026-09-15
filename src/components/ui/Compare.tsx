import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";

interface CompareProps {
  firstContent?: React.ReactNode;
  secondContent?: React.ReactNode;
  firstLabel?: string;
  secondLabel?: string;
  className?: string;
  initialPosition?: number;
}

export function Compare({
  firstContent,
  secondContent,
  firstLabel = "BEFORE: BRITTLE WEBHOOK SCRIPTS",
  secondLabel = "AFTER: ZESTFLOW DETERMINISTIC SWARM",
  className = "",
  initialPosition = 50,
}: CompareProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, pct)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("touchmove", handleGlobalTouchMove);
      window.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[520px] sm:h-[560px] md:h-[580px] overflow-hidden rounded-2xl select-none border border-white/[0.08] bg-[#111113] shadow-2xl shadow-black/60 cursor-col-resize",
        className
      )}
      onClick={(e) => updatePosition(e.clientX)}
    >
      {/* Right / After Layer (Underneath full bleed) */}
      <div className="absolute inset-0 w-full h-full bg-[#111613] z-0 overflow-hidden">
        {secondContent}
      </div>

      {/* Left / Before Layer (Clipped cleanly via hardware clip-path) */}
      <div
        className="absolute inset-0 w-full h-full bg-[#181214] z-10 overflow-hidden will-change-[clip-path]"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        {firstContent}
      </div>

      {/* Draggable Divider Line & Handle */}
      <div
        className="absolute inset-y-0 z-30 pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="h-full w-[2px] bg-[#E8663D] shadow-[0_0_12px_rgba(232,102,61,0.8)]" />

        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#18181B] border-2 border-[#E8663D] shadow-[0_0_20px_rgba(232,102,61,0.5)] flex items-center justify-center cursor-col-resize text-[#E8663D] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Drag comparison slider"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Floating Category Indicator Badges */}
      {firstLabel && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141214]/90 backdrop-blur-md border border-red-500/30 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-red-300">
            {firstLabel}
          </span>
        </div>
      )}

      {secondLabel && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121A14]/90 backdrop-blur-md border border-emerald-500/30 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-emerald-300">
            {secondLabel}
          </span>
        </div>
      )}
    </div>
  );
}
