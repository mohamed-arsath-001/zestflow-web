import ContactForm from "../components/ui/ContactForm";
import {
  IconMail,
  IconClock,
  IconShieldLock,
  IconCheck,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-6 sm:pt-10 pb-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-left max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B] border border-white/[0.08] text-[#9A9892] text-xs font-mono mb-4">
          <IconTerminal2 size={13} className="text-[#E8663D]" />
          <span>DIRECT ENGINEERING INTAKE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F4F1EA] tracking-tight leading-tight">
          Connect with Our Core Systems Team
        </h1>
        <p className="mt-4 text-[#9A9892] text-base leading-relaxed">
          Submit your requirements to initiate architecture review. All inquiries route directly to our deployment engineering pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <ContactForm
            title="Inquiry & Architecture Scoping"
            subtitle="Fill out the contact specification below to trigger our Google Apps Script dispatch webhook."
          />
        </div>

        {/* Right Column: Grounded Info & SLAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-xl shadow-black/40">
            <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-3 flex items-center gap-2">
              <IconClock size={18} className="text-[#E8663D]" />
              <span>Response Engineering SLA</span>
            </h3>
            <p className="text-xs text-[#9A9892] leading-relaxed mb-4">
              We respond to qualified industrial teams within 4 business hours with initial architecture feedback and integration feasibility metrics.
            </p>
            <div className="space-y-2.5 text-xs font-mono text-[#F4F1EA]">
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>Deterministic response timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>NDA protected prior to call</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={15} className="text-[#5B7B5B]" />
                <span>VPC perimeter compliance review</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#18181B] border border-white/[0.08] shadow-xl shadow-black/40">
            <h3 className="text-lg font-display font-bold text-[#F4F1EA] mb-3 flex items-center gap-2">
              <IconShieldLock size={18} className="text-[#5B7B5B]" />
              <span>Privacy & Data Security</span>
            </h3>
            <p className="text-xs text-[#9A9892] leading-relaxed">
              Your contact info, email, and phone number are securely transferred using encrypted HTTP POST to our dedicated Google Apps Script Web App. Zero marketing spam or third-party ad network tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
