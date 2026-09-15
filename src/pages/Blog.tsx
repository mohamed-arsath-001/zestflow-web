import { useState } from "react";
import { FocusCards } from "../components/ui/FocusCards";
import { DraggableCardContainer, DraggableCardBody } from "../components/ui/DraggableCard";
import { GooeyInput } from "../components/ui/GooeyInput";
import {
  IconBook,
  IconFlame,
  IconCheck,
  IconHandMove,
} from "@tabler/icons-react";

const caseStudies = [
  {
    title: "Eliminating Schema Errors in ERP Data Ingestion using Pydantic",
    tag: "ARCHITECTURE",
    readTime: "6 min read",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Building Fallback-Protected LangGraph Agents for Logistics Routing",
    tag: "LOGISTICS",
    readTime: "8 min read",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Automating Bill of Lading Processing with Vision Models & OCR",
    tag: "INDUSTRIAL AI",
    readTime: "7 min read",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "High-Throughput Inbound Invoice Reconciliation with PostgreSQL",
    tag: "DATA PIPELINES",
    readTime: "5 min read",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "vLLM vs TensorRT-LLM: Benchmark on Private Multi-Tenant GPU Nodes",
    tag: "INFRASTRUCTURE",
    readTime: "6 min read",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Constructing Resilient Circuit Breakers for Industrial Supplier APIs",
    tag: "ENGINEERING",
    readTime: "5 min read",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  },
];

const draggableTopics = [
  {
    title: "Pydantic Schema Validation",
    desc: "Strict type enforcement ensuring 0.00% data corruption during database ingestion.",
    badge: "PYTHON",
    pos: "top-8 left-[6%] rotate-[-3deg]",
  },
  {
    title: "LangGraph State Machines",
    desc: "Deterministic execution graphs with explicit checkpoint rollback states.",
    badge: "LANGGRAPH",
    pos: "top-20 left-[34%] rotate-[2deg]",
  },
  {
    title: "Local vLLM Inference",
    desc: "Zero external network calls; all token generation runs on local GPU clusters.",
    badge: "SECURITY",
    pos: "top-10 right-[8%] rotate-[-4deg]",
  },
  {
    title: "PostgreSQL & pgvector",
    desc: "Relational ACID state storage combined with vector semantic search.",
    badge: "DATABASE",
    pos: "top-60 left-[18%] rotate-[4deg]",
  },
];

export default function Blog() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen pt-12 sm:pt-16 pb-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-left max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
          <IconBook size={13} className="text-[#E8663D]" />
          <span>RESEARCH & ENGINEERING DISPATCHES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
          Battle-Tested Insights from The Autonomous Frontier
        </h1>
        <p className="mt-4 text-[#9A9892] text-base leading-relaxed">
          In-depth architectural post-mortems, evaluation benchmarks, and production case studies from the ZestFlow engineering core.
        </p>
      </div>

      {/* 1. Focus Cards Grid */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">Featured Technical Studies</h2>
            <p className="text-sm text-[#9A9892] mt-1">Hover any card to isolate and focus on the post</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9A9892] font-mono bg-[#18181B] px-3 py-1.5 rounded-lg border border-white/[0.08] shadow-xs">
            <IconFlame size={15} className="text-[#E8663D]" />
            <span>Updated Weekly</span>
          </div>
        </div>

        <FocusCards cards={caseStudies} />
      </section>

      {/* 2. Draggable Card Research Sandbox */}
      <section className="mb-24">
        <div className="text-left mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-2">
            <IconHandMove size={13} className="text-[#E8663D]" />
            <span>INTERACTIVE PHYSICS PLAYGROUND</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">
            Explore Active Research Pillars
          </h2>
          <p className="text-[#9A9892] text-sm mt-1">
            Drag and toss the research cards around the canvas to reorganize our research priorities.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#18181B] p-4 relative overflow-hidden shadow-2xl shadow-black/40">
          <DraggableCardContainer className="h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-mono text-[#6B7280] uppercase tracking-widest">
                [ Interactive Physics Canvas - Drag & Toss Cards ]
              </span>
            </div>

            {draggableTopics.map((topic) => (
              <DraggableCardBody
                key={topic.title}
                className={`absolute w-72 p-5 bg-[#141416] border border-white/[0.08] shadow-2xl shadow-black/60 rounded-2xl ${topic.pos}`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono text-[#E8663D] font-semibold px-2 py-0.5 rounded-md bg-[#111113] border border-white/[0.08] uppercase">
                    {topic.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#5B7B5B]" />
                </div>
                <h4 className="text-sm font-display font-bold text-[#F4F1EA] mb-1.5">{topic.title}</h4>
                <p className="text-xs text-[#9A9892] leading-relaxed">{topic.desc}</p>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </section>

      {/* 3. Newsletter Subscription */}
      <section className="max-w-xl mx-auto text-center py-14 px-8 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-2xl shadow-black/40">
        <h3 className="text-2xl font-display font-bold text-[#F4F1EA] mb-2">
          Subscribe to The Autonomous Dispatch
        </h3>
        <p className="text-sm text-[#9A9892] mb-6 max-w-md mx-auto leading-relaxed">
          Delivering zero-fluff engineering teardowns of multi-agent state machines, benchmark reports, and production patterns twice per month.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-[#5B7B5B] text-sm font-mono py-2.5 bg-[#111113] border border-[#5B7B5B]/30 rounded-xl">
            <IconCheck size={18} className="text-[#5B7B5B]" />
            <span>Subscribed. Welcome to the engineering dispatch.</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <GooeyInput
              placeholder="eng-lead@enterprise.com"
              buttonLabel="Subscribe Free"
              onSubmit={() => setSubscribed(true)}
            />
          </div>
        )}
      </section>
    </div>
  );
}
