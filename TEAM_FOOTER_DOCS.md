# Team & Footer Components - Dokumentation

## 👥 Team.tsx - Team-Sektion

### Design-Features

**Layout:**
- Grid: 1 Spalte (Mobile) → 2 Spalten (Tablet) → 4 Spalten (Desktop)
- Inhaber nimmt 2 Spalten auf Desktop
- Weißer Hintergrund
- Clean & professionell

**Card-Design:**
- Quadratische Bilder (aspect-square)
- 20px Border-Radius (rounded-2xl)
- Border: 2px
- Inhaber: Border in #8B1B23, Shadow
- Andere: Gray Border, Hover → Burgundy

### Inhaber-Hervorhebung

**Manni als Inhaber:**
- ✅ 2 Spalten auf Desktop (lg:col-span-2)
- ✅ "Inhaber" Badge (Top-Right)
- ✅ Burgundy Border permanent
- ✅ Shadow-2xl mit Burgundy-Tint
- ✅ Größerer Content (p-8 statt p-6)
- ✅ Größere Headline (text-3xl statt text-2xl)
- ✅ Jahre Erfahrung prominent
- ✅ Längere Bio-Beschreibung

**Badge-Styling:**
```tsx
<div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B1B23] text-white text-sm font-bold shadow-lg">
  <Award size={16} />
  Inhaber
</div>
```

### Klassen-Badges

**Design:**
- Rounded-full
- Burgundy (#8B1B23)
- 10% Background mit Border
- Kleine Schrift (text-sm)
- Font: DM Sans, Semibold

```tsx
<span className="px-3 py-1 rounded-full bg-[#8B1B23]/10 text-[#8B1B23] text-sm font-dmSans font-semibold border border-[#8B1B23]/20">
  B
</span>
```

### Card-Struktur

**Für alle:**
1. Quadratisches Bild
2. Name (Fettdruck, Outfit)
3. Rolle
4. Klassen-Badges

**Zusätzlich für Inhaber:**
- Jahre Erfahrung mit Icon
- Längere Bio
- Größere Karte

**Zusätzlich für andere:**
- Kürzere Bio (optional)

### Placeholder-Images

Aktuell: Gradient-Background mit Users-Icon
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
  <Users size={80} className="text-gray-400" />
</div>
```

**Echte Bilder einbinden:**
```tsx
<Image
  src={member.image}
  alt={member.name}
  fill
  className="object-cover"
/>
```

### Hover-Effekte

- Border-Color: gray-200 → #8B1B23/50
- Shadow: none → shadow-xl
- Overlay: Gradient from-black/60 (opacity 0 → 100)

### Sanity Integration

**Schema: teamMember.ts**

**Felder:**
- name (String)
- role (String)
- isOwner (Boolean)
- image (Image, required)
- classes (Array of Strings)
- specialties (Array of Strings)
- bio (Text)
- yearsExperience (Number)
- email (String, optional)
- phone (String, optional)
- isActive (Boolean)
- sortOrder (Number)

**Queries:**
```tsx
TEAM_MEMBERS_QUERY // Alle aktiven, Owner first
OWNER_QUERY        // Nur Inhaber
```

**Verwendung:**
```tsx
import { client } from "@/lib/sanity";
import { TEAM_MEMBERS_QUERY } from "@/lib/sanity/queries";

const team = await client.fetch(TEAM_MEMBERS_QUERY);
```

---

## 🦶 Footer.tsx - Footer-Komponente

### Design-Features

**Farbschema:**
- Background: #0a0a0a (Black/Dark Anthracite)
- Text: gray-400 (Muted Grey)
- Headlines: white
- Links Hover: white
- Trennlinien: #8B1B23/10 (dezentes Burgundy)

**Layout:**
- 4 Spalten auf Desktop
- 2 Spalten auf Tablet
- 1 Spalte auf Mobile
- 3 Bereiche: Main Footer, SEO-Zeile, Bottom Bar

### Spalten-Struktur

#### Spalte 1: Brand
- Logo (Manni's Fahrschule)
- Kurzbeschreibung
- Ammersee-Region Badge
- Font: Outfit (Logo), DM Sans (Text)

#### Spalte 2: Standorte
- **Herrsching** (Hauptsitz Badge)
  - Adresse
  - PLZ
  - "Auf Karte anzeigen" Link
- **Tutzing**
  - Adresse
  - PLZ
  - Map-Link

**Hauptsitz-Badge:**
```tsx
<span className="text-xs px-2 py-0.5 rounded-full bg-[#8B1B23]/20 text-[#8B1B23] border border-[#8B1B23]/30">
  Hauptsitz
</span>
```

#### Spalte 3: Quick Links
- Preise
- Ablauf
- Prüfungsangst
- Führerscheine
- Termine
- Über uns

**Hover-Effekte:**
- Color: gray-400 → white
- Transform: translateX(4px)

#### Spalte 4: Kontakt
- **Telefon** mit Icon
- **WhatsApp Button** (prominent, grün)
- **E-Mail** mit Icon

**WhatsApp-Button:**
```tsx
<a href="https://wa.me/4981521234567" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] text-white font-dmSans font-semibold rounded-full">
  <MessageCircle size={20} />
  WhatsApp Chat
