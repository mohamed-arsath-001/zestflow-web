import { Compare } from "../components/ui/Compare";
import { Carousel, Card } from "../components/ui/AppleCardsCarousel";
import { Timeline } from "../components/ui/Timeline";
import {
  IconRoute,
  IconAlertTriangle,
  IconShieldCheck,
  IconCheck,
} from "@tabler/icons-react";

// =========================================================================
// The "Before" Panel: Fragile Legacy Pipelines (Brittle Webhook Scripts)
// Visual structure: Broken grid, overlapping tilted cards, dark noise, red dashed borders, error logs
// =========================================================================
function BeforeFragileDiagram() {
  return (
    <div className="w-full h-full bg-[#120D10] p-6 sm:p-10 font-sans text-xs flex flex-col justify-between relative overflow-hidden select-none">
      {/* Heavily textured dark noise background with jagged error grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44440f_1px,transparent_1px),linear-gradient(to_bottom,#ef44440f_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-70" />
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-red-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-red-500/25 pb-4 gap-2">
        <div>
          <div className="font-mono text-[10px] text-red-400 tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            LEGACY ARCHITECTURE // FRAGILE PIPELINES
          </div>
          <h4 className="font-display font-bold text-lg text-[#F4F1EA] mt-1 tracking-tight">
            Fragile <span className="font-serif italic font-normal text-red-300">Legacy</span> Pipelines
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-red-950/80 border border-dashed border-red-500/50 text-red-300 font-mono text-[11px] tracking-wider uppercase font-semibold">
          STATUS: 504 GATEWAY TIMEOUT
        </div>
      </div>

      {/* Broken Grid: Fragmented, Misaligned, Overlapping Zapier/Make Cards */}
      <div className="relative z-10 py-6 my-auto">
        {/* Scattered SVG Broken Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-30" viewBox="0 0 800 240">
          <path d="M 120 70 Q 240 180 340 90 T 580 150" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="6,4" />
          <path d="M 340 120 C 400 210, 480 30, 600 110" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="3,3" />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Card 1: Unpredictable Downtime / Inbound Webhook (Tilted Left) */}
          <div className="relative p-5 rounded-xl bg-[#1C1215]/95 backdrop-blur-sm border border-dashed border-red-500/30 shadow-2xl transform sm:-rotate-2 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-red-400/80 uppercase mb-2">
              <span>HOOK // STAGE 01</span>
              <span className="px-1.5 py-0.5 rounded bg-red-900/60 border border-red-500/40 text-red-300 font-bold">504 TIMEOUT</span>
            </div>
            <h5 className="font-display font-semibold text-sm text-[#F4F1EA]">Unpredictable Downtime</h5>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Zapier HTTP webhook dropped after 30s gateway timeout. Zero retry backoff.
            </p>
            <div className="mt-3 p-2 rounded bg-black/50 border border-red-500/30 font-mono text-[10px] text-red-300 tracking-widest">
              &gt; [504_GATEWAY_TIMEOUT: payload_dropped]
            </div>
          </div>

          {/* Card 2: Silent Hallucinations / Naive LLM Wrapper (Tilted Right, Overlapping) */}
          <div className="relative p-5 rounded-xl bg-[#1C1215]/95 backdrop-blur-sm border border-dashed border-red-500/30 shadow-2xl transform sm:rotate-2 sm:-translate-x-2 sm:translate-y-2 hover:rotate-0 transition-transform z-10">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-red-400/80 uppercase mb-2">
              <span>CALL // STAGE 02</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-900/60 border border-amber-500/40 text-amber-300 font-bold">429 RATE LIMIT</span>
            </div>
            <h5 className="font-display font-semibold text-sm text-[#F4F1EA]">Silent Hallucinations</h5>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Uncontrolled model drift. LLM hallucinated non-existent JSON keys into customer records.
            </p>
            <div className="mt-3 p-2 rounded bg-black/50 border border-red-500/30 font-mono text-[10px] text-red-300 tracking-widest">
              &gt; [SCHEMA_DRIFT_EXC: key_undefined]
            </div>
          </div>

          {/* Card 3: Corrupted Database / Direct Insert (Tilted & Stranded) */}
          <div className="relative p-5 rounded-xl bg-[#1C1215]/95 backdrop-blur-sm border border-dashed border-red-500/30 shadow-2xl transform sm:-rotate-1 sm:translate-y-1 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-red-400/80 uppercase mb-2">
              <span>WRITE // STAGE 03</span>
              <span className="px-1.5 py-0.5 rounded bg-red-900/60 border border-red-500/40 text-red-300 font-bold">CORRUPTED</span>
            </div>
            <h5 className="font-display font-semibold text-sm text-[#F4F1EA]">Corrupted State Writes</h5>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Uncommitted transaction deadlock. 14 production ERP rows orphaned without rollback.
            </p>
            <div className="mt-3 p-2 rounded bg-black/50 border border-red-500/30 font-mono text-[10px] text-red-300 tracking-widest">
              &gt; [DB_LOCK_HELD_142s_ABORT]
            </div>
          </div>
        </div>

        {/* Monospace Error Log Feed */}
        <div className="mt-5 p-3.5 rounded-lg bg-red-950/40 border border-dashed border-red-500/30 flex flex-wrap items-center justify-between gap-3 text-red-200">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide">
            <IconAlertTriangle size={15} className="text-red-400 shrink-0" />
            <span>CRITICAL: Pipeline halted — unhandled schema drift triggered cascade failure</span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-red-900/60 px-2 py-0.5 rounded border border-red-500/30 text-red-300">
            MANUAL RECOVERY REQ
          </span>
        </div>
      </div>

      {/* Editorial Telemetry Strip: Monospace uppercase tracking */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-red-500/20 text-neutral-400">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">Error Rate</span>
          <span className="font-mono font-bold text-sm text-red-400 tracking-tight">8.4% Unhandled</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">Recovery SLA</span>
          <span className="font-mono font-bold text-sm text-amber-400 tracking-tight">4.2 Hours Manual</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">Schema Guard</span>
          <span className="font-mono font-bold text-sm text-red-400 tracking-tight">0% (None)</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// The "After" Panel: ZestFlow Deterministic Swarm (LangGraph State Machine)
// Visual structure: Perfect order, horizontally chained nodes, animated glowing SVG, ultra-dark glassmorphism, pulsing emerald dots
// =========================================================================
function AfterDeterministicSwarm() {
  return (
    <div className="w-full h-full bg-[#080B09] p-6 sm:p-10 font-sans text-xs flex flex-col justify-between relative overflow-hidden select-none">
      {/* Pristine Glass & Emerald Radiance Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98118_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-emerald-500/20 pb-4 gap-2">
        <div>
          <div className="font-mono text-[10px] text-emerald-400 tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            LANGGRAPH STATE MACHINE // DETERMINISTIC AGENT SWARM
          </div>
          <h4 className="font-display font-bold text-lg text-[#F4F1EA] mt-1 tracking-tight">
            <span className="font-serif italic font-normal text-emerald-400">Deterministic</span> Agent Swarms
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ZERO-DRIFT EXECUTION
        </div>
      </div>

      {/* Perfect Order: Horizontally Chained Nodes with Glowing Animated SVG Pathways */}
      <div className="relative z-10 py-6 my-auto">
        {/* Connected Glowing Pathways SVG */}
        <div className="hidden sm:block absolute inset-0 top-1/2 -translate-y-1/2 w-full h-8 pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 20">
            <line x1="60" y1="10" x2="540" y2="10" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" className="opacity-30" />
            <line x1="60" y1="10" x2="540" y2="10" stroke="url(#emeraldPathGlow)" strokeWidth="2" />
            <defs>
              <linearGradient id="emeraldPathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#34D399" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Pristine Glassmorphic Nodes (bg-black/40 backdrop-blur-xl border-white/10) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
          {/* Node 1: Context Miner */}
          <div className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-2 font-bold">
              <span>NODE 01</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                4.2ms
              </span>
            </div>
            <h5 className="font-display font-bold text-sm text-[#F4F1EA]">Context Miner</h5>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed font-sans">
              Cryptographic HMAC verification & pgvector HNSW indexing.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Contract Verified
            </div>
          </div>

          {/* Node 2: Critic Swarm */}
          <div className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-2 font-bold">
              <span>NODE 02</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                99.98%
              </span>
            </div>
            <h5 className="font-display font-bold text-sm text-[#F4F1EA]">Critic Swarm</h5>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed font-sans">
              3-Model cyclical consensus quorum with hallucination rejection.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Quorum Unanimous
            </div>
          </div>

          {/* Node 3: Pydantic v2 Gate */}
          <div className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-2 font-bold">
              <span>NODE 03</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                0.00% DRIFT
              </span>
            </div>
            <h5 className="font-display font-bold text-sm text-[#F4F1EA]">Pydantic v2 Gate</h5>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed font-sans">
              Byte-level mathematical schema validation preventing hallucinations.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Schema Sealed
            </div>
          </div>

          {/* Node 4: State Dispatcher */}
          <div className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-2 font-bold">
              <span>NODE 04</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                38ms
              </span>
            </div>
            <h5 className="font-display font-bold text-sm text-[#F4F1EA]">State Dispatcher</h5>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed font-sans">
              Two-phase atomic commit to production ERP & Postgres WAL.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Atomic Commit
            </div>
          </div>
        </div>

        {/* Air-Gapped Clean Guarantee Banner */}
        <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-emerald-200 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide">
            <IconShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Air-gapped private VPC execution: Zero data retained in frontier model weights</span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-500/40 text-emerald-300">
            100% DETERMINISTIC
          </span>
        </div>
      </div>

      {/* Editorial Telemetry Strip: Monospace uppercase tracking */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-emerald-500/20 text-neutral-400">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">Error Rate</span>
          <span className="font-mono font-bold text-sm text-emerald-400 tracking-tight">0.00% Guaranteed</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">P99 Latency</span>
          <span className="font-mono font-bold text-sm text-emerald-300 tracking-tight">42ms End to End</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">Security Standard</span>
          <span className="font-mono font-bold text-sm text-emerald-400 tracking-tight">SOC2 Type II</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Carousel System Modules: High-End Native macOS Terminal Windows
// =========================================================================
const carouselItems = [
  {
    category: "INGESTION & RAG",
    title: "Semantic Ingestion & RAG",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    content: (
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        <p className="text-sm font-sans text-[#F4F1EA]">
          Deterministic hybrid search pairing dense OpenAI text-embedding-3-large vectors with sparse BM25 indexing in PostgreSQL.
        </p>
        <div className="rounded-xl bg-[#0E0E10] border border-white/[0.12] overflow-hidden shadow-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141416] border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="text-[11px] text-neutral-400 font-mono ml-2">semantic_ingest.ts</span>
          </div>
          <div className="p-4 space-y-2 font-mono text-xs text-neutral-300">
            <div className="text-[#F27A52] font-bold">Query Pipeline Execution:</div>
            <div>1. Inbound query canonicalized via regex token filter</div>
            <div>2. Dense embedding computed via on-prem vLLM (4.2ms)</div>
            <div>3. HNSW index scanned with ef_search=64</div>
            <div>4. Context payload sanitized against PII leakage patterns</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "ADVERSARIAL CONSENSUS",
    title: "Critic Swarm: Multi-LLM Quorum",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    content: (
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        <p className="text-sm font-sans text-[#F4F1EA]">
          Three distinct model architectures evaluate every generated state transition simultaneously before atomic write.
        </p>
        <div className="rounded-xl bg-[#0E0E10] border border-white/[0.12] overflow-hidden shadow-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141416] border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="text-[11px] text-neutral-400 font-mono ml-2">critic_quorum.py</span>
          </div>
          <div className="p-4 space-y-2 font-mono text-xs text-neutral-300">
            <div className="text-[#F27A52] font-bold">Quorum Specification:</div>
            <div>• Claude 3.5 Sonnet: Evaluates logic consistency</div>
            <div>• GPT-4o: Evaluates edge cases & formatting</div>
            <div>• DeepSeek-V3 (Fine-tuned): Validates domain math</div>
            <div>• Consensus Gate: Requires ≥ 98% mutual agreement</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "TYPE INTEGRITY",
    title: "Pydantic Verifier: Byte-Level Validation",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    content: (
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        <p className="text-sm font-sans text-[#F4F1EA]">
          Strict schema models catch hallucinatory mutations before they ever reach production databases.
        </p>
        <div className="rounded-xl bg-[#0E0E10] border border-white/[0.12] overflow-hidden shadow-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141416] border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="text-[11px] text-neutral-400 font-mono ml-2">schema_validator.py</span>
          </div>
          <div className="p-4 space-y-2 font-mono text-xs text-neutral-300">
            <div className="text-[#F27A52] font-bold">Verification Rules:</div>
            <div>• Strict Field Type Enforcement: Zero type coercion</div>
            <div>• Runtime Regex Validators on all string payloads</div>
            <div>• Mathematical Boundary Checks on currency & float values</div>
            <div>• Immediate circuit trip if schema drift &gt; 0.00%</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "TRANSACTION BUS",
    title: "State Dispatcher: Two-Phase Commit",
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    content: (
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        <p className="text-sm font-sans text-[#F4F1EA]">
          Distributed two-phase commits ensure enterprise databases remain perfectly synchronized with agent state.
        </p>
        <div className="rounded-xl bg-[#0E0E10] border border-white/[0.12] overflow-hidden shadow-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141416] border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="text-[11px] text-neutral-400 font-mono ml-2">two_phase_commit.py</span>
          </div>
          <div className="p-4 space-y-2 font-mono text-xs text-neutral-300">
            <div className="text-[#F27A52] font-bold">Commit Protocol:</div>
            <div>• Phase 1: Prepare transaction in isolated shadow table</div>
            <div>• Phase 2: Verify idempotency key & cryptographic hash</div>
            <div>• Phase 3: Atomic write to core PostgreSQL ledger</div>
            <div>• Mean SLA: 38ms end-to-end commit latency</div>
          </div>
        </div>
      </div>
    ),
  },
];

const timelineData = [
  {
    phase: "PHASE 01",
    duration: "Day 1-3",
    title: "Deep Operational Architecture Audit",
    content: (
      <div className="space-y-2 text-sm text-neutral-400">
        <p>Our senior infrastructure engineers shadow your team, mapping data flows, identifying state bottlenecks, and defining mathematical boundaries.</p>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
          <IconCheck size={14} />
          <span>Deliverable: Formal LangGraph State Machine Specification</span>
        </div>
      </div>
    ),
  },
  {
    phase: "PHASE 02",
    duration: "Day 4-7",
    title: "Dedicated VPC Swarm Sandbox",
    content: (
      <div className="space-y-2 text-sm text-neutral-400">
        <p>Deployment of your dedicated agent cluster within your AWS/GCP perimeter with local fine-tuned LLM inference nodes.</p>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
          <IconCheck size={14} />
          <span>Deliverable: Dedicated VPC Sandbox with Live Pytest Suite</span>
        </div>
      </div>
    ),
  },
  {
    phase: "PHASE 03",
    duration: "Day 8-11",
    title: "Shadow Traffic Stress Testing",
    content: (
      <div className="space-y-2 text-sm text-neutral-400">
        <p>Your agent swarm runs in parallel with existing human workflows, benchmarking latency, accuracy, and self-healing circuit breakers.</p>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
          <IconCheck size={14} />
          <span>Deliverable: 99.98% Quorum Consensus Benchmark Report</span>
        </div>
      </div>
    ),
  },
  {
    phase: "PHASE 04",
    duration: "Day 12-14",
    title: "Production Cutover & 24/7 SLA",
    content: (
      <div className="space-y-2 text-sm text-neutral-400">
        <p>Gradual traffic ramp (10% → 50% → 100%) with automated rollbacks, real-time Datadog telemetry, and dedicated support.</p>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
          <IconCheck size={14} />
          <span>Deliverable: 100% Autonomous Production Handover</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-12 sm:pt-16 pb-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header with Generous Top Clearance & Editorial Typography */}
      <div className="text-left max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-neutral-400 text-xs font-mono mb-4">
          <IconRoute size={13} className="text-[#E8663D]" />
          <span>CHAPTER 03 // ARCHITECTURE & PIPELINE SPECIFICATION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
          <span className="sr-only">How ZestFlow Delivers Self-Governing Intelligence</span>
          <span aria-hidden="true">
            How ZestFlow Delivers <span className="font-serif italic font-normal text-[#E8663D]">Self-Governing</span> Intelligence
          </span>
        </h1>
        <p className="mt-4 text-neutral-400 text-base leading-relaxed">
          Explore the state machine architecture, comparative operational efficiency, and our proven 14-day production deployment roadmap.
        </p>
      </div>

      {/* 1. Compare: Legacy Manual Operations vs ZestFlow AI */}
      <section className="mb-24">
        <div className="text-left mb-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">
            <span className="sr-only">The Transformation: Before vs. After</span>
            <span aria-hidden="true">
              The Transformation: <span className="font-serif italic font-normal text-[#E8663D]">Before vs. After</span>
            </span>
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Drag the interactive slider to contrast fragile legacy pipelines with ZestFlow's deterministic agent swarms.
          </p>
        </div>

        {/* Interactive Compare Slider with Full Visual Diagrams */}
        <div className="w-full h-[520px] sm:h-[560px] md:h-[580px]">
          <Compare
            firstLabel="BEFORE: FRAGILE LEGACY PIPELINES"
            secondLabel="AFTER: DETERMINISTIC AGENT SWARMS"
            firstContent={<BeforeFragileDiagram />}
            secondContent={<AfterDeterministicSwarm />}
          />
        </div>
      </section>

      {/* 2. Apple Cards Carousel with Native macOS Terminal Windows */}
      <section className="mb-24">
        <div className="text-left mb-8">
          <div className="text-xs font-mono text-[#E8663D] uppercase tracking-widest font-semibold mb-1">
            DEEP ARCHITECTURE MODULES
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">
            Explore the Core <span className="font-serif italic font-normal text-[#E8663D]">System Modules</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Click any card to inspect executable LangGraph logic, fallback policies, and evaluation schemas.
          </p>
        </div>

        <Carousel items={carouselItems.map((card, idx) => <Card key={card.title || idx} card={card} index={idx} />)} />
      </section>

      {/* 3. 14-Day Production Deployment Roadmap: Scroll-Linked Timeline */}
      <section className="py-6">
        <div className="text-left mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">
            <span className="sr-only">14-Day Rapid Deployment Roadmap</span>
            <span aria-hidden="true">
              14-Day Rapid <span className="font-serif italic font-normal text-[#E8663D]">Deployment</span> Roadmap
            </span>
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            From architecture audit to isolated production cutover in two weeks.
          </p>
        </div>

        <Timeline data={timelineData} />
      </section>
    </div>
  );
}
