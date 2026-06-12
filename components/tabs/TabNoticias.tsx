"use client";

import { useState } from "react";
import { NEWS, GALLERY, type NewsItem } from "@/lib/data/news";
import { todayISO } from "@/lib/dates";

const CAT: Record<NewsItem["category"], { label: string; color: string; bg: string }> = {
  resultado: { label: "Resultado", color: "var(--emerald)", bg: "rgba(0,197,102,0.14)" },
  lesion: { label: "Lesión", color: "var(--red)", bg: "rgba(216,31,38,0.14)" },
  previa: { label: "Previa", color: "var(--purple)", bg: "rgba(91,33,214,0.18)" },
  general: { label: "General", color: "var(--gold)", bg: "rgba(212,168,67,0.14)" },
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
            <article
              key={n.id}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              {n.image_url && <NewsImage url={n.image_url} alt={n.title} emoji="📰" />}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ color: c.color, background: c.bg }}
                  >
                    {c.label}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
                    {relDate(n.date)}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug">{n.title}</h3>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {n.summary}
                </p>
                {n.source_url && (
                  <a
                    href={n.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs mt-2"
                    style={{ color: "var(--emerald)" }}
                  >
                    Ver fuente →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Imágenes destacadas */}
      <section>
        <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--gold)" }}>
          Imágenes destacadas
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <NewsImage url={g.url} alt={g.caption} emoji={g.emoji} ratio />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--muted)" }}>
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

// Imagen con fallback a degradado + emoji si la URL externa no carga.
function NewsImage({ url, alt, emoji, ratio }: { url: string; alt: string; emoji: string; ratio?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${ratio ? "aspect-[3/2]" : "h-44"}`}
        style={{ background: "linear-gradient(135deg, var(--bg-panel), var(--maroon))" }}
      >
        <span className="text-4xl opacity-80">{emoji}</span>
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
