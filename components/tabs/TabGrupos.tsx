import { GROUPS } from "@/lib/data/groups";

export function TabGrupos() {
  return (
    <div className="px-3 sm:px-6 py-5">
      <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
        Sorteo del 5-dic-2025. Equipos marcados como “Por confirmar” se cargan con el sorteo oficial completo.
      </p>
      {/* 1 col en móvil (<480px via grid-cols-1), 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3">
        {GROUPS.map((g) => (
          <div key={g.letter} className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-3 py-2 text-sm font-semibold" style={{ background: "var(--card-2)", color: "var(--gold)" }}>
              Grupo {g.letter}
            </div>
            <ul className="p-2">
              {g.teams.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded text-sm"
                  style={{ color: t.confirmed ? "var(--text)" : "var(--muted)" }}
                >
                  <span className="text-base">{t.flag}</span>
                  <span className={t.confirmed ? "" : "italic"}>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
