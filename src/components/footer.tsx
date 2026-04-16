import Link from "next/link";
import Image from "next/image";

const product = [
  { href: "/product", label: "Features" },
  { href: "/security", label: "Security & Compliance" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/pricing", label: "Pricing" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/demo", label: "Request a Demo" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white" style={{
      background: "linear-gradient(160deg, oklch(0.24 0.16 292) 0%, oklch(0.20 0.18 300) 100%)"
    }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo-mark.png"
                alt="Anchor"
                width={32}
                height={32}
                className="brightness-0 invert object-contain"
                style={{ width: 32, height: 32 }}
              />
              <span className="font-display font-black text-white text-lg">anchor</span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs mt-3">
              Payroll and mobile money payments, finally in one system. Built for Zambia.
            </p>
            <div className="mt-6 flex gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#FFCC00" }} />
                <span className="text-white/50">MTN</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#EF1C25" }} />
                <span className="text-white/50">Airtel</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#00A651" }} />
                <span className="text-white/50">Zamtel</span>
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Product</p>
            <ul className="space-y-3">
              {product.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Company</p>
            <ul className="space-y-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Legal</p>
            <ul className="space-y-3">
              {legal.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "oklch(0.50 0.22 292 / 0.2)" }}>
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Anchor Payroll. All rights reserved.
          </p>
          <p className="text-xs text-white/25">Lusaka, Zambia · info@anchorpayroll.com</p>
        </div>
      </div>
    </footer>
  );
}
