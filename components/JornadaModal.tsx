"use client";

import { useEffect } from "react";
import type { PicksDay } from "@/lib/types";
import { NEWS } from "@/lib/data/news";
import { PickItem, ComboCard, AvoidBlock, RefereeBlock } from "@/components/picks-ui";

// Modal de detalle por jornada: muestra TODO el contenido consolidado.
export function JornadaModal({ day, onClose }: { day: PicksDay; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const dayNews = NEWS.filter((n) => n.date === day.date);

  return (
    <div className="fixed inset-0 z-50 mp-overlay flex items-start sm:items-center justify-center p-3 sm:p-6" onMouseDown={onClose}>
      <div
        className="neon-card glow-purple w-full max-w-2xl my-4 flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-lg sm:text-xl text-white">{day.label}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="neon-press h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "var(--surface-2)", color: "var(--lilac)" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-5">
          {day.matches.map((m, i) => (
            <div key={i} className="flex flex-col gap-3">
              {/* Cabecera del partido */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-base font-bold text-white">
                  {m.home_flag} {m.home} <span className="muted">vs</span> {m.away} {m.away_flag}
                </span>
                <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{m.group}</span>
                <span className="text-xs ml-auto font-bold" style={{ color: "var(--turquoise)" }}>{m.time_bolivia} · hora Bolivia</span>
                <span className="text-xs w-full sm:w-auto muted">{m.venue} · {m.city}</span>
              </div>

              {/* Picks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {m.picks.map((p, j) => (
                  <PickItem key={j} p={p} />
                ))}
              </div>

              {/* Árbitro */}
              {m.referee && <RefereeBlock referee={m.referee} />}

              {/* Combo recomendado (el primero) */}
              {m.combos[0] && <ComboCard combo={m.combos[0]} />}

              {/* Evitar */}
              <AvoidBlock avoid={m.avoid} />

              {i < day.matches.length - 1 && <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />}
            </div>
          ))}

          {/* Mega combo */}
          {day.megaCombo && (
            <div>
              <div className="text-xs uppercase tracking-wide muted font-semibold mb-2">★ Mega combo de la jornada</div>
              <ComboCard combo={day.megaCombo} highlight />
            </div>
          )}

          {/* Noticias del día (si hay) */}
          {dayNews.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wide muted font-semibold mb-2">📰 Noticias del día</div>
              <div className="flex flex-col gap-2">
                {dayNews.map((n) => (
                  <div key={n.id} className="neon-sub p-3">
                    <div className="text-sm font-semibold text-white">{n.title}</div>
                    <div className="text-xs mt-1 leading-snug muted">{n.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
