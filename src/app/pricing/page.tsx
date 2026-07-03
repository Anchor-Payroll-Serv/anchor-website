import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div style={{ maxWidth: 620, marginBottom: 56 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Pricing
            </p>
            <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              We&rsquo;re setting pricing with our{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>founding customers</span>.
            </h1>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
              Anchor is in early access, and we&rsquo;d rather price it with you than at you. Join now and you&rsquo;ll help shape a simple, per-payout price. Founding terms lock in before public pricing launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 880 }}>
            {/* Founding customer card */}
            <div
              className="flex flex-col gap-5"
              style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, padding: 36, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)" }}
            >
              <div>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
                  Founding customer
                </p>
                <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700 }}>Early access</h2>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>For SMEs and individuals joining now.</p>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Full product: wallet, scheduled and at-will payroll, records",
                  "Founding terms locked in before public pricing",
                  "A direct line to the team in Lusaka",
                  "A say in what we build next",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                    <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className="anc-btn"
                style={{ justifyContent: "center", height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: "auto" }}
              >
                Talk to us about joining
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>

            {/* What to expect card */}
            <div
              className="flex flex-col gap-5"
              style={{ background: "var(--card)", border: "1px dashed var(--border)", borderRadius: 16, padding: 36 }}
            >
              <div>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Public pricing · coming soon
                </p>
                <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--muted-foreground)" }}>
                  What to expect
                </h2>
              </div>
              <div className="flex flex-col gap-4" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                <p style={{ margin: 0 }}>Our promise when pricing lands:</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Simple and per-payout: you pay when you pay people",
                    "No monthly minimums for small teams",
                    "Every fee shown before you approve a run, no surprises",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Icon name="check" size={18} style={{ color: "var(--muted-foreground)", marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p style={{ margin: "auto 0 0", fontSize: 13, color: "var(--muted-foreground)" }}>Founding customers will see it first.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
