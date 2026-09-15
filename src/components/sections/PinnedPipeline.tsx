import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import {
  IconSearch,
  IconShieldCheck,
  IconCheck,
  IconClock,
  IconCircleDot,
  IconCpu,
  IconTerminal2,
  IconArrowRight,
  IconRoute,
} from "@tabler/icons-react";

interface StageData {
  num: string;
  step: string;
  short: string;
  title: string;
  tagline: string;
  desc: string;
  stat: string;
  statLabel: string;
  agreement: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  payloadLines: string[];
}

const PIPELINE_STAGES: StageData[] = [
  {
    num: "01",
    step: "STAGE 01",
    short: "Context Miner",
    title: "Semantic Ingestion & RAG",
    tagline: "Sub-4.2ms Vector Retrieval & Hybrid Indexing",
    desc: "Ingests messy enterprise documents, customer tickets, and ERP payloads. Cleans, tokenizes, and performs hybrid dense/sparse search against pgvector with HNSW indexing.",
    stat: "4.2ms P99",
    statLabel: "Retrieval Latency",
    agreement: "pgvector HNSW",
    icon: IconSearch,
    payloadLines: [
      "// Stage 01: Ingestion & Vector Hydration",
      "{",
      '  "event_id": "evt_9984x_dispatch",',
      '  "ingest_timestamp": "2026-09-13T10:04:12.842Z",',
      '  "embedding_model": "text-embedding-3-large",',
      '  "hnsw_distance": 0.1284,',
      '  "context_retrieval_ms": 4.2,',
      '  "pii_sanitized": true,',
      '  "status": "HYDRATED_AWAITING_CRITIC"',
      "}",
    ],
  },
  {
    num: "02",
    step: "STAGE 02",
    short: "Critic Swarm",
    title: "Multi-Model Adversarial Quorum",
    tagline: "3 Independent Architectures Must Agree",
    desc: "Parallel evaluation by three independent frontier LLMs. If any model detects hallucination, schema drift, or non-compliance, the draft is rejected and renegotiated automatically.",
    stat: "99.98%",
    statLabel: "Quorum Consensus Rate",
    agreement: "3-Model Quorum",
    icon: IconShieldCheck,
    payloadLines: [
      "// Stage 02: Swarm Consensus Verification",
      "{",
      '  "quorum_size": 3,',
      '  "models": ["claude-3-5-sonnet", "gpt-4o", "deepseek-v3-ft"],',
      '  "consensus_score": 0.9998,',
      '  "schema_drift_detected": false,',
      '  "hallucination_index": 0.0001,',
      '  "critic_verdict": "APPROVED_BY_QUORUM",',
      '  "latency_ms": 28.4',
      "}",
    ],
  },
  {
    num: "03",
    step: "STAGE 03",
    short: "Pydantic Verifier",
    title: "Strict Type & Guardrail Gate",
    tagline: "Mathematical Boundary Checks Before Execution",
    desc: "Every variable is parsed into immutable Pydantic v2 schemas. Type coercion is strictly forbidden. Mathematical invariants and company policies are verified before state commit.",
    stat: "0.00%",
    statLabel: "Schema Drift Tolerance",
    agreement: "Strict Typing v2",
    icon: IconCheck,
    payloadLines: [
      "// Stage 03: Pydantic Strict Invariants Gate",
      "{",
      '  "schema": "ZestFlowOrderDispatchV2",',
      '  "fields_validated": 24,',
      '  "type_errors": 0,',
      '  "regex_assertions_passed": true,',
      '  "mathematical_bounds_verified": true,',
      '  "circuit_breaker_status": "CLOSED_HEALTHY",',
      '  "status": "READY_FOR_TWO_PHASE_COMMIT"',
      "}",
    ],
  },
  {
    num: "04",
    step: "STAGE 04",
    short: "State Dispatcher",
    title: "Two-Phase Commit State Machine",
    tagline: "Deterministic Execution Across Enterprise ERP",
    desc: "LangGraph state transition commits atomically. If the downstream API (SAP, Salesforce, Postgres) drops connection, the transaction rolls back cleanly with zero orphaned records.",
    stat: "42ms SLA",
    statLabel: "End-to-End Latency",
    agreement: "Two-Phase Commit",
    icon: IconCpu,
    payloadLines: [
      "// Stage 04: Distributed Atomic State Commit",
      "{",
      '  "transaction_id": "tx_prod_44299",',
      '  "target_system": "core_enterprise_postgres",',
      '  "commit_phase": "TWO_PHASE_FINALIZED",',
      '  "idempotency_key": "idem_8829f001b2a",',
      '  "rollback_prepared": false,',
      '  "audit_trail_signature": "sha256:7f8a92...",',
      '  "execution_sla": "42ms_MET"',
      "}",
    ],
  },
];

