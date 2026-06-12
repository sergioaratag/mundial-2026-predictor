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
