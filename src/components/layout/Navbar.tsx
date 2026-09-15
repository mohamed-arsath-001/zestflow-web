import { useAuditModal } from "../../context/AuditModalContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconArrowUpRight } from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Services", path: "/services" },
  { label: "About Us", path: "/about-us" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { openAuditModal } = useAuditModal();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 30);
    });
  }, [scrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-none">
        {/* Ambient top gradient mask for smooth text roll-under */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0B0B0C] via-[#0B0B0C]/85 to-transparent pointer-events-none -z-10" />
        {/* Resizable Navbar: expands wide at top, shrinks to compact capsule on scroll */}
        <motion.nav
          layout
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            maxWidth: scrolled ? "48rem" : "64rem",
            height: scrolled ? "3.25rem" : "4rem",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto transition-colors duration-300 w-full rounded-2xl flex items-center justify-between px-4 sm:px-6 border ${
            scrolled
              ? "bg-[#111113]/90 backdrop-blur-xl border-white/[0.08] shadow-2xl shadow-black/50"
              : "bg-[#18181B]/80 backdrop-blur-lg border-white/[0.06] shadow-lg shadow-black/20"
          }`}
        >
          {/* Official ZestFlow Brand Mark */}
          <Link to="/" className="flex items-center group">
            <img
              src="/ZestFlow Logo.png"
              alt="ZestFlow"
              className="h-8 sm:h-9 w-auto object-contain mix-blend-screen transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <span className="sr-only">ZestFlow</span>
            
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-[#111113]/70 p-1 rounded-xl border border-white/[0.06]">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? "text-[#F4F1EA] font-semibold"
                      : "text-[#9A9892] hover:text-[#F4F1EA]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#222328] rounded-lg border border-white/[0.08] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Signal CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openAuditModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#E8663D] text-[#111113] hover:bg-[#F27A52] transition-colors duration-200 shadow-md shadow-[#E8663D]/20 font-sans cursor-pointer"
            >
              <span>Audit Architecture</span>
              <IconArrowUpRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#9A9892] hover:text-[#F4F1EA] hover:bg-white/[0.04]"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-2xl shadow-black/60 md:hidden flex flex-col gap-3 backdrop-blur-2xl"
          >
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                    active
                      ? "text-[#F4F1EA] bg-[#222328] font-semibold"
                      : "text-[#9A9892] hover:text-[#F4F1EA]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => { setMobileOpen(false); openAuditModal(); }}
              className="mt-2 text-center py-2.5 rounded-lg text-xs font-bold bg-[#E8663D] text-[#111113] cursor-pointer"
            >
              Audit Architecture
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}