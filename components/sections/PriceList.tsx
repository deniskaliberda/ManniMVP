"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Award, Euro } from "lucide-react";
import Link from "next/link";

// Types
interface PricingData {
  _id: string;
  name: string;
  licenseClass: string;
  category: "privat" | "gewerblich";
  description: string;
  basePrice: number;
  priceDetails?: string;
  highlights: string[];
  popular?: boolean;
  azavCertified?: boolean;
}

interface PriceListProps {
  pricingData: PricingData[];
}

export default function PriceList({ pricingData }: PriceListProps) {
  const [selectedCategory, setSelectedCategory] = useState<"privat" | "gewerblich">("privat");

  // Filter data based on selected category
  const filteredData = pricingData.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
            <Euro size={20} className="text-[#8B1B23]" />
            <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
              Preise & Pakete
            </span>
          </div>

          <h1 className="font-outfit text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Dein Weg zum Führerschein
          </h1>
          <p className="text-xl text-gray-600 font-dmSans max-w-3xl mx-auto">
            Transparente Preise für alle Führerscheinklassen. Finde das passende
            Paket für deine Ziele.
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-16"
        >
          <div className="relative inline-flex items-center p-1 bg-gray-200 rounded-full">
            {/* Background Slider */}
            <motion.div
              className="absolute top-1 bottom-1 bg-[#8B1B23] rounded-full"
              initial={false}
              animate={{
                left: selectedCategory === "privat" ? "4px" : "calc(50%)",
                right: selectedCategory === "privat" ? "calc(50%)" : "4px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Buttons */}
            <button
              onClick={() => setSelectedCategory("privat")}
              className={`relative z-10 px-8 py-3 rounded-full font-dmSans font-semibold transition-colors duration-300 ${
                selectedCategory === "privat"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Privat (PKW, Motorrad)
            </button>
            <button
              onClick={() => setSelectedCategory("gewerblich")}
              className={`relative z-10 px-8 py-3 rounded-full font-dmSans font-semibold transition-colors duration-300 ${
                selectedCategory === "gewerblich"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Gewerblich (LKW, Bus)
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredData.map((pricing, index) => (
              <PricingCard
                key={pricing._id}
                pricing={pricing}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#8B1B23]/10 to-[#8B1B23]/5 border border-[#8B1B23]/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                Individuelle Beratung gewünscht?
              </h3>
              <p className="text-gray-600 font-dmSans">
                Wir helfen dir, das perfekte Paket zu finden und klären alle
                Fragen zu Förderungen und Finanzierung.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-[#8B1B23] text-white font-dmSans font-semibold rounded-full hover:bg-[#8B1B23]/90 transition-all shadow-lg shadow-[#8B1B23]/30 whitespace-nowrap"
            >
              Kostenlos beraten lassen
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== PRICING CARD COMPONENT =====
interface PricingCardProps {
  pricing: PricingData;
  index: number;
}

function PricingCard({ pricing, index }: PricingCardProps) {
  const isPopular = pricing.popular;
  const isAZAV = pricing.azavCertified;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="relative"
    >
      <div
        className={`h-full bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isPopular
            ? "border-[#8B1B23] shadow-2xl shadow-[#8B1B23]/20"
            : "border-gray-200 hover:border-[#8B1B23]/50 hover:shadow-xl"
        }`}
      >
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8B1B23] text-white text-sm font-bold shadow-lg">
              <Sparkles size={14} />
              Beliebt
            </div>
          </div>
        )}

        {/* AZAV Badge */}
        {isAZAV && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f59e0b] text-white text-sm font-bold shadow-lg">
              <Award size={14} />
              AZAV-zertifiziert
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="p-8">
          {/* License Class */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              isPopular
                ? "bg-[#8B1B23]/10 border-2 border-[#8B1B23]/30"
                : "bg-gray-100 border-2 border-gray-200"
            }`}
          >
            <span
              className={`font-outfit text-2xl font-bold ${
                isPopular ? "text-[#8B1B23]" : "text-gray-700"
              }`}
            >
              {pricing.licenseClass}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">
            {pricing.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 font-dmSans mb-6 leading-relaxed">
            {pricing.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500 font-dmSans">ab</span>
              <span className="font-outfit text-4xl font-bold text-gray-900">
                {pricing.basePrice.toLocaleString("de-DE")}
              </span>
              <span className="text-lg text-gray-500 font-dmSans">€</span>
            </div>
            {pricing.priceDetails && (
              <p className="text-sm text-gray-500 font-dmSans mt-1">
                {pricing.priceDetails}
              </p>
            )}
          </div>

          {/* Highlights / Features */}
          {pricing.highlights && pricing.highlights.length > 0 && (
            <div className="mb-8">
              <div className="space-y-3">
                {pricing.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        isPopular
                          ? "bg-[#8B1B23]/10"
                          : "bg-gray-100"
                      }`}
                    >
                      <Check
                        size={14}
                        className={isPopular ? "text-[#8B1B23]" : "text-gray-600"}
                      />
                    </div>
                    <span className="text-sm text-gray-700 font-dmSans leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AZAV Info */}
          {isAZAV && (
            <div className="mb-6 p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30">
              <p className="text-sm text-gray-700 font-dmSans">
                <strong>Förderung möglich:</strong> Diese Ausbildung ist
                AZAV-zertifiziert und kann über Bildungsgutschein gefördert werden.
              </p>
            </div>
          )}

          {/* CTA Button */}
          <Link
            href={`/kontakt?class=${encodeURIComponent(pricing.licenseClass)}`}
            className={`block w-full text-center px-6 py-3 rounded-full font-dmSans font-semibold transition-all ${
              isPopular
                ? "bg-[#8B1B23] text-white hover:bg-[#8B1B23]/90 shadow-lg shadow-[#8B1B23]/30"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Details anfragen
          </Link>
        </div>

        {/* Glow Effect for Popular */}
        {isPopular && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8B1B23]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        )}
      </div>
    </motion.div>
  );
}
