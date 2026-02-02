"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import type { TheoryTerm } from "@/lib/sanity/types";

interface TheoryTermsSectionProps {
  terms: TheoryTerm[];
}

const STATUS_CONFIG = {
  available: {
    label: "Verfügbar",
    color: "bg-green-500/10 text-green-700 border-green-500/20",
    icon: "✓",
  },
  limited: {
    label: "Nur noch wenige Plätze",
    color: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    icon: "⚠",
  },
  full: {
    label: "Ausgebucht",
    color: "bg-red-500/10 text-red-700 border-red-500/20",
    icon: "✕",
  },
};

export default function TheoryTermsSection({ terms }: TheoryTermsSectionProps) {
  if (!terms || terms.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-4">
            Nächste Theorie-Blockwochen
          </h2>
          <p className="text-xl text-muted-foreground">
            Sichere dir jetzt deinen Platz für die Theorieausbildung
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term, index) => {
            const statusConfig = STATUS_CONFIG[term.status];

            return (
              <motion.div
                key={term._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300"
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                >
                  {statusConfig.icon} {statusConfig.label}
                </div>

                {/* Month Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Calendar size={24} />
                    <span className="font-outfit text-lg font-semibold">
                      {term.month}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-outfit text-2xl font-bold mb-4">
                  {term.title}
                </h3>

                {/* Date Range */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock size={16} />
                  <span>
                    {formatDate(term.startDate)} - {formatDate(term.endDate)}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin size={16} />
                  <span className="capitalize">{term.location}</span>
                </div>

                {/* Available Spots */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-4">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    <span className="font-medium">Verfügbare Plätze</span>
                  </div>
                  <span className="font-outfit text-2xl font-bold text-primary">
                    {term.availableSpots}/{term.totalSpots}
                  </span>
                </div>

                {/* Times */}
                {term.times && term.times.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Zeiten:</h4>
                    <div className="space-y-1">
                      {term.times.slice(0, 2).map((time, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-muted-foreground flex justify-between"
                        >
                          <span>{time.day}</span>
                          <span>{time.time}</span>
                        </div>
                      ))}
                      {term.times.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          + {term.times.length - 2} weitere Termine
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                {term.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {term.description}
                  </p>
                )}

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: term.status !== "full" ? 1.02 : 1 }}
                  whileTap={{ scale: term.status !== "full" ? 0.98 : 1 }}
                  disabled={term.status === "full"}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                    term.status === "full"
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                  }`}
                >
                  {term.status === "full" ? "Ausgebucht" : "Jetzt anmelden"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
