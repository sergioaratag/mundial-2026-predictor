import type { PicksDay } from "@/lib/types";

// Picks por jornada. Estructura genérica: agregar días sin tocar componentes.
// (Ver "Rutina diaria" en CLAUDE.md.)

export const PICKS: PicksDay[] = [
  {
    id: "jornada-1",
    jornada: 1,
    date: "2026-06-11",
    label: "Jornada 1 · Jueves 11 de Junio (Inauguración)",
    matches: [
      {
        home: "México",
        away: "Sudáfrica",
        home_flag: "🇲🇽",
        away_flag: "🇿🇦",
        venue: "Estadio Azteca",
        city: "Ciudad de México",
        group: "Grupo A",
        time_bolivia: "20:00",
        context:
          "Partido inaugural en el Estadio Azteca. México como anfitrión y favorito ante una Sudáfrica que llega con menos jerarquía pero disciplina táctica. Día inaugural: análisis detallado a cargar (placeholder — Sergio carga los picks definitivos en la rutina diaria).",
        picks: [
          {
            market: "Resultado",
            value: "México gana",
            confidence: "moderate",
            note: "Anfitrión y favorito en la inauguración, pero los openers suelen ser nerviosos.",
          },
          {
            market: "Goles",
            value: "Under 2.5",
            confidence: "low",
            note: "Observación preliminar: partidos inaugurales tienden a ser cerrados. Pendiente de confirmar con el bloque del día.",
          },
        ],
        combos: [],
        avoid: ["Hándicaps altos a México: openers de anfitriones rara vez son goleadas."],
      },
    ],
  },
  {
    id: "jornada-2",
    jornada: 2,
    date: "2026-06-12",
    label: "Jornada 2 · Viernes 12 de Junio",
    matches: [
      {
        home: "Canadá",
        away: "Bosnia-Herzegovina",
        home_flag: "🇨🇦",
        away_flag: "🇧🇦",
        venue: "BMO Field",
        city: "Toronto",
        group: "Grupo B",
        time_bolivia: "15:00",
        context:
          "Canadá llega con 8 partidos invictos y 6 clean sheets en esa racha, jugando en casa por primera vez un Mundial desde 1986. Bosnia eliminó a Italia en penales para clasificar y lleva 6 partidos consecutivos sin recibir gol en la primera mitad. El mercado está dividido: algunos modelos ven 1-0 Canadá, otros ven 1-1. Jonathan David es la pieza clave ofensiva canadiense (+185 a anotar). Históricamente los partidos de Bosnia tienen bajo conteo de corners (menos de 10.5 en sus últimos 8).",
        picks: [
          { market: "Resultado", value: "Canadá gana", confidence: "moderate", note: "Favoritos en casa pero Bosnia es sólida defensivamente, no es un blowout" },
          { market: "Goles", value: "Under 2.5", confidence: "hot", note: "Línea de mercado en -139, partido de bajo evento, Bosnia cierra bien" },
          { market: "Goleador", value: "Jonathan David anota", confidence: "moderate", note: "Pieza ofensiva clave de Canadá, +185 a marcar en cualquier momento" },
          { market: "Corners Canadá", value: "Over 4.5", confidence: "moderate", note: "Dominio territorial canadiense en casa empuja el conteo de corners propios" },
          { market: "Corners totales", value: "Under 10.5", confidence: "moderate", note: "Bosnia trae un patrón de bajo conteo de corners en sus últimos 8 partidos" },
          { market: "Tarjetas", value: "Under 4.5", confidence: "moderate", note: "4 de los últimos 5 partidos de ambos equipos terminaron bajo 4.5 tarjetas" },
          { market: "Ambos marcan", value: "BTTS posible pero no prioritario", confidence: "low", note: "Cuota de BTTS Sí en 2.10, atractiva pero contradice el Under 2.5 como pick principal" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Canadá gana", "Under 2.5 goles"], odds: "~2.10x", risk: "moderate", note: "Victoria controlada tipo 1-0, el patrón más repetido por los modelos" },
          { title: "Combo alternativo (valor)", legs: ["Under 2.5 goles", "Corners totales Under 10.5", "Under 4.5 tarjetas"], odds: "~3.40x", risk: "moderate", note: "Apuesta al 'partido tranquilo': bajo en goles, corners y tarjetas a la vez" },
        ],
        avoid: [
          "Canadá -1.5 o hándicaps altos: Bosnia no es un equipo para blowout, vienen de eliminar a Italia",
          "Empate seco como única apuesta: cuota +250 atractiva pero Canadá en casa tiene presión real para ganar",
        ],
      },
      {
        home: "Estados Unidos",
        away: "Paraguay",
        home_flag: "🇺🇸",
        away_flag: "🇵🇾",
        venue: "SoFi Stadium",
        city: "Los Ángeles (Inglewood)",
        group: "Grupo D",
        time_bolivia: "21:00",
        context:
          "EE.UU. como anfitrión llega con presión mediática enorme pero un historial reciente irregular (perdieron 3 de 4 amistosos previos). Paraguay regresa a un Mundial por primera vez desde 2010 con el objetivo claro de incomodar: equipo physical, fouls altos, busca el punto sucio. Julio Enciso (estrella ofensiva de Paraguay) está lesionado y es duda. El mediocampista paraguayo Diego Gomez acumuló 48 faltas y 9 amarillas en la Premier League esta temporada — alto volumen de faltas esperado de su parte. El modelo Dimers da 51.2% USA, 23.1% Paraguay, 25.7% empate. El plan de Paraguay (bloque bajo, faltas tácticas) empuja a EE.UU. a jugar por bandas y generar muchos corners propios.",
        picks: [
          { market: "Resultado", value: "EE.UU. gana", confidence: "moderate", note: "Favorito claro pero sin contundencia clara, +100 sugiere partido cerrado" },
          { market: "Goles", value: "Under 2.5", confidence: "hot", note: "Paraguay cierra el medio campo, EE.UU. depende de centros, pocos goles esperados" },
          { market: "Doble oportunidad", value: "EE.UU. o empate (1X)", confidence: "moderate", note: "Cobertura de seguridad ante la posibilidad real de empate (+240)" },
          { market: "Corners EE.UU.", value: "Over 5.5", confidence: "hot", note: "Paraguay bloquea el centro, EE.UU. fuerza el juego por bandas y centros al área" },
          { market: "Tarjetas Paraguay", value: "Over 2.5", confidence: "moderate", note: "Diego Gomez y el mediocampo paraguayo acumulan faltas tácticas constantes" },
          { market: "Goleador", value: "Christian Pulisic anota", confidence: "moderate", note: "+225 a marcar, principal generador ofensivo de EE.UU. en bandas" },
          { market: "Clean Sheet EE.UU.", value: "Sí", confidence: "low", note: "30.7% de probabilidad según Dimers, atractivo si confías en la defensa local" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["EE.UU. o empate (1X)", "Under 2.5 goles"], odds: "~1.95x", risk: "low", note: "La combinación más segura: cubre el resultado más probable y el patrón de pocos goles" },
          { title: "Combo de valor (corners + tarjetas)", legs: ["Corners EE.UU. Over 5.5", "Tarjetas Paraguay Over 2.5"], odds: "~2.70x", risk: "moderate", note: "Aprovecha el patrón táctico: EE.UU. ataca por fuera, Paraguay comete faltas para frenar" },
        ],
        avoid: [
          "EE.UU. ML simple sin cobertura: la presión de jugar como anfitrión históricamente genera partidos nerviosos de los hosts en el opener",
          "Over 2.5 goles: Paraguay viene a cerrar el partido, no a regalar espacios",
          "BTTS Sí como pick principal: con Enciso lesionado, Paraguay pierde su mayor amenaza ofensiva",
        ],
      },
    ],
    megaCombo: {
      title: "Mega Combo Jornada 2 (3 patas)",
      legs: [
        "Canadá gana + Under 2.5 (CAN vs BIH)",
        "EE.UU./empate (1X) + Under 2.5 (USA vs PAR)",
        "Corners EE.UU. Over 5.5",
      ],
      odds: "~6.20x",
      risk: "moderate-alta",
      note: "Combina los dos patrones de 'partido controlado y bajo en goles' del día con el prop de corners de EE.UU. como tercera pata de valor",
    },
  },
];
