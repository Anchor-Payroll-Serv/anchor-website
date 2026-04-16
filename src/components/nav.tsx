"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/product", label: "Product" },
  { href: "/security", label: "Security" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <Image
            src="/logo-mark.png"
            alt="Anchor"
            width={36}
            height={36}
            className={`object-contain transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
            style={{ width: 36, height: 36 }}
          />
          <span
            className={`font-display font-black text-lg tracking-tight ml-2 transition-colors ${
              scrolled ? "text-brand" : "text-white"
            }`}
          >
            anchor
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                scrolled
                  ? pathname === href
                    ? "text-brand bg-amber-light"
                    : "text-ink-muted hover:text-brand hover:bg-surface-2"
                  : pathname === href
                  ? "text-white bg-white/15"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              scrolled
                ? "text-ink-muted hover:text-brand"
                : "text-white/70 hover:text-white"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/demo"
            className={`inline-flex h-9 items-center rounded-lg px-4 text-sm font-semibold transition-colors ${
              scrolled
                ? "bg-brand text-white hover:bg-brand-mid"
                : "bg-white/10 border border-white/25 text-white hover:bg-white/20"
            }`}
          >
            Request a Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className={`flex md:hidden h-9 w-9 items-center justify-center rounded-md transition-colors ${
                scrolled
                  ? "text-ink-muted hover:text-brand"
                  : "text-white/70 hover:text-white"
              }`}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-deep/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-surface shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
              <div className="flex h-16 items-center justify-between px-5 border-b border-border">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <Image src="/logo-mark.png" alt="Anchor" width={32} height={32} style={{ width: 32, height: 32 }} className="object-contain" />
                  <span className="font-display font-black text-brand text-lg">anchor</span>
                </Link>
                <Dialog.Close asChild>
                  <button className="h-9 w-9 flex items-center justify-center rounded-md text-ink-muted hover:text-brand transition-colors" aria-label="Close menu">
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === href
                        ? "bg-amber-light text-brand font-semibold"
                        : "text-ink-muted hover:bg-surface-2 hover:text-brand"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-ink-muted hover:bg-surface-2 hover:text-brand transition-colors"
                >
                  Contact
                </Link>
              </nav>

              <div className="p-4 border-t border-border">
                <Link
                  href="/demo"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-mid transition-colors"
                >
                  Request a Demo
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
