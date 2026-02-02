"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Clock,
  Brain,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const ANXIETY_SOLUTIONS = [
  {
    icon: Users,
    title: "Individuelle Vorbereitung",
    description: "Persönliche Betreuung und maßgeschneiderte Übungspläne für deine Bedürfnisse.",
  },
  {
    icon: Brain,
    title: "Entspannungstechniken",
    description: "Bewährte Methoden zur Stressbewältigung und mentalen Vorbereitung.",
  },
  {
    icon: CheckCircle2,
    title: "Prüfungssimulation",
    description: "Realistische Prüfungssituationen üben in sicherer Umgebung.",
  },
];

const STATS = [
  {
    icon: Clock,
    number: "25+",
    label: "Jahre Erfahrung",
    suffix: "",
  },
  {
    icon: TrendingUp,
    number: "98",
    label: "Bestehensquote",
    suffix: "%",
  },
  {
    icon: Star,
    number: "4.9",
    label: "Google Sterne",
    suffix: "",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sophie M.",
    age: 19,
    license: "Klasse B",
    text: "Super entspannte Atmosphäre und geduldige Fahrlehrer. Die Blockwoche war perfekt organisiert und ich habe mich zu keinem Zeitpunkt unter Druck gesetzt gefühlt.",
    rating: 5,
  },
  {
    id: 2,
    name: "Lukas K.",
    age: 21,
    license: "Klasse A2",
    text: "Hatte große Prüfungsangst, aber das Team hat mich super aufgefangen. Die Simulatoren haben mir enorm geholfen, Selbstvertrauen aufzubauen.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria H.",
    age: 24,
    license: "Klasse B",
    text: "Beste Fahrschule am Ammersee! Moderne E-Autos, flexible Termine und vor allem: Man fühlt sich verstanden. Würde ich jedem empfehlen.",
    rating: 5,
  },
  {
    id: 4,
    name: "Jonas R.",
    age: 18,
    license: "Klasse B",
    text: "Die Fahrlehrer nehmen sich wirklich Zeit und gehen auf individuelle Fragen ein. Habe beim ersten Versuch bestanden – vielen Dank!",
    rating: 5,
  },
];

export default function TrustAndSupport() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000); // 7 seconds

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-[#FAFAFA] overflow-hidden">
      {/* Prüfungsangst Section */}
      <div className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
              <Heart size={20} className="text-[#8B1B23]" />
              <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
                Wir verstehen dich
              </span>
            </div>

            <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Prüfungsangst?{" "}
              <span className="text-[#8B1B23]">Du bist nicht allein.</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 font-dmSans max-w-3xl mx-auto leading-relaxed">
              Fast jeder zweite Fahrschüler ist extrem nervös.{" "}
              <span className="font-semibold text-gray-900">
                Wir nehmen uns Zeit.
              </span>
            </p>
          </motion.div>

          {/* Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {ANXIETY_SOLUTIONS.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#8B1B23] to-[#8B1B23]/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#8B1B23]/10 flex items-center justify-center mb-6 group-hover:bg-[#8B1B23]/20 transition-colors duration-300">
                  <solution.icon size={32} className="text-[#8B1B23]" />
                </div>

                {/* Content */}
                <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 font-dmSans leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof & Stats */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 md:p-16 shadow-xl border border-gray-200"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#8B1B23]/10 mb-6">
                    <stat.icon size={32} className="text-[#8B1B23]" />
                  </div>

                  {/* Number */}
                  <div className="font-outfit text-6xl md:text-7xl font-bold text-gray-900 mb-2">
                    {stat.number}
                    <span className="text-[#8B1B23]">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="text-xl font-dmSans text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#8B1B23]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8B1B23]/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
              <Sparkles size={20} className="text-[#8B1B23]" />
              <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
                Das sagen unsere Fahrschüler
              </span>
            </div>

            <h2 className="font-outfit text-4xl md:text-5xl font-bold text-gray-900">
              Erfolgsgeschichten
            </h2>
          </motion.div>

          {/* Testimonial Slider */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="p-12 md:p-16"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(TESTIMONIALS[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className="fill-[#8B1B23] text-[#8B1B23]"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-center mb-8">
                    <p className="text-xl md:text-2xl text-gray-700 font-dmSans leading-relaxed mb-8">
                      &ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B1B23]/10 mb-4">
                      <Award size={28} className="text-[#8B1B23]" />
                    </div>
                    <div className="font-outfit text-xl font-bold text-gray-900">
                      {TESTIMONIALS[currentTestimonial].name}
                    </div>
                    <div className="text-sm font-dmSans text-gray-600 mt-1">
                      {TESTIMONIALS[currentTestimonial].age} Jahre •{" "}
                      {TESTIMONIALS[currentTestimonial].license}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="group w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#8B1B23] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  size={20}
                  className="text-gray-600 group-hover:text-[#8B1B23] transition-colors"
                />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentTestimonial ? 1 : -1);
                      setCurrentTestimonial(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "w-8 bg-[#8B1B23]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="group w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#8B1B23] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight
                  size={20}
                  className="text-gray-600 group-hover:text-[#8B1B23] transition-colors"
                />
              </button>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <button className="px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg shadow-[#8B1B23]/30 hover:shadow-xl hover:shadow-[#8B1B23]/40">
              Jetzt Teil der Community werden
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-[#8B1B23]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-64 h-64 bg-[#8B1B23]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
