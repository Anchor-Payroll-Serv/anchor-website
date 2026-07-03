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
    default: "Anchor Payroll | Payroll and Mobile Money Payments in One System",
    template: "%s | Anchor Payroll",
  },
  description:
    "Anchor is a secure payroll distribution platform that helps Zambian employers calculate payroll, pay workers via mobile money, and maintain compliant employee records — all in one place.",
  keywords: ["payroll", "mobile money", "Zambia", "MTN", "Airtel", "Zamtel", "NAPSA", "NHIMA"],
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
