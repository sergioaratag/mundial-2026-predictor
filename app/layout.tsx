import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";

// Body: Inter (legible, pesos 400-500). Display/títulos: Archivo Black (peso
// "black" geométrico) → refuerza el look juguetón/sólido tipo bloque LEGO.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400", // Archivo Black solo viene en 400 (que ya es el peso "black")
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
      className={`${inter.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
