"use client";

import { useEffect, useState } from "react";
import { CALENDAR } from "@/lib/data/calendar";
import { findNextMatch, humanUntil, type NextMatch } from "@/lib/dates";

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
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Mundial 2026 · <span style={{ color: "var(--gold)" }}>Predictor</span>
        </h1>
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
