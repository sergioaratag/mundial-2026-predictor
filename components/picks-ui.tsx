import type { Pick, Combo, RefereeInfo } from "@/lib/types";

// Confianza → color neón + glow. Alta=lima, Media=amarillo-verde, Baja=lila.
export const CONF: Record<Pick["confidence"], { label: string; color: string; glow: string }> = {
  hot: { label: "🔥 Alta", color: "var(--lime)", glow: "var(--glow-lime)" },
  moderate: { label: "Media", color: "var(--yellow-green)", glow: "0 0 16px rgba(219,225,92,0.14)" },
  low: { label: "Baja", color: "var(--lilac)", glow: "none" },
};

const REF_FLAG: Record<string, string> = {
  Eslovenia: "🇸🇮",
  Argelia: "🇩🇿",
  Venezuela: "🇻🇪",
  Honduras: "🇭🇳",
};

export function PickItem({ p }: { p: Pick }) {
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

export function ComboCard({ combo, highlight }: { combo: Combo; highlight?: boolean }) {
  return (
    <div
      className="neon-sub p-3"
      style={
        highlight
          ? { boxShadow: "var(--glow-purple)", borderColor: "rgba(93,25,229,0.45)" }
          : undefined
      }
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-bold" style={{ color: highlight ? "var(--lilac)" : "var(--white)" }}>{combo.title}</span>
        <span className="text-sm font-mono font-bold" style={{ color: "var(--turquoise)" }}>{combo.odds}</span>
      </div>
      <ul className="text-xs space-y-1 mb-2">
        {combo.legs.map((l, i) => (
          <li key={i} className="flex gap-1.5">
            <span style={{ color: "var(--lime)" }}>✓</span>
            <span className="text-white/90">{l}</span>
          </li>
        ))}
      </ul>
      <div className="text-[11px] muted">Riesgo: {combo.risk}</div>
      <div className="text-xs mt-1 leading-snug muted">{combo.note}</div>
    </div>
  );
}

export function AvoidBlock({ avoid }: { avoid: string[] }) {
  if (!avoid.length) return null;
  return (
    <div className="neon-sub p-3 glow-red">
      <div className="text-xs font-bold mb-1.5 uppercase" style={{ color: "var(--red-main)" }}>⚠️ Evitar</div>
      <ul className="text-xs space-y-1 muted">
        {avoid.map((a, i) => (
          <li key={i}>• {a}</li>
        ))}
      </ul>
    </div>
  );
}

export function RefereeBlock({ referee }: { referee: RefereeInfo }) {
  const flag = REF_FLAG[referee.country] ?? "";
  const heavy = referee.avg_cards >= 4.5;
  const chip = "chip";
  const chipStyle = { color: "var(--turquoise)", background: "rgba(135,231,223,0.08)" };
  return (
    <div className="neon-sub p-3 glow-turq">
      <div className="text-[11px] uppercase tracking-wide muted font-semibold mb-1.5">⚖️ Árbitro</div>
      <div className="text-sm font-semibold text-white">
        {flag} {referee.name} <span className="muted font-normal">· {referee.country}</span>
      </div>
      <div className="flex gap-1.5 flex-wrap mt-2">
        <span className={chip} style={chipStyle}>🟨 {referee.avg_cards} tarj/p</span>
        <span className={chip} style={chipStyle}>⚡ {referee.avg_fouls} faltas/p</span>
        <span className={chip} style={chipStyle}>📊 {referee.matches_sample} partidos</span>
      </div>
      {heavy && (
        <div className="text-xs mt-2 leading-snug" style={{ color: "var(--yellow-green)" }}>
          Árbitro con tendencia a repartir muchas tarjetas — considera Over en mercados de tarjetas.
        </div>
      )}
    </div>
  );
}
