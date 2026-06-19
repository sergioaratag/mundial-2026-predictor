"use client";

import { useState } from "react";
import { DUAL_JORNADAS } from "@/lib/data/picks";
import type { DualJornada, DualMatch, SourcePick, Sim } from "@/lib/types";
import { ComboBlock, ComboAdvisory } from "@/components/picks-ui";
import { MatchDetailModal } from "@/components/MatchDetailModal";
import { todayISO, longLabel, shortLabel } from "@/lib/dates";

const dayMs = (iso: string) => new Date(`${iso}T12:00:00-04:00`).getTime();

// Jornadas ordenadas cronológicamente por su fecha real (no por número de
// jornada: j9/j10 van entre j4 y j15 por número pero son posteriores por fecha).
const JORNADAS = [...DUAL_JORNADAS].sort((a, b) => a.fecha.localeCompare(b.fecha));

// Jornada cuya fecha está más cerca de hoy (default del selector).
// Ante empate de fecha se prefiere la de número mayor (la más reciente).
function defaultNum(): number {
  const t = dayMs(todayISO());
  let best = JORNADAS[0];
  let bestD = Math.abs(dayMs(best.fecha) - t);
  for (const j of JORNADAS) {
    const d = Math.abs(dayMs(j.fecha) - t);
    if (d < bestD || (d === bestD && j.jornada > best.jornada)) {
      best = j;
      bestD = d;
    }
  }
  return best.jornada;
}

export function TabPicks() {
  const [sel, setSel] = useState<number>(() => defaultNum());
  const current = JORNADAS.find((j) => j.jornada === sel) ?? JORNADAS[0];

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Selector de jornada — renderiza solo la seleccionada */}
      <div
        className="flex gap-2 overflow-x-auto mp-scroll pb-2 mb-5 -mx-1 px-1 sticky top-[52px] z-30"
        style={{ background: "rgba(33,36,41,0.82)", backdropFilter: "blur(10px)" }}
      >
        {JORNADAS.map((j) => {
          const active = j.jornada === sel;
          return (
            <button
              key={j.jornada}
              onClick={() => setSel(j.jornada)}
              aria-current={active ? "page" : undefined}
              className="neon-press shrink-0 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap font-display font-semibold"
              style={
                active
                  ? {
                      color: "var(--white)",
                      background: "linear-gradient(135deg, rgba(93,25,229,0.55), rgba(53,82,243,0.4))",
                      boxShadow: "0 0 18px rgba(93,25,229,0.45)",
                    }
                  : { color: "var(--lilac)", background: "var(--surface-2)" }
              }
            >
              {shortLabel(j.fecha)}
            </button>
          );
        })}
      </div>

      <section>
        <h2 className="text-lg mb-4 text-white">{longLabel(current.fecha)}</h2>
        <Jornada jornada={current} />
      </section>
    </div>
  );
}

function Jornada({ jornada }: { jornada: DualJornada }) {
  const combos = jornada.combos ?? [];
  return (
    <div className="flex flex-col gap-5">
      {jornada.partidos.map((p, i) => (
        <MatchCard key={i} m={p} />
      ))}
      {combos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {combos.map((c, i) => (
              <ComboBlock key={i} combo={c} highlight={i === 0} />
            ))}
          </div>
          <ComboAdvisory />
        </>
      )}
    </div>
  );
}

const humanizeStat = (k: string) => k.replace(/([A-Z])/g, " $1").trim();

function SourceCol({ source, pick, onOpen }: { source: "klement" | "claude"; pick: SourcePick; onOpen?: () => void }) {
  const meta =
    source === "klement"
      ? { label: "Klement", color: "var(--blue-deep)", icon: "📊" }
      : { label: "Claude", color: "var(--turquoise)", icon: "🤖" };
  const detail = pick.driver ?? pick.note;
  const body = (
    <>
      <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: meta.color }} />
        <span className="text-sm font-display font-bold" style={{ color: meta.color }}>{meta.icon} {meta.label}</span>
        <span className="chip ml-auto" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{pick.market}</span>
      </div>
      <div className="text-sm font-bold text-white leading-snug">{pick.selection}</div>
      {detail && <div className="text-xs mt-1.5 leading-snug muted">{detail}</div>}
      {onOpen && (
        <div className="text-xs mt-2 font-semibold" style={{ color: "var(--turquoise)" }}>Ver análisis completo →</div>
      )}
    </>
  );
  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className="neon-sub neon-press p-3 text-left w-full">
        {body}
      </button>
    );
  }
  return <div className="neon-sub p-3">{body}</div>;
}

