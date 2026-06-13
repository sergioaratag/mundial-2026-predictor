"use client";

import { useState } from "react";
import { NEWS, GALLERY, type NewsItem } from "@/lib/data/news";
import { todayISO } from "@/lib/dates";

// Badge de categoría como mini-bloque LEGO de color.
const CAT: Record<NewsItem["category"], { label: string; cls: string }> = {
  resultado: { label: "Resultado", cls: "lego-emerald-dark" },
  lesion: { label: "Lesión", cls: "lego-red" },
  previa: { label: "Previa", cls: "lego-purple" },
  general: { label: "General", cls: "lego-gold" },
};

// Fecha relativa simple en español a partir de ISO (yyyy-mm-dd).
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
      {/* Cards de noticias */}
      <div className="flex flex-col gap-4">
        {NEWS.map((n) => {
          const c = CAT[n.category];
          return (
            <article key={n.id} className="lego-block lego-white overflow-hidden p-0">
              {n.image_url && <NewsImage url={n.image_url} alt={n.title} emoji="📰" />}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`lego-block--sm ${c.cls} text-[11px] px-2 py-0.5 font-bold`}>{c.label}</span>
                  <span className="text-xs ml-auto on-light-muted font-medium">{relDate(n.date)}</span>
                </div>
                <h3 className="text-base leading-snug">{n.title}</h3>
                <p className="text-sm mt-1.5 leading-relaxed on-light-muted">{n.summary}</p>
                {n.source_url && (
                  <a
                    href={n.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs mt-2 font-bold"
                    style={{ color: "var(--emerald-dark)" }}
                  >
                    Ver fuente →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Imágenes destacadas (estilo polaroid con marco) */}
      <section>
        <h2 className="text-lg mb-3">📸 Imágenes destacadas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <figure key={i} className="lego-block lego-white overflow-hidden p-0">
              <NewsImage url={g.url} alt={g.caption} emoji={g.emoji} ratio />
              <figcaption className="px-3 py-2 text-xs font-semibold" style={{ borderTop: "3px solid var(--ink)" }}>
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

// Imagen con fallback a bloque de color + emoji si la URL externa no carga.
function NewsImage({ url, alt, emoji, ratio }: { url: string; alt: string; emoji: string; ratio?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${ratio ? "aspect-[3/2]" : "h-44"}`}
        style={{ background: "var(--lime)", borderBottom: "3px solid var(--ink)" }}
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
      style={{ borderBottom: "3px solid var(--ink)" }}
    />
  );
}
