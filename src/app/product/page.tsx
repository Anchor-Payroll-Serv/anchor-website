import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Money } from "@/components/ui/money";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage() {
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
            Product
          </p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Everything payday needs, in{" "}
            <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>one place</span>.
          </h1>
          <p style={{ margin: 0, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            A list of your people, a wallet that funds them, and two ways to run the payment. That&apos;s Anchor. Here&apos;s each piece.
          </p>
        </div>
      </section>

      {/* Employees */}
      <section style={{ background: "var(--background)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-[1120px] mx-auto px-6 py-[88px]">
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Your people
            </p>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              One list, always ready to pay.
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              Add each person once: their name, mobile money number, and what you pay them. Full-time staff, casual workers, or a mix. When it&apos;s time to pay, the list is the payroll.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                Fixed salaries or per-job amounts. Set what fits each person.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                Anchor checks the number is a valid mobile money account before you pay.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                Pause someone for a month without deleting them.
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <div
              style={{ width: "100%", maxWidth: 420, background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)", overflow: "hidden" }}
            >
              <div style={{ padding: "18px 24px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Employees · 9
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>
                  <Icon name="user-plus" size={14} />
                  Add person
                </span>
              </div>
              {[
                { initials: "CM", name: "Chanda Mwila", role: "Shopkeeper · monthly", amount: "K3,200.00" },
                { initials: "GT", name: "Grace Tembo", role: "Accounts · monthly", amount: "K2,850.00" },
                { initials: "JB", name: "Joseph Banda", role: "Driver · per job", amount: "K400.00" },
              ].map((row) => (
                <div
                  key={row.initials}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 24px", borderTop: "1px solid var(--border)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 34, height: 34, borderRadius: 999, background: "var(--secondary)", color: "var(--secondary-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
                      {row.initials}
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{row.name}</span>
                      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{row.role}</span>
                    </div>
                  </div>
                  <span className="tabular" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Running payroll */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[88px]">
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Running payroll
          </p>
          <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em", maxWidth: 560 }}>
            Review it, run it, done.
          </h2>
          <p style={{ margin: "0 0 48px", maxWidth: 540, fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
            Before any money moves, Anchor shows you the whole run: who&apos;s being paid, how much, and what it totals. You approve it; we handle the rest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "rotate-cw" as const, title: "Automatic runs", body: "Set your payday and Anchor prepares the run each cycle. You get a reminder to review and approve. Nothing pays out on its own." },
              { icon: "arrow-up-right" as const, title: "At-will payments", body: "Pick anyone on your list and pay them now, for a finished job, an advance, or a one-off. Same proof, same record." },
              { icon: "eye" as const, title: "Live status", body: "Watch each payment land as it happens. If one fails (a wrong number, a full wallet) you'll see it named, with a retry." },
            ].map((card) => (
              <div
                key={card.title}
                className="card-hover"
                style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}
              >
                <Icon name={card.icon} size={22} style={{ color: "var(--primary)" }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>{card.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of payment */}
      <section style={{ background: "var(--background)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-[1120px] mx-auto px-6 py-[88px]">
          <div className="flex justify-start">
            <div
              style={{ width: "100%", maxWidth: 380, background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success)" }}>
                <Icon name="check-circle" size={18} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Payment confirmed</span>
              </div>
              <Money value={3200} size="lg" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--muted-foreground)", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                <span>To: Chanda Mwila · MTN ···· 4821</span>
                <span>From: Kalulu Trading Ltd</span>
                <span>28 June 2026 · 09:14 · Ref ANC-4471</span>
              </div>
            </div>
          </div>
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Proof of payment
            </p>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              A record both sides can point to.
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              Every payment creates a record: who, how much, when, and the reference. Your employee gets confirmation on their phone; you get a history you can search and export. No more &quot;did you send it?&quot; conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Money safety */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[88px]">
          <div style={{ maxWidth: 620, marginBottom: 48 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Your money
            </p>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              Nothing moves without you.
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              Anchor is built like a ledger, not a black box. Your wallet balance is yours, every movement is recorded, and no payment leaves without your approval.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "lock" as const, title: "You approve every run", body: "Scheduled or at will, a payment only goes out after you've reviewed and confirmed it." },
              { icon: "shield-check" as const, title: "Your balance is ring-fenced", body: "Wallet funds are held for payroll and nothing else. Withdraw them back to your account any time." },
              { icon: "file-text" as const, title: "Everything is on the record", body: "Every top-up, payout, and retry is logged with a reference, exportable whenever you need it." },
            ].map((card) => (
              <div
                key={card.title}
                className="card-hover"
                style={{ display: "flex", flexDirection: "column", gap: 10, padding: 24, background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}
              >
                <Icon name={card.icon} size={20} style={{ color: "var(--primary)" }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600 }}>{card.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between gap-8 max-w-[1120px] mx-auto px-6 py-[72px]">
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 2.5vw, 32px)", letterSpacing: "-0.015em" }}>
            Ready to run your first payroll?
          </h2>
          <Link href="/get-started" className="anc-btn" style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
            Join the waitlist
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
