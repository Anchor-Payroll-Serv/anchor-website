import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { GetStartedForm } from "@/components/get-started-form";

export const metadata: Metadata = { title: "Get started" };

const benefits = [
  "Free to set up. No card, no commitment",
  "We reply within one working day",
  "Founding-customer terms while we're in early access",
];

export default function GetStartedPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Get started
            </p>
            <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Your first payday on Anchor is{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>closer than you think</span>.
            </h1>
            <p style={{ margin: "0 0 28px", fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
              Tell us a little about who you pay. We&apos;ll set up your account, walk you through your first payroll, and stay close while you get comfortable.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {benefits.map((benefit) => (
                <li key={benefit} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                  <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, padding: 36, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)" }}>
            <GetStartedForm />
          </div>
        </div>
      </section>
    </div>
  );
}