// Tarjeta de Simulaciones (Monte Carlo). Solo se renderiza si el partido trae
// el objeto `simulaciones`; abre el panel de detalle en modo simulaciones.
function SimCol({ sim, onOpen }: { sim: Sim; onOpen: () => void }) {
  const color = "var(--lilac)";
  return (
    <button type="button" onClick={onOpen} className="neon-sub neon-press p-3 text-left w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: color }} />
        <span className="text-sm font-display font-bold" style={{ color }}>🎲 Simulaciones</span>
        <span className="chip ml-auto font-mono" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>xG {sim.xg.toFixed(2)}</span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <span className="chip font-mono" style={{ background: "var(--surface-2)", color: "var(--white)" }}>1: {sim.win.h}%</span>
        <span className="chip font-mono" style={{ background: "var(--surface-2)", color: "var(--white)" }}>X: {sim.win.d}%</span>
        <span className="chip font-mono" style={{ background: "var(--surface-2)", color: "var(--white)" }}>2: {sim.win.a}%</span>
      </div>
      <div className="text-xs mt-1.5 leading-snug muted">Marcador más probable {sim.topScore} · Over 2.5 {sim.over25}%</div>
      <div className="text-xs mt-2 font-semibold" style={{ color: "var(--turquoise)" }}>Ver simulación completa →</div>
    </button>
  );
}

function MatchCard({ m }: { m: DualMatch }) {
  const [open, setOpen] = useState<"klement" | "claude" | "simulaciones" | null>(null);
  const time = m.kickoff?.match(/T(\d{2}:\d{2})/)?.[1] ?? null;
  const ref = m.referee;
  const refName = ref?.name ?? null;

  const oddsChips: { label: string; val: number }[] = [];
  if (m.odds?.home != null) oddsChips.push({ label: "1", val: m.odds.home });
  if (m.odds?.draw != null) oddsChips.push({ label: "X", val: m.odds.draw });
  if (m.odds?.away != null) oddsChips.push({ label: "2", val: m.odds.away });

  const stats = m.stats ? Object.entries(m.stats) : [];
  const hasMeta = !!refName || oddsChips.length > 0 || stats.length > 0;

  // Panel universal: toda tarjeta abre el detalle (el modal tolera datos faltantes).
  const k = m.picks?.klement;
  const c = m.picks?.claude;
  const sim = m.simulaciones;
  const cardCount = (k ? 1 : 0) + (c ? 1 : 0) + (sim ? 1 : 0);

  const chipSurface = { background: "var(--surface-2)", color: "var(--lilac)" };
  const chipTurq = { background: "rgba(135,231,223,0.08)", color: "var(--turquoise)" };

  return (
    <article className="neon-card overflow-hidden">
      <div
        className="px-4 py-3"
        style={{ background: "linear-gradient(135deg, rgba(93,25,229,0.18), rgba(53,82,243,0.1))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-base font-bold text-white">{m.match}</span>
          {m.result && <span className="chip font-mono" style={{ background: "rgba(135,231,223,0.12)", color: "var(--turquoise)" }}>Final {m.result}</span>}
          {time && <span className="text-xs ml-auto font-bold" style={{ color: "var(--turquoise)" }}>{time} · hora Bolivia</span>}
        </div>
        {m.venue && <div className="text-xs mt-0.5 muted">{m.venue}</div>}
        {hasMeta && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {refName && (
              <span className="chip" style={chipTurq}>
                ⚖️ {refName}{ref?.avgCards != null ? ` · 🟨 ${ref.avgCards}` : ""}
              </span>
            )}
            {refName && ref?.avgFouls && <span className="chip" style={chipSurface}>⚡ {ref.avgFouls}</span>}
            {oddsChips.map((o) => (
              <span key={o.label} className="chip font-mono" style={chipSurface}>{o.label}: {o.val.toFixed(2)}</span>
            ))}
            {stats.map(([k2, v]) => (
              <span key={k2} className="chip" style={chipSurface}>📊 {humanizeStat(k2)}: {v}</span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className={`grid grid-cols-1 gap-3 ${cardCount >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {k && <SourceCol source="klement" pick={k} onOpen={() => setOpen("klement")} />}
          {c && <SourceCol source="claude" pick={c} onOpen={() => setOpen("claude")} />}
          {sim && <SimCol sim={sim} onOpen={() => setOpen("simulaciones")} />}
        </div>
      </div>

      {open && <MatchDetailModal m={m} source={open} onClose={() => setOpen(null)} />}
    </article>
  );
}
