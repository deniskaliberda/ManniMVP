# Termine-Seite - Dokumentation

## 📋 Überblick

Die Termine-Seite (`/termine`) zeigt verfügbare Theorie-Blockwochen aus Sanity mit Status-Badges, Verfügbarkeitsanzeige und direkter WhatsApp-Reservierung.

## 📁 Dateien

```
app/termine/
└── page.tsx                    // Server Component, Sanity Fetch

components/sections/
└── TermineList.tsx             // Client Component mit Interaktivität

TERMINE_PAGE_DOCS.md            // Diese Dokumentation
```

## 🎯 Features

### **1. Sanity Integration**

**Query:**
```tsx
UPCOMING_THEORY_TERMS_QUERY
// Fetcht alle aktiven Theorie-Termine
// Sortiert nach startDate (ascending)
```

**Sorting:**
```tsx
terms.sort((a, b) => {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
});
```

**ISR:**
```tsx
export const revalidate = 900; // 15 Minuten
// Häufigere Aktualisierung wegen sich ändernder Verfügbarkeit
```

### **2. Status-Badges**

#### **Verfügbar (Grün)**
```tsx
Status: "available"
Color: #00AA00
Icon: CheckCircle
Pulse: Nein
```

#### **Wenige Plätze (Orange)**
```tsx
Status: "limited"
Color: #CC7700
Icon: AlertTriangle
Pulse: Ja ✨
Animation: Kontinuierlicher Pulse-Ring
```

**Pulse Animation:**
```tsx
// Zwei Ringe mit Delay
Ring 1: delay 0s
Ring 2: delay 1s

Animation:
- scale: [1, 1.3, 1]
- opacity: [0.75, 0, 0.75]
- duration: 2s
- repeat: Infinity
- ease: easeOut
```

#### **Ausgebucht (Grau)**
```tsx
Status: "full"
Color: #9ca3af (gray-400)
Icon: XCircle
Pulse: Nein
Button: Deaktiviert
Card: 70% Opacity
```

### **3. Term Card Layout**

**Struktur pro Karte:**
```
┌─────────────────────────────┐
│ [Status Badge]              │
│                             │
│ Februar 2026                │ ← Monat
│ Theorie-Blockwoche          │ ← Titel
│                             │
│ 📅 10.02. - 14.02.2026     │ ← Zeitraum
│ 📍 Herrsching              │ ← Standort
│ 👥 8 von 12 Plätzen frei   │ ← Verfügbarkeit
│                             │
│ Beschreibung...             │
│                             │
│ [Platz reservieren]         │ ← CTA Button
└─────────────────────────────┘
```

### **4. Standort-Gruppierung**

**Automatische Sortierung nach Location:**
1. **Herrsching** (mit "Hauptsitz" Badge)
2. **Tutzing**
3. **Weitere Standorte** (falls vorhanden)

**Grid Layout:**
```css
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet
lg:grid-cols-3        // Desktop
gap-6
```

### **5. WhatsApp-Reservierung**

**Vorgefüllte Nachricht:**
```tsx
const message = `Hallo Manni, ich möchte einen Platz für die Theorie-Blockwoche "${term.title}" (${startDate} - ${endDate}) reservieren.`;
```

**Beispiel:**
```
Hallo Manni, ich möchte einen Platz für die 
Theorie-Blockwoche "Theorie-Blockwoche Februar 2026" 
(10.02.2026 - 14.02.2026) reservieren.
```

**Link-Format:**
```
https://wa.me/4981521234567?text={encodedMessage}
```

### **6. Info-Box**

**Design:**
```tsx
Gradient: from-[#8B1B23]/10 to-[#8B1B23]/5
Border: border-[#8B1B23]/20
Icon: Info (32px, white on Burgundy)
```

**Text:**
```
Headline: "In nur 7 Tagen zum Theorie-Abschluss"
Body: Beschreibung der Blockwochen-Vorteile
```

### **7. Button States**

**Verfügbar:**
```tsx
Background: #8B1B23
Text: White
Shadow: shadow-lg shadow-[#8B1B23]/30
Hover: bg-[#8B1B23]/90, shadow-xl
Icon: MessageCircle
```

**Ausgebucht:**
```tsx
Background: gray-300
Text: gray-500
Cursor: not-allowed
Disabled: true
Text: "Ausgebucht"
```

## 🎨 Design-Details

### **Colors:**

```css
/* Status Badges */
#00AA00    - Green (Verfügbar)
#CC7700    - Orange (Wenige Plätze)
#9ca3af    - Gray (Ausgebucht)

/* Accents */
#8B1B23    - Burgundy (Icons, Borders, Buttons)

/* Backgrounds */
white      - Cards
gray-50    - Section Background (Gradient)
```

### **Typography:**

**Headline:**
```css
font-outfit text-5xl md:text-6xl font-bold
```

**Month:**
```css
font-outfit text-2xl font-bold text-gray-900
```

