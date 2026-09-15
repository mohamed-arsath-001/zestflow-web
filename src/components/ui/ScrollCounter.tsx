import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface ScrollCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  reverseFrom?: number;
  className?: string;
}

export function ScrollCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  reverseFrom,
  className = "",
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Only triggers when user scrolls the element into active view
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  const initialText =
    reverseFrom !== undefined
      ? prefix + reverseFrom.toFixed(decimals) + suffix
      : prefix + (0).toFixed(decimals) + suffix;

  const [displayValue, setDisplayValue] = useState<string>(initialText);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(prefix + value.toFixed(decimals) + suffix);
      return;
    }

    const startVal = reverseFrom !== undefined ? reverseFrom : 0;
    const controls = animate(startVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Snappy cubic bezier curve
      onUpdate: (latest) => {
        setDisplayValue(prefix + latest.toFixed(decimals) + suffix);
      },
    });

    return () => controls.stop();
  }, [isInView, value, prefix, suffix, decimals, duration, reverseFrom]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
