import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardContainerProps { children: React.ReactNode; className?: string; }

export function CardContainer({ children, className = "" }: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: 1000 }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}

interface CardBodyProps { children: React.ReactNode; className?: string; }

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`relative ${className}`} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
}

interface CardItemProps { children: React.ReactNode; translateZ?: number | string; className?: string; as?: React.ElementType; [key: string]: any; }

export function CardItem({ children, translateZ = 0, className = "", as: Tag = "div", ...props }: CardItemProps) {
  const zVal = typeof translateZ === "number" ? translateZ : parseFloat(translateZ) || 0;
  return <Tag className={className} style={{ transform: `translateZ(${zVal}px)`, transformStyle: "preserve-3d" }} {...props}>{children}</Tag>;
}
