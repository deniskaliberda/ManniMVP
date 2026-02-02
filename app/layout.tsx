import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manni's Fahrschule - Herrsching & Tutzing",
  description: "Moderne Fahrschule am Ammersee mit Premium-Simulatoren. Führerschein Klasse A, B, BE und mehr in Herrsching und Tutzing.",
  keywords: ["Fahrschule", "Herrsching", "Tutzing", "Ammersee", "Führerschein", "Fahrsimulator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-dmSans antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
