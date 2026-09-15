import { useEffect, useRef } from "react";

interface SquigglyTextProps {
  children: string;
  className?: string;
  color?: string;
}

export function SquigglyText({ children, className = "", color = "#059669" }: SquigglyTextProps) {
  const idRef = useRef(`squiggly-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // No-op
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span>{children}</span>
      <svg
        className="absolute -bottom-2 left-0 w-full overflow-visible"
        height="12"
        aria-hidden="true"
      >
        <path
          d="M 0 6 Q 10 0, 20 6 T 40 6 T 60 6 T 80 6 T 100 6 T 120 6 T 140 6 T 160 6 T 180 6 T 200 6 T 220 6 T 240 6 T 260 6 T 280 6 T 300 6 T 320 6 T 340 6 T 360 6 T 380 6 T 400 6"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
