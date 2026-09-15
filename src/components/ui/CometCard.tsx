import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  cometColor?: string;
}

export function CometCard({
  children,
  className,
  containerClassName,
  cometColor = "#E8663D",
}: CometCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D tilt
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={cn("relative [perspective:1000px] inline-block", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-2xl bg-[#141416] border border-white/[0.08] overflow-hidden p-6 shadow-xl transition-shadow duration-300",
          isHovered && "shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(232,102,61,0.2)]",
          className
        )}
      >
        {/* Animated Comet Border Beam */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden p-[1px]">
          <div
            className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 320deg, ${cometColor} 345deg, #FFF 360deg)`,
            }}
          />
          {/* Inner masking to reveal only the perimeter border stroke */}
          <div className="absolute inset-[1.5px] rounded-[15px] bg-[#141416]" />
        </div>

        {/* Mouse radial glare follow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]: any[]) =>
                `radial-gradient(400px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(232, 102, 61, 0.12), transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content elevated with parallax depth */}
        <div
          className="relative z-10"
          style={{
            transform: "translateZ(24px)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

interface TestimonialData {
  quote: string;
  name: string;
  designation: string;
  src: string;
  impact: string;
  metric: string;
}

export function CometTestimonialsGrid({ testimonials }: { testimonials: TestimonialData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
      {testimonials.map((t, idx) => (
        <CometCard key={idx} className="h-full flex flex-col justify-between">
          <div>
            {/* Top row: Metric badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#1F2024] border border-white/[0.08] text-[11px] font-mono text-[#F27A52] font-semibold">
                {t.impact}
              </span>
              <span className="text-xs font-mono text-[#5B7B5B] font-bold">
                {t.metric}
              </span>
            </div>

            {/* Executive Quote */}
            <p className="text-sm sm:text-base text-[#DCD8D0] leading-relaxed font-normal mb-6">
              "{t.quote}"
            </p>
          </div>

          {/* Author profile */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
            <img
              src={t.src}
              alt={t.name}
              className="w-11 h-11 rounded-full object-cover border border-[#E8663D]/40"
            />
            <div>
              <h4 className="font-display font-bold text-sm text-[#F4F1EA]">
                {t.name}
              </h4>
              <p className="text-xs text-[#9A9892] font-mono">
                {t.designation}
              </p>
            </div>
          </div>
        </CometCard>
      ))}
    </div>
  );
}
