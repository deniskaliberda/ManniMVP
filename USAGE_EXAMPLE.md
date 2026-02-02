# Usage Examples - Sanity Integration

Dieser Guide zeigt, wie du die Sanity-Daten in deinen Next.js Komponenten verwendest.

## 🚀 Quick Start

### 1. Server Component (Empfohlen)

```tsx
// app/page.tsx
import { client } from "@/lib/sanity";
import { PRICING_QUERY, THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import type { Pricing, TheoryTerm } from "@/lib/sanity/types";

// Automatisches Revalidate alle 60 Minuten
export const revalidate = 3600;

export default async function HomePage() {
  // Daten parallel fetchen
  const [pricing, terms] = await Promise.all([
    client.fetch<Pricing[]>(PRICING_QUERY),
    client.fetch<TheoryTerm[]>(THEORY_TERMS_QUERY),
  ]);

  return (
    <main>
      <h1>Willkommen</h1>
      
      {/* Pricing Daten */}
      <div>
        {pricing.map((price) => (
          <div key={price._id}>
            <h2>{price.name}</h2>
            <p>{price.basePrice}€</p>
          </div>
        ))}
      </div>

      {/* Theory Terms Daten */}
      <div>
        {terms.map((term) => (
          <div key={term._id}>
            <h2>{term.title}</h2>
            <p>{term.availableSpots} Plätze verfügbar</p>
          </div>
        ))}
      </div>
    </main>
  );
}
```

### 2. Mit Fertigkomponenten

```tsx
// app/page.tsx
import { client } from "@/lib/sanity";
import { PRICING_QUERY, THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import { PricingSection, TheoryTermsSection } from "@/components/sections";

export const revalidate = 3600;

export default async function HomePage() {
  const [pricing, terms] = await Promise.all([
    client.fetch(PRICING_QUERY),
    client.fetch(THEORY_TERMS_QUERY),
  ]);

  return (
    <main>
      <TheoryTermsSection terms={terms} />
      <PricingSection pricingData={pricing} />
    </main>
  );
}
```

## 📋 Query Beispiele

### Alle Preise abrufen

```tsx
import { client } from "@/lib/sanity";
import { PRICING_QUERY } from "@/lib/sanity/queries";

const allPricing = await client.fetch(PRICING_QUERY);
```

### Preise nach Kategorie filtern

```tsx
import { client } from "@/lib/sanity";
import { PRICING_BY_CATEGORY_QUERY } from "@/lib/sanity/queries";

const autoPricing = await client.fetch(
  PRICING_BY_CATEGORY_QUERY,
  { category: "auto" }
);
```

### Einzelnen Preis per Slug

```tsx
import { client } from "@/lib/sanity";
import { PRICING_BY_SLUG_QUERY } from "@/lib/sanity/queries";

const pricing = await client.fetch(
  PRICING_BY_SLUG_QUERY,
  { slug: "fuehrerschein-klasse-b" }
);
```

### Nächste 3 Termine

```tsx
import { client } from "@/lib/sanity";
import { UPCOMING_THEORY_TERMS_QUERY } from "@/lib/sanity/queries";

const upcomingTerms = await client.fetch(UPCOMING_THEORY_TERMS_QUERY);
```

## 🎨 Custom Query schreiben

```tsx
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

// Custom Query definieren
const CUSTOM_QUERY = groq`
  *[_type == "pricing" && category == $category && basePrice < $maxPrice] 
  | order(basePrice asc) {
    _id,
    name,
    basePrice,
    licenseClass
  }
`;

// Query ausführen
const affordableCars = await client.fetch(CUSTOM_QUERY, {
  category: "auto",
  maxPrice: 2000,
});
```

## 🔄 Client Component mit State

```tsx
"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { PRICING_QUERY } from "@/lib/sanity/queries";
import type { Pricing } from "@/lib/sanity/types";

export default function ClientComponent() {
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch<Pricing[]>(PRICING_QUERY);
        setPricing(data);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Lädt...</div>;

  return (
    <div>
      {pricing.map((price) => (
        <div key={price._id}>{price.name}</div>
      ))}
    </div>
  );
}
```

## 🎯 Dynamic Route mit Sanity

```tsx
// app/fuehrerschein/[slug]/page.tsx
import { client } from "@/lib/sanity";
import { PRICING_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import type { Pricing } from "@/lib/sanity/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "pricing" && isActive == true] { "slug": slug }`
  );

  return slugs.map((item) => ({
    slug: item.slug.current,
  }));
}

export default async function FuehrerscheinDetailPage({ params }: PageProps) {
  const pricing = await client.fetch<Pricing>(
    PRICING_BY_SLUG_QUERY,
    { slug: params.slug }
  );

  if (!pricing) {
    notFound();
  }

  return (
    <main>
      <h1>{pricing.name}</h1>
      <p>{pricing.description}</p>
      <p>Preis: {pricing.basePrice}€</p>
    </main>
  );
}
```

## 🖼️ Bilder mit Sanity

Falls du später Bilder hinzufügst:

```tsx
import { urlFor } from "@/lib/sanity";

<img 
  src={urlFor(pricing.image).width(400).height(300).url()} 
  alt={pricing.name}
/>
```

## 🔄 ISR (Incremental Static Regeneration)

```tsx
// Seite wird bei jedem Request gecacht für 1 Stunde
export const revalidate = 3600;

// Seite wird bei jedem Build neu generiert
export const dynamic = "force-static";

// Seite wird bei jedem Request neu generiert
export const dynamic = "force-dynamic";
```

## 💡 Best Practices

1. **Server Components bevorzugen** - Weniger JavaScript im Browser
2. **Parallel fetchen** - Nutze `Promise.all()` für mehrere Queries
3. **Type Safety** - Nutze die TypeScript Types aus `@/lib/sanity/types`
4. **Revalidation** - Setze passende `revalidate` Zeiten
5. **Error Handling** - Wrap Fetches in try/catch
6. **Loading States** - Nutze Suspense oder Loading States

## 🎨 Komponenten-Struktur

```
Homepage
├── Hero
├── TheoryTermsSection (Sanity Data)
├── LicenseConfigurator
├── PricingSection (Sanity Data)
└── LeistungenBento

/preise
└── PricingSection (Sanity Data)

/termine
└── TheoryTermsSection (Sanity Data)
```

## 📊 Verfügbare Routen

- `/` - Homepage mit allen Komponenten
- `/preise` - Dedizierte Preise-Seite
- `/termine` - Dedizierte Termine-Seite
- `/studio` - Sanity Studio (nach Login)

## 🔧 Troubleshooting

### "Project ID not found"
- Prüfe `.env.local` und stelle sicher, dass `NEXT_PUBLIC_SANITY_PROJECT_ID` gesetzt ist
- Starte Dev-Server neu nach Änderung

### "Unauthorized"
- Prüfe `SANITY_API_TOKEN` in `.env.local`
- Token muss Editor-Rechte haben

### Daten werden nicht aktualisiert
- Prüfe `revalidate` Wert
- Leere Next.js Cache: `rm -rf .next`
- In Sanity Studio prüfen, ob `isActive = true`
