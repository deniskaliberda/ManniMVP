"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";

const FOOTER_LINKS = {
  standorte: [
    {
      name: "Herrsching",
      isMain: true,
      address: "Musterstraße 123",
      zip: "82211 Herrsching",
      mapLink: "https://maps.google.com/?q=Herrsching",
    },
    {
      name: "Tutzing",
      isMain: false,
      address: "Beispielweg 45",
      zip: "82327 Tutzing",
      mapLink: "https://maps.google.com/?q=Tutzing",
    },
  ],
  navigation: [
    { label: "Preise", href: "/preise" },
    { label: "Ablauf", href: "/ablauf" },
    { label: "Prüfungsangst", href: "/pruefungsangst" },
    { label: "Führerscheine", href: "/fuehrerscheine" },
    { label: "Termine", href: "/termine" },
    { label: "Über uns", href: "/ueber-uns" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};

const CONTACT = {
  phone: "+49 8152 123456",
  phoneDisplay: "08152 / 123456",
  whatsapp: "4981521234567", // Ohne +, ohne Leerzeichen
  email: "info@mannis-fahrschule.de",
};

const SEO_LOCATIONS = [
  "Herrsching",
  "Tutzing",
  "Feldafing",
  "Seefeld",
  "Ammersee",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 border-t border-[#8B1B23]/20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="font-outfit text-2xl font-bold">
                <span className="text-[#8B1B23]">Manni&apos;s</span>
                <span className="text-white ml-2">Fahrschule</span>
              </div>
            </Link>
            <p className="text-gray-400 font-dmSans leading-relaxed mb-6">
              Deine moderne Fahrschule am Ammersee. Premium-Ausbildung mit
              E-Autos und Simulatoren in Herrsching und Tutzing.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-[#8B1B23]" />
              <span className="text-gray-500 font-dmSans">
                Ammersee-Region
              </span>
            </div>
          </div>

          {/* Column 2: Standorte */}
          <div>
            <h3 className="font-outfit text-lg font-bold text-white mb-6">
              Standorte
            </h3>
            <div className="space-y-6">
              {FOOTER_LINKS.standorte.map((location) => (
                <div key={location.name}>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-dmSans font-semibold text-white">
                      {location.name}
                    </h4>
                    {location.isMain && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B1B23]/20 text-[#8B1B23] border border-[#8B1B23]/30">
                        Hauptsitz
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 font-dmSans mb-1">
                    {location.address}
                  </p>
                  <p className="text-sm text-gray-400 font-dmSans mb-2">
                    {location.zip}
                  </p>
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#8B1B23] hover:text-[#8B1B23]/80 transition-colors font-dmSans"
                  >
                    <MapPin size={14} />
                    Auf Karte anzeigen
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-outfit text-lg font-bold text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-dmSans inline-block hover:translate-x-1 transition-transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div>
            <h3 className="font-outfit text-lg font-bold text-white mb-6">
              Kontakt
            </h3>

            {/* Phone */}
            <div className="mb-4">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone size={18} className="text-[#8B1B23]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-dmSans">
                    Telefon
                  </div>
                  <div className="font-dmSans font-semibold text-white">
                    {CONTACT.phoneDisplay}
                  </div>
                </div>
              </a>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] text-white font-dmSans font-semibold rounded-full hover:bg-[#25D366]/90 transition-all shadow-lg mb-4"
            >
              <MessageCircle size={20} />
              WhatsApp Chat
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-dmSans"
            >
              <Mail size={16} className="text-[#8B1B23]" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      {/* SEO-Zeile mit lokalen Keywords */}
      <div className="border-t border-[#8B1B23]/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500 font-dmSans">
            Fahrschule für{" "}
            {SEO_LOCATIONS.map((location, index) => (
              <span key={location}>
                <span className="text-gray-400">{location}</span>
                {index < SEO_LOCATIONS.length - 1 && ", "}
                {index === SEO_LOCATIONS.length - 2 && " und den gesamten "}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#8B1B23]/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500 font-dmSans">
              © {currentYear} Manni&apos;s Fahrschule. Alle Rechte vorbehalten.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link, index) => (
                <span key={link.href} className="flex items-center gap-6">
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors font-dmSans"
                  >
                    {link.label}
                  </Link>
                  {index < FOOTER_LINKS.legal.length - 1 && (
                    <span className="text-[#8B1B23]/30">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
