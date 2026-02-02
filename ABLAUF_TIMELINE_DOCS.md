# AblaufTimeline Component - Dokumentation

## 📋 Überblick

Die Ablauf-Seite (`/ablauf`) zeigt den kompletten Weg vom Erstkontakt bis zum bestandenen Führerschein in einer interaktiven, vertikalen Timeline mit GSAP ScrollTrigger-Animationen.

## 📁 Dateien

```
app/ablauf/
└── page.tsx                    // Server Component, Metadata

components/sections/
└── AblaufTimeline.tsx          // Client Component mit GSAP

ABLAUF_TIMELINE_DOCS.md         // Diese Dokumentation
```

## 🎯 Die 6 Schritte

### 1. **Anmeldung & Beratung**
- **Icon:** Clipboard
- **Beschreibung:** Papierkram klären & Startschuss geben
- **Details:**
  - Persönliches Beratungsgespräch
  - Anmeldeformulare ausfüllen
  - Sehtest & Erste-Hilfe-Kurs
  - Führerscheinantrag stellen

### 2. **Theorie-Blockwoche**
- **Icon:** BookOpen
- **Beschreibung:** Kompletter Stoff in nur einer Woche
- **Details:**
  - 7 Tage kompakter Theorieunterricht
  - Alle Themen strukturiert erklärt
  - Interaktive Lernmaterialien
  - Prüfungssimulation inklusive

### 3. **Simulator-Training**
- **Icon:** Gamepad2
- **Beschreibung:** Erste Schritte stressfrei im virtuellen Cockpit
- **Details:**
  - High-End Fahrsimulatoren
  - Verschiedene Verkehrssituationen
  - Fehler ohne Konsequenzen machen
  - Selbstvertrauen aufbauen

### 4. **Praktische Fahrstunden**
- **Icon:** Car
- **Beschreibung:** Ab auf die Straße mit E-Autos oder Verbrennern
- **Details:**
  - 43 Elektro- & Hybrid-Fahrzeuge
  - Individuelle Fahrstundenplanung
  - Sonderfahrten (Autobahn, Überland, Nacht)
  - Erfahrene Fahrlehrer an deiner Seite

### 5. **Prüfungsvorbereitung**
- **Icon:** Target
- **Beschreibung:** Simulation der Prüfung für maximale Sicherheit
- **Details:**
  - Prüfungssimulation im echten Auto
  - Tipps gegen Prüfungsangst
  - Letzte Fragen klären
  - Mentale Vorbereitung

### 6. **Bestanden!**
- **Icon:** Award
- **Beschreibung:** Führerschein in der Hand und Freiheit genießen
- **Details:**
  - Theorieprüfung bestanden
  - Praktische Prüfung erfolgreich
  - Führerschein abholen
  - Sicher unterwegs sein

## 🎨 Design

### **Background Color**
```css
background: #F5F3F0 (Background Warm)
```
- Warmer, neutraler Hintergrund
- Gute Lesbarkeit
- Kontrastiert gut mit Weiß

### **Color Scheme**

**Inactive State (Default):**
```css
Icon Background: #e5e7eb (gray-200)
Icon Border: #e5e7eb
Icon Color: #9ca3af (gray-400)
Connector: #e5e7eb
Opacity: 0.3
```

**Active State (Scrolled In):**
```css
Icon Background: #8B1B23 (Burgundy)
Icon Border: #8B1B23
Icon Color: #ffffff (White)
Connector: #8B1B23
Opacity: 1.0
```

**Timeline Line:**
```css
Background (Gray): #d1d5db (gray-300)
Fill (Burgundy): #8B1B23
Width: 4px (w-1)
```

### **Typography**

**Headline:**
```css
font-outfit text-5xl md:text-6xl font-bold text-gray-900
```

**Step Title:**
```css
font-outfit text-3xl font-bold text-gray-900
```

**Description:**
```css
font-dmSans text-lg text-gray-600
```

**Details:**
```css
font-dmSans text-base text-gray-700
```

### **Spacing**

```css
Section: py-24 px-4
Container: max-w-4xl
Steps Gap: space-y-16
Card Padding: p-8
Icon Size: w-16 h-16 (64px)
```

## 🎬 GSAP Animations

### 1. **Timeline Line Fill Animation**

**Effect:**
- Vertikale Linie füllt sich von oben nach unten beim Scrollen

**Implementation:**
```tsx
gsap.fromTo(
  lineRef.current,
  {
    scaleY: 0,
    transformOrigin: "top",
  },
  {
    scaleY: 1,
    scrollTrigger: {
      trigger: timelineRef.current,
      start: "top 20%",
      end: "bottom 80%",
      scrub: 1,
    },
  }
);
```

**Parameters:**
- `scaleY: 0 → 1`: Von 0% auf 100% Höhe
- `transformOrigin: "top"`: Wächst von oben
- `start: "top 20%"`: Startet bei 20% vom Viewport-Top
- `end: "bottom 80%"`: Endet bei 80% vom Viewport-Top
- `scrub: 1`: Smooth Scrubbing mit Verzögerung

