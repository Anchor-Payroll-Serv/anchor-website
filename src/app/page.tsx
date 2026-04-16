import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { DisbursementCard } from "@/components/disbursement-card";

export const metadata: Metadata = {
  title: "Anchor Payroll | Payroll and Mobile Money Payments in One System",
};

const problems = [
  {
    title: "Disconnected tools",
    body: "Payroll calculation and mobile money payments live in entirely separate systems, forcing time-consuming reconciliation every month.",
  },
  {
    title: "MNO portals miss payroll logic",
    body: "MTN, Airtel, and Zamtel portals handle bulk payments but can't calculate deductions, generate payslips, or maintain audit trails.",
  },
  {
    title: "Compliance gaps",
    body: "Without a centralized system, building payment history for NAPSA and NHIMA filings is difficult — and leaves businesses exposed.",
  },
];

const steps = [
  { num: "01", title: "Add employees", body: "Onboard full-time staff, casual workers, or domestic employees in minutes." },
  { num: "02", title: "Configure rules", body: "Set earnings, deductions, and contributions. Anchor handles the calculations automatically." },
  { num: "03", title: "Validate & fund", body: "Review payroll totals, catch errors, then make one transfer to your payroll wallet." },
  { num: "04", title: "Disburse & monitor", body: "Pay every worker across MTN, Airtel, and Zamtel with one click. Track each payment in real time." },
];

