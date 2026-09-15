import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const CHAPTERS = [
  { id: "spark", num: "01", title: "THE SPARK" },
  { id: "proof", num: "02", title: "THE PROOF" },
  { id: "machine", num: "03", title: "THE MACHINE" },
  { id: "architecture", num: "04", title: "THE ARCHITECTURE" },
  { id: "receipts", num: "05", title: "THE RECEIPTS" },
  { id: "watch", num: "06", title: "THE WATCH" },
  { id: "voices", num: "07", title: "THE VOICES" },
  { id: "handoff", num: "08", title: "THE HANDOFF" },
];

export function ChapterProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 120);

      // Check which chapter section is currently in view
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapter(CHAPTERS[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Thin Signal Amber Laser Progress Line at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E8663D] via-[#F27A52] to-[#E8663D] origin-left z-[70] pointer-events-none"
        style={{ scaleX }}
      />

      {/* 2. Floating Minimal Chapter HUD Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -10,
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-4 left-4 sm:left-8 z-[65] pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111113]/85 backdrop-blur-md border border-white/[0.08] shadow-lg shadow-black/40"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8663D] animate-pulse" />
        <span className="font-mono text-[10px] text-[#F27A52] font-semibold">
          CH {activeChapter.num}
        </span>
        <span className="text-[#4B5563] text-[10px]">&bull;</span>
        <span className="font-mono text-[10px] text-[#F4F1EA] font-medium tracking-wider">
          {activeChapter.title}
        </span>
      </motion.div>
    </>
  );
}
