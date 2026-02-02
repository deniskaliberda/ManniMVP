import { defineType, defineField } from "sanity";
import { DollarSign } from "lucide-react";

// Lucide Icons für die Auswahl
const ICON_OPTIONS = [
  { title: "Auto", value: "Car" },
  { title: "Motorrad", value: "Bike" },
  { title: "LKW", value: "Truck" },
  { title: "Bus", value: "Bus" },
  { title: "Anhänger", value: "Trailer" },
  { title: "Roller", value: "Scooter" },
  { title: "Fahrsimulator", value: "Monitor" },
  { title: "Stern", value: "Star" },
  { title: "Zertifikat", value: "Award" },
  { title: "Ziel", value: "Target" },
  { title: "Rakete", value: "Rocket" },
  { title: "Blitz", value: "Zap" },
  { title: "Herz", value: "Heart" },
  { title: "Daumen hoch", value: "ThumbsUp" },
];

export default defineType({
  name: "pricing",
  title: "Preise & Führerscheinklassen",
  type: "document",
  icon: DollarSign,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "z.B. 'Führerschein Klasse B' oder 'Motorrad A2'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      description: "URL-freundlicher Name (wird automatisch generiert)",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "licenseClass",
      title: "Führerscheinklasse",
      type: "string",
      description: "z.B. 'B', 'A2', 'BE', 'C'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      description: "Zielgruppe: Privat (PKW/Motorrad) oder Gewerblich (LKW/Bus)",
      options: {
        list: [
          { title: "Privat (PKW, Motorrad)", value: "privat" },
          { title: "Gewerblich (LKW, Bus)", value: "gewerblich" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      description: "Kurze Beschreibung der Führerscheinklasse",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Ausführliche Beschreibung",
      type: "array",
      description: "Detaillierte Informationen (Rich Text)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "basePrice",
      title: "Basispreis",
      type: "number",
      description: "Grundpreis in Euro",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceDetails",
      title: "Preis-Details",
      type: "object",
      description: "Aufschlüsselung der einzelnen Kostenposten",
      fields: [
        {
          name: "grundgebuehr",
          title: "Grundgebühr",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "fahrstunden",
          title: "Fahrstunden (pro Stunde)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "sonderfahrten",
          title: "Sonderfahrten (Gesamt)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "pruefungsgebuehren",
          title: "Prüfungsgebühren",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "lernmaterial",
          title: "Lernmaterial",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
      ],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide React Icon für die Darstellung",
      options: {
        list: ICON_OPTIONS,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "Car",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      description: "Besondere Merkmale oder Vorteile",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "requirements",
      title: "Voraussetzungen",
      type: "array",
      description: "Was wird benötigt? (z.B. Mindestalter, Vorbesitz)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Bezeichnung",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Wert",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "duration",
      title: "Ausbildungsdauer",
      type: "object",
      fields: [
        {
          name: "theory",
          title: "Theorie-Stunden",
          type: "number",
          description: "Anzahl der Theoriestunden",
        },
        {
          name: "practice",
          title: "Praxis-Stunden (Mindest)",
          type: "number",
          description: "Mindestanzahl der Fahrstunden",
        },
        {
          name: "special",
          title: "Sonderfahrten",
          type: "number",
          description: "Pflicht-Sonderfahrten",
        },
      ],
    }),
    defineField({
      name: "popular",
      title: "Beliebt",
      type: "boolean",
      description: "Als 'Beliebt' markieren für Hervorhebung",
      initialValue: false,
    }),
    defineField({
      name: "azavCertified",
      title: "AZAV-zertifiziert",
      type: "boolean",
      description: "Ist diese Ausbildung AZAV-zertifiziert? (Förderung möglich)",
      initialValue: false,
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      description: "Auf der Website anzeigen?",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sortierung",
      type: "number",
      description: "Reihenfolge der Anzeige",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      class: "licenseClass",
      price: "basePrice",
      icon: "icon",
      popular: "popular",
    },
    prepare({ title, class: licenseClass, price, popular }) {
      const badge = popular ? "⭐" : "";
      return {
        title: `${badge} ${title}`,
        subtitle: `Klasse ${licenseClass} • ab ${price}€`,
      };
    },
  },
  orderings: [
    {
      title: "Sortierung",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Preis (niedrigste zuerst)",
      name: "priceAsc",
      by: [{ field: "basePrice", direction: "asc" }],
    },
  ],
});
