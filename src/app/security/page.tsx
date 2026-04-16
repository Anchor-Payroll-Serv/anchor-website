import Link from "next/link";
import { ArrowRight, Lock, Server, Shield, Key, ScrollText, Landmark } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Security & Compliance" };

const pillars = [
  {
    icon: ScrollText,
    title: "NHIMA & NAPSA Record Compatibility",
    body: "Anchor generates reports and summaries formatted for easy reconciliation and filing with the National Health Insurance Management Authority (NHIMA) and the National Pension Scheme Authority (NAPSA). Your records are always compliance-ready.",
  },
  {
    icon: Lock,
    title: "Encryption at Rest and In-Transit",
    body: "All sensitive data stored on our platform is encrypted using industry-standard AES-256 encryption. Data transmitted between your device and our servers is protected with TLS 1.2+, ensuring complete confidentiality.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    body: "Our platform is built on secure, scalable cloud infrastructure that undergoes regular security audits and penetration testing. We ensure high availability and robust protection against threats.",
  },
  {
    icon: Key,
    title: "Role-Based Access Control (RBAC)",
    body: "Our enterprise-grade access controls allow you to define specific permissions for each user. Team members can only view or manage the information relevant to their roles, minimizing internal risk.",
  },
  {
    icon: Shield,
    title: "Immutable Audit Logs",
    body: "Every action taken on the Anchor platform is recorded in a tamper-proof audit log. From payroll creation to individual payments, you have a complete, traceable history for internal reviews and external audits.",
  },
  {
    icon: Landmark,
    title: "Alignment with Bank of Zambia Guidelines",
    body: "Our financial operations and data handling practices are designed to align with the guidelines set forth by the Bank of Zambia for payment systems and fintech providers, ensuring we operate with the highest degree of integrity.",
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Security & Compliance</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
            Security and compliance you can trust.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            At Anchor, trust is not an afterthought — it is our foundation. We have built a platform with institutional-grade security and a deep understanding of Zambia's regulatory landscape to protect your data, your funds, and your business.
          </p>
        </div>
      </section>

      {/* ── Trust statement ── */}
      <section className="py-14 bg-amber-light border-b border-amber/20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-center text-sm font-medium text-brand max-w-2xl mx-auto">
            We handle your payroll data with the highest level of care, adhering to strict protocols and standards. Our commitment to your security is built into every layer of our platform.
          </p>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-xl mb-14">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Our security commitments.</h2>
            <p className="mt-4 text-ink-muted">Six areas where Anchor goes beyond the minimum to protect your business and your people.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-7 hover:border-brand/20 transition-colors">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-deep">
                  <Icon size={20} className="text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base font-semibold text-ink mb-3">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance badges ── */}
      <section className="py-16 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-8 text-center">Aligned with</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Bank of Zambia", "NAPSA", "NHIMA", "AES-256 Encryption", "TLS 1.2+"].map((badge) => (
              <span key={badge} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-ink-muted bg-surface">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Have questions about our security posture?</h2>
          <p className="text-ink-muted mb-8">Our team is happy to walk you through our security architecture and compliance documentation.</p>
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
