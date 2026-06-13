"use client";

import { PICKS } from "@/lib/data/picks";
import type { Confidence, Combo, PickMatch } from "@/lib/types";

// Tema del mini-bloque del pick según la confianza (el fondo ES el indicador).
const CONF: Record<Confidence, { label: string; block: string }> = {
  hot: { label: "🔥 Alta", block: "lego-emerald" },
  moderate: { label: "Media", block: "lego-gold" },
  low: { label: "Baja", block: "lego-page" },
};

export function TabPicks() {
  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Chips de jornada */}
      <div className="flex gap-2 overflow-x-auto mp-scroll pb-2 mb-4 -mx-1 px-1 sticky top-[56px] z-30" style={{ background: "var(--bg-page)" }}>
        {PICKS.map((d) => (
          <button
            key={d.id}
            onClick={() => go(d.id)}
            className="lego-block--sm lego-white lego-pressable shrink-0 px-3 py-1.5 text-sm font-bold"
          >
            Jornada {d.jornada}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {PICKS.map((day) => (
          <section key={day.id} id={day.id} className="scroll-mt-28">
            <h2 className="text-lg mb-4">{day.label}</h2>

            <div className="flex flex-col gap-5">
              {day.matches.map((m, i) => (
                <MatchPicks key={i} m={m} />
              ))}
            </div>

            {day.megaCombo && (
              <div className="mt-5">
                <ComboCard combo={day.megaCombo} highlight />
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function MatchPicks({ m }: { m: PickMatch }) {
  return (
    <article className="lego-block lego-white overflow-hidden p-0">
      {/* Cabecera del partido */}
      <div className="lego-gold px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1" style={{ borderBottom: "3px solid var(--ink)" }}>
        <span className="text-base font-bold">
          {m.home_flag} {m.home} <span className="opacity-60">vs</span> {m.away} {m.away_flag}
        </span>
        <span className="lego-block--sm lego-white text-xs px-1.5 py-0.5 font-bold">{m.group}</span>
        <span className="text-xs ml-auto font-bold">{m.time_bolivia} · hora Bolivia</span>
        <span className="text-xs w-full sm:w-auto font-medium opacity-80">{m.venue} · {m.city}</span>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4 on-light-muted">{m.context}</p>

        {/* Picks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {m.picks.map((p, i) => {
            const c = CONF[p.confidence];
            return (
              <div key={i} className={`lego-block--sm ${c.block} p-3`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-wide font-bold opacity-70">{p.market}</span>
                  <span className="text-[11px] font-bold whitespace-nowrap">{c.label}</span>
                </div>
                <div className="text-sm font-bold">{p.value}</div>
                <div className="text-xs mt-1 leading-snug font-medium opacity-75">{p.note}</div>
              </div>
            );
          })}
        </div>

        {/* Combos */}
        {m.combos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {m.combos.map((cmb, i) => (
              <ComboCard key={i} combo={cmb} />
            ))}
          </div>
        )}

        {/* Avoid */}
        {m.avoid.length > 0 && (
          <div className="lego-block--sm lego-red mt-4 p-3">
            <div className="text-xs font-bold mb-1.5 uppercase">⚠️ Evitar</div>
            <ul className="text-xs space-y-1 font-medium on-dark-muted">
              {m.avoid.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function ComboCard({ combo, highlight }: { combo: Combo; highlight?: boolean }) {
  // Combo recomendado = bloque púrpura (blanco); mega combo destacado = gold (ink).
  return (
    <div className={`lego-block--sm ${highlight ? "lego-gold" : "lego-purple"} p-3`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-bold">{combo.title}</span>
        <span className="text-sm font-mono font-bold">{combo.odds}</span>
      </div>
      <ul className="text-xs space-y-1 mb-2">
        {combo.legs.map((l, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="font-bold">✓</span>
            <span className="font-medium">{l}</span>
          </li>
        ))}
      </ul>
      <div className={`text-[11px] font-semibold ${highlight ? "opacity-70" : "on-dark-muted"}`}>Riesgo: {combo.risk}</div>
      <div className={`text-xs mt-1 leading-snug font-medium ${highlight ? "opacity-70" : "on-dark-muted"}`}>{combo.note}</div>
    </div>
  );
}
