import { useAuditModal } from "../context/AuditModalContext";
import Hero from "../components/sections/Hero";
import { Marquee3D } from "../components/ui/Marquee3D";
import { PinnedPipeline } from "../components/sections/PinnedPipeline";
import Features from "../components/sections/Features";
import { DraggableComparison } from "../components/ui/DraggableCard";
import { SupplyChainFlow } from "../components/ui/SupplyChainFlow";
import { CodeBlock } from "../components/ui/CodeBlock";
import { MacbookScroll } from "../components/ui/MacbookScroll";
import { Vortex } from "../components/ui/Vortex";
import { ChapterProgress } from "../components/ui/ChapterProgress";
import { Link } from "react-router-dom";
import {
  IconTerminal2,
  IconArrowRight,
  IconCheck,
  IconShieldCheck,
  IconCpu,
  IconGitMerge,
  IconDatabase,
} from "@tabler/icons-react";

const sampleAgentPipeline = `@app.agent(name="industrial_logistics_orchestrator")
async def execute_inbound_freight_intake(payload: InboundManifestPayload):
    # Step 1: Pydantic v2 Strict Schema Enforcement
    validated_bol = await schema_guard.validate_bol(
        raw_document=payload.document_stream,
        schema=BillOfLadingV2,
        strict=True
    )
    
    # Step 2: Multi-Agent Inventory & Line-Item Cross-Check
    verification = await swarm.reconcile_erp_state(
        bol_data=validated_bol,
        erp_connector=SAPEnterpriseClient(v=1809),
        tolerance_usd=0.00
    )
    
    # Step 3: Atomic State Commit to Core PostgreSQL Ledger
    if verification.has_discrepancy:
        return await exception_queue.route_to_operations_lead(
            item=verification,
            sla_urgency="HIGH"
        )
        
    return await dispatcher.commit_dock_schedule(
        facility_id=payload.destination_hub,
        freight_id=validated_bol.tracking_id,
        commit_to="postgres_production"
    )`;

