"use client";

import { useEffect } from "react";
import type { DualMatch, Band, Option } from "@/lib/types";

// Banda de respaldo → color (alta=verde, media=ámbar, baja=gris).
const BAND: Record<Band, { label: string; color: string; bg: string; order: number }> = {
  alta: { label: "Alta", color: "var(--lime)", bg: "rgba(183,213,69,0.12)", order: 0 },
  media: { label: "Media", color: "#E8A33D", bg: "rgba(232,163,61,0.14)", order: 1 },
  baja: { label: "Baja", color: "#98A0B3", bg: "rgba(152,160,178,0.14)", order: 2 },
};

const SRC = {
  klement: { label: "Klement", color: "var(--blue-deep)", icon: "📊" },
  claude: { label: "Claude", color: "var(--turquoise)", icon: "🤖" },
  simulaciones: { label: "Simulaciones", color: "var(--lilac)", icon: "🎲" },
} as const;

type DetailSource = keyof typeof SRC;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--lilac)" }}>{title}</h4>
      {children}
    </div>
  );
}

function oddsLine(m: DualMatch): string | null {
  if (m.oddsNote) return m.oddsNote;
  const o = m.odds;
  if (!o) return null;
  const parts: string[] = [];
  if (o.home != null) parts.push(`local ${o.home.toFixed(2)}`);
  if (o.draw != null) parts.push(`empate ${o.draw.toFixed(2)}`);
  if (o.away != null) parts.push(`visita ${o.away.toFixed(2)}`);
  return parts.length ? `Cuotas: ${parts.join(" · ")}.` : null;
}

// ¿Acertó el pick principal? Conservador: cubre 1X2, Totales (Over/Under), BTTS
// y hándicaps simples. Si la selección es ambigua/combinada o no se puede resolver
// con certeza, devuelve null (no se muestra ✓/✗ — nunca inventa el veredicto).
function pickHit(result: string, market: string, selection: string, match: string): boolean | null {
  const nums = result.match(/(\d+)\s*[-–:]\s*(\d+)/);
  if (!nums) return null;
  const h = parseInt(nums[1], 10); // local
  const a = parseInt(nums[2], 10); // visitante
  const total = h + a;
  const sel = selection.toLowerCase().trim();
  const mkt = market.toLowerCase();
  const [home, away] = match.split(/\s+vs\s+/i).map((s) => s.trim().toLowerCase());
  const inHome = !!home && sel.includes(home);
  const inAway = !!away && sel.includes(away);

  // Mercados no resolubles desde el marcador, o combinados → sin veredicto.
  if (/córner|corner|falta|amarilla|tarjeta|goleador|anota/.test(sel + mkt)) return null;
  if (sel.includes(" + ")) return null;

  // BTTS / ambos marcan
  if (/btts|ambos marcan/.test(mkt) || /btts|ambos marcan/.test(sel)) {
    const both = h > 0 && a > 0;
    if (/\bno\b/.test(sel)) return !both;
    if (/s[íi]/.test(sel)) return both;
    return null;
  }

  // Totales Over/Under
  const ou = sel.match(/(over|under)\s*(\d+(?:\.\d+)?)/);
  if (ou) return ou[1] === "over" ? total > parseFloat(ou[2]) : total < parseFloat(ou[2]);

  // Hándicap "Equipo +/-N.5"
  const hc = sel.match(/([+-])\s*(\d+(?:\.\d+)?)/);
  if (hc) {
    const line = parseFloat(hc[2]) * (hc[1] === "-" ? -1 : 1);
    if (inHome && !inAway) return h + line > a;
    if (inAway && !inHome) return a + line > h;
    return null;
  }

  // 1X2 / resultado: empate o equipo gana
  if (/empate|draw/.test(sel)) return h === a;
  if (inHome && !inAway) return h > a;
  if (inAway && !inHome) return a > h;
  return null;
}

