import { useState } from "react";
import { cn } from "../../lib/utils";

interface FocusCard {
  title: string;
  src: string;
  tag?: string;
  readTime?: string;
}

interface FocusCardsProps {
  cards: FocusCard[];
}

export function FocusCards({ cards }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, index) => {
        const isHovered = hovered === index;
        const isDimmed = hovered !== null && !isHovered;

        return (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "group relative rounded-2xl overflow-hidden bg-[#18181B] border border-white/[0.08] shadow-lg shadow-black/20 transition-all duration-200 flex flex-col justify-between cursor-pointer",
              isDimmed && "opacity-40 scale-[0.98] blur-[1px]",
              isHovered && "scale-[1.01] shadow-2xl shadow-black/40 border-[#E8663D]/40 bg-[#1E1F24]"
            )}
          >
            <div className="overflow-hidden h-48 w-full bg-[#111113]">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover grayscale contrast-110 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="font-semibold text-[#E8663D] bg-[#111113] px-2 py-0.5 rounded border border-white/[0.08] uppercase tracking-wider">
                    {card.tag}
                  </span>
                  <span className="text-[#6B7280]">{card.readTime}</span>
                </div>
                <h3 className="text-base font-display font-bold text-[#F4F1EA] mt-2 leading-snug group-hover:text-white transition-colors">
                  {card.title}
                </h3>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#9A9892] group-hover:text-[#E8663D] transition-colors">
                <span>Read Dispatch</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
