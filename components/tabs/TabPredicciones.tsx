import { TrophyIcon } from "@/components/TrophyIcon";
import {
  CHAMPION,
  RUNNER_UP,
  SEMIFINALISTS,
  PROJECTED_FINAL,
  REVELATIONS,
  KLEMENT_RANKING,
  RANK_BAR_COLORS,
  COOLING_BREAK_INFO,
  CLIMATE,
  CLIMATE_STYLE,
  GOLDEN_BOOT,
} from "@/lib/data/predictions";

export function TabPredicciones() {
  const maxScore = KLEMENT_RANKING[0].score;

  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-8">
      {/* ── Bloque 1: Veredicto final ── */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrophyIcon size={24} /> Veredicto final
        </h2>

        {/* Campeón + Subcampeón (destacadas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Campeón del mundo */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--gold)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.12), transparent 60%)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon size={26} />
                <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--gold)" }}>
                  Campeón del mundo
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{CHAMPION.flag}</span>
                <span className="text-2xl font-bold">{CHAMPION.team}</span>
                <span className="ml-auto text-2xl font-mono font-bold" style={{ color: "var(--gold)" }}>
                  {CHAMPION.score}
                </span>
              </div>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                {CHAMPION.note}
              </p>
            </div>
          </div>

          {/* Subcampeón */}
          <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <span className="text-xs uppercase tracking-wide font-semibold block mb-2" style={{ color: "var(--muted)" }}>
              🥈 Subcampeón
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{RUNNER_UP.flag}</span>
              <span className="text-2xl font-bold">{RUNNER_UP.team}</span>
              <span className="ml-auto text-2xl font-mono font-bold" style={{ color: "var(--text)" }}>
                {RUNNER_UP.score}
              </span>
            </div>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
              {RUNNER_UP.note}
            </p>
          </div>
        </div>

        {/* Semifinalistas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {SEMIFINALISTS.map((t) => (
            <div key={t.team} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span className="text-[11px] uppercase tracking-wide font-medium block mb-1.5" style={{ color: "var(--purple)" }}>
                Semifinalista
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.flag}</span>
                <span className="text-base font-semibold">{t.team}</span>
                <span className="ml-auto text-sm font-mono" style={{ color: "var(--muted)" }}>{t.score}</span>
              </div>
              <p className="text-xs mt-1.5 leading-snug" style={{ color: "var(--muted)" }}>{t.note}</p>
            </div>
          ))}
        </div>

        {/* Final proyectada */}
        <div
          className="mt-3 rounded-xl px-4 py-3 text-center text-sm"
          style={{ background: "rgba(212,168,67,0.10)", border: "1px solid var(--gold)" }}
        >
          <span style={{ color: "var(--muted)" }}>Final proyectada: </span>
          <span className="font-semibold" style={{ color: "var(--gold)" }}>{PROJECTED_FINAL}</span>
        </div>
      </section>

      {/* ── Bloque 2: Revelaciones ── */}
      <section>
        <h2 className="text-lg font-semibold mb-3">✨ Revelaciones del torneo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REVELATIONS.map((r) => (
            <div key={r.team + r.headline} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{r.flag}</span>
                <span className="text-base font-semibold">{r.team}</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: "var(--emerald)", background: "rgba(0,197,102,0.14)" }}>
                  {r.headline}
                </span>
              </div>
              <p className="text-xs mt-1.5 leading-snug" style={{ color: "var(--muted)" }}>{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 3: Ranking Klement++ ── */}
      <section>
        <h2 className="text-lg font-semibold mb-1">📊 Ranking Klement++ · Top 8</h2>
        <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>Puntaje del modelo (0-100).</p>
        <div className="flex flex-col gap-2.5">
          {KLEMENT_RANKING.map((t, i) => (
            <div key={t.team} className="flex items-center gap-3">
              <span className="text-xs w-4 text-right font-mono" style={{ color: "var(--muted)" }}>{i + 1}</span>
              <span className="text-base w-6">{t.flag}</span>
              <span className="text-sm font-medium w-28 shrink-0 truncate">{t.team}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-panel)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(t.score / maxScore) * 100}%`, background: RANK_BAR_COLORS[i] }}
                />
              </div>
              <span className="text-sm font-mono w-12 text-right" style={{ color: "var(--text)" }}>{t.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 4: Factor climático + Cooling Break ── */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🌡️ Factor climático & Cooling Break</h2>
        <p className="text-sm mb-3 leading-relaxed rounded-lg p-3" style={{ color: "var(--muted)", background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
          {COOLING_BREAK_INFO}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLIMATE.map((c) => {
            const s = CLIMATE_STYLE[c.level];
            return (
              <div key={c.team} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-base font-semibold">{c.team}</span>
                  <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{c.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bloque 5: Bota de Oro ── */}
      <section>
        <h2 className="text-lg font-semibold mb-3">👟 Bota de Oro · Top 5</h2>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {GOLDEN_BOOT.map((p, i) => (
            <div
              key={p.player}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
            >
              <span className="text-xs w-4 font-mono" style={{ color: "var(--gold)" }}>{i + 1}</span>
              <span className="text-xl">{p.flag}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{p.player}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{p.team}</div>
              </div>
              <span className="ml-auto text-sm font-mono font-semibold" style={{ color: "var(--emerald)" }}>{p.odds}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
