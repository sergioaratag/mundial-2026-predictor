"use client";

export type TabKey = "resumen" | "predicciones" | "picks" | "calendario" | "grupos" | "noticias";

export const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "resumen", label: "Resumen", icon: "🏠" },
  { key: "predicciones", label: "Predicciones", icon: "🔮" },
  { key: "picks", label: "Picks", icon: "🎯" },
  { key: "calendario", label: "Calendario", icon: "📅" },
  { key: "grupos", label: "Grupos", icon: "🗂️" },
  { key: "noticias", label: "Noticias", icon: "📰" },
];

export function TabNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <nav
      className="sticky top-0 z-40"
      style={{ background: "rgba(33,36,41,0.82)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex gap-2 px-3 sm:px-6 py-2.5 overflow-x-auto mp-scroll">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              aria-current={isActive ? "page" : undefined}
              className="neon-press shrink-0 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap font-semibold font-display"
              style={
                isActive
                  ? {
                      color: "var(--white)",
                      background: "linear-gradient(135deg, rgba(93,25,229,0.55), rgba(53,82,243,0.4))",
                      boxShadow: "0 0 18px rgba(93,25,229,0.45)",
                    }
                  : { color: "var(--lilac)", background: "var(--surface-2)" }
              }
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
