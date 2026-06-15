"use client";

import { useEffect, useState } from "react";
import { CALENDAR } from "@/lib/data/calendar";
import { DUAL_JORNADAS } from "@/lib/data/picks";
import { findNextMatch, humanUntil, todayISO, longLabel, type NextMatch } from "@/lib/dates";
import type { TabKey } from "@/components/TabNav";

const JORNADAS = [...DUAL_JORNADAS].sort((a, b) => a.jornada - b.jornada);
const kickoffTime = (iso?: string) => iso?.match(/T(\d{2}:\d{2})/)?.[1] ?? "";

export function TabResumen({ onGo }: { onGo: (t: TabKey) => void }) {
  const [next, setNext] = useState<NextMatch>(null);
  useEffect(() => setNext(findNextMatch(CALENDAR)), []);

  const today = todayISO();

  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-5">
      {/* Próximo partido / Hoy juega */}
      {next && (
        <div className={`neon-card p-4 ${next.isToday ? "glow-red" : "glow-blue"}`}>
          <div className="text-xs uppercase tracking-wide mb-1.5 font-bold" style={{ color: next.isToday ? "var(--red-main)" : "var(--blue-deep)" }}>
            {next.isToday ? "⚽ Hoy juega" : "Próximo partido"}
          </div>
          <div className="text-lg sm:text-xl text-white">
            {next.match.home_flag} {next.match.home} <span className="muted">vs</span> {next.match.away} {next.match.away_flag}
          </div>
          <div className="text-sm mt-1.5 muted">
            {next.match.group} · {next.match.venue}, {next.match.city} ·{" "}
            <span className="font-bold" style={{ color: "var(--turquoise)" }}>
              {next.match.time_et} hora Bolivia {next.isToday ? "" : `(${humanUntil(next.hoursUntil)})`}
            </span>
          </div>
        </div>
      )}

      {/* Jornadas — cards que llevan a la pestaña Picks */}
      <div>
        <h2 className="text-base mb-3 text-white">Jornadas</h2>
        <div className="flex flex-col gap-3">
          {JORNADAS.map((d) => {
            const isToday = d.fecha === today;
            const mega = d.combos?.[0];
            return (
              <button
                key={d.jornada}
                onClick={() => onGo("picks")}
                className={`neon-card neon-press p-4 text-left ${isToday ? "glow-red" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base text-white">{`Jornada ${d.jornada} · ${longLabel(d.fecha)}`}</h3>
                  <span className="chip" style={{ background: "var(--surface-2)", color: "var(--turquoise)" }}>Ver picks →</span>
                </div>
                <ul className="flex flex-col gap-1 mt-2">
                  {d.partidos.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-mono font-bold text-xs" style={{ color: "var(--turquoise)" }}>{kickoffTime(m.kickoff)}</span>
                      <span className="text-white/90 truncate">{m.match}</span>
                      <span className="text-xs ml-auto muted shrink-0">Klement + Claude</span>
                    </li>
                  ))}
                </ul>
                {mega && (
                  <div className="text-xs mt-2 font-semibold" style={{ color: "var(--lilac)" }}>
                    ★ {mega.title} <span className="font-mono" style={{ color: "var(--turquoise)" }}>{mega.odds}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onGo("calendario")} className="neon-card neon-press p-4 text-left glow-turq">
          <div className="text-2xl">📅</div>
          <div className="text-sm font-bold mt-1 text-white">Calendario</div>
          <div className="text-xs muted">Todos los partidos por fecha</div>
        </button>
        <button onClick={() => onGo("grupos")} className="neon-card neon-press p-4 text-left glow-purple">
          <div className="text-2xl">🗂️</div>
          <div className="text-sm font-bold mt-1 text-white">Grupos</div>
          <div className="text-xs muted">Los 12 grupos del Mundial</div>
        </button>
      </div>
    </div>
  );
}