### 2. **Step Activation Animation**

**Effect:**
- Icon-Hintergrund wechselt von Grau zu Burgundy
- Icon-Farbe wechselt von Grau zu Weiß
- Connector-Linie wechselt Farbe
- Opacity wechselt von 0.3 zu 1.0

**Implementation:**
```tsx
gsap.fromTo(
  step,
  { opacity: 0.3 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: step,
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
      onEnter: () => {
        // Change to Burgundy
        gsap.to(icon, {
          backgroundColor: "#8B1B23",
          borderColor: "#8B1B23",
          duration: 0.4,
        });
      },
      onLeaveBack: () => {
        // Change back to Gray
        gsap.to(icon, {
          backgroundColor: "#e5e7eb",
          borderColor: "#e5e7eb",
          duration: 0.4,
        });
      },
    },
  }
);
```

**Callbacks:**
- `onEnter`: Wenn Step in View kommt → Burgundy
- `onLeaveBack`: Wenn zurück gescrollt → Gray

### 3. **Content Scale Animation**

**Effect:**
- Content-Card skaliert leicht beim Einscrollen
- Von 95% auf 100% Größe

**Implementation:**
```tsx
gsap.fromTo(
  content,
  {
    scale: 0.95,
    opacity: 0.8,
  },
  {
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: step,
      start: "top 60%",
      end: "top 40%",
      scrub: 1,
    },
  }
);
```

## 🏗️ Component Structure

### **Layout:**

```
<section> (Background Warm)
  <div container>
    <Header />
    
    <div timeline-container>
      <!-- Background Line (Gray) -->
      <div background-line />
      
      <!-- Animated Line (Burgundy) -->
      <div animated-line ref={lineRef} />
      
      <!-- Steps -->
      <div steps>
        {TIMELINE_STEPS.map((step) => (
          <div step ref={stepsRef}>
            <!-- Icon Circle -->
            <div icon>
              <Icon />
            </div>
            
            <!-- Connector Line -->
            <div connector />
            
            <!-- Content Card -->
            <div content>
              <StepNumber />
              <Title />
              <Description />
              <DetailsList />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <BottomCTA />
  </div>
</section>
```

### **Step Card Structure:**

```tsx
<div className="relative flex gap-8 items-start opacity-30">
  {/* Icon */}
  <div className="flex-shrink-0">
    <div className="timeline-icon w-16 h-16 rounded-full bg-gray-200 border-4">
      <Icon size={28} />
    </div>
    <div className="timeline-connector w-1 h-8 bg-gray-300" />
  </div>
  
  {/* Content */}
  <div className="timeline-content flex-1">
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <StepNumber />
      <Title />
      <Description />
      <DetailsList />
    </div>
  </div>
</div>
```

## 🎯 Key Features

### **1. Vertical Timeline**
- Left-aligned Icon-Column
- Right-aligned Content-Column
- Connecting Line zwischen Steps

### **2. GSAP ScrollTrigger**
- Line Fill Animation
- Step Activation (Color Change)
- Content Scale-In
- Smooth Scrubbing

