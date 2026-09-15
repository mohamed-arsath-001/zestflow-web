import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconCpu, IconDatabase, IconServer, IconClock, IconActivity } from "@tabler/icons-react";

export function MacbookScroll({
  title,
  badge,
}: {
  title?: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Authentic 3D lid unfold transformation
  const lidRotate = useTransform(scrollYProgress, [0.05, 0.42], [28, 0]);
  const lidScale = useTransform(scrollYProgress, [0.05, 0.42], [0.88, 1]);
  const lidY = useTransform(scrollYProgress, [0.05, 0.42], [50, 0]);
  const lidOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.7]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-24 px-4 relative z-10 overflow-hidden"
    >
      {/* Header text */}
      <div className="text-center max-w-3xl mb-14">
        {badge || (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
            <span>NATIVE PLATFORM MONITORING</span>
          </div>
        )}
        {title || (
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
            Hardware-Accelerated Agent Telemetry
          </h2>
        )}
        <p className="mt-4 text-[#9A9892] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Monitor live agent execution graphs, inspect vector throughput, and govern automated cutovers in real time.
        </p>
      </div>

      {/* 3D Perspective Hardware Laptop Stage */}
      <div
        style={{ perspective: "1400px" }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* LID / SCREEN (Scroll-Linked Unfolding Motion) */}
        <motion.div
          style={{
            rotateX: lidRotate,
            scale: lidScale,
            y: lidY,
            opacity: lidOpacity,
            transformOrigin: "bottom center",
          }}
          className="w-full relative z-20"
        >
          <div className="rounded-t-[24px] rounded-b-[4px] bg-[#1B1C20] border-2 border-b-0 border-[#2A2B30] p-3 shadow-2xl shadow-black/90">
            {/* Bezel */}
            <div className="rounded-t-[18px] bg-[#0A0A0C] border border-white/[0.08] p-1.5 relative overflow-hidden">
              {/* Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#111113] rounded-b-md flex items-center justify-center z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white/[0.15]" />
              </div>

              {/* Retina Display: Live Operations Console */}
              <div className="rounded-t-[14px] bg-[#111113] p-4 sm:p-6 font-mono text-xs text-[#F4F1EA] min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8663D] shadow-[0_0_8px_rgba(232,102,61,0.6)]" />
                    <span className="text-[11px] font-bold text-[#F4F1EA] tracking-tight">
                      ZESTFLOW OPERATIONS RUNTIME // CLUSTER-PROD-09
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#9A9892]">
                    <span className="flex items-center gap-1.5">
                      <IconActivity size={13} className="text-[#5B7B5B]" />
                      <span>Uptime 99.99%</span>
                    </span>
                    <span className="text-[#4B5563]">|</span>
                    <span className="text-[#5B7B5B]">AWS PrivateLink: OK</span>
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4">
                  {/* Left: Swarm DAG */}
                  <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2.5 font-bold">
                        Active Swarm DAG
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#F4F1EA]">Supervisor Root</span>
                          <span className="text-[#5B7B5B] text-[10px] font-bold">IDLE</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#F4F1EA]">RAG Context Miner</span>
                          <span className="text-[#F27A52] text-[10px] font-bold">CHUNKING</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#F4F1EA]">Critic Consensus</span>
                          <span className="text-[#5B7B5B] text-[10px] font-bold">0.998 MATCH</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#F4F1EA]">Pydantic Schema</span>
                          <span className="text-[#5B7B5B] text-[10px] font-bold">PASS</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] text-[10px] text-[#9A9892] flex justify-between">
                      <span>Total Trace:</span>
                      <span className="text-[#F27A52] font-bold">42ms</span>
                    </div>
                  </div>

                  {/* Center: Throughput Histogram */}
                  <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2 text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                        <span>Throughput Stream</span>
                        <span className="text-[#F27A52]">84.2 req/s</span>
                      </div>
                      <div className="h-20 flex items-end gap-1 pt-4">
                        {[40, 65, 55, 80, 70, 95, 85, 60, 75, 90, 100, 85, 70, 80, 95, 60, 85].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-xs transition-all ${
                              i === 10 ? "bg-[#E8663D]" : "bg-[#2A2B30] hover:bg-[#4B5563]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#9A9892] pt-2 border-t border-white/[0.06]">
                      <span>P50: 18ms</span>
                      <span>P95: 36ms</span>
                      <span className="text-[#F4F1EA] font-bold">P99: 42ms</span>
                    </div>
                  </div>

                  {/* Right: Storage & Memory */}
                  <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2.5 font-bold">
                        Vector Cache
                      </div>
                      <div className="space-y-2.5 text-[11px]">
                        <div>
                          <div className="flex justify-between text-[10px] text-[#9A9892] mb-1">
                            <span>pgvector HNSW</span>
                            <span className="text-[#F4F1EA] font-semibold">12.4M</span>
                          </div>
                          <div className="w-full bg-[#2A2B30] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#5B7B5B] w-[78%] h-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] text-[#9A9892] mb-1">
                            <span>Redis Semantic Cache</span>
                            <span className="text-[#F27A52] font-semibold">94.2%</span>
                          </div>
                          <div className="w-full bg-[#2A2B30] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#E8663D] w-[94%] h-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                      <span className="text-[#6B7280]">Circuit Breaker:</span>
                      <span className="text-[#5B7B5B] font-bold">ARMED</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Console Strip */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-[#6B7280]">
                  <span>[13:42:08] Inbound SAP manifest dispatched &bull; Latency 38.4ms &bull; Status: COMMITTED</span>
                  <span className="text-[#F27A52] font-bold">AIR-GAP ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LAPTOP CHASSIS / KEYBOARD BASE */}
        <div className="w-full relative z-10 -mt-1">
          {/* Main Aluminum Deck */}
          <div className="w-full rounded-b-[24px] bg-[#1E1F24] border-2 border-t-0 border-[#2A2B30] p-4 sm:p-6 shadow-2xl shadow-black/80">
            {/* Keyboard Well & Perforations */}
            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Left Speaker Perforations */}
              <div className="col-span-1 hidden sm:grid grid-cols-2 gap-1 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-white" />
                ))}
              </div>

              {/* Center Keyboard Deck */}
              <div className="col-span-12 sm:col-span-10 bg-[#141518] rounded-xl p-2.5 border border-white/[0.06] shadow-inner">
                {/* Function Key Row */}
                <div className="flex gap-1 mb-1">
                  {["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((k) => (
                    <div
                      key={k}
                      className="flex-1 h-4 rounded-[3px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center"
                    >
                      {k}
                    </div>
                  ))}
                  <div className="w-6 h-4 rounded-[3px] bg-[#111113] border border-[#E8663D]/40 text-[7px] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
                  </div>
                </div>

                {/* Number Row */}
                <div className="flex gap-1 mb-1">
                  {["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"].map((k) => (
                    <div
                      key={k}
                      className="flex-1 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[8px] text-[#9A9892] font-mono flex items-center justify-center"
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* QWERTY Row */}
                <div className="flex gap-1 mb-1">
                  {["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((k) => (
                    <div
                      key={k}
                      className="flex-1 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[8px] text-[#9A9892] font-mono flex items-center justify-center"
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* ASDF Row */}
                <div className="flex gap-1 mb-1">
                  {["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"].map((k) => (
                    <div
                      key={k}
                      className="flex-1 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[8px] text-[#9A9892] font-mono flex items-center justify-center"
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* Spacebar Row */}
                <div className="flex gap-1">
                  <div className="w-10 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center">control</div>
                  <div className="w-10 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center">option</div>
                  <div className="w-12 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center">command</div>
                  <div className="flex-1 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04]" />
                  <div className="w-12 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center">command</div>
                  <div className="w-10 h-5 rounded-[4px] bg-[#1C1D22] border border-white/[0.04] text-[7px] text-[#6B7280] font-mono flex items-center justify-center">option</div>
                </div>
              </div>

              {/* Right Speaker Perforations */}
              <div className="col-span-1 hidden sm:grid grid-cols-2 gap-1 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-white" />
                ))}
              </div>
            </div>

            {/* Precision Aluminum Glass Trackpad */}
            <div className="mx-auto mt-4 w-40 sm:w-56 h-16 sm:h-20 rounded-xl bg-[#141518] border border-white/[0.08] shadow-inner" />
          </div>

          {/* Front Opening Notch */}
          <div className="relative mx-auto w-24 h-1.5 bg-[#141518] rounded-b-md border-t border-white/[0.1] -mt-1" />
        </div>
      </div>
    </div>
  );
}