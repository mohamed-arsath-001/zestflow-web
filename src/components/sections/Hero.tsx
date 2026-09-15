import { useAuditModal } from "../../context/AuditModalContext";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";
import { ScrollCounter } from "../ui/ScrollCounter";
import DitherReveal from "../ui/DitherReveal";

export default function Hero() {
  const { openAuditModal } = useAuditModal();
  return (
    <section
      id="spark"
      className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-between items-center text-center overflow-hidden bg-[#0B0B0C]"
    >
      {/* 0. Dither Reveal Background Canvas Layer */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <DitherReveal
          image={{ src: "/images/hands-reaching.jpg" }}
          fit="cover"
          focusY={48}
          ditherStyle="bayer8"
          dotSize={5}
          revealRadius={260}
          revealSoftness={50}
          wave={true}
          waveSpeed={45}
          waveDensity={25}
        />
        {/* Soft edge vignette to integrate seamlessly with the graphite atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/70 via-transparent to-[#0B0B0C] pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0C]/30 to-[#0B0B0C]/80 pointer-events-none" />
      </div>

      {/* Foreground Content (pointer-events-none to track cursor freely over copy) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-4 flex flex-col items-center justify-center flex-1 pointer-events-none">
        {/* 1. Single Restrained Industrial Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B]/80 backdrop-blur-md border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B]" />
          <span className="font-semibold text-[#F4F1EA] tracking-wider uppercase text-[11px]">
            PRODUCTION-GRADE AI INFRASTRUCTURE
          </span>
          <span className="text-[#4B5563]">&bull;</span>
          <span className="text-[11px] text-[#6B7280]">CALIBRATED FOR INDUSTRIAL LOGISTICS</span>
        </div>

        {/* 2. Oversized Plus Jakarta Sans Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Build <span className="font-serif italic font-normal text-amber-500 sm:text-[#E8663D] text-[1.06em] inline-block px-1">Autonomous</span> Intelligence That Never Fails
        </h1>

        {/* 3. Engineering Precision Subheadline */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#D1CFC7] leading-relaxed font-sans drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          We architect, fine-tune, and deploy deterministic LangGraph & Python agent workflows specifically for Manufacturing, Logistics, and Freight operations.
        </p>

        {/* 4. Single Restrained Primary Call to Action (pointer-events-auto re-enabled) */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pointer-events-auto">
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-sm shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_16px_0_rgba(232,102,61,0.4)] transition-all duration-200 active:scale-98"
          >
            <span>Schedule Operations Audit</span>
            <IconArrowRight size={16} />
          </Link>
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#18181B]/90 backdrop-blur-sm hover:bg-[#222328] text-[#F4F1EA] border border-white/[0.12] hover:border-white/[0.2] font-semibold text-sm transition-all duration-200"
          >
            <span>View Workflow Specs</span>
          </Link>
        </div>

        {/* Verification SLA tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs text-[#9A9892] font-mono">
          <span className="flex items-center gap-1.5 bg-[#111113]/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/[0.04]">
            <IconCheck size={14} className="text-[#5B7B5B]" />
            Zero Vendor Lock-in
          </span>
          <span className="flex items-center gap-1.5 bg-[#111113]/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/[0.04]">
            <IconCheck size={14} className="text-[#5B7B5B]" />
            14-Day Production SLA
          </span>
          <span className="flex items-center gap-1.5 bg-[#111113]/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/[0.04]">
            <IconCheck size={14} className="text-[#5B7B5B]" />
            Dedicated Cloud VPC
          </span>
        </div>

        {/* 5. Chapter 02 // The Proof: Asymmetric Editorial Metrics Strip */}
        <div
          id="metrics"
          className="w-full mt-8 sm:mt-10 pt-6 pb-6 border-y border-white/[0.08] text-left pointer-events-auto bg-[#0B0B0C]/40 backdrop-blur-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Anchor: $14.8M+ (Unbordered, Dominant Scale) */}
            <div className="lg:col-span-5 relative pr-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-2 border border-emerald-500/20">
                Core Engineering Standard
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
                100% Deterministic
              </div>
              <div className="text-sm font-semibold text-emerald-400 mt-2 font-mono">
                Zero-Drift Workflow Routing
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-sm">
                Every state transition is checked against strict Pydantic schemas. Unhandled exceptions trigger automated fallback loops.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:pl-8 lg:border-l border-white/[0.08]">
              <div className="p-3.5 rounded-xl bg-[#18181B]/70 backdrop-blur-md border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B]" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Verification
                  </span>
                </div>
                <div className="text-2xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                  Pydantic v2
                </div>
                <div className="text-xs font-medium text-[#F4F1EA] mt-1">
                  Byte-Level Validation
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                  Schema boundary check
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181B]/70 backdrop-blur-md border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    State Commit
                  </span>
                </div>
                <div className="text-2xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                  PostgreSQL
                </div>
                <div className="text-xs font-medium text-[#F4F1EA] mt-1">
                  WAL Persistence
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                  Two-phase commit
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181B]/70 backdrop-blur-md border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B]" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Deployment
                  </span>
                </div>
                <div className="text-2xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                  On-Premises
                </div>
                <div className="text-xs font-medium text-[#F4F1EA] mt-1">
                  Local VPC Perimeter
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                  Zero data retention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
