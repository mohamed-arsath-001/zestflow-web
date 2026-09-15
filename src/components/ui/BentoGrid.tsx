import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-2xl group/bento transition duration-200 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden",
        "bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30",
        "shadow-lg shadow-black/20",
        className
      )}
    >
      {/* Top Header & Copy */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="text-[#E8663D] text-lg">{icon}</div>
          {badge && (
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#111113] text-[#9A9892] border border-white/[0.08] font-mono font-semibold tracking-wide">
              {badge}
            </span>
          )}
        </div>

        <div className="font-display font-bold text-[#F4F1EA] mb-2 text-lg sm:text-xl tracking-tight">
          {title}
        </div>

        <div className="font-normal text-[#9A9892] text-xs sm:text-sm leading-relaxed mb-6">
          {description}
        </div>
      </div>

      {/* Feature Visual Graphic */}
      <div className="mt-auto">
        {header}
      </div>
    </motion.div>
  );
};
