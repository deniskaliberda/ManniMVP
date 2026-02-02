# Projekt-Strategie: Manni's Fahrschule (Premium Redesign)

## 1. Visuelle Identität & Design-System
- **Primärfarbe:** #8B1B23 (Burgundy Red) - Muss strikt eingehalten werden.
- **Stil:** Modern, "Premium Tech", KEINE Emojis. 
- **Ästhetik:** Fokus auf "Glassmorphism" und "Bento Grids" für Leistungen.
- **Typografie:** 'Outfit' für Headlines (selbstbewusst), 'DM Sans' für Fließtext (clean).
- **Komponenten:** Shadcn/ui als Basis, veredelt mit Custom Framer Motion Animationen.

## 2. Tech-Stack (Vibe Coding Ready)
- **Framework:** Next.js 14 (App Router).
- **Styling:** Tailwind CSS.
- **CMS:** Sanity.io (für Termine, Preise & Fuhrpark-Management durch den Kunden).
- **Animationen:** GSAP für Scroll-Trigger & Framer Motion für UI-Interaktionen.
- **3D-Elemente:** React Three Fiber für den Fahrsimulator-Bereich.

## 3. SEO-Architektur & Regionale Dominanz
- **Kerngebiete:** Herrsching (Prio 1), Tutzing, Ammersee-Region.
- **Struktur:** - `/` -> Hero-Fokus auf Herrsching & Simulator.
  - `/standorte/tutzing` -> Eigene Landingpage für lokale Relevanz.
  - `/fuehrerschein-konfigurator` -> Interaktives Conversion-Tool.
- **Schema.org:** Implementierung von `DrivingSchool` und `LocalBusiness` für beide Standorte.

## 4. Key Features (Entwicklungspriorität)
1. **Interaktiver Konfigurator:** Step-by-Step Logik zur Ermittlung der Führerscheinklasse und Kosten.
2. **Dynamic Termine:** Sanity-Backend Anbindung, damit Inhaber Theorie-Wochen selbst pflegen können.
3. **Simulator 3D-Showcase:** Immersive Sektion über die 3 Fahrsimulatoren.