export function PinnedPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  // Monitor scroll progression to pin and highlight stages
  useEffect(() => {
    const handleScroll = () => {
      const stageElements = document.querySelectorAll("[data-pipeline-stage]");
      const viewportCenter = window.innerHeight * 0.45;

      stageElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const stageIndex = Number(el.getAttribute("data-pipeline-stage"));
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStage(stageIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentStage = PIPELINE_STAGES[activeStage] || PIPELINE_STAGES[0];

  return (
    <section
      id="machine"
      ref={containerRef}
      className="relative bg-[#0D0D0F] border-b border-white/[0.08] py-16 sm:py-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(232,102,61,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
            <IconRoute size={13} className="text-[#E8663D]" />
            <span>CHAPTER 03 // THE MACHINE: PIN-AND-REVEAL PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
            How Every Transaction Executes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9A9892] leading-relaxed">
            Scroll to step through the 4-stage deterministic execution pipeline. The diagram remains pinned while each stage unlocks in real time.
          </p>
        </div>

        {/* Scrollytelling Layout: Left Stages Scroll / Right Diagram Pins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* Left Column: Scrolling Stage Copy Cards */}
          <div className="lg:col-span-6 space-y-24 sm:space-y-36 py-8">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeStage;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.num}
                  data-pipeline-stage={idx}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 min-h-[360px] sm:min-h-[420px] flex flex-col justify-center ${
                    isActive
                      ? "bg-[#18181C] border-[#E8663D]/60 shadow-[0_0_30px_rgba(232,102,61,0.15)] scale-[1.02]"
                      : "bg-[#141416]/50 border-white/[0.06] opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1F2024] border border-white/[0.08] text-[#F27A52] text-xs font-mono font-bold">
                      <Icon size={14} />
                      <span>{stage.step}</span>
                    </div>
                    <span
                      className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#1A2E20] text-[#7BD492] border border-[#2E5C38]"
                          : "text-[#6B7280]"
                      }`}
                    >
                      {isActive ? "ACTIVE STAGE" : "STANDBY"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base font-semibold text-[#E8663D]">
                    {stage.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#9A9892] leading-relaxed">
                    {stage.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/[0.08] text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#111113] border border-white/[0.06]">
                      <span className="text-[#787670] block text-[10px] uppercase">
                        {stage.statLabel}
                      </span>
                      <span className="text-[#F4F1EA] font-bold text-sm sm:text-base mt-0.5 block">
                        {stage.stat}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#111113] border border-white/[0.06]">
                      <span className="text-[#787670] block text-[10px] uppercase">
                        Validation Model
                      </span>
                      <span className="text-[#5B7B5B] font-bold text-sm sm:text-base mt-0.5 block">
                        {stage.agreement}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pinned Diagram & Live Buffer Console */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 z-20 pb-8">
            <div className="rounded-2xl bg-[#141416] border border-white/[0.1] p-5 sm:p-7 shadow-2xl shadow-black/80 overflow-hidden relative">
              {/* Luminous top stroke */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8663D] to-transparent" />

              {/* Console Header */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08] text-xs font-mono">
                <div className="flex items-center gap-2 text-[#F4F1EA]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8663D] animate-ping" />
                  <span className="font-semibold">runtime_state_buffer.json</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#5B7B5B] bg-[#16261B] px-2 py-0.5 rounded border border-[#2E5C38]">
                    STAGE {activeStage + 1} OF 4 ACTIVE
                  </span>
                </div>
              </div>

              {/* Pinned Visual DAG Pipeline Nodes */}
              <div className="mb-5 p-3 rounded-xl bg-[#0E0E10] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider mb-2">
                  Pipeline Node Topology:
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {PIPELINE_STAGES.map((s, idx) => {
                    const isPast = idx < activeStage;
                    const isCurrent = idx === activeStage;
                    return (
                      <div
                        key={s.num}
                        className={`p-2 rounded-lg border text-center transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#1F1714] border-[#E8663D] text-[#F4F1EA] shadow-[0_0_12px_rgba(232,102,61,0.3)]"
                            : isPast
                            ? "bg-[#141B15] border-[#5B7B5B]/50 text-[#7BD492]"
                            : "bg-[#141416]/60 border-white/[0.04] text-[#6B7280]"
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold">
                          {s.num}
                        </div>
                        <div className="text-[11px] font-bold truncate mt-0.5">
                          {s.short}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live JSON Payload Buffer */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#DCD8D0] bg-[#0E0E10] p-4 sm:p-5 rounded-xl border border-white/[0.06] overflow-x-auto min-h-[220px]">
                <pre className="text-[#9A9892]">
                  {currentStage.payloadLines.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith("//")
                          ? "text-[#6B7280] italic mb-1"
                          : line.includes("APPROVED") || line.includes("HYDRATED") || line.includes("FINALIZED")
                          ? "text-[#7BD492] font-semibold"
                          : line.includes("error") || line.includes("score")
                          ? "text-[#E8663D]"
                          : ""
                      }
                    >
                      {line}
                    </div>
                  ))}
                </pre>
              </div>

              {/* Console Telemetry Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9A9892]">
                <span className="flex items-center gap-1.5">
                  <IconClock size={13} className="text-[#E8663D]" />
                  <span>SLA: 42ms End-to-End</span>
                </span>
                <span className="text-[#F27A52] font-semibold">
                  In-Memory State Buffer // Pydantic Validated
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
