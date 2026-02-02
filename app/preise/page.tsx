import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { ALL_PRICING_QUERY } from "@/lib/sanity/queries";
import PriceList from "@/components/sections/PriceList";

export const metadata: Metadata = {
  title: "Preise & Führerscheinklassen | Manni's Fahrschule",
  description:
    "Transparente Preise für alle Führerscheinklassen. PKW, Motorrad, LKW und Bus. AZAV-zertifiziert für geförderte Ausbildungen.",
  keywords: [
    "Führerschein Preise",
    "Fahrschule Kosten",
    "Klasse B Preis",
    "LKW Führerschein",
    "AZAV Förderung",
    "Herrsching",
    "Tutzing",
  ],
};

// Revalidate every hour
export const revalidate = 3600;

export default async function PreisePage() {
  // Fetch pricing data from Sanity
  const pricingData = await client.fetch(ALL_PRICING_QUERY);

  return (
    <main>
      <PriceList pricingData={pricingData} />
    </main>
  );
}
