import type { DualJornada } from "@/lib/types";

// Picks por jornada — modelo ÚNICO v2 (doble fuente: Klement / Claude).
//  · klement = favorito del partido (ranking/PIB; menor cuota si hay odds) con su driver.
//  · claude  = el pick de mayor confianza del análisis.
//  · odds / referee / result / stats van en null cuando no existen → la UI los oculta.
// (Ver "Rutina diaria" en CLAUDE.md.)

export const j1: DualJornada = {
  jornada: 1,
  fecha: "2026-06-11",
  tipo: "picks",
  partidos: [
    {
      match: "México vs Sudáfrica",
      result: "2-0",
      venue: "Estadio Azteca (Ciudad de México)",
      kickoff: "2026-06-11T20:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "México", driver: "anfitrión + ranking superior" },
        claude: { market: "Resultado", selection: "México gana", note: "Anfitrión y favorito en la inauguración, pero los openers suelen ser nerviosos." },
      },
    },
    {
      match: "Corea del Sur vs Chequia",
      result: "2-1",
      venue: "Estadio Akron (Guadalajara, Zapopan)",
      kickoff: "2026-06-11T22:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Corea del Sur", driver: "ranking + mayor talento ofensivo del grupo" },
        claude: { market: "Resultado", selection: "Corea del Sur gana", note: "Mayor diferencia de talento ofensivo y Chequia con entrenador nuevo sin tiempo de instalar un sistema, pero el margen real es estrecho (+160 Corea, +200 empate, +195 Chequia)" },
      },
    },
  ],
  combos: [
    { title: "Mega Combo Jornada 1 (2 patas)", legs: ["México gana (vs Sudáfrica)", "Corea del Sur gana + Over 2.5 (vs Chequia)"], odds: "~4.20x", risk: "alta", note: "Combina el favoritismo claro de México como anfitrión con el argumento ofensivo de Corea en un partido donde el mercado está dividido" },
    { title: "Corea: combo recomendado", legs: ["Corea del Sur gana", "Over 2.5 goles"], odds: "~3.10x", risk: "moderate", note: "Apunta al argumento ofensivo de Corea como máxima goleadora de su grupo de clasificación, aunque el mercado está genuinamente dividido en este partido" },
    { title: "Corea: combo alternativo (consenso conservador)", legs: ["Empate", "Under 2.5 goles"], odds: "~4.40x", risk: "alta", note: "Para quien prefiera el análisis que ve un partido cerrado tipo 1-1, citado como 'la apuesta de valor' por una fuente especializada" },
  ],
};

export const j2: DualJornada = {
  jornada: 2,
  fecha: "2026-06-12",
  tipo: "picks",
  partidos: [
    {
      match: "Canadá vs Bosnia-Herzegovina",
      result: "1-1",
      venue: "BMO Field (Toronto)",
      kickoff: "2026-06-12T15:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Canadá", driver: "local + 8 partidos invicto con 6 clean sheets" },
        claude: { market: "Goles", selection: "Under 2.5", note: "Línea de mercado en -139, partido de bajo evento, Bosnia cierra bien" },
      },
    },
    {
      match: "Estados Unidos vs Paraguay",
      result: "4-1",
      venue: "SoFi Stadium (Los Ángeles, Inglewood)",
      kickoff: "2026-06-12T21:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Estados Unidos", driver: "anfitrión + favorito del modelo (51.2%)" },
        claude: { market: "Goles", selection: "Under 2.5", note: "Paraguay cierra el medio campo, EE.UU. depende de centros, pocos goles esperados" },
      },
    },
  ],
  combos: [
    { title: "Mega Combo Jornada 2 (3 patas)", legs: ["Canadá gana + Under 2.5 (CAN vs BIH)", "EE.UU./empate (1X) + Under 2.5 (USA vs PAR)", "Corners EE.UU. Over 5.5"], odds: "~6.20x", risk: "moderate-alta", note: "Combina los dos patrones de 'partido controlado y bajo en goles' del día con el prop de corners de EE.UU. como tercera pata de valor" },
    { title: "Canadá: combo recomendado", legs: ["Canadá gana", "Under 2.5 goles"], odds: "~2.10x", risk: "moderate", note: "Victoria controlada tipo 1-0, el patrón más repetido por los modelos" },
    { title: "Canadá: combo alternativo (valor)", legs: ["Under 2.5 goles", "Corners totales Under 10.5", "Under 4.5 tarjetas"], odds: "~3.40x", risk: "moderate", note: "Apuesta al 'partido tranquilo': bajo en goles, corners y tarjetas a la vez" },
    { title: "EE.UU.: combo recomendado", legs: ["EE.UU. o empate (1X)", "Under 2.5 goles"], odds: "~1.95x", risk: "low", note: "La combinación más segura: cubre el resultado más probable y el patrón de pocos goles" },
    { title: "EE.UU.: combo de valor (corners + tarjetas)", legs: ["Corners EE.UU. Over 5.5", "Tarjetas Paraguay Over 2.5"], odds: "~2.70x", risk: "moderate", note: "Aprovecha el patrón táctico: EE.UU. ataca por fuera, Paraguay comete faltas para frenar" },
  ],
};

