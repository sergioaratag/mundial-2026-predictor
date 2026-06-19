import type { CalendarMatch } from "@/lib/types";

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MESES_LARGO = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Fecha del sistema en YYYY-MM-DD (hora local).
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type MatchStatus = "played" | "today" | "upcoming";

export function matchStatus(date: string, today = todayISO()): MatchStatus {
  if (date < today) return "played";
  if (date === today) return "today";
  return "upcoming";
}

// "2026-06-11" → "Jun 11"
export function chipLabel(date: string): string {
  const [, m, d] = date.split("-").map(Number);
  return `${MESES[m - 1]} ${d}`;
}

// "2026-06-19" → "19 Jun" (chip del selector de jornadas)
export function shortLabel(date: string): string {
  const [, m, d] = date.split("-").map(Number);
  return `${d} ${MESES[m - 1]}`;
}

// "2026-06-11" → "Jueves 11 de Junio"
export function longLabel(date: string): string {
  const dt = new Date(date + "T12:00:00-04:00");
  const [y, m, d] = date.split("-").map(Number);
  return `${DIAS[dt.getDay()]} ${d} de ${MESES_LARGO[m - 1]} ${y === 2026 ? "" : y}`.trim();
}

// Instante del partido (ET = Bolivia = UTC-4 en jun-jul 2026).
export function matchDate(m: { date: string; time_et: string }): Date {
  return new Date(`${m.date}T${m.time_et}:00-04:00`);
}

export type NextMatch = { match: CalendarMatch; hoursUntil: number; isToday: boolean } | null;

// Próximo partido a futuro (o en curso/hoy) respecto a `now`.
export function findNextMatch(matches: CalendarMatch[], now = new Date()): NextMatch {
  const sorted = [...matches].sort((a, b) => matchDate(a).getTime() - matchDate(b).getTime());
  // En curso o por jugar hoy: el primero cuya hora de fin estimada (>2h) no pasó.
  const upcoming = sorted.find((m) => matchDate(m).getTime() + 2 * 3600_000 >= now.getTime());
  if (!upcoming) return null;
  const diffMs = matchDate(upcoming).getTime() - now.getTime();
  return {
    match: upcoming,
    hoursUntil: Math.max(0, Math.round((diffMs / 3600_000) * 10) / 10),
    isToday: upcoming.date === todayISO() || diffMs <= 0,
  };
}

export function humanUntil(hours: number): string {
  if (hours <= 0) return "en juego / inminente";
  if (hours < 1) return `en ${Math.round(hours * 60)} min`;
  if (hours < 48) return `en ${Math.round(hours)} h`;
  return `en ${Math.round(hours / 24)} días`;
}
