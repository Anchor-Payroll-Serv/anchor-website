import Link from "next/link";
import { ArrowRight, Heart, Zap, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const principles = [
  {
    icon: Users,
    title: "Focus on Inclusion",
    body: "We are committed to serving everyone, from large enterprises to households employing domestic workers, ensuring financial tools are accessible to all.",
  },
  {
    icon: Zap,
    title: "Commitment to Reliability",
    body: "We believe that payroll is a mission-critical function. Our platform is built for maximum uptime, security, and accuracy, because your team depends on it.",
  },
  {
    icon: Heart,
    title: "Built for Zambia",
    body: "Anchor was born from a simple observation: in a country where mobile money is widespread, payroll systems have not evolved to match. We set out to build the bridge.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">About</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
            Built for a uniquely Zambian problem.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Anchor was born from a simple observation: in a country where mobile money is widespread, payroll systems have not evolved to match. We set out to build the bridge.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-16 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">Our Story</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl mb-6">The gap between payroll and payment.</h2>
            <div className="space-y-4 text-ink-muted leading-relaxed">
              <p>
                Zambia's workforce has embraced mobile money. MTN, Airtel, and Zamtel have put financial tools in the hands of millions. Yet the systems that businesses use to calculate and manage payroll have stayed stuck in the past.
              </p>
              <p>
                The result is a painful gap. A business calculates payroll in a spreadsheet, exports to a CSV, uploads to an MNO portal, and then manually reconciles the results — hoping no formula errors crept in. For domestic workers, there's often no system at all.
              </p>
              <p>
                Anchor is the result of asking a simple question: what if payroll and mobile money lived in the same place? One platform, one audit trail, one source of truth for employers and employees alike.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl p-10 text-white"
            style={{ background: "linear-gradient(135deg, oklch(0.24 0.16 292) 0%, oklch(0.30 0.20 292) 100%)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Our Mission</p>
            <p className="font-display text-2xl font-bold leading-snug mb-6">
              "To provide Zambian businesses of all sizes with a single, reliable platform to manage payroll and pay their people with dignity and accuracy."
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Lusaka, Zambia", "Founded 2024", "MTN · Airtel · Zamtel"].map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">Our Core Principles</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">What guides every decision we make.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border p-8">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-light">
                  <Icon size={20} className="text-brand" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-3">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Want to learn more?</h2>
          <p className="text-ink-muted mb-8">Reach out to our team or schedule a demo to see Anchor in action.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-mid transition-colors">
              Request a Demo <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex h-11 items-center px-6 text-sm font-medium text-ink-muted hover:text-brand transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
