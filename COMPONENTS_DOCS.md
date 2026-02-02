# Komponenten-Dokumentation

## 🎨 Navbar (components/layout/Navbar.tsx)

### Features

**Glassmorphism-Effekt:**
- `backdrop-blur-xl` für starken Blur-Effekt
- `bg-white/80` für semi-transparenten Hintergrund
- Dynamisch: Verstärkt sich beim Scrollen

**Sticky Navigation:**
- Fixed Position am oberen Bildschirmrand
- Z-Index 50 (über allen anderen Elementen)
- Smooth Transitions bei Scroll-Events

**Responsive Design:**
- Desktop: Vollständige Navigation mit Logo, Links und CTA
- Mobile: Hamburger-Menü mit Slide-in-Panel

**Design-Details:**
- Logo: "Manni's" in Primärfarbe #8B1B23, "Fahrschule" in Foreground
- Links: DM Sans Font, Hover-Underline-Effekt
- CTA Button: 100px border-radius, Primärfarbe, Shadow-Effekte

### Navigation Links

```typescript
const NAV_LINKS = [
  { href: "/fuehrerscheine", label: "Führerscheine" },
  { href: "/erweiterung", label: "Erweiterung" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/termine", label: "Termine" },
];
```

### Animationen

- **Initial:** Slide-in von oben (-100 → 0)
- **Scroll:** Backdrop-Blur verstärkt sich
- **Hover:** Scale 1.05 auf Logo und CTA
- **Mobile Menu:** Slide-in von rechts mit Backdrop

### Verwendung

```tsx
import Navbar from "@/components/layout/Navbar";

// Im Root Layout
<body>
  <Navbar />
  {children}
</body>
```

---

## 🚀 Hero (components/sections/Hero.tsx)

### Zweispalten-Layout

**Linke Spalte - Content:**
- Badge mit "Premium Fahrschule in Herrsching"
- Headline: "Dein Führerschein. Entspannt gemacht."
  - Font: Outfit
  - Größe: 5xl → 6xl → 7xl (responsive)
  - "Entspannt" in Primärfarbe #8B1B23
- Subline über Simulatoren und E-Autos
  - Font: DM Sans
  - Farbe: muted-foreground
- Feature Pills: Simulatoren, E-Autos, Termine
- Zwei CTA Buttons:
  - **Primär:** "Jetzt anmelden" (Primärfarbe, 100px radius)
  - **Sekundär:** "Angebot ansehen" (Outlined)
- Trust Indicators: 500+ Schüler, 98% Erfolg, 15+ Jahre

**Rechte Spalte - 3D Simulator:**
- Glassmorphism Container
- 3D-Szene mit rotierender Wireframe-Kugel
- Floating Label mit "Premium Simulator"
- Glow-Effekte ringsherum

### Design-Elemente

**Background:**
- Gradient von primary/5 zu background
- Blur-Circles oben rechts und unten links
- PT-20 für Navbar-Offset

**Animationen:**
- Content: Slide-in von links
- 3D Container: Slide-in von rechts
- Badge: Fade-in von oben
- Trust Indicators: Delayed fade-in
- Scroll Indicator: Bounce-Animation

### Verwendung

```tsx
import { Hero } from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Weitere Sections */}
    </main>
  );
}
```

---

## 🎮 SimulatorScene (components/sections/SimulatorScene.tsx)

### React Three Fiber 3D-Szene

**Wireframe Sphere:**
- Farbe: #8B1B23 (Primärfarbe)
- Größe: 1.5 Radius
- Geometrie: 32x32 Segmente
- Material: Wireframe mit Transparency

**Interaktionen:**

1. **Kontinuierliche Rotation:**
   - X-Achse: 0.3 delta/s
   - Y-Achse: 0.4 delta/s

2. **Maus-Reaktion:**
   - Folgt Mausposition mit 0.05 Smoothing
   - X/Y-Rotation basierend auf Mouse-Koordinaten

3. **Pulsieren:**
   - Scale: 1 ± 0.05
   - Frequency: 1.5s Cycle
   - Smooth Sine-Wave

4. **Hover-Effekt:**
   - Opacity: 0.7 → 0.9
   - OnPointerOver/Out Events

**Beleuchtung:**
- Ambient Light: 0.5 Intensity
- Directional Light (weiß): Position [10, 10, 5]
- Directional Light (rot): Position [-10, -10, -5], Farbe #8B1B23

