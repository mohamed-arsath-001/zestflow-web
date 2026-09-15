import { cn } from "../../lib/utils";

interface ShimmerLoaderProps {
  className?: string;
}

export function ShimmerLoader({ className }: ShimmerLoaderProps) {
  return (
    <div className={cn("shimmer rounded-2xl bg-zinc-100 border border-zinc-200/50", className)} />
  );
}
