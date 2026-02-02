import { Metadata } from "next";
import AblaufTimeline from "@/components/sections/AblaufTimeline";

export const metadata: Metadata = {
  title: "Ablauf & Ausbildung | Manni's Fahrschule",
  description:
    "Von der Anmeldung bis zum bestandenen Führerschein – in 6 klaren Schritten zum Ziel. Theorie-Blockwoche, Simulator-Training und praktische Fahrstunden.",
  keywords: [
    "Führerschein Ablauf",
    "Fahrausbildung",
    "Theorie Blockwoche",
    "Fahrsimulator",
    "Praktische Ausbildung",
    "Herrsching",
    "Tutzing",
  ],
};

export default function AblaufPage() {
  return (
    <main>
      <AblaufTimeline />
    </main>
  );
}
