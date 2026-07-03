"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type Status = "idle" | "loading" | "success" | "error";

const teamSizes = ["Just 1 or 2", "3 – 10", "11 – 50", "More than 50"];

export function GetStartedForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      type: "get-started",
      name: fd.get("name") as string,
      business: fd.get("business") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      teamSize: fd.get("teamSize") as string,
      honeypot: fd.get("honeypot") as string,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3.5" style={{ padding: "12px 0" }}>
        <span style={{ color: "var(--success)" }}>
          <Icon name="check-circle" size={32} />
        </span>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Thanks, we&apos;ve got it.</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
          We&apos;ll be in touch within one working day to set up your account and plan your first payroll. Nothing else is needed from you for now.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{ marginTop: 8, background: "none", border: "none", padding: 0, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--primary)", cursor: "pointer", textDecoration: "underline" }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-name" style={{ fontSize: 13.5, fontWeight: 600 }}>Your name</label>
        <input
          id="gs-name" name="name" type="text" required placeholder="e.g. Mutale Zulu" className="anc-input"
          style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-business" style={{ fontSize: 13.5, fontWeight: 600 }}>
          Business name <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>(leave blank if it&apos;s just you)</span>
        </label>
        <input
          id="gs-business" name="business" type="text" placeholder="e.g. Kalulu Trading Ltd" className="anc-input"
          style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gs-phone" style={{ fontSize: 13.5, fontWeight: 600 }}>Phone</label>
          <input
            id="gs-phone" name="phone" type="tel" required placeholder="+260 ·· ··· ····" className="anc-input"
            style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gs-email" style={{ fontSize: 13.5, fontWeight: 600 }}>Email</label>
          <input
            id="gs-email" name="email" type="email" required placeholder="you@business.co.zm" className="anc-input"
            style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-size" style={{ fontSize: 13.5, fontWeight: 600 }}>How many people do you pay?</label>
        <select
          id="gs-size" name="teamSize" required className="anc-input"
          style={{ height: 44, padding: "0 10px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        >
          {teamSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p style={{ margin: 0, fontSize: 14, color: "var(--destructive-foreground)", background: "color-mix(in oklch, var(--destructive) 15%, var(--card))", border: "1px solid var(--destructive)", borderRadius: 8, padding: "12px 16px" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="anc-btn"
        style={{ height: 48, borderRadius: 10, fontSize: 15, fontWeight: 600, marginTop: 6, opacity: status === "loading" ? 0.6 : 1 }}
      >
        {status === "loading" ? "Submitting…" : "Create your account"}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted-foreground)", textAlign: "center" }}>
        Your details stay with us. We&apos;ll only use them to set you up.
      </p>
    </form>
  );
}
