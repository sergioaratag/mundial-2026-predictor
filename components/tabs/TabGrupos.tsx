import { GROUPS } from "@/lib/data/groups";

export function TabGrupos() {
  return (
    <div className="px-3 sm:px-6 py-5">
      <p className="lego-block lego-page text-xs mb-4 px-3 py-2 font-medium">
        Sorteo del 5-dic-2025. La <strong>cabeza de serie</strong> (bombo 1) de cada grupo va resaltada en lima.
      </p>
      {/* 1 col en móvil, 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div key={g.letter} className="lego-block lego-white overflow-hidden p-0">
            <div className="lego-gold px-3 py-2 text-sm font-bold" style={{ borderBottom: "3px solid var(--ink)" }}>
              Grupo {g.letter}
            </div>
            <ul className="p-2 flex flex-col gap-1.5">
              {g.teams.map((t, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium ${
                    i === 0 ? "lego-block--sm lego-lime" : ""
                  }`}
                >
                  <span className="text-base">{t.flag}</span>
                  <span className={t.confirmed ? "" : "italic on-light-muted"}>{t.name}</span>
                  {i === 0 && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide">Cabeza</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
