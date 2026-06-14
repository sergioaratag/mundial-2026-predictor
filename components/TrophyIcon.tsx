// Copa del Mundo (trofeo dorado) — SVG inline. Signature element: con `glow`
// emite un brillo dorado-naranja pulsante (animación CSS .mp-trophy-glow).
export function TrophyIcon({ size = 28, className = "", glow = false }: { size?: number; className?: string; glow?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${glow ? "mp-trophy-glow" : ""} ${className}`}
      role="img"
      aria-label="Copa del Mundo"
    >
      <defs>
        <linearGradient id="mp-trophy-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dd9a" />
          <stop offset="0.5" stopColor="#e7b23f" />
          <stop offset="1" stopColor="#c9621f" />
        </linearGradient>
      </defs>
      {/* Cuerpo: dos manos/torsión que suben hacia el globo (silueta de la copa FIFA) */}
      <path
        d="M18 6c-2.6 4.2-3.4 9.4-2.2 14.4 1 4.2 3.6 7.6 6.2 10.2-.2 2.2-1 4.2-2.6 5.8h9.2c-1.6-1.6-2.4-3.6-2.6-5.8 2.6-2.6 5.2-6 6.2-10.2C39.4 15.4 38.6 10.2 36 6c-1.8 4-3.4 7-6 9.4C27.6 13 25.6 9.8 27 6c-2 1.2-4 1.2-6 0-1.4 3.8.6 7-1.8 9.4C16.6 13 19.8 10 18 6Z"
        fill="url(#mp-trophy-gold)"
        stroke="#8c5a1e"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Base */}
      <rect x="18" y="36.4" width="12" height="2.4" rx="1" fill="url(#mp-trophy-gold)" stroke="#8c5a1e" strokeWidth="0.6" />
      <rect x="15.5" y="39.2" width="17" height="3" rx="1.2" fill="url(#mp-trophy-gold)" stroke="#8c5a1e" strokeWidth="0.6" />
      <rect x="13" y="42.6" width="22" height="2.6" rx="1.2" fill="#7a4a1a" />
    </svg>
  );
}
