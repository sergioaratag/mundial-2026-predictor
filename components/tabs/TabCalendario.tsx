"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CALENDAR, groupStageDates } from "@/lib/data/calendar";
import { chipLabel, longLabel, matchStatus, todayISO } from "@/lib/dates";
import { MatchRow } from "@/components/MatchCard";

export function TabCalendario() {
  const dates = useMemo(() => groupStageDates(), []);
  const today = todayISO();

  // Pre-selección: hoy si tiene partidos, si no el próximo día con partidos,
  // si no hoy (si está en rango), si no el primero.
  const initialDate = useMemo(() => {
    const hasMatches = (d: string) => CALENDAR.some((m) => m.date === d);
    if (dates.includes(today) && hasMatches(today)) return today;
    const nextWith = dates.find((d) => d >= today && hasMatches(d));
    if (nextWith) return nextWith;
    if (dates.includes(today)) return today;
    return dates[0];
  }, [dates, today]);

  const [selected, setSelected] = useState(initialDate);
  const [group, setGroup] = useState<string>("all");
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll automático al chip seleccionado al cargar.
  useEffect(() => {
    chipRefs.current[selected]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groups = useMemo(
    () => Array.from(new Set(CALENDAR.map((m) => m.group))).sort(),
    [],
  );

  const dayMatches = useMemo(
    () =>
      CALENDAR.filter((m) => m.date === selected && (group === "all" || m.group === group)).sort(
        (a, b) => a.time_et.localeCompare(b.time_et),
      ),
    [selected, group],
  );

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Chips de fecha */}
      <div className="flex gap-2 overflow-x-auto mp-scroll pb-2 -mx-1 px-1">
        {dates.map((d) => {
          const isSel = d === selected;
          const st = matchStatus(d, today);
          const has = CALENDAR.some((m) => m.date === d);
          const style: React.CSSProperties = isSel
            ? { background: "linear-gradient(135deg, rgba(93,25,229,0.55), rgba(53,82,243,0.4))", color: "var(--white)", boxShadow: "0 0 18px rgba(93,25,229,0.45)" }
            : st === "today"
              ? { background: "rgba(183,213,69,0.1)", color: "var(--lime)", boxShadow: "var(--glow-lime)" }
              : { background: "var(--surface-2)", color: "var(--lilac)", opacity: has ? 1 : 0.55 };
          return (
            <button
              key={d}
              ref={(el) => {
                chipRefs.current[d] = el;
              }}
              onClick={() => setSelected(d)}
              className="neon-press shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold font-display"
              style={style}
            >
              {chipLabel(d)}
              {st === "today" && !isSel && <span className="ml-1">•</span>}
            </button>
          );
        })}
      </div>

      {/* Encabezado del día + filtro de grupo */}
      <div className="flex items-center justify-between gap-3 mt-4 mb-3">
        <h2 className="text-base text-white">{longLabel(selected)}</h2>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="neon-sub text-xs px-2 py-1.5 outline-none font-semibold cursor-pointer text-white"
        >
          <option value="all">Todos los grupos</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Partidos del día */}
      {dayMatches.length > 0 ? (
        <div className="flex flex-col gap-3">
          {dayMatches.map((m) => (
            <MatchRow key={m.id} m={m} />
          ))}
        </div>
      ) : (
        <div className="neon-card px-4 py-8 text-center text-sm font-semibold muted">
          No hay partidos para esta fecha con el filtro seleccionado.
        </div>
      )}
    </div>
  );
}
