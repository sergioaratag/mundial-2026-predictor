// UFC Freedom 250 — White House Card (South Lawn, Washington D.C.)
// Datos estáticos: análisis, picks por pelea y combos. Horario en hora Bolivia (UTC-4).
import type { Confidence, Combo } from "@/lib/types";

export interface FightPick {
  market: string; // "Resultado" | "Método" | "Total rounds" | "Valor"
  value: string; // "Topuria por KO/TKO"
  confidence: Confidence; // hot | moderate | low
  note: string;
}

export interface FightCard {
  id: string;
  slot?: string; // "Pelea Estelar" | "Co-Estelar"
  weight_class: string; // "Peso Ligero"
  title: string | null; // "Título Unificado" o null
  fighter_a: string;
  fighter_b: string;
  flag_a: string;
  flag_b: string;
  odds_a: string; // "-500"
  odds_b: string; // "+380"
  analysis: string; // párrafo de análisis profundo
  picks: FightPick[];
  avoid: string[];
  valor_pick?: string; // pick de valor especial si existe
}

export interface FightEvent {
  evento: string;
  badge: string; // texto del badge naranja
  fecha: string; // "14 de junio, 2026"
  sede: string;
  ciudad: string;
  time_bolivia: string; // "21:00"
  fights: FightCard[];
  combos: Combo[];
}

