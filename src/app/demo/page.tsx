import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "Request a Demo" };

const highlights = [
  "Personalized walkthrough tailored to your organization",
  "See live payroll calculations and mobile money disbursements",
  "Ask questions directly to our team",
  "No commitment required",
];

export default function DemoPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Demo</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl mb-6">
            See Anchor in action.
          </h1>
          <p className="text-lg text-white/65 max-w-xl leading-relaxed">
            Fill out the form below to schedule a personalized demo with our team. We'll show you exactly how Anchor fits your organization.
          </p>
        </div>
      </section>

      {/* ── Form + Highlights ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-12 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3 rounded-2xl bg-white border border-border p-8">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Request a Demo</h2>
            <DemoForm />
          </div>

          {/* Highlights */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-5">What to expect</p>
              <ul className="space-y-4">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-ink-muted leading-relaxed">{h}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-light border border-amber/20 p-6">
              <p className="font-display text-base font-bold text-ink mb-2">Prefer to talk first?</p>
              <p className="text-sm text-ink-muted mb-3">Reach out directly and we'll be in touch shortly.</p>
              <a href="mailto:info@anchorpayroll.com" className="text-sm font-semibold text-brand hover:text-brand-mid transition-colors">
                info@anchorpayroll.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
