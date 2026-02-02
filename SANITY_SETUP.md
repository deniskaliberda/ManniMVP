# Sanity CMS Setup - Manni's Fahrschule

## Übersicht

Das Projekt verwendet Sanity.io als Headless CMS für die dynamische Verwaltung von Theorie-Blockwochen und Preisen.

## 📦 Installierte Schemas

### 1. **theoryTerm.ts** - Theorie-Blockwochen

Verwaltet Termine für Theorie-Unterricht mit folgenden Feldern:

- **title** - Titel der Blockwoche
- **month** - Monat (z.B. "März 2026")
- **startDate/endDate** - Datumsbereich
- **totalSpots** - Gesamtplätze
- **availableSpots** - Verfügbare Plätze
- **status** - Enum: `available`, `limited`, `full`
- **location** - Standort: Herrsching oder Tutzing
- **times[]** - Array mit Wochentag + Uhrzeit
- **description** - Beschreibung
- **topics[]** - Behandelte Themen
- **isActive** - Sichtbarkeit auf Website
- **sortOrder** - Sortierung

### 2. **pricing.ts** - Führerscheinklassen & Preise

Verwaltet Führerscheinklassen mit Preisen:

- **name** - Name (z.B. "Führerschein Klasse B")
- **slug** - URL-Slug
- **licenseClass** - Klasse (z.B. "B", "A2")
- **category** - Kategorie: auto, motorrad, lkw, etc.
- **description** - Kurzbeschreibung
- **longDescription** - Rich Text (Portable Text)
- **basePrice** - Basispreis in Euro
- **priceDetails** - Objekt mit Kostenaufschlüsselung:
  - grundgebuehr
  - fahrstunden
  - sonderfahrten
  - pruefungsgebuehren
  - lernmaterial
- **icon** - Lucide Icon Name (z.B. "Car", "Bike")
- **highlights[]** - Array mit Highlights
- **requirements[]** - Array mit Voraussetzungen
- **duration** - Objekt mit Stunden-Angaben
- **popular** - Boolean für Hervorhebung
- **isActive** - Sichtbarkeit
- **sortOrder** - Sortierung

## 🚀 Installation

### 1. Dependencies installieren

```bash
npm install
```

Die notwendigen Sanity-Packages sind bereits in der package.json:
- `sanity` - Sanity Studio
- `@sanity/vision` - GROQ Query Tool
- `next-sanity` - Next.js Integration
- `@sanity/client` - Client Library
- `@sanity/image-url` - Image URL Builder

### 2. Sanity Projekt erstellen

Falls noch nicht geschehen, erstelle ein Sanity Projekt:

```bash
npm create sanity@latest
```

Oder nutze ein bestehendes Projekt.

### 3. Environment Variables setzen

Erstelle `.env.local` basierend auf `.env.example`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

**Wo finde ich die Werte?**
- Project ID: https://sanity.io/manage
- Dataset: Standard ist "production"
- API Token: Manage → API → Tokens (mit Editor-Rechten)

## 🎨 Sanity Studio starten

### Im Browser (empfohlen für Next.js 14)

Starte den Next.js Dev-Server:

```bash
npm run dev
```

Öffne dann: **http://localhost:3001/studio**

Das Studio ist als Route in der Next.js App integriert!

### Alternative: Standalone Studio

Falls du das Studio separat starten möchtest:

```bash
npx sanity dev
```

## 📝 GROQ Queries verwenden

### In Server Components (empfohlen)

```tsx
import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY, PRICING_QUERY } from "@/lib/sanity/queries";
import type { TheoryTerm, Pricing } from "@/lib/sanity/types";

export default async function Page() {
  const terms = await client.fetch<TheoryTerm[]>(THEORY_TERMS_QUERY);
  const pricing = await client.fetch<Pricing[]>(PRICING_QUERY);

  return (
    <div>
      {/* Daten rendern */}
    </div>
  );
}
```

