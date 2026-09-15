import React, { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
}

export function CardSpotlight({
  children,
  radius = 320,
  color = "rgba(232, 102, 61, 0.14)", // signal amber default spotlight
  className = "",
  ...props
}: CardSpotlightProps) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBackground = useMotionTemplate`radial-gradient(
    ${radius}px circle at ${mouseX}px ${mouseY}px,
    ${color},
    transparent 80%
  )`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
      className={`group/spotlight relative overflow-hidden rounded-2xl bg-[#18181B] border border-white/[0.08] transition-all duration-300 hover:border-white/[0.18] ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-10"
        style={{
          background: spotlightBackground,
        }}
      />
      {/* Content Container */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}