</a>
```

### SEO-Zeile

**Lokale Keywords:**
```
Fahrschule für Herrsching, Tutzing, Feldafing, Seefeld und den gesamten Ammersee
```

**Styling:**
- Center-aligned
- Small text (text-sm)
- Gray-500
- Border-top mit Burgundy/10

**Locations Array:**
```tsx
const SEO_LOCATIONS = [
  "Herrsching",
  "Tutzing", 
  "Feldafing",
  "Seefeld",
  "Ammersee",
];
```

### Bottom Bar

**Content:**
- Copyright © 2024
- Legal Links (Impressum | Datenschutz)

**Layout:**
- Flex: column (Mobile) → row (Desktop)
- Space-between
- Separator: | in Burgundy/30

**Trennlinie:**
```tsx
<span className="text-[#8B1B23]/30">|</span>
```

### Borders & Separators

Alle Trennlinien:
```css
border-t border-[#8B1B23]/20  /* Main sections */
border-t border-[#8B1B23]/10  /* Subtle separators */
```

### Icons

**Verwendete Icons:**
- MapPin (Standorte, Ammersee)
- Phone (Telefon)
- MessageCircle (WhatsApp)
- Mail (E-Mail)

**Icon-Container:**
```tsx
<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
  <Phone size={18} className="text-[#8B1B23]" />
</div>
```

### Responsive Behavior

**Mobile (< 768px):**
- 1 Spalte
- Stacked Layout
- WhatsApp Button volle Breite

**Tablet (≥ 768px):**
- 2 Spalten
- Navigation & Kontakt nebeneinander

**Desktop (≥ 1024px):**
- 4 Spalten
- Alle Bereiche nebeneinander
- Optimale Breite

### Kontakt-Daten anpassen

```tsx
const CONTACT = {
  phone: "+49 8152 123456",
  phoneDisplay: "08152 / 123456",
  whatsapp: "4981521234567", // Ohne +, ohne Leerzeichen
  email: "info@mannis-fahrschule.de",
};
```

### Standorte anpassen

```tsx
const FOOTER_LINKS = {
  standorte: [
    {
      name: "Herrsching",
      isMain: true,
      address: "Ihre echte Adresse",
      zip: "82211 Herrsching",
      mapLink: "https://maps.google.com/?q=Ihre+Adresse",
    },
    // ...
  ],
};
```

### Typography

**Headlines:**
```css
font-outfit text-lg font-bold text-white
```

**Body:**
```css
font-dmSans text-gray-400
```

**Links:**
```css
font-dmSans text-gray-400 hover:text-white
```

## 🎨 Color Palette

```css
/* Backgrounds */
#0a0a0a          /* Footer Background */
white/5          /* Icon Background */

/* Text */
white            /* Headlines */
gray-400         /* Body Text */
gray-500         /* SEO Text */

/* Accents */
#8B1B23          /* Burgundy (Logo) */
#8B1B23/20       /* Borders */
#8B1B23/10       /* Separators */
#8B1B23/30       /* Divider */

/* Special */
#25D366          /* WhatsApp Green */
```

## 📱 Accessibility

**Footer:**
- Semantic `<footer>` tag
- Links with proper href
- External links: target="_blank" + rel="noopener noreferrer"
- Phone links: tel: protocol
- Email links: mailto: protocol

**Team:**
- Alt-Tags für Images (when implemented)
- Semantic structure (h2, h3)
- Proper heading hierarchy

## 🚀 Integration

### Team auf Homepage
```tsx
<main>
  <Hero />
  <LeistungenBento />
  <FleetAndSimulator />
  <TrustAndSupport />
  <Team />              // ✅
  <LicenseConfigurator />
</main>
```

### Footer in Layout
```tsx
<body>
  <Navbar />
  {children}
  <Footer />  // ✅
</body>
```

## 📊 SEO-Optimierung

### Footer SEO-Benefits

1. **Lokale Keywords:** Alle Orte genannt
2. **Strukturierte Navigation:** Alle wichtigen Pages
3. **Kontaktdaten:** Telefon, E-Mail, Standorte
4. **Schema.org:** Kann erweitert werden mit LocalBusiness

### Mögliche Erweiterungen

**LocalBusiness Schema:**
```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "name": "Manni's Fahrschule",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Herrsching",
    "postalCode": "82211",
  },
  "telephone": "+49 8152 123456",
  // ...
})}
</script>
```

## 💡 Best Practices

### Team

1. **Bilder:** Quadratisch, mindestens 800x800px
2. **Alt-Tags:** Beschreibend (Name + Rolle)
3. **Bio:** Kurz & prägnant (max 2-3 Sätze)
4. **Klassen:** Nur relevante auflisten
5. **Sortierung:** Inhaber zuerst, dann nach Erfahrung

### Footer

1. **Links:** Alle funktional halten
2. **Kontakt:** Regelmäßig testen
3. **WhatsApp:** Nummer ohne Leerzeichen
4. **Maps:** Deep-Links zu exakten Adressen
5. **Year:** Automatisch mit currentYear
6. **Legal:** Impressum & Datenschutz pflegen

## 🔧 Anpassungen

### Team mit Sanity
```tsx
import { client } from "@/lib/sanity";
import { TEAM_MEMBERS_QUERY } from "@/lib/sanity/queries";
import Team from "@/components/sections/Team";

