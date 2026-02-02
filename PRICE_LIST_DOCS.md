# PriceList Component & Preise-Seite - Dokumentation

## 📋 Überblick

Die Preise-Seite (`/preise`) zeigt alle Führerscheinklassen mit transparenten Preisen, Features und direkter Kontaktmöglichkeit. Die Seite nutzt einen Toggle-Switch zur Filterung zwischen "Privat" und "Gewerblich".

## 📁 Dateien

```
app/preise/
└── page.tsx              // Server Component, fetcht Sanity-Daten

components/sections/
└── PriceList.tsx         // Client Component mit Toggle & Grid

app/kontakt/
└── page.tsx              // Kontakt-Placeholder (für CTA-Links)
```

## 🎯 Features

### 1. **Toggle-Switch** (Privat vs. Gewerblich)

**Kategorien:**
- **Privat:** PKW, Motorrad (Klasse B, A, A2, BE, etc.)
- **Gewerblich:** LKW, Bus (Klasse C, CE, D, etc.)

**Design:**
```tsx
Animated Switch mit Framer Motion
- Background: Gray-200
- Active: #8B1B23 (Burgundy)
- Spring Animation (300 stiffness, 30 damping)
```

**Funktionalität:**
```tsx
const [selectedCategory, setSelectedCategory] = useState<"privat" | "gewerblich">("privat");

// Filter Daten
const filteredData = pricingData.filter(
  (item) => item.category === selectedCategory
);
```

### 2. **Bento-Grid Layout**

**Responsive Grid:**
```css
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet
lg:grid-cols-3        // Desktop
gap-8                 // Konsistenter Abstand
```

**AnimatePresence:**
- Smooth Transition beim Kategorie-Wechsel
- Exit Animation: opacity 0, y: -20
- Enter Animation: opacity 1, y: 0

### 3. **Pricing Cards**

#### **Card-Struktur:**

1. **Header:**
   - Badges (Popular / AZAV)
   - License Class Icon (Quadrat, 16x16)

2. **Content:**
   - Name (Outfit, 2xl, bold)
   - Beschreibung (DM Sans)
   - Preis (ab X €)
   - Highlights (Checkliste mit Check-Icons)

3. **Footer:**
   - AZAV Info-Box (wenn zutreffend)
   - CTA Button "Details anfragen"

#### **Card-Varianten:**

**Standard Card:**
```tsx
Border: gray-200
Hover: border-[#8B1B23]/50, shadow-xl
Background: white
```

**Popular Card (Klasse B):**
```tsx
Border: #8B1B23 (permanent)
Shadow: shadow-2xl shadow-[#8B1B23]/20
Badge: "Beliebt" (Sparkles Icon, Top-Right)
Glow: Rotes Glühen
```

**AZAV Card (LKW/Bus):**
```tsx
Badge: "AZAV-zertifiziert" (Award Icon, Top-Left)
Color: #f59e0b (Orange)
Info-Box: Orange Background mit Förder-Info
```

### 4. **Badges**

**Popular Badge:**
```tsx
<div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8B1B23] text-white text-sm font-bold shadow-lg">
  <Sparkles size={14} />
  Beliebt
</div>
```

**AZAV Badge:**
```tsx
<div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f59e0b] text-white text-sm font-bold shadow-lg">
  <Award size={14} />
  AZAV-zertifiziert
</div>
```

### 5. **Highlights / Features**

**Checkliste:**
```tsx
{highlights.map((highlight, i) => (
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full bg-[#8B1B23]/10 flex items-center justify-center">
      <Check size={14} className="text-[#8B1B23]" />
    </div>
    <span className="text-sm text-gray-700 font-dmSans">
      {highlight}
    </span>
  </div>
))}
```

**Beispiel-Highlights:**
- Theorieunterricht inklusive
- Fahrsimulator-Training
- E-Auto oder konventionelles Fahrzeug
- Prüfungsanmeldung inklusive
- Kostenlose Probefahrt

