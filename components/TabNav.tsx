"use client";

export type TabKey = "resumen" | "picks" | "calendario" | "grupos" | "noticias";

export const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "resumen", label: "Resumen", icon: "🏠" },
  { key: "picks", label: "Picks", icon: "🎯" },
  { key: "calendario", label: "Calendario", icon: "📅" },
  { key: "grupos", label: "Grupos", icon: "🗂️" },
  { key: "noticias", label: "Noticias", icon: "📰" },
];

export function TabNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <nav
      className="sticky top-0 z-40"
      style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex gap-1 px-2 sm:px-4 overflow-x-auto mp-scroll">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className="relative px-3 sm:px-4 py-3 text-sm whitespace-nowrap transition-colors"
              style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
