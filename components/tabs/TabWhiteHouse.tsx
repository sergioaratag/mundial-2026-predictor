"use client";

import { WHITEHOUSE, type FightCard, type FightPick } from "@/lib/data/whitehouse";
import { CONF, AvoidBlock, ComboCard } from "@/components/picks-ui";

export function TabWhiteHouse() {
  const ev = WHITEHOUSE;
  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Header del evento — badge naranja con glow */}
      <header className="neon-card glow-orange px-4 sm:px-5 py-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wide font-display"
            style={{
              color: "var(--white)",
              background: "rgba(233,90,41,0.20)",
              boxShadow: "var(--glow-orange)",
              border: "1px solid rgba(233,90,41,0.45)",
            }}
          >
            🥊 {ev.badge}
          </span>
          <h1 className="text-xl sm:text-2xl text-white leading-none">{ev.evento}</h1>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>📅 {ev.fecha}</span>
          <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>📍 {ev.sede} · {ev.ciudad}</span>
          <span className="chip" style={{ background: "rgba(135,231,223,0.08)", color: "var(--turquoise)" }}>🕘 {ev.time_bolivia} · hora Bolivia</span>
        </div>
      </header>

      <div className="flex flex-col gap-5">
        {ev.fights.map((f) => (
          <FightCardView key={f.id} f={f} />
        ))}
      </div>

      {/* Combos finales */}
      <h2 className="text-lg mt-8 mb-4 text-white">🎲 Combos de la noche</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ev.combos.map((c, i) => (
          <ComboCard key={i} combo={c} highlight={i === 0} />
        ))}
      </div>
    </div>
  );
}

function FighterSide({ name, flag, odds, align }: { name: string; flag: string; odds: string; align: "left" | "right" }) {
  const fav = odds.trim().startsWith("-"); // cuota negativa = favorito
  return (
    <div className={`flex-1 min-w-0 flex flex-col gap-1 ${align === "right" ? "items-end text-right" : "items-start"}`}>
      <span className="text-base font-bold text-white leading-tight break-words">
        {flag} {name}
      </span>
      <span className="chip font-mono" style={{ color: fav ? "var(--turquoise)" : "var(--orange)", background: "rgba(255,255,255,0.05)" }}>
        {odds}
      </span>
    </div>
  );
}

function FightPickItem({ p }: { p: FightPick }) {
  const c = CONF[p.confidence];
  return (
    <div className="neon-sub p-3" style={{ boxShadow: c.glow === "none" ? undefined : c.glow }}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-[11px] uppercase tracking-wide muted font-semibold">{p.market}</span>
        <span className="chip" style={{ color: c.color, background: "rgba(255,255,255,0.05)" }}>{c.label}</span>
      </div>
      <div className="text-sm font-semibold text-white">{p.value}</div>
      <div className="text-xs mt-1 leading-snug muted">{p.note}</div>
    </div>
  );
}

function FightCardView({ f }: { f: FightCard }) {
  return (
    <article className="neon-card overflow-hidden">
      {/* Cabecera de la pelea */}
      <div
        className="px-4 py-3"
        style={{
          background: "linear-gradient(135deg, rgba(233,90,41,0.16), rgba(211,48,32,0.08))",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {f.slot && (
            <span className="chip font-display" style={{ background: "rgba(233,90,41,0.20)", color: "var(--orange)", boxShadow: "var(--glow-orange)" }}>
              {f.slot}
            </span>
          )}
          <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{f.weight_class}</span>
          {f.title && (
            <span className="chip" style={{ background: "rgba(93,25,229,0.18)", color: "var(--white)" }}>🏆 {f.title}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FighterSide name={f.fighter_a} flag={f.flag_a} odds={f.odds_a} align="left" />
          <span className="text-xs font-display font-bold shrink-0 px-2" style={{ color: "var(--lilac)" }}>VS</span>
          <FighterSide name={f.fighter_b} flag={f.flag_b} odds={f.odds_b} align="right" />
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4 muted">{f.analysis}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {f.picks.map((p, i) => (
            <FightPickItem key={i} p={p} />
          ))}
        </div>

        {f.valor_pick && (
          <div className="neon-sub p-3 mt-4 glow-turq">
            <div className="text-[11px] font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--turquoise)" }}>💎 Pick de valor</div>
            <div className="text-sm leading-snug text-white/90">{f.valor_pick}</div>
          </div>
        )}

        {f.avoid.length > 0 && (
          <div className="mt-4">
            <AvoidBlock avoid={f.avoid} />
          </div>
        )}
      </div>
    </article>
  );
}