export function MatchDetailModal({ m, source, onClose }: { m: DualMatch; source: DetailSource; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const meta = SRC[source];
  const time = m.kickoff?.match(/T(\d{2}:\d{2})/)?.[1] ?? null;
  const sim = source === "simulaciones" ? m.simulaciones : undefined;
  const pick = source === "simulaciones" ? undefined : m.picks?.[source];
  const options: Option[] = pick?.options ? [...pick.options].sort((a, b) => BAND[a.confidence].order - BAND[b.confidence].order) : [];

  const oddsChips: { label: string; val: number }[] = [];
  if (m.odds?.home != null) oddsChips.push({ label: "1", val: m.odds.home });
  if (m.odds?.draw != null) oddsChips.push({ label: "X", val: m.odds.draw });
  if (m.odds?.away != null) oddsChips.push({ label: "2", val: m.odds.away });
  const oNote = oddsLine(m);

  const combo = source === "claude" ? m.picks?.claude?.comboRecomendado : undefined;
  const avoid = source === "claude" ? m.avoid : undefined;
  const detail = pick?.driver ?? pick?.note;
  const resultHit = m.result && pick ? pickHit(m.result, pick.market, pick.selection, m.match) : null;

  return (
    <div
      className="fixed inset-0 z-50 mp-overlay flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="neon-card glow-purple w-full max-w-2xl my-auto" onClick={(e) => e.stopPropagation()}>
        <div
          className="px-5 py-4 flex items-start gap-3 sticky top-0 z-10 rounded-t-[14px]"
          style={{ background: "linear-gradient(135deg, rgba(64,40,120,0.96), rgba(40,52,110,0.96))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
              <span className="text-xs font-display font-bold" style={{ color: meta.color }}>{meta.icon} {meta.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{m.match}</div>
            <div className="text-xs mt-1 muted">
              {m.venue}
              {time ? ` · ${time} hora Bolivia` : ""}
              {m.result ? ` · Resultado: ${m.result}` : ""}
            </div>
            {m.referee?.name && (
              <div className="text-xs mt-1" style={{ color: "var(--turquoise)" }}>
                ⚖️ {m.referee.name}
                {m.referee.avgCards != null ? ` · 🟨 ${m.referee.avgCards}` : ""}
                {m.referee.avgFouls ? ` · ⚡ ${m.referee.avgFouls}` : ""}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="neon-press shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: "var(--surface-2)" }}
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Resultado (si el partido ya se jugó) */}
          {m.result && (
            <div
              className="neon-sub p-4 flex items-center gap-4"
              style={resultHit === true ? { boxShadow: "var(--glow-lime)" } : resultHit === false ? { boxShadow: "var(--glow-red)" } : undefined}
            >
              <div className="text-3xl font-display font-bold text-white tracking-[0.15em]">{m.result}</div>
              <div>
                <div className="text-[11px] uppercase tracking-wide muted font-semibold">Resultado final</div>
                {resultHit !== null && (
                  <div className="text-sm font-bold mt-0.5" style={{ color: resultHit ? "var(--lime)" : "var(--red-main)" }}>
                    {resultHit ? "✓ El pick acertó" : "✗ El pick falló"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 1. Cómo llegan */}
          {m.preview && (
            <Section title="Cómo llegan">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(252,251,250,0.85)" }}>{m.preview}</p>
            </Section>
          )}

          {/* 2. Qué dicen las casas */}
          {(oddsChips.length > 0 || oNote) && (
            <Section title="Qué dicen las casas">
              {oddsChips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {oddsChips.map((o) => (
                    <span key={o.label} className="chip font-mono" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{o.label}: {o.val.toFixed(2)}</span>
                  ))}
                </div>
              )}
              {oNote && <p className="text-sm leading-snug muted">{oNote}</p>}
            </Section>
          )}

          {/* Simulaciones: panel del modelo Monte Carlo (solo en source="simulaciones"). */}
          {sim && (
            <Section title="Simulaciones del partido">
              <div className="text-xs muted mb-3">{sim.model}</div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { lbl: "Local (1)", val: sim.win.h },
                  { lbl: "Empate (X)", val: sim.win.d },
                  { lbl: "Visita (2)", val: sim.win.a },
                ].map((c) => (
                  <div key={c.lbl} className="neon-sub p-3 text-center">
                    <div className="text-2xl font-display font-bold text-white">{c.val}%</div>
                    <div className="text-[11px] uppercase tracking-wide muted font-semibold mt-0.5">{c.lbl}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="chip" style={{ background: "var(--surface-2)", color: "var(--white)" }}>Over 2.5: {sim.over25}%</span>
                <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>Under 2.5: {100 - sim.over25}%</span>
                <span className="chip" style={{ background: "var(--surface-2)", color: "var(--white)" }}>BTTS Sí: {sim.btts}%</span>
                <span className="chip font-mono" style={{ background: "rgba(135,231,223,0.08)", color: "var(--turquoise)" }}>xG total: {sim.xg.toFixed(2)}</span>
                <span className="chip font-mono" style={{ background: "rgba(135,231,223,0.08)", color: "var(--turquoise)" }}>Marcador: {sim.topScore}</span>
              </div>
              <div className="text-sm mt-3 leading-snug" style={{ color: "rgba(252,251,250,0.85)" }}>
                <span className="font-semibold" style={{ color: "var(--lilac)" }}>Hándicaps: </span>{sim.hcap}
              </div>
              {sim.note && <p className="text-sm mt-2 leading-snug muted">{sim.note}</p>}
            </Section>
          )}

          {/* 3. Picks por probabilidad (fuente clickeada). Si no hay options, al menos el pick principal. */}
          {pick && (
            <Section title="Picks por probabilidad">
              {options.length > 0 ? (
                <div className="neon-sub overflow-hidden">
                  {options.map((o, i) => {
                    const b = BAND[o.confidence];
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-2.5"
                        style={{ borderTop: i ? "1px solid rgba(255,255,255,0.06)" : undefined }}
                      >
                        <span className="text-[11px] uppercase tracking-wide muted font-semibold w-24 sm:w-32 shrink-0">{o.market}</span>
                        <span className="text-sm text-white flex-1">{o.selection}</span>
                        <span className="chip shrink-0" style={{ color: b.color, background: b.bg }}>{b.label}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="neon-sub p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{pick.market}</span>
                  </div>
                  <div className="text-base font-bold text-white">{pick.selection}</div>
                  {detail && <div className="text-xs mt-1 leading-snug muted">{detail}</div>}
                </div>
              )}
            </Section>
          )}

          {/* 4. Solo Claude: combo recomendado + evitar */}
          {combo && (
            <div className="neon-sub p-3" style={{ boxShadow: "var(--glow-purple)" }}>
              <div className="text-sm font-bold mb-2" style={{ color: "var(--lilac)" }}>★ Combo recomendado</div>
              <ul className="text-xs space-y-1.5 mb-2.5">
                {combo.legs.map((l, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span style={{ color: "var(--lime)" }}>✓</span>
                    <span className="text-white/90">{l}</span>
                  </li>
                ))}
              </ul>
              <span className="chip" style={{ background: "var(--surface-2)", color: "var(--white)" }}>{combo.legs.length} {combo.legs.length === 1 ? "pata" : "patas"}</span>
              {combo.nota && <div className="text-xs mt-2 leading-snug muted">{combo.nota}</div>}
            </div>
          )}

          {avoid && avoid.length > 0 && (
            <div className="neon-sub p-3 glow-red">
              <div className="text-xs font-bold mb-1.5 uppercase" style={{ color: "var(--red-main)" }}>⚠️ Evitar / A tener en cuenta</div>
              <ul className="text-xs space-y-1.5 muted">
                {avoid.map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
