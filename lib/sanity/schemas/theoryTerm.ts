import { defineType, defineField } from "sanity";
import { Calendar } from "lucide-react";

export default defineType({
  name: "theoryTerm",
  title: "Theorie-Blockwoche",
  type: "document",
  icon: Calendar,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "z.B. 'Theorie-Blockwoche März 2026'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "month",
      title: "Monat",
      type: "string",
      description: "Der Monat der Blockwoche (z.B. 'März 2026')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Startdatum",
      type: "date",
      description: "Erster Tag der Blockwoche",
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: "DD.MM.YYYY",
      },
    }),
    defineField({
      name: "endDate",
      title: "Enddatum",
      type: "date",
      description: "Letzter Tag der Blockwoche",
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: "DD.MM.YYYY",
      },
    }),
    defineField({
      name: "totalSpots",
      title: "Gesamtplätze",
      type: "number",
      description: "Maximale Anzahl der verfügbaren Plätze",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 20,
    }),
    defineField({
      name: "availableSpots",
      title: "Verfügbare Plätze",
      type: "number",
      description: "Noch verfügbare Plätze",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom((value, context) => {
            const total = (context.document as any)?.totalSpots;
            if (value !== undefined && total !== undefined && value > total) {
              return "Verfügbare Plätze können nicht größer als Gesamtplätze sein";
            }
            return true;
          }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Verfügbarkeitsstatus",
      options: {
        list: [
          { title: "Verfügbar", value: "available" },
          { title: "Knapp", value: "limited" },
          { title: "Ausgebucht", value: "full" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "available",
    }),
    defineField({
      name: "location",
      title: "Standort",
      type: "string",
      description: "Wo findet die Blockwoche statt?",
      options: {
        list: [
          { title: "Herrsching", value: "herrsching" },
          { title: "Tutzing", value: "tutzing" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "times",
      title: "Unterrichtszeiten",
      type: "array",
      description: "Uhrzeiten des Unterrichts",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Wochentag",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "time",
              title: "Uhrzeit",
              type: "string",
              description: "z.B. '18:00 - 21:00 Uhr'",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      description: "Zusätzliche Informationen zur Blockwoche",
      rows: 3,
    }),
    defineField({
      name: "topics",
      title: "Themen",
      type: "array",
      description: "Behandelte Themen in dieser Blockwoche",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      description: "Soll diese Blockwoche auf der Website angezeigt werden?",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sortierung",
      type: "number",
      description: "Reihenfolge der Anzeige (niedrigere Zahlen zuerst)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      month: "month",
      status: "status",
      available: "availableSpots",
      total: "totalSpots",
    },
    prepare({ title, month, status, available, total }) {
      const statusEmoji = {
        available: "✅",
        limited: "⚠️",
        full: "❌",
      }[status] || "📅";

      return {
        title: title || month,
        subtitle: `${statusEmoji} ${available}/${total} Plätze verfügbar`,
      };
    },
  },
  orderings: [
    {
      title: "Startdatum (neueste zuerst)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Startdatum (älteste zuerst)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
});
