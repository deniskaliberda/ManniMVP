"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Bike,
  Truck,
  Bus,
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar,
  Award,
  Target,
  Sparkles,
  Zap,
  MessageCircle,
  Euro,
  Battery,
} from "lucide-react";

type VehicleGoal = "auto" | "motorrad" | "lkw" | "bus" | null;
type LicenseClass = "keine" | "AM" | "A1" | "A2" | "A" | "B" | "BE" | "C" | "CE" | "D" | null;

interface ConfiguratorState {
  age: number | null;
  existingLicense: LicenseClass;
  goal: VehicleGoal;
}

const STEPS = [
  {
    id: 1,
    title: "Dein Alter",
    description: "Wie alt bist du?",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Vorbesitz",
    description: "Welchen Führerschein hast du bereits?",
    icon: Award,
  },
  {
    id: 3,
    title: "Dein Ziel",
    description: "Was möchtest du fahren?",
    icon: Target,
  },
  {
    id: 4,
    title: "Zusammenfassung",
    description: "Deine perfekte Fahrausbildung",
    icon: Sparkles,
  },
];

const AGE_OPTIONS = [
  { value: 16, label: "15-16 Jahre" },
  { value: 17, label: "17 Jahre" },
  { value: 18, label: "18 Jahre" },
  { value: 21, label: "21 Jahre" },
  { value: 24, label: "24+ Jahre" },
];

const LICENSE_OPTIONS = [
  { value: "keine", label: "Noch keinen", class: "—" },
  { value: "AM", label: "Roller", class: "AM" },
  { value: "A1", label: "125ccm", class: "A1" },
  { value: "A2", label: "48 PS", class: "A2" },
  { value: "A", label: "Unbegrenzt", class: "A" },
  { value: "B", label: "PKW", class: "B" },
  { value: "BE", label: "PKW + Anhänger", class: "BE" },
];

const GOAL_OPTIONS = [
  {
    value: "auto",
    label: "Auto",
    description: "Klasse B/BE",
    icon: Car,
    classes: ["B", "BE"],
  },
  {
    value: "motorrad",
    label: "Motorrad",
    description: "Klasse A/A1/A2",
    icon: Bike,
    classes: ["A", "A1", "A2"],
  },
  {
    value: "lkw",
    label: "LKW",
    description: "Klasse C/CE",
    icon: Truck,
    classes: ["C", "CE"],
  },
  {
    value: "bus",
    label: "Bus",
    description: "Klasse D",
    icon: Bus,
    classes: ["D"],
  },
];

// WhatsApp-Nummer (ohne +49 und ohne Leerzeichen)
const WHATSAPP_NUMBER = "4917612345678"; // TODO: Echte Nummer eintragen

