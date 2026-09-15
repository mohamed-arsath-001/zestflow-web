import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface CarouselCard {
  category?: string;
  title: string;
  src: string;
  content?: React.ReactNode;
}

export function Card({ card }: { card: CarouselCard; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setOpen(true)}
        whileHover={{ y: -3 }}
        className="group relative flex-shrink-0 w-72 sm:w-80 h-96 rounded-2xl overflow-hidden bg-[#18181B] border border-white/[0.08] shadow-xl shadow-black/30 hover:border-[#E8663D]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
      >
        <div className="p-6 relative z-10">
          {card.category && (
            <p className="text-[11px] font-mono text-[#E8663D] uppercase tracking-wider mb-1.5 font-semibold">
              {card.category}
            </p>
          )}
          <h3 className="text-base font-display font-bold text-[#F4F1EA] group-hover:text-white transition-colors leading-snug">
            {card.title}
          </h3>
        </div>

        <div className="relative h-56 w-full overflow-hidden bg-[#111113]">
          <img
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        </div>
      </motion.div>

      {/* Modal View */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#0E0E10]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#18181B] rounded-2xl border border-white/[0.1] shadow-2xl p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-4">
              <div>
                {card.category && (
                  <p className="text-[11px] font-mono text-[#E8663D] uppercase tracking-wider mb-1 font-semibold">
                    {card.category}
                  </p>
                )}
                <h2 className="text-xl font-display font-bold text-[#F4F1EA]">{card.title}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-[#9A9892] hover:text-[#F4F1EA] hover:bg-white/[0.06] transition"
              >
                <IconX size={18} />
              </button>
            </div>
            <div className="mt-4">{card.content}</div>
          </div>
        </div>
      )}
    </>
  );
}

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 no-scrollbar scroll-smooth"
      >
        {items}
      </div>
    </div>
  );
}
