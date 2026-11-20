import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  title: "MTBT Training — Coaching sportif à Mbao, Dakar",
  description: "Coaching sportif et entraînement physique du lundi au samedi au Terrain Arsenal, Mbao. 300 FCFA / jour. Réserve ta séance via WhatsApp.",
  openGraph: { title: "MTBT Training", description: "Ton corps. Ton objectif. Ta discipline.", images: ["/logo.jpeg"] },
  icons: { icon: "/logo.jpeg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>);
}
