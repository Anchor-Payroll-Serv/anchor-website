"use client";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

function CountUp({
  to,
  delay = 0,
  format = (v: number) => String(Math.round(v)),
}: {
  to: number;
  delay?: number;
  format?: (v: number) => string;
}) {
  const count = useMotionValue(0);
  const display = useTransform(count, format);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <motion.span>{display}</motion.span>;
}

function NetworkRow({
  color,
  name,
  count,
  pct,
  index,
}: {
  color: string;
  name: string;
  count: number;
  pct: number;
  index: number;
}) {
  const barDelay = 0.85 + index * 0.18;

  return (
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs text-white/70 font-medium">{name}</span>
          <span className="text-xs text-white/30">
            <CountUp to={count} delay={barDelay} />
          </span>
        </div>
        <div
          className="h-0.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "oklch(0.50 0.22 292 / 0.2)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              backgroundColor: color,
              opacity: 0.75,
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: barDelay, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

export function DisbursementCard() {
  return (
    <div className="w-full" style={{ maxWidth: "340px" }}>
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "oklch(0.30 0.18 292 / 0.9)",
          border: "1px solid oklch(0.50 0.22 292 / 0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-white/35 uppercase tracking-widest mb-1.5">April Payroll</p>
            <p className="font-display text-3xl font-black text-white leading-none">
              K{" "}
              <CountUp
                to={45280}
                delay={0.55}
                format={(v) => Math.round(v).toLocaleString()}
              />
            </p>
            <p className="text-xs text-white/30 mt-1">
              <CountUp to={35} delay={0.65} /> workers
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-amber/15 px-2.5 py-1 text-xs font-semibold text-amber">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            Disbursed
          </span>
        </div>

        {/* Network rows */}
        <div className="space-y-3.5 mb-5">
          <NetworkRow color="#FFCC00" name="MTN Money"     count={24} pct={69} index={0} />
          <NetworkRow color="#EF1C25" name="Airtel Money"  count={8}  pct={23} index={1} />
          <NetworkRow color="#00A651" name="Zamtel Kwacha" count={3}  pct={8}  index={2} />
        </div>

        {/* Footer */}
        <div
          className="border-t pt-4 flex items-center justify-between"
          style={{ borderColor: "oklch(0.50 0.22 292 / 0.25)" }}
        >
          <span className="text-xs text-white/25">All payments confirmed</span>
          <span className="text-xs text-white/25">1 click</span>
        </div>
      </div>
      <p className="text-center text-xs text-white/20 mt-3 tracking-wide">
        MTN · Airtel · Zamtel in one payroll run
      </p>
    </div>
  );
}
