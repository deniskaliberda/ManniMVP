"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { TheoryTerm } from "@/lib/sanity/types";

interface TheoryScheduleProps {
  terms: TheoryTerm[];
}

const STATUS_CONFIG = {
  available: {
    label: "Verfügbar",
    icon: CheckCircle2,
    color: "#10b981", // green
    glow: false,
  },
  limited: {
    label: "Wenige Plätze",
    icon: AlertTriangle,
    color: "#f59e0b", // orange/amber
    glow: true,
  },
  full: {
    label: "Ausgebucht",
    icon: XCircle,
    color: "#6b7280", // gray
    glow: false,
  },
};

export default function TheorySchedule({ terms }: TheoryScheduleProps) {
  if (!terms || terms.length === 0) {
    return (
      <section className="py-24 px-4 bg-[#1a1a1a]">
        <div className="container mx-auto">
          <div className="text-center text-white/60">
            <p>Aktuell keine Termine verfügbar.</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <section className="py-24 px-4 bg-[#1a1a1a]">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-4">
            Theorie-Blockwochen
          </h2>
          <p className="text-xl text-white/70">
            Kompakte Theorieausbildung in Herrsching und Tutzing
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {terms.map((term, index) => {
            const statusConfig = STATUS_CONFIG[term.status];
            const StatusIcon = statusConfig.icon;
            const isFullyBooked = term.status === "full";
            const isLimited = term.status === "limited";

            return (
              <motion.div
                key={term._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative"
              >
                {/* Pulsierender Glow für "Wenige Plätze" */}
                {isLimited && (
                  <>
                    <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-20 blur-xl animate-pulse" />
                    <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </>
                )}

                {/* Card */}
                <div
                  className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                    isFullyBooked
                      ? "bg-[#2a2a2a]/50 border-white/10 opacity-60"
                      : "bg-[#2a2a2a] border-white/20 hover:border-[#8B1B23]/50 hover:shadow-xl"
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.08 + 0.2 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isFullyBooked
                          ? "bg-white/10 text-white/50"
                          : isLimited
                          ? "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30"
                          : "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30"
                      }`}
                    >
                      <StatusIcon size={14} />
                      <span>{statusConfig.label}</span>
                    </motion.div>
                  </div>

                  {/* Month Badge */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                        isFullyBooked
                          ? "bg-white/5"
                          : "bg-[#8B1B23]/20 border border-[#8B1B23]/30"
                      }`}
                    >
                      <Calendar
                        size={20}
                        className={isFullyBooked ? "text-white/40" : "text-[#8B1B23]"}
                      />
                      <span
                        className={`font-outfit text-sm font-semibold ${
                          isFullyBooked ? "text-white/50" : "text-[#8B1B23]"
                        }`}
                      >
                        {term.month}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-outfit text-2xl md:text-3xl font-bold mb-4 ${
                      isFullyBooked ? "text-white/40" : "text-white"
                    }`}
                  >
                    {term.title}
                  </h3>

                  {/* Date Range - Large Display */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center flex-1">
                        <div
                          className={`font-outfit text-3xl font-bold mb-1 ${
                            isFullyBooked ? "text-white/30" : "text-white"
                          }`}
                        >
                          {formatDateShort(term.startDate)}
                        </div>
                        <div
                          className={`text-xs uppercase tracking-wider ${
                            isFullyBooked ? "text-white/20" : "text-white/50"
                          }`}
                        >
                          Start
                        </div>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-lg ${
                          isFullyBooked
                            ? "bg-white/5 text-white/30"
                            : "bg-[#8B1B23]/30 text-[#8B1B23]"
                        }`}
                      >
                        <span className="font-bold">→</span>
                      </div>

                      <div className="text-center flex-1">
                        <div
                          className={`font-outfit text-3xl font-bold mb-1 ${
                            isFullyBooked ? "text-white/30" : "text-white"
                          }`}
                        >
                          {formatDateShort(term.endDate)}
                        </div>
                        <div
                          className={`text-xs uppercase tracking-wider ${
                            isFullyBooked ? "text-white/20" : "text-white/50"
                          }`}
                        >
                          Ende
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin
                      size={18}
                      className={isFullyBooked ? "text-white/30" : "text-white/60"}
                    />
                    <span
                      className={`text-sm capitalize ${
                        isFullyBooked ? "text-white/40" : "text-white/70"
                      }`}
                    >
                      {term.location}
                    </span>
                  </div>

                  {/* Available Spots Display */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl mb-6 ${
                      isFullyBooked
                        ? "bg-white/5"
                        : isLimited
                        ? "bg-[#f59e0b]/10 border border-[#f59e0b]/20"
                        : "bg-[#10b981]/10 border border-[#10b981]/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users
                        size={20}
                        className={
                          isFullyBooked
                            ? "text-white/30"
                            : isLimited
                            ? "text-[#f59e0b]"
                            : "text-[#10b981]"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${
                          isFullyBooked ? "text-white/40" : "text-white/90"
                        }`}
                      >
                        {isFullyBooked ? "Keine Plätze" : "Verfügbare Plätze"}
                      </span>
                    </div>
                    <div
                      className={`font-outfit text-2xl font-bold ${
                        isFullyBooked
                          ? "text-white/30"
                          : isLimited
                          ? "text-[#f59e0b]"
                          : "text-[#10b981]"
                      }`}
                    >
                      {term.availableSpots}/{term.totalSpots}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ 
                          width: `${(term.availableSpots / term.totalSpots) * 100}%` 
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
                        className={`h-full rounded-full ${
                          isFullyBooked
                            ? "bg-white/20"
                            : isLimited
                            ? "bg-[#f59e0b]"
                            : "bg-[#10b981]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {term.description && (
                    <p
                      className={`text-sm mb-6 ${
                        isFullyBooked ? "text-white/30" : "text-white/60"
                      }`}
                    >
                      {term.description}
                    </p>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: isFullyBooked ? 1 : 1.02 }}
                    whileTap={{ scale: isFullyBooked ? 1 : 0.98 }}
                    disabled={isFullyBooked}
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                      isFullyBooked
                        ? "bg-white/5 text-white/30 cursor-not-allowed"
                        : isLimited
                        ? "bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90 shadow-lg shadow-[#f59e0b]/20"
                        : "bg-[#8B1B23] text-white hover:bg-[#8B1B23]/90 shadow-lg shadow-[#8B1B23]/20"
                    }`}
                  >
                    {isFullyBooked
                      ? "Ausgebucht"
                      : isLimited
                      ? "Jetzt schnell sichern!"
                      : "Jetzt anmelden"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
