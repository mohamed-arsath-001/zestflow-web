import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface TimelineEntry {
  title: string;
  duration: string;
  phase: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            {/* Left Sticky Phase Indicator */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-36 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-9 absolute left-3 md:left-3 w-9 rounded-full bg-[#111113] border border-white/[0.12] flex items-center justify-center shadow-lg">
                <div className="h-3 w-3 rounded-full bg-[#E8663D] shadow-[0_0_8px_rgba(232,102,61,0.8)]" />
              </div>
              <div className="hidden md:block md:pl-16">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#18181B] text-[#F27A52] border border-[#E8663D]/30 font-bold tracking-wider uppercase">
                  {item.phase}
                </span>
                <div className="text-xl font-display font-extrabold text-[#F4F1EA] mt-2 tracking-tight">
                  {item.title}
                </div>
                <div className="text-xs font-mono text-[#9A9892] mt-1">
                  {item.duration}
                </div>
              </div>
            </div>

            {/* Right Milestone Content */}
            <div className="relative pl-14 pr-4 md:pl-4 w-full">
              <div className="md:hidden block mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-[#F27A52] font-bold">
                  {item.phase} &bull; {item.duration}
                </span>
                <div className="text-lg font-bold text-[#F4F1EA] mt-1.5">
                  {item.title}
                </div>
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* The Scroll-Linked Laser Beam Axis */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-7 left-7 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#E8663D] via-[#F27A52] to-transparent rounded-full shadow-[0_0_12px_rgba(232,102,61,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}