**Title:**
```css
font-outfit text-xl font-semibold text-gray-800
```

**Details:**
```css
font-dmSans text-base text-gray-700
```

### **Spacing:**

```css
Section: py-24 px-4
Container: max-w-7xl
Cards: p-6
Grid Gap: gap-6
```

## 🎬 Animations

### **Card Entrance:**
```tsx
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.5, delay: index * 0.1 }
```

**Stagger Effect:**
- Jede Karte erscheint mit 0.1s Verzögerung
- Smooth Fade-In von unten

### **Hover Effect:**
```tsx
whileHover: { y: -4 }
```

**Card hebt sich leicht beim Hover**

### **Pulse Badge (Wenige Plätze):**
```tsx
// Zwei Pulse-Ringe
animate: {
  scale: [1, 1.3, 1],
  opacity: [0.75, 0, 0.75]
}
duration: 2s
repeat: Infinity
```

## 📊 Data Structure

### **TheoryTerm Type:**

```tsx
interface TheoryTerm {
  _id: string;
  title: string;
  month: string;
  startDate: string;      // ISO Date
  endDate: string;        // ISO Date
  totalSpots: number;
  availableSpots: number;
  status: "available" | "limited" | "full";
  location: string;
  description?: string;
  times?: Array<{
    day: string;
    time: string;
  }>;
  topics?: string[];
}
```

### **Status Berechnung (in Sanity):**

```tsx
// Automatisch basierend auf availableSpots
availableSpots > totalSpots * 0.3  → "available"
availableSpots > 0                 → "limited"
availableSpots === 0               → "full"
```

## 🔄 ISR Strategy

```tsx
export const revalidate = 900; // 15 Minuten
```

**Warum 15 Minuten?**
- Plätze können sich schnell ändern
- Balance zwischen Aktualität und Server-Load
- Besser als Stunden, da Termine zeitkritisch

**Alternative Optionen:**
```tsx
revalidate = 300;    // 5 Min (sehr aktuell, mehr Load)
revalidate = 1800;   // 30 Min (weniger aktuell, weniger Load)
revalidate = 3600;   // 1 Stunde (wie andere Seiten)
```

## 📱 Responsive Behavior

### **Mobile (< 768px):**
- 1 Spalte
- Volle Breite
- Stacked Cards

### **Tablet (≥ 768px):**
- 2 Spalten
- Balanced Layout

### **Desktop (≥ 1024px):**
- 3 Spalten
- Optimale Übersicht

## 🎯 User Flow

### **Szenario 1: Verfügbarer Termin**
```
User öffnet /termine
  ↓
Sieht grünen "Verfügbar" Badge
  ↓
Liest Details (Datum, Standort, Plätze)
  ↓
Klickt "Platz reservieren"
  ↓
WhatsApp öffnet sich mit vorgefüllter Nachricht
  ↓
User passt Nachricht an (optional)
  ↓
Sendet Nachricht an Manni
```

### **Szenario 2: Wenige Plätze**
```
User öffnet /termine
  ↓
Sieht orangenen "Wenige Plätze" Badge (pulsierend)
  ↓
Urgency-Gefühl durch Animation
  ↓
Schnelle Entscheidung
  ↓
Klickt "Platz reservieren"
  ↓
WhatsApp-Reservierung
```

### **Szenario 3: Ausgebucht**
```
User öffnet /termine
  ↓
Sieht grauen "Ausgebucht" Badge
  ↓
Button ist deaktiviert
  ↓
Scrollt weiter zu anderen Terminen
  ↓
ODER: Klickt Bottom-CTA für WhatsApp-Beratung
```

## 🔧 Anpassungen

### **Status-Farben ändern:**

```tsx
// StatusBadge Component
case "available":
  color: "bg-[#00AA00]"  // → Andere Farbe

case "limited":
  color: "bg-[#CC7700]"  // → Andere Farbe

case "full":
  color: "bg-gray-400"   // → Andere Farbe
```

### **Pulse-Geschwindigkeit:**

```tsx
// Aktuell: 2s
duration: 2

// Schneller: 1.5s
duration: 1.5

// Langsamer: 3s
duration: 3
```

### **Grid-Spalten:**

```tsx
// Mehr Karten (Desktop)
lg:grid-cols-4  // Statt lg:grid-cols-3

// Weniger
lg:grid-cols-2
```

### **ISR Interval:**

```tsx
// Häufiger aktualisieren
export const revalidate = 300;  // 5 Min

// Seltener
export const revalidate = 1800; // 30 Min
```

### **WhatsApp-Nummer:**

