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
      {/* Próximo partido */}
      {next && (
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: `1px solid ${next.isToday ? "var(--gold)" : "var(--border)"}` }}>
          <div className="text-xs uppercase tracking-wide mb-1.5" style={{ color: next.isToday ? "var(--gold)" : "var(--muted)" }}>
            {next.isToday ? "Hoy juega" : "Próximo partido"}
          </div>
          <div className="text-lg font-semibold">
            {next.match.home_flag} {next.match.home} <span style={{ color: "var(--muted)" }}>vs</span> {next.match.away} {next.match.away_flag}
          </div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {next.match.group} · {next.match.venue}, {next.match.city} ·{" "}
            <span style={{ color: "var(--gold)" }}>
              {next.match.time_et} hora Bolivia {next.isToday ? "" : `(${humanUntil(next.hoursUntil)})`}
            </span>
          </div>
        </div>
      )}

      {/* Resumen de la jornada */}
      {jornadaHoy && (
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-base font-semibold" style={{ color: "var(--gold)" }}>{jornadaHoy.label}</h2>
            <button onClick={() => onGo("picks")} className="text-xs px-2.5 py-1 rounded-md" style={{ background: "var(--bg-panel)", color: "var(--text)", border: "1px solid var(--border)" }}>
              Ver picks →
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {jornadaHoy.matches.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span style={{ color: "var(--gold)" }}>{m.time_bolivia}</span>
                <span>{m.home_flag} {m.home} vs {m.away} {m.away_flag}</span>
                <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>{m.picks.length} picks</span>
              </li>
            ))}
          </ul>
          {jornadaHoy.megaCombo && (
            <div className="mt-3 text-sm rounded-lg p-2.5" style={{ background: "rgba(216,178,90,0.10)", border: "1px solid var(--gold)" }}>
              <span style={{ color: "var(--gold)" }}>★ {jornadaHoy.megaCombo.title}</span>{" "}
              <span className="font-mono" style={{ color: "var(--green)" }}>{jornadaHoy.megaCombo.odds}</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onGo("calendario")} className="rounded-xl p-4 text-left" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="text-2xl">📅</div>
          <div className="text-sm font-medium mt-1">Calendario</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Todos los partidos por fecha</div>
        </button>
        <button onClick={() => onGo("grupos")} className="rounded-xl p-4 text-left" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="text-2xl">🗂️</div>
          <div className="text-sm font-medium mt-1">Grupos</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Los 12 grupos del Mundial</div>
        </button>
      </div>
    </div>
  );
}
