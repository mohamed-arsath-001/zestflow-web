import { LampContainer } from "../ui/LampEffect";
import { CardSpotlight } from "../ui/CardSpotlight";
import {
  IconGitMerge,
  IconDatabase,
  IconArrowsSplit,
  IconShieldLock,
  IconTerminal2,
  IconActivity,
  IconCheck,
} from "@tabler/icons-react";

export default function Features() {
  return (
    <section className="relative z-10 pt-12 pb-28 overflow-hidden">
      {/* 1. Linear-Grade Lamp Effect Overhead */}
      <LampContainer className="mb-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
          <IconTerminal2 size={13} className="text-[#F27A52]" />
          <span>CHAPTER 04 // CORE ARCHITECTURAL PILLARS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#F4F1EA] tracking-tight max-w-3xl">
          Unbreakable <span className="font-serif italic font-normal text-[#E8663D]">Automation</span>
        </h2>
        <p className="mt-4 text-[#9A9892] text-sm sm:text-base max-w-xl leading-relaxed">
          ZestFlow eliminates fragile prompt chaining. We engineer stateful multi-agent systems with mathematically sound verification loops and private VPC execution.
        </p>
      </LampContainer>

      {/* 2. Elevated Bento Grid with Generous Spacing (gap-8) and Organic Radial Spotlight Physics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TILE 1: Lead Architectural Feature (Large 8-col tile, p-10 to p-12) */}
          <CardSpotlight
            color="rgba(16, 185, 129, 0.18)"
            className="lg:col-span-8 p-8 sm:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5 text-[#E8663D]">
                  <IconGitMerge size={22} />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F4F1EA]">
                    CORE ORCHESTRATION ENGINE
                  </span>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-md bg-[#111113] text-[#9A9892] border border-white/[0.08] font-mono font-semibold tracking-wider">
                  LangGraph v0.2
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4F1EA] mb-3 tracking-tight">
                Autonomous Multi-Agent State Machines
              </h3>
              <p className="text-[#9A9892] text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                Replace fragile prompt chains with mathematically verified LangGraph state transitions. Every output is bound to deterministic schemas with zero unhandled drift.
              </p>
            </div>

            {/* High-End Native macOS Terminal Window for DAG Pipeline Topology */}
            <div className="w-full rounded-2xl bg-[#0E0E10] border border-white/[0.12] overflow-hidden shadow-2xl shadow-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] font-mono text-xs">
              {/* macOS Window Titlebar */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#141416]/95 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_6px_rgba(255,95,86,0.3)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_6px_rgba(255,189,46,0.3)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_6px_rgba(39,201,63,0.3)]" />
                  <span className="text-neutral-400 text-xs ml-2 font-mono">supervisor_dag.py</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  100% DETERMINISTIC EXIT GATE
                </span>
              </div>

              {/* 3-Stage Pipeline Trace Topology */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] bg-[#0E0E10]/95">
                <div className="p-4 rounded-xl bg-[#141416] border border-white/[0.08] shadow-sm">
                  <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">Node 01 // Input</div>
                  <div className="font-bold text-[#F4F1EA] text-xs mt-1 font-display">Inbound Telemetry</div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    HMAC Verified
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181514] border border-[#F27A52]/40 shadow-[0_0_12px_rgba(242,122,82,0.15)]">
                  <div className="text-[#F27A52] text-[10px] font-mono uppercase tracking-widest font-bold">Node 02 // Swarm</div>
                  <div className="font-bold text-[#F4F1EA] text-xs mt-1 font-display">Critic Consensus</div>
                  <div className="text-[10px] text-[#F27A52] mt-2 font-mono font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F27A52] animate-pulse" />
                    Quorum: 0.998
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141416] border border-white/[0.08] shadow-sm">
                  <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">Node 03 // Commit</div>
                  <div className="font-bold text-[#F4F1EA] text-xs mt-1 font-display">Pydantic Verifier</div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Atomic State Valid
                  </div>
                </div>
              </div>
            </div>
          </CardSpotlight>

          {/* TILE 2: Vector Search Benchmark (4-col tile, p-8 to p-10) */}
          <CardSpotlight
            color="rgba(16, 185, 129, 0.18)"
            className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#E8663D]">
                  <IconDatabase size={20} />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F4F1EA]">
                    INDEXING & RETRIEVAL
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#111113] text-neutral-400 border border-white/[0.08] font-mono">
                  HNSW
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#F4F1EA] mb-2 tracking-tight">
                Sub-Second Vector Search
              </h3>
              <p className="text-[#9A9892] text-xs sm:text-sm leading-relaxed mb-8">
                Hybrid dense-sparse retrieval over pgvector clusters. 4.2ms median query latency with proprietary neural rerankers.
              </p>
            </div>

            {/* Metrics Gauge with macOS Frame styling */}
            <div className="p-5 rounded-xl bg-[#111113] border border-white/[0.08] font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex justify-between text-xs text-neutral-400 mb-2">
                <span className="uppercase tracking-widest text-[10px]">MEDIAN LATENCY</span>
                <span className="text-[#F27A52] font-bold text-sm">4.2ms</span>
              </div>
              <div className="w-full bg-[#222328] h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-[#E8663D] w-[72%] h-full shadow-[0_0_8px_#E8663D]" />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Cosine Similarity</span>
                <span className="text-[#F4F1EA] font-semibold">0.984</span>
              </div>
            </div>
          </CardSpotlight>

          {/* TILE 3: Self-Healing Fallbacks (6-col tile, p-8 to p-10) */}
          <CardSpotlight
            color="rgba(16, 185, 129, 0.18)"
            className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#E8663D]">
                  <IconArrowsSplit size={20} />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F4F1EA]">
                    HIGH AVAILABILITY
                  </span>
                </div>
                <span className="text-[11px] px-3 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  Zero Downtime
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F1EA] mb-2 tracking-tight">
                Self-Healing Dynamic Fallbacks
              </h3>
              <p className="text-[#9A9892] text-xs sm:text-sm leading-relaxed mb-8">
                When an API fails, the swarm doesn't panic. It instantly reroutes logic to local fine-tuned models with zero latency spikes or dropped payloads.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#111113] border border-white/[0.08] font-mono text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Primary API Event</span>
                <span className="px-2 py-0.5 rounded bg-[#E8663D]/10 text-[#F27A52] font-semibold text-[10px]">
                  429 Rate Limit Trip
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-2 pt-1 font-semibold">
                <IconCheck size={14} className="text-emerald-500" />
                <span>Auto-Rerouted to on-prem vLLM (latency +8ms SLA intact)</span>
              </div>
            </div>
          </CardSpotlight>

          {/* TILE 4: Local VPC & On-Premises Deployment (6-col tile, p-8 to p-10) */}
          <CardSpotlight
            color="rgba(16, 185, 129, 0.18)"
            className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#E8663D]">
                  <IconShieldLock size={20} />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F4F1EA]">
                    DATA PERIMETER & GOVERNANCE
                  </span>
                </div>
                <span className="text-[11px] px-3 py-0.5 rounded bg-[#111113] text-neutral-400 border border-white/[0.08] font-mono">
                  Local VPC / On-Prem
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F1EA] mb-2 tracking-tight">
                Local VPC & On-Premises Deployment
              </h3>
              <p className="text-[#9A9892] text-xs sm:text-sm leading-relaxed mb-8">
                Your proprietary bills of lading, pricing formulas, and supplier contracts never leave your firewall. We deploy state machines within your private perimeter with zero external data retention.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-[#111113] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase">FIREWALL</div>
                <div className="text-xs font-bold text-[#F4F1EA] mt-1">100% Isolated</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111113] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase">RETENTION</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">0 Hours</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111113] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase">DB COMMITS</div>
                <div className="text-xs font-bold text-[#F4F1EA] mt-1">PostgreSQL</div>
              </div>
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
