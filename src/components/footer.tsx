import Link from "next/link";

const product = [
  { href: "/product", label: "How it works" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get started" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
];

export function Footer() {
  return (
    <footer style={{ background: "oklch(0.165 0.012 195)", color: "oklch(0.94 0.008 195)" }}>
      <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12"
          style={{ paddingBottom: 40, borderBottom: "1px solid oklch(0.285 0.012 195)" }}
        >
          <div className="flex flex-col gap-3.5">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "#9b6fc4" }}>
              anchor
            </span>
            <p style={{ margin: 0, maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "oklch(0.72 0.013 195)" }}>
              Payroll that pays your people on their phones. Made in Lusaka, Zambia.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.013 195)",
                marginBottom: 4,
              }}
            >
              Product
            </span>
            {product.map(({ href, label }) => (
              <Link key={href} href={href} className="link-underline" style={{ fontSize: 14, color: "oklch(0.94 0.008 195)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.013 195)",
                marginBottom: 4,
              }}
            >
              Company
            </span>
            {company.map(({ href, label }) => (
              <Link key={href} href={href} className="link-underline" style={{ fontSize: 14, color: "oklch(0.94 0.008 195)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4" style={{ paddingTop: 24 }}>
          <span style={{ fontSize: 13, color: "oklch(0.72 0.013 195)" }}>© 2026 Anchor · Automated Money Solutions</span>
        </div>
      </div>
    </footer>
  );
}
