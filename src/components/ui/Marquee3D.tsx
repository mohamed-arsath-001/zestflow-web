import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconTruckDelivery,
  IconBuildingFactory2,
  IconFileText,
  IconDatabase,
  IconCpu,
  IconCheck,
  IconPackage,
  IconShieldCheck,
} from "@tabler/icons-react";

interface IndustrialCapability {
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: typeof IconTruckDelivery;
}

const INDUSTRIAL_CAPABILITIES_ROW_1: IndustrialCapability[] = [
  {
    title: "Bill of Lading (BOL) Extraction",
    category: "INBOUND LOGISTICS",
    description: "Multi-modal vision parsing of scanned shipping manifests, container IDs, and customs documents directly into ERP.",
    metric: "0.00% Drift",
    metricLabel: "Schema Gate",
    icon: IconFileText,
  },
  {
    title: "Automated Freight Dispatch Swarms",
    category: "FREIGHT & FLEET",
    description: "LangGraph agents evaluate carrier rate quotes, cross-check equipment availability, and auto-dispatch loads.",
    metric: "42ms SLA",
    metricLabel: "Execution Speed",
    icon: IconTruckDelivery,
  },
  {
    title: "ERP & Database State Commits",
    category: "ERP INTEGRATION",
    description: "Two-phase atomic commit protocol guaranteeing idempotent writes to SAP, Oracle NetSuite, and PostgreSQL.",
    metric: "100% Atomic",
    metricLabel: "Commit Protocol",
    icon: IconDatabase,
  },
  {
    title: "Predictive Inventory Reorder Loops",
    category: "WAREHOUSING",
    description: "Continuous warehouse stock monitoring with autonomous purchase order generation when thresholds breach.",
    metric: "Zero Stockouts",
    metricLabel: "Buffer Target",
    icon: IconPackage,
  },
];

const INDUSTRIAL_CAPABILITIES_ROW_2: IndustrialCapability[] = [
  {
    title: "Assembly Line QA Exception Triage",
    category: "MANUFACTURING QA",
    description: "Automated ingestion and classification of optical inspection logs, flagging tolerances for manual station review.",
    metric: "Sub-Second",
    metricLabel: "Anomaly Catch",
    icon: IconCpu,
  },
  {
    title: "Supplier Dispute & Detention Auditing",
    category: "CARRIER AUDITING",
    description: "Automated invoice discrepancy matching comparing telematics timestamps against carrier detention billing.",
    metric: "100% Audited",
    metricLabel: "Line Items",
    icon: IconShieldCheck,
  },
  {
    title: "Customs Manifest Code Classification",
    category: "CROSS-BORDER",
    description: "Deterministic Harmonized Tariff Schedule (HTS) code mapping with Pydantic verification before customs filing.",
    metric: "HTS-6 Strict",
    metricLabel: "Classification",
    icon: IconBuildingFactory2,
  },
  {
    title: "Multi-Agent Consensus Quorums",
    category: "ADVERSARIAL VERIFICATION",
    description: "Three independent models verify logistics math and contract numbers before downstream dispatch execution.",
    metric: "3-Model",
    metricLabel: "Quorum Gate",
    icon: IconCheck,
  },
];

function CapabilityCard({ item }: { item: IndustrialCapability }) {
  const Icon = item.icon;
  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl bg-[#141416]/90 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-[#18181C] shadow-lg shadow-black/40">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1F2024] border border-white/[0.08] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Icon size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#E8663D] uppercase font-bold">
              [{item.category}]
            </span>
            <h4 className="font-display font-bold text-sm text-[#F4F1EA] mt-0.5">
              {item.title}
            </h4>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#9A9892] leading-relaxed mb-4 line-clamp-2">
        {item.description}
      </p>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
        <span className="text-neutral-500 text-[10px] uppercase tracking-wider">{item.metricLabel}</span>
        <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          {item.metric}
        </span>
      </div>
    </div>
  );
}

export function Marquee3D() {
  const [isPaused, setIsPaused] = useState(false);

  const row1List = [...INDUSTRIAL_CAPABILITIES_ROW_1, ...INDUSTRIAL_CAPABILITIES_ROW_1, ...INDUSTRIAL_CAPABILITIES_ROW_1];
  const row2List = [...INDUSTRIAL_CAPABILITIES_ROW_2, ...INDUSTRIAL_CAPABILITIES_ROW_2, ...INDUSTRIAL_CAPABILITIES_ROW_2];

  return (
    <section
      id="proof"
      className="py-20 relative overflow-hidden bg-[#0D0D0F] border-y border-white/[0.06]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(16,185,129,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Header Badge & Title */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
          <IconBuildingFactory2 size={13} className="text-[#E8663D]" />
          <span>CHAPTER 02 // INDUSTRIAL CAPABILITIES MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
          ENGINEERED FOR <span className="font-serif italic font-normal text-[#E8663D]">INDUSTRIAL OPERATIONS</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#9A9892] max-w-2xl mx-auto leading-relaxed">
          High-throughput multi-agent state machines purpose-built for supply chain, warehousing, freight dispatch, and manufacturing execution.
        </p>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full overflow-hidden select-none py-4"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0D0D0F] via-[#0D0D0F]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0D0D0F] via-[#0D0D0F]/80 to-transparent z-20" />

        <div
          className="space-y-4 sm:space-y-6 transition-transform duration-700 ease-out"
          style={{
            transform: "rotateX(14deg) rotateZ(-1.5deg) scale(0.98)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Row 1: Scrolling Left */}
          <motion.div
            className="flex gap-4 sm:gap-6 will-change-transform"
            animate={{
              x: isPaused ? undefined : ["0%", "-33.333%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {row1List.map((item, idx) => (
              <CapabilityCard key={`r1-${item.title}-${idx}`} item={item} />
            ))}
          </motion.div>

          {/* Row 2: Scrolling Right */}
          <motion.div
            className="flex gap-4 sm:gap-6 will-change-transform"
            animate={{
              x: isPaused ? undefined : ["-33.333%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 34,
            }}
          >
            {row2List.map((item, idx) => (
              <CapabilityCard key={`r2-${item.title}-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Capability Focus Tags */}
      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 relative z-10">
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#141416]/80 border border-white/[0.06] flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#9A9892]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>[Inbound Logistics]</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
            <span>[Automated Freight Dispatch]</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>[ERP System Integration]</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
            <span>[Warehouse Inventory Workflows]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Marquee3D;
