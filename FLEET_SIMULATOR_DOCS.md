# FleetAndSimulator Component - Dokumentation

Premium Sektion für Fahrsimulatoren und Fuhrpark mit GSAP-Animationen und Parallax-Effekten.

## 🎨 Design-Features

### Farbschema
- **Hintergrund:** Sehr dunkel (#0a0a0a)
- **Karten:** Weiß (maximaler Kontrast)
- **Simulator-Sektion:** Anthrazit (#2a2a2a → #1a1a1a Gradient)
- **Akzent:** Burgundy Red (#8B1B23)
- **Elektro-Badge:** Grün (green-500)

### Dunkles Design mit Burgundy Glow
```css
/* Simulator Section */
bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]
border border-[#8B1B23]/30

/* Glow Effekte */
bg-[#8B1B23]/20 blur-3xl animate-pulse
```

### Weiße Karten (Maximaler Kontrast)
```css
bg-white
shadow-2xl
hover:shadow-[#8B1B23]/20
```

## 🎮 Simulator-Highlight Section

### Full-Width Layout
- Backdrop-blur Container
- Gradient Background (Anthrazit)
- Burgundy Border mit 30% Opacity
- Padding: 8 (Mobile) → 16 (Desktop)

### Glow-Effekte
- 2 pulsierende Glow-Circles
- Top-Right und Bottom-Left Position
- 3xl Blur
- Gestaffeltes Timing (1s delay)

### Content Structure
1. **Badge:** "Premium Ausstattung" mit MonitorPlay Icon
2. **Headline:** "3 High-End Fahrsimulatoren" (Outfit Font, 4xl → 6xl)
3. **Subline:** "Stressfrei die Grundlagen lernen – Sicher in die Praxis"
4. **Features Grid:** 3 Spalten mit Icons
5. **CTA Button:** "Mehr über Simulatoren"

### Features (Icons von Lucide)
```tsx
{
  icon: Shield,
  title: "Stressfreies Lernen",
  description: "Fehler machen ohne Konsequenzen"
},
{
  icon: Gauge,
  title: "Realistische Szenarien",
  description: "Gefahrensituationen sicher üben"
},
{
  icon: Zap,
  title: "Schnellerer Fortschritt",
  description: "Mehr Übungszeit, weniger Kosten"
}
```

## 🚗 Fuhrpark-Grid Section

### Elektro-Badge (Prominent)
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40">
  <Leaf size={20} className="text-green-400" />
  <Battery size={20} className="text-green-400" />
  <span>{electricCount}+ Elektro- & Hybrid-Fahrzeuge</span>
</div>
```

**Dynamische Zählung:**
- Automatische Berechnung der Elektro/Hybrid-Fahrzeuge
- Anzeige im Badge

### Kategorien

#### PKW (Car Icon)
1. **VW ID.3** (Elektro)
   - 100% Elektrisch
   - Reichweite 420 km
   - Automatik

2. **VW Golf** (Hybrid)
   - Plug-in Hybrid
   - Umweltfreundlich
   - Modern

3. **VW Polo** (Benzin)
   - Kompakt
   - Wendig
   - Perfekt für Anfänger

#### Motorrad (Bike Icon)
1. **Kawasaki Z650** (Klasse A2)
   - 48 PS
   - 649 ccm
   - Modern & Sportlich

2. **Honda CB500F** (Klasse A2)
   - 47 PS
   - 471 ccm
   - Einsteiger-freundlich

#### LKW (Truck Icon)
1. **Mercedes Actros** (Klasse C/CE)
   - Moderne Technik
   - Komfort-Kabine
   - Profi-Ausbildung

### Horizontal Scroll
```css
overflow-x-auto
scrollbar-hide
snap-x snap-mandatory
flex gap-6
```

**Features:**
- Smooth Scroll
- Snap-Points
- Hidden Scrollbar
- Mobile-optimiert

### Fahrzeug-Karten (Weiß)
```tsx
<div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-[#8B1B23]/20 hover:scale-105">
  {/* Content */}
</div>
```

**Aufbau:**
1. **Elektro-Badge** (Top-Right) - nur bei Elektro/Hybrid
2. **Icon** - Kategorie-Icon in Burgundy-Gradient
3. **Name** - Outfit Font, 2xl
4. **Type** - z.B. "Elektro", "Klasse A2"
5. **Specs** - 3 Bullet-Points
6. **Hover-Arrow** - "Details ansehen"

**Hover-Effekte:**
- Scale: 1 → 1.05
- Shadow: 2xl → [#8B1B23]/20
- Parallax-Gradient: opacity 0 → 100
- Arrow: opacity 0 → 100, translate-x

## ✨ GSAP Animationen

### 1. Simulator Section Fade-In
```tsx
gsap.from(simulatorRef.current.children, {
  scrollTrigger: {
    trigger: simulatorRef.current,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});
```

**Effekt:**
- Kinder-Elemente erscheinen nacheinander
- Von unten nach oben (y: 50 → 0)
- Stagger: 0.2s zwischen Elementen
- Smooth ease-out

### 2. Vehicle Cards Stagger
```tsx
gsap.from(vehicleCardsRef.current, {
  scrollTrigger: {
    trigger: vehicleCardsRef.current[0],
    start: "top 85%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  scale: 0.9,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});
```

**Effekt:**
- Alle Fahrzeug-Karten animieren nacheinander
- Von unten nach oben (y: 60 → 0)
- Scale: 0.9 → 1 (Pop-in)
- Stagger: 0.15s zwischen Karten

### 3. Parallax Background
```tsx
gsap.to(parallaxRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
  y: -100,
  ease: "none",
});
```

**Effekt:**
- Background bewegt sich langsamer als Content
- Scrub: 1 für smooth Parallax
- Y-Movement: 0 → -100

## 📱 Responsive Design

### Mobile
- 1 Spalte für Features
- Horizontal Scroll für Fahrzeuge
- Snap-Points für besseres UX
- Scroll-Indicator (Dots)

### Tablet (md)
- 3 Spalten für Features
- Horizontal Scroll bleibt
- Größere Cards

### Desktop
- Volle Breite genutzt
- Alle Features sichtbar
- Smooth Scroll-Effekte

## 🎨 Icon-Verwendung (Lucide React)

### Simulator-Icons
```tsx
import {
  MonitorPlay,    // Simulator Badge
  Shield,         // Stressfrei
  Gauge,          // Realistische Szenarien
  Zap,            // Schneller Fortschritt
} from "lucide-react";
```

### Fuhrpark-Icons
```tsx
import {
  Leaf,           // Umwelt
  Battery,        // Elektro
  Car,            // PKW
  Bike,           // Motorrad
  Truck,          // LKW
  ChevronRight,   // CTA Arrow
} from "lucide-react";
```

**KEINE Emojis verwendet** ✅

## 🎯 Datenstruktur

```tsx
const VEHICLES = [
  {
    category: "PKW",
    icon: Car,
    vehicles: [
      {
        name: "VW ID.3",
        type: "Elektro",
        specs: ["...", "...", "..."],
        isElectric: true,
      },
      // ...
    ],
  },
  // ...
];
```

## 🔧 GSAP Setup

### Plugin Registration
```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Cleanup
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animations
  }, sectionRef);

  return () => ctx.revert(); // Cleanup
}, []);
```

## 🎨 Custom Scrollbar Styling

```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

## 📐 Layout-Struktur

```
<section> (bg-[#0a0a0a])
  ├── Parallax Background (Gradient)
  ├── Simulator Section
  │   ├── Glow Effects (2x)
  │   ├── Badge
  │   ├── Headline
  │   ├── Subline
  │   ├── Features Grid (3 cols)
  │   └── CTA Button
  └── Fleet Section
      ├── Elektro-Badge
      ├── Headline
      ├── Categories (foreach)
      │   ├── Category Header
      │   └── Horizontal Scroll
      │       └── Vehicle Cards (white)
      └── Bottom CTA
```

## 💡 Best Practices

### Performance
1. **GSAP Context** für Cleanup
2. **ScrollTrigger** nur bei Bedarf
3. **Refs** für DOM-Zugriff
4. **SSR-Check** vor Plugin-Registration

### Accessibility
1. **Semantische Tags** (`<section>`)
2. **Alt-Tags** für Bilder (wenn hinzugefügt)
3. **Keyboard-Navigation** für Scroll
4. **Focus-States** für Buttons

### Code-Qualität
1. **TypeScript** für Type-Safety
2. **Lucide Icons** statt Emojis
3. **Konstanten** ausgelagert
4. **DRY-Prinzip** beachtet

## 🚀 Integration

### In Homepage
```tsx
import { FleetAndSimulator } from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FleetAndSimulator />
      <LicenseConfigurator />
    </main>
  );
}
```

## 🎨 Farbpalette

```css
/* Backgrounds */
#0a0a0a  /* Section Background (sehr dunkel) */
#2a2a2a  /* Simulator Start */
#1a1a1a  /* Simulator End */
#ffffff  /* Fahrzeug-Karten */

/* Accents */
#8B1B23  /* Burgundy Red */
#10b981  /* Grün (Elektro) */

/* Transparenzen */
[#8B1B23]/20  /* Glow */
[#8B1B23]/30  /* Border */
[#8B1B23]/40  /* Hover */
white/5       /* Subtle BG */
white/10      /* Border */
white/60      /* Text */
white/70      /* Subline */
```

## ✨ Animation Timeline

1. **Page Load:** Nothing (nur bei Scroll)
2. **Scroll to Simulator:** Children fade-in (stagger 0.2s)
3. **Scroll to Fleet:** Cards fade-in + scale (stagger 0.15s)
4. **Throughout:** Parallax background movement (scrub)
5. **Hover:** Card scale + shadow

## 🎯 Key Features

- ✅ Dunkles Design (#0a0a0a)
- ✅ Burgundy Glow-Effekte
- ✅ Weiße Karten (maximaler Kontrast)
- ✅ GSAP Stagger-Animationen
- ✅ Parallax Background
- ✅ Horizontal Scroll
- ✅ Elektro-Badge (43+)
- ✅ Lucide Icons (keine Emojis)
- ✅ Kategorien: PKW, Motorrad, LKW
- ✅ Spezifische Modelle
- ✅ Responsive Design
- ✅ Smooth Scroll
- ✅ Hover-Effekte

## 📊 Fahrzeug-Count

**Aktuell:**
- PKW: 3 (2 Elektro/Hybrid)
- Motorrad: 2
- LKW: 1
- **Total Elektro/Hybrid:** 2

**Badge zeigt:** "2+ Elektro- & Hybrid-Fahrzeuge"

Um auf 43+ zu kommen, mehr Fahrzeuge im Array hinzufügen!

## 🔧 Erweiterungen

### Mehr Fahrzeuge hinzufügen
```tsx
{
  category: "PKW",
  vehicles: [
    // Bestehende...
    {
      name: "Audi e-tron",
      type: "Elektro",
      specs: ["100% Elektrisch", "..."],
      isElectric: true,
    },
  ],
}
```

### Bilder hinzufügen
```tsx
{
  name: "VW ID.3",
  image: "/images/vehicles/vw-id3.jpg",
  // ...
}
```

Dann im JSX:
```tsx
<Image 
  src={vehicle.image} 
  alt={vehicle.name}
  className="w-full h-48 object-cover rounded-xl mb-4"
/>
```

### Sanity Integration
```tsx
// Fahrzeuge aus Sanity laden
const vehicles = await client.fetch(VEHICLES_QUERY);
```
