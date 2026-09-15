import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconLoader2,
  IconRefresh,
} from "@tabler/icons-react";

export interface ContactFormData {
  full_name: string;
  email: string;
  phone: string;
}

export interface ContactFormProps {
  webAppUrl?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: (data: ContactFormData) => void;
  className?: string;
}

export function ContactForm({
  webAppUrl,
  title = "Get in Touch",
  subtitle = "Direct dispatch to our engineering team. We typically respond within 4 hours.",
  onSuccess,
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resolvedUrl =
    webAppUrl ||
    (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL ||
    (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK ||
    "YOUR_WEB_APP_URL";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload: ContactFormData = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    try {
      const response = await fetch(resolvedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status !== 0) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus("success");
      setSuccessMessage(
        "Thank you! Your information has been received. Our team will contact you shortly."
      );
      // Clear input fields upon successful submission
      setFormData({
        full_name: "",
        email: "",
        phone: "",
      });

      if (onSuccess) {
        onSuccess(payload);
      }
    } catch (err: any) {
      console.error("Contact form submission error:", err);
      setStatus("error");
      setErrorMessage(
        err?.message && !err.message.includes("Failed to fetch")
          ? `Submission notice: ${err.message}`
          : "Network connection error. Please check your network and try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div
      className={`relative w-full rounded-2xl bg-[#141416] border border-white/[0.08] p-6 sm:p-8 shadow-2xl shadow-black/50 ${className}`}
      data-testid="contact-form-container"
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F4F1EA] tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-[#9A9892] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mb-6 p-4 rounded-xl bg-[#5B7B5B]/15 border border-[#5B7B5B]/30 text-[#F4F1EA] text-xs sm:text-sm"
            role="status"
            aria-live="polite"
            data-testid="success-message"
          >
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-[#5B7B5B]/20 text-[#5B7B5B] shrink-0 mt-0.5">
                <IconCheck size={18} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="font-semibold text-[#5B7B5B]">Submission Confirmed</div>
                <p className="text-[#9A9892] leading-relaxed">{successMessage}</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8663D] hover:text-[#F27A52] transition cursor-pointer pt-1"
                >
                  <IconRefresh size={13} />
                  <span>Send another message</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Notification */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-[#F4F1EA] text-xs sm:text-sm"
            role="alert"
            data-testid="error-message"
          >
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                <IconAlertCircle size={18} />
              </div>
              <div className="space-y-1 flex-1">
                <div className="font-semibold text-red-400">Communication Error</div>
                <p className="text-[#9A9892] leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
        {/* Full Name */}
        <div>
          <label
            htmlFor="full_name"
            className="block text-xs font-mono text-[#9A9892] mb-1.5 uppercase tracking-wider"
          >
            Full Name <span className="text-[#E8663D]">*</span>
          </label>
          <div className="relative">
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              disabled={status === "submitting"}
              value={formData.full_name}
              onChange={handleChange}
              placeholder="e.g. Marcus Vance"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs sm:text-sm text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] focus:ring-1 focus:ring-[#E8663D]/40 transition disabled:opacity-50"
            />
            <IconUser
              size={16}
              className="absolute right-3.5 top-3 text-[#6B7280] pointer-events-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono text-[#9A9892] mb-1.5 uppercase tracking-wider"
          >
            Email Address <span className="text-[#E8663D]">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={status === "submitting"}
              value={formData.email}
              onChange={handleChange}
              placeholder="lead@enterprise.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs sm:text-sm text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] focus:ring-1 focus:ring-[#E8663D]/40 transition disabled:opacity-50"
            />
            <IconMail
              size={16}
              className="absolute right-3.5 top-3 text-[#6B7280] pointer-events-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-mono text-[#9A9892] mb-1.5 uppercase tracking-wider"
          >
            Phone Number <span className="text-[#E8663D]">*</span>
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              disabled={status === "submitting"}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-white/[0.08] text-xs sm:text-sm text-[#F4F1EA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E8663D] focus:ring-1 focus:ring-[#E8663D]/40 transition disabled:opacity-50"
            />
            <IconPhone
              size={16}
              className="absolute right-3.5 top-3 text-[#6B7280] pointer-events-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E8663D] hover:bg-[#D4552C] text-[#111113] font-bold text-xs sm:text-sm shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_12px_0_rgba(232,102,61,0.3)] transition-all duration-200 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <IconLoader2 size={16} className="animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <IconSend size={15} />
              </>
            )}
          </button>

          <p className="text-[11px] text-[#6B7280] font-mono text-center mt-2.5">
            Encrypted in transit. Direct dispatch to Google Apps Script webhook.
          </p>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
