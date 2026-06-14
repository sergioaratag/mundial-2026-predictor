"use client";

import { useState } from "react";
import { PICKS } from "@/lib/data/picks";
import type { PickMatch, PicksDay } from "@/lib/types";
import { PickItem, ComboCard, AvoidBlock, RefereeBlock } from "@/components/picks-ui";
import { JornadaModal } from "@/components/JornadaModal";

export function TabPicks() {
  const [modalDay, setModalDay] = useState<PicksDay | null>(null);

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="px-3 sm:px-6 py-5">
      {/* Chips de jornada: scroll (principal) + botón de detalle (modal) */}
      <div className="flex gap-2 overflow-x-auto mp-scroll pb-2 mb-4 -mx-1 px-1 sticky top-[52px] z-30" style={{ background: "rgba(33,36,41,0.82)", backdropFilter: "blur(10px)" }}>
        {PICKS.map((d) => (
          <div key={d.id} className="neon-press shrink-0 flex items-center rounded-lg overflow-hidden font-display font-semibold" style={{ background: "var(--surface-2)" }}>
            <button onClick={() => go(d.id)} className="pl-3 pr-2 py-1.5 text-sm text-white">
              Jornada {d.jornada}
            </button>
            <button
              onClick={() => setModalDay(d)}
              title="Ver detalle completo"
              className="px-2 py-1.5 text-sm"
              style={{ color: "var(--turquoise)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              ⊕
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {PICKS.map((day) => (
          <section key={day.id} id={day.id} className="scroll-mt-28">
            <h2 className="text-lg mb-4 text-white">{day.label}</h2>

            <div className="flex flex-col gap-5">
              {day.matches.map((m, i) => (
                <MatchPicks key={i} m={m} />
              ))}
            </div>

            {day.megaCombo && (
              <div className="mt-5">
                <ComboCard combo={day.megaCombo} highlight />
              </div>
            )}
          </section>
        ))}
      </div>

      {modalDay && <JornadaModal day={modalDay} onClose={() => setModalDay(null)} />}
    </div>
  );
}

function MatchPicks({ m }: { m: PickMatch }) {
  return (
    <article className="neon-card overflow-hidden">
      {/* Cabecera del partido */}
      <div className="px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1" style={{ background: "linear-gradient(135deg, rgba(93,25,229,0.18), rgba(53,82,243,0.1))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-base font-bold text-white">
          {m.home_flag} {m.home} <span className="muted">vs</span> {m.away} {m.away_flag}
        </span>
        <span className="chip" style={{ background: "var(--surface-2)", color: "var(--lilac)" }}>{m.group}</span>
        <span className="text-xs ml-auto font-bold" style={{ color: "var(--turquoise)" }}>{m.time_bolivia} · hora Bolivia</span>
        <span className="text-xs w-full sm:w-auto muted">{m.venue} · {m.city}</span>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4 muted">{m.context}</p>

        {/* Picks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {m.picks.map((p, i) => (
            <PickItem key={i} p={p} />
          ))}
        </div>

        {/* Árbitro */}
        {m.referee && (
          <div className="mt-4">
            <RefereeBlock referee={m.referee} />
          </div>
        )}

        {/* Combos */}
        {m.combos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {m.combos.map((cmb, i) => (
              <ComboCard key={i} combo={cmb} />
            ))}
          </div>
        )}

        {/* Avoid */}
        {m.avoid.length > 0 && (
          <div className="mt-4">
            <AvoidBlock avoid={m.avoid} />
          </div>
        )}
      </div>
    </article>
  );
}
