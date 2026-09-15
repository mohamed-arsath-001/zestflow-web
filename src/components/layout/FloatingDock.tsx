import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  IconHome,
  IconCpu,
  IconBolt,
  IconCopy,
  IconCheck,
  IconArrowUp,
} from "@tabler/icons-react";

interface ActionItem {
  title: string;
  sublabel: string;
  icon: any;
  href?: string;
  action?: () => void;
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard?.writeText("https://api.zestflow.ai/v1/cluster/runtime");
    setCopied(true);
    triggerToast("API Endpoint copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunBenchmark = () => {
    triggerToast("Benchmark complete: 100% Deterministic • 42ms P99");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const DOCK_ACTIONS: ActionItem[] = [
    { title: "Home", sublabel: "Return Home", icon: IconHome, href: "/" },
    { title: "Services", sublabel: "Inspect Solutions", icon: IconCpu, href: "/services" },
    {
      title: "Benchmark",
      sublabel: "Run Consensus Test",
      icon: IconBolt,
      action: handleRunBenchmark,
    },
    {
      title: "API Spec",
      sublabel: copied ? "Copied!" : "Copy Endpoint",
      icon: copied ? IconCheck : IconCopy,
      action: handleCopyEndpoint,
    },
    {
      title: "Back to Top",
      sublabel: "Top of Page",
      icon: IconArrowUp,
      action: scrollToTop,
    },
  ];

  return (
    <>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#18181B]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/70"
        >
          {/* Status Pulse Indicator */}
          <div className="hidden sm:flex items-center gap-2 pl-1 pr-2.5 py-1 border-r border-white/[0.08] mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B7B5B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B7B5B]" />
            </span>
            <span className="text-[10px] font-mono text-[#9A9892]">READY</span>
          </div>

          {DOCK_ACTIONS.map((item) => (
            <DockItemButton
              key={item.title}
              item={item}
              mouseX={mouseX}
              active={item.href ? location.pathname === item.href : false}
            />
          ))}
        </motion.div>
      </div>

      {/* Industrial Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[#18181B] border border-[#E8663D]/40 text-[#F4F1EA] text-xs font-mono shadow-2xl shadow-black/80 flex items-center gap-2 pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DockItemButton({
  item,
  mouseX,
  active,
}: {
  item: ActionItem;
  mouseX: any;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [38, 48, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 16 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center rounded-xl transition-colors duration-200 cursor-pointer ${
        active
          ? "bg-[#E8663D] text-[#111113] shadow-md shadow-[#E8663D]/30 font-bold"
          : "text-[#9A9892] hover:text-[#F4F1EA] hover:bg-[#222328]"
      }`}
    >
      <Icon size={18} />
      <span className="sr-only">{item.title}</span>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#18181B] text-[#F4F1EA] text-[10px] font-bold tracking-tight whitespace-nowrap shadow-xl pointer-events-none z-50 font-mono border border-white/[0.08] flex items-center gap-1.5"
        >
          <span>{item.title}</span>
          <span className="text-[#6B7280] font-normal">&bull; {item.sublabel}</span>
        </motion.div>
      )}
    </motion.div>
  );

  if (item.href) {
    return (
      <Link to={item.href} aria-label={item.title}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={item.action} aria-label={item.title}>
      {content}
    </button>
  );
}