export const j3: DualJornada = {
  jornada: 3,
  fecha: "2026-06-13",
  tipo: "picks",
  partidos: [
    {
      match: "Catar vs Suiza",
      result: "1-1",
      venue: "Levi's Stadium (Santa Clara)",
      kickoff: "2026-06-13T15:00:00-04:00",
      referee: { name: "Saíd Martínez", avgCards: "4.0", avgFouls: "24.0" },
      picks: {
        klement: { market: "1X2", selection: "Suiza", driver: "ranking superior + favorito del mercado (-334)" },
        claude: { market: "Resultado", selection: "Suiza gana", note: "60.12% de probabilidad según Sportytrader, Catar sin anotar en sus últimos 2 partidos y con apenas 1 tiro al arco en el más reciente" },
      },
    },
    {
      match: "Brasil vs Marruecos",
      result: "1-1",
      venue: "MetLife Stadium (East Rutherford)",
      kickoff: "2026-06-13T18:00:00-04:00",
      referee: { name: "Slavko Vinčić", avgCards: "4.1", avgFouls: "25.5" },
      picks: {
        klement: { market: "1X2", selection: "Brasil", driver: "favorito del mercado (1.57) + mayor profundidad ofensiva" },
        claude: { market: "Goles", selection: "Under 2.5", note: "Cotizado en -123/-145 por múltiples analistas, Marruecos invicto en 29 partidos consecutivos en 90 minutos con un bloque defensivo que concedió solo 1 gol de juego abierto en 7 partidos de la última Copa Africana" },
      },
    },
    {
      match: "Haití vs Escocia",
      result: "0-1",
      venue: "Gillette Stadium (Foxborough)",
      kickoff: "2026-06-13T21:00:00-04:00",
      referee: { name: "Mustapha Ghorbal", avgCards: "4.2", avgFouls: "28.8" },
      picks: {
        klement: { market: "1X2", selection: "Escocia", driver: "plantilla con más rodaje en ligas top europeas" },
        claude: { market: "Resultado", selection: "Escocia gana", note: "Mayor experiencia de plantilla en ligas top europeas, y necesidad de arrancar con triunfo antes de enfrentar a Brasil y Marruecos en el grupo" },
      },
    },
  ],
  combos: [
    { title: "Mega Combo Jornada 3 (3 patas)", legs: ["Suiza gana + BTTS No (vs Catar)", "Brasil gana + Under 2.5 (vs Marruecos)", "Escocia gana + Over 2.5 (vs Haití)"], odds: "~12.80x", risk: "alta", note: "Brasil vs Marruecos es el partido de mayor incertidumbre real del día por el cambio de entrenador y bajas marroquíes, pero Under 2.5 tiene amplio respaldo del consenso de analistas (-123 a -145)" },
    { title: "Catar-Suiza: combo recomendado", legs: ["Suiza gana", "BTTS No"], odds: "~1.85x", risk: "low-moderate", note: "Combina el favoritismo abrumador con el patrón reciente de Catar de no anotar, perfil de partido más seguro del día" },
    { title: "Catar-Suiza: combo de valor", legs: ["Suiza -1.5", "BTTS No"], odds: "~2.50x", risk: "moderate", note: "Apunta al marcador más probable proyectado (2-0) que cumple ambas condiciones" },
    { title: "Brasil-Marruecos: combo recomendado", legs: ["Brasil gana", "Under 2.5 goles"], odds: "~2.65x", risk: "moderate", note: "Combina el favoritismo brasileño con el consenso de un partido cerrado y táctico, perfil de victoria 1-0 o 2-1 sobre un Marruecos bien plantado" },
    { title: "Haití-Escocia: combo recomendado", legs: ["Escocia gana", "Over 2.5 goles"], odds: "~2.55x", risk: "moderate", note: "Apunta al guion de victoria con margen que la diferencia de jerarquía y la necesidad de puntos de Escocia sugieren" },
    { title: "Haití-Escocia: combo contra-corriente (valor)", legs: ["Haití o empate (+360)"], odds: "~4.60x", risk: "alta", note: "Pick aislado de un analista que lo describe como un valor inusualmente alto — Escocia sin rodaje mundialista en 28 años es el argumento principal" },
  ],
};

