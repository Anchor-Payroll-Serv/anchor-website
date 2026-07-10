import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Money } from "@/components/ui/money";

export const metadata: Metadata = { title: "Pay your team on mobile money" };

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)", background: "var(--card)" }}
      >
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
        <div
          className="relative grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center max-w-[1120px] mx-auto px-6"
          style={{ paddingTop: 96, paddingBottom: 96 }}
        >
          <div>
            <p
              className="animate-rise"
              style={{ "--i": 0, margin: "0 0 18px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" } as React.CSSProperties}
            >
              Payroll · Mobile money · Zambia
            </p>
            <h1
              className="animate-rise"
              style={{
                "--i": 1,
                margin: "0 0 22px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(42px, 5vw, 66px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
              } as React.CSSProperties}
            >
              Pay your team straight to their{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>mobile money</span>.
            </h1>
            <p
              className="animate-rise"
              style={{ "--i": 2, margin: "0 0 32px", maxWidth: 480, fontSize: 18, lineHeight: 1.6, color: "var(--muted-foreground)" } as React.CSSProperties}
            >
              Anchor gives your business a payroll wallet. Add your people, top it up, and pay everyone on a schedule or whenever the work is done. Every payment lands on a phone, with proof.
            </p>
            <div className="animate-rise flex items-center gap-4" style={{ "--i": 3, marginBottom: 28 } as React.CSSProperties}>
              <Link href="/get-started" className="anc-btn" style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Join the waitlist
                <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/product" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 500, color: "var(--foreground)", textDecoration: "none" }}>
                See how it works
              </Link>
            </div>
            <p className="animate-rise" style={{ "--i": 4, margin: 0, fontSize: 13, color: "var(--muted-foreground)" } as React.CSSProperties}>
              Free to set up · Live on MTN Mobile Money · Airtel &amp; Zamtel coming soon
            </p>
          </div>

          {/* Mock payroll run card */}
          <div className="animate-rise flex justify-end" style={{ "--i": 3 } as React.CSSProperties}>
            <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
              <div
                style={{
                  position: "absolute", top: -34, left: -60, zIndex: 2, transform: "rotate(-2deg)", width: 268,
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
                  boxShadow: "0 12px 30px oklch(0.2 0.02 195 / 0.13)", padding: "14px 16px",
                  display: "flex", gap: 11, alignItems: "flex-start",
                }}
              >
                <span style={{ width: 34, height: 34, borderRadius: 10, background: "#FFCC00", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "oklch(0.32 0.06 90)", flexShrink: 0 }}>
                  <Icon name="smartphone" size={18} />
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>MTN MoMo · just now</span>
                  <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                    You have received <strong className="tabular" style={{ fontFamily: "var(--font-mono)" }}>K3,200.00</strong> from Kalulu Trading Ltd.
                  </span>
                </div>
              </div>
              <span
                style={{
                  position: "absolute", bottom: -22, right: -16, zIndex: 2, transform: "rotate(2deg)",
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999,
                  background: "var(--foreground)", color: "var(--background)", fontSize: 13, fontWeight: 600,
                  boxShadow: "0 10px 24px oklch(0.2 0.02 195 / 0.18)",
                }}
              >
                <Icon name="clock" size={14} />
                Next payroll · Fri 25 July
              </span>
              <div style={{ width: "100%", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)", overflow: "hidden" }}>
                <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Payroll run · 28 June</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--success)", background: "color-mix(in oklch, var(--success) 14%, var(--card))" }}>
                    <Icon name="check-circle" size={13} />
                    Paid
                  </span>
                </div>
                <div style={{ padding: "14px 24px 18px" }}>
                  <Money value={24150} size="display" />
                  <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--muted-foreground)" }}>Paid to 9 people · MTN Mobile Money</p>
                </div>
                <div style={{ borderTop: "1px solid var(--border)" }}>
                  {[
                    { name: "Chanda Mwila", ref: "MTN ···· 4821", amount: "K3,200.00" },
                    { name: "Grace Tembo", ref: "MTN ···· 7743", amount: "K2,850.00" },
                    { name: "Joseph Banda", ref: "MTN ···· 1108", amount: "K2,400.00" },
                  ].map((row, i, arr) => (
                    <div
                      key={row.name}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "13px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{row.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted-foreground)" }}>{row.ref}</span>
                      </div>
                      <span className="tabular" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>{row.amount}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 24px", background: "var(--muted)", display: "flex", alignItems: "center", gap: 8, color: "var(--muted-foreground)" }}>
                  <Icon name="receipt-text" size={14} />
                  <span style={{ fontSize: 12.5 }}>A payment record was sent to every person.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--background)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[88px]">
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            How it works
          </p>
          <h2
            style={{
              margin: "0 0 48px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: 560,
            }}
          >
            From a list of names to{" "}
            <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>everyone paid</span>, in four steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { num: "01", icon: "user-plus" as const, title: "Add your people", body: "A name, a phone number, and what you pay them. That's the whole setup." },
              { num: "02", icon: "wallet-minimal" as const, title: "Top up your wallet", body: "One transfer covers the whole payroll. Your money sits safely until you say pay." },
              { num: "03", icon: "clock" as const, title: "Run payroll your way", body: "Set a payday and Anchor runs it for you, or pay at will when the work is done." },
              { num: "04", icon: "check-circle" as const, title: "Everyone gets paid", body: "Money lands on each person's phone in minutes, with a record you can both point to." },
            ].map((step) => (
              <div
                key={step.num}
                className="card-hover"
                style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted-foreground)" }}>{step.num}</span>
                <Icon name={step.icon} size={22} style={{ color: "var(--primary)" }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two ways to pay */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[88px]">
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Two ways to pay
          </p>
          <h2
            style={{
              margin: "0 0 48px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: 560,
            }}
          >
            Payroll that fits how you actually work.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="card-hover"
              style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="rotate-cw" size={20} style={{ color: "var(--primary)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  On a schedule
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>Set payday once. Anchor remembers.</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                Pick the day: end of the month, every Friday, whatever your rhythm is. Anchor prepares the run, shows you the total, and pays everyone on time. You just keep the wallet topped up.
              </p>
            </div>
            <div
              className="card-hover"
              style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="arrow-up-right" size={20} style={{ color: "var(--primary)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  At will
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>Work done today, paid today.</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                Casual crews, piece work, one-off jobs: pick the people, confirm the amounts, and pay on the spot. No schedule needed, no waiting for month-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet */}
      <section style={{ background: "var(--background)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-[1120px] mx-auto px-6 py-[88px]">
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              The wallet
            </p>
            <h2
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              One balance. Every payday covered.
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              Your Anchor wallet is where payroll money waits, separate from your trading cash, so payday never catches you off guard. Top it up when it suits you, and see exactly where every kwacha went.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "var(--foreground)" }}>
                <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                Nothing moves until you approve it. Your money is yours.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "var(--foreground)" }}>
                <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                Anchor tells you if the balance won&apos;t cover the next run.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "var(--foreground)" }}>
                <Icon name="file-text" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                A clean statement of every top-up and payout, ready to export.
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <div style={{ width: "100%", maxWidth: 400, background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)", overflow: "hidden" }}>
              <div style={{ padding: "22px 24px 18px" }}>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Available balance
                </p>
                <Money value={38400} size="display" />
                <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                  <span className="anc-btn" style={{ height: 38, padding: "0 16px", borderRadius: 10, fontSize: 14, fontWeight: 600 }}>
                    <Icon name="plus" size={15} />
                    Add funds
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", height: 38, padding: "0 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: 14, fontWeight: 500 }}>
                    Statement
                  </span>
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <p style={{ margin: 0, padding: "12px 24px 4px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Wallet activity
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 24px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon name="arrow-down-left" size={16} style={{ color: "var(--success)" }} />
                    <span style={{ fontSize: 14 }}>Top up · bank transfer</span>
                  </div>
                  <span className="tabular text-tone" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, "--tone": "var(--success)" } as React.CSSProperties}>
                    +K20,000.00
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon name="arrow-up-right" size={16} style={{ color: "var(--muted-foreground)" }} />
                    <span style={{ fontSize: 14 }}>Payroll run · June</span>
                  </div>
                  <span className="tabular" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>
                    −K24,150.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Networks */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[72px]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
              <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
                Networks
              </p>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 2.5vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
              >
                MTN today. Every network soon.
              </h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                We&apos;re starting where most of Zambia gets paid. Airtel Money and Zamtel Kwacha are on the way. Your employee list won&apos;t change, only where the money can land.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FFCC00" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600 }}>MTN Mobile Money</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--success)", background: "color-mix(in oklch, var(--success) 14%, var(--card))" }}>
                  <Icon name="check-circle" size={12} />
                  Live now
                </span>
              </div>
              <div style={{ background: "var(--background)", border: "1px dashed var(--border)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E4002B", opacity: 0.45 }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--muted-foreground)" }}>Airtel Money</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", background: "var(--muted)" }}>
                  <Icon name="clock" size={12} />
                  Coming soon
                </span>
              </div>
              <div style={{ background: "var(--background)", border: "1px dashed var(--border)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#00A651", opacity: 0.45 }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--muted-foreground)" }}>Zamtel Kwacha</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", background: "var(--muted)" }}>
                  <Icon name="clock" size={12} />
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ background: "var(--background)" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-[88px]">
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Who it&apos;s for
          </p>
          <h2
            style={{
              margin: "0 0 48px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: 560,
            }}
          >
            If you pay people, Anchor is for you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
            <div style={{ background: "var(--foreground)", color: "var(--background)", borderRadius: 16, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
              <div>
                <p style={{ margin: "0 0 16px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "color-mix(in oklch, var(--background) 65%, transparent)" }}>
                  Small &amp; medium businesses
                </p>
                <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 700, lineHeight: 1.2 }}>
                  Retire the payday spreadsheet.
                </h3>
                <p style={{ margin: 0, maxWidth: 420, fontSize: 15, lineHeight: 1.6, color: "color-mix(in oklch, var(--background) 75%, transparent)" }}>
                  Shops, farms, workshops, agencies. Whether you pay five people or three hundred, stop sending money one number at a time and reconciling it by hand at month-end.
                </p>
              </div>
              <Link href="/who-its-for" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--background)", textDecoration: "none" }}>
                See how SMEs use Anchor
                <Icon name="arrow-right" size={15} style={{ color: "var(--background)" }} />
              </Link>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
              <div>
                <p style={{ margin: "0 0 16px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Individuals
                </p>
                <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                  For the people you employ at home.
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                  A gardener, a nanny, a small building crew. Pay them reliably every month, with a record both of you can trust.
                </p>
              </div>
              <Link href="/who-its-for" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>
                See how individuals use Anchor
                <Icon name="arrow-right" size={15} style={{ color: "var(--primary)" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founding customer CTA */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center max-w-[1120px] mx-auto px-6 py-[88px]">
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Early access
            </p>
            <h2
              style={{
                margin: "0 0 18px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Become a{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>founding customer</span>.
            </h2>
            <p style={{ margin: 0, maxWidth: 480, fontSize: 16, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
              Anchor is new, and we&apos;re building it with the businesses that join first. Founding customers get a direct line to our team in Lusaka, and a say in what we build next.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <Link href="/get-started" className="anc-btn" style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Join the waitlist
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link href="/pricing" className="link-underline" style={{ fontSize: 14, fontWeight: 500, color: "var(--muted-foreground)", textDecoration: "none" }}>
              Or talk to us about pricing first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
