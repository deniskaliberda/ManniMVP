# Nagel Paul – E-Commerce Shop (Phase 1)

## Projekt-Überblick

Wir bauen einen modernen E-Commerce-Shop für **Nagel Paul (JPS GmbH & Co. KG)**, einen spezialisierten Fachhändler für Druckluft- und Akku-Nagler, Befestigungstechnik und das innovative LignoLoc-Holznagelsystem. Der Shop ersetzt einen veralteten Shopware-Shop.

### Geschäftskontext
- **Branche:** Befestigungstechnik (Nagler, Tacker, Nägel, Klammern, Schrauben)
- **Zielgruppe:** Handwerker (Zimmerer, Dachdecker, Trockenbauer, Schreiner), Baufirmen, ambitionierte Heimwerker
- **Besonderheit:** Einer der wenigen deutschen Händler mit dem kompletten LignoLoc-Holznagel-Sortiment (nachhaltige Holznägel statt Stahl)
- **Marken:** HiKOKI (Metabo HPT), Paslode, Prebena, BeA, Haubold, Senco, Fasco, Beck (LignoLoc)
- **Standort:** München-Umgebung, Versand deutschlandweit
- **Kunden:** ~10.000+, davon viele B2B-Stammkunden

### Das Kernproblem das wir lösen
Handwerker denken in **Anwendungen** ("Ich muss Dachlatten befestigen"), nicht in Produktnummern ("CN 16 Grad konisch verzinkt"). Der alte Shop zwingt Kunden, die exakte Produktbezeichnung zu kennen. Der neue Shop muss **beide Wege** zum Produkt bieten: klassisch nach Produktkategorie UND nach Anwendung/Gewerk.

## Tech Stack

### Backend
- **Medusa.js v2** – Headless E-Commerce Backend
- **PostgreSQL** – Datenbank (via Railway oder Supabase)
- **Node.js 20+** – Runtime

### Frontend
- **Next.js 14+** – React Framework mit App Router
- **TypeScript** – Durchgehend typisiert
- **Tailwind CSS** – Utility-First Styling
- **Meilisearch** – Produktsuche mit Autocomplete und Tippfehlertoleranz

### Infrastruktur
- **Vercel** – Hosting & Deployment
- **Stripe** – Zahlungsabwicklung (Kreditkarte, PayPal, SEPA, Klarna)
- **Resend** – Transaktionale E-Mails
- **Cloudinary** oder **Vercel Blob** – Bildverwaltung

## Monorepo-Struktur

```
nagel-paul/
├── apps/
│   ├── storefront/          # Next.js 14+ Frontend (App Router)
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities, Medusa SDK client
│   │   └── public/          # Static assets
│   └── backend/             # Medusa v2 Backend
│       ├── src/
│       │   ├── api/         # Custom API routes
│       │   ├── modules/     # Custom modules (Compatibility, etc.)
│       │   ├── subscribers/ # Event handlers
│       │   ├── workflows/   # Medusa workflows
│       │   └── admin/       # Admin UI extensions
│       └── medusa-config.ts
├── packages/
│   └── shared/              # Shared TypeScript types
│       └── src/types/       # Product, Compatibility, Application types
├── turbo.json               # Turborepo pipeline config
├── pnpm-workspace.yaml      # pnpm workspace definition
└── package.json             # Root scripts (dev, build, lint, type-check)
```

## Entwicklung

```bash
# Alle Apps starten
pnpm dev

# Nur Storefront
pnpm --filter @nagel-paul/storefront dev

# Nur Backend
pnpm --filter @nagel-paul/backend dev

# Alles bauen
pnpm build

# Type-Check
pnpm type-check

# Lint
pnpm lint
```