export default function Home() {
  const { openAuditModal } = useAuditModal();
  return (
    <div className="space-y-0 relative">
      {/* Narrative Scrollytelling Chapter Progress Indicator */}
      <ChapterProgress />

      {/* Chapter 01 // The Spark: Hero Section */}
      <Hero />

      {/* Chapter 02 // The Proof: 3D Angled Continuous Scrolling Capabilities Marquee */}
      <Marquee3D />

      {/* Chapter 03 // The Machine: Pin-and-Reveal Scrollytelling Pipeline */}
      <PinnedPipeline />

      {/* Chapter 04 // The Architecture: Core Features with Linear Lamp Effect */}
      <div id="architecture">
        <Features />
      </div>

      {/* Mid-page Tactile Moment: Bounded Draggable Physics Comparison */}
      <DraggableComparison />

      {/* Chapter 04B // Bespoke Automation for Complex Supply Chains */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        <SupplyChainFlow />
      </section>

      {/* Chapter 05 // The Receipts: Industrial Code Architecture Terminal */}
      <section id="receipts" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
            <IconTerminal2 size={13} className="text-[#F27A52]" />
            <span>CHAPTER 05 // STATE MACHINE SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
            Deterministic Code, Not Black Boxes
          </h2>
          <p className="mt-3 text-[#9A9892] text-base max-w-xl leading-relaxed">
            Inspect our production LangGraph orchestrator. Every state transition is typed, validated against Pydantic schemas, and executed within your VPC perimeter.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#18181B] p-2 sm:p-3 shadow-2xl shadow-black/50">
          <CodeBlock
            language="python"
            filename="industrial_orchestrator.py"
            code={sampleAgentPipeline}
          />
        </div>
      </section>

      {/* Chapter 06 // The Watch: 3D Hardware Macbook Scroll Showcase */}
      <div id="watch">
        <MacbookScroll />
      </div>

      {/* Chapter 07 // The Guarantee: Grounded Engineering Verification */}
      <section id="voices" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
            <IconShieldCheck size={13} className="text-[#E8663D]" />
            <span>CHAPTER 07 // OPERATIONAL VERIFICATION</span>
          </div>
          <div className="text-xs font-mono text-[#E8663D] uppercase tracking-wider font-semibold mb-2">
            ENGINEERED FOR PRODUCTION-GRADE RELIABILITY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
            Our Engineering Guarantee
          </h2>
          <p className="text-[#9A9892] text-sm sm:text-base mt-2">
            No lock-in contracts. No opaque black-box subscriptions. We build verifiable, typed agent infrastructure directly on your stack.
          </p>
        </div>

        {/* 3 Grounded Architecture Verification Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/40 transition shadow-xl shadow-black/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/[0.08] flex items-center justify-center text-[#E8663D] mb-5">
                <IconCpu size={20} />
              </div>
              <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-2">
                100% Client Code Ownership
              </h3>
              <p className="text-[#9A9892] text-xs leading-relaxed">
                All LangGraph workflows, custom Pydantic schemas, and integration connectors are checked directly into your git repositories. You maintain complete control.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.08] text-xs font-mono text-[#5B7B5B] flex items-center gap-2">
              <IconCheck size={14} />
              <span>Full IP & Source Handover</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/40 transition shadow-xl shadow-black/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/[0.08] flex items-center justify-center text-[#E8663D] mb-5">
                <IconGitMerge size={20} />
              </div>
              <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-2">
                Test-Driven State Machines
              </h3>
              <p className="text-[#9A9892] text-xs leading-relaxed">
                We deliver extensive Pytest test suites simulating high-concurrency schema mutations, missing line items, and edge-case exceptions before production cutover.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.08] text-xs font-mono text-[#5B7B5B] flex items-center gap-2">
              <IconCheck size={14} />
              <span>Zero-Drift Execution Suite</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/40 transition shadow-xl shadow-black/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/[0.08] flex items-center justify-center text-[#E8663D] mb-5">
                <IconDatabase size={20} />
              </div>
              <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-2">
                Local VPC & On-Premises
              </h3>
              <p className="text-[#9A9892] text-xs leading-relaxed">
                Inference runs on your dedicated cloud perimeter or bare-metal clusters via vLLM. No proprietary vendor mesh, zero customer data retention.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.08] text-xs font-mono text-[#5B7B5B] flex items-center gap-2">
              <IconCheck size={14} />
              <span>Zero Data Retention</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 08 // The Handoff: Generative Vortex CTA Banner */}
      <section id="handoff" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center relative z-10">
        <Vortex containerClassName="border border-white/[0.08] shadow-2xl shadow-black/50 p-10 sm:p-16">
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
              Ready to automate your <span className="font-serif italic font-normal text-[#E8663D]">operational workflows</span>?
            </h3>
            <p className="text-[#9A9892] text-base leading-relaxed">
              Schedule an Operations Audit with our engineering team. We will map your logistics bottlenecks and dispatch pipelines into production-ready agent graphs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openAuditModal()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-sm shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_12px_0_rgba(232,102,61,0.3)] transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>Schedule Operations Audit</span>
                <IconArrowRight size={16} />
              </button>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#111113] border border-white/[0.08] text-[#F4F1EA] hover:bg-[#222328] hover:border-white/[0.15] font-semibold text-sm transition-all duration-200"
              >
                <span>View Workflow Specs</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-[#6B7280] font-mono">
              <div className="flex items-center gap-1.5">
                <IconCheck size={15} className="text-[#5B7B5B] shrink-0" />
                <span>Zero vendor lock-in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconCheck size={15} className="text-[#5B7B5B] shrink-0" />
                <span>Local VPC / On-Prem deployment</span>
              </div>
            </div>
          </div>
        </Vortex>
      </section>
    </div>
  );
}