### 6. **CTA Button "Details anfragen"**

**Link mit Query-Parameter:**
```tsx
<Link href={`/kontakt?class=${encodeURIComponent(pricing.licenseClass)}`}>
  Details anfragen
</Link>
```

**Styling:**
- Popular: #8B1B23, white Text, Shadow
- Standard: gray-100, gray-900 Text

**Funktionalität:**
- Query-Parameter für Kontaktformular
- Vorselektierte Klasse im Dropdown
- Seamless User Journey

### 7. **AZAV Info-Box**

**Design:**
```tsx
<div className="p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30">
  <p className="text-sm text-gray-700 font-dmSans">
    <strong>Förderung möglich:</strong> Diese Ausbildung ist
    AZAV-zertifiziert und kann über Bildungsgutschein gefördert werden.
  </p>
</div>
```

**Conditional Rendering:**
```tsx
{isAZAV && (
  <div className="mb-6 p-4 rounded-xl...">
    ...
  </div>
)}
```

### 8. **Hover-Scale-Up Effekt**

**Framer Motion:**
```tsx
<motion.div
  whileHover={{ scale: 1.03, y: -8 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

**Effekt:**
- 3% größer
- 8px nach oben
- Spring Animation
- Smooth & responsive

### 9. **Info Banner**

**Bottom CTA:**
```tsx
Gradient Background: #8B1B23/10 → #8B1B23/5
Border: #8B1B23/20
Headline: "Individuelle Beratung gewünscht?"
CTA: "Kostenlos beraten lassen" → /kontakt
```

## 🎨 Design-System

### Colors

```css
/* Primary */
#8B1B23     - Burgundy Red (Borders, Buttons, Badges)

/* Backgrounds */
white       - Cards
gray-50     - Gradient Background
gray-100    - Standard Button
gray-200    - Toggle Background

/* Text */
gray-900    - Headlines
gray-700    - Body Text
gray-600    - Muted Text
gray-500    - Price Details

/* Special */
#f59e0b     - Orange (AZAV Badge)
#25D366     - Green (WhatsApp, not used here)
```

### Typography

**Headlines:**
```css
font-outfit text-5xl md:text-6xl font-bold
```

**Body:**
```css
font-dmSans text-xl text-gray-600
```

**Card Title:**
```css
font-outfit text-2xl font-bold text-gray-900
```

**Price:**
```css
font-outfit text-4xl font-bold text-gray-900
```

### Spacing

```css
Container: max-w-7xl
Section Padding: py-24 px-4
Card Padding: p-8
Grid Gap: gap-8
```

## 📊 Sanity Integration

### Schema Updates

**pricing.ts - Neue Felder:**

1. **category:**
```tsx
type: "string"
options: [
  { title: "Privat (PKW, Motorrad)", value: "privat" },
  { title: "Gewerblich (LKW, Bus)", value: "gewerblich" }
]
```

2. **azavCertified:**
```tsx
type: "boolean"
description: "Ist diese Ausbildung AZAV-zertifiziert?"
initialValue: false
```

### Data Fetching

**Server Component (page.tsx):**
```tsx
export const revalidate = 3600; // ISR: 1 Stunde

