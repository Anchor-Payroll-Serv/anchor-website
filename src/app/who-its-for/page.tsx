import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "Who it's for" };

export default function WhoItsForPage() {
  return (
    <div>
      {/* Page hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        <div className="relative max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Who it&apos;s for
          </p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Built for how{" "}
            <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>Zambia pays people</span>.
          </h1>
          <p style={{ margin: 0, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            Most wages here land on a phone, not in a bank account. Anchor is made for the businesses and people who pay that way.
          </p>
        </div>
      </section>

      {/* SMEs */}
      <section style={{ background: "var(--background)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1120px] mx-auto px-6 py-[88px]">
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Small &amp; medium businesses
            </p>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              Payday without the payday panic.
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              If you run a shop, a farm, a workshop, or an agency, payday probably means a spreadsheet, a stack of phone numbers, and an evening of sending money one transfer at a time. Anchor turns that into one reviewed, approved run, and keeps the record for you.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "users" as const, title: "Five people or three hundred, mixed pay", body: "Salaried staff and casual workers on the same list, each paid their own way." },
              { icon: "rotate-cw" as const, title: "Month-end runs itself", body: "Set the payday once. Review the run, approve it, and get your evening back." },
              { icon: "file-text" as const, title: "Records that defend you", body: "A dispute, an audit, a partner asking questions? The payment history answers for you." },
            ].map((row) => (
              <div
                key={row.title}
                className="card-hover"
                style={{ display: "flex", gap: 14, padding: "20px 24px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16 }}
              >
                <Icon name={row.icon} size={20} style={{ color: "var(--primary)", marginTop: 2 }} />
                <div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>{row.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individuals */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1120px] mx-auto px-6 py-[88px]">
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Individuals &amp; households
            </p>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              The people who keep your home running deserve a proper payday too.
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              A gardener, a nanny, a guard, a small crew fixing the roof. Anchor gives them a reliable payday and a payment history, and gives you one place to manage it all, instead of remembering who was paid what, and when.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "clock" as const, title: "Never miss the day", body: "Set it monthly and it happens, even when you're travelling or busy." },
              { icon: "smartphone" as const, title: "No cash handovers", body: "Money goes straight to their phone. No envelopes, no change, no doubt." },
              { icon: "receipt-text" as const, title: "Dignity in the record", body: "A payment history helps the people who work for you prove their income." },
            ].map((row) => (
              <div
                key={row.title}
                className="card-hover"
                style={{ display: "flex", gap: 14, padding: "20px 24px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}
              >
                <Icon name={row.icon} size={20} style={{ color: "var(--primary)", marginTop: 2 }} />
                <div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>{row.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section>
        <div className="flex items-center justify-between gap-8 max-w-[1120px] mx-auto px-6 py-[72px]">
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 2.5vw, 32px)", letterSpacing: "-0.015em" }}>
            Sound like you? Start with your first payday.
          </h2>
          <Link href="/get-started" className="anc-btn" style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
            Create your account
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