export const j4: DualJornada = {
  jornada: 4,
  fecha: "2026-06-14",
  tipo: "picks",
  partidos: [
    {
      match: "Australia vs Turquía",
      result: "2-0",
      venue: "BC Place (Vancouver)",
      kickoff: "2026-06-14T00:00:00-04:00",
      referee: { name: "Jesús Valenzuela Sáez", avgCards: "5.4", avgFouls: "27.4" },
      picks: {
        klement: { market: "1X2", selection: "Turquía", driver: "ranking + mejor forma (8-1-1 en sus últimos 10)" },
        claude: { market: "Resultado", selection: "Turquía gana", note: "Cotizado en -145 por al menos un analista como pick de bloqueo del día, registro de 8-1-1 en sus últimos 10 partidos incluyendo un empate 2-2 ante España" },
      },
    },
    {
      match: "Alemania vs Curazao",
      result: "7-1",
      venue: "NRG Stadium (Houston)",
      kickoff: "2026-06-14T13:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Alemania", driver: "ranking +70 posiciones por encima" },
        claude: { market: "Resultado", selection: "Alemania gana", note: "Brecha de ranking de más de 70 posiciones, Curazao en su primer Mundial, supercomputer da 89.6% de probabilidad" },
      },
    },
    {
      match: "Países Bajos vs Japón",
      result: "2-2",
      venue: "AT&T Stadium (Arlington, Dallas)",
      kickoff: "2026-06-14T16:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Países Bajos", driver: "ranking superior + favorito del modelo" },
        claude: { market: "Goles", selection: "Under 2.5", note: "Consenso multi-modelo, marcador más probable 1-1 según Dimers, línea de mercado en -118" },
      },
    },
    {
      match: "Costa de Marfil vs Ecuador",
      result: "1-0",
      venue: "Lincoln Financial Field (Filadelfia)",
      kickoff: "2026-06-14T19:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Ecuador", driver: "ranking superior + mejor defensa de Sudamérica" },
        claude: { market: "Goles", selection: "Under 2.5", note: "Mercado fija el Under en -250, señal estadística muy fuerte" },
      },
    },
    {
      match: "Suecia vs Túnez",
      result: "5-1",
      venue: "Estadio BBVA (Monterrey)",
      kickoff: "2026-06-14T22:00:00-04:00",
      picks: {
        klement: { market: "1X2", selection: "Suecia", driver: "ventaja ofensiva (Gyökeres/Isak) + favorito (-106)" },
        claude: { market: "Ambos marcan", selection: "BTTS Sí", note: "Probabilidad de 54.76% según Wincomparator, ambas defensas son frágiles, Suecia sin clean sheet en 11 partidos" },
      },
    },
  ],
  combos: [
    { title: "Mega Combo Jornada 4 (3 patas seleccionadas)", legs: ["Alemania -3.5 (vs Curazao)", "Ecuador gana + Under 2.5 (vs Costa de Marfil)", "Suecia gana + BTTS Sí (vs Túnez)"], odds: "~9.50x", risk: "alta", note: "Países Bajos vs Japón se deja fuera por ser el de mayor incertidumbre real del día, se juega aparte como pick de valor independiente" },
    { title: "Australia-Turquía: combo recomendado", legs: ["Turquía -1", "Under 2.5 goles"], odds: "~2.30x", risk: "moderate", note: "Combina el favoritismo marcado con un perfil de partido controlado típico de aperturas de grupo para un equipo que no necesita arriesgar" },
    { title: "Alemania-Curazao: combo recomendado", legs: ["Alemania -3.5", "Over 4.5 goles totales"], odds: "~2.50x", risk: "moderate", note: "Apunta al guion de blowout en el que coinciden prácticamente todos los modelos" },
    { title: "Países Bajos-Japón: combo recomendado (valor)", legs: ["Japón +1.5", "Under 2.5 goles"], odds: "~2.20x", risk: "moderate", note: "El partido de mayor valor del día según el consenso de modelos" },
    { title: "Costa de Marfil-Ecuador: combo recomendado", legs: ["Ecuador gana", "Under 2.5 goles"], odds: "~2.80x", risk: "moderate", note: "Respaldo sólido del perfil defensivo ecuatoriano con valor en el ML a +125" },
    { title: "Suecia-Túnez: combo recomendado", legs: ["Suecia gana", "BTTS Sí"], odds: "~2.60x", risk: "moderate", note: "Combina la ventaja ofensiva sueca con la fragilidad defensiva de ambos lados" },
  ],
};

