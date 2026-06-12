"use client";

import { PICKS } from "@/lib/data/picks";
import type { Confidence, Combo, PickMatch } from "@/lib/types";

const CONF: Record<Confidence, { label: string; color: string; bg: string }> = {
  hot: { label: "🔥 Alta", color: "var(--gold)", bg: "rgba(216,178,90,0.15)" },
  moderate: { label: "Media", color: "var(--emerald)", bg: "rgba(0,197,102,0.14)" },
  low: { label: "Baja", color: "var(--muted)", bg: "rgba(154,154,146,0.12)" },
};

export function TabPicks() {
  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Chips de jornada */}
      <div className="flex gap-2 overflow-x-auto mp-scroll pb-2 mb-4 -mx-1 px-1 sticky top-[49px] z-30" style={{ background: "var(--bg-primary)" }}>
        {PICKS.map((d) => (
          <button
            key={d.id}
            onClick={() => go(d.id)}
            className="shrink-0 px-3 py-1.5 rounded-full text-sm"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Jornada {d.jornada}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {PICKS.map((day) => (
          <section key={day.id} id={day.id} className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--gold)" }}>
              {day.label}
            </h2>

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
    <article className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {/* Cabecera del partido */}
      <div className="px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1" style={{ background: "var(--bg-panel)" }}>
        <span className="text-base font-semibold">
          {m.home_flag} {m.home} <span style={{ color: "var(--muted)" }}>vs</span> {m.away} {m.away_flag}
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--bg-primary)", color: "var(--muted)" }}>{m.group}</span>
        <span className="text-xs ml-auto" style={{ color: "var(--gold)" }}>{m.time_bolivia} · hora Bolivia</span>
        <span className="text-xs w-full sm:w-auto" style={{ color: "var(--muted)" }}>{m.venue} · {m.city}</span>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{m.context}</p>

        {/* Picks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {m.picks.map((p, i) => {
            const c = CONF[p.confidence];
            return (
              <div key={i} className="rounded-lg p-3" style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>{p.market}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ color: c.color, background: c.bg }}>{c.label}</span>
                </div>
                <div className="text-sm font-medium">{p.value}</div>
                <div className="text-xs mt-1 leading-snug" style={{ color: "var(--muted)" }}>{p.note}</div>
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
          <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.25)" }}>
            <div className="text-xs font-medium mb-1.5" style={{ color: "var(--red)" }}>⚠️ Evitar</div>
            <ul className="text-xs space-y-1" style={{ color: "var(--muted)" }}>
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
  return (
    <div
      className="rounded-lg p-3"
      style={{
        background: highlight ? "rgba(216,178,90,0.10)" : "var(--bg-primary)",
        border: `1px solid ${highlight ? "var(--gold)" : "var(--border)"}`,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-semibold" style={{ color: highlight ? "var(--gold)" : "var(--text)" }}>{combo.title}</span>
        <span className="text-sm font-mono" style={{ color: "var(--green)" }}>{combo.odds}</span>
      </div>
      <ul className="text-xs space-y-1 mb-2">
        {combo.legs.map((l, i) => (
          <li key={i} className="flex gap-1.5">
            <span style={{ color: "var(--gold)" }}>✓</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: "var(--muted)" }}>
        <span>Riesgo: {combo.risk}</span>
      </div>
      <div className="text-xs mt-1 leading-snug" style={{ color: "var(--muted)" }}>{combo.note}</div>
    </div>
  );
}