export const WHITEHOUSE: FightEvent = {
  evento: "UFC Freedom 250 · White House",
  badge: "UFC FREEDOM 250",
  fecha: "14 de junio, 2026",
  sede: "South Lawn de la Casa Blanca",
  ciudad: "Washington D.C.",
  time_bolivia: "21:00",
  fights: [
    {
      id: "topuria-gaethje",
      slot: "Pelea Estelar",
      weight_class: "Peso Ligero",
      title: "Título Unificado",
      fighter_a: "Ilia Topuria",
      fighter_b: "Justin Gaethje",
      flag_a: "🇩🇪",
      flag_b: "🇺🇸",
      odds_a: "-500",
      odds_b: "+380",
      analysis:
        "Topuria (17-0) viene de 3 KOs consecutivos sobre Volkanovski, Holloway y Oliveira — el mejor trío de victorias en la historia del deporte. Sus últimas 3 finalizaciones vinieron sobre leyendas que siguieron ganando después de perder con él, lo que valida que las derrotó en su prime. Gaethje ganó el interino sobre Pimblett en una guerra caótica de 25 minutos que lo dejó con daño acumulado. El dato más revelador: Gaethje tiene CERO intentos de sumisión en toda su carrera UFC, mientras Topuria convierte el 61.1% de sus derribos y tiene 6 submission attempts. Si Topuria decide llevar la pelea al suelo, Gaethje no tiene respuesta. De pie, Topuria fue 75% preciso contra Oliveira y aterrizó 78 golpes sobre Holloway antes de finalizarlo. Gaethje absorbe 7.05 golpes significativos por minuto — el peor ratio posible frente al striker más preciso del deporte.",
      picks: [
        {
          market: "Resultado",
          value: "Topuria gana",
          confidence: "hot",
          note: "17-0, 9 años más joven, superior en striking, grappling y defensa. La cuota de -500 refleja una dominancia real.",
        },
        {
          market: "Método",
          value: "Topuria por KO/TKO",
          confidence: "hot",
          note: "Cuota mejor que el ML simple. 3 KOs consecutivos sobre leyendas, Gaethje es la víctima perfecta por su estilo de avanzar recibiendo golpes sin defensa de grappling.",
        },
        {
          market: "Total rounds",
          value: "Under 2.5 rounds",
          confidence: "moderate",
          note: "Topuria termina las peleas temprano. Gaethje se presenta a intercambiar sin plan B si lo llevan al suelo.",
        },
      ],
      avoid: [
        "Gaethje ML a +380 — la cuota es atractiva pero el estilo de Gaethje (avanza, recibe, sin grappling) es el peor posible contra Topuria",
      ],
    },
    {
      id: "pereira-gane",
      slot: "Co-Estelar",
      weight_class: "Peso Pesado",
      title: "Título Interino",
      fighter_a: "Alex Pereira",
      fighter_b: "Ciryl Gane",
      flag_a: "🇧🇷",
      flag_b: "🇫🇷",
      odds_a: "-102",
      odds_b: "-112",
      analysis:
        "Pereira busca ser el primer peleador en la historia de UFC en tener títulos en tres categorías distintas. En la pesaje llegó a 251 libras (Gane a 248) para su debut en peso pesado. El dato clave: Gane es 10-0 en UFC cuando NO lo derriban, con 80% de tasa de defensa de takedowns — Pereira no puede depender del grappling. Gane tiene 5 pulgadas de ventaja en reach (81 vs 79) y es el peso pesado natural. Sin embargo, Gane ha fallado repetidamente en los momentos grandes — vs Ngannou (decisión), vs Jones (sometido R1), y su último combate terminó en no contest por pokes de ojo. Pereira tiene 11 KOs en 13 victorias y el mejor striking de la pelea. La pregunta es si su poder de 205 libras se traduce al peso pesado. El mercado prácticamente moneda al aire (-102/-112) refleja la incertidumbre real.",
      picks: [
        {
          market: "Total rounds",
          value: "Over 2.5 rounds",
          confidence: "hot",
          note: "Consenso del mercado a -175. Gane usará movilidad y reach para sobrevivir el peligro temprano. Ambos fighters se calibrarán en los primeros rounds antes de abrir el juego.",
        },
        {
          market: "Resultado",
          value: "Gane gana",
          confidence: "moderate",
          note: "Peso pesado natural, reach superior, 10-0 cuando no lo derriban. Si sobrevive el peligro temprano de Pereira, su cardio y técnica toman la pelea.",
        },
        {
          market: "Resultado",
          value: "Pereira gana",
          confidence: "moderate",
          note: "Mejor striker de la pelea, momentum histórico, entrenó wrestling con Glover Teixeira 5 años.",
        },
      ],
      valor_pick:
        "Gane por decisión a +275 — si la pelea va al round 3+, el peso pesado natural con mejor cardio debería controlar la distancia y ganar en puntos.",
      avoid: [
        "Apostar fuerte a cualquiera de los dos en ML sin cobertura — es el combate más parejo de la noche con razón",
      ],
    },
    {
      id: "omalley-zahabi",
      weight_class: "Peso Gallo",
      title: null,
      fighter_a: "Sean O'Malley",
      fighter_b: "Aiemann Zahabi",
      flag_a: "🇺🇸",
      flag_b: "🇨🇦",
      odds_a: "-455",
      odds_b: "+350",
      analysis:
        "O'Malley es el striker de largo alcance más preciso de la división. Zahabi no representa amenaza de takedown real (su apellido es más famoso que su juego — su hermano fue el entrenador de Georges St-Pierre) y es demasiado dispuesto a recibir daño. Sin valor matemático en el ML de O'Malley a -455. El pick correcto es apostar por el método de victoria.",
      picks: [
        {
          market: "Resultado",
          value: "O'Malley gana",
          confidence: "hot",
          note: "Dominancia técnica clara, pero la cuota a -455 no tiene valor en un combo.",
        },
        {
          market: "Método",
          value: "O'Malley por KO/TKO",
          confidence: "moderate",
          note: "Paga mejor que el ML simple y O'Malley es un finisher cuando tiene ventaja de alcance y precisión tan marcada.",
        },
      ],
      avoid: [
        "O'Malley ML a -455 en un combo — sin valor matemático, destruye la cuota combinada sin agregar probabilidad",
      ],
    },
    {
      id: "hokit-lewis",
      weight_class: "Peso Pesado",
      title: null,
      fighter_a: "Josh Hokit",
      fighter_b: "Derrick Lewis",
      flag_a: "🇺🇸",
      flag_b: "🇺🇸",
      odds_a: "-440",
      odds_b: "+340",
      analysis:
        "Hokit es un prospecto de 29 años (5-1) construido en ritmo y trabajo posicional. Lewis a 39 años sigue siendo uno de los KOs más peligrosos del deporte con un solo golpe. Hokit a -440 es un favorito no probado contra el finisher más letal en la categoría más peligrosa del deporte. El mercado está sobrevalorando a Hokit. La apuesta de mayor valor asimétrico de toda la noche: Over 1.5 rounds a +160, porque ambos tienen el mentón y la voluntad para absorber castigo y seguir — el modelo de SportsLine lo proyecta específicamente por eso.",
      picks: [
        {
          market: "Total rounds",
          value: "Over 1.5 rounds",
          confidence: "hot",
          note: "Mejor relacion riesgo/retorno de toda la cartelera a +160. Ambos tienen mentón probado y Hokit necesita más de un round para establecer su juego.",
        },
        {
          market: "Método",
          value: "Lewis por KO/TKO",
          confidence: "low",
          note: "Valor especulativo a +250 o más — un Lewis conectando limpio termina cualquier pelea en cualquier round.",
        },
      ],
      avoid: [
        "Hokit ML simple a -440 — sin valor, favorito no probado contra un finisher legendario",
      ],
    },
    {
      id: "ruffy-chandler",
      weight_class: "Peso Ligero",
      title: null,
      fighter_a: "Mauricio Ruffy",
      fighter_b: "Michael Chandler",
      flag_a: "🇧🇷",
      flag_b: "🇺🇸",
      odds_a: "-600",
      odds_b: "+440",
      analysis:
        "Ruffy es uno de los prospectos más peligrosos del peso ligero, un striker explosivo. Su mayor debilidad es la defensa de takedowns, pero Chandler no ha dependido del wrestling ofensivo en años recientes — lo que hace este un gran matchup estilístico para Ruffy. Chandler llega con muchos años de daño acumulado encima. Sin valor en Ruffy a -600 en un combo. Si vas a apostar esta pelea, hazlo por el método de victoria.",
      picks: [
        {
          market: "Resultado",
          value: "Ruffy gana",
          confidence: "hot",
          note: "Ventaja estilística clara, prospecto en su prime contra veterano con daño acumulado.",
        },
        {
          market: "Método",
          value: "Ruffy por finalización",
          confidence: "moderate",
          note: "Paga mejor que el ML y Ruffy tiene el power para terminar la pelea.",
        },
      ],
      avoid: [
        "Ruffy ML a -600 en un combo — destruye el retorno sin agregar valor probabilístico significativo",
      ],
    },
    {
      id: "nickal-daukaus",
      weight_class: "Peso Mediano",
      title: null,
      fighter_a: "Bo Nickal",
      fighter_b: "Kyle Daukaus",
      flag_a: "🇺🇸",
      flag_b: "🇺🇸",
      odds_a: "-310",
      odds_b: "+250",
      analysis:
        "El evento es al aire libre en junio en Washington D.C. con calor y humedad potencial — factor que impacta directamente a Nickal, cuyo juego COMPLETO gira alrededor del wrestling pesado. Si los peleadores están sudorosos y resbaladizos, las entradas de lucha se vuelven exponencialmente más difíciles. Daukaus es un luchador capaz por sí mismo y el striker más pulido de pie. Nickal tiene el upside para dominar si el wrestling funciona, pero a -310 no hay valor. Daukaus a +250 es el pick de valor especulativo más interesante de la noche considerando el factor climático.",
      picks: [
        {
          market: "Resultado",
          value: "Nickal gana",
          confidence: "hot",
          note: "Favorito claro, pero sin valor matemático a -310.",
        },
        {
          market: "Valor especulativo",
          value: "Daukaus +250 (valor especulativo)",
          confidence: "low",
          note: "El calor exterior puede neutralizar el wrestling de Nickal. Daukaus es el mejor striker de pie y un luchador competente. La cuota de +250 tiene valor real dado el factor climático del evento al aire libre.",
        },
      ],
      avoid: ["Nickal ML a -310 en un combo — alto precio sin valor"],
    },
    {
      id: "lopes-garcia",
      weight_class: "Peso Pluma",
      title: null,
      fighter_a: "Diego Lopes",
      fighter_b: "Steve Garcia",
      flag_a: "🇲🇽",
      flag_b: "🇺🇸",
      odds_a: "-155",
      odds_b: "+120",
      analysis:
        "Potencialmente la mejor pelea de la noche. Lopes es un peleador completo outstanding, pero su mayor debilidad es la defensa de striking — exactamente el punto fuerte de Garcia. Lopes tiene ventaja en grappling, pero no es un luchador dominante que pueda dictar dónde va la pelea, así que se quedará de pie más de lo esperado. Garcia tiene el cardio para empujar los 3 rounds completos y el striking para crear problemas continuos. Una cuota positiva de +120 en un peleador con argumentos reales para ganar es exactamente el tipo de valor que busca el analista profesional.",
      picks: [
        {
          market: "Valor",
          value: "Garcia +120 (valor)",
          confidence: "moderate",
          note: "Cuota positiva con argumentos reales: mejor striker de pie, cardio superior para 3 rounds, Lopes con debilidad defensiva conocida exactamente donde Garcia es fuerte.",
        },
        {
          market: "Resultado",
          value: "Lopes gana",
          confidence: "moderate",
          note: "Favorito por calidad general y grappling, pero sin valor matemático a -155.",
        },
      ],
      avoid: [
        "Lopes ML a -155 sin valor en un combo dado que Garcia tiene argumentos reales para la sorpresa",
      ],
    },
  ],
  combos: [
    {
      title: "Combo Principal (mayor probabilidad)",
      legs: [
        "Topuria KO/TKO",
        "Over 2.5 rounds (Pereira-Gane)",
        "Over 1.5 rounds (Lewis-Hokit) +160",
      ],
      odds: "~4.20x",
      risk: "moderate",
      note: "El análisis de mayor certeza de la noche: el striker más preciso del mundo finaliza al mejor brawler, la pelea más pareja se va lejos por la movilidad de Gane, y el monstruo de un golpe de Lewis obliga al prospecto a trabajar más de un round.",
    },
    {
      title: "Combo de Valor (mayor retorno)",
      legs: [
        "Garcia +120",
        "Over 1.5 rounds (Lewis-Hokit) +160",
        "Daukaus +250",
      ],
      odds: "~9.80x",
      risk: "alta",
      note: "3 underdogs con argumentos reales: Garcia con ventaja de striking sobre un Lopes defensivamente débil, Lewis con un solo golpe para emparejar la pelea, y el calor exterior que neutraliza el wrestling de Nickal.",
    },
  ],
};
