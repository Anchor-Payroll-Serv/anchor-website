import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Contact</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl mb-6">
            Let&apos;s talk.
          </h1>
          <p className="text-lg text-white/65 max-w-xl leading-relaxed">
            Whether you have a question, want a demo, or are ready to get started, we are here to help.
          </p>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-12 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3 rounded-2xl bg-white border border-border p-8">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-5">Contact Information</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand-deep flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">Email</p>
                    <a href="mailto:info@anchorpayroll.com" className="text-sm font-medium text-ink hover:text-brand transition-colors">info@anchorpayroll.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand-deep flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-ink">Placeholder Phone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand-deep flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">Location</p>
                    <p className="text-sm font-medium text-ink">Lusaka, Zambia</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: "linear-gradient(135deg, oklch(0.24 0.16 292) 0%, oklch(0.30 0.20 292) 100%)" }}
            >
              <p className="font-display text-base font-bold mb-2">Ready to see Anchor in action?</p>
              <p className="text-sm text-white/65 mb-4">The best way to understand the power of Anchor is to see it for yourself.</p>
              <a
                href="/demo"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-amber text-brand-deep text-sm font-semibold px-4 hover:bg-amber-dark transition-colors"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
