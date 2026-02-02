# Führerschein-Konfigurator

## Übersicht

Der interaktive Führerschein-Konfigurator ist eine Multi-Step-Form-Komponente im Premium Bento-Style, die Besuchern hilft, den passenden Führerschein zu finden.

## Features

### 🎨 Design
- **Bento-Grid-Stil** mit abgerundeten Karten und Glassmorphismus
- **Primärfarbe #8B1B23** durchgängig integriert
- **Smooth Framer Motion Animationen** bei jedem Schritt-Wechsel
- **Responsive Design** für Mobile, Tablet und Desktop
- **Hover-Effekte** und Micro-Interactions für Premium-Feel

### 📋 3-Schritt-Prozess

#### Schritt 1: Alter
- Altersgruppen: 15-16, 17, 18, 21, 24+
- Bento-Grid Layout mit großen, klickbaren Karten
- Visuelle Hervorhebung der Auswahl

#### Schritt 2: Vorbesitz
- Optionen: Kein Führerschein, AM, A1, A2, A, B, BE
- Grid-Layout mit Klassen-Badges
- Information über Verkürzungen durch Vorbesitz

#### Schritt 3: Ziel
- Auto (Klasse B/BE)
- Motorrad (Klasse A/A1/A2)
- LKW (Klasse C/CE)
- Icons von Lucide React
- Live-Empfehlung basierend auf Eingaben

### 🧠 Intelligente Logik

Die Komponente berechnet automatisch:

**Für Auto:**
- Ab 17: BF17 (Begleitetes Fahren)
- Ab 18: Klasse B

**Für Motorrad:**
- Ab 16: Klasse A1 (125ccm)
- Ab 18: Klasse A2 (48 PS)
- Ab 20 mit A2-Vorbesitz: Aufstieg zu A
- Ab 24: Direkteinstieg Klasse A

**Für LKW:**
- Benötigt Klasse B als Vorbesitz
- Ab 18: Eingeschränkte Berechtigung
- Ab 21: Volle Berechtigung C/CE

### 🎯 Conversion-Optimierung

- **Progress Indicator** zeigt Fortschritt
- **Validierung** verhindert Fortsetzung ohne Auswahl
- **Sofortige Empfehlung** mit personalisierten Infos
- **CTA-Button "Jetzt anmelden"** bei gültiger Empfehlung
- **"Neu starten"** Button für weitere Anfragen

## Verwendung

```tsx
import { LicenseConfigurator } from "@/components/sections";

<LicenseConfigurator />
```

## Anpassungen

### Farben anpassen
Die Komponente nutzt Tailwind CSS Klassen mit der Primärfarbe:
- `bg-primary` - Hintergrund
- `text-primary` - Text
- `border-primary` - Rahmen
- `shadow-primary/30` - Schatten mit Transparenz

### Logik erweitern
Die `getRecommendation()` Funktion kann erweitert werden für:
- Preisberechnung
- Direkte Weiterleitung zu Sanity-Daten
- Integration mit Buchungssystem
- Weitere Führerscheinklassen

### Weitere Schritte hinzufügen
Im `STEPS` Array können weitere Schritte definiert werden:
```tsx
{
  id: 4,
  title: "Weitere Info",
  description: "Beschreibung",
  icon: IconComponent,
}
```

## Next Steps

- [ ] Integration mit Sanity für dynamische Preise
- [ ] E-Mail-Versand der Empfehlung
- [ ] Speichern der Anfragen im Backend
- [ ] A/B-Testing verschiedener Formulierungen
- [ ] Analytics-Tracking für jeden Schritt
