import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface ExpandableCard {
  category?: string;
  title: string;
  badge?: string;
  description: string;
  src: string;
  ctaText?: string;
  content?: React.ReactNode;
}

export function ExpandableCards({ cards }: { cards: ExpandableCard[] }) {
  const [active, setActive] = useState<ExpandableCard | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0E0E10]/80 backdrop-blur-md z-50"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-2xl max-h-[85vh] overflow-auto bg-[#18181B] rounded-2xl border border-white/[0.1] shadow-2xl shadow-black/60"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="bg-[#111113]">
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-56 object-cover rounded-t-2xl grayscale contrast-110 opacity-90"
                />
              </motion.div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-4">
                  <div>
                    {active.category && (
                      <p className="text-[11px] font-mono text-[#E8663D] uppercase tracking-wider mb-1 font-semibold">
                        {active.category}
                      </p>
                    )}
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-xl font-display font-bold text-[#F4F1EA]"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="p-2 rounded-lg hover:bg-white/[0.06] text-[#9A9892] hover:text-[#F4F1EA] transition-colors"
                  >
                    <IconX size={20} />
                  </button>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  {active.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            whileHover={{ y: -2 }}
            className="cursor-pointer rounded-2xl bg-[#18181B] border border-white/[0.08] hover:border-[#E8663D]/40 transition-all duration-200 overflow-hidden shadow-lg shadow-black/20 group flex flex-col justify-between"
          >
            <motion.div layoutId={`image-${card.title}-${id}`} className="overflow-hidden bg-[#111113]">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-44 object-cover grayscale contrast-110 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
            </motion.div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {card.category && (
                  <p className="text-[10px] font-mono text-[#E8663D] uppercase tracking-wider mb-1 font-semibold">
                    {card.category}
                  </p>
                )}
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-base font-display font-bold text-[#F4F1EA] group-hover:text-white transition-colors"
                >
                  {card.title}
                </motion.h3>
                <p className="text-xs text-[#9A9892] mt-2 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
              {card.badge && (
                <span className="inline-block mt-4 self-start text-[10px] font-mono font-semibold text-[#9A9892] bg-[#111113] px-2.5 py-1 rounded-md border border-white/[0.08]">
                  {card.badge}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
