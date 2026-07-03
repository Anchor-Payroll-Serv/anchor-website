"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/product", label: "Product" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in oklch, var(--background) 85%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-6"
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <Image src="/mark-purple.png" alt="Anchor mark" width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain" }} />
          <Image src="/wordmark-purple.png" alt="anchor" width={90} height={17} style={{ height: 17, width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="nav-link"
                style={{
                  padding: "7px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                  background: active ? "var(--accent)" : "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/get-started"
            className="signin-link"
            style={{ fontSize: 14, fontWeight: 500, color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="anc-btn"
            style={{ height: 38, padding: "0 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-md"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              className="fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              style={{ background: "oklch(0.245 0.018 195 / 0.4)" }}
            />
            <Dialog.Content
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300"
              style={{ background: "var(--background)" }}
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <div className="flex h-16 items-center justify-between px-5" style={{ borderBottom: "1px solid var(--border)" }}>
                <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Image src="/mark-purple.png" alt="Anchor mark" width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain" }} />
                  <Image src="/wordmark-purple.png" alt="anchor" width={80} height={15} style={{ height: 15, width: "auto", objectFit: "contain" }} />
                </Link>
                <Dialog.Close asChild>
                  <button
                    className="h-9 w-9 flex items-center justify-center rounded-md"
                    style={{ color: "var(--muted-foreground)" }}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm"
                      style={{
                        fontWeight: active ? 600 : 500,
                        color: active ? "var(--foreground)" : "var(--muted-foreground)",
                        background: active ? "var(--accent)" : "transparent",
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ fontWeight: 500, color: "var(--muted-foreground)" }}
                >
                  Sign in
                </Link>
              </nav>

              <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="anc-btn flex h-11 w-full"
                  style={{ borderRadius: 10, fontSize: 14, fontWeight: 600 }}
                >
                  Get started
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
