import { useState } from "react";
import {
  IconFileText,
  IconDatabase,
  IconMail,
  IconCpu,
  IconCheck,
  IconTruckDelivery,
  IconAlertTriangle,
  IconGitMerge,
  IconShieldCheck,
} from "@tabler/icons-react";

interface StageItem {
  id: string;
  title: string;
  sub: string;
  icon: typeof IconFileText;
  tag: string;
  details: string;
}

const UNSTRUCTURED_INPUTS: StageItem[] = [
  {
    id: "bol",
    title: "Messy PDF Waybills & BOLs",
    sub: "Bills of Lading, handwritten manifests, multi-page customs declarations",
    icon: IconFileText,
    tag: "INBOUND FREIGHT",
    details: "Scanned 300DPI documents parsed via multi-modal vision models into normalized byte buffers.",
  },
  {
    id: "erp",
    title: "ERP Data Feeds (SAP / Oracle)",
    sub: "Purchase order updates, inventory deltas, supplier SKU changes",
    icon: IconDatabase,
    tag: "ERP INTEGRATION",
    details: "Continuous webhook listeners capture real-time material shortages and backorders.",
  },
  {
    id: "email",
    title: "Supplier & Carrier Emails",
    sub: "Rate quotes, detention charges, delayed arrival exceptions",
    icon: IconMail,
    tag: "COMMUNICATIONS",
    details: "NLP pipeline extracts container IDs, ETAs, and freight surcharges with zero manual typing.",
  },
];

const STATE_MACHINE_NODES: StageItem[] = [
  {
    id: "vision",
    title: "Vision Document Parser",
    sub: "Pydantic v2 strict schema enforcement and regex validation",
    icon: IconCpu,
    tag: "EXTRACTION ENGINE",
    details: "Extracts origin, destination, weight, and tariff codes with strict type guarantees.",
  },
  {
    id: "quorum",
    title: "Adversarial Quorum Critic",
    sub: "3-Model cyclical consensus prevents hallucinated quantities",
    icon: IconGitMerge,
    tag: "CONSENSUS QUORUM",
    details: "Three distinct model families cross-evaluate line-item arithmetic before state transition.",
  },
  {
    id: "fallback",
    title: "Confidence Gating & Fallback",
    sub: "Auto-routes low-confidence exceptions to human dispatchers",
    icon: IconAlertTriangle,
    tag: "EXCEPTION GATEWAY",
    details: "If confidence drops below 98.5%, the payload triggers an instant review task with audit logs.",
  },
];

const STRUCTURED_OUTPUTS: StageItem[] = [
  {
    id: "commit",
    title: "PostgreSQL & ERP State Commit",
    sub: "Atomic writes with two-phase commit & zero duplicate transactions",
    icon: IconShieldCheck,
    tag: "SYSTEMS OF RECORD",
    details: "Idempotent transactions committed directly into production SAP tables and Postgres databases.",
  },
  {
    id: "dispatch",
    title: "Automated Freight Dispatch",
    sub: "Carrier load tendering, appointment booking & rate confirmation",
    icon: IconTruckDelivery,
    tag: "CARRIER DISPATCH",
    details: "Tenders loads to pre-approved freight carriers based on lowest rate and equipment availability.",
  },
  {
    id: "alert",
    title: "Real-Time Exception Alerts",
    sub: "Discrepancy notices to supply chain & warehouse floor managers",
    icon: IconCheck,
    tag: "OPERATIONAL TELEMETRY",
    details: "Instant notification sent when supplier shipments deviate from purchase order quantities.",
  },
];

export function SupplyChainFlow() {
  const [activeInput, setActiveInput] = useState<string>("bol");

  return (
    <div className="w-full rounded-2xl bg-[#141416] border border-white/[0.08] p-6 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E8663D]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E8663D] uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E8663D] shadow-[0_0_8px_rgba(232,102,61,0.6)]" />
            OPERATIONAL ARCHITECTURE // BESPOKE AUTOMATION
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F1EA] mt-1 tracking-tight">
            How Unstructured Logistics Chaos Becomes <span className="font-serif italic font-normal text-emerald-400">Deterministic Action</span>
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] tracking-wider uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>ZERO SCHEMA DRIFT SLA</span>
        </div>
      </div>

      {/* 3-Column Visual Flow Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Column 1: Unstructured Inbound Inputs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892] font-semibold">
              01 // Unstructured Inputs
            </span>
            <span className="text-[10px] font-mono text-[#E8663D] bg-[#E8663D]/10 px-2 py-0.5 rounded border border-[#E8663D]/20">
              INBOUND DATA
            </span>
          </div>

          <div className="space-y-3">
            {UNSTRUCTURED_INPUTS.map((item) => {
              const isSelected = activeInput === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveInput(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#1E1917] border-[#E8663D]/60 shadow-[0_0_16px_rgba(232,102,61,0.15)]"
                      : "bg-[#18181B]/80 border-white/[0.06] hover:border-white/[0.15] opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#F27A52] uppercase">
                      {item.tag}
                    </span>
                    <Icon size={16} className={isSelected ? "text-[#E8663D]" : "text-neutral-500"} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#F4F1EA]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9A9892] mt-1 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Deterministic AI State Machine */}
        <div className="space-y-4 relative">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              02 // LangGraph State Machine
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              PYDANTIC V2 GATE
            </span>
          </div>

          <div className="space-y-3">
            {STATE_MACHINE_NODES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      {item.tag}
                    </span>
                    <Icon size={16} className="text-emerald-400" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#F4F1EA]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Structured Output & Action */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892] font-semibold">
              03 // Structured Execution
            </span>
            <span className="text-[10px] font-mono text-[#5B7B5B] bg-[#5B7B5B]/10 px-2 py-0.5 rounded border border-[#5B7B5B]/20">
              COMMITTED STATE
            </span>
          </div>

          <div className="space-y-3">
            {STRUCTURED_OUTPUTS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#18181B]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      {item.tag}
                    </span>
                    <Icon size={16} className="text-emerald-400" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#F4F1EA]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9A9892] mt-1 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Input Payload Inspector */}
      <div className="mt-8 p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#E8663D] font-bold uppercase tracking-wider text-[11px]">Active Pipeline Flow:</span>
          <span className="text-neutral-300">
            {UNSTRUCTURED_INPUTS.find((i) => i.id === activeInput)?.details}
          </span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
          <IconCheck size={14} />
          <span>Validated with Pydantic v2 Contract</span>
        </div>
      </div>
    </div>
  );
}
export default SupplyChainFlow;
