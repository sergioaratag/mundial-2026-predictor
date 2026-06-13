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
      <header className="lego-block lego-purple px-4 sm:px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="lego-block--sm bg-white inline-flex items-center justify-center h-9 w-9 shrink-0">
            <TrophyIcon size={24} />
          </span>
          <h1 className="text-lg sm:text-2xl tracking-tight text-white leading-none">
            Mundial 2026 · <span style={{ color: "var(--gold-light)" }}>Predictor</span>
          </h1>
          {mounted && next?.isToday && (
            <span className="lego-block--sm lego-red ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase">
              <span className="mp-live-dot h-2 w-2 rounded-full" style={{ background: "var(--lime)" }} />
              En vivo hoy
            </span>
          )}
        </div>

        {mounted && next ? (
          <p className="mt-2.5 text-sm font-medium on-dark-muted">
            {next.isToday ? "Hoy" : "Próximo partido"}:{" "}
            <span className="text-white font-semibold">
              {next.match.home_flag} {next.match.home} vs {next.match.away} {next.match.away_flag}
            </span>{" "}
            — {next.isToday ? `${next.match.time_et} (hora Bolivia)` : humanUntil(next.hoursUntil)}
          </p>
        ) : (
          <p className="mt-2.5 text-sm on-dark-muted">
            Picks, combos y calendario · horarios en hora Bolivia (UTC-4)
          </p>
        )}
      </header>
    </div>
  );
}
