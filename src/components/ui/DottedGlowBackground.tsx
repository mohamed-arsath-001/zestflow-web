import { useEffect, useRef } from "react";

export default function DottedGlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const spacing = 36;
    const dotColor = "rgba(244, 241, 234, 0.06)"; // visible subtle coordinate dots
    const activeDotColor = "rgba(232, 102, 61, 0.45)"; // high-tactility signal amber node

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            ctx.fillStyle = activeDotColor;
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + factor * 1.6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x, y, 0.85, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#111113]">
      {/* Engineered Atmospheric Glow Orbs */}
      <div className="absolute -top-[10%] left-[15%] w-[45vw] h-[40vh] rounded-full bg-[#E8663D]/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] -right-[5%] w-[40vw] h-[45vh] rounded-full bg-[#222328]/80 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[20%] w-[50vw] h-[35vh] rounded-full bg-[#E8663D]/[0.04] blur-[160px] pointer-events-none" />

      {/* Dynamic interactive grid coordinate dots */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Industrial Hairline Grid Overlay */}
      <div className="absolute inset-0 industrial-grid pointer-events-none opacity-40" />
    </div>
  );
}