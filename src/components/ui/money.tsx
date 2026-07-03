import type { CSSProperties } from "react";

const MONEY_SIZES: Record<"lg" | "display", { integer: string; minor: string }> = {
  lg: { integer: "1.875rem", minor: "1.125rem" }, // ~30px / 18px
  display: { integer: "var(--text-display)", minor: "1.5rem" }, // 56px / 24px
};

function formatKwachaParts(value: number): { whole: string; decimal: string } {
  const fixed = value.toFixed(2);
  const [wholePart, decimalPart] = fixed.split(".");
  const whole = Number(wholePart).toLocaleString("en-US");
  return { whole, decimal: decimalPart };
}

export function Money({
  value,
  size = "lg",
  className,
  style,
}: {
  value: number;
  size?: "lg" | "display";
  className?: string;
  style?: CSSProperties;
}) {
  const { whole, decimal } = formatKwachaParts(value);
  const sizes = MONEY_SIZES[size];

  return (
    <span
      className={`tabular${className ? ` ${className}` : ""}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-tight)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      <span style={{ fontSize: sizes.minor, color: "var(--muted-foreground)", fontWeight: 600 }}>K</span>
      <span style={{ fontSize: sizes.integer }}>{whole}</span>
      <span style={{ fontSize: sizes.minor, color: "var(--muted-foreground)", fontWeight: 600 }}>.{decimal}</span>
    </span>
  );
}
