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
  {
    id: "jornada-3",
    jornada: 3,
    date: "2026-06-14",
    label: "Jornada 3 · Domingo 14 de Junio",
    matches: [
      {
        home: "Alemania",
        away: "Curazao",
        home_flag: "🇩🇪",
        away_flag: "🇨🇼",
        venue: "NRG Stadium",
        city: "Houston",
        group: "Grupo E",
        time_bolivia: "13:00",
        context:
          "Alemania favorita absoluta: brecha de ranking de más de 70 posiciones, Curazao en su primer Mundial (la nación más pequeña en debutar), supercomputer da 89.6% de probabilidad de victoria alemana. NRG Stadium con techo, clima controlado.",
        picks: [
          { market: "Resultado", value: "Alemania gana", confidence: "hot", note: "Brecha de ranking de más de 70 posiciones, Curazao en su primer Mundial, supercomputer da 89.6% de probabilidad" },
          { market: "Hándicap", value: "Alemania -3.5", confidence: "moderate", note: "Línea principal del partido, modelo proyecta 3-0 o 4-0 según distintas fuentes" },
          { market: "Goles totales", value: "Over 4.5", confidence: "moderate", note: "Alemania anotó 4+ goles en 4 de sus últimos 8 partidos" },
          { market: "Goleador", value: "Wirtz o Musiala anota", confidence: "low", note: "Ambos anotaron en la goleada 4-0 a Finlandia, candidatos a primer gol" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Alemania -3.5", "Over 4.5 goles totales"], odds: "~2.50x", risk: "moderate", note: "Apunta al guion de blowout en el que coinciden prácticamente todos los modelos" },
        ],
        avoid: [
          "Alemania moneyline simple: cuota de -3300, sin valor real",
          "BTTS Sí: Curazao es la nación más pequeña en debutar en un Mundial, sin pedigrí ofensivo",
        ],
      },
      {
        home: "Países Bajos",
        away: "Japón",
        home_flag: "🇳🇱",
        away_flag: "🇯🇵",
        venue: "AT&T Stadium",
        city: "Arlington (Dallas)",
        group: "Grupo F",
        time_bolivia: "16:00",
        context:
          "Partido de máximo valor del día según el consenso de modelos. Holanda favorita ligera pero Japón llega con estructura defensiva sólida (eliminó a España y Alemania en 2022). Mitoma fuera por lesión de isquiotibiales. Marcador más probable 1-1 según Dimers. AT&T Stadium con aire acondicionado.",
        picks: [
          { market: "Goles", value: "Under 2.5", confidence: "hot", note: "Consenso multi-modelo, marcador más probable 1-1 según Dimers, línea de mercado en -118" },
          { market: "Hándicap", value: "Japón +1.5", confidence: "moderate", note: "Mitoma fuera por lesión de isquiotibiales, pero estructura defensiva japonesa sólida, ya eliminó a España y Alemania en 2022" },
          { market: "Doble oportunidad", value: "Holanda o empate (1X)", confidence: "low", note: "Cubre el resultado más probable sin descartar la sorpresa japonesa" },
          { market: "Resultado exacto", value: "Empate 1-1", confidence: "low", note: "Cuota de +250 con valor real si el marcador más probable se cumple" },
        ],
        combos: [
          { title: "Combo recomendado (valor)", legs: ["Japón +1.5", "Under 2.5 goles"], odds: "~2.20x", risk: "moderate", note: "El partido de mayor valor del día según el consenso de modelos" },
        ],
        avoid: [
          "Holanda moneyline simple: cuota +105 no compensa el riesgo real de Japón",
          "Over 2.5: contradice el consenso de prácticamente todos los modelos",
        ],
      },
      {
        home: "Costa de Marfil",
        away: "Ecuador",
        home_flag: "🇨🇮",
        away_flag: "🇪🇨",
        venue: "Lincoln Financial Field",
        city: "Filadelfia",
        group: "Grupo E",
        time_bolivia: "19:00",
        context:
          "Duelo de defensas fuertes. Ecuador con la mejor defensa de Sudamérica en clasificación (solo 5 goles recibidos en 18 partidos, no le permitió anotar ni a Brasil ni a Argentina). El mercado fija el Under 2.5 en -250, señal estadística muy fuerte de partido cerrado.",
        picks: [
          { market: "Goles", value: "Under 2.5", confidence: "hot", note: "Mercado fija el Under en -250, señal estadística muy fuerte" },
          { market: "Resultado", value: "Ecuador gana", confidence: "moderate", note: "Mejor defensa de Sudamérica en clasificación, solo 5 goles recibidos en 18 partidos, ML en +125" },
          { market: "Clean Sheet Ecuador", value: "Sí", confidence: "low", note: "Ecuador no le permitió anotar ni a Brasil ni a Argentina en clasificación" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Ecuador gana", "Under 2.5 goles"], odds: "~2.80x", risk: "moderate", note: "Respaldo sólido del perfil defensivo ecuatoriano con valor en el ML a +125" },
        ],
        avoid: [
          "Over 2.5: a +135 está caro y sin respaldo de ningún modelo",
          "BTTS Sí: ambas defensas son el punto fuerte de sus equipos",
        ],
      },
      {
        home: "Suecia",
        away: "Túnez",
        home_flag: "🇸🇪",
        away_flag: "🇹🇳",
        venue: "Estadio BBVA",
        city: "Monterrey",
        group: "Grupo F",
        time_bolivia: "22:00",
        context:
          "Partido de defensas frágiles. Suecia con ventaja ofensiva clara (Gyökeres e Isak) pero sin clean sheet en 11 partidos. Probabilidad de BTTS del 54.76% según Wincomparator. Monterrey es una de las sedes con mayor riesgo de calor.",
        picks: [
          { market: "Ambos marcan", value: "BTTS Sí", confidence: "hot", note: "Probabilidad de 54.76% según Wincomparator, ambas defensas son frágiles, Suecia sin clean sheet en 11 partidos" },
          { market: "Resultado", value: "Suecia gana", confidence: "moderate", note: "Gyökeres e Isak dan ventaja ofensiva clara, ML en -106/-110" },
          { market: "Goleador", value: "Viktor Gyökeres anota", confidence: "low", note: "Preferido sobre Isak tras mejor desempeño en el último amistoso ante Grecia" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Suecia gana", "BTTS Sí"], odds: "~2.60x", risk: "moderate", note: "Combina la ventaja ofensiva sueca con la fragilidad defensiva de ambos lados" },
        ],
        avoid: [
          "Túnez gana: sin pedigrí ofensivo suficiente",
          "Under 2.5: contradice el patrón defensivo frágil de ambos equipos, Túnez no concedió goles en toda su clasificatoria pero Suecia sí concede mucho",
        ],
      },
    ],
    megaCombo: {
      title: "Mega Combo Jornada 3 (3 patas seleccionadas)",
      legs: [
        "Alemania -3.5 (vs Curazao)",
        "Ecuador gana + Under 2.5 (vs Costa de Marfil)",
        "Suecia gana + BTTS Sí (vs Túnez)",
      ],
      odds: "~9.50x",
      risk: "alta",
      note: "Países Bajos vs Japón se deja fuera por ser el de mayor incertidumbre real del día, se juega aparte como pick de valor independiente",
    },
  },
  {
    id: "jornada-4",
    jornada: 4,
    date: "2026-06-15",
    label: "Jornada 4 · Lunes 15 de Junio",
    matches: [
      {
        home: "España",
        away: "Cabo Verde",
        home_flag: "🇪🇸",
        away_flag: "🇨🇻",
        venue: "Mercedes-Benz Stadium",
        city: "Atlanta",
        group: "Grupo H",
        time_bolivia: "12:00",
        context:
          "España favorita abrumadora (-1000 ML), supercomputer da 86.2% de probabilidad de victoria, marcador más probable 2-0. Cabo Verde en debut histórico, viene de 0-0 vs Egipto y derrota 4-2 vs Chile. Atlanta con techo, clima neutralizado.",
        picks: [
          { market: "Resultado", value: "España gana", confidence: "hot", note: "Favorita abrumadora, supercomputer da 86.2% de probabilidad, marcador más probable 2-0" },
          { market: "Hándicap", value: "España -2.5", confidence: "moderate", note: "Mejor relación riesgo-beneficio que el ML a -1000, España promedia 3.5 goles por partido en clasificación" },
          { market: "Goleador", value: "Mikel Oyarzabal anota", confidence: "moderate", note: "Máximo referente ofensivo, anotó en el último partido de clasificación ante Turquía" },
          { market: "Goles totales", value: "Over 3.5", confidence: "moderate", note: "Cabo Verde concedió 4 goles a Chile en su último amistoso, defensa vulnerable ante calidad superior" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["España -2.5", "Over 3.5 goles totales"], odds: "~2.30x", risk: "moderate", note: "Apunta al guion de blowout que el supercomputer y el historial de Cabo Verde sugieren" },
        ],
        avoid: [
          "España ML simple: cuota de -1000, sin valor real",
          "BTTS Sí como pick principal: Cabo Verde mostró fragilidad pero no es garantía contra una defensa española sólida",
        ],
      },
      {
        home: "Bélgica",
        away: "Egipto",
        home_flag: "🇧🇪",
        away_flag: "🇪🇬",
        venue: "Lumen Field",
        city: "Seattle",
        group: "Grupo G",
        time_bolivia: "15:00",
        context:
          "Bélgica favorita (4/6) pero con dudas reales: De Bruyne con timeline de lesión incierto, Lukaku con problemas de fitness recurrentes, defensa que concedió 5 goles en 2 partidos vs Gales en clasificación. Egipto con récord defensivo perfecto en clasificatoria africana (0 goles recibidos en 6 partidos), liderado por Mohamed Salah. Seattle clima fresco y controlado, sin factor climático relevante.",
        picks: [
          { market: "Resultado", value: "Bélgica gana", confidence: "hot", note: "Favorita con 4/6, pero el margen real es menor de lo que sugiere la cuota dada la fragilidad defensiva reciente" },
          { market: "Goles", value: "Over 2.5", confidence: "moderate", note: "29 goles en 8 partidos de clasificación belga (3.6 por partido), recomendación de bet builder Bélgica gana + Over 2.5" },
          { market: "Ambos marcan", value: "BTTS Sí", confidence: "moderate", note: "Egipto con Salah tiene argumentos ofensivos pese a su gran récord defensivo, y la defensa belga concedió 5 goles a Gales recientemente" },
          { market: "Goleador", value: "Mohamed Salah anota", confidence: "low", note: "Principal amenaza individual de Egipto, valor especulativo ante una defensa belga poco confiable" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Bélgica gana", "Over 2.5 goles"], odds: "~2.45x", risk: "moderate", note: "Bet builder más respaldado por las casas: favorito que gana en partido abierto" },
          { title: "Combo de valor (contra-corriente)", legs: ["BTTS Sí", "Over 2.5 goles"], odds: "~2.90x", risk: "moderate-alta", note: "Apuesta a que la fragilidad defensiva belga reciente se repite y Salah aparece" },
        ],
        avoid: [
          "Clean Sheet Bélgica: el historial reciente de su defensa no lo respalda",
          "Egipto gana: récord defensivo notable pero ofensiva limitada fuera de Salah para dar la sorpresa",
        ],
      },
      {
        home: "Arabia Saudita",
        away: "Uruguay",
        home_flag: "🇸🇦",
        away_flag: "🇺🇾",
        venue: "Hard Rock Stadium",
        city: "Miami Gardens",
        group: "Grupo H",
        time_bolivia: "18:00",
        context:
          "Uruguay favorita clara (-200 ML, 4/9), con plantilla de elite sudamericana y europea bajo Bielsa con presión alta. Arabia Saudita con base doméstica de la Saudi Pro League, busca plantarse y golpear al contragolpe. El calor de Miami en junio es el factor igualador mencionado por múltiples analistas — ambos equipos deben gestionar fatiga por calor. Salem Al Dawsari (8 goles + 8 asistencias en 25 partidos de liga) es la pieza ofensiva saudí a vigilar.",
        picks: [
          { market: "Resultado", value: "Uruguay gana", confidence: "hot", note: "Favorita clara a -200, mayor profundidad de plantilla y presión alta de Bielsa" },
          { market: "Goles", value: "Under 2.5", confidence: "moderate", note: "Consenso de analistas en partido de pocos goles, Arabia Saudita planteándose replegada" },
          { market: "Hándicap", value: "Uruguay -1", confidence: "moderate", note: "Línea de valor que refleja el dominio esperado sin la sobre-exposición del -200 ML directo" },
          { market: "Goleador Arabia Saudita", value: "Salem Al Dawsari anota", confidence: "low", note: "Principal arma ofensiva saudí, opción de valor especulativo al contragolpe" },
          { market: "Factor clima", value: "Ritmo de partido bajo en el segundo tiempo", confidence: "low", note: "El calor de Miami en junio es el factor igualador citado por múltiples analistas, ambos equipos pueden bajar intensidad post-cooling break" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Uruguay gana", "Under 2.5 goles"], odds: "~2.35x", risk: "moderate", note: "Combina el favoritismo claro con el patrón de partido controlado por el calor" },
        ],
        avoid: [
          "Uruguay -2.5 o más: el calor de Miami reduce la probabilidad de un blowout amplio",
          "Over 2.5: contradice el consenso casi unánime de los analistas",
        ],
      },
      {
        home: "Irán",
        away: "Nueva Zelanda",
        home_flag: "🇮🇷",
        away_flag: "🇳🇿",
        venue: "SoFi Stadium",
        city: "Inglewood",
        group: "Grupo G",
        time_bolivia: "21:00",
        context:
          "El partido más accesible de Irán en todo el grupo según analistas. Irán con estructura defensiva disciplinada (en Qatar 2022, 2 de sus 3 partidos de grupo terminaron bajo 2.5 goles). Nueva Zelanda con forma reciente floja (1 victoria en sus últimos 5), su ruta de clasificación OFC es la más suave de cualquier selección del Mundial. Mehdi Taremi es el goleador de referencia para Irán. Inglewood clima templado, sin factor relevante.",
        picks: [
          { market: "Resultado", value: "Irán gana", confidence: "hot", note: "Partido más accesible de Irán según consenso, esencial para sus aspiraciones de avanzar, NZ con forma floja (1 de 5)" },
          { market: "Goles", value: "Under 2.5", confidence: "moderate", note: "Estructura defensiva iraní disciplinada, en Qatar 2022 2 de 3 partidos de grupo terminaron bajo esa línea" },
          { market: "Goleador", value: "Mehdi Taremi anota", confidence: "moderate", note: "Máximo goleador histórico de la selección iraní, referencia ofensiva clara" },
          { market: "Clean Sheet Irán", value: "Sí", confidence: "low", note: "Estructura compacta de Ghalenoei contra un rival con ofensiva limitada" },
        ],
        combos: [
          { title: "Combo recomendado", legs: ["Irán gana", "Under 2.5 goles"], odds: "~2.60x", risk: "moderate", note: "El partido clave para las aspiraciones iraníes de pelear el segundo puesto del grupo, con perfil de partido cerrado" },
        ],
        avoid: [
          "Nueva Zelanda en cualquier mercado de resultado: forma reciente muy floja (1 victoria en 5)",
          "Over 2.5: contradice el perfil defensivo iraní en mundiales recientes",
        ],
      },
    ],
    megaCombo: {
      title: "Mega Combo Jornada 4 (3 patas seleccionadas)",
      legs: [
        "España -2.5 (vs Cabo Verde)",
        "Uruguay gana + Under 2.5 (vs Arabia Saudita)",
        "Irán gana + Under 2.5 (vs Nueva Zelanda)",
      ],
      odds: "~11.50x",
      risk: "alta",
      note: "El partido Bélgica-Egipto se deja fuera del mega combo por ser el de mayor incertidumbre real del día (defensa belga frágil + Salah como factor X), se juega aparte como pick de valor independiente con el combo BTTS Sí + Over 2.5",
    },
  },
];
