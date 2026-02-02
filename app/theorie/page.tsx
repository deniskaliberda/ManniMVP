import { client } from "@/lib/sanity";
import { THEORY_TERMS_QUERY } from "@/lib/sanity/queries";
import type { TheoryTerm } from "@/lib/sanity/types";
import TheorySchedule from "@/components/sections/TheorySchedule";

export const metadata = {
  title: "Theorie-Blockwochen - Manni's Fahrschule",
  description: "Aktuelle Theorie-Blockwochen in Herrsching und Tutzing. Kompakte Ausbildung in kürzester Zeit.",
};

export const revalidate = 1800; // Revalidate every 30 minutes

export default async function TheoriePage() {
  const terms = await client.fetch<TheoryTerm[]>(THEORY_TERMS_QUERY);

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <TheorySchedule terms={terms} />
    </main>
  );
}
