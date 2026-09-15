import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  const isActive = (index: number) => index === active;

  const rotations = [-4, 3, -6, 5, -2];

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#18181B] rounded-2xl border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/50">
        {/* Left: 3D Stacked Deck of Executive Portraits (4 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => {
                const isCurrent = isActive(index);
                const rot = rotations[index % rotations.length];
                return (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rot,
                    }}
                    animate={{
                      opacity: isCurrent ? 1 : 0.55,
                      scale: isCurrent ? 1 : 0.93,
                      z: isCurrent ? 0 : -100,
                      rotate: isCurrent ? 0 : rot,
                      zIndex: isCurrent ? 30 : testimonials.length + 2 - index,
                      y: isCurrent ? [0, -4, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      rotate: rot * 2,
                      z: 100,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom rounded-2xl overflow-hidden border border-white/[0.12] bg-[#111113] shadow-2xl"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full object-cover object-center grayscale contrast-115 brightness-95"
                    />
                    <div className="absolute inset-0 bg-[#E8663D]/[0.06] mix-blend-color" />
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-[#111113]/90 border border-white/[0.08] text-[10px] font-mono text-[#F4F1EA] flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5B]" />
                      <span>VERIFIED OPERATOR</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Large Editorial Pull-Quote Typography (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between text-left">
          <motion.div
            key={active}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col justify-between min-h-[180px]"
          >
            {/* Pull Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#F4F1EA] leading-[1.35] tracking-tight">
              "{testimonials[active].quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-lg text-[#F4F1EA]">
                  {testimonials[active].name}
                </h4>
                <p className="text-xs font-mono text-[#F27A52] mt-0.5 font-semibold">
                  {testimonials[active].designation}
                </p>
              </div>

              {/* Minimal Editorial Carousel Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-lg bg-[#111113] border border-white/[0.08] flex items-center justify-center text-[#9A9892] hover:text-[#F4F1EA] hover:border-white/[0.2] transition"
                  aria-label="Previous testimonial"
                >
                  <IconArrowLeft size={16} />
                </button>
                <div className="text-xs font-mono text-[#6B7280] px-2">
                  <span className="text-[#F4F1EA] font-bold">0{active + 1}</span> / 0{testimonials.length}
                </div>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-lg bg-[#111113] border border-white/[0.08] flex items-center justify-center text-[#9A9892] hover:text-[#F4F1EA] hover:border-white/[0.2] transition"
                  aria-label="Next testimonial"
                >
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}