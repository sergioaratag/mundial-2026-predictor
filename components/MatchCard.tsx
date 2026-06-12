import type { CalendarMatch } from "@/lib/types";
import { matchStatus, type MatchStatus } from "@/lib/dates";

const STATUS_STYLE: Record<MatchStatus, { label: string; color: string; bg: string }> = {
  today: { label: "Hoy", color: "var(--gold)", bg: "rgba(216,178,90,0.14)" },
  upcoming: { label: "Próximo", color: "var(--blue)", bg: "rgba(75,123,236,0.14)" },
  played: { label: "Jugado", color: "var(--muted)", bg: "rgba(139,148,163,0.12)" },
};

export function StatusBadge({ date }: { date: string }) {
  const s = STATUS_STYLE[matchStatus(date)];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

// Fila compacta de partido (1 línea en desktop, 2 en móvil).
export function MatchRow({ m }: { m: CalendarMatch }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-lg"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2 sm:w-16 shrink-0">
        <span className="font-mono text-sm" style={{ color: "var(--gold)" }}>{m.time_et}</span>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-base">{m.home_flag}</span>
        <span className="text-sm font-medium truncate">{m.home}</span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>vs</span>
        <span className="text-sm font-medium truncate">{m.away}</span>
        <span className="text-base">{m.away_flag}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-xs" style={{ color: "var(--muted)" }}>
        <span className="px-1.5 py-0.5 rounded" style={{ background: "var(--card-2)" }}>{m.group}</span>
        <span className="truncate max-w-[180px] hidden sm:inline">{m.venue} · {m.city}</span>
        <StatusBadge date={m.date} />
      </div>
    </div>
  );
}
