import { defineType, defineField } from "sanity";
import { MessageSquare } from "lucide-react";

export default defineType({
  name: "testimonial",
  title: "Kundenstimmen",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name des Fahrschülers (z.B. 'Sophie M.')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "age",
      title: "Alter",
      type: "number",
      description: "Alter des Fahrschülers",
      validation: (Rule) => Rule.required().min(15).max(99),
    }),
    defineField({
      name: "license",
      title: "Führerscheinklasse",
      type: "string",
      description: "z.B. 'Klasse B', 'Klasse A2'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Testimonial-Text",
      type: "text",
      description: "Das Testimonial / die Bewertung",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "rating",
      title: "Bewertung",
      type: "number",
      description: "Sterne-Bewertung (1-5)",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
      options: {
        list: [
          { title: "⭐ 1 Stern", value: 1 },
          { title: "⭐⭐ 2 Sterne", value: 2 },
          { title: "⭐⭐⭐ 3 Sterne", value: 3 },
          { title: "⭐⭐⭐⭐ 4 Sterne", value: 4 },
          { title: "⭐⭐⭐⭐⭐ 5 Sterne", value: 5 },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      description: "Wann wurde das Testimonial gegeben?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profilbild (optional)",
      type: "image",
      description: "Optional: Profilbild des Fahrschülers",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      description: "Soll dieses Testimonial auf der Website angezeigt werden?",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Hervorgehoben",
      type: "boolean",
      description: "Als hervorgehoben markieren?",
      initialValue: false,
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
      title: "name",
      subtitle: "license",
      rating: "rating",
      media: "image",
    },
    prepare({ title, subtitle, rating }) {
      const stars = "⭐".repeat(rating || 5);
      return {
        title: `${stars} ${title}`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Datum (neueste zuerst)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Sortierung",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Bewertung (höchste zuerst)",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
  ],
});
