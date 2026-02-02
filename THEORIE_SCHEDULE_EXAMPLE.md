# TheorySchedule - Verwendungs-Beispiele

## 🎯 Komplettes Beispiel mit Sanity-Daten

### Server Component mit ISR

```tsx
// app/theorie/page.tsx
import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import type { TheoryTerm } from "@/lib/sanity/types";
import TheorySchedule from "@/components/sections/TheorySchedule";

export const metadata = {
  title: "Theorie-Blockwochen - Manni's Fahrschule",
  description: "Aktuelle Theorie-Blockwochen in Herrsching und Tutzing.",
};

// Revalidate alle 30 Minuten
export const revalidate = 1800;

export default async function TheoriePage() {
  const terms = await client.fetch<TheoryTerm[]>(THEORY_TERMS_QUERY);

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <TheorySchedule terms={terms} />
    </main>
  );
}
```

### Auf der Homepage (Ausschnitt)

```tsx
// app/page.tsx
import { client } from "@/lib/sanity";
import { UPCOMING_THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import { Hero, LicenseConfigurator, TheorySchedule } from "@/components/sections";

export default async function HomePage() {
  // Nur die nächsten 3 Termine für Homepage
  const upcomingTerms = await client.fetch(UPCOMING_THEORY_TERMS_QUERY);

  return (
    <main>
      <Hero />
      <LicenseConfigurator />
      
      {/* Dunkle Sektion mit Theorie-Terminen */}
      <div className="bg-[#1a1a1a]">
        <TheorySchedule terms={upcomingTerms} />
      </div>
    </main>
  );
}
```

## 🎨 Design-Integration

### Dunkle Section in heller Page

```tsx
export default function Page() {
  return (
    <>
      {/* Helle Sections */}
      <section className="bg-white py-24">
        {/* Content */}
      </section>

      {/* Dunkle Theory Schedule Section */}
      <div className="bg-[#1a1a1a]">
        <TheorySchedule terms={terms} />
      </div>

      {/* Weitere helle Sections */}
      <section className="bg-white py-24">
        {/* Content */}
      </section>
    </>
  );
}
```

## 📊 Mock Data für Testing

Falls du die Komponente testen möchtest ohne Sanity:

```tsx
const mockTerms: TheoryTerm[] = [
  {
    _id: "1",
    title: "Theorie-Blockwoche März",
    month: "März 2026",
    startDate: "2026-03-15",
    endDate: "2026-03-21",
    totalSpots: 20,
    availableSpots: 15,
    status: "available",
    location: "herrsching",
    description: "Intensive Theorieausbildung in einer Woche",
  },
  {
    _id: "2",
    title: "Theorie-Blockwoche April",
    month: "April 2026",
    startDate: "2026-04-12",
    endDate: "2026-04-18",
    totalSpots: 20,
    availableSpots: 3,
    status: "limited",
    location: "tutzing",
    description: "Nur noch wenige Plätze verfügbar!",
  },
  {
    _id: "3",
    title: "Theorie-Blockwoche Mai",
    month: "Mai 2026",
    startDate: "2026-05-10",
    endDate: "2026-05-16",
    totalSpots: 20,
    availableSpots: 0,
    status: "full",
    location: "herrsching",
    description: "Diese Blockwoche ist bereits ausgebucht",
  },
];

export default function TestPage() {
  return <TheorySchedule terms={mockTerms} />;
}
```

## 🎯 Status-Werte in Sanity setzen

Im Sanity Studio beim Erstellen/Bearbeiten einer Theorie-Blockwoche:

### Status: "available" (Verfügbar)
- Setze wenn: **>5 Plätze** verfügbar
- Farbe: Grün
- Icon: Check Circle
- Kein Glow

### Status: "limited" (Wenige Plätze)
- Setze wenn: **1-5 Plätze** verfügbar
- Farbe: Orange/Amber
- Icon: Alert Triangle (Warn-Icon)
- **Pulsierender Glow** aktiviert

