# TheorySchedule Component - Dokumentation

Premium-Design Komponente für die Anzeige von Theorie-Blockwochen im dunklen Bento-Grid Layout.

## 🎨 Design Features

### Farbschema
- **Hintergrund:** Anthrazit (#1a1a1a)
- **Karten:** Dunkelgrau (#2a2a2a)
- **Text:** Weiß mit verschiedenen Opacity-Stufen
- **Primärfarbe:** #8B1B23 (Burgundy Red)
- **Akzentfarben:**
  - Verfügbar: #10b981 (Grün)
  - Wenige Plätze: #f59e0b (Orange/Amber)
  - Ausgebucht: #6b7280 (Grau)

### Status-basierte Effekte

#### Status: "available" (Verfügbar)
- ✅ Normale Karten-Opacity
- ✅ Grüne Akzente
- ✅ CheckCircle2 Icon
- ✅ Hover-Effekte aktiv
- ✅ Primärfarbe #8B1B23 auf CTA Button

#### Status: "limited" (Wenige Plätze)
- ⚠️ **Pulsierender Glow-Effekt** um die Karte
- ⚠️ Orange/Amber Farbschema
- ⚠️ AlertTriangle Icon (Warn-Icon)
- ⚠️ Doppelter Pulsier-Effekt (gestaffelt)
- ⚠️ Orange CTA Button mit "Jetzt schnell sichern!"
- ⚠️ Platz-Anzeige in Orange

#### Status: "full" (Ausgebucht)
- ❌ Karte auf 60% Opacity reduziert
- ❌ Alle Texte ausgegraut (white/30 - white/50)
- ❌ XCircle Icon
- ❌ Kein Hover-Effekt
- ❌ Button disabled
- ❌ "Ausgebucht" Text auf Button

## 🏗️ Komponenten-Struktur

```tsx
<TheorySchedule terms={terms} />
```

### Props

```typescript
interface TheoryScheduleProps {
  terms: TheoryTerm[];
}
```

### TheoryTerm Type
```typescript
interface TheoryTerm {
  _id: string;
  title: string;
  month: string;
  startDate: string;
  endDate: string;
  totalSpots: number;
  availableSpots: number;
  status: "available" | "limited" | "full";
  location: "herrsching" | "tutzing";
  description?: string;
}
```

## 🎯 Card Layout

Jede Karte enthält:

1. **Status Badge** (Top Right)
   - Icon + Label
   - Farbcodiert nach Status
   - Bei "limited": Border + Glow

2. **Month Badge** (Top Left)
   - Calendar Icon
   - Monat in Primärfarbe
   - Abgerundete Ecken

3. **Title**
   - Große, fette Schrift
   - Font: Outfit

4. **Date Range Display**
   - Start- und Enddatum
   - Große Zahlen (3xl)
   - Pfeil-Separator in Primärfarbe
   - "Start" und "Ende" Labels

5. **Location**
   - MapPin Icon
   - Kapitalisierter Standort

6. **Spots Counter**
   - Users Icon
   - Verfügbare/Gesamt Plätze
   - Farbcodiert nach Status
   - Border bei nicht ausgebucht

7. **Progress Bar**
   - Animiert beim Einblenden
   - Zeigt Füllstand
   - Farbcodiert nach Status

8. **Description** (optional)
   - Kleinere Schrift
   - Reduzierte Opacity

9. **CTA Button**
   - Volle Breite
   - Text ändert sich je nach Status
   - Shadow-Effekte
   - Hover + Tap Animationen

## 📐 Grid Layout

- **Mobile:** 1 Spalte
- **Tablet (md):** 2 Spalten
- **Desktop (lg):** 3 Spalten
- **Gap:** 4-6 zwischen Karten

## ✨ Animationen

### Framer Motion Effects

1. **Card Entrance**
   - Opacity: 0 → 1
   - Y-Position: 20 → 0
   - Staggered Delay: index * 0.08s

2. **Status Badge**
   - Scale: 0 → 1
   - Delay: index * 0.08s + 0.2s

3. **Progress Bar**
   - Width: 0 → calculated %
   - Duration: 1s
   - Delay: index * 0.08s + 0.3s

4. **Pulsierender Glow** (nur bei "limited")
   - CSS: `animate-pulse`
   - 2 Layers für Depth
   - Gestaffeltes Timing

5. **Button Interactions**
   - whileHover: scale 1.02
   - whileTap: scale 0.98
   - Disabled bei "full"

## 🎨 CSS Classes & Utilities

### Tailwind Custom Values
```css
bg-[#1a1a1a]  /* Section Background */
bg-[#2a2a2a]  /* Card Background */
text-[#8B1B23] /* Primary Color */
```

### Opacity Patterns
- `text-white` - Haupttext (100%)
- `text-white/90` - Sekundärer Text (90%)
- `text-white/70` - Tertiärer Text (70%)
- `text-white/60` - Grauer Text (60%)
- `text-white/50` - Sehr grau (50%)
- `text-white/40` - Ausgegraut (40%)
- `text-white/30` - Stark ausgegraut (30%)
- `text-white/20` - Ultra-grau (20%)

## 🔧 Verwendung

### Basis-Verwendung

```tsx
import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import TheorySchedule from "@/components/sections/TheorySchedule";

export default async function Page() {
  const terms = await client.fetch(THEORY_TERMS_QUERY);
  
  return <TheorySchedule terms={terms} />;
}
```

### Mit ISR

```tsx
export const revalidate = 1800; // 30 Minuten

export default async function Page() {
  const terms = await client.fetch(THEORY_TERMS_QUERY);
  
  return (
    <main className="bg-[#1a1a1a]">
      <TheorySchedule terms={terms} />
    </main>
  );
}
```

## 🎯 Status-Logik

Die Komponente reagiert automatisch auf den `status` Wert aus Sanity:

```typescript
const STATUS_CONFIG = {
  available: {
    label: "Verfügbar",
    icon: CheckCircle2,
    color: "#10b981",
    glow: false,
  },
  limited: {
    label: "Wenige Plätze",
    icon: AlertTriangle,
    color: "#f59e0b",
    glow: true,
  },
  full: {
    label: "Ausgebucht",
    icon: XCircle,
    color: "#6b7280",
    glow: false,
  },
};
```

## 🎨 Pulsierender Glow-Effekt

Der Glow bei "limited" Status besteht aus 2 Layern:

```tsx
{isLimited && (
  <>
    {/* Layer 1 - Outer Glow */}
    <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-20 blur-xl animate-pulse" />
    
    {/* Layer 2 - Inner Glow (verzögert) */}
    <div 
      className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-10 animate-pulse" 
      style={{ animationDelay: '0.5s' }} 
    />
  </>
)}
```

## 📱 Responsive Verhalten

- **Text-Größen** passen sich an (2xl → 3xl)
- **Padding** vergrößert sich (p-6 → p-8)
- **Grid** passt Spalten an
- **Icons** bleiben konsistent

## 🎁 Bonus Features

- Empty State Handling (keine Termine)
- Datum-Formatierung mit Intl
- Progress Bar basierend auf Spots
- Accessibility-freundliche Buttons
- TypeScript Type-Safety

## 🚀 Routes

Die Komponente ist verfügbar unter:
- `/theorie` - Dedizierte Page mit dunklem Background

## 💡 Best Practices

1. **Immer mit dunklem Background nutzen** (`bg-[#1a1a1a]`)
2. **Revalidation setzen** für frische Daten
3. **Status in Sanity korrekt pflegen**
4. **Beschreibungen kurz halten** (max 1-2 Sätze)
5. **availableSpots <= totalSpots** sicherstellen

## 🎨 Design-Philosophie

- **Premium & Modern** - Dunkles UI mit subtilen Glows
- **Status-fokussiert** - Sofortige visuelle Unterscheidung
- **Attention-grabbing** - Pulsierender Glow bei knappen Plätzen
- **Accessibility** - Klare Kontraste trotz dunklem Theme
- **Responsive** - Funktioniert auf allen Devices

## 🔄 Vergleich zu TheoryTermsSection

| Feature | TheorySchedule | TheoryTermsSection |
|---------|----------------|-------------------|
| Background | Anthrazit (dunkel) | Hell/Standard |
| Glow-Effekt | ✅ Ja (limited) | ❌ Nein |
| Design | Premium/Dark | Standard/Light |
| Status-Visual | Sehr prominent | Subtil |
| Zielgruppe | Landing Pages | Content Pages |
