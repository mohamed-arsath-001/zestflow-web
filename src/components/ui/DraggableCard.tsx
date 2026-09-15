import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  IconAlertTriangle,
  IconCheck,
  IconRefresh,
  IconHandMove,
  IconFlame,
  IconShieldCheck,
  IconBug,
  IconCpu,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";

export interface DraggableCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCardContainer({ children, className }: DraggableCardContainerProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-white/[0.08] bg-[#111113] p-4 sm:p-8 overflow-hidden shadow-2xl shadow-black/60",
        className
      )}
    >
      {children}
    </div>
  );
}


export interface DraggableCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCardBody({ children, className }: DraggableCardBodyProps) {
  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.18}
      whileDrag={{
        scale: 1.05,
        rotate: 2,
        zIndex: 40,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(232, 102, 61, 0.2)",
      }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "cursor-grab active:cursor-grabbing rounded-2xl bg-[#141416] border border-white/[0.08] shadow-xl transition-shadow select-none",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function DraggableComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
          <IconHandMove size={13} className="text-[#F27A52]" />
          <span>TACTILE EXPERIMENT // SYSTEM RESILIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
          Fragile Prompt Chains vs. Deterministic Swarms
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#9A9892] leading-relaxed">
          Grab, toss, and inspect both architectures. Notice how naïve linear LLM wrappers shatter under edge cases, while ZestFlow's consensus engine holds structural integrity.
        </p>
      </div>

      {/* Tactile Bounded Arena */}
      <div
        ref={containerRef}
        key={resetKey}
        className="relative min-h-[500px] sm:min-h-[540px] w-full rounded-3xl border border-white/[0.08] bg-[#0E0E10] p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Background Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#EF4444]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#E8663D]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header HUD & Reset Controls */}
        <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-white/[0.06] text-xs font-mono text-[#9A9892]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8663D] animate-ping" />
            <span className="text-[#F4F1EA] font-semibold">INTERACTIVE BOUNDED PHYSICS</span>
            <span className="hidden sm:inline text-[#6B7280]">{"// DRAG & FLING CARDS"}</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1F2024] hover:bg-[#2A2B30] text-[#F4F1EA] border border-white/[0.08] text-xs transition-colors cursor-pointer"
          >
            <IconRefresh size={13} className="text-[#F27A52]" />
            <span>Reset Positions</span>
          </button>
        </div>

        {/* Cards Layout inside Bounds */}
        <div className="relative w-full h-[430px] sm:h-[460px] pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
          
          {/* Card A: The Brittle Linear Chain */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.18}
            dragMomentum={true}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 1.05,
              rotate: -3,
              zIndex: 30,
              boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)",
            }}
            initial={{ x: -10, y: 0 }}
            className="w-full sm:w-[360px] p-5 sm:p-6 rounded-2xl bg-[#141214] border border-[#EF4444]/40 cursor-grab active:cursor-grabbing select-none shadow-xl relative z-10"
          >
            {/* Card A Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#3A1414] border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
                  <IconFlame size={16} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#F4F1EA]">The Brittle Wrapper</h4>
                  <p className="text-[10px] font-mono text-[#EF4444]">NAÏVE PROMPT CHAIN</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#3A1414] text-[#EF4444] text-[10px] font-mono font-bold">
                FAILING
              </span>
            </div>

            {/* Card A Telemetry Breakdown */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#1B1616] border border-[#EF4444]/20 flex items-start gap-2">
                <IconBug size={14} className="text-[#EF4444] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#EF4444] font-semibold">Schema Drift (+18.4%)</span>
                  <p className="text-[11px] text-[#9A9892] mt-0.5 font-sans">
                    Unstructured JSON output broke production PostgreSQL serializer.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#1B1616] border border-[#EF4444]/20 flex items-start gap-2">
                <IconAlertTriangle size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F59E0B] font-semibold">Silent Hallucination</span>
                  <p className="text-[11px] text-[#9A9892] mt-0.5 font-sans">
                    Single model approved erroneous $48,000 purchase order autonomously.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#787670]">
                <span>Failure Recovery:</span>
                <span className="text-[#EF4444] font-bold">MANUAL INTERVENTION</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-[#6B7280]">
                [ DRAG TO TOSS // FEELS UNSTABLE ]
              </span>
            </div>
          </motion.div>

          {/* Card B: The ZestFlow Deterministic Swarm */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.18}
            dragMomentum={true}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 1.05,
              rotate: 2,
              zIndex: 30,
              boxShadow: "0 25px 50px -12px rgba(232, 102, 61, 0.35)",
            }}
            initial={{ x: 10, y: 0 }}
            className="w-full sm:w-[380px] p-5 sm:p-6 rounded-2xl bg-[#18181C] border border-[#E8663D]/60 cursor-grab active:cursor-grabbing select-none shadow-2xl relative z-10"
          >
            {/* Ambient signal glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8663D]/10 via-transparent to-transparent rounded-2xl pointer-events-none" />

            {/* Card B Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08] relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2D1B15] border border-[#E8663D]/50 flex items-center justify-center text-[#E8663D]">
                  <IconCpu size={16} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#F4F1EA]">ZestFlow Multi-Agent Swarm</h4>
                  <p className="text-[10px] font-mono text-[#F27A52]">RADICAL DETERMINISM</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1A2E20] border border-[#2E5C38] text-[#7BD492] text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
                VERIFIED
              </span>
            </div>

            {/* Card B Telemetry Breakdown */}
            <div className="space-y-2.5 text-xs font-mono relative z-10">
              <div className="p-2.5 rounded-lg bg-[#141416] border border-white/[0.08] flex items-start gap-2">
                <IconShieldCheck size={14} className="text-[#5B7B5B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F4F1EA] font-semibold">3-Model Critic Quorum (99.98%)</span>
                  <p className="text-[11px] text-[#9A9892] mt-0.5 font-sans">
                    Multi-LLM adversarial cross-verification rejects any outlier draft.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#141416] border border-white/[0.08] flex items-start gap-2">
                <IconCheck size={14} className="text-[#E8663D] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F4F1EA] font-semibold">Pydantic v2 Strict Gate (0.00% Drift)</span>
                  <p className="text-[11px] text-[#9A9892] mt-0.5 font-sans">
                    Byte-level typed payload validation before database dispatch.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#9A9892]">
                <span>Two-Phase Commit SLA:</span>
                <span className="text-[#F27A52] font-bold">42ms AIR-GAPPED</span>
              </div>
            </div>

            <div className="mt-4 text-center relative z-10">
              <span className="text-[10px] font-mono text-[#E8663D]">
                [ DRAG TO TOSS // STABLE SPRING PHYSICS ]
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