**OrbitControls:**
- Zoom: Disabled
- Pan: Disabled
- Rotate: Enabled (0.5 speed)
- Polar Angle: π/3 → π/1.5 (eingeschränkt)

### Canvas Setup

```tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 50 }}
  className="w-full h-full"
>
  {/* Lights */}
  {/* Sphere */}
  {/* Controls */}
</Canvas>
```

### Performance

- SSR deaktiviert (dynamic import mit `ssr: false`)
- Loading State mit Fallback
- Optimierte Frame-Updates

### Verwendung

```tsx
import dynamic from "next/dynamic";

const SimulatorScene = dynamic(() => import("./SimulatorScene"), {
  ssr: false,
  loading: () => <div>Lädt...</div>,
});

<div className="aspect-square">
  <SimulatorScene />
</div>
```

---

## 🎨 Design-System

### Farben

- **Primärfarbe:** `#8B1B23` (Burgundy Red)
- **Background:** `bg-background`
- **Foreground:** `text-foreground`
- **Muted:** `text-muted-foreground`

### Typografie

- **Headlines:** `font-outfit` (Outfit)
- **Body Text:** `font-dmSans` (DM Sans)
- **Sizes:** 
  - Hero H1: text-5xl → 7xl
  - Body: text-lg → xl

### Border-Radius

- **Buttons:** `rounded-full` (100px)
- **Cards:** `rounded-2xl` oder `rounded-3xl`
- **Pills:** `rounded-full`

### Shadows

- **Buttons:** `shadow-lg shadow-primary/30`
- **Hover:** `shadow-xl shadow-primary/40`
- **Cards:** `shadow-2xl`

### Glassmorphism

```css
backdrop-blur-xl
bg-white/80
border border-white/40
```

---

## 📐 Layout-Integration

### Root Layout (app/layout.tsx)

```tsx
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

### Homepage (app/page.tsx)

```tsx
import { Hero, LeistungenBento, LicenseConfigurator } from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <LeistungenBento />
      <LicenseConfigurator />
    </main>
  );
}
```

---

## 🎯 Best Practices

### 1. Framer Motion Animationen

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### 2. Responsive Text

```tsx
<h1 className="text-5xl md:text-6xl lg:text-7xl">
  Headline
</h1>
```

### 3. Button-Style (100px radius)

```tsx
<button
  className="px-8 py-4 bg-primary text-white rounded-full"
  style={{ borderRadius: "100px" }}
>
  CTA
</button>
```

### 4. Glassmorphism-Container

```tsx
<div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl">
  {/* Content */}
</div>
```

### 5. 3D-Szene Dynamic Import

```tsx
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div>Lädt...</div>,
});
```

---

## 🚀 Dependencies

### React Three Fiber

```json
{
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.114.3",
  "three": "^0.169.0"
}
```

### Installation

```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet (md):** ≥ 768px
- **Desktop (lg):** ≥ 1024px
- **XL:** ≥ 1280px

### Hero-Layout

- Mobile: 1 Spalte (Content über 3D)
- Desktop (lg): 2 Spalten nebeneinander

### Navbar

- Mobile: Hamburger-Menü
- Desktop (lg): Vollständige Navigation

---

## 🎨 Color Palette

```css
--primary: #8B1B23
--primary-foreground: hsl(var(--primary-foreground))
--background: hsl(var(--background))
--foreground: hsl(var(--foreground))
--muted-foreground: hsl(var(--muted-foreground))
```

### Usage

```tsx
<div className="bg-primary text-white">
  <span className="text-primary">Red Text</span>
  <span className="text-muted-foreground">Gray Text</span>
</div>
```

---

## ✨ Animations

### Framer Motion Variants

**Fade-In:**
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
```

**Slide-In (Left):**
```tsx
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
```

**Scale:**
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Stagger Children:**
```tsx
transition={{ staggerChildren: 0.1 }}
```

---

## 🔧 Troubleshooting

### "window is not defined" (Three.js)

**Lösung:** Dynamic Import mit `ssr: false`

```tsx
const Scene = dynamic(() => import("./Scene"), { ssr: false });
```

### Navbar überlappt Content

**Lösung:** Padding-top auf Main-Container

```tsx
<section className="pt-20"> {/* Navbar height */}
```

### 3D-Szene lädt nicht

**Prüfe:**
1. Dependencies installiert?
2. `"use client"` Directive?
3. Dynamic Import korrekt?
4. Browser unterstützt WebGL?
