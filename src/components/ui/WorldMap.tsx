import { useRef } from "react";
import { motion } from "framer-motion";

interface MapPoint { lat: number; lng: number; label?: string; }
interface MapConnection { start: MapPoint; end: MapPoint; }

function project(lat: number, lng: number, width: number, height: number) {
  return { x: ((lng + 180) / 360) * width, y: ((90 - lat) / 180) * height };
}
function createCurvedPath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - Math.abs(x1 - x2) * 0.25;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
}

export default function WorldMap({
  dots = [
    { start: { lat: 37.77, lng: -122.42 }, end: { lat: 51.51, lng: -0.13 } },
    { start: { lat: 51.51, lng: -0.13 }, end: { lat: 35.68, lng: 139.65 } },
    { start: { lat: 40.71, lng: -74.01 }, end: { lat: 1.35, lng: 103.82 } },
    { start: { lat: 47.38, lng: 8.54 }, end: { lat: 37.77, lng: -122.42 } },
  ],
}: { dots?: MapConnection[] }) {
  const width = 800, height = 400;

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-6">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-5xl h-auto pointer-events-none select-none">
        <defs>
          <linearGradient id="mapLineGradAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8663D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E8663D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C84E29" stopOpacity="0.4" />
          </linearGradient>
          <filter id="softGlowAmber">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="rgba(244,241,234,0.04)">
          {Array.from({ length: 40 }).map((_, r) =>
            Array.from({ length: 80 }).map((_, c) => {
              const x = c * 10 + 5, y = r * 10 + 5;
              const inBounds = (x > 120 && x < 320 && y > 80 && y < 240) || (x > 380 && x < 540 && y > 60 && y < 220) || (x > 520 && x < 760 && y > 80 && y < 280);
              if (!inBounds && Math.random() > 0.08) return null;
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={x}
                  cy={y}
                  r={inBounds ? "1.4" : "0.9"}
                  fill={inBounds ? "rgba(244,241,234,0.14)" : "rgba(244,241,234,0.04)"}
                />
              );
            })
          )}
        </g>

        {dots.map((dot, idx) => {
          const p1 = project(dot.start.lat, dot.start.lng, width, height);
          const p2 = project(dot.end.lat, dot.end.lng, width, height);
          const pathD = createCurvedPath(p1.x, p1.y, p2.x, p2.y);
          return (
            <g key={`path-${idx}`}>
              <path d={pathD} fill="none" stroke="rgba(232,102,61,0.12)" strokeWidth="1.5" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#mapLineGradAmber)"
                strokeWidth="1.5"
                filter="url(#softGlowAmber)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.6], pathOffset: [0, 0, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.8 }}
              />
            </g>
          );
        })}

        {dots.map((dot, idx) => {
          const p1 = project(dot.start.lat, dot.start.lng, width, height);
          const p2 = project(dot.end.lat, dot.end.lng, width, height);
          return (
            <g key={`nodes-${idx}`}>
              <circle cx={p1.x} cy={p1.y} r="3" fill="#E8663D" />
              <motion.circle
                cx={p1.x}
                cy={p1.y}
                r="7"
                fill="none"
                stroke="#E8663D"
                strokeWidth="1.5"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <circle cx={p2.x} cy={p2.y} r="3" fill="#5B7B5B" />
              <motion.circle
                cx={p2.x}
                cy={p2.y}
                r="7"
                fill="none"
                stroke="#5B7B5B"
                strokeWidth="1.5"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
