# Manni's Fahrschule - Premium Redesign

Moderne Website für Manni's Fahrschule in Herrsching und Tutzing am Ammersee.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Sanity.io

## Design-System

- **Primärfarbe:** #8B1B23 (Burgundy Red)
- **Typografie:**
  - Headlines: Outfit (selbstbewusst)
  - Fließtext: DM Sans (clean)
- **Stil:** Modern, Premium Tech, Glassmorphism & Bento Grids

## Getting Started

### 1. Dependencies installieren

```bash
npm install
```

### 2. Environment Variables einrichten

Kopiere `.env.example` zu `.env.local` und füge deine Sanity Credentials ein:

```bash
cp .env.example .env.local
```

### 3. Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Shadcn/ui Components installieren

Um UI-Komponenten hinzuzufügen:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# ... weitere Komponenten nach Bedarf
```

## Projektstruktur

```
ManniMVP/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout mit Fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Globale Styles
├── components/
│   ├── sections/          # Website Sections (Hero, etc.)
│   └── ui/                # Shadcn/ui Components
├── lib/
│   ├── sanity/            # Sanity Client & Queries
│   │   ├── client.ts      # Sanity Client Setup
│   │   ├── queries.ts     # GROQ Queries
│   │   ├── types.ts       # TypeScript Types
│   │   └── index.ts       # Exports
│   └── utils.ts           # Utility Functions
└── public/                # Static Assets
```

## Key Features

1. ✅ **Interaktiver Konfigurator** - Multi-Step Formular mit WhatsApp-Integration
2. ✅ **Dynamic Termine** - Sanity-Backend für Theorie-Wochen  
3. ✅ **Simulator & Fleet Showcase** - GSAP-Animationen und Parallax-Effekte
4. ✅ **3D Hero** - React Three Fiber Wireframe-Kugel
5. ✅ **Glassmorphism Navbar** - Sticky Navigation mit Blur-Effekt

## SEO

- **Kerngebiete:** Herrsching (Prio 1), Tutzing, Ammersee-Region
- **Schema.org:** DrivingSchool und LocalBusiness für beide Standorte

## Scripts

- `npm run dev` - Development Server
- `npm run build` - Production Build
- `npm run start` - Production Server
- `npm run lint` - ESLint Check
