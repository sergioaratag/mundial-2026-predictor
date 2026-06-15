"use client";

import { useState } from "react";
import { PICKS, DUAL_JORNADAS } from "@/lib/data/picks";
import type { PickMatch, PicksDay, DualJornada, DualMatch, SourcePick } from "@/lib/types";
import { PickItem, ComboBlock, ComboAdvisory, AvoidBlock, RefereeBlock } from "@/components/picks-ui";
import { todayISO, longLabel } from "@/lib/dates";

// Lista unificada de jornadas: modelo v1 (PicksDay) + modelo v2 (DualJornada).
type JItem =
  | { num: number; date: string; label: string; model: "v1"; data: PicksDay }
  | { num: number; date: string; label: string; model: "v2"; data: DualJornada };

const JORNADAS: JItem[] = [
  ...PICKS.map((d): JItem => ({ num: d.jornada, date: d.date, label: d.label, model: "v1", data: d })),
  ...DUAL_JORNADAS.map((d): JItem => ({ num: d.jornada, date: d.fecha, label: `Jornada ${d.jornada} · ${longLabel(d.fecha)}`, model: "v2", data: d })),
].sort((a, b) => a.num - b.num);

const dayMs = (iso: string) => new Date(`${iso}T12:00:00-04:00`).getTime();

// Jornada cuya fecha está más cerca de hoy (default del selector).
function defaultNum(): number {
  const t = dayMs(todayISO());
  let best = JORNADAS[0];
  for (const j of JORNADAS) {
    if (Math.abs(dayMs(j.date) - t) < Math.abs(dayMs(best.date) - t)) best = j;
  }
  return best.num;
}

export function TabPicks() {
  const [sel, setSel] = useState<number>(() => defaultNum());
  const current = JORNADAS.find((j) => j.num === sel) ?? JORNADAS[0];

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Selector de jornada — solo renderiza la seleccionada */}
      <div
        className="flex gap-2 overflow-x-auto mp-scroll pb-2 mb-5 -mx-1 px-1 sticky top-[52px] z-30"
        style={{ background: "rgba(33,36,41,0.82)", backdropFilter: "blur(10px)" }}
      >
        {JORNADAS.map((j) => {
          const active = j.num === sel;
          return (
            <button
              key={j.num}
              onClick={() => setSel(j.num)}
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
              J{j.num}
            </button>
          );
        })}
      </div>

      <section>
        <h2 className="text-lg mb-4 text-white">{current.label}</h2>
        {current.model === "v1" ? <JornadaV1 day={current.data} /> : <JornadaV2 jornada={current.data} />}
      </section>
    </div>
  );
}

/* ───────── Modelo v1 (jornadas 1–5, fuente única) ───────── */

function JornadaV1({ day }: { day: PicksDay }) {
  const hasCombos = day.matches.some((m) => m.combos.length > 0) || !!day.megaCombo;
  return (
    <div className="flex flex-col gap-5">
      {day.matches.map((m, i) => (
        <MatchV1 key={i} m={m} />
      ))}
      {day.megaCombo && <ComboBlock combo={day.megaCombo} highlight />}
      {hasCombos && <ComboAdvisory />}
    </div>
  );
}

function MatchV1({ m }: { m: PickMatch }) {
  return (
    <article className="neon-card overflow-hidden">
      <div
        className="px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1"
        style={{ background: "linear-gradient(135deg, rgba(93,25,229,0.18), rgba(53,82,243,0.1))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-base font-bold text-white">
          {m.home_flag} {m.home} <span className="muted">vs</span> {m.away} {m.away_flag}
        </span>
        <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{m.group}</span>
        <span className="text-xs ml-auto font-bold" style={{ color: "var(--turquoise)" }}>{m.time_bolivia} · hora Bolivia</span>
        <span className="text-xs w-full sm:w-auto muted">{m.venue} · {m.city}</span>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4 muted">{m.context}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {m.picks.map((p, i) => (
            <PickItem key={i} p={p} />
          ))}
        </div>

        {m.referee && (
          <div className="mt-4">
            <RefereeBlock referee={m.referee} />
          </div>
        )}

        {m.combos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {m.combos.map((cmb, i) => (
              <ComboBlock key={i} combo={cmb} />
            ))}
          </div>
        )}

        {m.avoid.length > 0 && (
          <div className="mt-4">
            <AvoidBlock avoid={m.avoid} />
          </div>
        )}
      </div>
    </article>
  );
}

