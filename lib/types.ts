// Tipos del panel Mundial 2026 Predictor.

export type Phase = "groups" | "r32" | "r16" | "qf" | "sf" | "final";

export interface CalendarMatch {
  id: string;
  date: string; // "2026-06-11"
  time_et: string; // "15:00" (24h) — en jun-jul 2026, ET = hora Bolivia (ambos UTC-4)
  home: string;
  away: string;
  home_flag: string;
  away_flag: string;
  venue: string;
  city: string;
  group: string; // "Grupo A" | "Octavos" ...
  phase: Phase;
  verified?: boolean; // true si el fixture está confirmado contra fuente oficial
}

export type Confidence = "hot" | "moderate" | "low";

export interface Pick {
  market: string;
  value: string;
  confidence: Confidence;
  note: string;
}

export interface Combo {
  title: string;
  legs: string[];
  odds: string;
  risk: string;
  note: string;
}

export interface PickMatch {
  home: string;
  away: string;
  home_flag: string;
  away_flag: string;
  venue: string;
  city: string;
  group: string;
  time_bolivia: string; // "15:00"
  context: string; // análisis narrativo
  picks: Pick[];
  combos: Combo[];
  avoid: string[];
  referee?: RefereeInfo; // árbitro con estadísticas (opcional)
}

export interface RefereeInfo {
  name: string;
  country: string;
  avg_cards: number; // promedio de tarjetas por partido
  avg_fouls: number; // promedio de faltas por partido
  matches_sample: number; // tamaño de muestra (partidos analizados)
  estimated?: boolean; // true si los promedios no están confirmados con precisión
}

export interface PicksDay {
  id: string; // "jornada-2"
  jornada: number;
  date: string; // "2026-06-12"
  label: string; // "Jornada 2 · Viernes 12 de Junio"
  matches: PickMatch[];
  megaCombo?: Combo;
}

export interface Group {
  letter: string; // "A"
  teams: { name: string; flag: string; confirmed: boolean }[];
}

// ── Picks de doble fuente (Klement / Claude) — jornadas modelo v2 ──
// Banda de respaldo en datos reales (no inventar): córners/faltas/amarillas
// suelen ser media/baja salvo stat fuerte.
export type Band = "alta" | "media" | "baja";

export interface Option {
  market: string;
  selection: string;
  confidence: Band;
}

export interface SourcePick {
  market: string;
  selection: string;
  driver?: string; // razonamiento de Klement
  note?: string; // matiz / valor de Claude
  fullAnalysis?: string; // análisis completo (se ve al expandir el detalle)
  options?: Option[]; // menú multi-mercado (claude)
  comboRecomendado?: { legs: string[]; nota?: string }; // combo recomendado (claude)
}

export interface DualReferee {
  name: string | null;
  avgCards?: string | null;
  avgFouls?: string;
}

export interface DualOdds {
  home?: number | null;
  draw?: number | null;
  away?: number | null;
}

export interface DualMatch {
  match: string; // "España vs Cabo Verde"
  venue?: string;
  kickoff?: string; // ISO con offset -04:00 (hora Bolivia)
  referee?: DualReferee;
  odds?: DualOdds;
  oddsNote?: string; // lectura corta del mercado ("Qué dicen las casas")
  preview?: string; // "Cómo llegan": resumen de ambas selecciones
  stats?: Record<string, number>;
  result?: string | null;
  avoid?: string[]; // "EVITAR / A tener en cuenta": lesiones, bajas, historial
  picks?: {
    klement?: SourcePick;
    claude?: SourcePick;
  };
}

export interface DualJornada {
  jornada: number;
  fecha: string; // "2026-06-15"
  tipo: string; // "picks"
  partidos: DualMatch[];
  combos?: Combo[]; // se respetan los de data; no se generan automáticamente
}