const stats = [
  { value: "3 networks", label: "MTN · Airtel · Zamtel" },
  { value: "1 click", label: "to disburse all workers" },
  { value: "Zero", label: "spreadsheets needed" },
  { value: "100%", label: "NAPSA & NHIMA ready" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-deep">
        {/* Subtle ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 40%, oklch(0.50 0.22 292 / 0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-32 pb-24 md:pt-44 md:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: content — staggered CSS entrance */}
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-medium text-amber mb-8 animate-fade-up"
                style={{ "--delay": "0ms" } as React.CSSProperties}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                Built for Zambia&apos;s payroll reality
              </div>

              <h1
                className="font-display font-black text-white leading-[1.05] tracking-tight animate-fade-up"
                style={{
                  fontSize: "clamp(2.5rem, 4vw + 1rem, 4.75rem)",
                  "--delay": "100ms",
                } as React.CSSProperties}
              >
                Payroll and<br />
                mobile money.<br />
                <span className="text-amber">One system.</span>
              </h1>

              <p
                className="mt-6 text-white/60 leading-relaxed max-w-lg animate-fade-up"
                style={{
                  fontSize: "clamp(1rem, 0.5vw + 0.875rem, 1.125rem)",
                  "--delay": "220ms",
                } as React.CSSProperties}
              >
                Anchor helps Zambian employers calculate payroll, pay workers via MTN, Airtel, and Zamtel, and maintain compliant records — all in one place.
              </p>

              <div
                className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
                style={{ "--delay": "340ms" } as React.CSSProperties}
              >
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber px-6 text-sm font-semibold text-brand-deep hover:bg-amber-dark hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                >
                  Request a Demo
                  <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center px-6 text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Talk to Sales
                </Link>
              </div>

              <p
                className="mt-8 text-xs text-white/20 font-medium uppercase tracking-widest animate-fade-up"
                style={{ "--delay": "430ms" } as React.CSSProperties}
              >
                NAPSA-ready · NHIMA-ready · No spreadsheets
              </p>
            </div>

            {/* Right: disbursement card — slides in from right */}
            <div
              className="hidden lg:flex justify-center animate-fade-in-right"
              style={{ "--delay": "500ms" } as React.CSSProperties}
            >
              <DisbursementCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="py-6 px-6 lg:px-8 first:pl-0 last:pr-0 animate-fade-up"
                style={{ "--delay": `${600 + i * 80}ms` } as React.CSSProperties}
              >
                <p className="font-display text-2xl font-black text-brand leading-none mb-1">{value}</p>
                <p className="text-xs text-ink-faint font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

            {/* Left: sticky statement */}
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">The Problem</p>
              <h2
                className="font-display font-black text-ink leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)" }}
              >
                Two tools.<br />One broken<br />payroll.
              </h2>
              <p className="mt-5 text-ink-muted leading-relaxed" style={{ maxWidth: "16rem" }}>
                Calculating payroll and paying people are entirely separate problems — handled by entirely separate systems.
              </p>
              <Link
                href="/product"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-mid transition-colors"
              >
                Six problems we solve <ArrowRight size={14} />
              </Link>
            </Reveal>

            {/* Right: numbered problem list */}
            <div className="divide-y divide-border">
              {problems.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="py-8 group">
                    <div className="flex gap-6 items-start">
                      <span className="font-display text-5xl font-black text-border group-hover:text-brand/20 transition-colors select-none leading-none pt-1 tabular-nums flex-shrink-0">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-ink mb-2">{p.title}</h3>
                        <p className="text-ink-muted leading-relaxed" style={{ maxWidth: "42rem" }}>{p.body}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">How It Works</p>
            <h2
              className="font-display font-black text-ink leading-tight"
              style={{ fontSize: "clamp(1.875rem, 2.5vw + 0.5rem, 2.75rem)" }}
            >
              From onboarding to payout<br />in one platform.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {steps.map(({ num, title, body }) => (
                <div key={num} className="bg-white p-8 group hover:bg-amber-light hover:-translate-y-0.5 transition-all duration-200">
                  <span className="font-display text-6xl font-black text-surface-2 group-hover:text-amber/30 transition-colors leading-none block mb-6 select-none tabular-nums">
                    {num}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink mb-3">{title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250} className="mt-10">
            <Link
              href="/product"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-ink hover:bg-surface-2 transition-colors"
            >
              See the full 7-step process <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Compliance callout ── */}
      <section className="py-16 bg-amber-light">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">Built for compliance</p>
              <h2
                className="font-display font-black text-ink leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2vw + 0.5rem, 2.5rem)" }}
              >
                NAPSA, NHIMA, and ZRA.<br />All accounted for.
              </h2>
              <p className="mt-4 text-ink-muted leading-relaxed max-w-md">
                Anchor automatically calculates statutory contributions and keeps audit-ready records so your business stays compliant — every month, without the manual work.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Automatic NAPSA contribution calculations",
                  "NHIMA deductions built into every payroll",
                  "ZRA PAYE computed and recorded",
                  "Downloadable payslips and audit trails",
                  "Payment history stored and exportable",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ink-muted">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Segments ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">Who It&apos;s For</p>
            <h2
              className="font-display font-black text-ink leading-tight"
              style={{ fontSize: "clamp(1.875rem, 2.5vw + 0.5rem, 2.75rem)" }}
            >
              Built for the entire<br />Zambian economy.
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* SME — primary user */}
            <Reveal className="lg:col-span-2 h-full">
              <div
                className="rounded-2xl p-10 flex flex-col justify-between min-h-72 h-full"
                style={{
                  background: "linear-gradient(135deg, oklch(0.24 0.16 292) 0%, oklch(0.30 0.20 292) 100%)"
                }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-6">For SMEs</p>
                  <h3
                    className="font-display font-black text-white leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2.25rem)" }}
                  >
                    Replace spreadsheets<br />with a proper payroll.
                  </h3>
                  <p className="mt-5 text-white/55 leading-relaxed" style={{ maxWidth: "26rem" }}>
                    Small business owners spend payroll week fighting Excel formulas and making individual bank transfers. Anchor runs the whole cycle in one sitting.
                  </p>
                </div>
                <p className="mt-10 font-display text-2xl font-black text-amber">60–80% less admin time.</p>
              </div>
            </Reveal>

            {/* Enterprise + Household stacked */}
            <div className="flex flex-col gap-5">
              <Reveal className="flex-1 flex flex-col">
                <div className="rounded-2xl bg-white border border-border p-8 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">Enterprises</p>
                  <h3 className="font-display text-xl font-bold text-ink mb-3">Last-mile mobile money payouts.</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Connect your existing HRIS to Zambia&apos;s mobile money networks with full audit visibility.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100} className="flex-1 flex flex-col">
                <div className="rounded-2xl bg-amber-light p-8 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">Households</p>
                  <h3 className="font-display text-xl font-bold text-ink mb-3">Dignity for domestic workers.</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Formal payslips, payment history, and leave tracking for every household worker.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={100} className="mt-8 text-center">
            <Link
              href="/who-its-for"
              className="text-sm font-medium text-brand hover:text-brand-mid inline-flex items-center gap-1 transition-colors"
            >
              Detailed solutions for each segment <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(160deg, oklch(0.24 0.16 292) 0%, oklch(0.20 0.18 300) 100%)"
        }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2
                className="font-display font-black text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3.5rem)" }}
              >
                See Anchor<br />in action.
              </h2>
              <p className="mt-5 text-white/50 leading-relaxed" style={{ maxWidth: "22rem" }}>
                The best way to understand Anchor is to see it working. Schedule a demo with our Lusaka team.
              </p>
              <p className="mt-5 text-xs text-white/20 font-semibold uppercase tracking-widest">
                Made in Lusaka, Zambia.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber px-6 text-sm font-semibold text-brand-deep hover:bg-amber-dark hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
              >
                Request a Demo
                <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center px-6 text-sm font-medium text-white/50 border border-white/15 rounded-lg hover:text-white hover:border-white/30 transition-colors"
              >
                Contact us instead
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

