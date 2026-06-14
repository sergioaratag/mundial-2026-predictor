// Predicciones del Mundial 2026 — datos estructurados (no hardcodear en el
// componente). Se actualizan manualmente, igual que picks.ts y news.ts.
// Fuente: modelos Klement / Klement++ y consenso de casas de apuestas.

import { flagOf } from "@/lib/data/flags";

// ── Bloque 1: Veredicto final ────────────────────────────────────────────
export interface VerdictTeam {
  team: string;
  flag: string;
  score: number;
  note: string;
}

export const CHAMPION: VerdictTeam = {
  team: "Francia",
  flag: flagOf("Francia"),
  score: 91.4,
  note: "Mejor cuadro geográfico del torneo, final proyectada vs Países Bajos.",
};

export const RUNNER_UP: VerdictTeam = {
  team: "Países Bajos",
  flag: flagOf("Países Bajos"),
  score: 86.2,
  note: "Klement original los pone campeones, convergencia máxima entre ambos modelos.",
};

export const SEMIFINALISTS: VerdictTeam[] = [
  {
    team: "Portugal",
    flag: flagOf("Portugal"),
    score: 81.3,
    note: "Generación dorada con profundidad; tope realista en semifinales.",
  },
  {
    team: "España",
    flag: flagOf("España"),
    score: 89.7,
    note: "Segundo mejor score del modelo, pero cuadro más exigente que Francia.",
  },
];

export const PROJECTED_FINAL = "Francia 2-1 Países Bajos";

// ── Bloque 2: Revelaciones del torneo ────────────────────────────────────
export interface Revelation {
  team: string;
  flag: string;
  headline: string;
  note: string;
}

export const REVELATIONS: Revelation[] = [
  { team: "Noruega", flag: flagOf("Noruega"), headline: "Cuartos de final", note: "Valor de apuesta real: Haaland arrastra al equipo más lejos de lo que descuenta el mercado." },
  { team: "Japón", flag: flagOf("Japón"), headline: "Octavos / Cuartos", note: "Bloque compacto y transiciones rápidas; candidato a incomodar a una grande." },
  { team: "Francia", flag: flagOf("Francia"), headline: "Mbappé · Bota de Oro favorito +600", note: "Principal candidato al máximo goleador según las casas." },
  { team: "Brasil", flag: flagOf("Brasil"), headline: "Decepción · máximo Cuartos", note: "Score por debajo de su caché histórico; el modelo no lo ve entre los cuatro mejores." },
];

// ── Bloque 3: Ranking Klement++ Top 8 ────────────────────────────────────
export interface RankTeam {
  team: string;
  flag: string;
  score: number;
}

export const KLEMENT_RANKING: RankTeam[] = [
  { team: "Francia", flag: flagOf("Francia"), score: 91.4 },
  { team: "España", flag: flagOf("España"), score: 89.7 },
  { team: "Países Bajos", flag: flagOf("Países Bajos"), score: 86.2 },
  { team: "Inglaterra", flag: flagOf("Inglaterra"), score: 84.1 },
  { team: "Portugal", flag: flagOf("Portugal"), score: 81.3 },
  { team: "Argentina", flag: flagOf("Argentina"), score: 79.8 },
  { team: "Brasil", flag: flagOf("Brasil"), score: 77.2 },
  { team: "Noruega", flag: flagOf("Noruega"), score: 71.3 },
];

// Colores de barra por posición: 1=gold, 2=emerald, 3=purple, 4=red,
// 5-8=tonos atenuados.
export const RANK_BAR_COLORS = [
  "var(--orange)",
  "var(--lime)",
  "var(--purple-deep)",
  "var(--red-main)",
  "rgba(233,90,41,0.5)",
  "rgba(183,213,69,0.5)",
  "rgba(93,25,229,0.5)",
  "rgba(211,48,32,0.5)",
];

// ── Bloque 4: Factor climático + Cooling Break ───────────────────────────
export interface ClimateRow {
  team: string;
  flag: string;
  level: "favorable" | "controlado" | "mixto" | "riesgo";
  note: string;
}

export const COOLING_BREAK_INFO =
  "Desde 2026 hay 2 cooling breaks obligatorios por partido (minuto 22 de cada tiempo). Pausan el juego para hidratación cuando el calor lo exige y obligan a recalcular ritmo y presión.";

export const CLIMATE: ClimateRow[] = [
  { team: "Francia", flag: flagOf("Francia"), level: "favorable", note: "Sedes frías: Nueva Jersey, Filadelfia, Boston." },
  { team: "Países Bajos", flag: flagOf("Países Bajos"), level: "controlado", note: "Estadios con aire acondicionado en Dallas y Houston." },
  { team: "España", flag: flagOf("España"), level: "mixto", note: "Clima variable: Atlanta, Miami, Guadalajara." },
  { team: "Japón", flag: flagOf("Japón"), level: "riesgo", note: "Mayor riesgo de calor: Monterrey." },
];

export const CLIMATE_STYLE: Record<ClimateRow["level"], { label: string; color: string; bg: string }> = {
  favorable: { label: "Favorable", color: "var(--emerald)", bg: "rgba(0,197,102,0.14)" },
  controlado: { label: "Controlado", color: "var(--gold)", bg: "rgba(212,168,67,0.14)" },
  mixto: { label: "Mixto", color: "var(--amber)", bg: "rgba(245,158,11,0.14)" },
  riesgo: { label: "Riesgo de calor", color: "var(--red)", bg: "rgba(216,31,38,0.14)" },
};

// ── Bloque 5: Bota de Oro ─────────────────────────────────────────────────
export interface GoldenBootCandidate {
  player: string;
  team: string;
  flag: string;
  odds: string;
}

export const GOLDEN_BOOT: GoldenBootCandidate[] = [
  { player: "Kylian Mbappé", team: "Francia", flag: flagOf("Francia"), odds: "+600" },
  { player: "Harry Kane", team: "Inglaterra", flag: flagOf("Inglaterra"), odds: "+700" },
  { player: "Erling Haaland", team: "Noruega", flag: flagOf("Noruega"), odds: "+1400" },
  { player: "Lionel Messi", team: "Argentina", flag: flagOf("Argentina"), odds: "+1600" },
  { player: "Lamine Yamal", team: "España", flag: flagOf("España"), odds: "+2000" },
];
