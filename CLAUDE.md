@AGENTS.md

# Mundial 2026 Predictor

Panel Next.js (App Router, TS, Tailwind v4). Datos estáticos en `lib/data/`.
Tabs: Resumen · Picks · Calendario · Grupos. Horarios en hora Bolivia
(UTC-4); en jun-jul 2026 ET = Bolivia (ambos UTC-4), por eso `time_et` se
muestra tal cual etiquetado "hora Bolivia".

Estructura:
- `lib/data/picks.ts` — picks por jornada (array `PICKS`, genérico, N días).
- `lib/data/calendar.ts` — fixture de fase de grupos (`CALENDAR`).
- `lib/data/groups.ts` — los 12 grupos.
- `lib/data/venues.ts` — las 16 sedes oficiales.
- `components/tabs/*` — un componente por tab (genéricos, no se tocan al sumar datos).

## Rutina diaria (Nivel 1 - semi-automático)
Cada mañana Sergio trae un bloque de picks ya redactado (formato con
market/value/confidence/note, combos y avoid) para la jornada del día
siguiente. Cada vez que recibas ese bloque:

1. Abrir `lib/data/picks.ts`.
2. Agregar el nuevo día como un objeto en el array `PICKS`, con su `id`
   `"jornada-N"`.
3. Si el bloque incluye corrección de un día anterior, reemplazar ese objeto
   completo, no hacer merge parcial.
4. Verificar que `TabPicks.tsx` renderiza el nuevo día sin cambios de código
   (la estructura ya es genérica y soporta N días sin tocar componentes).
5. `npm run build` → si pasa, commit:
   `git add . && git commit -m "picks: jornada N - DD de mes"` y `git push`.
6. Confirmar a Sergio que el deploy de Vercel se disparó.

No se necesita tocar `TabCalendario.tsx` ni datos de calendario para esta
rutina diaria, solo `picks.ts`.
