import type { CalendarMatch } from "@/lib/types";
import { flagOf, teamSlug } from "@/lib/data/flags";

// Fixture COMPLETO y verificado de la fase de grupos del Mundial 2026
// (fuente: worldcupwiki.com). Horas en ET = hora Bolivia (UTC-4, sin conversión).
// Nota medianoche: "00:00" = 12:00 AM ET del día indicado (reloj de NY).

export const GROUP_STAGE_START = "2026-06-11";
export const GROUP_STAGE_END = "2026-06-27";

// [date, time_et, home, away, venue, city, group]
type Raw = [string, string, string, string, string, string, string];

const RAW: Raw[] = [
  // Jueves 11 junio
  ["2026-06-11", "15:00", "México", "Sudáfrica", "Estadio Azteca", "Ciudad de México", "Grupo A"],
  ["2026-06-11", "22:00", "Corea del Sur", "Chequia", "Estadio Akron", "Zapopan", "Grupo A"],
  // Viernes 12 junio
  ["2026-06-12", "15:00", "Canadá", "Bosnia-Herzegovina", "BMO Field", "Toronto", "Grupo B"],
  ["2026-06-12", "21:00", "EE.UU.", "Paraguay", "SoFi Stadium", "Inglewood", "Grupo D"],
  // Sábado 13 junio
  ["2026-06-13", "15:00", "Catar", "Suiza", "Levi's Stadium", "Santa Clara", "Grupo B"],
  ["2026-06-13", "18:00", "Brasil", "Marruecos", "MetLife Stadium", "East Rutherford", "Grupo C"],
  ["2026-06-13", "21:00", "Haití", "Escocia", "Gillette Stadium", "Foxborough", "Grupo C"],
  // Domingo 14 junio
  ["2026-06-14", "00:00", "Australia", "Turquía", "BC Place", "Vancouver", "Grupo D"],
  ["2026-06-14", "13:00", "Alemania", "Curazao", "NRG Stadium", "Houston", "Grupo E"],
  ["2026-06-14", "16:00", "Países Bajos", "Japón", "AT&T Stadium", "Arlington", "Grupo F"],
  ["2026-06-14", "19:00", "Costa de Marfil", "Ecuador", "Lincoln Financial Field", "Filadelfia", "Grupo E"],
  ["2026-06-14", "22:00", "Suecia", "Túnez", "Estadio BBVA", "Monterrey", "Grupo F"],
  // Lunes 15 junio
  ["2026-06-15", "12:00", "España", "Cabo Verde", "Mercedes-Benz Stadium", "Atlanta", "Grupo H"],
  ["2026-06-15", "15:00", "Bélgica", "Egipto", "Lumen Field", "Seattle", "Grupo G"],
  ["2026-06-15", "18:00", "Arabia Saudita", "Uruguay", "Hard Rock Stadium", "Miami Gardens", "Grupo H"],
  ["2026-06-15", "21:00", "Irán", "Nueva Zelanda", "SoFi Stadium", "Inglewood", "Grupo G"],
  // Martes 16 junio
  ["2026-06-16", "15:00", "Francia", "Senegal", "MetLife Stadium", "East Rutherford", "Grupo I"],
  ["2026-06-16", "18:00", "Iraq", "Noruega", "Gillette Stadium", "Foxborough", "Grupo I"],
  ["2026-06-16", "21:00", "Argentina", "Argelia", "Arrowhead Stadium", "Kansas City", "Grupo J"],
  // Miércoles 17 junio
  ["2026-06-17", "00:00", "Austria", "Jordania", "Levi's Stadium", "Santa Clara", "Grupo J"],
  ["2026-06-17", "13:00", "Portugal", "Congo DR", "NRG Stadium", "Houston", "Grupo K"],
  ["2026-06-17", "16:00", "Inglaterra", "Croacia", "AT&T Stadium", "Arlington", "Grupo L"],
  ["2026-06-17", "19:00", "Ghana", "Panamá", "BMO Field", "Toronto", "Grupo L"],
  ["2026-06-17", "22:00", "Uzbekistán", "Colombia", "Estadio Azteca", "Ciudad de México", "Grupo K"],
  // Jueves 18 junio
  ["2026-06-18", "12:00", "Chequia", "Sudáfrica", "Mercedes-Benz Stadium", "Atlanta", "Grupo A"],
  ["2026-06-18", "15:00", "Suiza", "Bosnia-Herzegovina", "SoFi Stadium", "Inglewood", "Grupo B"],
  ["2026-06-18", "18:00", "Canadá", "Catar", "BC Place", "Vancouver", "Grupo B"],
  ["2026-06-18", "21:00", "México", "Corea del Sur", "Estadio Akron", "Zapopan", "Grupo A"],
  // Viernes 19 junio
  ["2026-06-19", "15:00", "EE.UU.", "Australia", "Lumen Field", "Seattle", "Grupo D"],
  ["2026-06-19", "18:00", "Escocia", "Marruecos", "Gillette Stadium", "Foxborough", "Grupo C"],
  ["2026-06-19", "20:30", "Brasil", "Haití", "Lincoln Financial Field", "Filadelfia", "Grupo C"],
  ["2026-06-19", "23:00", "Turquía", "Paraguay", "Levi's Stadium", "Santa Clara", "Grupo D"],
  // Sábado 20 junio
  ["2026-06-20", "13:00", "Países Bajos", "Suecia", "NRG Stadium", "Houston", "Grupo F"],
  ["2026-06-20", "16:00", "Alemania", "Costa de Marfil", "BMO Field", "Toronto", "Grupo E"],
  ["2026-06-20", "20:00", "Ecuador", "Curazao", "Arrowhead Stadium", "Kansas City", "Grupo E"],
  // Domingo 21 junio
  ["2026-06-21", "00:00", "Túnez", "Japón", "Estadio BBVA", "Monterrey", "Grupo F"],
  ["2026-06-21", "12:00", "España", "Arabia Saudita", "Mercedes-Benz Stadium", "Atlanta", "Grupo H"],
  ["2026-06-21", "15:00", "Bélgica", "Irán", "SoFi Stadium", "Inglewood", "Grupo G"],
  ["2026-06-21", "18:00", "Uruguay", "Cabo Verde", "Hard Rock Stadium", "Miami Gardens", "Grupo H"],
  ["2026-06-21", "21:00", "Nueva Zelanda", "Egipto", "BC Place", "Vancouver", "Grupo G"],
  // Lunes 22 junio
  ["2026-06-22", "13:00", "Argentina", "Austria", "AT&T Stadium", "Arlington", "Grupo J"],
  ["2026-06-22", "17:00", "Francia", "Iraq", "Lincoln Financial Field", "Filadelfia", "Grupo I"],
  ["2026-06-22", "20:00", "Noruega", "Senegal", "MetLife Stadium", "East Rutherford", "Grupo I"],
  ["2026-06-22", "23:00", "Jordania", "Argelia", "Levi's Stadium", "Santa Clara", "Grupo J"],
  // Martes 23 junio
  ["2026-06-23", "13:00", "Portugal", "Uzbekistán", "NRG Stadium", "Houston", "Grupo K"],
  ["2026-06-23", "16:00", "Inglaterra", "Ghana", "Gillette Stadium", "Foxborough", "Grupo L"],
  ["2026-06-23", "19:00", "Panamá", "Croacia", "BMO Field", "Toronto", "Grupo L"],
  ["2026-06-23", "22:00", "Colombia", "Congo DR", "Estadio Akron", "Zapopan", "Grupo K"],
  // Miércoles 24 junio
  ["2026-06-24", "15:00", "Suiza", "Canadá", "BC Place", "Vancouver", "Grupo B"],
  ["2026-06-24", "15:00", "Bosnia-Herzegovina", "Catar", "Lumen Field", "Seattle", "Grupo B"],
  ["2026-06-24", "18:00", "Escocia", "Brasil", "Hard Rock Stadium", "Miami Gardens", "Grupo C"],
  ["2026-06-24", "18:00", "Marruecos", "Haití", "Mercedes-Benz Stadium", "Atlanta", "Grupo C"],
  ["2026-06-24", "21:00", "Chequia", "México", "Estadio Azteca", "Ciudad de México", "Grupo A"],
  ["2026-06-24", "21:00", "Sudáfrica", "Corea del Sur", "Estadio BBVA", "Monterrey", "Grupo A"],
  // Jueves 25 junio
  ["2026-06-25", "16:00", "Curazao", "Costa de Marfil", "Lincoln Financial Field", "Filadelfia", "Grupo E"],
  ["2026-06-25", "16:00", "Ecuador", "Alemania", "MetLife Stadium", "East Rutherford", "Grupo E"],
  ["2026-06-25", "19:00", "Japón", "Suecia", "AT&T Stadium", "Arlington", "Grupo F"],
  ["2026-06-25", "19:00", "Túnez", "Países Bajos", "Arrowhead Stadium", "Kansas City", "Grupo F"],
  ["2026-06-25", "22:00", "Turquía", "EE.UU.", "SoFi Stadium", "Inglewood", "Grupo D"],
  ["2026-06-25", "22:00", "Paraguay", "Australia", "Levi's Stadium", "Santa Clara", "Grupo D"],
  // Viernes 26 junio
  ["2026-06-26", "15:00", "Noruega", "Francia", "Gillette Stadium", "Foxborough", "Grupo I"],
  ["2026-06-26", "15:00", "Senegal", "Iraq", "BMO Field", "Toronto", "Grupo I"],
  ["2026-06-26", "20:00", "Cabo Verde", "Arabia Saudita", "NRG Stadium", "Houston", "Grupo H"],
  ["2026-06-26", "20:00", "Uruguay", "España", "Estadio Akron", "Zapopan", "Grupo H"],
  ["2026-06-26", "23:00", "Egipto", "Irán", "Lumen Field", "Seattle", "Grupo G"],
  ["2026-06-26", "23:00", "Nueva Zelanda", "Bélgica", "BC Place", "Vancouver", "Grupo G"],
  // Sábado 27 junio
  ["2026-06-27", "17:00", "Panamá", "Inglaterra", "MetLife Stadium", "East Rutherford", "Grupo L"],
  ["2026-06-27", "17:00", "Croacia", "Ghana", "Lincoln Financial Field", "Filadelfia", "Grupo L"],
  ["2026-06-27", "19:30", "Colombia", "Portugal", "Hard Rock Stadium", "Miami Gardens", "Grupo K"],
  ["2026-06-27", "19:30", "Congo DR", "Uzbekistán", "Mercedes-Benz Stadium", "Atlanta", "Grupo K"],
  ["2026-06-27", "22:00", "Argelia", "Austria", "Arrowhead Stadium", "Kansas City", "Grupo J"],
  ["2026-06-27", "22:00", "Jordania", "Argentina", "AT&T Stadium", "Arlington", "Grupo J"],
];

export const CALENDAR: CalendarMatch[] = RAW.map(([date, time_et, home, away, venue, city, group]) => ({
  id: `${teamSlug(home)}-${teamSlug(away)}-${date}`,
  date,
  time_et,
  home,
  away,
  home_flag: flagOf(home),
  away_flag: flagOf(away),
  venue,
  city,
  group,
  phase: "groups",
  verified: true,
}));

// Fechas (YYYY-MM-DD) de la fase de grupos, para los chips del calendario.
export function groupStageDates(): string[] {
  const out: string[] = [];
  const start = new Date(GROUP_STAGE_START + "T00:00:00Z");
  const end = new Date(GROUP_STAGE_END + "T00:00:00Z");
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
