import type { ReactNode } from "react";

export function LegalDoc({
  title,
  lastUpdated,
  callout,
  children,
}: {
  title: string;
  lastUpdated: string;
  callout?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 760, paddingTop: 72, paddingBottom: 96 }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Legal
          </p>
          <h1 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px, 3.5vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {title}
          </h1>
          <p style={{ margin: `0 0 ${callout ? 28 : 40}px`, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted-foreground)" }}>
            Last updated: {lastUpdated}
          </p>

          {callout}

          <div className="flex flex-col gap-9" style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--foreground)" }}>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3"
      style={{ marginBottom: 40, padding: "16px 20px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
    >
      {children}
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600 }}>{heading}</h2>
      {children}
    </div>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  // Tailwind preflight resets list-style-type to none, so restore it explicitly.
  return (
    <ul className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: 22, listStyleType: "disc" }}>
      {children}
    </ul>
  );
}
