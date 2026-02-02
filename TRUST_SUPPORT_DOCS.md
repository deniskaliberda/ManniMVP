# TrustAndSupport Component - Dokumentation

Beruhigende Sektion für Prüfungsangst, Social Proof und Testimonials mit hellem Design.

## 🎨 Design-Philosophie

### Helles Design als Kontrast
- **Hintergrund:** #FAFAFA (sehr helles Grau)
- **Karten:** Weiß (#FFFFFF)
- **Akzente:** #8B1B23 (Burgundy Red)
- **Ziel:** Ruhe und Vertrauen ausstrahlen

### Negative Space
- Großzügige Abstände zwischen Elementen
- Viel Weißraum für Lesbarkeit
- Reduzierte visuelle Komplexität
- Fokus auf Content

### Weiche Übergänge
- Lange Transition-Zeiten (500ms)
- Smooth Hover-Effekte
- Sanfte Animationen
- Keine harten Schnitte

## 📋 Struktur

### 1. Prüfungsangst-Bereich

#### Header
```tsx
<h2>
  Prüfungsangst? <span>Du bist nicht allein.</span>
</h2>
<p>
  Fast jeder zweite Fahrschüler ist extrem nervös.
  <strong>Wir nehmen uns Zeit.</strong>
</p>
```

**Badge:** "Wir verstehen dich" mit Heart-Icon

#### Bento-Cards (3 Lösungen)

**1. Individuelle Vorbereitung** (Users Icon)
- Persönliche Betreuung
- Maßgeschneiderte Übungspläne
- Für deine Bedürfnisse

**2. Entspannungstechniken** (Brain Icon)
- Bewährte Methoden
- Stressbewältigung
- Mentale Vorbereitung

**3. Prüfungssimulation** (CheckCircle2 Icon)
- Realistische Prüfungssituationen
- Sicheres Üben
- Vertrauensaufbau

**Card-Features:**
- Weißer Hintergrund
- Rounded-3xl (große Rundungen)
- Shadow-lg → Shadow-2xl on hover
- Hover: Y-Translation -8px
- Accent-Line (top) mit Scale-Animation
- Icon in Burgundy mit 10% Background

### 2. Social Proof & Stats

**Große statische Zahlen:**

```
⏰ 25+
Jahre Erfahrung

📈 98%
Bestehensquote

⭐ 4.9
Google Sterne
```

**Design:**
- Gradient-Container (white → gray-50)
- Icons über den Zahlen
- Outfit Font für Zahlen (6xl → 7xl)
- Suffix in Burgundy Red
- Decorative Glow-Circles

**Grid:** 1 Spalte (Mobile) → 3 Spalten (Desktop)

### 3. Testimonial-Slider

#### Features
- **Auto-Advance:** 7 Sekunden
- **Manual Navigation:** Prev/Next Buttons
- **Dot-Indicators:** Click to jump
- **Smooth Transitions:** Framer Motion
- **Direction-aware:** Slide-in from correct side

#### Testimonial-Struktur
```tsx
{
  name: "Sophie M.",
  age: 19,
  license: "Klasse B",
  text: "Super entspannte Atmosphäre...",
  rating: 5,
}
```

**Display:**
1. 5 Sterne (filled) in Burgundy
2. Quote mit großer Schrift
3. Author mit Award-Icon
4. Alter + Führerscheinklasse

#### Navigation
- **Prev/Next Buttons:** Rounded, white mit Border
- **Dots:** Active = lange Linie, Inactive = kleine Punkte
- **Auto-Play:** 7s interval mit Reset bei manueller Navigation

## ✨ Framer Motion Animationen

### Card Hover Animation
```tsx
whileHover={{ y: -8, transition: { duration: 0.3 } }}
```

### Accent Line Animation
```tsx
transform scale-x-0 
group-hover:scale-x-100 
transition-transform duration-500
```

### Testimonial Slider Variants
```tsx
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};
```

**Spring Animation:**
```tsx
transition={{
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.3 },
}}
```

### Scroll-In Animations
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

**Stagger:** Delay zwischen Cards (0.15s)

## 🎨 Styling-Details

### Farbpalette
```css
/* Backgrounds */
#FAFAFA  /* Section */
#FFFFFF  /* Cards */
#F9FAFB  /* Gray-50 */

/* Accents */
#8B1B23  /* Burgundy Red */
#8B1B23/10  /* Light backgrounds */
#8B1B23/20  /* Borders */
#8B1B23/30  /* Shadows */

/* Text */
#111827  /* Gray-900 (Headlines) */
#4B5563  /* Gray-600 (Body) */
#6B7280  /* Gray-500 (Meta) */
```

### Border-Radius
```css
rounded-3xl   /* Cards: 24px */
rounded-2xl   /* Icons: 16px */
rounded-full  /* Buttons, Badges */
```

### Shadows
```css
shadow-lg     /* Normal */
shadow-2xl    /* Hover */
shadow-xl     /* Stats-Container */
```

### Typography
```css
/* Headlines */
font-outfit text-4xl md:text-5xl lg:text-6xl font-bold

/* Body */
font-dmSans text-xl md:text-2xl leading-relaxed

/* Stats */
font-outfit text-6xl md:text-7xl font-bold
```

## 📱 Responsive Design

### Mobile (< 768px)
- 1 Spalte für alle Grids
- Kleinere Text-Größen
- Kompakte Navigation
- Touch-optimiert

### Tablet (≥ 768px)
- 3 Spalten für Solutions
- 3 Spalten für Stats
- Größere Testimonials

### Desktop (≥ 1024px)
- Volle Breite genutzt
- Maximaler Weißraum
- Alle Hover-Effekte aktiv

## 🔧 Sanity Integration

### Schema: testimonial.ts

**Felder:**
- `name` - String (required)
- `age` - Number (15-99)
- `license` - String (z.B. "Klasse B")
- `text` - Text (50-500 Zeichen)
- `rating` - Number (1-5)
- `date` - Date
- `image` - Image (optional)
- `isActive` - Boolean
- `isFeatured` - Boolean
- `sortOrder` - Number

### Queries

**Alle Testimonials:**
```tsx
TESTIMONIALS_QUERY
```

**Hervorgehobene:**
```tsx
FEATURED_TESTIMONIALS_QUERY
```

**Mit Limit:**
```tsx
TESTIMONIALS_LIMIT_QUERY (Parameter: $limit)
```

### Integration in Komponente

```tsx
// Server Component
import { client } from "@/lib/sanity";
import { TESTIMONIALS_QUERY } from "@/lib/sanity/queries";
import type { Testimonial } from "@/lib/sanity/types";

export default async function Page() {
  const testimonials = await client.fetch<Testimonial[]>(TESTIMONIALS_QUERY);
  
  return <TrustAndSupport testimonials={testimonials} />;
}
```

**Aktuell:** Verwendet Placeholder-Daten

## 🎯 Best Practices

### Negative Space
```css
/* Großzügige Abstände */
py-24  /* Section Padding */
mb-16  /* Header Margin */
gap-6  /* Grid Gap */
p-12   /* Card Padding */
```

### Weiche Übergänge
```css
transition-all duration-500  /* Cards */
transition-colors duration-300  /* Icons */
transition-transform duration-500  /* Accent Line */
```

### Accessibility
```html
<button aria-label="Previous testimonial">
<button aria-label="Go to testimonial 1">
```

### Auto-Play mit Cleanup
```tsx
useEffect(() => {
  const timer = setInterval(handleNext, 7000);
  return () => clearInterval(timer);
}, []);
```

## 💡 Verwendung

### Basic (mit Placeholder-Daten)
```tsx
import { TrustAndSupport } from "@/components/sections";

<TrustAndSupport />
```

### Mit Sanity-Daten (Future)
```tsx
import { TrustAndSupport } from "@/components/sections";
import { client } from "@/lib/sanity";
import { TESTIMONIALS_QUERY } from "@/lib/sanity/queries";

export default async function Page() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY);
  
  return <TrustAndSupport testimonials={testimonials} />;
}
```

## 🎨 Icon-Mapping

```tsx
import {
  Heart,          // Prüfungsangst Badge
  Users,          // Individuelle Vorbereitung
  Brain,          // Entspannungstechniken
  CheckCircle2,   // Prüfungssimulation
  Clock,          // Jahre Erfahrung
  TrendingUp,     // Bestehensquote
  Star,           // Google Sterne, Rating
  Award,          // Testimonial Author
  Sparkles,       // Testimonials Badge
  ChevronLeft,    // Navigation
  ChevronRight,   // Navigation
} from "lucide-react";
```

## 📊 Stats-Customization

```tsx
const STATS = [
  {
    icon: Clock,
    number: "25+",
    label: "Jahre Erfahrung",
    suffix: "",
  },
  {
    icon: TrendingUp,
    number: "98",
    label: "Bestehensquote",
    suffix: "%",
  },
  {
    icon: Star,
    number: "4.9",
    label: "Google Sterne",
    suffix: "",
  },
];
```

**Anpassbar:**
- Icon
- Nummer (String für Formatierung)
- Label
- Suffix (z.B. "%", "+")

## 🎬 Animation-Timeline

1. **Page Load:** Nothing (scroll-based)
2. **Scroll to Section:** Header fade-in (0.6s)
3. **Cards:** Stagger fade-in + slide-up (0.15s delay)
4. **Stats:** Scale + fade-in (0.1s stagger)
5. **Testimonials:** Header fade-in
6. **Auto-Play:** Slide every 7s
7. **Hover:** Card lift -8px (0.3s)
8. **Hover:** Accent line scale-x (0.5s)

## ✨ Key Features

- ✅ Helles Design (#FAFAFA)
- ✅ Prüfungsangst-Bereich
- ✅ 3 Bento-Cards (Lösungen)
- ✅ Große Stats (25+, 98%, 4.9)
- ✅ Testimonial-Slider
- ✅ Auto-Advance (7s)
- ✅ Manual Navigation
- ✅ Dot-Indicators
- ✅ Framer Motion Animations
- ✅ Negative Space
- ✅ Weiche Übergänge
- ✅ Burgundy Akzente
- ✅ Lucide Icons
- ✅ Sanity Schema
- ✅ Responsive

## 🔄 Slider-Logik

### Direction-Aware Sliding
```tsx
const [direction, setDirection] = useState(0);

const handleNext = () => {
  setDirection(1);  // Slide from right
  setCurrentTestimonial((prev) => (prev + 1) % length);
};

const handlePrev = () => {
  setDirection(-1);  // Slide from left
  setCurrentTestimonial((prev) => (prev - 1 + length) % length);
};
```

### Auto-Advance mit Reset
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    handleNext();
  }, 7000);

  return () => clearInterval(timer);  // Cleanup
}, []);
```

**Reset:** Timer wird neu gestartet bei manueller Navigation durch `useEffect` dependency array.

## 🎯 Testimonial-Display

### Star Rating
```tsx
{[...Array(testimonial.rating)].map((_, i) => (
  <Star 
    key={i} 
    className="fill-[#8B1B23] text-[#8B1B23]" 
  />
))}
```

### Quote Formatting
```tsx
<p className="text-xl md:text-2xl">
  "{testimonial.text}"
