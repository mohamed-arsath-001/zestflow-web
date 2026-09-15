import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextFlippingBoardProps {
  messages?: string[];
  text?: string;
  intervalMs?: number;
  className?: string;
}

const DEFAULT_METRICS = [
  { label: "SWARM STATUS", value: "ONLINE (99.99%)", tag: "ALL REGIONS ACTIVE" },
  { label: "AVERAGE LATENCY", value: "42MS P99", tag: "SUB-SECOND RAG" },
  { label: "CONSENSUS RATE", value: "99.98% ACCURACY", tag: "PYDANTIC VERIFIED" },
  { label: "WORKFLOW INTEGRITY", value: "100% DETERMINISTIC", tag: "ZERO SCHEMA DRIFT" },
];

export function TextFlippingBoard({
  messages,
  text,
  intervalMs = 3500,
  className = "",
}: TextFlippingBoardProps) {
  const [index, setIndex] = useState(0);

  const items = text
    ? [{ label: "CLUSTER TELEMETRY", value: text, tag: "PRODUCTION" }]
    : messages
    ? messages.map((m) => ({ label: "LIVE TELEMETRY", value: m, tag: "ACTIVE" }))
    : DEFAULT_METRICS;

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  const current = items[index % items.length];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2.5 sm:gap-3.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-sm hover:border-emerald-300 transition-colors">
        {/* Pulsing indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
            {current.label}
          </span>
        </div>

        <span className="text-stone-300">|</span>

        {/* Flipping Value */}
        <div className="h-5 sm:h-6 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.value}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="font-mono text-xs sm:text-sm font-bold text-emerald-800 tracking-tight"
            >
              {current.value}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="hidden sm:inline-block text-stone-300">|</span>

        {/* Tag pill */}
        <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/70">
          {current.tag}
        </span>
      </div>
    </div>
  );
}
