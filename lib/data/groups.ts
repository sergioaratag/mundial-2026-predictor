import type { Group } from "@/lib/types";
import { flagOf } from "@/lib/data/flags";

// 12 grupos del Mundial 2026 (sorteo 5-dic-2025), extraídos del fixture oficial.
const GROUP_TEAMS: Record<string, string[]> = {
  A: ["México", "Sudáfrica", "Corea del Sur", "Chequia"],
  B: ["Canadá", "Bosnia-Herzegovina", "Catar", "Suiza"],
  C: ["Brasil", "Marruecos", "Haití", "Escocia"],
  D: ["EE.UU.", "Paraguay", "Australia", "Turquía"],
  E: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"],
  F: ["Países Bajos", "Japón", "Suecia", "Túnez"],
  G: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"],
  H: ["España", "Cabo Verde", "Arabia Saudita", "Uruguay"],
  I: ["Francia", "Senegal", "Iraq", "Noruega"],
  J: ["Argentina", "Argelia", "Austria", "Jordania"],
  K: ["Portugal", "Congo DR", "Uzbekistán", "Colombia"],
  L: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
};

export const GROUPS: Group[] = Object.entries(GROUP_TEAMS).map(([letter, teams]) => ({
  letter,
  teams: teams.map((name) => ({ name, flag: flagOf(name), confirmed: true })),
}));
