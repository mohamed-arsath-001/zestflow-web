import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAuditModal } from "../../context/AuditModalContext";
import {
  IconCheck,
  IconCpu,
  IconGitMerge,
  IconDatabase,
  IconTerminal2,
  IconShieldLock,
  IconSparkles,
  IconArrowUpRight,
} from "@tabler/icons-react";

interface CoFounderCardProps {
  roleTag: string;
  roleBadgeColor: "amber" | "emerald";
  title: string;
  subtitle: string;
  imageSrc: string;
  statusTag: string;
  metrics: { label: string; value: string };
  strategyPoints: string[];
  techStack: { name: string; icon: any }[];
  bio: string;
  cometColor: string;
  onBookAudit: () => void;
}

function Leadership3DCard({
  roleTag,
  roleBadgeColor,
  title,
  subtitle,
  imageSrc,
  statusTag,
  metrics,
  strategyPoints,
  techStack,
  bio,
  cometColor,
  onBookAudit,
}: CoFounderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"domain" | "stack">("domain");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEmerald = roleBadgeColor === "emerald";

  return (
    <div
      className="relative [perspective:1200px] w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.25 }}
        className="relative rounded-3xl bg-[#141416]/95 backdrop-blur-xl border border-white/[0.1] overflow-hidden p-6 sm:p-8 shadow-2xl transition-all duration-300"
      >
        {/* 1. Animated Conic Border Beam */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden p-[1px]">
          <div
            className="absolute inset-[-150%] animate-[spin_5s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 310deg, ${cometColor} 340deg, #FFFFFF 360deg)`,
            }}
          />
          <div className="absolute inset-[1.5px] rounded-[22px] bg-[#141416]" />
        </div>

        {/* 2. Interactive Radial Cursor Light */}
        <motion.div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]: any[]) =>
                `radial-gradient(450px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${
                  isEmerald ? "rgba(16, 185, 129, 0.12)" : "rgba(232, 102, 61, 0.14)"
                }, transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* 3. Card Content elevated in 3D */}
        <div
          className="relative z-10 space-y-6"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top Profile Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Portrait Frame with Cyberpunk HUD accents */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shrink-0 border border-white/[0.12] bg-[#18181B] shadow-2xl group">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Status Pill Tag */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-[#F4F1EA]">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isEmerald ? "bg-emerald-400" : "bg-[#E8663D]"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isEmerald ? "bg-emerald-500" : "bg-[#E8663D]"
                    }`}
                  />
                </span>
                <span>{statusTag}</span>
              </div>

              {/* Corner HUD reticles */}
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-white/40 pointer-events-none" />

              {/* Metric Callout Overlay */}
              <div className="absolute bottom-2 left-2 right-2 text-center py-1 rounded bg-white/[0.08] backdrop-blur-md border border-white/[0.08]">
                <span className="text-[10px] font-mono text-[#9A9892]">
                  {metrics.label}:{" "}
                  <strong className="text-[#F4F1EA] font-semibold">{metrics.value}</strong>
                </span>
              </div>
            </div>

            {/* Title, Badge & Overview */}
            <div className="flex-1 text-center sm:text-left">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase mb-2.5 border ${
                  isEmerald
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-[#E8663D]/10 text-[#E8663D] border-[#E8663D]/20"
                }`}
              >
                <IconSparkles size={11} />
                <span>{roleTag}</span>
              </div>

              <h3 className="text-2xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                {title}
              </h3>
              <p className="text-xs font-mono text-[#9A9892] mt-0.5 mb-3">
                {subtitle}
              </p>
              <p className="text-[#9A9892] text-xs leading-relaxed line-clamp-3 sm:line-clamp-none">
                {bio}
              </p>
            </div>
          </div>

          {/* Interactive Tab Switcher: Operational Domain vs Verified Stack */}
          <div className="pt-2">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#18181B] border border-white/[0.06] mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("domain")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  activeTab === "domain"
                    ? "bg-[#27272A] text-[#F4F1EA] shadow-sm shadow-black/50"
                    : "text-[#9A9892] hover:text-[#F4F1EA]"
                }`}
              >
                // Operational Focus
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("stack")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  activeTab === "stack"
                    ? "bg-[#27272A] text-[#F4F1EA] shadow-sm shadow-black/50"
                    : "text-[#9A9892] hover:text-[#F4F1EA]"
                }`}
              >
                // Verified Stack
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "domain" ? (
                <motion.div
                  key="domain"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-2.5"
                >
                  {strategyPoints.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#18181B]/80 border border-white/[0.04] text-xs text-[#9A9892] hover:border-white/[0.1] transition"
                    >
                      <div
                        className={`p-1 rounded-md shrink-0 mt-0.5 ${
                          isEmerald ? "text-emerald-400 bg-emerald-500/10" : "text-[#E8663D] bg-[#E8663D]/10"
                        }`}
                      >
                        <IconCheck size={12} strokeWidth={3} />
                      </div>
                      <span className="leading-snug text-[#DCD8D0]">{point}</span>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {techStack.map((tech, i) => {
                    const TechIcon = tech.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[#18181B]/80 border border-white/[0.04] hover:border-[#E8663D]/30 transition group/chip"
                      >
                        <div className="p-1 rounded bg-[#111113] text-[#9A9892] group-hover/chip:text-[#E8663D] transition">
                          <TechIcon size={14} />
                        </div>
                        <span className="text-[11px] font-mono text-[#F4F1EA] truncate">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Row: Schedule Scoping Audit */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-[#6B7280]">
              Direct Engagement // Verified
            </span>
            <button
              type="button"
              onClick={onBookAudit}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md active:scale-95 cursor-pointer ${
                isEmerald
                  ? "bg-emerald-500 hover:bg-emerald-400 text-[#111113] shadow-emerald-500/20"
                  : "bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] shadow-[#E8663D]/25"
              }`}
            >
              <span>Consult on Architecture</span>
              <IconArrowUpRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function LeadershipTeam() {
  const { openAuditModal } = useAuditModal();

  return (
    <section className="mb-28 relative">
      {/* Section Header */}
      <div className="text-left mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D] animate-ping" />
          <span>FOUNDING LEADERSHIP & CORE ARCHITECTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
          Engineered by Operators.{" "}
          <span className="font-serif italic font-normal text-[#E8663D]">
            Backed by Code.
          </span>
        </h2>
        <p className="text-[#9A9892] text-sm mt-2 leading-relaxed">
          Zero marketing layers. Speak directly with the founding engineers who design your state machines, audit your data contracts, and deploy autonomous agents into production.
        </p>
      </div>

      {/* Dual Co-Founder Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CEO Card */}
        <Leadership3DCard
          roleTag="CHIEF EXECUTIVE OFFICER"
          roleBadgeColor="amber"
          title="Co-Founder & CEO"
          subtitle="Enterprise Strategy & Supply Chain Architecture"
          imageSrc="/images/ceo_portrait.jpg"
          statusTag="ONLINE // DISPATCH ARCHITECT"
          metrics={{ label: "Ops Focus", value: "Cross-Dock & Inbound" }}
          strategyPoints={[
            "Translating facility bottlenecks into deterministic LangGraph execution plans.",
            "Structuring multi-system ERP connectors across SAP, Oracle, and legacy AS400.",
            "Protecting enterprise ROI with SLA-bound automated freight verification.",
          ]}
          techStack={[
            { name: "LangGraph Multi-Agent", icon: IconGitMerge },
            { name: "Inbound BOL Routing", icon: IconTerminal2 },
            { name: "SAP & Oracle Sync", icon: IconDatabase },
            { name: "Human-in-Loop Fallback", icon: IconShieldLock },
          ]}
          bio="Spearheads operational architecture, client automation roadmaps, and business alignment. Focuses on eliminating manual document bottlenecks across freight forwarding, cross-docking facilities, and industrial manufacturing plants."
          cometColor="#E8663D"
          onBookAudit={() => openAuditModal({ bottleneck: "Executive Consultation with CEO" })}
        />

        {/* CTO Card */}
        <Leadership3DCard
          roleTag="CHIEF TECHNOLOGY OFFICER"
          roleBadgeColor="emerald"
          title="Co-Founder & CTO"
          subtitle="Deterministic FSMs & Private Cloud Infrastructure"
          imageSrc="/images/cto_portrait.jpg"
          statusTag="ONLINE // KERNEL RUNTIME"
          metrics={{ label: "Data Leakage", value: "0% Guarantee" }}
          strategyPoints={[
            "Enforcing strict Pydantic v2 data contracts before any LLM inference occurs.",
            "Architecting air-gapped local VPCs and on-premises GPU runtime clusters.",
            "Complete OpenTelemetry distributed tracing across all agent state transitions.",
          ]}
          techStack={[
            { name: "Pydantic v2 Contracts", icon: IconCheck },
            { name: "Deterministic FSMs", icon: IconCpu },
            { name: "Private Air-Gapped VPC", icon: IconShieldLock },
            { name: "OpenTelemetry Tracing", icon: IconTerminal2 },
          ]}
          bio="Leads technical architecture, deterministic agent graphs, and strict schema validation. Engineers private perimeter infrastructure ensuring zero training leakage on proprietary corporate manifests."
          cometColor="#10B981"
          onBookAudit={() => openAuditModal({ bottleneck: "Technical Systems Review with CTO" })}
        />
      </div>

      {/* Synchronized Data-Bus Telemetry Bar */}
      <div className="mt-8 p-4 rounded-2xl bg-[#141416] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9A9892]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E8663D] animate-pulse" />
          <span className="text-[#F4F1EA] font-semibold">Executive Strategy</span>
          <span className="text-white/20">───</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-emerald-400 border border-emerald-500/20">
            ZERO-LEAKAGE LOCAL DATA BUS
          </span>
          <span className="text-white/20">───</span>
          <span className="text-[#F4F1EA] font-semibold">Deterministic Execution</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#5B7B5B]">
          <IconCheck size={13} />
          <span>Both Founders Available for Technical Scoping Calls</span>
        </div>
      </div>
    </section>
  );
}
export default LeadershipTeam;