### **3. Color Transitions**
- Inactive: Gray (#e5e7eb)
- Active: Burgundy (#8B1B23)
- Smooth 0.4s Duration

### **4. Responsive Design**
- Mobile-optimized
- Icons & Content bleiben lesbar
- Flexbox Layout

### **5. Interactive Elements**
- Step Cards mit Hover-Shadow
- Bottom CTA with Buttons
- WhatsApp & Kontakt Links

## 🎨 Visual States

### **Initial State (Before Scroll)**
```
Gray Timeline Line ████████████
Gray Icons        ○ ○ ○ ○ ○ ○
Opacity           30% all steps
```

### **Active State (During Scroll)**
```
Burgundy Line     ████
Gray Line         ░░░░████████
Active Icon       ● (Burgundy)
Inactive Icons    ○ ○ ○ ○ ○ (Gray)
Opacity           100% active, 30% inactive
```

### **Final State (Fully Scrolled)**
```
Burgundy Line     ████████████
Burgundy Icons    ● ● ● ● ● ●
Opacity           100% all steps
```

## 📱 Responsive Behavior

### **Mobile (< 768px)**
- Icon Size: 64px (unchanged)
- Gap: 32px (gap-8)
- Content: Full width
- Single Column Layout

### **Desktop (≥ 768px)**
- Same as Mobile (optimized for vertical)
- Better readability
- More whitespace

## 🔧 Customization

### **Change Timeline Position**

```tsx
// Left Timeline (Current)
<div className="absolute left-8 top-0 bottom-0 w-1" />

// Center Timeline
<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1" />
```

### **Change Icon Size**

```tsx
// Current: 64px
<div className="w-16 h-16">
  <Icon size={28} />
</div>

// Larger: 80px
<div className="w-20 h-20">
  <Icon size={36} />
</div>
```

### **Adjust Animation Speed**

```tsx
// Faster
scrollTrigger: {
  scrub: 0.5,  // Less delay
}

// Slower
scrollTrigger: {
  scrub: 2,    // More delay
}
```

### **Change Color Scheme**

```tsx
// Active Color
backgroundColor: "#8B1B23"  // Burgundy
// Change to: "#10b981" (Green), "#3b82f6" (Blue)

// Inactive Color
backgroundColor: "#e5e7eb"  // Gray
// Keep for consistency
```

## 💡 Best Practices

### **GSAP Performance**

1. **Use refs for animated elements:**
   ```tsx
   const lineRef = useRef<HTMLDivElement>(null);
   const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
   ```

2. **Cleanup with gsap.context:**
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Animations here
     }, timelineRef);
     
     return () => ctx.revert();
   }, []);
   ```

3. **Register ScrollTrigger conditionally:**
   ```tsx
   if (typeof window !== "undefined") {
     gsap.registerPlugin(ScrollTrigger);
   }
   ```

### **Accessibility**

1. **Semantic HTML:**
   ```tsx
   <section>, <h1>, <h3>, <ul>, <li>
   ```

2. **Descriptive Text:**
   - Clear step titles
   - Detailed descriptions
   - Helpful details

3. **Keyboard Navigation:**
   - Links are focusable
   - CTA buttons accessible

### **SEO**

```tsx
export const metadata: Metadata = {
  title: "Ablauf & Ausbildung | Manni's Fahrschule",
  description: "Von der Anmeldung bis zum bestandenen Führerschein...",
  keywords: [
    "Führerschein Ablauf",
    "Fahrausbildung",
    "Theorie Blockwoche"
  ],
};
```

## 🐛 Troubleshooting

### **Animationen starten nicht**
- Check: GSAP installiert? (`npm list gsap`)
- Verify: ScrollTrigger registriert?
- Console: Errors in Browser DevTools?

### **Line füllt sich nicht**
- Check: `lineRef` korrekt gesetzt?
- Verify: `scaleY` Animation läuft?
- Test: ScrollTrigger markers aktivieren:
  ```tsx
  scrollTrigger: {
    markers: true, // Debug markers
  }
  ```

### **Steps ändern Farbe nicht**
- Check: `stepsRef` Array korrekt befüllt?
- Verify: `onEnter` Callback wird ausgeführt?
- Test: Console.log in Callback

### **Performance-Probleme**
- Reduce `scrub` value (z.B. 0.5)
- Simplify animations
- Check for Memory Leaks (cleanup!)

## 🚀 Production Checklist

### **Vor Go-Live:**

1. **Content:**
   - [ ] Alle 6 Schritte vollständig
   - [ ] Texte Korrektur gelesen
   - [ ] Details aktuell

2. **Design:**
   - [ ] Background Color korrekt (#F5F3F0)
   - [ ] Icons passend
   - [ ] Farben konsistent

3. **Animations:**
   - [ ] Line Fill funktioniert
   - [ ] Steps aktivieren sich
   - [ ] Smooth Performance

4. **Testing:**
   - [ ] Desktop getestet
   - [ ] Mobile getestet
   - [ ] Alle Browser (Chrome, Firefox, Safari)
   - [ ] ScrollTrigger ohne Errors

5. **SEO:**
   - [ ] Metadata complete
   - [ ] Keywords relevant
   - [ ] Description aussagekräftig

6. **Links:**
   - [ ] CTA Buttons funktional
   - [ ] WhatsApp Link korrekt
   - [ ] Kontakt-Link geht zu /kontakt

## ✨ Key Highlights

**Visual:**
- ✅ Warmer Background (#F5F3F0)
- ✅ Saubere, vertikale Timeline
- ✅ Lucide Icons für jeden Schritt
- ✅ White Cards mit Shadow

**Animations:**
- ✅ GSAP ScrollTrigger
- ✅ Line Fill Animation (Top → Bottom)
- ✅ Color Change (Gray → Burgundy)
- ✅ Smooth Scrubbing
- ✅ Content Scale-In

**Interactivity:**
- ✅ Steps aktivieren beim Scrollen
- ✅ Hover-Effekte auf Cards
- ✅ Bottom CTA mit 2 Buttons

**Technical:**
- ✅ TypeScript Type Safety
- ✅ GSAP Context Cleanup
- ✅ Conditional Plugin Registration
- ✅ Performance Optimized

## 📚 GSAP Resources

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP React Guide](https://greensock.com/react/)

## 🎯 Fazit

Die Ablauf-Timeline bietet:
- Interaktive, scroll-basierte Animationen
- Klare Visualisierung des Ausbildungswegs
- Professionelles Design mit Burgundy-Akzenten
- Smooth User Experience mit GSAP
- Mobile-optimiert und performant

Perfekt, um potenziellen Fahrschülern den kompletten Ablauf transparent und ansprechend zu präsentieren! 🚗✨
