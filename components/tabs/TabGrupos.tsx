import { GROUPS } from "@/lib/data/groups";

export function TabGrupos() {
  return (
    <div className="px-3 sm:px-6 py-5">
      <p className="text-xs mb-4 muted">
        Sorteo del 5-dic-2025. La <strong className="text-white">cabeza de serie</strong> (bombo 1) de cada grupo va resaltada.
      </p>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div key={g.letter} className="neon-card overflow-hidden">
            <div
              className="px-3 py-2 text-sm font-bold font-display text-white"
              style={{ background: "linear-gradient(135deg, rgba(93,25,229,0.3), rgba(53,82,243,0.15))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              Grupo {g.letter}
            </div>
            <ul className="p-2 flex flex-col gap-1.5">
              {g.teams.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium"
                  style={i === 0 ? { background: "rgba(183,213,69,0.1)", boxShadow: "var(--glow-lime)", color: "var(--white)" } : { color: "var(--white)" }}
                >
                  <span className="text-base">{t.flag}</span>
                  <span className={t.confirmed ? "" : "italic muted"}>{t.name}</span>
                  {i === 0 && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--lime)" }}>Cabeza</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
