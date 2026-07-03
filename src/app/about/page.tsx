import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "About" };

const storyParagraphs = [
  "Anchor started with a simple observation: in Zambia, most people are paid onto their phones. But the tools employers use to pay them were built for banks, spreadsheets, and somewhere else entirely.",
  "So business owners spend payday evenings sending mobile money one number at a time, checking amounts against a spreadsheet, and hoping nothing slips. The people they pay wait, and wonder.",
  "We're building the payroll system that matches how money actually moves here: a wallet you control, a list of your people, and payments that land on phones with proof: automatically on payday, or the moment the work is done.",
];

const valueCards = [
  { eyebrow: "Where we are", title: "Made in Lusaka", body: "We're a Zambian team building for Zambian payrolls: the networks, the habits, the month-end realities." },
  { eyebrow: "Where we're at", title: "Early days, honestly", body: "This is version one. MTN payouts are live; Airtel and Zamtel are coming. We'd rather tell you that plainly than pretend otherwise." },
  { eyebrow: "How we work", title: "With our customers", body: "Founding customers talk directly to the people building Anchor. What you need next is what we build next." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              About
            </p>
            <h1 style={{ margin: "0 0 24px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Payday is a promise. We help you{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>keep it</span>.
            </h1>
            <div className="flex flex-col gap-4.5" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
              {storyParagraphs.map((p) => (
                <p key={p} style={{ margin: 0 }}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: 64 }}>
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="card-hover flex flex-col gap-2.5"
                style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}
              >
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
                  {card.eyebrow}
                </p>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600 }}>{card.title}</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between gap-8"
            style={{ marginTop: 64, padding: 40, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16 }}
          >
            <div>
              <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Want to talk to us?</h2>
              <p style={{ margin: 0, fontSize: 15, color: "var(--muted-foreground)" }}>We&apos;re happy to walk you through Anchor before you commit to anything.</p>
            </div>
            <Link
              href="/get-started"
              className="anc-btn"
              style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
            >
              Get in touch
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
