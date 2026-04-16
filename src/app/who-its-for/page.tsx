import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Who It's For" };

const segments = [
  {
    icon: TrendingUp,
    label: "SMEs",
    description: "Small and medium businesses across Zambia that are tired of manual payroll and fragmented tools.",
    problem: "Stuck with manual payroll, spreadsheet errors, and time-consuming bank transfers or cash payments.",
    solution: "An all-in-one platform that automates payroll calculations and mobile money payouts.",
    outcome: "Faster, cleaner payroll cycles with a 60–80% reduction in admin time and effort.",
    features: [
      "Payroll templates for any business size",
      "Automated NAPSA and NHIMA calculations",
      "Bulk mobile money payouts in one click",
      "Payslips generated automatically",
    ],
  },
  {
    icon: Shield,
    label: "Enterprises",
    description: "Large organizations with existing HRIS that need last-mile mobile money payout automation.",
    problem: "Existing payroll systems are powerful but lack last-mile payout automation to mobile money wallets.",
    solution: "A robust payout engine with real-time monitoring and immutable audit trails that integrates with your existing HRIS.",
    outcome: "Full operational reliability, reduced risk, and complete visibility over disbursements.",
    features: [
      "Secure APIs for HRIS integration",
      "Role-based access control (RBAC)",
      "Immutable audit trails for every transaction",
      "Dedicated enterprise support",
    ],
  },
  {
    icon: Users,
    label: "Micro-Employers & Households",
    description: "Households and small employers who hire domestic workers and have no formal payroll system today.",
    problem: "No formal system for paying domestic workers, leading to disputes over payments, leave days, and advances. No proof of employment or payment history.",
    solution: "A simple, mobile-first payroll tool to formalize payments, track leave, and generate payslips.",
    outcome: "Creates proof, history, and trust — reducing disputes and providing dignity for both employer and employee.",
    features: [
      "Simple mobile-first interface",
      "Leave and advance tracking",
      "Payslips for domestic workers",
      "Proof of payment history",
    ],
  },
];

export default function WhoItsForPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Who It&apos;s For</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
            Built for the entire Zambian economy.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            A flexible solution for employers of all sizes — from enterprises processing thousands of payslips to households paying a single domestic worker.
          </p>
        </div>
      </section>

      {/* ── Segments ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-16">
          {segments.map(({ icon: Icon, label, description, problem, solution, outcome, features }, i) => (
            <div
              key={label}
              className={`grid gap-10 md:grid-cols-2 items-center ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-deep mb-5">
                  <Icon size={22} className="text-amber" strokeWidth={1.75} />
                </div>
                <h2 className="font-display text-3xl font-bold text-ink mb-3">{label}</h2>
                <p className="text-ink-muted mb-6">{description}</p>
                <ul className="space-y-2 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span className="h-5 w-5 rounded-full bg-amber-light flex items-center justify-center text-brand text-[10px] font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/demo" className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-mid transition-colors">
                  Request a Demo <ArrowRight size={14} />
                </Link>
              </div>
              <div className={`rounded-2xl bg-white border border-border p-8 space-y-5 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">The Problem</p>
                  <p className="text-sm text-ink-muted leading-relaxed">{problem}</p>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-2">Anchor Solution</p>
                  <p className="text-sm text-ink-muted leading-relaxed">{solution}</p>
                </div>
                <div className="rounded-xl bg-amber-light px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-1">Outcome</p>
                  <p className="text-sm font-medium text-ink">{outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-border">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Not sure which plan fits you?</h2>
          <p className="text-ink-muted mb-8">Talk to our team and we'll help you find the right solution for your organization.</p>
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
