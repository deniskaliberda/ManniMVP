import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { UPCOMING_THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import TermineList from "@/components/sections/TermineList";
import type { TheoryTerm } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Theorie-Termine | Manni's Fahrschule",
  description:
    "Verfügbare Termine für unsere Theorie-Blockwochen in Herrsching und Tutzing. In nur 7 Tagen zum Theorie-Abschluss. Jetzt Platz reservieren!",
  keywords: [
    "Theorie Termine",
    "Blockwoche",
    "Theorieunterricht",
    "Fahrschule Termine",
    "Herrsching",
    "Tutzing",
    "Theorie 7 Tage",
  ],
};

// Revalidate every 15 minutes (terms change frequently)
export const revalidate = 900;

export default async function TerminePage() {
  // Fetch upcoming theory terms from Sanity
  let terms: TheoryTerm[] = [];

  try {
    const fetchedTerms = await client.fetch(UPCOMING_THEORY_TERMS_QUERY);
    
    // Sort by start date (ascending)
    terms = fetchedTerms.sort((a: TheoryTerm, b: TheoryTerm) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  } catch (error) {
    console.error("Error fetching theory terms:", error);
    terms = [];
  }

  return (
    <main>
      <TermineList terms={terms} />
    </main>
  );
}
