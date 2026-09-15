import { useRef, useEffect } from "react";

export default function ParallaxHeroImages() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      const elements = containerRef.current.querySelectorAll<HTMLElement>("[data-depth]");
      elements.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0.05");
        const moveX = normX * depth * 35;
        const moveY = normY * depth * 35;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Left Periphery Floating Architecture Pill */}
      <div
        data-depth="0.08"
        style={{ left: "2%", top: "24%" }}
        className="hidden xl:block absolute pointer-events-none will-change-transform opacity-75"
      >
        <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-stone-200/90 shadow-lg shadow-stone-900/5 w-52">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-emerald-800 font-semibold px-2 py-0.5 rounded bg-emerald-50">NODE_01</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-xs font-bold text-stone-800">pgvector HNSW</div>
          <div className="text-[10px] text-stone-500 font-mono mt-0.5">Latency: 3.8ms • Cosine: 0.99</div>
        </div>
      </div>

      {/* Right Periphery Floating DAG Pill */}
      <div
        data-depth="-0.07"
        style={{ right: "2%", top: "28%" }}
        className="hidden xl:block absolute pointer-events-none will-change-transform opacity-75"
      >
        <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-stone-200/90 shadow-lg shadow-stone-900/5 w-56">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-teal-800 font-semibold px-2 py-0.5 rounded bg-teal-50">SWARM_CONSENSUS</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">100% OK</span>
          </div>
          <div className="text-xs font-bold text-stone-800">LangGraph Supervisor</div>
          <div className="text-[10px] text-stone-500 font-mono mt-0.5">3 Models Agreed • 0 Retries</div>
        </div>
      </div>

      {/* Subtle organic ambient glows */}
      <div className="absolute top-[20%] left-[8%] w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[8%] w-80 h-80 rounded-full bg-amber-200/15 blur-3xl pointer-events-none" />
    </div>
  );
}