export default async function Page() {
  const team = await client.fetch(TEAM_MEMBERS_QUERY);
  
  return <Team members={team} />;
}
```

### Footer mit dynamischen Daten
```tsx
// Kontakt aus Sanity
const contact = await client.fetch(CONTACT_QUERY);

<Footer contact={contact} />
```

## ✨ Key Features

### Team
- ✅ Sanity Integration
- ✅ Inhaber-Hervorhebung
- ✅ Quadratische Bilder (20px radius)
- ✅ Klassen-Badges (#8B1B23)
- ✅ Responsive Grid
- ✅ Hover-Effekte
- ✅ Placeholder-Images

### Footer
- ✅ 4-Spalten-Layout
- ✅ Dunkler Hintergrund (#0a0a0a)
- ✅ Muted Grey Text
- ✅ Burgundy Trennlinien
- ✅ 2 Standorte mit Maps
- ✅ Quick Links
- ✅ WhatsApp Button
- ✅ SEO-Zeile (Lokale Keywords)
- ✅ Legal Links
- ✅ Responsive

## 📝 Content-Checkliste

### Vor Production

**Team:**
- [ ] Echte Bilder hochladen (800x800px)
- [ ] Namen & Rollen aktualisieren
- [ ] Klassen pro Person prüfen
- [ ] Bios schreiben
- [ ] Manni als Inhaber markieren

**Footer:**
- [ ] Echte Adressen eintragen
- [ ] Telefonnummer aktualisieren
- [ ] WhatsApp-Nummer setzen
- [ ] E-Mail-Adresse prüfen
- [ ] Map-Links testen
- [ ] Impressum erstellen
- [ ] Datenschutz erstellen
- [ ] Alle Links funktional
