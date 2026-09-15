import { AuditModalProvider } from "./context/AuditModalContext";
import { AuditBookingModal } from "./components/ui/AuditBookingModal";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import FloatingDock from "./components/layout/FloatingDock";
import DottedGlowBackground from "./components/ui/DottedGlowBackground";
import ContactFooter from "./components/sections/ContactFooter";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuditModalProvider>
    <BrowserRouter>
      <ScrollToTop />
      {/* Engineered Atmospheric Background */}
      <DottedGlowBackground />

      <div className="relative min-h-screen bg-transparent text-[#F4F1EA] overflow-x-clip selection:bg-[#E8663D]/30 selection:text-[#F4F1EA]">
        {/* Architectural Minimal Navbar */}
        <Navbar />

        {/* Routed Pages with Dedicated Top Clearance for Fixed Navbar */}
        <main className="relative z-10 pt-20 sm:pt-24">
          <AnimatedRoutes />
        </main>

        {/* Global Technical Footer */}
        <ContactFooter />

        {/* Quick Navigation Dock */}
        <FloatingDock />
      </div>
    </BrowserRouter>
      {/* Global 2-Step Audit Intake & Calendly Modal */}
      <AuditBookingModal />
    </AuditModalProvider>
  );
}
