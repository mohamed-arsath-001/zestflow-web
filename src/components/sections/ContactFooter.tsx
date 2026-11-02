import { Link } from "react-router-dom";
import { useAuditModal } from "../../context/AuditModalContext";
import {
  IconBrandLinkedin,
  IconArrowUpRight,
  IconShieldCheck,
  IconCpu,
  IconLock,
} from "@tabler/icons-react";

export default function ContactFooter() {
  const { openAuditModal } = useAuditModal();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0E0E10] pt-20 pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E8663D]/[0.04] blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center gap-3 mb-14 pb-10 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.06] text-[10px] font-mono text-[#6B7280]">
            <IconShieldCheck size={13} className="text-[#5B7B5B]" />
            <span>SOC 2 Ready Architecture</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.06] text-[10px] font-mono text-[#6B7280]">
            <IconLock size={13} className="text-[#5B7B5B]" />
            <span>Zero Data Retention</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.06] text-[10px] font-mono text-[#6B7280]">
            <IconCpu size={13} className="text-[#E8663D]" />
            <span>Local VPC / On-Premises Deployment</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.06] text-[10px] font-mono text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B] animate-pulse" />
            <span>99.98% Uptime SLA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-5">
            <Link to="/" className="flex items-center">
              <img src="/ZestFlow Logo.png" alt="ZestFlow" className="h-7 w-auto object-contain mix-blend-screen" />
              <span className="sr-only">ZestFlow</span>
            </Link>
            <p className="text-[#9A9892] text-sm max-w-sm leading-relaxed">
              Engineering high-throughput autonomous agents, intelligent workflow orchestration, and private LLM infrastructure for modern enterprise teams.
            </p>
            {/* Only LinkedIn */}
            <div className="flex items-center gap-2.5 pt-1 text-[#9A9892]">
              <a
                href="https://www.linkedin.com/company/zestflow/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#18181B] border border-white/[0.08] text-[#9A9892] hover:text-[#F4F1EA] hover:border-[#E8663D]/40 hover:bg-[#1E1E22] transition group"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={15} className="group-hover:text-[#0A66C2] transition-colors" />
                <span className="text-[11px] font-mono text-[#6B7280] group-hover:text-[#9A9892] transition-colors">Follow on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-semibold">
              Platform Architecture
            </div>
            <ul className="space-y-2.5 text-sm text-[#9A9892] font-medium">
              <li>
                <Link to="/" className="hover:text-[#F4F1EA] transition">Overview</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#F4F1EA] transition">How It Works & Comparison</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F4F1EA] transition">Agent Services & Systems</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#F4F1EA] transition">About Team & Mission</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4F1EA] transition">Direct Contact Form</Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement Column */}
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-semibold">
              Operations Audit
            </div>
            <p className="text-sm text-[#9A9892] leading-relaxed">
              Book a 30-minute scoping call with our engineering team or send a direct dispatch inquiry.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => openAuditModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-xs shadow-md shadow-[#E8663D]/20 transition cursor-pointer"
              >
                <span>Schedule Audit Call</span>
                <IconArrowUpRight size={14} />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#222328] border border-white/[0.08] text-[#F4F1EA] font-semibold text-xs transition"
              >
                <span>Contact Form</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] font-mono">
          <div>
            &copy; {new Date().getFullYear()} ZestFlow Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B]" />
              Systems Operational
            </span>
            <span>•</span>
            <span>Pydantic v2 Enforcement</span>
            <span>•</span>
            <span>PostgreSQL State Persistence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
