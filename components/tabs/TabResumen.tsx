"use client";

import { useEffect, useState } from "react";
import { CALENDAR } from "@/lib/data/calendar";
import { PICKS } from "@/lib/data/picks";
import { findNextMatch, humanUntil, todayISO, type NextMatch } from "@/lib/dates";
import type { TabKey } from "@/components/TabNav";
import type { PicksDay } from "@/lib/types";
import { JornadaModal } from "@/components/JornadaModal";

export function TabResumen({ onGo }: { onGo: (t: TabKey) => void }) {
  const [next, setNext] = useState<NextMatch>(null);
  const [modalDay, setModalDay] = useState<PicksDay | null>(null);
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

      {/* Jornadas — cards clickeables que abren el modal de detalle */}
      <div>
        <h2 className="text-base mb-3 text-white">Jornadas</h2>
        <div className="flex flex-col gap-3">
          {PICKS.map((d) => {
            const isToday = d.date === today;
            return (
              <button
                key={d.id}
                onClick={() => setModalDay(d)}
                className={`neon-card neon-press p-4 text-left ${isToday ? "glow-red" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base text-white">{d.label}</h3>
                  <span className="chip" style={{ background: "var(--surface-2)", color: "var(--turquoise)" }}>Ver detalle →</span>
                </div>
                <ul className="flex flex-col gap-1 mt-2">
                  {d.matches.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-mono font-bold text-xs" style={{ color: "var(--turquoise)" }}>{m.time_bolivia}</span>
                      <span className="text-white/90 truncate">{m.home_flag} {m.home} vs {m.away} {m.away_flag}</span>
                      <span className="text-xs ml-auto muted shrink-0">{m.picks.length} picks</span>
                    </li>
                  ))}
                </ul>
                {d.megaCombo && (
                  <div className="text-xs mt-2 font-semibold" style={{ color: "var(--lilac)" }}>
                    ★ {d.megaCombo.title} <span className="font-mono" style={{ color: "var(--turquoise)" }}>{d.megaCombo.odds}</span>
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

      {modalDay && <JornadaModal day={modalDay} onClose={() => setModalDay(null)} />}
    </div>
  );
}
