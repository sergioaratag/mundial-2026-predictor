"use client";

import { useEffect } from "react";
import type { DualMatch, Band, SourcePick } from "@/lib/types";

// Banda de respaldo → color neón (alta=lima, media=amarillo-verde, baja=lila).
const BAND: Record<Band, { label: string; color: string; bg: string }> = {
  alta: { label: "Alta", color: "var(--lime)", bg: "rgba(183,213,69,0.12)" },
  media: { label: "Media", color: "var(--yellow-green)", bg: "rgba(219,225,92,0.12)" },
  baja: { label: "Baja", color: "var(--lilac)", bg: "rgba(176,149,246,0.12)" },
};

const SRC = {
  klement: { label: "Klement", color: "var(--blue-deep)", icon: "📊" },
  claude: { label: "Claude", color: "var(--turquoise)", icon: "🤖" },
} as const;

function SourceDetail({ src, pick }: { src: "klement" | "claude"; pick: SourcePick }) {
  const meta = SRC[src];
  const detail = pick.driver ?? pick.note;
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
        <span className="text-sm font-display font-bold" style={{ color: meta.color }}>{meta.icon} {meta.label}</span>
        <span className="chip ml-auto" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{pick.market}</span>
      </div>
      <div className="text-base font-bold text-white">{pick.selection}</div>
      {detail && <div className="text-xs mt-1 leading-snug muted">{detail}</div>}
      {pick.fullAnalysis && (
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(252,251,250,0.85)" }}>{pick.fullAnalysis}</p>
      )}
    </div>
  );
}

export function MatchDetailModal({ m, onClose }: { m: DualMatch; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const time = m.kickoff?.match(/T(\d{2}:\d{2})/)?.[1] ?? null;
  const k = m.picks?.klement;
  const c = m.picks?.claude;
  const options = c?.options ?? [];
  const combo = c?.comboRecomendado;

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
          {k && <SourceDetail src="klement" pick={k} />}
          {c && <SourceDetail src="claude" pick={c} />}

          {options.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white mb-2">Menú multi-mercado</h4>
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
            </div>
          )}

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

          {m.avoid && m.avoid.length > 0 && (
            <div className="neon-sub p-3 glow-red">
              <div className="text-xs font-bold mb-1.5 uppercase" style={{ color: "var(--red-main)" }}>⚠️ Evitar / A tener en cuenta</div>
              <ul className="text-xs space-y-1.5 muted">
                {m.avoid.map((a, i) => (
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
