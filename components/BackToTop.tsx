"use client";

import { useEffect, useState } from "react";

// Botón flotante "volver arriba": aparece tras 400px de scroll.
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full flex items-center justify-center text-lg transition-transform active:scale-95 hover:scale-105"
      style={{ background: "var(--card)", border: "1px solid var(--gold)", color: "var(--gold)" }}
    >
      ↑
    </button>
  );
}
