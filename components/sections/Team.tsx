"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users } from "lucide-react";

// Placeholder für Team-Daten mit KI-generierten Bildern
const TEAM_MEMBERS = [
  {
    _id: "1",
    name: "Manni",
    role: "Inhaber & Geschäftsführer",
    isOwner: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manni&backgroundColor=8B1B23&clothesColor=262e33",
    classes: ["B", "BE", "A", "A2", "C", "CE"],
    bio: "Mit über 25 Jahren Erfahrung leite ich die Fahrschule mit Leidenschaft und setze auf moderne Ausbildungsmethoden.",
    yearsExperience: 25,
  },
  {
    _id: "2",
    name: "Thomas M.",
    role: "Fahrlehrer",
    isOwner: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=3b82f6&clothesColor=262e33",
    classes: ["B", "BE"],
    bio: "Spezialisiert auf PKW-Ausbildung und E-Autos.",
    yearsExperience: 8,
  },
  {
    _id: "3",
    name: "Sarah K.",
    role: "Fahrlehrerin",
    isOwner: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ec4899&clothesColor=262e33",
    classes: ["B", "A", "A2", "A1"],
    bio: "Erfahren in Auto- und Motorrad-Ausbildung.",
    yearsExperience: 12,
  },
  {
    _id: "4",
    name: "Michael R.",
    role: "Fahrlehrer",
    isOwner: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=10b981&clothesColor=262e33",
    classes: ["C", "CE", "B", "BE"],
    bio: "LKW-Spezialist mit AZAV-Zertifizierung.",
    yearsExperience: 15,
  },
];

export default function Team() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
            <Users size={20} className="text-[#8B1B23]" />
            <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
              Unser Team
            </span>
          </div>

          <h2 className="font-outfit text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Deine Fahrlehrer
          </h2>
          <p className="text-xl text-gray-600 font-dmSans max-w-2xl mx-auto leading-relaxed">
            Erfahrene Profis, die dich sicher und entspannt zum Führerschein begleiten
          </p>
        </motion.div>

        {/* Owner Card (Full Width, Special) */}
        {TEAM_MEMBERS.filter(m => m.isOwner).map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#8B1B23] shadow-2xl shadow-[#8B1B23]/20 hover:shadow-3xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-[#8B1B23] to-[#6B1419]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Owner Badge */}
                  <div className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#8B1B23] text-sm font-bold shadow-xl">
                    <Award size={18} />
                    Inhaber
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-8 md:p-12">
                  <h3 className="font-outfit text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xl text-gray-600 font-dmSans mb-6">
                    {member.role}
                  </p>

                  {/* Experience */}
                  {member.yearsExperience && (
                    <div className="flex items-center gap-3 mb-6 text-[#8B1B23]">
                      <Award size={24} />
                      <span className="font-dmSans text-lg font-semibold">
                        {member.yearsExperience}+ Jahre Erfahrung
                      </span>
                    </div>
                  )}

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-gray-700 font-dmSans text-lg mb-8 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {/* Classes */}
                  <div>
                    <p className="text-sm font-dmSans font-semibold text-gray-500 mb-3">
                      Führerscheinklassen
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.classes.map((cls) => (
                        <span
                          key={cls}
                          className="px-4 py-2 rounded-full bg-[#8B1B23] text-white text-sm font-dmSans font-bold shadow-md"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Regular Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.filter(m => !m.isOwner).map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#8B1B23]/50 hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Role */}
                  <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-dmSans mb-4 text-sm">
                    {member.role}
                  </p>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-sm text-gray-600 font-dmSans mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {/* Classes Badges */}
                  <div>
                    <p className="text-xs font-dmSans font-semibold text-gray-500 mb-2">
                      Klassen
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.classes.map((cls) => (
                        <span
                          key={cls}
                          className="px-3 py-1 rounded-full bg-[#8B1B23]/10 text-[#8B1B23] text-sm font-dmSans font-semibold border border-[#8B1B23]/20"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-[#8B1B23]/10 to-[#8B1B23]/5 rounded-3xl p-12 border-2 border-[#8B1B23]/20">
            <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-4">
              Möchtest du unser Team kennenlernen?
            </h3>
            <p className="text-lg text-gray-600 font-dmSans mb-8 max-w-2xl mx-auto">
              Vereinbare eine kostenlose Probefahrstunde und lerne deine Fahrlehrer persönlich kennen.
            </p>
            <a
              href="https://wa.me/4981521234567?text=Hallo%2C%20ich%20m%C3%B6chte%20gerne%20eine%20Probefahrstunde%20vereinbaren."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg shadow-[#8B1B23]/30"
            >
              Probefahrstunde vereinbaren
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
