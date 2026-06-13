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
      className="lego-block lego-gold lego-pressable fixed bottom-5 right-5 z-50 h-12 w-12 flex items-center justify-center text-xl font-bold"
      style={{ borderRadius: "9999px" }}
    >
      ↑
    </button>
  );
}
