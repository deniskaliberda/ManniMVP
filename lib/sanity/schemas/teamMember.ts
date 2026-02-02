import { defineType, defineField } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "teamMember",
  title: "Team-Mitglieder",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Vollständiger Name des Fahrlehrers",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle",
      type: "string",
      description: "z.B. 'Inhaber', 'Fahrlehrer', 'Büroleitung'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isOwner",
      title: "Inhaber",
      type: "boolean",
      description: "Ist diese Person der Inhaber/die Inhaberin?",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Profilbild",
      type: "image",
      description: "Quadratisches Profilbild (empfohlen: 800x800px)",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "classes",
      title: "Führerscheinklassen",
      type: "array",
      description: "Welche Klassen unterrichtet diese Person?",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "AM", value: "AM" },
          { title: "A1", value: "A1" },
          { title: "A2", value: "A2" },
          { title: "A", value: "A" },
          { title: "B", value: "B" },
          { title: "BE", value: "BE" },
          { title: "B96", value: "B96" },
          { title: "C", value: "C" },
          { title: "CE", value: "CE" },
          { title: "C1", value: "C1" },
          { title: "C1E", value: "C1E" },
          { title: "D", value: "D" },
          { title: "DE", value: "DE" },
          { title: "D1", value: "D1" },
          { title: "D1E", value: "D1E" },
          { title: "T", value: "T" },
          { title: "L", value: "L" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "specialties",
      title: "Spezialitäten",
      type: "array",
      description: "Besondere Fähigkeiten oder Schwerpunkte",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bio",
      title: "Beschreibung",
      type: "text",
      description: "Kurze Beschreibung zur Person",
      rows: 3,
    }),
    defineField({
      name: "yearsExperience",
      title: "Jahre Erfahrung",
      type: "number",
      description: "Anzahl der Jahre als Fahrlehrer",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      description: "E-Mail-Adresse (optional)",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      description: "Telefonnummer (optional)",
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      description: "Soll diese Person auf der Website angezeigt werden?",
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
      title: "name",
      subtitle: "role",
      media: "image",
      isOwner: "isOwner",
      classes: "classes",
    },
    prepare({ title, subtitle, media, isOwner, classes }) {
      const ownerBadge = isOwner ? "👑 " : "";
      const classCount = classes?.length || 0;
      return {
        title: `${ownerBadge}${title}`,
        subtitle: `${subtitle} • ${classCount} Klassen`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Sortierung",
      name: "sortOrder",
      by: [
        { field: "isOwner", direction: "desc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
