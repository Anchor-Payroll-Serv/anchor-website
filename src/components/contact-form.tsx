"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      type: "contact",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      message: fd.get("message") as string,
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
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle2 size={40} className="text-brand" />
        <p className="font-display text-lg font-bold text-ink">Message sent!</p>
        <p className="text-sm text-ink-muted">We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required placeholder="Your full name" />
        <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <Field label="Phone (optional)" name="phone" type="tel" placeholder="+260 97X XXX XXX" />
      <div>
        <label className="block text-xs font-medium text-ink-muted mb-1.5">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help you?"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 resize-none transition"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-mid disabled:opacity-60 transition-colors"
      >
        {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-ink-muted mb-1.5">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition"
      />
    </div>
  );
}
