// Noticias del Mundial 2026 — se actualizan MANUALMENTE (igual que picks.ts),
// hasta integrar una fuente real (RSS o API de noticias deportivas).
// Resúmenes redactados en palabras propias; no se copian textos de la fuente.

export interface NewsItem {
  id: string;
  title: string;
  summary: string; // 2-3 líneas, resumen propio
  date: string; // "2026-06-12"
  category: "resultado" | "lesion" | "previa" | "general";
  image_url?: string; // URL externa de imagen (opcional)
  source_url?: string; // link a la fuente original (opcional)
}

export const NEWS: NewsItem[] = [
  {
    id: "mexico-debut-azteca",
    title: "México arranca el Mundial con triunfo en el Azteca",
    summary:
      "El anfitrión abrió la cita mundialista con una victoria en el Estadio Azteca, empujado por su afición. Un debut que da aire al Tri para encarar el resto del Grupo A.",
    date: "2026-06-11",
    category: "resultado",
  },
  {
    id: "mbappe-bota-oro",
    title: "Mbappé, favorito a la Bota de Oro según las casas de apuestas",
    summary:
      "El delantero francés encabeza las cuotas para máximo goleador del torneo. Su olfato y el potencial ofensivo de Francia lo colocan por delante del resto de candidatos.",
    date: "2026-06-12",
    category: "general",
  },
  {
    id: "curazao-historia",
    title: "Curazao hace historia: la nación más pequeña en debutar en un Mundial",
    summary:
      "Con una población mínima, Curazao se convierte en el país más pequeño en alcanzar una Copa del Mundo. Una hazaña deportiva que ya marca un récord en la edición 2026.",
    date: "2026-06-12",
    category: "general",
  },
  {
    id: "cooling-breaks-regla",
    title: "Cooling breaks: la nueva regla que cambia la táctica en cada partido",
    summary:
      "Las pausas de hidratación por calor obligan a los equipos a replantear ritmo y presión. Varios analistas las señalan como un factor que iguala partidos en las sedes más cálidas.",
    date: "2026-06-12",
    category: "previa",
  },
  {
    id: "argentina-defensa-titulo",
    title: "Argentina abre su defensa del título el 16 de junio ante Argelia",
    summary:
      "La campeona vigente debuta el 16 de junio frente a Argelia. La albiceleste busca arrancar con paso firme la defensa de la corona conquistada en 2022.",
    date: "2026-06-12",
    category: "previa",
  },
];

// Imágenes ilustrativas (no son fotos de noticias específicas, son de stock).
// Nota: source.unsplash.com está descontinuado; las imágenes tienen fallback
// a un degradado con emoji si la URL no carga.
export interface GalleryImage {
  url: string;
  caption: string;
  emoji: string;
}

export const GALLERY: GalleryImage[] = [
  { url: "https://source.unsplash.com/600x400/?soccer,stadium&sig=1", caption: "Estadios del Mundial", emoji: "🏟️" },
  { url: "https://source.unsplash.com/600x400/?soccer,fans&sig=2", caption: "La fiesta de la afición", emoji: "🎉" },
  { url: "https://source.unsplash.com/600x400/?football,trophy&sig=3", caption: "El sueño de la Copa", emoji: "🏆" },
  { url: "https://source.unsplash.com/600x400/?soccer,crowd&sig=4", caption: "Tribunas a reventar", emoji: "👥" },
  { url: "https://source.unsplash.com/600x400/?world-cup,flags&sig=5", caption: "Banderas de 48 selecciones", emoji: "🚩" },
  { url: "https://source.unsplash.com/600x400/?stadium,lights&sig=6", caption: "Noches de Mundial", emoji: "🌃" },
];
