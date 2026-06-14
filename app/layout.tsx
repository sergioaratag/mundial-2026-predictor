import type { Metadata } from "next";
import { Rajdhani, Manrope } from "next/font/google";
import "./globals.css";

// Display/títulos/números: Rajdhani (condensada, carácter "tech/neón"
// deportivo). Body: Manrope (sans legible). Refuerza el look neón nocturno.
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mundial 2026 · Predictor",
  description: "Panel de picks, combos y calendario del Mundial 2026 — hora Bolivia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${rajdhani.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
