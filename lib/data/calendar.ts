import type { CalendarMatch } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// FIXTURE FASE DE GRUPOS — Mundial 2026
//
// ⚠️ NOTA DE DATOS (importante): solo están cargados los partidos VERIFICADOS
// contra fuente oficial (`verified: true`). El sorteo fue el 5-dic-2025 y NO
// pude auto-verificar de forma confiable los 72 matchups (la data web salió
// inconsistente). Para NO inventar partidos/fechas (regla del proyecto), el
// resto del fixture queda pendiente de cargar con el calendario oficial FIFA.
//
// Cómo completar: agregar objetos a este array con el mismo formato. La UI del
// Calendario (chips por fecha, filas, badges) ya soporta N partidos sin tocar
// componentes. time_et = hora ET = hora Bolivia (jun-jul 2026, ambos UTC-4).
// ─────────────────────────────────────────────────────────────────────────────

export const GROUP_STAGE_START = "2026-06-11";
export const GROUP_STAGE_END = "2026-06-27";

export const CALENDAR: CalendarMatch[] = [
  {
    id: "m1",
    date: "2026-06-11",
    time_et: "20:00",
    home: "México",
    away: "Sudáfrica",
    home_flag: "🇲🇽",
    away_flag: "🇿🇦",
    venue: "Estadio Azteca",
    city: "Ciudad de México",
    group: "Grupo A",
    phase: "groups",
    verified: true,
  },
  {
    id: "m3",
    date: "2026-06-12",
    time_et: "15:00",
    home: "Canadá",
    away: "Bosnia-Herzegovina",
    home_flag: "🇨🇦",
    away_flag: "🇧🇦",
    venue: "BMO Field",
    city: "Toronto",
    group: "Grupo B",
    phase: "groups",
    verified: true,
  },
  {
    id: "m4",
    date: "2026-06-12",
    time_et: "21:00",
    home: "Estados Unidos",
    away: "Paraguay",
    home_flag: "🇺🇸",
    away_flag: "🇵🇾",
    venue: "SoFi Stadium",
    city: "Los Ángeles (Inglewood)",
    group: "Grupo D",
    phase: "groups",
    verified: true,
  },
];

// Devuelve todas las fechas (YYYY-MM-DD) de la fase de grupos para los chips.
export function groupStageDates(): string[] {
  const out: string[] = [];
  const start = new Date(GROUP_STAGE_START + "T00:00:00Z");
  const end = new Date(GROUP_STAGE_END + "T00:00:00Z");
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
