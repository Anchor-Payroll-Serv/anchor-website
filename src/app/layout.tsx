import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anchor | Payroll on mobile money, for Zambia",
    template: "%s | Anchor",
  },
  description:
    "Anchor gives your business a payroll wallet. Add your people, top it up, and pay everyone on a schedule or whenever the work is done — every payment lands on a phone, with proof.",
  keywords: ["payroll", "mobile money", "Zambia", "MTN", "Airtel", "Zamtel", "wallet", "disbursement"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-surface antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