export const j15: DualJornada = {
  jornada: 15,
  fecha: "2026-06-15",
  tipo: "picks",
  partidos: [
    {
      match: "España vs Cabo Verde",
      result: "0-0",
      venue: "Mercedes-Benz (Atlanta)",
      kickoff: "2026-06-15T12:00:00-04:00",
      referee: { name: "Adham Makhadmeh" },
      odds: { home: 1.1, draw: null, away: 38.0 },
      picks: {
        klement: { market: "1X2", selection: "España", driver: "ranking #1 + PIB + campeón Euro" },
        claude: { market: "Hándicap", selection: "España -1.5", note: "1.10 sin valor; España vino sin gol en prep (0-0 Egipto, 1-1 Irak); CV compacto" },
      },
    },
    {
      match: "Bélgica vs Egipto",
      result: "1-1",
      venue: "Lumen Field (Seattle)",
      kickoff: "2026-06-15T15:00:00-04:00",
      referee: { name: "Ramon Abatti" },
      odds: { home: 1.66, draw: 4.01, away: 5.8 },
      picks: {
        klement: { market: "1X2", selection: "Bélgica", driver: "ranking + PIB + experiencia" },
        claude: { market: "BTTS", selection: "Sí", note: "Bélgica defensa veterana; Salah amenaza; 1.66 sin gran valor" },
      },
    },
    {
      match: "Arabia Saudí vs Uruguay",
      venue: "Hard Rock (Miami)",
      kickoff: "2026-06-15T18:00:00-04:00",
      referee: { name: null },
      odds: { home: null, draw: null, away: null },
      picks: {
        klement: { market: "1X2", selection: "Uruguay", driver: "ranking + PIB > Arabia" },
        claude: { market: "1X2 + Goles", selection: "Uruguay gana + Under 2.5", note: "calor de Miami iguala; Arabia repliega" },
      },
    },
    {
      match: "Irán vs Nueva Zelanda",
      venue: "SoFi (LA)",
      kickoff: "2026-06-15T21:00:00-04:00",
      referee: { name: null },
      odds: { home: null, draw: null, away: null },
      picks: {
        klement: { market: "1X2", selection: "Irán", driver: "ranking + experiencia" },
        claude: { market: "1X2 + Goles", selection: "Irán gana + Under 2.5", note: "Irán sólido atrás; partido cerrado" },
      },
    },
  ],
};

