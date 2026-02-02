# LicenseConfigurator - Premium Multi-Step Interface

Eleganter Führerschein-Konfigurator mit Anthrazit-Glas-Look, AZAV-Förderung und WhatsApp-Integration.

## 🎨 Design-Features

### Farbschema
- **Hintergrund:** Anthrazit (#1a1a1a)
- **Glassmorphism:** backdrop-blur-2xl mit bg-[#2a2a2a]/80
- **Aktive Auswahl:** #8B1B23 (Manni-Rot)
- **Inaktiv:** Anthrazit-Glas mit white/10 Border
- **Text:** Weiß mit verschiedenen Opacity-Stufen

### Anthrazit-Glas-Look
```css
backdrop-blur-2xl          /* Starker Blur */
bg-[#2a2a2a]/80           /* 80% Anthrazit */
border border-white/10     /* Subtiler Border */
```

### Aktive Auswahl (Manni-Rot)
```css
border-[#8B1B23]
bg-[#8B1B23]/20
shadow-lg shadow-[#8B1B23]/30
```

## 📋 4-Schritt-Prozess

### Schritt 1: Alter
- 5 Altersgruppen (16, 17, 18, 21, 24+)
- Grid 2 Spalten (Mobile) → 5 Spalten (Desktop)
- Große Zahlen in Outfit-Font

### Schritt 2: Vorbesitz
- 7 Führerscheinklassen (Keine, AM, A1, A2, A, B, BE)
- Grid 2 Spalten (Mobile) → 4 Spalten (Desktop)
- Semantische Klassen-Tags

### Schritt 3: Fahrzeugziel
- 4 Optionen: Auto, Motorrad, LKW, Bus
- Icons von Lucide React
- Semantische Führerscheinklassen-Tags (B, BE, A, A1, etc.)

### Schritt 4: Zusammenfassung
- Empfohlene Klasse prominent dargestellt
- Highlights als Checkmark-Liste
- AZAV-Badge bei LKW/Bus
- E-Auto-Badge bei Auto
- Zusammenfassung der Eingaben
- WhatsApp CTA-Button

## 🎯 Intelligente Logik

### Auto (Klasse B/BE)
**Highlights:**
- ✅ 3 Premium Fahrsimulatoren
- ✅ Moderne E-Auto Flotte
- ✅ Umweltfreundlich & innovativ
- ✅ Simulatortraining inklusive

**E-Auto Badge:**
- Grünes Highlight mit Battery-Icon
- "Moderne E-Auto Flotte" Headline
- Info über umweltfreundliche Technologie

### LKW (Klasse C/CE)
**AZAV-Förderung Hinweis:**
- Orange Badge mit Euro-Icon
- "AZAV-Förderung möglich" Headline
- Info über Bildungsgutschein

**Highlights:**
- ✅ AZAV-zertifiziert
- ✅ Förderung möglich (Bildungsgutschein)
- ✅ Professionelle LKW-Ausbildung
- ✅ Karriere im Transportwesen

### Bus (Klasse D)
**AZAV-Förderung Hinweis:**
- Gleiche Darstellung wie LKW
- Fokus auf ÖPNV-Karriere

**Highlights:**
- ✅ AZAV-zertifiziert
- ✅ Bildungsgutschein-Förderung
- ✅ Karriere im Personenverkehr
- ✅ Zukunftssicherer Job

### Motorrad (Klasse A/A1/A2)
**Standard Highlights:**
- Moderne Motorrad-Flotte
- Erfahrene Fahrlehrer
- Flexible Termine

## 💬 WhatsApp-Integration

### Format
```
https://wa.me/49XXXXXXXXXXX?text=Hallo%20Manni's%20Fahrschule...
```

### Dynamische Nachricht
Die Nachricht wird automatisch generiert mit:
- Empfohlener Führerscheinklasse
- Alter des Nutzers
- Vorbesitz (falls vorhanden)
- Interesse-Bekundung

**Beispiel:**
```
Hallo Manni's Fahrschule! Ich interessiere mich für den 
Führerschein Klasse B. Ich bin 18 Jahre alt. 
Ich würde gerne mehr erfahren!
```

### WhatsApp-Nummer anpassen
```tsx
const WHATSAPP_NUMBER = "4917612345678"; // TODO: Echte Nummer eintragen
```

**Format:** Ohne + und ohne Leerzeichen
- ✅ "4917612345678"
- ❌ "+49 176 12345678"
- ❌ "0176 12345678"

## ✨ Framer Motion Animationen

### Schritt-Übergänge
```tsx
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.3 }}
```

### Button-Interaktionen
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Sparkle-Animation (Summary)
```tsx
initial={{ scale: 0 }}
animate={{ scale: 1 }}
transition={{ type: "spring", delay: 0.2 }}
```

### Highlight-Liste Stagger
```tsx
{highlights.map((highlight, index) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index }}
  >
    {highlight}
  </motion.div>
))}
```

## 🏷️ Semantische Tags

### Führerscheinklassen
```tsx
<div className="flex flex-wrap gap-1">
  {option.classes.map((cls) => (
    <span key={cls} className="text-xs px-2 py-1 rounded">
      {cls}
    </span>
  ))}
</div>
```

**Beispiel für Auto:**
- Tags: `B`, `BE`

**Beispiel für Motorrad:**
- Tags: `A`, `A1`, `A2`

**Beispiel für LKW:**
- Tags: `C`, `CE`

**Beispiel für Bus:**
- Tags: `D`

## 📐 Responsive Grid-Layouts

### Schritt 1 (Alter)
```css
grid-cols-2 md:grid-cols-5
```

### Schritt 2 (Vorbesitz)
```css
grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

### Schritt 3 (Ziel)
```css
grid-cols-2 md:grid-cols-4
```

### Schritt 4 (Summary Stats)
```css
grid-cols-2 md:grid-cols-3
```

## 🎨 Badge-Komponenten

### AZAV-Badge (LKW/Bus)
```tsx
<div className="flex items-center gap-3 p-4 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40">
  <Euro size={24} className="text-[#f59e0b]" />
  <div>
    <div className="font-outfit font-bold text-white">
      AZAV-Förderung möglich
    </div>
    <div className="text-sm text-white/70">
      Info-Text...
    </div>
  </div>
</div>
```

### E-Auto-Badge (Auto)
```tsx
<div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/40">
  <Battery size={24} className="text-green-400" />
  <div>
    <div className="font-outfit font-bold text-white flex items-center gap-2">
      Moderne E-Auto Flotte
      <Zap size={16} className="text-green-400" />
    </div>
    <div className="text-sm text-white/70">
      Info-Text...
    </div>
  </div>
</div>
```

## 🔧 Verwendung

### Basic
```tsx
import { LicenseConfigurator } from "@/components/sections";

export default function Page() {
  return (
    <main>
      <LicenseConfigurator />
    </main>
  );
}
```

### Mit anderen Sections
```tsx
<main>
  <Hero />
  <LeistungenBento />
  <LicenseConfigurator />
  <TheorySchedule />
</main>
```

## 📱 Mobile Optimierungen

- Kompakte Progress-Schritte (Icons ohne Text)
- 2-Spalten-Grid auf Mobile
- Touch-optimierte Button-Größen (p-6)
- Responsive Textgrößen
- WhatsApp-Link funktioniert perfekt auf Mobile

## 🎯 CTA-Button Styling

```tsx
<a
  href={whatsappLink}
  className="... bg-[#8B1B23] text-white rounded-full shadow-xl"
  style={{ borderRadius: "100px" }}
>
  <MessageCircle size={24} />
  Jetzt Platz sichern
  <ChevronRight size={20} />
</a>
```

**Features:**
- 100px Border-Radius
- Primärfarbe #8B1B23
- Shadow mit 40% Opacity
- MessageCircle Icon (WhatsApp)
- ChevronRight für Call-to-Action
- Öffnet in neuem Tab
- noopener noreferrer für Security

## 🔄 State Management

```tsx
interface ConfiguratorState {
  age: number | null;
  existingLicense: LicenseClass;
  goal: VehicleGoal;
}

const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState<ConfiguratorState>({
  age: null,
  existingLicense: "keine",
  goal: null,
});
```

## 🎨 Progress Indicator

### Aktiver Schritt
```css
bg-[#8B1B23] text-white scale-110 shadow-lg shadow-[#8B1B23]/50
```

### Abgeschlossener Schritt
```css
bg-[#8B1B23]/30 text-[#8B1B23] border border-[#8B1B23]/50
```

### Inaktiver Schritt
```css
bg-white/5 text-white/40 border border-white/10
```

## 💡 Best Practices

1. **WhatsApp-Nummer aktualisieren** vor Production
2. **Highlights anpassen** je nach Angebot
3. **AZAV-Badge** nur bei zertifizierten Klassen
4. **Semantische Tags** für alle Klassen verwenden
5. **E-Auto Badge** bei Auto-Ausbildung zeigen
6. **Mobile-Testing** für WhatsApp-Link

## 🚀 Features-Checklist

- ✅ 4-Schritt Multi-Step Interface
- ✅ Anthrazit-Glas-Look Design
- ✅ Manni-Rot (#8B1B23) für Aktiv-State
- ✅ Framer Motion Übergänge
- ✅ AZAV-Förderung Hinweis (LKW/Bus)
- ✅ E-Auto Highlight (Auto)
- ✅ Fahrsimulator Erwähnung (Auto)
- ✅ WhatsApp-Integration
- ✅ Semantische Klassen-Tags
- ✅ Zusammenfassung mit Details
- ✅ Responsive Design
- ✅ Touch-optimiert

## 📊 Icon-Mapping

```tsx
import {
  Car,        // Auto
  Bike,       // Motorrad
  Truck,      // LKW
  Bus,        // Bus
  Calendar,   // Alter
  Award,      // Vorbesitz
  Target,     // Ziel
  Sparkles,   // Zusammenfassung
  Euro,       // AZAV-Förderung
  Battery,    // E-Auto
  Zap,        // Elektro-Highlight
  MessageCircle, // WhatsApp
} from "lucide-react";
```

## 🎨 Farbpalette

```css
/* Primärfarbe */
#8B1B23  /* Manni-Rot */

/* Hintergründe */
#1a1a1a  /* Anthrazit Section */
#2a2a2a  /* Anthrazit Card */

/* Highlights */
#f59e0b  /* Orange (AZAV) */
#10b981  /* Grün (E-Auto) */

/* Transparenzen */
white/5   /* Sehr subtil */
white/10  /* Subtil */
white/20  /* Moderat */
white/40  /* Sichtbar */
white/60  /* Deutlich */
white/70  /* Text */
white/80  /* Prominent */
```

## 🔗 WhatsApp-Link Beispiele

### Auto, 18 Jahre, kein Vorbesitz
```
https://wa.me/4917612345678?text=Hallo%20Manni's%20Fahrschule!%20Ich%20interessiere%20mich%20f%C3%BCr%20den%20F%C3%BChrerschein%20Klasse%20B.%20Ich%20bin%2018%20Jahre%20alt.%20Ich%20w%C3%BCrde%20gerne%20mehr%20erfahren!
```

### LKW, 21 Jahre, mit B-Vorbesitz
```
https://wa.me/4917612345678?text=Hallo%20Manni's%20Fahrschule!%20Ich%20interessiere%20mich%20f%C3%BCr%20den%20F%C3%BChrerschein%20Klasse%20C/CE.%20Ich%20bin%2021%20Jahre%20alt%20und%20besitze%20bereits%20Klasse%20B.%20Ich%20w%C3%BCrde%20gerne%20mehr%20erfahren!
```

## ✨ Animations-Timeline

1. **Page Load:** Progress-Steps fade-in (staggered)
2. **Step Entry:** Content slides in from right
3. **Step Exit:** Content slides out to left
4. **Selection:** Scale + Shadow effect
5. **Summary Entry:** Sparkle icon springs in
6. **Highlights:** Staggered fade-in from left
7. **Badges:** Delayed fade-in from bottom