/* ───────── Modelo v2 (doble fuente Klement / Claude) ───────── */

const humanizeStat = (k: string) => k.replace(/([A-Z])/g, " $1").trim();

function SourceCol({ source, pick }: { source: "klement" | "claude"; pick: SourcePick }) {
  const meta =
    source === "klement"
      ? { label: "Klement", color: "var(--blue-deep)", dot: "var(--blue-deep)", icon: "📊" }
      : { label: "Claude", color: "var(--turquoise)", dot: "var(--turquoise)", icon: "🤖" };
  const detail = pick.driver ?? pick.note;
  return (
    <div className="neon-sub p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: meta.dot }} />
        <span className="text-sm font-display font-bold" style={{ color: meta.color }}>
          {meta.icon} {meta.label}
        </span>
        <span className="chip ml-auto" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{pick.market}</span>
      </div>
      <div className="text-sm font-bold text-white leading-snug">{pick.selection}</div>
      {detail && <div className="text-xs mt-1.5 leading-snug muted">{detail}</div>}
    </div>
  );
}

function MatchV2({ m }: { m: DualMatch }) {
  const time = m.kickoff?.match(/T(\d{2}:\d{2})/)?.[1] ?? null;
  const ref = m.referee;
  const refName = ref?.name ?? null;

  const oddsChips: { label: string; val: number }[] = [];
  if (m.odds?.home != null) oddsChips.push({ label: "1", val: m.odds.home });
  if (m.odds?.draw != null) oddsChips.push({ label: "X", val: m.odds.draw });
  if (m.odds?.away != null) oddsChips.push({ label: "2", val: m.odds.away });

  const stats = m.stats ? Object.entries(m.stats) : [];
  const hasMeta = !!refName || (ref?.avgCards != null) || !!ref?.avgFouls || oddsChips.length > 0 || stats.length > 0;

  const chip = "chip";
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
          {time && <span className="text-xs ml-auto font-bold" style={{ color: "var(--turquoise)" }}>{time} · hora Bolivia</span>}
        </div>
        {(m.venue || m.result) && (
          <div className="text-xs mt-0.5 muted">
            {m.venue}
            {m.result ? ` · Resultado: ${m.result}` : ""}
          </div>
        )}
        {hasMeta && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {refName && <span className={chip} style={chipTurq}>⚖️ {refName}</span>}
            {ref?.avgCards != null && <span className={chip} style={chipSurface}>🟨 {ref.avgCards}</span>}
            {ref?.avgFouls && <span className={chip} style={chipSurface}>⚡ {ref.avgFouls}</span>}
            {oddsChips.map((o) => (
              <span key={o.label} className={`${chip} font-mono`} style={chipSurface}>{o.label}: {o.val.toFixed(2)}</span>
            ))}
            {stats.map(([k, v]) => (
              <span key={k} className={chip} style={chipSurface}>📊 {humanizeStat(k)}: {v}</span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {m.picks?.klement && <SourceCol source="klement" pick={m.picks.klement} />}
          {m.picks?.claude && <SourceCol source="claude" pick={m.picks.claude} />}
        </div>
      </div>
    </article>
  );
}

function JornadaV2({ jornada }: { jornada: DualJornada }) {
  return (
    <div className="flex flex-col gap-5">
      {jornada.partidos.map((p, i) => (
        <MatchV2 key={i} m={p} />
      ))}
      {jornada.combos && jornada.combos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jornada.combos.map((c, i) => (
              <ComboBlock key={i} combo={c} highlight={i === 0} />
            ))}
          </div>
          <ComboAdvisory />
        </>
      )}
    </div>
  );
}
