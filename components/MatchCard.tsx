import type { CalendarMatch } from "@/lib/types";
import { matchStatus, type MatchStatus } from "@/lib/dates";

// Badge de estado como mini-bloque LEGO con su propio borde + sombra.
const STATUS_STYLE: Record<MatchStatus, { label: string; cls: string }> = {
  today: { label: "Hoy", cls: "lego-red" },
  upcoming: { label: "Próximo", cls: "lego-emerald-dark" },
  played: { label: "Jugado", cls: "lego-page" },
};

export function StatusBadge({ date }: { date: string }) {
  const s = STATUS_STYLE[matchStatus(date)];
  return (
    <span className={`lego-block--sm ${s.cls} inline-flex items-center px-2 py-0.5 text-[11px] font-bold whitespace-nowrap`}>
      {s.label}
    </span>
  );
}

// Fila compacta de partido dentro de un bloque blanco (1 línea desktop, 2 móvil).
export function MatchRow({ m }: { m: CalendarMatch }) {
  return (
    <div className="lego-block flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 py-2.5">
      <div className="flex items-center gap-2 sm:w-16 shrink-0">
        <span className="lego-block--sm lego-gold px-1.5 py-0.5 font-mono text-xs font-bold">{m.time_et}</span>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-base">{m.home_flag}</span>
        <span className="text-sm font-semibold truncate">{m.home}</span>
        <span className="text-xs on-light-muted">vs</span>
        <span className="text-sm font-semibold truncate">{m.away}</span>
        <span className="text-base">{m.away_flag}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-xs on-light-muted">
        <span className="lego-block--sm lego-page px-1.5 py-0.5 font-semibold">{m.group}</span>
        <span className="truncate max-w-[180px] hidden sm:inline">{m.venue} · {m.city}</span>
        <StatusBadge date={m.date} />
      </div>
    </div>
  );
}
