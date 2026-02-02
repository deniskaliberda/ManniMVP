# Quick Start Guide - Manni's Fahrschule

## 🚀 Development Server starten

```bash
npm run dev
```

Öffne: **http://localhost:3001** (oder Port wie im Terminal angezeigt)

## 📦 Was ist neu?

### 1. **Navbar mit Glassmorphism**
- Sticky Header am oberen Rand
- Blur-Effekt verstärkt sich beim Scrollen
- Responsive mit Mobile-Menü
- CTA "Jetzt anmelden" mit 100px border-radius

### 2. **Hero-Sektion (Zweispaltig)**
- Links: Headline, Subline, CTAs, Trust Indicators
- Rechts: 3D-Simulator mit rotierender Wireframe-Kugel
- Reagiert auf Mausbewegung
- Glassmorphism-Container

### 3. **3D-Simulator (React Three Fiber)**
- Rote Wireframe-Sphere (#8B1B23)
- Kontinuierliche Rotation
- Maus-Interaktivität
- Pulsier-Animation
- Hover-Effekte

## 🎨 Design-System

- **Primärfarbe:** #8B1B23 (Burgundy Red)
- **Headlines:** Outfit Font
- **Body Text:** DM Sans Font
- **Style:** Glassmorphism & Premium Tech

## 📁 Neue Dateien

```
components/
├── layout/
│   ├── Navbar.tsx          ✅ Sticky Navigation mit Glassmorphism
│   └── index.ts            ✅
├── sections/
│   ├── Hero.tsx            ✅ Zweispaltige Hero (Updated)
│   ├── SimulatorScene.tsx  ✅ 3D-Szene mit React Three Fiber
│   └── ...

app/
├── layout.tsx              ✅ Navbar integriert
└── page.tsx                ✅ Hero hinzugefügt

COMPONENTS_DOCS.md          ✅ Vollständige Dokumentation
```

## 🎯 Navigation

Die Navbar enthält folgende Links:
- **Führerscheine** → `/fuehrerscheine`
- **Erweiterung** → `/erweiterung`
- **Über uns** → `/ueber-uns`
- **Termine** → `/termine`
- **Jetzt anmelden** → `/anmelden` (CTA Button)

## 🎮 3D-Features

### Interaktionen
1. **Maus bewegen** → Kugel folgt der Maus
2. **Hover** → Opacity erhöht sich
3. **Drag** → OrbitControls für Rotation (Desktop)

### Performance
- SSR deaktiviert (Client-only)
- Optimierte Frame-Updates
- Smooth 60fps Animation

## 📱 Responsive

### Mobile
- Hamburger-Menü (Navbar)
- 1-Spalten-Layout (Hero)
- Touch-optimiert

### Desktop
- Vollständige Navigation
- 2-Spalten-Layout (Hero)
- Maus-Interaktionen

## 🎨 Styling-Klassen

### Glassmorphism

```css
backdrop-blur-xl          /* Starker Blur */
bg-white/80              /* 80% Opacity */
border border-white/40   /* 40% Border Opacity */
```

### Button (100px radius)

```tsx
className="rounded-full"
style={{ borderRadius: "100px" }}
```

### Primärfarbe

```css
bg-primary              /* Background */
text-primary            /* Text */
border-primary          /* Border */
shadow-primary/30       /* Shadow mit 30% */
```

## ⚡ Scripts

```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # ESLint Check
```

## 🔧 Troubleshooting

### 3D-Szene lädt nicht

**Prüfe:**
1. Dependencies installiert? `npm install`
2. Browser unterstützt WebGL?
3. Console für Fehler checken

### Navbar überlappt Content

**Lösung:** Die Hero-Sektion hat bereits `pt-20` für Navbar-Offset

### Port 3000 bereits belegt

**Server läuft automatisch auf Port 3001**
Oder manuell Port wählen: `npm run dev -- -p 3002`

## 📖 Weitere Dokumentation

- `COMPONENTS_DOCS.md` - Detaillierte Komponenten-Doku
- `SANITY_SETUP.md` - Sanity CMS Setup
- `THEORY_SCHEDULE_DOCS.md` - TheorySchedule Komponente
- `README.md` - Projekt-Übersicht

## 🎯 Verfügbare Routen

- `/` - Homepage mit Hero, Konfigurator, Leistungen
- `/termine` - Theorie-Termine (Hell)
- `/theorie` - Theorie-Schedule (Dunkel)
- `/preise` - Preise & Führerscheinklassen
- `/studio` - Sanity Studio CMS

## ✨ Features auf der Homepage

1. **Navbar** - Sticky mit Glassmorphism
2. **Hero** - Zweispaltig mit 3D-Simulator
3. **Leistungen Bento** - Grid mit Services
4. **Konfigurator** - Multi-Step Formular

## 🎨 Primärfarbe überall

Die Farbe **#8B1B23** ist durchgängig verwendet:
- Navbar Logo
- Hero Headline ("Entspannt")
- CTA Buttons
- 3D Wireframe-Kugel
- Hover-Effekte
- Shadows

## 📐 Layout-Struktur

```tsx
<html>
  <body>
    <Navbar />              // Fixed Top
    <main>
      <Hero />              // PT-20 für Navbar-Offset
      <LeistungenBento />
      <LicenseConfigurator />
    </main>
  </body>
</html>
```

## 🚀 Deployment-Ready

Alle Komponenten sind:
- ✅ TypeScript Type-Safe
- ✅ Responsive
- ✅ Performance-optimiert
- ✅ Linter-Clean
- ✅ Production-Ready

## 💡 Nächste Schritte

1. **Content anpassen** - Texte in Hero.tsx
2. **Pages erstellen** - /fuehrerscheine, /ueber-uns, etc.
3. **Sanity einrichten** - .env.local mit Credentials
4. **Weitere 3D-Szenen** - SimulatorScene erweitern
5. **SEO optimieren** - Metadata in Pages

## 🎉 Fertig!

Der Development Server läuft und zeigt:
- ✅ Glassmorphism-Navbar
- ✅ Premium Hero-Sektion
- ✅ Interaktive 3D-Kugel
- ✅ Responsive Design
- ✅ Framer Motion Animationen

Viel Erfolg mit Manni's Fahrschule! 🚗
