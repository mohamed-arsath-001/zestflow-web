import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuditModal, AuditFormData } from "../../context/AuditModalContext";
import {
  IconX,
  IconCheck,
  IconArrowRight,
  IconBuildingFactory2,
  IconMail,
  IconPhone,
  IconUser,
  IconAlertCircle,
  IconExternalLink,
  IconArrowLeft,
} from "@tabler/icons-react";

export function AuditBookingModal() {
  const { isOpen, closeAuditModal, initialData } = useAuditModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);

  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const [formData, setFormData] = useState<AuditFormData>({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        phone: initialData.phone || prev.phone || "",
      }));
    }
  }, [initialData]);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorNotice(null);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuditModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeAuditModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorNotice(null);

    const submissionPayload = {
      full_name: formData.fullName || formData.full_name || "",
      email: formData.workEmail || formData.email || "",
      phone: formData.phone || "",
      fullName: formData.fullName,
      workEmail: formData.workEmail,
      companyName: formData.companyName,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // 1. Always save to local backup ledger
    try {
      const existing = JSON.parse(localStorage.getItem("zestflow_audit_submissions") || "[]");
      existing.push(submissionPayload);
      localStorage.setItem("zestflow_audit_submissions", JSON.stringify(existing));
    } catch (err) {
      console.warn("Local persistence warning:", err);
    }

    // 2. Send POST request to Google Apps Script Web App URL with text/plain;charset=utf-8
    const webhookUrl =
      (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL ||
      (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK ||
      "YOUR_WEB_APP_URL";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok && response.status !== 0) {
        console.warn("Server responded with non-200 code:", response.status);
      }
    } catch (err: any) {
      console.warn("Google Apps Script webhook network notice:", err);
      // Handled gracefully without crashing intake progression
    }

    setSubmitting(false);
    setStep(2);
  };

  // Construct Calendly URL with prefilled candidate information
  const calendlyBaseUrl = "https://calendly.com/theeforgers/30min";
  const calendlyUrl = `${calendlyBaseUrl}?name=${encodeURIComponent(
    formData.fullName
  )}&email=${encodeURIComponent(formData.workEmail)}&a1=${encodeURIComponent(
    formData.companyName
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuditModal}
            className="fixed inset-0 bg-[#0B0B0C]/80 backdrop-blur-md -z-10"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#141416] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeAuditModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#9A9892] hover:text-[#F4F1EA] hover:bg-white/[0.06] transition"
              aria-label="Close modal"
            >
              <IconX size={18} />
            </button>

            {step === 1 ? (
              /* STEP 1: Streamlined Operational Contact Intake */
              <div>
                <div className="mb-6 pr-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-3">
                    <IconBuildingFactory2 size={13} className="text-[#E8663D]" />
                    <span>STEP 1 OF 2 // OPERATIONAL INTAKE</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4F1EA] tracking-tight">
                    Schedule <span className="font-serif italic font-normal text-[#E8663D]">Operations Audit</span>
                  </h2>
                  <p className="text-[#9A9892] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Enter your facility details to log with our engineering pipeline. In the next step, you will select your 30-minute scoping call directly on our calendar.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono text-[#9A9892] mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. Marcus Vance"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] transition"
                        />
                        <IconUser
                          size={15}
                          className="absolute right-3.5 top-3 text-[#6B7280]"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-mono text-[#9A9892] mb-1.5">
                        Work Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formData.workEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, workEmail: e.target.value })
                          }
                          placeholder="lead@logistics-co.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] transition"
                        />
                        <IconMail
                          size={15}
                          className="absolute right-3.5 top-3 text-[#6B7280]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-mono text-[#9A9892] mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] transition"
                        />
                        <IconPhone
                          size={15}
                          className="absolute right-3.5 top-3 text-[#6B7280]"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-mono text-[#9A9892] mb-1.5">
                        Company / Distribution Hub *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g. Apex Global Freight or Plant 4A"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] transition"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-sm shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_12px_0_rgba(232,102,61,0.3)] transition-all cursor-pointer active:scale-98"
                    >
                      <span>Continue to Calendar Booking</span>
                      <IconArrowRight size={16} />
                    </button>
                    <p className="text-[11px] text-[#6B7280] font-mono text-center mt-2.5">
                      All audit discussions protected under mutual non-disclosure (NDA).
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* STEP 2: Embedded Calendly Booking Confirmation */
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-1 border border-emerald-500/20">
                      <IconCheck size={12} />
                      <span>INTAKE CONFIRMED // PROCEED TO CALENDAR</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#F4F1EA]">
                      Pick a 30-Minute Scoping Slot
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-mono text-[#9A9892] hover:text-[#F4F1EA] transition cursor-pointer"
                  >
                    <IconArrowLeft size={14} />
                    <span>Edit Info</span>
                  </button>
                </div>

                {/* Direct Action Link Banner */}
                <div className="p-3.5 mb-4 rounded-xl bg-[#18181B] border border-white/[0.08] flex items-center justify-between gap-3 text-xs">
                  <div className="text-[#9A9892] font-mono text-[11px]">
                    Logged for: <span className="text-[#F4F1EA] font-semibold">{formData.fullName}</span> ({formData.companyName})
                  </div>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8663D] text-[#111113] font-bold text-xs hover:bg-[#D4552C] transition shrink-0"
                  >
                    <span>Open in New Tab</span>
                    <IconExternalLink size={13} />
                  </a>
                </div>

                {/* Inline Calendly Frame */}
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0E10] h-[480px]">
                  <iframe
                    src={calendlyUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Calendly Scheduling"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default AuditBookingModal;
