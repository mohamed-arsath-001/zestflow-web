import { LeadershipTeam } from "../components/sections/LeadershipTeam";
import { CardContainer, CardBody, CardItem } from "../components/ui/ThreeDCard";
import { SupplyChainFlow } from "../components/ui/SupplyChainFlow";
import {
  IconCpu,
  IconShieldLock,
  IconCode,
  IconGitMerge,
  IconDatabase,
  IconCheck,
  IconUser,
  IconArrowUpRight,
} from "@tabler/icons-react";

export default function About() {
  return (
    <div className="min-h-screen pt-12 sm:pt-16 pb-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header with Editorial Styling */}
      <div className="text-left max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
          <IconCode size={13} className="text-[#E8663D]" />
          <span>ENGINEERING CAPABILITIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
          Pioneering Deterministic Intelligence
        </h1>
        <p className="mt-4 text-[#9A9892] text-base leading-relaxed">
          ZestFlow was founded on a simple engineering realization: enterprise supply chains and factories cannot tolerate stochastic hallucinations. We engineer deterministic state machines for mission-critical operations.
        </p>
      </div>

      {/* 1. Core Engineering Pillars: 3D Perspective Cards */}
      <section className="mb-24">
        <div className="text-left mb-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">Core Principles</h2>
          <p className="text-[#9A9892] text-sm mt-1">Foundational tenets governing every agentic pipeline we deploy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 3D Card 1 */}
          <CardContainer className="py-2">
            <CardBody className="bg-[#18181B] border border-white/[0.08] w-full h-auto rounded-2xl p-7 hover:border-[#E8663D]/40 transition-colors shadow-2xl shadow-black/40">
              <CardItem
                translateZ="50"
                className="text-lg font-display font-bold text-[#F4F1EA] flex items-center gap-2.5"
              >
                <div className="p-2 rounded-lg bg-[#111113] text-[#E8663D] border border-white/[0.08]">
                  <IconCpu size={18} />
                </div>
                <span>Radical Determinism</span>
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-[#9A9892] text-sm mt-3 leading-relaxed"
              >
                Every agent transition is bound to an explicit finite-state machine (FSM). If document confidence falls below your operational threshold, human-in-the-loop exception routing triggers instantly.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-6 bg-[#111113] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
                  className="h-44 w-full object-cover grayscale contrast-110 opacity-85"
                  alt="State Machine Logic"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/[0.08]">
                <CardItem
                  translateZ="40"
                  className="text-xs font-mono font-semibold text-[#5B7B5B]"
                >
                  Pydantic v2 Validated
                </CardItem>
                <CardItem
                  translateZ="40"
                  as="button"
                  className="px-4 py-2 rounded-lg bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Inspect Architecture &rarr;
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* 3D Card 2 */}
          <CardContainer className="py-2">
            <CardBody className="bg-[#18181B] border border-white/[0.08] w-full h-auto rounded-2xl p-7 hover:border-[#E8663D]/40 transition-colors shadow-2xl shadow-black/40">
              <CardItem
                translateZ="50"
                className="text-lg font-display font-bold text-[#F4F1EA] flex items-center gap-2.5"
              >
                <div className="p-2 rounded-lg bg-[#111113] text-[#5B7B5B] border border-white/[0.08]">
                  <IconShieldLock size={18} />
                </div>
                <span>Zero Data Leakage Pledge</span>
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-[#9A9892] text-sm mt-3 leading-relaxed"
              >
                Your supply chain data and customer documents never train public foundation models. We build for your dedicated cloud perimeter or provision local on-premises inference servers.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-6 bg-[#111113] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
                  className="h-44 w-full object-cover grayscale contrast-110 opacity-85"
                  alt="Zero Data Leakage"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/[0.08]">
                <CardItem
                  translateZ="40"
                  className="text-xs font-mono font-semibold text-[#9A9892]"
                >
                  Local VPC / On-Premises
                </CardItem>
                <CardItem
                  translateZ="40"
                  as="button"
                  className="px-4 py-2 rounded-lg bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Review Security Specs &rarr;
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      {/* 2. Bespoke Automation for Complex Supply Chains */}
      <section className="mb-24">
        <SupplyChainFlow />
      </section>

      {/* 3. Leadership Team */}
      <LeadershipTeam />

      {/* 4. Our Philosophy */}
      <section className="mb-24">
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-2">
            <IconCode size={13} className="text-[#E8663D]" />
            <span>CORE VALUES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight">Our Philosophy</h2>
          <p className="text-[#9A9892] text-sm mt-1">Built by engineers who value verifiable code over marketing buzzwords</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition shadow-lg shadow-black/20">
            <div className="text-sm font-mono text-[#E8663D] font-semibold mb-2">01 // CODE OWNERSHIP</div>
            <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-3">You Own Every Line</h3>
            <p className="text-[#9A9892] text-xs leading-relaxed">
              We never trap clients inside proprietary hosted platforms. We write clean, idiomatic Python and LangGraph code, check it directly into your repositories, and hand over complete ownership upon delivery.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition shadow-lg shadow-black/20">
            <div className="text-sm font-mono text-[#E8663D] font-semibold mb-2">02 // NO BLACK BOXES</div>
            <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-3">Transparent Architecture</h3>
            <p className="text-[#9A9892] text-xs leading-relaxed">
              Every workflow step is observable through OpenTelemetry and structured logging. When an automated action triggers or an exception occurs, your team can trace the exact logical branch that took place.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/30 transition shadow-lg shadow-black/20">
            <div className="text-sm font-mono text-[#E8663D] font-semibold mb-2">03 // PRACTICAL ROI</div>
            <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-3">Focused on High-Yield Workflows</h3>
            <p className="text-[#9A9892] text-xs leading-relaxed">
              We don't build toys or vanity chatbots. We automate manual paperwork, bill of lading parsing, ERP synchronization, and freight dispatching where human bottlenecks directly reduce operational throughput.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Engineering Guarantee */}
      <section className="py-12 border-t border-white/[0.08]">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-2xl shadow-black/40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/[0.08] text-[#5B7B5B] text-xs font-mono mb-4">
              <IconCheck size={14} />
              <span>THE ZESTFLOW PROMISE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA] tracking-tight mb-4">
              The Engineering Guarantee
            </h2>
            <p className="text-[#9A9892] text-sm leading-relaxed mb-6">
              Before deploying to your production environment, we conduct rigorous integration tests against simulated failure modes: corrupt PDFs, dropped carrier webhooks, and malformed ERP payloads. If our state machine encounters an untyped anomaly, it gracefully yields to a human operator rather than guessing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#F4F1EA]">
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>Deterministic schema validation</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>PostgreSQL state persistence</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>Local VPC deployment option</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>Zero model training on your data</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