```tsx
// In TermineList.tsx und Bottom CTA
const whatsappUrl = `https://wa.me/4981521234567?text=${encodedMessage}`;
// → Deine echte Nummer
```

## 💡 Best Practices

### **1. Date Formatting:**

```tsx
// Deutsch, konsistent
const formatDate = (date: Date) => {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Output: "10.02.2026"
```

### **2. Status Logic:**

```tsx
// In Sanity Schema definieren
// Automatisch berechnen basierend auf availableSpots
```

### **3. Error Handling:**

```tsx
try {
  const terms = await client.fetch(QUERY);
} catch (error) {
  console.error("Error fetching terms:", error);
  terms = []; // Fallback: Leere Liste
}
```

### **4. Empty State:**

```tsx
{terms.length === 0 && (
  <div className="text-center">
    <Calendar size={64} className="text-gray-300 mx-auto" />
    <h3>Keine Termine verfügbar</h3>
    <p>Neue Termine in Kürze...</p>
  </div>
)}
```

## 🐛 Troubleshooting

### **Keine Termine angezeigt**
- Check: Sanity Studio - Sind Termine angelegt?
- Verify: `isActive: true` in Sanity
- Test: Query in Vision Tool

### **Status-Badge falsch**
- Check: Status-Feld in Sanity korrekt?
- Verify: Enum Values ("available", "limited", "full")
- Update: Sanity-Daten

### **Pulse funktioniert nicht**
- Check: Framer Motion installiert?
- Verify: Status ist "limited"?
- Test: Browser DevTools Console

### **WhatsApp öffnet nicht**
- Check: Telefonnummer-Format
- Verify: Message encoding
- Test: Console Errors

### **Datum falsch formatiert**
- Check: Date-String von Sanity ist valid?
- Verify: ISO Format (YYYY-MM-DD)
- Test: `new Date(term.startDate)`

## 📊 Analytics (Optional)

### **Track Reservierung-Klicks:**

```tsx
const handleReservation = () => {
  // Analytics Event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "reservation_click", {
      event_category: "engagement",
      event_label: term.title,
      value: term._id,
    });
  }

  // Open WhatsApp
  const message = `...`;
  // ...
};
```

## 🚀 Production Checklist

### **Vor Go-Live:**

1. **Sanity Studio:**
   - [ ] Mindestens 3-5 Termine angelegt
   - [ ] Status korrekt gesetzt
   - [ ] Locations (Herrsching/Tutzing) eingetragen
   - [ ] Beschreibungen vorhanden
   - [ ] Platzanzahl realistisch

2. **WhatsApp:**
   - [ ] Echte Telefonnummer eingetragen
   - [ ] Nachricht angepasst
   - [ ] Format getestet

3. **Testing:**
   - [ ] Desktop: Alle Cards angezeigt
   - [ ] Desktop: Badges korrekt
   - [ ] Desktop: Pulse Animation funktioniert
   - [ ] Desktop: WhatsApp öffnet sich
   - [ ] Mobile: Cards responsiv
   - [ ] Mobile: Buttons funktional
   - [ ] Verschiedene Status getestet

4. **Performance:**
   - [ ] ISR funktioniert (15 Min)
   - [ ] Keine Console Errors
   - [ ] Smooth Animations
   - [ ] Fast Load Time

5. **Content:**
   - [ ] Info-Box Text aktuell
   - [ ] Bottom CTA Text korrekt
   - [ ] Alle Texte Korrektur gelesen

## 🎯 Key Features Checklist

✅ **Sanity Integration** (UPCOMING_THEORY_TERMS_QUERY)  
✅ **Automatische Sortierung** (nach startDate)  
✅ **ISR** (15 Minuten Revalidation)  
✅ **Status-Badges:**  
  - ✅ Grün (#00AA00) für "Verfügbar"  
  - ✅ Orange (#CC7700) für "Wenige Plätze"  
  - ✅ Grau (gray-400) für "Ausgebucht"  
✅ **Pulse Animation** (bei "Wenige Plätze")  
✅ **Deaktivierte Buttons** (bei Ausgebucht)  
✅ **Standort-Gruppierung** (Herrsching, Tutzing, Andere)  
✅ **Info-Box** ("In nur 7 Tagen...")  
✅ **WhatsApp-Integration** (vorgefüllte Nachricht mit Termin)  
✅ **Responsive Grid** (1-2-3 Spalten)  
✅ **Smooth Animations** (Entrance, Hover, Pulse)  
✅ **Empty State** (Keine Termine verfügbar)  
✅ **Bottom CTA** (WhatsApp Beratung)  
✅ **SEO Metadata** (Title, Description, Keywords)  

## ✨ Fazit

Die Termine-Seite bietet:
- Klare Übersicht aller verfügbaren Theorie-Blockwochen
- Status-basierte Visualisierung (Grün/Orange/Grau)
- Pulsierender Urgency-Effekt bei wenigen Plätzen
- Automatische Standort-Gruppierung
- Direkte WhatsApp-Reservierung mit Termin-Details
- ISR für aktuelle Daten
- Responsive & User-Friendly

Perfekt für maximale Conversion und einfache Terminbuchung! 📅✨
