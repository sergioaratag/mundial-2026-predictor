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
      preview: "Francia (n.º1 FIFA, subcampeona 2022) llega invicta en 4 de sus últimos 5; Mbappé arrastró molestia en el muslo. Senegal terminó invicto su clasificación (3 goles encajados en 10) y es finalista reciente de la Copa Africana: físico y con buen cierre, con Koulibaly y Mendy de vuelta tras la fragilidad de los amistosos. Ojo: MetLife (NJ) es sede fresca, así que aquí NO pesa la ventaja de calor; el valor de Senegal es calidad y orden, no clima.",
      oddsNote: "Francia 1.50 / empate 4.46 / Senegal 7.31. El mercado ya recoge el dominio galo: el valor está en el hándicap de Senegal, no en el directo.",
      avoid: [
        "Mbappé arrastró molestia muscular: confirmar que sea titular y al 100%",
        "Senegal mostró fragilidad en amistosos (3-2 vs EE.UU., 0-0 vs Arabia), pero Koulibaly y Mendy vuelven",
        "MetLife es sede fresca: el factor calor/cardio africano NO aplica aquí",
        "Faghani es moderado en tarjetas: no fuerces overs de amarillas",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Francia",
          driver: "FIFA #1 + PIB + sede",
          options: [
            { market: "1X2", selection: "Francia gana", confidence: "alta" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
          ],
        },
        claude: {
          market: "Hándicap",
          selection: "Senegal +1.5",
          note: "1.50 sin valor; Senegal es nivel alto (finalista Copa Africana) y Francia llega floja atrás. Sede fresca: pick de calidad y precio, no de calor.",
          options: [
            { market: "Hándicap", selection: "Senegal +1.5", confidence: "alta" },
            { market: "1X2", selection: "Francia gana", confidence: "media" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
            { market: "Tarjetas", selection: "Tarjeta a Senegal", confidence: "media" },
            { market: "Amarillas", selection: "Under 4.5", confidence: "media" },
          ],
          comboRecomendado: { legs: ["Senegal +1.5", "Over 1.5 goles"], nota: "Máx. 2 patas" },
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
      preview: "Noruega llega lanzada con Haaland (18 goles en clasificación) y Ødegaard, de vuelta a un Mundial. Irak regresa tras casi 40 años y probablemente se repliegue para achicar espacios. Sede: Boston (Foxborough), fresca → sin factor calor.",
      oddsNote: "Noruega ~1.40 / empate ~7 / Irak ~13. Ganar no paga; el valor está en córners y goleador.",
      avoid: [
        "Atcho tiene muestra de datos chica: tómalo como indicativo",
        "Irak puede replegarse mucho: cuidado con overs de goles",
        "Sede fresca: sin factor calor",
        "Confirmar titularidad de Haaland y Ødegaard",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Noruega",
          driver: "ranking + PIB + experiencia",
          options: [
            { market: "1X2", selection: "Noruega gana", confidence: "alta" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
          ],
        },
        claude: {
          market: "Córners Noruega",
          selection: "Over 5.5",
          note: "Irak concede 5.4 córners/partido; Noruega domina banda (~60% posesión). Los cooling breaks pueden abrir el 2º tiempo, pero Irak parqueado limita el over de goles.",
          options: [
            { market: "1X2", selection: "Noruega gana", confidence: "alta" },
            { market: "Córners Noruega", selection: "Over 5.5", confidence: "alta" },
            { market: "Goleador", selection: "Haaland anota", confidence: "media" },
            { market: "Totales", selection: "Over 2.5", confidence: "media" },
            { market: "Amarillas", selection: "Under", confidence: "media" },
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
      odds: { home: 1.4, draw: 4.75, away: 8.0 },
      preview: "Argentina debuta como campeona vigente con 5 victorias seguidas (2.8 goles a favor, 0.2 en contra), pero SIN Julián Álvarez (lesión) y con Messi (200ª cap, 6º Mundial) saliendo de una molestia muscular. Argelia llega en forma real: 1-0 a Países Bajos y 0-0 con Uruguay en preparación, con Mahrez y un bloque ordenado que corre y aprovecha espacios. Kansas City: noche cálida pero manejable (~24°C), así que el factor calor está atenuado; el valor de Argelia es forma y orden, no clima.",
      oddsNote: "Argentina 1.40 / empate 4.75 / Argelia 8.00. Over 2.5 a 1.90, Under 2.5 a 1.90. El mercado espera victoria controlada y de pocos goles, no goleada.",
      avoid: [
        "Julián Álvarez es baja por lesión: menos pólvora, refuerza el under",
        "Confirmar el fitness de Messi (venía de molestia muscular)",
        "Argelia llega en forma real (ganó a Países Bajos, empató con Uruguay): respétala, no apuestes el -1.5",
        "Marciniak (árbitro de la final 2022) es firme en partidos grandes, pero su promedio exacto de tarjetas está pendiente",
        "KC noche manejable (~24°C): factor calor atenuado",
      ],
      picks: {
        klement: {
          market: "1X2",
          selection: "Argentina",
          driver: "ranking + PIB + campeón vigente",
          options: [
            { market: "1X2", selection: "Argentina gana", confidence: "alta" },
          ],
        },
        claude: {
          market: "Totales/Hándicap",
          selection: "Under 2.5 / Argelia +1.5",
          note: "Sin Julián Álvarez y con Argelia ordenada, lo probable es victoria argentina controlada y de pocos goles, no goleada. El -1.5 es arriesgado en un debut.",
          options: [
            { market: "1X2", selection: "Argentina gana", confidence: "alta" },
            { market: "Totales", selection: "Under 2.5", confidence: "media" },
            { market: "Hándicap", selection: "Argelia +1.5", confidence: "media" },
            { market: "BTTS", selection: "No", confidence: "media" },
            { market: "Hándicap", selection: "Argentina -1.5", confidence: "baja" },
          ],
          comboRecomendado: { legs: ["Argentina gana", "Under 2.5"], nota: "Victoria controlada; máx. 2 patas" },
        },
      },
    },
  ],
};

export const j9: DualJornada = {
  jornada: 9,
  fecha: "2026-06-19",
  tipo: "picks",
  partidos: [
    {
      match: "Estados Unidos vs Australia",
      venue: "Lumen Field (Seattle)",
      kickoff: "2026-06-19T15:00:00-04:00",
      referee: { name: "Felix Zwayer", avgCards: "4.7", avgFouls: "22.7" },
      odds: { home: 1.61, draw: 4.5, away: 5.5 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 52, d: 25, a: 22 }, over25: 47, btts: 49, hcap: "Australia +1.5: 72% | USA -1.5: 28%", xg: 2.55, topScore: "1-0", note: "USA gana pero sin la holgura del mercado; tira a Under" },
      preview: "Ambos ganaron su debut (USA 4-1 Paraguay; Australia 2-0 Turquía). USA con localía continental y posesión; Australia física y peligrosa a balón parado.",
      oddsNote: "USA 1.61 / X 4.50 / Australia 5.50.",
      avoid: ["USA -1.5 no es seguro (modelo 28%)", "Australia gana mucho duelo aéreo → faltas", "Seattle templado: sin factor calor"],
      picks: {
        klement: { market: "1X2", selection: "Estados Unidos", driver: "localía + ranking", options: [{ market: "1X2", selection: "USA gana", confidence: "alta" }] },
        claude: {
          market: "Totales",
          selection: "Under 2.5",
          note: "Modelo 53% Under. Zwayer pita 4.7 amarillas/partido (sobre la media). Jugador: Pulisic es la amenaza de tiros de USA; USA domina córners; Australia mete faltas.",
          options: [{ market: "Hándicap", selection: "Australia +1.5", confidence: "alta" }, { market: "Totales", selection: "Under 2.5", confidence: "media" }, { market: "1X2", selection: "USA gana", confidence: "media" }, { market: "Córners", selection: "USA over", confidence: "media" }, { market: "Tarjetas", selection: "Total amarillas Over 4.5", confidence: "media" }, { market: "Jugador", selection: "Pulisic tiro a puerta", confidence: "media" }],
          comboRecomendado: { legs: ["USA gana", "Under 3.5"], nota: "Máx. 2 patas" },
        },
      },
    },
    {
      match: "Escocia vs Marruecos",
      venue: "Gillette (Foxborough)",
      kickoff: "2026-06-19T18:00:00-04:00",
      referee: { name: "Ilgiz Tantashev", avgCards: "3.6", avgFouls: "21.3" },
      odds: { home: 5.25, draw: 3.7, away: 1.74 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 22, d: 27, a: 51 }, over25: 40, btts: 44, hcap: "Marruecos +1.5: 93% | Escocia -1.5: 7%", xg: 2.3, topScore: "0-1", note: "Marruecos favorito; pocos goles" },
      preview: "Marruecos llega de empatar 1-1 con Brasil (gran imagen); Escocia ganó 1-0 a Haití. Marruecos técnico y con fondo físico; Escocia intensa y directa.",
      oddsNote: "Escocia 5.25 / X 3.70 / Marruecos 1.74.",
      avoid: ["Boston templado: sin ventaja de calor para Marruecos", "Tantashev es permisivo (3.6): NO fuerces over de tarjetas pese a las faltas de Escocia"],
      picks: {
        klement: { market: "1X2", selection: "Marruecos", driver: "ranking + forma", options: [{ market: "1X2", selection: "Marruecos gana", confidence: "alta" }] },
        claude: {
          market: "1X2 + Goles",
          selection: "Marruecos gana + Under 2.5",
          note: "Modelo 51% Marruecos, 60% Under. Árbitro permisivo (3.6) → mercados de tarjetas a la baja. Jugador: Hakimi gana córners/centros por derecha; Escocia acumula faltas pero el árbitro deja jugar.",
          options: [{ market: "Totales", selection: "Under 2.5", confidence: "alta" }, { market: "1X2", selection: "Marruecos gana", confidence: "media" }, { market: "Hándicap", selection: "Escocia +1.5", confidence: "media" }, { market: "Córners", selection: "Marruecos over", confidence: "media" }, { market: "Tarjetas", selection: "Total amarillas Under 4.5", confidence: "media" }],
          comboRecomendado: { legs: ["Marruecos gana", "Under 2.5"], nota: "Máx. 2 patas" },
        },
      },
    },
    {
      match: "Brasil vs Haití",
      venue: "Lincoln Financial (Philadelphia)",
      kickoff: "2026-06-19T20:30:00-04:00",
      referee: { name: "Alejandro Hernández H.", avgCards: "5.2", avgFouls: "25.4" },
      odds: { home: 1.2, draw: 7.0, away: 13.0 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 80, d: 14, a: 6 }, over25: 55, btts: 36, hcap: "Brasil -1.5: 57% | Haití +1.5: 43%", xg: 2.9, topScore: "2-0", note: "Brasil gana seguro, pero -1.5 no es regalo: Haití defiende profundo" },
      preview: "Brasil viene de un flojo 1-1 con Marruecos y querrá reaccionar; Haití perdió 0-1 con Escocia compitiendo. Brasil domina; Haití se cierra atrás.",
      oddsNote: "Brasil 1.20 / X 7.0 / Haití 13.0.",
      avoid: ["Brasil -1.5 solo 57% (Haití aguanta)", "Brasil viene irregular (1-1 con Marruecos)"],
      picks: {
        klement: { market: "1X2", selection: "Brasil", driver: "ranking + plantel", options: [{ market: "1X2", selection: "Brasil gana", confidence: "alta" }] },
        claude: {
          market: "Mercados de Brasil + tarjetas",
          selection: "Brasil gana + amarillas over",
          note: "Modelo 80% Brasil. Hernández es el 3.º árbitro más tarjetero del Mundial (5.2). Con Haití defendiendo profundo y metiendo faltas → tarjetas de Haití y total de amarillas son valor fuerte. Jugador: Vinícius y Raphinha generan muchos tiros vs bloque bajo (líneas de tiros a puerta y córners de Brasil).",
          options: [{ market: "Tarjetas", selection: "Total amarillas Over 4.5", confidence: "alta" }, { market: "1X2", selection: "Brasil gana", confidence: "alta" }, { market: "Córners", selection: "Brasil over", confidence: "alta" }, { market: "Tarjetas", selection: "Tarjeta a Haití", confidence: "alta" }, { market: "Totales", selection: "Over 2.5", confidence: "media" }, { market: "Jugador", selection: "Raphinha tiros a puerta", confidence: "media" }],
          comboRecomendado: { legs: ["Brasil gana", "Total amarillas Over 4.5"], nota: "Árbitro tarjetero + Haití profundo; máx. 2 patas" },
        },
      },
    },
    {
      match: "Turquía vs Paraguay",
      venue: "Levi's (Santa Clara)",
      kickoff: "2026-06-19T23:00:00-04:00",
      referee: { name: "Iván Barton", avgCards: "4.1", avgFouls: "22.4" },
      odds: { home: 2.3, draw: 3.2, away: 3.3 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 41, d: 27, a: 31 }, over25: 43, btts: 49, hcap: "Paraguay +1.5: 81% | Turquía -1.5: 19%", xg: 2.4, topScore: "1-1", note: "Muy parejo; ambos vienen de perder → cauteloso" },
      preview: "Los dos perdieron su debut (Turquía 0-2 Australia; Paraguay 1-4 USA) y se juegan mucho. Turquía con más talento; Paraguay físico y de bloque.",
      oddsNote: "Turquía 2.30 / X 3.20 / Paraguay 3.30.",
      avoid: ["Partido de necesidad → puede ser trabado", "Baja convicción: no lo metas en combos grandes"],
      picks: {
        klement: { market: "1X2", selection: "Turquía", driver: "ranking", options: [{ market: "1X2", selection: "Turquía gana", confidence: "media" }] },
        claude: {
          market: "Totales",
          selection: "Under 2.5",
          note: "Modelo 57% Under y partido parejo. Barton 4.1 amarillas (medio). Jugador: choque físico → faltas y tarjetas de Paraguay; pocos espacios para tiros claros.",
          options: [{ market: "Totales", selection: "Under 2.5", confidence: "media" }, { market: "1X2", selection: "Turquía gana", confidence: "media" }, { market: "Tarjetas", selection: "Tarjeta a Paraguay", confidence: "media" }, { market: "Hándicap", selection: "Paraguay +1.5", confidence: "media" }],
          comboRecomendado: { legs: ["Under 2.5"], nota: "Baja convicción: solo o con 1 pata más" },
        },
      },
    },
  ],
};

