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
    <div className="px-3 sm:px-6 pt-5 pb-3">
      <header className="neon-card glow-purple px-4 sm:px-5 py-4">
        <div className="flex items-center gap-3">
          <TrophyIcon size={32} glow />
          <h1 className="text-xl sm:text-3xl tracking-tight text-white leading-none">
            Mundial 2026 · <span style={{ color: "var(--turquoise)" }}>Predictor</span>
          </h1>
          {mounted && next?.isToday && (
            <span
              className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide"
              style={{ color: "var(--white)", background: "rgba(211,48,32,0.18)", boxShadow: "var(--glow-red)" }}
            >
              <span className="mp-live-dot h-2 w-2 rounded-full" style={{ background: "var(--red-main)" }} />
              En vivo hoy
            </span>
          )}
        </div>

        {mounted && next ? (
          <p className="mt-2.5 text-sm font-medium muted">
            {next.isToday ? "Hoy" : "Próximo partido"}:{" "}
            <span className="text-white font-semibold">
              {next.match.home_flag} {next.match.home} vs {next.match.away} {next.match.away_flag}
            </span>{" "}
            — {next.isToday ? `${next.match.time_et} (hora Bolivia)` : humanUntil(next.hoursUntil)}
          </p>
        ) : (
          <p className="mt-2.5 text-sm muted">
            Picks, combos y calendario · horarios en hora Bolivia (UTC-4)
          </p>
        )}
      </header>
    </div>
  );
}
