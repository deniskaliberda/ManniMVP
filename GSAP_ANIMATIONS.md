# GSAP Animationen - Guide

Dieses Projekt nutzt GSAP (GreenSock Animation Platform) für performante, professionelle Animationen.

## 📦 Installation

```bash
npm install gsap
```

**Version:** ^3.12.5

## 🎯 Verwendete Plugins

### ScrollTrigger
Ermöglicht scroll-basierte Animationen.

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// SSR-Safe Registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

## ✨ Animation-Typen in FleetAndSimulator

### 1. Stagger Animation (Simulator Section)

**Effekt:** Kinder-Elemente erscheinen nacheinander von unten

```tsx
gsap.from(simulatorRef.current.children, {
  scrollTrigger: {
    trigger: simulatorRef.current,
    start: "top 80%",       // Start wenn top bei 80% viewport
    end: "bottom 20%",      // Ende wenn bottom bei 20% viewport
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,                    // 50px von unten
  stagger: 0.2,             // 0.2s Verzögerung zwischen Elementen
  duration: 1,
  ease: "power3.out",       // Smooth ease-out
});
```

### 2. Card Stagger (Vehicle Cards)

**Effekt:** Cards faden ein und skalieren mit Stagger

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
  scale: 0.9,              // Startet bei 90% Größe
  stagger: 0.15,           // 0.15s zwischen Cards
  duration: 0.8,
  ease: "power3.out",
});
```

### 3. Parallax Effect (Background)

**Effekt:** Background bewegt sich langsamer als Content

```tsx
gsap.to(parallaxRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,                // Smooth scrubbing mit 1s delay
  },
  y: -100,                   // Bewegt sich 100px nach oben
  ease: "none",              // Linear für Parallax
});
```

## 🔧 React Integration

### Setup mit useEffect

```tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Component() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animationen hier
      gsap.from(elementRef.current, {
        // Animation config
      });
    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div ref={elementRef}>Content</div>
    </section>
  );
}
```

### Warum gsap.context()?

**Vorteile:**
1. Automatisches Cleanup
2. Scope-Isolation
3. Performance-Optimierung
4. React-freundlich

## 📊 ScrollTrigger-Parameter

### start / end
```tsx
start: "top 80%"    // Element-top bei 80% viewport-height
end: "bottom 20%"   // Element-bottom bei 20% viewport-height
```

**Weitere Optionen:**
- `"top top"` - Element-top trifft viewport-top
- `"center center"` - Element-center bei viewport-center
- `"bottom bottom"` - Element-bottom bei viewport-bottom

### toggleActions
```tsx
toggleActions: "play none none reverse"
```

**Format:** `onEnter onLeave onEnterBack onLeaveBack`

**Optionen:**
- `play` - Animation abspielen
- `pause` - Animation pausieren
- `resume` - Animation fortsetzen
- `reverse` - Animation rückwärts
- `restart` - Animation neu starten
- `complete` - Animation zum Ende springen
- `reset` - Animation zurücksetzen
- `none` - Nichts tun

### scrub
```tsx
scrub: 1  // 1 Sekunde Verzögerung für smooth effect
scrub: true  // Direkt gekoppelt an Scroll
```

## 🎨 Easing Functions

### power3.out
Smooth slow-down am Ende (empfohlen für UI)

```tsx
ease: "power3.out"
```

### Andere Optionen
```tsx
ease: "none"           // Linear
ease: "power1.inOut"   // Gentle in und out
ease: "power2.out"     // Moderate slow-down
ease: "power4.out"     // Starker slow-down
ease: "elastic.out"    // Elastic bounce
ease: "back.out"       // Slight overshoot
```

## 🎯 Best Practices

### 1. SSR-Safe Registration
```tsx
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### 2. Cleanup
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animations
  }, containerRef);

  return () => ctx.revert();
}, []);
```

### 3. Refs für DOM-Zugriff
```tsx
const elementRef = useRef<HTMLDivElement>(null);

// Im useEffect
gsap.from(elementRef.current, { /* ... */ });
```

### 4. Array von Refs
```tsx
const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

// Im JSX
{items.map((item, index) => (
  <div ref={(el) => cardsRef.current[index] = el}>
    {/* Content */}
  </div>
))}

// Im useEffect
gsap.from(cardsRef.current, {
  stagger: 0.1,
  // ...
});
```

## 🚀 Performance-Tipps

### 1. will-change CSS
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 2. GPU-Acceleration
GSAP nutzt automatisch GPU für:
- `x`, `y`, `z`
- `scale`
- `rotation`
- `opacity`

### 3. Batch Updates
```tsx
gsap.set([el1, el2, el3], {
  opacity: 0,
  y: 50,
});
```

## 📱 Responsive Animations

### Breakpoint-basiert
```tsx
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Desktop animations
  gsap.from(".element", { x: 100 });
});

mm.add("(max-width: 767px)", () => {
  // Mobile animations
  gsap.from(".element", { y: 50 });
});
```

## 🎬 Animation-Timeline

### Sequentielle Animationen
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
  }
});

tl.from(".element1", { opacity: 0, duration: 0.5 })
  .from(".element2", { y: 50, duration: 0.5 }, "-=0.2") // 0.2s overlap
  .from(".element3", { scale: 0, duration: 0.3 });
```

## 🐛 Debugging

### Markers
```tsx
scrollTrigger: {
  trigger: element,
  markers: true,  // Zeigt Start/End Marker
}
```

### Console Logging
```tsx
scrollTrigger: {
  onEnter: () => console.log("Entered"),
  onLeave: () => console.log("Left"),
}
```

## 📚 Beispiele

### Fade-In on Scroll
```tsx
gsap.from(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
  },
  opacity: 0,
  duration: 1,
});
```

### Slide-In from Left
```tsx
gsap.from(".element", {
  scrollTrigger: ".element",
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});
```

### Scale + Rotate
```tsx
gsap.from(".element", {
  scrollTrigger: ".element",
  scale: 0,
  rotation: 360,
  duration: 1,
  ease: "back.out",
});
```

### Stagger List Items
```tsx
gsap.from(".list-item", {
  scrollTrigger: {
    trigger: ".list",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.6,
});
```

## 🎨 GSAP vs Framer Motion

| Feature | GSAP | Framer Motion |
|---------|------|---------------|
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| ScrollTrigger | ✅ Native | ❌ Extern |
| Timeline | ✅ Powerful | ⭐ Basic |
| File Size | ~50kb | ~60kb |
| React Integration | ⭐ Manual | ✅ Native |
| Learning Curve | ⭐⭐⭐ | ⭐⭐ |

**Empfehlung:**
- **GSAP:** Komplexe Scroll-Animationen, Timelines
- **Framer Motion:** UI-Interaktionen, Component-Animationen

## 🔗 Ressourcen

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Easing Visualizer](https://greensock.com/docs/v3/Eases)
- [GSAP Cheat Sheet](https://greensock.com/cheatsheet/)

## ⚡ Quick Reference

```tsx
// Basic Animation
gsap.to(".element", { x: 100, duration: 1 });

// From Animation
gsap.from(".element", { opacity: 0, y: 50 });

// FromTo Animation
gsap.fromTo(".element", 
  { opacity: 0 }, 
  { opacity: 1, duration: 1 }
);

// Set (instant)
gsap.set(".element", { opacity: 0.5 });

// Stagger
gsap.from(".items", { 
  y: 50, 
  stagger: 0.1 
});

// ScrollTrigger
gsap.from(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    markers: true,
  },
  x: 100,
});
```
