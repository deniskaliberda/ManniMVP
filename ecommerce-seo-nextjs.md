# E-Commerce SEO mit Next.js

## Metadata pro Seite
```typescript
// app/(shop)/produkte/[category]/[product]/page.tsx
import type { Metadata } from "next"

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.product)

  return {
    title: `${product.name} | ${product.brand} | Nagel Paul`,
    description: product.seoDescription || `${product.name} von ${product.brand} – ${product.shortDescription}. Jetzt kaufen bei Nagel Paul.`,
    alternates: {
      canonical: `https://nagel-paul.de/produkte/${params.category}/${params.product}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.thumbnail, width: 800, height: 800, alt: product.name }],
      type: "website",
      locale: "de_DE",
    },
  }
}
```

## JSON-LD Schema.org
```typescript
// components/seo/ProductSchema.tsx
export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map(i => i.url),
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Nagel Paul – JPS GmbH & Co. KG",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## Sitemap
```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const categories = await getAllCategories()
  const applications = await getAllApplications()

  return [
    { url: "https://nagel-paul.de", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    ...categories.map(cat => ({
      url: `https://nagel-paul.de/produkte/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map(p => ({
      url: `https://nagel-paul.de/produkte/${p.category.slug}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...applications.map(app => ({
      url: `https://nagel-paul.de/anwendungen/${app.gewerk}/${app.slug}`,
      lastModified: app.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
```

## Interne Verlinkung
- Jede Produktseite verlinkt auf kompatible Produkte
- Jede Produktseite verlinkt auf passende Anwendungen
- Jede Anwendungsseite verlinkt auf empfohlene Produkte
- Breadcrumbs auf JEDER Seite (mit BreadcrumbList Schema)
- Marken-Landingpages verlinken auf alle Produkte der Marke
- Footer: Wichtigste Kategorien + Anwendungen verlinken

## Technische Checks
- Keine Duplicate Content (einzigartige Texte pro Seite!)
- Canonical URLs setzen
- 301-Redirects von allen alten Shopware-URLs
- Bilder: WebP Format, alt-Text, width/height gesetzt
- Lazy Loading für Bilder below-the-fold
- Preload für LCP-Bild (Hero, erstes Produktbild)
