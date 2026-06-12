"use client";

import { useEffect, useState } from "react";
import { CALENDAR } from "@/lib/data/calendar";
import { findNextMatch, humanUntil, type NextMatch } from "@/lib/dates";
import { TrophyIcon } from "@/components/TrophyIcon";

export function PanelHeader() {
  const [next, setNext] = useState<NextMatch>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => setNext(findNextMatch(CALENDAR));
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="px-4 sm:px-6 pt-6 pb-4"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-primary)" }}
    >
      <div className="flex items-center gap-2.5">
        <TrophyIcon size={30} />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Mundial 2026 · <span style={{ color: "var(--gold)" }}>Predictor</span>
        </h1>
        {mounted && next?.isToday && (
          <span
            className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ color: "var(--red)", background: "rgba(216,31,38,0.14)", border: "1px solid rgba(216,31,38,0.4)" }}
          >
            <span className="mp-live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--red)" }} />
            EN VIVO HOY
          </span>
        )}
      </div>

      {mounted && next ? (
        <p className="mt-1.5 text-sm" style={{ color: next.isToday ? "var(--gold)" : "var(--muted)" }}>
          {next.isToday ? "Hoy" : "Próximo partido"}:{" "}
          <span className="font-medium" style={{ color: "var(--text)" }}>
            {next.match.home_flag} {next.match.home} vs {next.match.away} {next.match.away_flag}
          </span>{" "}
          — {next.isToday ? `${next.match.time_et} (hora Bolivia)` : humanUntil(next.hoursUntil)}
        </p>
      ) : (
        <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
          Picks, combos y calendario · horarios en hora Bolivia (UTC-4)
        </p>
      )}
    </header>
  );
}
