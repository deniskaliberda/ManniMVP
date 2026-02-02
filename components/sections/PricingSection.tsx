"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Pricing } from "@/lib/sanity/types";

interface PricingSectionProps {
  pricingData: Pricing[];
}

export default function PricingSection({ pricingData }: PricingSectionProps) {
  if (!pricingData || pricingData.length === 0) {
    return null;
  }

  // Dynamisch das richtige Lucide Icon laden
  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.HelpCircle;
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-4">
            Unsere Preise
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparente Kosten für deine Führerscheinausbildung
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((pricing, index) => {
            const Icon = getIcon(pricing.icon);

            return (
              <motion.div
                key={pricing._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  pricing.popular
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/20"
                    : "border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg"
                }`}
              >
                {/* Popular Badge */}
                {pricing.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    Beliebt
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      pricing.popular
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                </div>

                {/* License Class */}
                <div className="mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Führerschein Klasse
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-outfit text-3xl font-bold mb-2">
                  {pricing.licenseClass}
                </h3>

                <p className="text-lg mb-6">{pricing.name}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-outfit text-4xl font-bold text-primary">
                      {pricing.basePrice}€
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Basispreis
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6">
                  {pricing.description}
                </p>

                {/* Highlights */}
                {pricing.highlights && pricing.highlights.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {pricing.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <LucideIcons.Check
                          size={16}
                          className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Requirements */}
                {pricing.requirements && pricing.requirements.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-muted/50">
                    <h4 className="text-sm font-semibold mb-2">
                      Voraussetzungen:
                    </h4>
                    <div className="space-y-1">
                      {pricing.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {req.label}:
                          </span>
                          <span className="font-medium">{req.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                    pricing.popular
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Mehr erfahren
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
