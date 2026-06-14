"use client";

import { useState } from "react";
import { NEWS, GALLERY, type NewsItem } from "@/lib/data/news";
import { todayISO } from "@/lib/dates";

// Badge de categoría con color neón.
const CAT: Record<NewsItem["category"], { label: string; color: string; bg: string; glow: string }> = {
  resultado: { label: "Resultado", color: "var(--lime)", bg: "rgba(183,213,69,0.12)", glow: "var(--glow-lime)" },
  lesion: { label: "Lesión", color: "var(--white)", bg: "rgba(211,48,32,0.2)", glow: "var(--glow-red)" },
  previa: { label: "Previa", color: "var(--white)", bg: "rgba(93,25,229,0.25)", glow: "var(--glow-purple)" },
  general: { label: "General", color: "var(--turquoise)", bg: "rgba(135,231,223,0.1)", glow: "var(--glow-turq)" },
};

function relDate(iso: string): string {
  const today = todayISO();
  if (iso === today) return "Hoy";
  const a = new Date(iso + "T00:00:00");
  const b = new Date(today + "T00:00:00");
  const days = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  if (days === 1) return "Ayer";
  if (days > 1) return `Hace ${days} días`;
  if (days === -1) return "Mañana";
  return iso;
}

export function TabNoticias() {
  return (
    <div className="px-3 sm:px-6 py-5 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {NEWS.map((n) => {
          const c = CAT[n.category];
          return (
            <article key={n.id} className="neon-card overflow-hidden">
              {n.image_url && <NewsImage url={n.image_url} alt={n.title} emoji="📰" />}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="chip" style={{ color: c.color, background: c.bg, boxShadow: c.glow }}>{c.label}</span>
                  <span className="text-xs ml-auto muted font-medium">{relDate(n.date)}</span>
                </div>
                <h3 className="text-base leading-snug text-white">{n.title}</h3>
                <p className="text-sm mt-1.5 leading-relaxed muted">{n.summary}</p>
                {n.source_url && (
                  <a href={n.source_url} target="_blank" rel="noopener noreferrer" className="inline-block text-xs mt-2 font-bold" style={{ color: "var(--turquoise)" }}>
                    Ver fuente →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <section>
        <h2 className="text-lg mb-3 text-white">📸 Imágenes destacadas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <figure key={i} className="neon-card overflow-hidden">
              <NewsImage url={g.url} alt={g.caption} emoji={g.emoji} ratio />
              <figcaption className="px-3 py-2 text-xs font-semibold muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

function NewsImage({ url, alt, emoji, ratio }: { url: string; alt: string; emoji: string; ratio?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${ratio ? "aspect-[3/2]" : "h-44"}`}
        style={{ background: "linear-gradient(135deg, var(--surface-2), rgba(93,25,229,0.25))" }}
      >
        <span className="text-4xl">{emoji}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full object-cover ${ratio ? "aspect-[3/2]" : "h-44"}`}
    />
  );
}
