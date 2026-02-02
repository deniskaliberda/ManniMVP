"use client";

import { motion } from "framer-motion";
import { Car, Bike, Monitor, Calendar } from "lucide-react";

const leistungen = [
  {
    icon: Car,
    title: "Führerschein Klasse B",
    description: "PKW-Ausbildung mit modernen Fahrzeugen",
  },
  {
    icon: Bike,
    title: "Führerschein Klasse A",
    description: "Motorrad-Ausbildung für alle Klassen",
  },
  {
    icon: Monitor,
    title: "3 Premium Simulatoren",
    description: "Innovative Fahrsimulation für sicheres Training",
  },
  {
    icon: Calendar,
    title: "Flexible Termine",
    description: "Theorie-Unterricht nach deinem Zeitplan",
  },
];

export default function LeistungenBento() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <h2 className="font-outfit text-4xl md:text-5xl font-bold text-center mb-16">
          Unsere Leistungen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leistungen.map((leistung, index) => (
            <motion.div
              key={leistung.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300"
            >
              <div className="mb-4 text-primary">
                <leistung.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="font-outfit text-xl font-semibold mb-2">
                {leistung.title}
              </h3>
              <p className="text-muted-foreground">
                {leistung.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
