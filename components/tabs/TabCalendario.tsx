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
          return (
            <button
              key={d}
              ref={(el) => {
                chipRefs.current[d] = el;
              }}
              onClick={() => setSelected(d)}
              className="shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors"
              style={{
                background: isSel ? "var(--gold)" : "var(--card)",
                color: isSel ? "#1a1206" : st === "today" ? "var(--gold)" : "var(--muted)",
                border: `1px solid ${isSel ? "var(--gold)" : "var(--border)"}`,
                fontWeight: isSel || st === "today" ? 600 : 400,
                opacity: has || isSel ? 1 : 0.6,
              }}
            >
              {chipLabel(d)}
              {st === "today" && !isSel && <span className="ml-1">•</span>}
            </button>
          );
        })}
      </div>

      {/* Encabezado del día + filtro de grupo */}
      <div className="flex items-center justify-between gap-3 mt-4 mb-3">
        <h2 className="text-base font-semibold">{longLabel(selected)}</h2>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="text-xs rounded-md px-2 py-1.5 outline-none"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}
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
        <div className="flex flex-col gap-2">
          {dayMatches.map((m) => (
            <MatchRow key={m.id} m={m} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-lg px-4 py-8 text-center text-sm"
          style={{ background: "var(--card)", border: "1px dashed var(--border)", color: "var(--muted)" }}
        >
          No hay partidos para esta fecha con el filtro seleccionado.
        </div>
      )}
    </div>
  );
}