export const j10: DualJornada = {
  jornada: 10,
  fecha: "2026-06-20",
  tipo: "picks",
  partidos: [
    {
      match: "Países Bajos vs Suecia",
      venue: "Levi's (Santa Clara)",
      kickoff: "2026-06-20T13:00:00-04:00",
      referee: { name: "Michael Oliver", avgCards: "3.7", avgFouls: "22.8" },
      odds: { home: 1.65, draw: 4.1, away: 4.8 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 54, d: 22, a: 24 }, over25: 60, btts: 59, hcap: "Suecia +1.5: 69% | P. Bajos -1.5: 31%", xg: 3.1, topScore: "1-1", note: "EL partido OVER del finde: 60% Over, 59% BTTS" },
      preview: "Países Bajos empató 2-2 con Japón (defensa floja); Suecia goleó 5-1 a Túnez. Dos equipos ofensivos y permeables atrás → partido abierto.",
      oddsNote: "Países Bajos 1.65 / X 4.10 / Suecia 4.80.",
      avoid: ["Es el partido más abierto: no fuerces el Under", "P. Bajos -1.5 solo 31%", "Oliver permisivo (3.7): nada de over de tarjetas"],
      picks: {
        klement: { market: "1X2", selection: "Países Bajos", driver: "ranking + plantel", options: [{ market: "1X2", selection: "Países Bajos gana", confidence: "media" }] },
        claude: {
          market: "Goles",
          selection: "Over 2.5 + BTTS Sí",
          note: "Modelo 60% Over y 59% BTTS, el más sólido del finde. Jugador: Gakpo/Depay vs Isak/Gyökeres → tiros y goles de ambos lados; muchos córners.",
          options: [{ market: "Totales", selection: "Over 2.5", confidence: "alta" }, { market: "BTTS", selection: "Sí", confidence: "alta" }, { market: "1X2", selection: "Países Bajos gana", confidence: "media" }, { market: "Jugador", selection: "Gyökeres tiros a puerta", confidence: "media" }],
          comboRecomendado: { legs: ["Over 2.5", "BTTS Sí"], nota: "El combo más respaldado por el modelo; 2 patas" },
        },
      },
    },
    {
      match: "Alemania vs Costa de Marfil",
      venue: "NRG (Houston, techo)",
      kickoff: "2026-06-20T16:00:00-04:00",
      referee: { name: "Juan Gabriel Benítez", avgCards: "3.8", avgFouls: "23.5" },
      odds: { home: 1.5, draw: 4.2, away: 6.5 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 62, d: 22, a: 16 }, over25: 52, btts: 49, hcap: "Costa de Marfil +1.5: 63% | Alemania -1.5: 37%", xg: 2.75, topScore: "1-0", note: "Alemania gana pero CdM compite; -1.5 no cubre" },
      preview: "Ambos ganaron su debut (Alemania 7-1 Curazao; Costa de Marfil 1-0 Ecuador). Alemania posesión y volumen; CdM física y de contra. NRG con techo: sin factor calor.",
      oddsNote: "Alemania 1.50 / X 4.20 / Costa de Marfil 6.50.",
      avoid: ["Alemania -1.5 solo 37%: CdM aguanta", "NRG techo/AC: sin ventaja de calor para CdM", "Benítez medio (3.8) en tarjetas"],
      picks: {
        klement: { market: "1X2", selection: "Alemania", driver: "ranking + plantel", options: [{ market: "1X2", selection: "Alemania gana", confidence: "alta" }] },
        claude: {
          market: "1X2 / Hándicap",
          selection: "Alemania gana / CdM +1.5",
          note: "Modelo 62% Alemania pero -1.5 flojo. Jugador: Wirtz/Musiala generan tiros; Alemania domina posesión y córners; CdM contragolpea.",
          options: [{ market: "1X2", selection: "Alemania gana", confidence: "media" }, { market: "Hándicap", selection: "Costa de Marfil +1.5", confidence: "media" }, { market: "Córners", selection: "Alemania over", confidence: "media" }, { market: "Totales", selection: "Over 2.5", confidence: "media" }],
          comboRecomendado: { legs: ["Alemania gana", "Over 1.5"], nota: "Máx. 2 patas" },
        },
      },
    },
    {
      match: "Ecuador vs Curazao",
      venue: "AT&T (Arlington)",
      kickoff: "2026-06-20T19:00:00-04:00",
      referee: { name: "Ning Ma", avgCards: "4.2", avgFouls: "25.7" },
      odds: { home: 1.4, draw: 4.5, away: 8.0 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 72, d: 19, a: 9 }, over25: 47, btts: 37, hcap: "Ecuador -1.5: 46% | Curazao +1.5: 54%", xg: 2.55, topScore: "1-0", note: "Ecuador gana; Curazao débil pero Ecuador no es prolífico → Under aceptable" },
      preview: "Ecuador perdió 0-1 con Costa de Marfil compitiendo; Curazao recibió un 1-7 de Alemania. Ecuador sólido y ordenado debería imponerse al debutante más débil.",
      oddsNote: "Ecuador 1.40 / X 4.50 / Curazao 8.0.",
      avoid: ["Ecuador no es goleador: el -1.5 es 46%", "Curazao se cierra → faltas (Ning Ma 25.7 faltas/partido)"],
      picks: {
        klement: { market: "1X2", selection: "Ecuador", driver: "ranking", options: [{ market: "1X2", selection: "Ecuador gana", confidence: "alta" }] },
        claude: {
          market: "1X2 + Goles",
          selection: "Ecuador gana + Under 3.5",
          note: "Modelo 72% Ecuador. Ning Ma pita muchas faltas (25.7) → ojo mercado de faltas. Jugador: Ecuador acumula córners/tiros vs bloque de Curazao.",
          options: [{ market: "1X2", selection: "Ecuador gana", confidence: "alta" }, { market: "Totales", selection: "Under 3.5", confidence: "media" }, { market: "Córners", selection: "Ecuador over", confidence: "media" }, { market: "Hándicap", selection: "Ecuador -1.5", confidence: "baja" }],
          comboRecomendado: { legs: ["Ecuador gana", "Ecuador córners over"], nota: "Máx. 2 patas" },
        },
      },
    },
    {
      match: "Túnez vs Japón",
      venue: "Grupo F (00:00 del 21, madrugada)",
      kickoff: "2026-06-21T00:00:00-04:00",
      referee: { name: "Istvan Kovacs", avgCards: "5.0", avgFouls: "25.3" },
      odds: { home: 3.4, draw: 3.1, away: 2.05 },
      simulaciones: { model: "Monte Carlo Poisson · 200k sims", win: { h: 23, d: 26, a: 51 }, over25: 43, btts: 46, hcap: "Japón +1.5: 93% | Túnez -1.5: 7%", xg: 2.4, topScore: "0-1", note: "Japón favorito; pocos goles" },
      preview: "Se juega a las 00:00 del 21 (madrugada). Túnez recibió un duro 1-5 de Suecia; Japón empató 2-2 con Países Bajos de igual a igual. Japón maneja mejor el balón.",
      oddsNote: "Túnez 3.40 / X 3.10 / Japón 2.05.",
      avoid: ["Túnez viene golpeado (1-5): ojo reacción", "Japón controla pero no golea fácil"],
      picks: {
        klement: { market: "1X2", selection: "Japón", driver: "ranking + forma", options: [{ market: "1X2", selection: "Japón gana", confidence: "media" }] },
        claude: {
          market: "1X2 + Tarjetas",
          selection: "Japón gana + amarillas over",
          note: "Modelo 51% Japón, 57% Under en goles. PERO Kovacs es muy tarjetero (5.0) y Túnez llega frustrado → tarjetas de Túnez y total de amarillas suben a alta. Jugador: Japón completa muchos pases (posesión); Túnez mete faltas.",
          options: [{ market: "Tarjetas", selection: "Tarjeta a Túnez", confidence: "alta" }, { market: "Tarjetas", selection: "Total amarillas Over 4.5", confidence: "alta" }, { market: "1X2", selection: "Japón gana", confidence: "media" }, { market: "Totales", selection: "Under 2.5", confidence: "media" }, { market: "Hándicap", selection: "Japón +0.5 (DNB)", confidence: "media" }],
          comboRecomendado: { legs: ["Japón empate o gana (DNB)", "Total amarillas Over 4.5"], nota: "Árbitro tarjetero; máx. 2 patas" },
        },
      },
    },
  ],
};

// Lista única de jornadas. El orden cronológico real lo resuelve TabPicks por
// `fecha` (j9/j10 son 19–20 jun, posteriores a j15/j16 del 15–16 jun).
export const DUAL_JORNADAS: DualJornada[] = [j1, j2, j3, j4, j9, j10, j15, j16];
