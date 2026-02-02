import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Manni's Fahrschule",
  description:
    "Kontaktiere uns für eine persönliche Beratung. Wir sind für dich in Herrsching und Tutzing erreichbar.",
  keywords: [
    "Kontakt",
    "Beratung",
    "Anmeldung",
    "Fahrschule",
    "Herrsching",
    "Tutzing",
  ],
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-outfit text-5xl font-bold text-gray-900 mb-6 text-center">
          Kontakt
        </h1>
        <p className="text-xl text-gray-600 font-dmSans text-center mb-12">
          Diese Seite wird noch erstellt. Bitte nutze vorerst unsere WhatsApp
          oder Telefon-Kontaktmöglichkeiten.
        </p>

        {/* Placeholder Content */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center">
          <p className="text-gray-600 font-dmSans mb-8">
            Kontaktformular kommt hier hin
          </p>
          
          <div className="space-y-4">
            <a
              href="https://wa.me/4981521234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#25D366] text-white font-dmSans font-semibold rounded-full hover:bg-[#25D366]/90 transition-all shadow-lg mr-4"
            >
              WhatsApp Chat
            </a>
            <a
              href="tel:+4981521234567"
              className="inline-block px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg"
            >
              Anrufen
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