### In Client Components

```tsx
"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY } from "@/lib/sanity/queries";

export default function ClientComponent() {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    client.fetch(THEORY_TERMS_QUERY).then(setTerms);
  }, []);

  return <div>{/* Daten rendern */}</div>;
}
```

## 📋 Verfügbare Queries

### Theorie-Blockwochen

- `THEORY_TERMS_QUERY` - Alle aktiven Blockwochen
- `THEORY_TERM_BY_ID_QUERY` - Einzelne Blockwoche (Parameter: `$id`)
- `UPCOMING_THEORY_TERMS_QUERY` - Nächste 3 verfügbare Blockwochen

### Preise

- `PRICING_QUERY` - Alle aktiven Preise
- `PRICING_BY_CATEGORY_QUERY` - Nach Kategorie filtern (Parameter: `$category`)
- `PRICING_BY_SLUG_QUERY` - Einzelner Preis (Parameter: `$slug`)
- `POPULAR_PRICING_QUERY` - Nur beliebte Klassen

### Query mit Parametern

```tsx
import { PRICING_BY_CATEGORY_QUERY } from "@/lib/sanity/queries";

const autoPricing = await client.fetch(
  PRICING_BY_CATEGORY_QUERY,
  { category: "auto" }
);
```

## 🎯 Beispiel-Komponenten

Zwei fertige Komponenten zum Anzeigen der Sanity-Daten:

### 1. TheoryTermsSection

```tsx
import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import TheoryTermsSection from "@/components/sections/TheoryTermsSection";

export default async function Page() {
  const terms = await client.fetch(THEORY_TERMS_QUERY);
  
  return <TheoryTermsSection terms={terms} />;
}
```

### 2. PricingSection

```tsx
import { client } from "@/lib/sanity";
import { PRICING_QUERY } from "@/lib/sanity/queries";
import PricingSection from "@/components/sections/PricingSection";

export default async function Page() {
  const pricing = await client.fetch(PRICING_QUERY);
  
  return <PricingSection pricingData={pricing} />;
}
```

## 🔧 Anpassungen

### Neues Feld hinzufügen

1. Schema bearbeiten: `lib/sanity/schemas/theoryTerm.ts`
2. Type aktualisieren: `lib/sanity/types.ts`
3. Query erweitern: `lib/sanity/queries.ts`
4. Studio neu laden (automatisch bei Dev-Server)

### Neues Schema erstellen

1. Schema-Datei erstellen: `lib/sanity/schemas/meinSchema.ts`
2. In `lib/sanity/schemas/index.ts` exportieren
3. Types definieren: `lib/sanity/types.ts`
4. Queries erstellen: `lib/sanity/queries.ts`

## 📚 Ordnerstruktur

```
lib/sanity/
├── schemas/
│   ├── theoryTerm.ts      # Schema für Theorie-Blockwochen
│   ├── pricing.ts         # Schema für Preise
│   └── index.ts           # Export aller Schemas
├── client.ts              # Sanity Client Setup
├── queries.ts             # GROQ Queries
├── types.ts               # TypeScript Types
└── index.ts               # Main Export

sanity.config.ts           # Sanity Studio Config
app/studio/[[...tool]]/    # Studio Route in Next.js
```

## 🎨 Studio Features

Das Studio bietet:
- **Custom Structure** - Organisierte Navigation
- **Vision Tool** - GROQ Query Testing
- **Live Preview** - Änderungen in Echtzeit sehen
- **Validierung** - Automatische Feld-Checks
- **Custom Previews** - Schöne Vorschau-Ansichten

## 🔒 Sicherheit

- API Token nur in `.env.local` (nie committen!)
- Token mit minimalen Rechten (Editor für CMS, Viewer für Frontend)
- CORS konfigurieren in Sanity Dashboard für deine Domain

## 📖 Weitere Ressourcen

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)
