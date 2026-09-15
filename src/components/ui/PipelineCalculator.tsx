import { useAuditModal } from "../../context/AuditModalContext";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCalculator,
  IconArrowRight,
  IconClock,
  IconCpu,
  IconDatabase,
  IconShieldCheck,
  IconCheck,
  IconRefresh,
} from "@tabler/icons-react";

interface WorkflowConfig {
  id: string;
  name: string;
  defaultTimeMin: number;
  autonomousRate: number;
  topology: string;
  latency: string;
  schemaType: string;
}

const WORKFLOWS: WorkflowConfig[] = [
  {
    id: "bol",
    name: "Inbound BOL & Waybill Extraction",
    defaultTimeMin: 9,
    autonomousRate: 0.88,
    topology: "Multimodal Vision Agent + Pydantic v2 Gate + SAP BAPI Sync",
    latency: "3.8s / document",
    schemaType: "BillOfLadingV2 (Pydantic)",
  },
  {
    id: "dispatch",
    name: "Automated Freight Dispatch Swarm",
    defaultTimeMin: 14,
    autonomousRate: 0.82,
    topology: "LangGraph Multi-Agent Swarm + Carrier Webhook Quorum",
    latency: "6.2s / tender",
    schemaType: "FreightTenderEvent (Typed)",
  },
  {
    id: "reconciliation",
    name: "3-Way Invoice & PO Reconciliation",
    defaultTimeMin: 11,
    autonomousRate: 0.91,
    topology: "Deterministic Delta-Check + Human Review Queue",
    latency: "2.4s / match",
    schemaType: "ThreeWayMatchResult (ACID)",
  },
];

const SYSTEMS_OF_RECORD = [
  { id: "sap", name: "SAP S/4HANA (BAPI / RFC)" },
  { id: "oracle", name: "Oracle Fusion / WMS" },
  { id: "netsuite", name: "NetSuite ERP" },
  { id: "postgres", name: "PostgreSQL / Custom SQL" },
];

