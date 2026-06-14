import type { CalendarMatch } from "@/lib/types";
import { matchStatus, type MatchStatus } from "@/lib/dates";

// Badge de estado neón con glow temático.
const STATUS_STYLE: Record<MatchStatus, { label: string; color: string; bg: string; glow: string }> = {
  today: { label: "Hoy", color: "var(--white)", bg: "rgba(211,48,32,0.2)", glow: "var(--glow-red)" },
  upcoming: { label: "Próximo", color: "var(--white)", bg: "rgba(53,82,243,0.2)", glow: "var(--glow-blue)" },
  played: { label: "Jugado", color: "var(--lilac)", bg: "rgba(176,149,246,0.12)", glow: "none" },
};

export function StatusBadge({ date }: { date: string }) {
  const s = STATUS_STYLE[matchStatus(date)];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap"
      style={{ color: s.color, background: s.bg, boxShadow: s.glow === "none" ? undefined : s.glow }}
    >
      {s.label}
    </span>
  );
}

// Fila compacta de partido (1 línea desktop, 2 móvil).
export function MatchRow({ m }: { m: CalendarMatch }) {
  return (
    <div className="neon-card flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 py-2.5">
      <div className="flex items-center gap-2 sm:w-16 shrink-0">
        <span className="font-mono text-sm font-bold" style={{ color: "var(--turquoise)" }}>{m.time_et}</span>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-base">{m.home_flag}</span>
        <span className="text-sm font-semibold truncate text-white">{m.home}</span>
        <span className="text-xs muted">vs</span>
        <span className="text-sm font-semibold truncate text-white">{m.away}</span>
        <span className="text-base">{m.away_flag}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-xs muted">
        <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{m.group}</span>
        <span className="truncate max-w-[180px] hidden sm:inline">{m.venue} · {m.city}</span>
        <StatusBadge date={m.date} />
      </div>
    </div>
  );
}
