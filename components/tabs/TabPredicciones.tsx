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

// Nivel climático → glow neón.
const CLIMATE_GLOW: Record<string, string> = {
  favorable: "var(--glow-lime)",
  controlado: "0 0 18px rgba(219,225,92,0.16)",
  mixto: "var(--glow-turq)",
  riesgo: "var(--glow-red)",
};

export function TabPredicciones() {
  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-8">
      {/* ── Bloque 1: Veredicto final ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg flex items-center gap-2 text-white">
          <TrophyIcon size={22} glow /> Veredicto final
        </h2>

        {/* Campeón del mundo — el bloque premium */}
        <div className="neon-card glow-purple p-5 sm:p-6" style={{ background: "linear-gradient(135deg, rgba(93,25,229,0.22), var(--surface))" }}>
          <div className="flex items-center gap-2 mb-3">
            <TrophyIcon size={26} glow />
            <span className="text-sm uppercase tracking-wide font-bold" style={{ color: "var(--turquoise)" }}>Campeón del mundo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{CHAMPION.flag}</span>
            <span className="text-3xl sm:text-4xl text-white">{CHAMPION.team}</span>
            <span className="ml-auto text-3xl sm:text-4xl font-mono font-bold" style={{ color: "var(--turquoise)" }}>{CHAMPION.score}</span>
          </div>
          <p className="text-sm mt-3 leading-relaxed muted">{CHAMPION.note}</p>
        </div>

        {/* Subcampeón */}
        <div className="neon-card glow-blue p-5">
          <span className="text-xs uppercase tracking-wide font-bold block mb-2" style={{ color: "var(--blue-deep)" }}>🥈 Subcampeón</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{RUNNER_UP.flag}</span>
            <span className="text-2xl text-white">{RUNNER_UP.team}</span>
            <span className="ml-auto text-2xl font-mono font-bold" style={{ color: "var(--turquoise)" }}>{RUNNER_UP.score}</span>
          </div>
          <p className="text-sm mt-2 leading-relaxed muted">{RUNNER_UP.note}</p>
        </div>

        {/* Semifinalistas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEMIFINALISTS.map((t) => (
            <div key={t.team} className="neon-card glow-purple p-4">
              <span className="text-[11px] uppercase tracking-wide font-bold block mb-1.5" style={{ color: "var(--lilac)" }}>Semifinalista</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.flag}</span>
                <span className="text-base text-white">{t.team}</span>
                <span className="ml-auto text-sm font-mono font-bold" style={{ color: "var(--turquoise)" }}>{t.score}</span>
              </div>
              <p className="text-xs mt-1.5 leading-snug muted">{t.note}</p>
            </div>
          ))}
        </div>

        {/* Final proyectada */}
        <div className="neon-sub glow-turq px-4 py-3 text-center text-sm font-bold text-white">
          Final proyectada: <span style={{ color: "var(--turquoise)" }}>{PROJECTED_FINAL}</span>
        </div>
      </section>

      {/* ── Bloque 2: Revelaciones ── */}
      <section>
        <h2 className="text-lg mb-3 text-white">✨ Revelaciones del torneo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REVELATIONS.map((r) => (
            <div key={r.team + r.headline} className="neon-card glow-lime p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{r.flag}</span>
                <span className="text-base text-white">{r.team}</span>
                <span className="chip ml-auto" style={{ color: "var(--lime)", background: "rgba(183,213,69,0.12)" }}>{r.headline}</span>
              </div>
              <p className="text-xs mt-1.5 leading-snug muted">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 3: Ranking Klement++ ── */}
      <section>
        <h2 className="text-lg mb-1 text-white">📊 Ranking Klement++ · Top 8</h2>
        <p className="text-xs mb-3 muted">Puntaje del modelo (0-100).</p>
        <div className="neon-card p-3 flex flex-col gap-2">
          {KLEMENT_RANKING.map((t, i) => (
            <div key={t.team} className="flex items-center gap-3 px-2 py-1.5" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
              <span
                className="h-7 w-7 shrink-0 flex items-center justify-center text-xs font-bold rounded-md"
                style={{ background: RANK_BAR_COLORS[i], color: i === 1 ? "var(--ink)" : "var(--white)" }}
              >
                {i + 1}
              </span>
              <span className="text-lg">{t.flag}</span>
              <span className="text-sm font-bold flex-1 truncate text-white">{t.team}</span>
              <span className="text-2xl font-mono font-bold" style={{ color: "var(--turquoise)" }}>{t.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 4: Factor climático + Cooling Break ── */}
      <section>
        <h2 className="text-lg mb-2 text-white">🌡️ Factor climático & Cooling Break</h2>
        <p className="neon-sub text-sm mb-3 leading-relaxed p-3 muted">{COOLING_BREAK_INFO}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLIMATE.map((c) => {
            const s = CLIMATE_STYLE[c.level];
            return (
              <div key={c.team} className="neon-card p-4" style={{ boxShadow: CLIMATE_GLOW[c.level] }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-base text-white">{c.team}</span>
                  <span className="chip ml-auto" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{s.label}</span>
                </div>
                <p className="text-xs leading-snug muted">{c.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bloque 5: Bota de Oro ── */}
      <section>
        <h2 className="text-lg mb-3 text-white">👟 Bota de Oro · Top 5</h2>
        <div className="neon-card p-2">
          {GOLDEN_BOOT.map((p, i) => (
            <div key={p.player} className="flex items-center gap-3 px-3 py-2.5" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
              <span className="h-6 w-6 flex items-center justify-center text-xs font-bold rounded-md shrink-0" style={{ background: "rgba(135,231,223,0.12)", color: "var(--turquoise)" }}>{i + 1}</span>
              <span className="text-xl">{p.flag}</span>
              <div className="min-w-0">
                <div className="text-sm font-bold truncate text-white">{p.player}</div>
                <div className="text-xs muted">{p.team}</div>
              </div>
              <span className="ml-auto text-base font-mono font-bold" style={{ color: "var(--lime)" }}>{p.odds}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