export default async function PreisePage() {
  const pricingData = await client.fetch(ALL_PRICING_QUERY);
  
  return (
    <main>
      <PriceList pricingData={pricingData} />
    </main>
  );
}
```

**Query:**
```tsx
ALL_PRICING_QUERY = groq`
  *[_type == "pricing" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    licenseClass,
    category,
    description,
    basePrice,
    priceDetails,
    highlights,
    popular,
    azavCertified
  }
`;
```

### Type Safety

```tsx
interface PricingData {
  _id: string;
  name: string;
  licenseClass: string;
  category: "privat" | "gewerblich";
  description: string;
  basePrice: number;
  priceDetails?: string;
  highlights: string[];
  popular?: boolean;
  azavCertified?: boolean;
}
```

## 🎬 Animations

### Toggle Switch Animation

```tsx
<motion.div
  className="absolute top-1 bottom-1 bg-[#8B1B23] rounded-full"
  animate={{
    left: selectedCategory === "privat" ? "4px" : "calc(50%)",
    right: selectedCategory === "privat" ? "calc(50%)" : "4px",
  }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

### Grid Transition

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={selectedCategory}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
```

### Card Entrance

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
```

### Hover Effect

```tsx
whileHover={{ scale: 1.03, y: -8 }}
```

## 🚀 Usage

### Seite aufrufen

```
https://deine-domain.de/preise
```

### Mit Sanity-Daten

1. **In Sanity Studio:**
   - Pricing-Dokumente erstellen
   - category: "privat" oder "gewerblich"
   - popular: true für Klasse B
   - azavCertified: true für LKW/Bus

2. **Beispiel-Daten:**

**Klasse B (Privat, Popular):**
```json
{
  "name": "Führerschein Klasse B",
  "licenseClass": "B",
  "category": "privat",
  "description": "Der klassische PKW-Führerschein...",
  "basePrice": 2800,
  "highlights": [
    "Theorieunterricht inklusive",
    "Fahrsimulator-Training",
    "E-Auto oder konventionelles Fahrzeug"
  ],
  "popular": true,
  "azavCertified": false
}
```

**Klasse C (Gewerblich, AZAV):**
```json
{
  "name": "LKW-Führerschein Klasse C",
  "licenseClass": "C",
  "category": "gewerblich",
  "description": "Für schwere LKW über 7,5t...",
  "basePrice": 4500,
  "highlights": [
    "Professionelle LKW-Ausbildung",
    "Mercedes Actros Flotte",
    "Förderung über AZAV möglich"
  ],
  "popular": false,
  "azavCertified": true
}
```

### CTA Flow

```
User klickt "Details anfragen"
  ↓
Weiterleitung zu /kontakt?class=B
  ↓
Kontaktformular öffnet sich
  ↓
Dropdown ist vorselektiert mit "Klasse B"
  ↓
User füllt restliche Daten aus
```

## 💡 Best Practices

### Performance

1. **ISR (Incremental Static Regeneration):**
   ```tsx
   export const revalidate = 3600; // 1h
   ```

2. **Image Optimization:**
   - Keine externen Bilder (nur Icons)
   - Lucide React (Tree-Shakeable)

3. **Code Splitting:**
   - Client Component nur für interaktive Teile
   - Server Component für Data Fetching

### SEO

```tsx
export const metadata: Metadata = {
  title: "Preise & Führerscheinklassen | Manni's Fahrschule",
  description: "Transparente Preise für alle Führerscheinklassen...",
  keywords: [
    "Führerschein Preise",
    "Fahrschule Kosten",
    "Klasse B Preis",
    "LKW Führerschein",
    "AZAV Förderung"
  ],
};
```

### Accessibility

1. **Semantic HTML:**
   ```tsx
   <section>, <h1>, <button>, <Link>
   ```

2. **Keyboard Navigation:**
   - Toggle-Switch mit Buttons
   - Links mit proper href

3. **ARIA:**
   - Implicit durch semantic tags
   - Könnte erweitert werden mit aria-label

### User Experience

1. **Clear Categorization:**
   - Privat vs. Gewerblich
   - Keine Verwirrung

2. **Highlighting:**
   - Popular (Klasse B)
   - AZAV (LKW/Bus)
   - Klar erkennbar

3. **Direct Action:**
   - "Details anfragen" Button
   - Pre-filled Kontaktformular
   - Seamless Flow

## 🔧 Anpassungen

### Toggle-Text ändern

```tsx
<button>
  Privat (PKW, Motorrad)  // ← Hier
</button>
<button>
  Gewerblich (LKW, Bus)   // ← Hier
</button>
```

### Hover-Effekt anpassen

```tsx
whileHover={{ 
  scale: 1.03,  // Größer: 1.05, Kleiner: 1.02
  y: -8         // Mehr: -12, Weniger: -5
}}
```

### Badge-Farben ändern

```tsx
// AZAV Badge
bg-[#f59e0b]  // Orange
// Andere Farbe: bg-[#10b981] (Grün)

// Popular Badge
bg-[#8B1B23]  // Burgundy
```

### Grid-Spalten anpassen

```tsx
// Mehr Karten pro Reihe (Desktop)
lg:grid-cols-4  // Statt lg:grid-cols-3

// Weniger
lg:grid-cols-2
```

## 📱 Responsive Behavior

### Mobile (< 768px)
- 1 Spalte
- Volle Breite
- Stacked Layout
- Toggle horizontal scrollbar (falls zu lang)

### Tablet (≥ 768px)
- 2 Spalten
- Balanced Layout

### Desktop (≥ 1024px)
- 3 Spalten
- Optimale Lesbarkeit
- Hover-Effekte voll sichtbar

## 🎯 Key Features Checklist

✅ **Toggle-Switch** (Privat/Gewerblich)  
✅ **Bento-Grid Layout** (Responsive)  
✅ **Sanity Integration** (ISR, 1h revalidate)  
✅ **Popular Badge** (Klasse B, roter Glow)  
✅ **AZAV Badge** (LKW/Bus, Orange)  
✅ **Highlights Checkliste** (Check Icons)  
✅ **Hover Scale-Up** (Framer Motion)  
✅ **CTA mit Query-Parameter** (/kontakt?class=X)  
✅ **Info Banner** (Bottom CTA)  
✅ **Smooth Animations** (Toggle, Grid, Cards)  
✅ **Type Safety** (TypeScript Interfaces)  
✅ **SEO Metadata** (Title, Description, Keywords)  

## 🐛 Troubleshooting

### Toggle funktioniert nicht
- Check: `selectedCategory` State
- Verify: `setSelectedCategory` onClick

### Keine Daten angezeigt
- Sanity Studio: Mindestens 1 Pricing-Dokument
- `isActive: true` in Sanity
- Query testen in Vision

### Hover-Effekt ruckelt
- Reduce scale: 1.02 statt 1.03
- Erhöhe damping: 30 → 40

### Cards unterschiedliche Höhe
- Add: `h-full` zur Card
- Check: Highlights Anzahl konsistent

## 📚 Weiterführende Docs

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Sanity GROQ Queries](https://www.sanity.io/docs/groq)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

## 🚀 Production Checklist

### Vor Go-Live:

1. **Sanity Studio:**
   - [ ] Alle Pricing-Dokumente erstellt
   - [ ] Kategorien korrekt zugewiesen
   - [ ] Popular & AZAV Flags gesetzt
   - [ ] Highlights vollständig
   - [ ] Preise aktuell

2. **Kontaktformular:**
   - [ ] /kontakt Seite implementieren
   - [ ] Query-Parameter verarbeiten
   - [ ] Dropdown mit Klassen prefilled

3. **Testing:**
   - [ ] Toggle-Switch funktioniert
   - [ ] Alle Karten werden angezeigt
   - [ ] Links funktional
   - [ ] Mobile responsiv
   - [ ] Hover-Effekte smooth

4. **SEO:**
   - [ ] Metadata complete
   - [ ] URLs clean
   - [ ] Structured Data (optional)

5. **Performance:**
   - [ ] ISR funktioniert
   - [ ] Keine Console Errors
   - [ ] Lighthouse Score > 90

## ✨ Fazit

Die Preise-Seite bietet:
- Klare Trennung Privat/Gewerblich
- Transparente Preise mit Features
- Hervorhebung beliebter Klassen
- AZAV-Kennzeichnung für Förderung
- Direkte Kontaktmöglichkeit
- Smooth Animations & UX
- Full Sanity CMS Integration

Perfekt für eine moderne, benutzerfreundliche Fahrschul-Website! 🚗✨