### Status: "full" (Ausgebucht)
- Setze wenn: **0 Plätze** verfügbar
- Farbe: Grau
- Icon: X Circle
- Karte ausgegraut (60% opacity)

## 🔄 Automatische Status-Logik (Optional)

Falls du den Status automatisch basierend auf Plätzen setzen möchtest:

```tsx
// utils/getTheoryTermStatus.ts
export function getTheoryTermStatus(
  availableSpots: number
): "available" | "limited" | "full" {
  if (availableSpots === 0) return "full";
  if (availableSpots <= 5) return "limited";
  return "available";
}
```

Dann in der Komponente:

```tsx
// Überschreibe den Sanity Status mit berechneten Wert
const calculatedStatus = getTheoryTermStatus(term.availableSpots);
const statusConfig = STATUS_CONFIG[calculatedStatus];
```

## 🎨 Custom Styling Anpassungen

### Andere Primärfarbe verwenden

Ersetze alle `#8B1B23` mit deiner Farbe:

```tsx
// Beispiel: Blau statt Rot
className="bg-[#1E40AF]/20 border border-[#1E40AF]/30"
className="text-[#1E40AF]"
```

### Helleres Theme

Für ein helleres Anthrazit:

```tsx
bg-[#2a2a2a] → bg-[#3a3a3a]
bg-[#1a1a1a] → bg-[#252525]
```

### Kein Glow bei "limited"

Entferne einfach diesen Block:

```tsx
{isLimited && (
  <>
    <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-20 blur-xl animate-pulse" />
    <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
  </>
)}
```

## 🚀 Performance-Tipps

### 1. ISR für bessere Performance

```tsx
// Revalidate basierend auf Frequenz der Änderungen
export const revalidate = 1800; // 30 Minuten
```

### 2. Nur nötige Termine laden

```tsx
// Für Homepage: Nur nächste 3
const terms = await client.fetch(UPCOMING_THEORY_TERMS_QUERY);

// Für dedizierte Seite: Alle
const terms = await client.fetch(THEORY_TERMS_QUERY);
```

### 3. Loading State

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<TheoryScheduleSkeleton />}>
      <TheoryScheduleWrapper />
    </Suspense>
  );
}
```

## 🎯 Call-to-Action anpassen

Der Button-Text ändert sich automatisch:

```tsx
// Status: available
"Jetzt anmelden"

// Status: limited (Urgency!)
"Jetzt schnell sichern!"

// Status: full
"Ausgebucht"
```

Falls du andere Texte möchtest, passe dies an:

```tsx
{isFullyBooked
  ? "Warteliste"  // Custom Text
  : isLimited
  ? "Nur noch wenige Plätze!"  // Custom Text
  : "Kostenlos anmelden"}  // Custom Text
```

## 📱 Mobile Optimierungen

Die Komponente ist bereits responsive, aber du kannst:

```tsx
// Kleinere Text-Größen auf Mobile
className="text-2xl md:text-3xl"  // Title
className="text-xl md:text-2xl"   // Spots counter

// Weniger Padding auf Mobile
className="p-4 md:p-6 lg:p-8"
```

## ✨ Zusätzliche Animationen

### Hover-Lift-Effekt

```tsx
<motion.div
  whileHover={{ y: isFullyBooked ? 0 : -4 }}
  transition={{ duration: 0.2 }}
>
  {/* Card Content */}
</motion.div>
```

### Stagger Children

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {terms.map((term) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {/* Card */}
    </motion.div>
  ))}
</motion.div>
```

## 🎨 Integration mit Navigation

```tsx
// components/Navigation.tsx
<Link 
  href="/theorie"
  className="text-white hover:text-[#8B1B23] transition-colors"
>
  Theorie-Termine
</Link>
```

## 📊 Analytics einbauen

```tsx
<button
  onClick={() => {
    // Track Button Click
    gtag('event', 'theory_term_click', {
      term_id: term._id,
      term_month: term.month,
      available_spots: term.availableSpots,
    });
  }}
>
  Jetzt anmelden
</button>
```
