"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Clipboard,
  BookOpen,
  Gamepad2,
  Car,
  Target,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Timeline Steps Data
const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Anmeldung & Beratung",
    description:
      "Papierkram klären & Startschuss geben. Wir besprechen deine Ziele und erstellen deinen individuellen Ausbildungsplan.",
    icon: Clipboard,
    details: [
      "Persönliches Beratungsgespräch",
      "Anmeldeformulare ausfüllen",
      "Sehtest & Erste-Hilfe-Kurs",
      "Führerscheinantrag stellen",
    ],
  },
  {
    id: 2,
    title: "Theorie-Blockwoche",
    description:
      "Kompletter Stoff in nur einer Woche. Intensives Lernen in entspannter Atmosphäre mit modernen Lehrmethoden.",
    icon: BookOpen,
    details: [
      "7 Tage kompakter Theorieunterricht",
      "Alle Themen strukturiert erklärt",
      "Interaktive Lernmaterialien",
      "Prüfungssimulation inklusive",
    ],
  },
  {
    id: 3,
    title: "Simulator-Training",
    description:
      "Erste Schritte stressfrei im virtuellen Cockpit. Lerne die Grundlagen ohne Druck in realistischer Umgebung.",
    icon: Gamepad2,
    details: [
      "High-End Fahrsimulatoren",
      "Verschiedene Verkehrssituationen",
      "Fehler ohne Konsequenzen machen",
      "Selbstvertrauen aufbauen",
    ],
  },
  {
    id: 4,
    title: "Praktische Fahrstunden",
    description:
      "Ab auf die Straße mit E-Autos oder Verbrennern. Sammle echte Fahrerfahrung mit unserer modernen Fahrzeugflotte.",
    icon: Car,
    details: [
      "43 Elektro- & Hybrid-Fahrzeuge",
      "Individuelle Fahrstundenplanung",
      "Sonderfahrten (Autobahn, Überland, Nacht)",
      "Erfahrene Fahrlehrer an deiner Seite",
    ],
  },
  {
    id: 5,
    title: "Prüfungsvorbereitung",
    description:
      "Simulation der Prüfung für maximale Sicherheit. Wir bereiten dich optimal auf den großen Tag vor.",
    icon: Target,
    details: [
      "Prüfungssimulation im echten Auto",
      "Tipps gegen Prüfungsangst",
      "Letzte Fragen klären",
      "Mentale Vorbereitung",
    ],
  },
  {
    id: 6,
    title: "Bestanden!",
    description:
      "Führerschein in der Hand und Freiheit genießen. Herzlichen Glückwunsch – du hast es geschafft!",
    icon: Award,
    details: [
      "Theorieprüfung bestanden",
      "Praktische Prüfung erfolgreich",
      "Führerschein abholen",
      "Sicher unterwegs sein",
    ],
  },
];

export default function AblaufTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline Line Fill Animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {
            scaleY: 0,
            transformOrigin: "top",
          },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 20%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      // Steps Activation Animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          const icon = step.querySelector(".timeline-icon");
          const content = step.querySelector(".timeline-content");
          const connector = step.querySelector(".timeline-connector");

          // Animate Step
          gsap.fromTo(
            step,
            {
              opacity: 0.3,
            },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                end: "top 30%",
                scrub: 1,
                onEnter: () => {
                  // Change color to Burgundy
                  if (icon) {
                    gsap.to(icon, {
                      backgroundColor: "#8B1B23",
                      borderColor: "#8B1B23",
                      duration: 0.4,
                    });
                    const iconSvg = icon.querySelector("svg");
                    if (iconSvg) {
                      gsap.to(iconSvg, { color: "#ffffff", duration: 0.4 });
                    }
                  }
                  if (connector) {
                    gsap.to(connector, {
                      backgroundColor: "#8B1B23",
                      duration: 0.4,
                    });
                  }
                },
                onLeaveBack: () => {
                  // Change back to gray
                  if (icon) {
                    gsap.to(icon, {
                      backgroundColor: "#e5e7eb",
                      borderColor: "#e5e7eb",
                      duration: 0.4,
                    });
                    const iconSvg = icon.querySelector("svg");
                    if (iconSvg) {
                      gsap.to(iconSvg, { color: "#9ca3af", duration: 0.4 });
                    }
                  }
                  if (connector) {
                    gsap.to(connector, {
                      backgroundColor: "#e5e7eb",
                      duration: 0.4,
                    });
                  }
                },
              },
            }
          );

          // Content Scale In
          gsap.fromTo(
            content,
            {
              scale: 0.95,
              opacity: 0.8,
            },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: "top 60%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#F5F3F0" }}
    >
      <div className="container mx-auto max-w-4xl" ref={timelineRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
            <Target size={20} className="text-[#8B1B23]" />
            <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
              Dein Weg zum Führerschein
            </span>
          </div>

          <h1 className="font-outfit text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            So läuft&apos;s bei uns
          </h1>
          <p className="text-xl text-gray-600 font-dmSans max-w-2xl mx-auto">
            Von der Anmeldung bis zum bestandenen Führerschein – in 6 klaren
            Schritten zum Ziel
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Background Line (Gray) */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300" />

          {/* Animated Line (Burgundy) */}
          <div
            ref={lineRef}
            className="absolute left-8 top-0 bottom-0 w-1 bg-[#8B1B23] origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Steps */}
          <div className="relative space-y-16">
            {TIMELINE_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === TIMELINE_STEPS.length - 1;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepsRef.current[index] = el;
                  }}
                  className="relative flex gap-8 items-start opacity-30"
                >
                  {/* Icon Circle */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="timeline-icon w-16 h-16 rounded-full bg-gray-200 border-4 border-gray-200 flex items-center justify-center relative z-10 transition-all duration-400"
                      style={{ backgroundColor: "#e5e7eb" }}
                    >
                      <Icon size={28} className="text-gray-400" />
                    </div>

                    {/* Connector Line to Content */}
                    {!isLast && (
                      <div
                        className="timeline-connector absolute top-16 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-300"
                        style={{ backgroundColor: "#e5e7eb" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="timeline-content flex-1 pb-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      {/* Step Number */}
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8B1B23]/10 mb-4">
                        <span className="text-sm font-outfit font-bold text-[#8B1B23]">
                          {step.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 font-dmSans text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-gray-700 font-dmSans"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B1B23]" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-2xl p-12 shadow-xl border-2 border-[#8B1B23]/20">
            <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-4">
              Bereit durchzustarten?
            </h3>
            <p className="text-gray-600 font-dmSans text-lg mb-8 max-w-2xl mx-auto">
              Melde dich jetzt an und starte deinen Weg zum Führerschein. Wir
              begleiten dich bei jedem Schritt!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontakt"
                className="px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg shadow-[#8B1B23]/30"
              >
                Jetzt anmelden
              </a>
              <a
                href="https://wa.me/4981521234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white font-dmSans font-semibold rounded-full hover:bg-[#25D366]/90 transition-all shadow-lg"
              >
                WhatsApp Beratung
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
