import { useState } from "react";
import { ExpandableCards } from "../components/ui/ExpandableCards";
import { PipelineCalculator } from "../components/ui/PipelineCalculator";
import { CodeBlock } from "../components/ui/CodeBlock";
import { motion } from "framer-motion";
import {
  IconCpu,
  IconShieldCheck,
  IconCheck,
} from "@tabler/icons-react";

const serviceCards = [
  {
    category: "Document Automation",
    title: "Automated Document Extraction: BOLs, Invoices & Manifests",
    badge: "Industrial Parsing",
    description:
      "Transform messy PDFs, scanned carrier waybills, and customs declarations into structured, typed data directly committed to PostgreSQL or SAP.",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    ctaText: "Inspect Extraction Schema",
    content: (
      <div className="space-y-4">
        <p className="text-[#9A9892] text-sm leading-relaxed">
          Traditional OCR fails on low-resolution faxed bills of lading and handwritten customs declarations. Our vision-language pipelines combine multimodal LLMs with strict Pydantic schema validation to parse tables, container IDs, and line items with 99.8% precision.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Multi-page table reconciliation & container ID checksum verification</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Automatic currency and unit conversions (metric/imperial)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Direct bidirectional synchronization with SAP, Oracle ERP, and PostgreSQL</span>
          </div>
        </div>
        <CodeBlock
          language="python"
          filename="bol_extractor.py"
          code={`from pydantic import BaseModel, Field

class BillOfLading(BaseModel):
    bol_number: str = Field(..., pattern=r'^[A-Z0-9]{8,14}$')
    carrier_scac: str = Field(..., min_length=2, max_length=4)
    total_weight_kg: float = Field(..., gt=0)
    line_items: list[ManifestItem]

async def process_waybill(document_bytes: bytes) -> BillOfLading:
    raw_json = await vision_agent.extract(document_bytes)
    return BillOfLading.model_validate(raw_json)`}
        />
      </div>
    ),
  },
  {
    category: "Operations & Freight",
    title: "Inventory & Dispatch Swarms: Alerts & Freight Scheduling",
    badge: "Autonomous Dispatch",
    description:
      "Continuous warehouse inventory monitoring with automated reorder triggers, dock appointment scheduling, and carrier dispatch workflows.",
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Dispatch Logic",
    content: (
      <div className="space-y-4">
        <p className="text-[#9A9892] text-sm leading-relaxed">
          Coordinate complex freight logistics without endless email chains. Our autonomous dispatch agents monitor inventory thresholds, solicit quotes from approved carrier lists, confirm dock appointments, and send automated status briefs to warehouse managers.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Predictive out-of-stock alarms based on historical lead times</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Carrier email parsing and automatic rate quotation ranking</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Automated dock scheduling via warehouse management system (WMS) APIs</span>
          </div>
        </div>
        <CodeBlock
          language="python"
          filename="dispatch_swarm.py"
          code={`async def handle_inventory_threshold(sku: str, current_stock: int):
    policy = await erp.get_reorder_policy(sku)
    if current_stock <= policy.critical_threshold:
        quote_rfp = await dispatch_agent.generate_rfp(sku, policy.reorder_qty)
        carrier_quotes = await dispatch_agent.poll_carriers(quote_rfp)
        selected_carrier = rank_quotes(carrier_quotes, criteria="lowest_cost_under_sla")
        await wms.book_dock_appointment(sku, selected_carrier)`}
        />
      </div>
    ),
  },
  {
    category: "Data Integrity & Review",
    title: "Operations Telemetry & Exception Handling",
    badge: "Human-in-the-Loop",
    description:
      "Deterministic discrepancy detection between supplier invoices, purchase orders, and physical receipts with seamless human review escalations.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    ctaText: "Review Telemetry Spec",
    content: (
      <div className="space-y-4">
        <p className="text-[#9A9892] text-sm leading-relaxed">
          When receiving line items deviate from approved purchase orders or price variances exceed acceptable thresholds, our system never hallucinates a guess. It flags the discrepancy, stages the invoice, and routes a structured summary to the responsible plant manager for one-click resolution.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>3-way matching: PO vs. Bill of Lading vs. Vendor Invoice</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Strict variance tolerances (&lt;0.01%) enforced via typed models</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F4F1EA]">
            <IconCheck size={16} className="text-[#5B7B5B]" />
            <span>Zero unverified writes to your accounting or ERP database</span>
          </div>
        </div>
        <CodeBlock
          language="python"
          filename="variance_guard.py"
          code={`async def verify_three_way_match(invoice: Invoice, po: PurchaseOrder):
    delta = abs(invoice.subtotal - po.subtotal)
    if delta > VARIANCE_TOLERANCE_USD:
        return await review_queue.create_ticket(
            title=f"Variance detected on PO #{po_id}: USD {delta}",
            suggested_action="FLAG_FOR_PLANT_BUYER"
        )
    return await erp.approve_payment(invoice.id)`}
        />
      </div>
    ),
  },
];

export default function Services() {
  

  return (
    <div className="min-h-screen pt-12 sm:pt-16 pb-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-left max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
          <IconCpu size={13} className="text-[#E8663D]" />
          <span>PRODUCTION-READY CAPABILITIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
          Bespoke AI Engineering For Scale-Ready Enterprises
        </h1>
        <p className="mt-4 text-[#9A9892] text-base leading-relaxed">
          Click any card below to inspect code architecture, expand technical specs, and explore implementation details for our production-ready agent services.
        </p>
      </div>

      {/* 1. Expandable Cards Section */}
      <section className="mb-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-[#F4F1EA] tracking-tight">Core Service Solutions</h2>
            <p className="text-sm text-[#9A9892] mt-1">Click any card below to reveal full implementation details</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F4F1EA] bg-[#18181B] px-3 py-1.5 rounded-lg border border-white/[0.08] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5B7B5B]" />
            <span className="font-semibold">3 Active Solutions</span>
          </div>
        </div>

        <ExpandableCards cards={serviceCards} />
      </section>

      {/* 2. Interactive Operational Feasibility & Pipeline Calculator */}
      <section className="mb-20">
        <PipelineCalculator />
      </section>

      {/* 3. Tech Stack Matrix */}
      <section className="py-10 border-t border-white/[0.08]">
        <div className="text-left mb-8">
          <h3 className="text-xl font-display font-bold text-[#F4F1EA]">Production Infrastructure Matrix</h3>
          <p className="text-sm text-[#9A9892] mt-0.5">Battle-tested tools embedded into every ZestFlow deployment</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition">
            <div className="text-sm font-display font-bold text-[#F4F1EA]">LangGraph & LlamaIndex</div>
            <div className="text-xs text-[#9A9892] mt-1 font-mono">State Machine Orchestration</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition">
            <div className="text-sm font-display font-bold text-[#F4F1EA]">PostgreSQL & pgvector</div>
            <div className="text-xs text-[#9A9892] mt-1 font-mono">Sub-second Vector Search</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition">
            <div className="text-sm font-display font-bold text-[#F4F1EA]">vLLM & TensorRT</div>
            <div className="text-xs text-[#9A9892] mt-1 font-mono">Private Inference Nodes</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition">
            <div className="text-sm font-display font-bold text-[#F4F1EA]">OpenTelemetry</div>
            <div className="text-xs text-[#9A9892] mt-1 font-mono">Full Trace Observability</div>
          </div>
        </div>
      </section>
    </div>
  );
}