export const j16: DualJornada = {
  jornada: 16,
  fecha: "2026-06-16",
  tipo: "picks",
  partidos: [
    {
      match: "Francia vs Senegal",
      venue: "MetLife (NJ)",
      kickoff: "2026-06-16T15:00:00-04:00",
      referee: { name: "Alireza Faghani", avgCards: "3.5–4.3", avgFouls: "~20" },
      odds: { home: 1.5, draw: 4.46, away: 7.31 },
      oddsNote: "Francia favorita amplia (1.50), empate 4.46, Senegal 7.31. El mercado ya recoge el dominio galo: poco valor en el directo.",
      preview: "Francia llega como n.º1 FIFA y subcampeona 2022, invicta en 4 de sus últimos 5 (3-1 a Irlanda del Norte; cayó 2-1 con Costa de Marfil). Mbappé arrastró molestia muscular. Senegal terminó invicto su grupo de clasificación (solo 3 goles encajados en 10 partidos) pero mostró fragilidad en amistosos (3-2 vs EE.UU., 0-0 vs Arabia); Koulibaly y Mendy vuelven y Mané llega fino.",
      avoid: [
        "Mbappé arrastró molestia muscular (muslo): confirmar que sea titular y al 100%",
        "Senegal mostró fragilidad defensiva en amistosos (3-2 vs EE.UU., 0-0 vs Arabia), pero Koulibaly y Mendy vuelven para este partido",
        "Alineaciones no confirmadas por los técnicos hasta cerca del inicio",
        "Faghani es de perfil moderado en tarjetas: no fuerces overs de amarillas",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Francia",
          driver: "FIFA #1 + PIB + sede fría",
          fullAnalysis: "El modelo favorece a Francia por ranking, PIB y profundidad de plantel; Francia no pierde su estreno mundialista desde 2002.",
          options: [
            { market: "1X2", selection: "Francia gana", confidence: "alta" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
          ],
        },
        claude: {
          market: "Hándicap",
          selection: "Senegal +1.5",
          note: "1.50 sin valor; Senegal es nivel alto y Francia llega floja atrás",
          fullAnalysis: "Francia favorita justa (1.50 = sin valor en el directo). Senegal es finalista reciente de la Copa Africana, físico y compacto cuando juega con Koulibaly y Mendy; el valor está en que aguante perder por ≤1. Revancha del 2002 (Senegal 1-0).",
          options: [
            { market: "1X2", selection: "Francia gana", confidence: "media" },
            { market: "Hándicap", selection: "Senegal +1.5", confidence: "alta" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
            { market: "Faltas/Amarillas", selection: "Tarjeta a Senegal", confidence: "media" },
            { market: "Amarillas totales", selection: "Under 4.5", confidence: "media" },
          ],
          comboRecomendado: { legs: ["Senegal +1.5", "Over 1.5 goles"], nota: "Máx. 2 patas: más patas = más margen de la casa" },
        },
      },
    },
    {
      match: "Irak vs Noruega",
      venue: "Boston (Foxborough)",
      kickoff: "2026-06-16T18:00:00-04:00",
      referee: { name: "Pierre Atcho", avgCards: "~2.6 (muestra chica)" },
      stats: { cornersIrakConcede: 5.4, cornersNoruega: 5 },
      odds: { home: 13.0, draw: 7.0, away: 1.4 },
      oddsNote: "Noruega favorita fuerte (~1.40), empate ~7, Irak ~13. Ganar no paga; el valor está en córners y goleador.",
      preview: "Noruega llega lanzada con Haaland (18 goles en clasificación) y Ødegaard, de vuelta a un Mundial tras casi 30 años. Irak regresa tras casi 40 años y probablemente se repliegue para achicar espacios.",
      avoid: [
        "Atcho tiene muestra de datos chica: tómalo como indicativo",
        "Irak vuelve a un Mundial tras casi 40 años: puede replegarse mucho → cuidado con overs de goles",
        "Confirmar titularidad de Haaland y Ødegaard",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Noruega",
          driver: "ranking + PIB + experiencia",
          fullAnalysis: "Noruega favorita amplia por nivel y profundidad; Haaland marcó 18 en la clasificación.",
          options: [
            { market: "1X2", selection: "Noruega gana", confidence: "alta" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
          ],
        },
        claude: {
          market: "Córners Noruega",
          selection: "Over 5.5",
          note: "Irak concede 5.4 córners/partido; Noruega domina banda (~60% posesión)",
          fullAnalysis: "El 1.40 a Noruega no tiene valor (probable pero mal pagado). El edge real está en córners: Irak concede 5.4 por partido y Noruega controlará el juego. Haaland como anota es secundario pero con líneas cargadas.",
          options: [
            { market: "1X2", selection: "Noruega gana", confidence: "alta" },
            { market: "Córners Noruega", selection: "Over 5.5", confidence: "alta" },
            { market: "Goleador", selection: "Haaland anota", confidence: "media" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
            { market: "Amarillas totales", selection: "Under", confidence: "media" },
          ],
          comboRecomendado: { legs: ["Noruega gana", "Córners Noruega Over 5.5"], nota: "Combo del mismo partido (SGM), 2 patas" },
        },
      },
    },
    {
      match: "Argentina vs Argelia",
      venue: "Arrowhead (KC)",
      kickoff: "2026-06-16T21:00:00-04:00",
      referee: { name: "Szymon Marciniak", avgCards: null },
      odds: { home: null, draw: null, away: null },
      oddsNote: "Argentina favorita clara (cuota exacta por confirmar en Metabet).",
      preview: "Argentina debuta como campeona vigente; por ver la gestión de minutos de Messi. Argelia llegó fuerte (8-1-1 en eliminatorias) con Mahrez y un equipo de presión alta bajo Petković: rival incómodo para un estreno.",
      avoid: [
        "Marciniak (árbitro de la final de Qatar 2022) es firme en partidos grandes, pero su promedio exacto de tarjetas está pendiente: no fijes overs de amarillas a ciegas",
        "Argelia llegó fuerte (8-1-1 en eliminatorias, Mahrez, Petković con presión alta): NO es relleno, cuidado con el -1.5 a Argentina en un debut",
        "Confirmar gestión de minutos de Messi",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Argentina",
          driver: "ranking + PIB + campeón vigente",
          fullAnalysis: "El modelo pone a Argentina como favorita clara por ranking, plantel y condición de campeón vigente.",
          options: [
            { market: "1X2", selection: "Argentina gana", confidence: "alta" },
          ],
        },
        claude: {
          market: "1X2/Hándicap",
          selection: "Argentina gana (o Argelia +1.5 por cuota)",
          note: "Argelia llegó 8-1-1; el -1.5 es arriesgado en un debut",
          fullAnalysis: "Klement y dato coinciden en el ganador, pero Argelia es una selección en forma y este es un estreno: una goleada no está garantizada. Lo razonable es Argentina sin handicap, o Argelia +1.5 si la cuota acompaña.",
          options: [
            { market: "1X2", selection: "Argentina gana", confidence: "alta" },
            { market: "Hándicap", selection: "Argentina -1.5", confidence: "baja" },
            { market: "Hándicap", selection: "Argelia +1.5", confidence: "media" },
            { market: "Totales", selection: "Under 2.5", confidence: "media" },
          ],
          comboRecomendado: { legs: ["Argentina gana", "Under 2.5"], nota: "Lectura de debut cerrado; máx. 2 patas" },
        },
      },
    },
  ],
};

// Lista única de jornadas (orden cronológico). J5 vieja eliminada: era el mismo
// matchday que J15 y quedaba duplicada.
export const DUAL_JORNADAS: DualJornada[] = [j1, j2, j3, j4, j15, j16];
