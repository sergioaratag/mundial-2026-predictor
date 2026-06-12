// Las 16 sedes oficiales del Mundial 2026 (confirmadas por FIFA desde 2022/2024).
export interface Venue {
  stadium: string;
  city: string;
  country: "USA" | "MEX" | "CAN";
}

export const VENUES: Venue[] = [
  { stadium: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA" },
  { stadium: "Gillette Stadium", city: "Boston (Foxborough)", country: "USA" },
  { stadium: "AT&T Stadium", city: "Dallas (Arlington)", country: "USA" },
  { stadium: "NRG Stadium", city: "Houston", country: "USA" },
  { stadium: "Arrowhead Stadium", city: "Kansas City", country: "USA" },
  { stadium: "SoFi Stadium", city: "Los Ángeles (Inglewood)", country: "USA" },
  { stadium: "Hard Rock Stadium", city: "Miami (Miami Gardens)", country: "USA" },
  { stadium: "MetLife Stadium", city: "Nueva York / Nueva Jersey", country: "USA" },
  { stadium: "Lincoln Financial Field", city: "Filadelfia", country: "USA" },
  { stadium: "Levi's Stadium", city: "San Francisco (Santa Clara)", country: "USA" },
  { stadium: "Lumen Field", city: "Seattle", country: "USA" },
  { stadium: "Estadio Azteca", city: "Ciudad de México", country: "MEX" },
  { stadium: "Estadio Akron", city: "Guadalajara", country: "MEX" },
  { stadium: "Estadio BBVA", city: "Monterrey", country: "MEX" },
  { stadium: "BMO Field", city: "Toronto", country: "CAN" },
  { stadium: "BC Place", city: "Vancouver", country: "CAN" },
];
