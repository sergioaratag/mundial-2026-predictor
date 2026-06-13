"use client";

import { useEffect, useState } from "react";
import { CALENDAR } from "@/lib/data/calendar";
import { PICKS } from "@/lib/data/picks";
import { findNextMatch, humanUntil, todayISO, type NextMatch } from "@/lib/dates";
import type { TabKey } from "@/components/TabNav";

export function TabResumen({ onGo }: { onGo: (t: TabKey) => void }) {
  const [next, setNext] = useState<NextMatch>(null);
  useEffect(() => setNext(findNextMatch(CALENDAR)), []);

  const today = todayISO();
  const jornadaHoy = PICKS.find((d) => d.date === today) ?? PICKS.find((d) => d.date >= today) ?? PICKS[PICKS.length - 1];

  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-5">
      {/* Próximo partido / Hoy juega */}
      {next && (
        <div className={`lego-block ${next.isToday ? "lego-emerald" : "lego-white"} p-4`}>
          <div className="text-xs uppercase tracking-wide mb-1.5 font-bold">
            {next.isToday ? "⚽ Hoy juega" : "Próximo partido"}
          </div>
          <div className="text-lg sm:text-xl">
            {next.match.home_flag} {next.match.home} <span className="opacity-60">vs</span> {next.match.away} {next.match.away_flag}
          </div>
          <div className={`text-sm mt-1.5 font-medium ${next.isToday ? "" : "on-light-muted"}`}>
            {next.match.group} · {next.match.venue}, {next.match.city} ·{" "}
            <span className="font-bold">
              {next.match.time_et} hora Bolivia {next.isToday ? "" : `(${humanUntil(next.hoursUntil)})`}
            </span>
          </div>
        </div>
      )}

      {/* Resumen de la jornada */}
      {jornadaHoy && (
        <div className="lego-block lego-white p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-base">{jornadaHoy.label}</h2>
            <button
              onClick={() => onGo("picks")}
              className="lego-block--sm lego-gold lego-pressable text-xs px-2.5 py-1 font-bold shrink-0"
            >
              Ver picks →
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {jornadaHoy.matches.map((m, i) => (
              <li key={i} className="lego-block--sm lego-page flex items-center gap-2 text-sm px-2.5 py-1.5">
                <span className="font-mono font-bold text-xs">{m.time_bolivia}</span>
                <span className="font-medium truncate">{m.home_flag} {m.home} vs {m.away} {m.away_flag}</span>
                <span className="text-xs ml-auto on-light-muted shrink-0">{m.picks.length} picks</span>
              </li>
            ))}
          </ul>
          {jornadaHoy.megaCombo && (
            <div className="lego-block--sm lego-gold mt-3 text-sm px-3 py-2 font-semibold">
              ★ {jornadaHoy.megaCombo.title}{" "}
              <span className="font-mono font-bold">{jornadaHoy.megaCombo.odds}</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onGo("calendario")} className="lego-block lego-lime lego-pressable p-4 text-left">
          <div className="text-2xl">📅</div>
          <div className="text-sm font-bold mt-1">Calendario</div>
          <div className="text-xs font-medium opacity-70">Todos los partidos por fecha</div>
        </button>
        <button onClick={() => onGo("grupos")} className="lego-block lego-purple lego-pressable p-4 text-left">
          <div className="text-2xl">🗂️</div>
          <div className="text-sm font-bold mt-1">Grupos</div>
          <div className="text-xs font-medium on-dark-muted">Los 12 grupos del Mundial</div>
        </button>
      </div>
    </div>
  );
}
