import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing" };

const plans = [
  {
    name: "Starter",
    price: "Contact for pricing",
    description: "For households and micro-employers getting started with formal payroll.",
    features: [
      "Up to 5 employees or workers",
      "Mobile money payouts (MTN, Airtel, Zamtel)",
      "Basic payslip generation",
      "Leave tracking",
      "Payment history",
    ],
    cta: "Get Started",
    href: "/demo",
    highlight: false,
  },
  {
    name: "Growth",
    price: "Contact for pricing",
    description: "For SMEs ready to automate payroll and eliminate spreadsheet errors.",
    features: [
      "Up to 100 employees",
      "Full payroll engine (NAPSA, NHIMA automated)",
      "Bulk mobile money disbursements",
      "Real-time payment monitoring",
      "Compliance-ready reports (PDF & CSV)",
      "Audit trails",
      "Email support",
    ],
    cta: "Request a Demo",
    href: "/demo",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom pricing",
    description: "For large organizations requiring HRIS integration and dedicated support.",
    features: [
      "Unlimited employees",
      "All Growth features",
      "Secure API access",
      "HRIS & accounting system integration",
      "Role-based access control (RBAC)",
      "SLA uptime guarantee",
      "Dedicated account manager",
    ],
    cta: "Talk to Sales",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Pricing</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Placeholder — pricing details are coming soon. In the meantime, reach out to our team for a personalized quote based on your organization's size and needs.
          </p>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map(({ name, price, description, features, cta, href, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 flex flex-col relative ${
                  highlight
                    ? "bg-brand-deep text-white ring-2 ring-amber"
                    : "bg-white border border-border"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-brand-deep text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className={`font-display text-xl font-bold mb-2 ${highlight ? "text-white" : "text-ink"}`}>{name}</h3>
                  <p className={`text-2xl font-display font-bold mb-3 ${highlight ? "text-amber" : "text-ink"}`}>{price}</p>
                  <p className={`text-sm leading-relaxed ${highlight ? "text-white/65" : "text-ink-muted"}`}>{description}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${highlight ? "text-amber" : "text-brand"}`} />
                      <span className={highlight ? "text-white/80" : "text-ink-muted"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${
                    highlight
                      ? "bg-amber text-brand-deep hover:bg-amber-dark"
                      : "bg-brand text-white hover:bg-brand-mid"
                  }`}
                >
                  {cta} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-ink-faint mt-10">
            All prices are placeholder. Contact our team for current rates and available payment options.
          </p>
        </div>
      </section>

      {/* ── FAQ placeholder ── */}
      <section className="py-16 bg-white border-t border-border">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Have questions?</h2>
          <p className="text-ink-muted mb-8">Our team is happy to walk you through pricing, available payment options, and what each plan includes for your specific situation.</p>
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
