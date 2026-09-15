import { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface GooeyInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  buttonLabel?: string;
}

export function GooeyInput({
  placeholder = "Enter your work email...",
  onSubmit,
  buttonLabel = "Request Access",
}: GooeyInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scale = useSpring(1, { stiffness: 400, damping: 25 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(true);
    onSubmit?.(value);
    scale.set(0.97);
    setTimeout(() => scale.set(1), 150);
  };

  return (
    <motion.form
      style={{ scale }}
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full max-w-md rounded-xl bg-[#18181B] border p-1 transition-all duration-200 ${
        focused
          ? "border-[#E8663D]/60 shadow-[0_0_12px_rgba(232,102,61,0.15)] ring-1 ring-[#E8663D]/40"
          : "border-white/[0.08] shadow-md hover:border-white/[0.14]"
      }`}
    >
      <input
        ref={inputRef}
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3.5 py-2 text-xs sm:text-sm text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none font-medium"
      />

      <button
        type="submit"
        disabled={submitted}
        className="shrink-0 px-4 py-2 rounded-lg bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-xs transition-all duration-150 active:scale-95 disabled:opacity-80 cursor-pointer shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset]"
      >
        {submitted ? "Received" : buttonLabel}
      </button>
    </motion.form>
  );
}
