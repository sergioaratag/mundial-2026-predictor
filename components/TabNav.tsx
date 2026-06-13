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
      style={{ background: "var(--bg-page)" }}
    >
      <div className="flex gap-2 px-3 sm:px-6 py-2.5 overflow-x-auto mp-scroll">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              aria-current={isActive ? "page" : undefined}
              className={`lego-block--sm lego-pressable shrink-0 px-3 py-1.5 text-sm whitespace-nowrap ${
                isActive ? "lego-gold font-bold" : "lego-white font-medium"
              }`}
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
