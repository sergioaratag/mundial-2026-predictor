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

// Nivel climático → bloque LEGO.
const CLIMATE_BLOCK: Record<string, string> = {
  favorable: "lego-emerald",
  controlado: "lego-lime",
  mixto: "lego-gold",
  riesgo: "lego-red",
};

export function TabPredicciones() {
  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-8">
      {/* ── Bloque 1: Veredicto final ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg flex items-center gap-2">
          <TrophyIcon size={22} /> Veredicto final
        </h2>

        {/* Campeón del mundo — el bloque más grande/destacado */}
        <div className="lego-block lego-gold p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="lego-block--sm lego-white inline-flex items-center justify-center h-9 w-9">
              <TrophyIcon size={24} />
            </span>
            <span className="text-sm uppercase tracking-wide font-bold">Campeón del mundo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{CHAMPION.flag}</span>
            <span className="text-3xl sm:text-4xl">{CHAMPION.team}</span>
            <span className="ml-auto text-3xl sm:text-4xl font-mono font-bold">{CHAMPION.score}</span>
          </div>
          <p className="text-sm mt-3 leading-relaxed font-medium opacity-80">{CHAMPION.note}</p>
        </div>

        {/* Subcampeón */}
        <div className="lego-block lego-emerald p-5">
          <span className="text-xs uppercase tracking-wide font-bold block mb-2">🥈 Subcampeón</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{RUNNER_UP.flag}</span>
            <span className="text-2xl">{RUNNER_UP.team}</span>
            <span className="ml-auto text-2xl font-mono font-bold">{RUNNER_UP.score}</span>
          </div>
          <p className="text-sm mt-2 leading-relaxed font-medium opacity-80">{RUNNER_UP.note}</p>
        </div>

        {/* Semifinalistas (púrpura + granate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEMIFINALISTS.map((t, i) => (
            <div key={t.team} className={`lego-block ${i === 0 ? "lego-purple" : "lego-maroon"} p-4`}>
              <span className="text-[11px] uppercase tracking-wide font-bold block mb-1.5">Semifinalista</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.flag}</span>
                <span className="text-base">{t.team}</span>
                <span className="ml-auto text-sm font-mono font-bold">{t.score}</span>
              </div>
              <p className="text-xs mt-1.5 leading-snug font-medium on-dark-muted">{t.note}</p>
            </div>
          ))}
        </div>

        {/* Final proyectada */}
        <div className="lego-block--sm lego-gold px-4 py-3 text-center text-sm font-bold">
          Final proyectada: {PROJECTED_FINAL}
        </div>
      </section>

      {/* ── Bloque 2: Revelaciones ── */}
      <section>
        <h2 className="text-lg mb-3">✨ Revelaciones del torneo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REVELATIONS.map((r) => (
            <div key={r.team + r.headline} className="lego-block lego-lime p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{r.flag}</span>
                <span className="text-base">{r.team}</span>
                <span className="lego-block--sm lego-white ml-auto text-[11px] px-2 py-0.5 font-bold">{r.headline}</span>
              </div>
              <p className="text-xs mt-1.5 leading-snug font-medium opacity-80">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 3: Ranking Klement++ ── */}
      <section>
        <h2 className="text-lg mb-1">📊 Ranking Klement++ · Top 8</h2>
        <p className="text-xs mb-3 on-light-muted font-medium">Puntaje del modelo (0-100).</p>
        <div className="lego-block lego-white p-3 flex flex-col gap-2">
          {KLEMENT_RANKING.map((t, i) => (
            <div
              key={t.team}
              className="flex items-center gap-3 px-2 py-1.5"
              style={{ borderTop: i === 0 ? "none" : "2px solid rgba(26,26,26,0.1)" }}
            >
              {/* Ficha cuadrada de color (rota gold/emerald/purple/red) */}
              <span
                className="h-7 w-7 shrink-0 flex items-center justify-center text-xs font-bold"
                style={{ background: RANK_BAR_COLORS[i], border: "2px solid var(--ink)", borderRadius: 4, color: i === 2 || i === 3 ? "#fff" : "var(--ink)" }}
              >
                {i + 1}
              </span>
              <span className="text-lg">{t.flag}</span>
              <span className="text-sm font-bold flex-1 truncate">{t.team}</span>
              <span className="text-2xl font-mono font-bold">{t.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bloque 4: Factor climático + Cooling Break ── */}
      <section>
        <h2 className="text-lg mb-2">🌡️ Factor climático & Cooling Break</h2>
        <p className="lego-block lego-page text-sm mb-3 leading-relaxed p-3 font-medium">{COOLING_BREAK_INFO}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLIMATE.map((c) => {
            const s = CLIMATE_STYLE[c.level];
            return (
              <div key={c.team} className={`lego-block ${CLIMATE_BLOCK[c.level] ?? "lego-white"} p-4`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-base">{c.team}</span>
                  <span className="lego-block--sm lego-white ml-auto text-[11px] px-2 py-0.5 font-bold">{s.label}</span>
                </div>
                <p className="text-xs leading-snug font-medium opacity-80">{c.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bloque 5: Bota de Oro ── */}
      <section>
        <h2 className="text-lg mb-3">👟 Bota de Oro · Top 5</h2>
        <div className="lego-block lego-white p-2">
          {GOLDEN_BOOT.map((p, i) => (
            <div
              key={p.player}
              className="flex items-center gap-3 px-3 py-2.5"
              style={{ borderTop: i === 0 ? "none" : "2px solid rgba(26,26,26,0.1)" }}
            >
              <span className="lego-block--sm lego-gold h-6 w-6 flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-xl">{p.flag}</span>
              <div className="min-w-0">
                <div className="text-sm font-bold truncate">{p.player}</div>
                <div className="text-xs on-light-muted font-medium">{p.team}</div>
              </div>
              <span className="ml-auto text-base font-mono font-bold" style={{ color: "var(--emerald-dark)" }}>{p.odds}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