</p>
```

### Author Info
```tsx
<div>{testimonial.name}</div>
<div>
  {testimonial.age} Jahre • {testimonial.license}
</div>
```

## 🚀 Erweiterungen

### Bilder hinzufügen
```tsx
{testimonial.image && (
  <Image 
    src={urlFor(testimonial.image).width(80).height(80).url()}
    alt={testimonial.name}
    className="w-20 h-20 rounded-full"
  />
)}
```

### Video-Testimonials
```tsx
{testimonial.video && (
  <video src={testimonial.video} controls />
)}
```

### Kategorien-Filter
```tsx
const [filter, setFilter] = useState<"all" | "pkw" | "motorrad">("all");

const filtered = testimonials.filter(t => 
  filter === "all" || t.license.includes(filter)
);
```

## 📝 Content-Tipps

### Prüfungsangst-Text
- **Empathisch:** "Du bist nicht allein"
- **Statistik:** "Fast jeder zweite Fahrschüler"
- **Lösung:** "Wir nehmen uns Zeit"
- **Konkret:** Spezifische Lösungen nennen

### Testimonials
- **Authentisch:** Echte Namen (Initialen)
- **Spezifisch:** Konkrete Details
- **Emotional:** Persönliche Erfahrung
- **Kurz:** 50-200 Wörter
- **Positiv:** Aber ehrlich

### Stats
- **Relevant:** Was zählt für Kunden?
- **Beeindruckend:** Große Zahlen
- **Verständlich:** Klare Labels
- **Aktuell:** Regelmäßig updaten
