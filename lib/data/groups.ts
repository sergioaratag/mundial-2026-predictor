import type { Group } from "@/lib/types";

// 12 grupos del Mundial 2026 (sorteo 5-dic-2025).
// Solo marcados como `confirmed: true` los equipos verificados contra fuente.
// El resto queda como "Por confirmar" para NO inventar (cargar con sorteo oficial).
const TBD = { name: "Por confirmar", flag: "⚪", confirmed: false };

export const GROUPS: Group[] = [
  { letter: "A", teams: [{ name: "México", flag: "🇲🇽", confirmed: true }, { name: "Sudáfrica", flag: "🇿🇦", confirmed: true }, TBD, TBD] },
  { letter: "B", teams: [{ name: "Canadá", flag: "🇨🇦", confirmed: true }, { name: "Bosnia-Herzegovina", flag: "🇧🇦", confirmed: true }, TBD, TBD] },
  { letter: "C", teams: [TBD, TBD, TBD, TBD] },
  { letter: "D", teams: [{ name: "Estados Unidos", flag: "🇺🇸", confirmed: true }, { name: "Paraguay", flag: "🇵🇾", confirmed: true }, TBD, TBD] },
  { letter: "E", teams: [TBD, TBD, TBD, TBD] },
  { letter: "F", teams: [TBD, TBD, TBD, TBD] },
  { letter: "G", teams: [TBD, TBD, TBD, TBD] },
  { letter: "H", teams: [TBD, TBD, TBD, TBD] },
  { letter: "I", teams: [TBD, TBD, TBD, TBD] },
  { letter: "J", teams: [TBD, TBD, TBD, TBD] },
  { letter: "K", teams: [TBD, TBD, TBD, TBD] },
  { letter: "L", teams: [TBD, TBD, TBD, TBD] },
];