export default function LicenseConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ConfiguratorState>({
    age: null,
    existingLicense: "keine",
    goal: null,
  });

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.age !== null;
      case 2:
        return formData.existingLicense !== null;
      case 3:
        return formData.goal !== null;
      case 4:
        return formData.age !== null && formData.goal !== null;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);

  const handleNext = () => {
    if (canProceed && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendation = () => {
    const { age, existingLicense, goal } = formData;

    if (!age || !goal) return null;

    let recommendedClass = "";
    let info = "";
    let canStart = true;
    let highlights: string[] = [];
    let showAZAV = false;

    if (goal === "auto") {
      if (age >= 18) {
        recommendedClass = "B";
        info = "PKW-Führerschein - starte jetzt durch!";
        highlights = [
          "3 Premium Fahrsimulatoren",
          "Moderne E-Auto Flotte",
          "Umweltfreundlich & innovativ",
          "Simulatortraining inklusive",
        ];
      } else if (age === 17) {
        recommendedClass = "B";
        info = "Begleitetes Fahren ab 17 (BF17)";
        highlights = [
          "Früher Führerschein mit BF17",
          "E-Auto Ausbildung",
          "Fahrsimulator-Training",
        ];
      } else {
        canStart = false;
        info = "Für Klasse B musst du mindestens 17 Jahre alt sein.";
      }
    } else if (goal === "motorrad") {
      if (age >= 24) {
        recommendedClass = "A";
        info = "Direkteinstieg möglich - unbegrenzte Leistung!";
      } else if (age >= 20 && existingLicense === "A2") {
        recommendedClass = "A";
        info = "Aufstieg von A2 zu A - verkürzte Ausbildung!";
      } else if (age >= 18) {
        recommendedClass = "A2";
        info = "Mittelklasse-Motorräder bis 48 PS";
      } else if (age >= 16) {
        recommendedClass = "A1";
        info = "Leichtkrafträder bis 125ccm - perfekt zum Einsteigen!";
      } else {
        canStart = false;
        info = "Für Motorrad-Führerschein musst du mindestens 16 Jahre alt sein.";
      }
      highlights = ["Moderne Motorrad-Flotte", "Erfahrene Fahrlehrer", "Flexible Termine"];
    } else if (goal === "lkw") {
      showAZAV = true;
      if (existingLicense !== "B" && existingLicense !== "BE") {
        canStart = false;
        info = "Für Klasse C benötigst du zuerst den Führerschein Klasse B.";
      } else if (age >= 21) {
        recommendedClass = "C/CE";
        info = "Berufskraftfahrer-Ausbildung - alle Voraussetzungen erfüllt!";
        highlights = [
          "AZAV-zertifiziert",
          "Förderung möglich (Bildungsgutschein)",
          "Professionelle LKW-Ausbildung",
          "Karriere im Transportwesen",
        ];
      } else if (age >= 18) {
        recommendedClass = "C";
        info = "Ausbildung ab 18 möglich, volle Berechtigung ab 21.";
        highlights = [
          "AZAV-Förderung verfügbar",
          "Frühzeitiger Karrierestart",
          "Professionelle Ausbildung",
        ];
      } else {
        canStart = false;
        info = "Für Klasse C musst du mindestens 18 Jahre alt sein.";
      }
    } else if (goal === "bus") {
      showAZAV = true;
      if (existingLicense !== "B" && existingLicense !== "BE") {
        canStart = false;
        info = "Für Klasse D benötigst du zuerst den Führerschein Klasse B.";
      } else if (age >= 24) {
        recommendedClass = "D";
        info = "Busfahrer-Ausbildung - starte deine Karriere im ÖPNV!";
        highlights = [
          "AZAV-zertifiziert",
          "Bildungsgutschein-Förderung",
          "Karriere im Personenverkehr",
          "Zukunftssicherer Job",
        ];
      } else if (age >= 21) {
        recommendedClass = "D";
        info = "Eingeschränkte Bus-Klasse möglich, volle Berechtigung ab 24.";
        highlights = [
          "AZAV-Förderung möglich",
          "Berufseinstieg im ÖPNV",
        ];
      } else {
        canStart = false;
        info = "Für Klasse D musst du mindestens 21 Jahre alt sein.";
      }
    }

    return { recommendedClass, info, canStart, highlights, showAZAV };
  };

  const recommendation = formData.goal ? getRecommendation() : null;

  const generateWhatsAppLink = () => {
    if (!recommendation) return "";
    
    const message = `Hallo Manni's Fahrschule! Ich interessiere mich für den Führerschein Klasse ${recommendation.recommendedClass}. Ich bin ${formData.age} Jahre alt${formData.existingLicense !== "keine" ? ` und besitze bereits Klasse ${formData.existingLicense}` : ""}. Ich würde gerne mehr erfahren!`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-24 px-4 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B1B23]/5 via-transparent to-[#8B1B23]/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1B23]/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-4">
            Führerschein-Konfigurator
          </h2>
          <p className="text-xl text-white/70 font-dmSans">
            Finde in wenigen Schritten deinen perfekten Führerschein
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-12 gap-2 md:gap-4 flex-wrap">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    currentStep === step.id
                      ? "bg-[#8B1B23] text-white scale-110 shadow-lg shadow-[#8B1B23]/50"
                      : isStepComplete(step.id) && currentStep > step.id
                      ? "bg-[#8B1B23]/30 text-[#8B1B23] border border-[#8B1B23]/50"
                      : "bg-white/5 text-white/40 border border-white/10"
                  }`}
                >
                  {isStepComplete(step.id) && currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span className="text-xs mt-2 font-dmSans hidden md:block text-white/60">
                  {step.title}
                </span>
              </motion.div>
              {index < STEPS.length - 1 && (
                <ChevronRight
                  className="mx-1 md:mx-2 text-white/20 hidden sm:block"
                  size={20}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content - Glassmorphism */}
        <motion.div
          className="backdrop-blur-2xl bg-[#2a2a2a]/80 border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl"
          layout
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Age */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                  {STEPS[0].description}
                </h3>
                <p className="text-white/60 text-center mb-8 font-dmSans">
                  Wähle deine Altersgruppe
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {AGE_OPTIONS.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({ ...formData, age: option.value })
                      }
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.age === option.value
                          ? "border-[#8B1B23] bg-[#8B1B23]/20 shadow-lg shadow-[#8B1B23]/30"
                          : "border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm"
                      }`}
                    >
                      <div
                        className={`text-3xl font-bold font-outfit mb-2 ${
                          formData.age === option.value
                            ? "text-[#8B1B23]"
                            : "text-white"
                        }`}
                      >
                        {option.value}
                      </div>
                      <div className="text-xs text-white/60 font-dmSans">
                        {option.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Existing License */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                  {STEPS[1].description}
                </h3>
                <p className="text-white/60 text-center mb-8 font-dmSans">
                  Vorbesitz kann die Ausbildung verkürzen
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {LICENSE_OPTIONS.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          existingLicense: option.value as LicenseClass,
                        })
                      }
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.existingLicense === option.value
                          ? "border-[#8B1B23] bg-[#8B1B23]/20 shadow-lg shadow-[#8B1B23]/30"
                          : "border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm"
                      }`}
                    >
                      <div
                        className={`text-2xl font-bold font-outfit mb-1 ${
                          formData.existingLicense === option.value
                            ? "text-[#8B1B23]"
                            : "text-white"
                        }`}
                      >
                        {option.class}
                      </div>
                      <div className="text-xs text-white/60 font-dmSans">
                        {option.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Goal */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                  {STEPS[2].description}
                </h3>
                <p className="text-white/60 text-center mb-8 font-dmSans">
                  Wähle dein Fahrzeug
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {GOAL_OPTIONS.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          goal: option.value as VehicleGoal,
                        })
                      }
                      className={`p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${
                        formData.goal === option.value
                          ? "border-[#8B1B23] bg-[#8B1B23]/20 shadow-lg shadow-[#8B1B23]/30"
                          : "border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm"
                      }`}
                    >
                      <option.icon
                        size={48}
                        className={`mx-auto mb-4 ${
                          formData.goal === option.value
                            ? "text-[#8B1B23]"
                            : "text-white/60"
                        }`}
                        strokeWidth={1.5}
                      />
                      <div className="text-lg font-bold font-outfit mb-2 text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-white/60 font-dmSans mb-2">
                        {option.description}
                      </div>
                      {/* Semantic Tags */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {option.classes.map((cls) => (
                          <span
                            key={cls}
                            className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 font-dmSans"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && recommendation && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#8B1B23]/20 border-2 border-[#8B1B23] mb-6"
                  >
                    <Sparkles size={40} className="text-[#8B1B23]" />
                  </motion.div>
                  <h3 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-2">
                    Perfekt für dich!
                  </h3>
                  <p className="text-white/60 font-dmSans">
                    {recommendation.info}
                  </p>
                </div>

                {/* Recommendation Card */}
                <div className="backdrop-blur-xl bg-[#8B1B23]/10 border-2 border-[#8B1B23]/50 rounded-2xl p-8 mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-[#8B1B23] flex items-center justify-center">
                      <Award size={32} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60 font-dmSans mb-1">
                        Empfohlene Klasse
                      </div>
                      <div className="font-outfit text-4xl font-bold text-[#8B1B23]">
                        {recommendation.recommendedClass}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {recommendation.highlights && recommendation.highlights.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {recommendation.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3"
                        >
                          <Check size={20} className="text-[#8B1B23] mt-0.5 flex-shrink-0" />
                          <span className="text-white/90 font-dmSans">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* AZAV Badge */}
                  {recommendation.showAZAV && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40"
                    >
                      <Euro size={24} className="text-[#f59e0b]" />
                      <div>
                        <div className="font-outfit font-bold text-white mb-1">
                          AZAV-Förderung möglich
                        </div>
                        <div className="text-sm text-white/70 font-dmSans">
                          Diese Ausbildung ist förderfähig. Wir beraten dich gerne zum Bildungsgutschein!
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* E-Auto Highlight für Auto */}
                  {formData.goal === "auto" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/40 mt-4"
                    >
                      <Battery size={24} className="text-green-400" />
                      <div>
                        <div className="font-outfit font-bold text-white mb-1 flex items-center gap-2">
                          Moderne E-Auto Flotte
                          <Zap size={16} className="text-green-400" />
                        </div>
                        <div className="text-sm text-white/70 font-dmSans">
                          Lerne mit unseren umweltfreundlichen E-Autos und profitiere von innovativer Fahrzeug-Technologie!
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Your Selection Summary */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50 font-dmSans mb-1">Alter</div>
                    <div className="text-xl font-outfit font-bold text-white">
                      {formData.age} Jahre
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50 font-dmSans mb-1">Vorbesitz</div>
                    <div className="text-xl font-outfit font-bold text-white">
                      {formData.existingLicense === "keine" ? "Keiner" : `Klasse ${formData.existingLicense}`}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2 md:col-span-1">
                    <div className="text-xs text-white/50 font-dmSans mb-1">Ziel</div>
                    <div className="text-xl font-outfit font-bold text-white capitalize">
                      {formData.goal}
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                {recommendation.canStart && (
                  <motion.a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full py-5 px-8 bg-[#8B1B23] text-white font-outfit font-bold text-lg rounded-full shadow-xl shadow-[#8B1B23]/40 hover:bg-[#8B1B23]/90 transition-all"
                    style={{ borderRadius: "100px" }}
                  >
                    <MessageCircle size={24} />
                    Jetzt Platz sichern
                    <ChevronRight size={20} />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-dmSans font-medium transition-all ${
                  currentStep === 1
                    ? "opacity-0 pointer-events-none"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                <ChevronLeft size={20} />
                Zurück
              </motion.button>

              <motion.button
                whileHover={{ scale: canProceed ? 1.05 : 1 }}
                whileTap={{ scale: canProceed ? 0.95 : 1 }}
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-dmSans font-semibold transition-all ${
                  canProceed
                    ? "bg-[#8B1B23] text-white hover:bg-[#8B1B23]/90 shadow-lg shadow-[#8B1B23]/40"
                    : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                }`}
              >
                Weiter
                <ChevronRight size={20} />
              </motion.button>
            </div>
          )}

          {/* Restart Button in Summary */}
          {currentStep === 4 && (
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    age: null,
                    existingLicense: "keine",
                    goal: null,
                  });
                }}
                className="px-6 py-3 rounded-full font-dmSans font-medium bg-white/10 hover:bg-white/20 text-white/80 backdrop-blur-sm transition-all"
              >
                Neu starten
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
