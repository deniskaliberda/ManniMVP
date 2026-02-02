"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MonitorPlay,
  Zap,
  Battery,
  Gauge,
  Shield,
  Car,
  Bike,
  Truck,
  Leaf,
  ChevronRight,
} from "lucide-react";

// GSAP Plugin registrieren
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VEHICLES = [
  {
    category: "PKW",
    icon: Car,
    vehicles: [
      {
        name: "VW ID.3",
        type: "Elektro",
        specs: ["100% Elektrisch", "Reichweite 420 km", "Automatik"],
        isElectric: true,
      },
      {
        name: "VW Golf",
        type: "Hybrid",
        specs: ["Plug-in Hybrid", "Umweltfreundlich", "Modern"],
        isElectric: true,
      },
      {
        name: "VW Polo",
        type: "Benzin",
        specs: ["Kompakt", "Wendig", "Perfekt für Anfänger"],
        isElectric: false,
      },
    ],
  },
  {
    category: "Motorrad",
    icon: Bike,
    vehicles: [
      {
        name: "Kawasaki Z650",
        type: "Klasse A2",
        specs: ["48 PS", "649 ccm", "Modern & Sportlich"],
        isElectric: false,
      },
      {
        name: "Honda CB500F",
        type: "Klasse A2",
        specs: ["47 PS", "471 ccm", "Einsteiger-freundlich"],
        isElectric: false,
      },
    ],
  },
  {
    category: "LKW",
    icon: Truck,
    vehicles: [
      {
        name: "Mercedes Actros",
        type: "Klasse C/CE",
        specs: ["Moderne Technik", "Komfort-Kabine", "Profi-Ausbildung"],
        isElectric: false,
      },
    ],
  },
];

const SIMULATOR_FEATURES = [
  {
    icon: Shield,
    title: "Stressfreies Lernen",
    description: "Fehler machen ohne Konsequenzen",
  },
  {
    icon: Gauge,
    title: "Realistische Szenarien",
    description: "Gefahrensituationen sicher üben",
  },
  {
    icon: Zap,
    title: "Schnellerer Fortschritt",
    description: "Mehr Übungszeit, weniger Kosten",
  },
];

export default function FleetAndSimulator() {
  const sectionRef = useRef<HTMLElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const vehicleCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simulator Section Animation
      if (simulatorRef.current) {
        gsap.from(simulatorRef.current.children, {
          scrollTrigger: {
            trigger: simulatorRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Vehicle Cards Stagger Animation
      if (vehicleCardsRef.current.length > 0) {
        gsap.from(vehicleCardsRef.current, {
          scrollTrigger: {
            trigger: vehicleCardsRef.current[0],
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 60,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Parallax Effect for Background
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -100,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const countElectricVehicles = () => {
    let count = 0;
    VEHICLES.forEach((category) => {
      category.vehicles.forEach((vehicle) => {
        if (vehicle.isElectric) count++;
      });
    });
    return count;
  };

  const electricCount = countElectricVehicles();

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-b from-[#8B1B23]/5 via-transparent to-[#8B1B23]/5 pointer-events-none"
      />

      {/* Simulator Highlight Section */}
      <div className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div
            ref={simulatorRef}
            className="relative backdrop-blur-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#8B1B23]/30 rounded-3xl p-8 md:p-16 overflow-hidden"
          >
            {/* Glow Effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#8B1B23]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B1B23]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/20 border border-[#8B1B23]/40 mb-6">
                <MonitorPlay size={20} className="text-[#8B1B23]" />
                <span className="text-sm font-dmSans font-semibold text-white">
                  Premium Ausstattung
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-outfit text-4xl md:text-6xl font-bold text-white mb-6">
                3 High-End{" "}
                <span className="text-[#8B1B23]">Fahrsimulatoren</span>
              </h2>

              {/* Subline */}
              <p className="text-xl md:text-2xl text-white/70 font-dmSans mb-12 max-w-3xl">
                Stressfrei die Grundlagen lernen – Sicher in die Praxis
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {SIMULATOR_FEATURES.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#8B1B23]/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon size={24} className="text-[#8B1B23]" />
                    </div>
                    <div>
                      <h3 className="font-outfit text-lg font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/60 font-dmSans">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="group flex items-center gap-2 px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg shadow-[#8B1B23]/30 hover:shadow-xl hover:shadow-[#8B1B23]/40">
                Mehr über Simulatoren
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Section */}
      <div className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40 mb-6">
              <Leaf size={20} className="text-green-400" />
              <Battery size={20} className="text-green-400" />
              <span className="text-sm font-dmSans font-bold text-white">
                {electricCount}+ Elektro- & Hybrid-Fahrzeuge
              </span>
            </div>

            <h2 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-4">
              Unser moderner Fuhrpark
            </h2>
            <p className="text-xl text-white/70 font-dmSans max-w-2xl mx-auto">
              Moderne, umweltfreundliche Fahrzeuge für deine Ausbildung
            </p>
          </div>

          {/* Vehicle Categories */}
          <div className="space-y-16">
            {VEHICLES.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#8B1B23]/20 border border-[#8B1B23]/40 flex items-center justify-center">
                    <category.icon size={24} className="text-[#8B1B23]" />
                  </div>
                  <h3 className="font-outfit text-3xl font-bold text-white">
                    {category.category}
                  </h3>
                </div>

                {/* Horizontal Scroll Grid */}
                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {category.vehicles.map((vehicle, vehicleIndex) => {
                      const globalIndex =
                        categoryIndex * 10 + vehicleIndex;
                      return (
                        <div
                          key={vehicle.name}
                          ref={(el) => {
                            vehicleCardsRef.current[globalIndex] = el;
                          }}
                          className="flex-shrink-0 w-80 snap-start"
                        >
                          <div className="group relative h-full bg-white rounded-2xl p-6 shadow-2xl hover:shadow-[#8B1B23]/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                            {/* Electric Badge */}
                            {vehicle.isElectric && (
                              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                                <Zap size={14} />
                                Elektro
                              </div>
                            )}

                            {/* Parallax Background Element */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B1B23]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                              {/* Vehicle Icon */}
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#8B1B23]/20 to-[#8B1B23]/10 flex items-center justify-center mb-4">
                                <category.icon
                                  size={32}
                                  className="text-[#8B1B23]"
                                />
                              </div>

                              {/* Vehicle Info */}
                              <h4 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                                {vehicle.name}
                              </h4>
                              <p className="text-sm font-dmSans text-gray-600 mb-4">
                                {vehicle.type}
                              </p>

                              {/* Specs */}
                              <div className="space-y-2">
                                {vehicle.specs.map((spec, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-gray-700"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B1B23]" />
                                    <span className="font-dmSans">{spec}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Hover Arrow */}
                              <div className="mt-6 flex items-center gap-2 text-[#8B1B23] font-dmSans font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                Details ansehen
                                <ChevronRight
                                  size={16}
                                  className="group-hover:translate-x-1 transition-transform"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Scroll Indicator (Mobile) */}
                  <div className="flex justify-center gap-2 mt-6 md:hidden">
                    {category.vehicles.map((_, index) => (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-white text-gray-900 font-dmSans font-semibold rounded-full hover:bg-white/90 transition-all shadow-xl">
              Alle Fahrzeuge ansehen
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