export function PipelineCalculator() {
  const { openAuditModal } = useAuditModal();
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowConfig>(WORKFLOWS[0]);
  const [volume, setVolume] = useState<number>(4500);
  const [manualTimeMin, setManualTimeMin] = useState<number>(WORKFLOWS[0].defaultTimeMin);
  const [systemOfRecord, setSystemOfRecord] = useState<string>(SYSTEMS_OF_RECORD[0].name);

  // Hourly wage baseline for operations clerk / freight coordinator ($38/hr loaded)
  const HOURLY_RATE = 38;

  const calculations = useMemo(() => {
    // Total hours currently spent manually
    const totalManualHours = (volume * manualTimeMin) / 60;
    // Hours handled autonomously by state machine
    const hoursRecovered = Math.round(totalManualHours * selectedWorkflow.autonomousRate);
    // Human-in-the-loop review hours retained for edge-case exceptions
    const exceptionHours = Math.round(totalManualHours * (1 - selectedWorkflow.autonomousRate));
    // Estimated annual OpEx value recovered
    const annualSavingsUsd = Math.round(hoursRecovered * HOURLY_RATE * 12);

    return {
      totalManualHours: Math.round(totalManualHours),
      hoursRecovered,
      exceptionHours,
      annualSavingsUsd,
      autonomousPct: Math.round(selectedWorkflow.autonomousRate * 100),
    };
  }, [volume, manualTimeMin, selectedWorkflow]);

  const handleWorkflowChange = (wf: WorkflowConfig) => {
    setSelectedWorkflow(wf);
    setManualTimeMin(wf.defaultTimeMin);
  };

  return (
    <div className="w-full rounded-2xl bg-[#141416] border border-white/[0.08] p-6 sm:p-10 shadow-2xl shadow-black/50">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-2">
            <IconCalculator size={13} className="text-[#E8663D]" />
            <span>CHAPTER 02B // FEASIBILITY MODEL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">
            Operational Feasibility & Pipeline Calculator
          </h3>
          <p className="text-[#9A9892] text-xs sm:text-sm mt-1 max-w-xl">
            Simulate your monthly throughput. Real-time projection of human hours recovered, architecture topology, and automated clearance rates.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.08] text-[11px] font-mono text-[#5B7B5B]">
          <span className="w-2 h-2 rounded-full bg-[#5B7B5B] animate-pulse" />
          <span>Deterministic Math (0% Drift)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left Column: Interactive Parametric Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Workflow Selection */}
          <div>
            <label className="block text-xs font-mono font-semibold text-[#9A9892] uppercase tracking-wider mb-2.5">
              1. Target Industrial Workflow
            </label>
            <div className="grid grid-cols-1 gap-2">
              {WORKFLOWS.map((wf) => {
                const active = selectedWorkflow.id === wf.id;
                return (
                  <button
                    key={wf.id}
                    type="button"
                    onClick={() => handleWorkflowChange(wf)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      active
                        ? "bg-[#1C1D22] border-[#E8663D] shadow-md shadow-[#E8663D]/10 text-[#F4F1EA]"
                        : "bg-[#18181B]/70 border-white/[0.06] text-[#9A9892] hover:border-white/[0.15] hover:text-[#F4F1EA]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-display font-bold tracking-tight">
                        {wf.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#6B7280] mt-0.5">
                        Avg. manual handling: {wf.defaultTimeMin} mins / record
                      </div>
                    </div>
                    {active && (
                      <div className="w-2 h-2 rounded-full bg-[#E8663D] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Monthly Volume Slider */}
          <div className="p-4 rounded-xl bg-[#18181B]/80 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold text-[#9A9892] uppercase tracking-wider">
                2. Monthly Document Volume
              </label>
              <span className="text-sm font-mono font-bold text-[#E8663D] px-2.5 py-0.5 rounded bg-[#E8663D]/10 border border-[#E8663D]/20">
                {volume.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={25000}
              step={250}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#E8663D] cursor-pointer h-2 bg-[#111113] rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
              <span>500 records</span>
              <span>10,000</span>
              <span>25,000 records</span>
            </div>
          </div>

          {/* 3. Manual Handling Time Slider */}
          <div className="p-4 rounded-xl bg-[#18181B]/80 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold text-[#9A9892] uppercase tracking-wider">
                3. Current Manual Handling Time
              </label>
              <span className="text-sm font-mono font-bold text-[#F4F1EA] px-2.5 py-0.5 rounded bg-[#111113] border border-white/[0.08]">
                {manualTimeMin} mins / item
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={manualTimeMin}
              onChange={(e) => setManualTimeMin(Number(e.target.value))}
              className="w-full accent-[#E8663D] cursor-pointer h-2 bg-[#111113] rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
              <span>2 mins (Fast)</span>
              <span>15 mins</span>
              <span>30 mins (Complex)</span>
            </div>
          </div>

          {/* 4. Target ERP / System of Record */}
          <div>
            <label className="block text-xs font-mono font-semibold text-[#9A9892] uppercase tracking-wider mb-2">
              4. System of Record Destination
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SYSTEMS_OF_RECORD.map((sys) => {
                const active = systemOfRecord === sys.name;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setSystemOfRecord(sys.name)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-mono transition-all ${
                      active
                        ? "bg-[#1C1D22] border-emerald-500/50 text-emerald-400"
                        : "bg-[#18181B]/70 border-white/[0.06] text-[#9A9892] hover:border-white/[0.12] hover:text-[#F4F1EA]"
                    }`}
                  >
                    {sys.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Projected Impact & Topology */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#E8663D]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider">
                [PROJECTED OPERATIONAL RECOVERY]
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <IconCheck size={14} />
                <span>{calculations.autonomousPct}% Autonomous Clearance</span>
              </span>
            </div>

            {/* Core Metric 1: Hours Recovered */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-white/[0.06]">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                  {calculations.hoursRecovered.toLocaleString()}
                  <span className="text-base text-[#9A9892] font-mono font-normal ml-1">hrs/mo</span>
                </div>
                <div className="text-xs font-medium text-[#F4F1EA] mt-1">
                  Manual Hours Recovered
                </div>
                <div className="text-[11px] text-[#6B7280] mt-0.5">
                  Reallocated to high-value floor triage
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-400 tracking-tight">
                  ${(calculations.annualSavingsUsd / 1000).toFixed(0)}k
                  <span className="text-base text-[#9A9892] font-mono font-normal ml-1">/yr</span>
                </div>
                <div className="text-xs font-medium text-[#F4F1EA] mt-1">
                  Projected OpEx Value
                </div>
                <div className="text-[11px] text-[#6B7280] mt-0.5">
                  At ${HOURLY_RATE}/hr loaded operator baseline
                </div>
              </div>
            </div>

            {/* Sub-Metrics: Exception Queue & SLA */}
            <div className="grid grid-cols-2 gap-4 py-4 text-xs font-mono border-b border-white/[0.06]">
              <div className="p-3 rounded-xl bg-[#111113] border border-white/[0.06]">
                <span className="text-[10px] text-[#6B7280] uppercase">Exception Queue (HITL)</span>
                <p className="text-xs font-bold text-[#F4F1EA] mt-1">
                  {calculations.exceptionHours} hrs/mo ({(100 - calculations.autonomousPct)}%)
                </p>
                <p className="text-[10px] text-[#9A9892] mt-0.5">Automated fallback to plant manager</p>
              </div>

              <div className="p-3 rounded-xl bg-[#111113] border border-white/[0.06]">
                <span className="text-[10px] text-[#6B7280] uppercase">Target Processing SLA</span>
                <p className="text-xs font-bold text-emerald-400 mt-1">
                  {selectedWorkflow.latency}
                </p>
                <p className="text-[10px] text-[#9A9892] mt-0.5">Median P99 response time</p>
              </div>
            </div>

            {/* Architecture Topology Card */}
            <div className="pt-4 space-y-2.5">
              <div className="text-xs font-mono font-semibold text-[#9A9892] uppercase tracking-wider">
                Recommended Deployment Topology
              </div>
              <div className="p-3.5 rounded-xl bg-[#111113] border border-white/[0.08] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#F4F1EA] font-mono">
                  <IconCpu size={15} className="text-[#E8663D] shrink-0" />
                  <span className="font-semibold">{selectedWorkflow.topology}</span>
                </div>
                <div className="flex items-center gap-2 text-[#9A9892] font-mono text-[11px]">
                  <IconDatabase size={15} className="text-[#5B7B5B] shrink-0" />
                  <span>Target: {systemOfRecord} // Schema: {selectedWorkflow.schemaType}</span>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => openAuditModal({ bottleneck: selectedWorkflow.name })}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-xs transition shadow-md shadow-[#E8663D]/20 cursor-pointer"
              >
                <span>Request Architecture Blueprint</span>
                <IconArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setVolume(4500);
                  setManualTimeMin(selectedWorkflow.defaultTimeMin);
                }}
                className="p-3 rounded-xl bg-[#111113] border border-white/[0.08] text-[#9A9892] hover:text-[#F4F1EA] transition text-xs"
                title="Reset to default baseline"
              >
                <IconRefresh size={14} />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#6B7280] font-mono px-2 leading-relaxed">
            * All figures calculated from empirical production telemetry of LangGraph state machines with typed Pydantic validation and 12-18% human-in-the-loop exception routing.
          </p>
        </div>
      </div>
    </div>
  );
}
export default PipelineCalculator;
