import Link from "next/link";
import { ArrowRight, UserPlus, Settings, CheckSquare, Wallet, Send, BarChart2, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Product" };

const steps = [
  { num: "01", icon: UserPlus, title: "Add Employees or Workers", body: "Quickly onboard your team, whether full-time staff, casual workers, or domestic employees. Capture all necessary details for compliant record-keeping." },
  { num: "02", icon: Settings, title: "Configure Payroll Rules", body: "Set up payroll templates with specific rules for earnings, deductions, and contributions like NAPSA and NHIMA. Anchor automates the calculations." },
  { num: "03", icon: CheckSquare, title: "Validate Payroll Totals", body: "Before any money moves, review a clear summary of your entire payroll run. Catch errors and validate totals to ensure complete accuracy." },
  { num: "04", icon: Wallet, title: "Fund Your Payroll Wallet", body: "Make a single, secure transfer to your dedicated payroll wallet within Anchor. This covers all salaries and disbursement fees for the pay run." },
  { num: "05", icon: Send, title: "Disburse via Mobile Money", body: "With one click, pay your entire workforce across MTN, Airtel, and Zamtel. Anchor handles the bulk disbursements securely and efficiently." },
  { num: "06", icon: BarChart2, title: "Monitor Payouts in Real-Time", body: "Track every single payment from 'processing' to 'successful'. Get instant confirmation and reduce payment-related inquiries." },
  { num: "07", icon: FileText, title: "Generate Payslips and Reports", body: "Automatically generate professional payslips for every employee and export compliance-ready reports for your records and for regulatory bodies." },
];

const features = [
  {
    category: "Payroll Engine",
    items: [
      "Payroll templates for different worker types",
      "Automated calculations for taxes and deductions (NAPSA, NHIMA)",
      "Pre-disbursement validation checks to prevent errors",
      "Automated generation of digital and printable payslips",
    ],
  },
  {
    category: "Mobile Money Disbursements",
    items: [
      "Direct integration with MTN, Airtel, and Zamtel",
      "Secure bulk payouts to hundreds of workers at once",
      "Real-time monitoring of payment status",
      "SMS payment confirmations for every employee",
    ],
  },
  {
    category: "Workforce Management",
    items: [
      "Centralized and secure employee records",
      "Complete payment history for each worker",
      "Simple leave tracking and management",
      "Basic attendance tracking capabilities",
    ],
  },
  {
    category: "Audit & Reporting",
    items: [
      "Immutable, employee-level audit trails for every transaction",
      "Exportable reports in PDF and CSV formats",
      "Compliance-ready summaries for NAPSA and NHIMA filings",
      "Full visibility over payroll history and trends",
    ],
  },
  {
    category: "Enterprise & API",
    items: [
      "Fine-grained, role-based access control (RBAC)",
      "Secure APIs for integration with existing HRIS or accounting systems",
      "Customizable system integrations for large-scale operations",
      "Dedicated support for enterprise clients",
    ],
  },
];

export default function ProductPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Product</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
            From onboarding to payout in one platform.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Anchor provides a structured, step-by-step process to ensure your payroll is accurate, compliant, and always on time — from the first employee added to every payment confirmed.
          </p>
        </div>
      </section>

      {/* ── 7 Steps ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-bold text-ink mb-12">The 7-step payroll process</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {steps.map(({ num, icon: Icon, title, body }) => (
              <div key={num} className="rounded-2xl border border-border bg-white p-6 hover:border-brand/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-ink-faint font-display">{num}</span>
                  <div className="h-8 w-8 rounded-lg bg-amber-light flex items-center justify-center">
                    <Icon size={16} className="text-brand" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-display text-base font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Toolkit ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">Feature Toolkit</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">A complete toolkit for Zambian payroll.</h2>
            <p className="mt-4 text-ink-muted">From calculation to compliance, Anchor provides every feature you need to run a modern, efficient, and risk-free payroll operation.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ category, items }) => (
              <div key={category} className="rounded-2xl border border-border p-6">
                <h3 className="font-display text-base font-bold text-ink mb-4">{category}</h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-amber-light text-brand flex items-center justify-center text-[10px] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Ready to see it live?</h2>
          <p className="text-ink-muted mb-8">Schedule a personalized demo and see every feature working with your real payroll data.</p>
          <Link href="/demo" className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-mid transition-colors">
            Request a Demo <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
