"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  MessageCircle,
} from "lucide-react";
import type { TheoryTerm } from "@/lib/sanity/types";

interface TermineListProps {
  terms: TheoryTerm[];
}

// Status Badge Component
function StatusBadge({ status, availableSpots }: { status: string; availableSpots?: number }) {
  const getStatusConfig = () => {
    switch (status) {
      case "available":
        return {
          label: "Verfügbar",
          color: "bg-[#00AA00]",
          textColor: "text-white",
          icon: CheckCircle,
          pulse: false,
        };
      case "limited":
        return {
          label: "Wenige Plätze",
          color: "bg-[#CC7700]",
          textColor: "text-white",
          icon: AlertTriangle,
          pulse: true,
        };
      case "full":
        return {
          label: "Ausgebucht",
          color: "bg-gray-400",
          textColor: "text-white",
          icon: XCircle,
          pulse: false,
        };
      default:
        return {
          label: "Unbekannt",
          color: "bg-gray-300",
          textColor: "text-gray-700",
          icon: Info,
          pulse: false,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="relative inline-flex">
      {/* Pulse Animation for Limited */}
      {config.pulse && (
        <>
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.75, 0, 0.75],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.75, 0, 0.75],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* Badge */}
      <span
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.color} ${config.textColor} font-dmSans font-semibold text-sm shadow-lg`}
      >
        <Icon size={16} />
        {config.label}
        {status === "limited" && availableSpots && (
          <span className="ml-1">({availableSpots} frei)</span>
        )}
      </span>
    </div>
  );
}

// Term Card Component
function TermCard({ term, index }: { term: TheoryTerm; index: number }) {
  const isAvailable = term.status === "available" || term.status === "limited";
  const isFull = term.status === "full";

  // Format dates
  const startDate = new Date(term.startDate);
  const endDate = new Date(term.endDate);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const monthName = startDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  // WhatsApp Handler
  const handleReservation = () => {
    const message = `Hallo Manni, ich möchte einen Platz für die Theorie-Blockwoche "${term.title}" (${formatDate(startDate)} - ${formatDate(endDate)}) reservieren.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/4981521234567?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
        isFull
          ? "border-gray-200 opacity-70"
          : "border-gray-200 hover:border-[#8B1B23]/50 hover:shadow-xl"
      }`}
    >
      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge status={term.status} availableSpots={term.availableSpots} />
      </div>

      {/* Month */}
      <div className="mb-3">
        <h3 className="font-outfit text-2xl font-bold text-gray-900">
          {monthName}
        </h3>
      </div>

      {/* Title */}
      <h4 className="font-outfit text-xl font-semibold text-gray-800 mb-4">
        {term.title}
      </h4>

      {/* Details */}
      <div className="space-y-3 mb-6">
        {/* Date Range */}
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={20} className="text-[#8B1B23] flex-shrink-0" />
          <span className="font-dmSans">
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin size={20} className="text-[#8B1B23] flex-shrink-0" />
          <span className="font-dmSans">{term.location || "Herrsching"}</span>
        </div>

        {/* Available Spots */}
        {!isFull && (
          <div className="flex items-center gap-3 text-gray-700">
            <Users size={20} className="text-[#8B1B23] flex-shrink-0" />
            <span className="font-dmSans">
              {term.availableSpots} von {term.totalSpots} Plätzen frei
            </span>
          </div>
        )}

        {/* Full Message */}
        {isFull && (
          <div className="flex items-center gap-3 text-gray-500">
            <XCircle size={20} className="flex-shrink-0" />
            <span className="font-dmSans">Keine Plätze mehr verfügbar</span>
          </div>
        )}
      </div>

      {/* Description */}
      {term.description && (
        <p className="text-sm text-gray-600 font-dmSans mb-6 leading-relaxed">
          {term.description}
        </p>
      )}

      {/* CTA Button */}
      <button
        onClick={handleReservation}
        disabled={isFull}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-dmSans font-semibold transition-all ${
          isFull
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#8B1B23] text-white hover:bg-[#8B1B23]/90 shadow-lg shadow-[#8B1B23]/30 hover:shadow-xl"
        }`}
      >
        <MessageCircle size={18} />
        {isFull ? "Ausgebucht" : "Platz reservieren"}
      </button>
    </motion.div>
  );
}

// Main Component
export default function TermineList({ terms }: TermineListProps) {
  // Group by location
  const herrsching = terms.filter(
    (t) => !t.location || t.location.toLowerCase().includes("herrsching")
  );
  const tutzing = terms.filter((t) =>
    t.location?.toLowerCase().includes("tutzing")
  );
  const other = terms.filter(
    (t) =>
      t.location &&
      !t.location.toLowerCase().includes("herrsching") &&
      !t.location.toLowerCase().includes("tutzing")
  );

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1B23]/10 border border-[#8B1B23]/20 mb-6">
            <Calendar size={20} className="text-[#8B1B23]" />
            <span className="text-sm font-dmSans font-semibold text-[#8B1B23]">
              Theorie-Blockwochen
            </span>
          </div>

          <h1 className="font-outfit text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Verfügbare Termine
          </h1>
          <p className="text-xl text-gray-600 font-dmSans max-w-3xl mx-auto">
            Unsere nächsten Theorie-Blockwochen in Herrsching und Tutzing. Sichere
            dir jetzt deinen Platz!
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-[#8B1B23]/10 to-[#8B1B23]/5 border-2 border-[#8B1B23]/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#8B1B23] flex items-center justify-center">
              <Info size={32} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                In nur 7 Tagen zum Theorie-Abschluss
              </h3>
              <p className="text-gray-700 font-dmSans leading-relaxed">
                Unsere Theorie-Blockwochen sind die perfekte Lösung für alle, die
                schnell und effizient den Theorieteil absolvieren möchten.
                Kompakter Unterricht, moderne Lernmethoden und eine entspannte
                Atmosphäre garantieren deinen Erfolg!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Herrsching Terms */}
        {herrsching.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <MapPin size={28} className="text-[#8B1B23]" />
              <h2 className="font-outfit text-3xl font-bold text-gray-900">
                Herrsching
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#8B1B23]/10 text-[#8B1B23] text-sm font-dmSans font-semibold">
                Hauptsitz
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {herrsching.map((term, index) => (
                <TermCard key={term._id} term={term} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Tutzing Terms */}
        {tutzing.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <MapPin size={28} className="text-[#8B1B23]" />
              <h2 className="font-outfit text-3xl font-bold text-gray-900">
                Tutzing
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutzing.map((term, index) => (
                <TermCard key={term._id} term={term} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Locations */}
        {other.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <MapPin size={28} className="text-[#8B1B23]" />
              <h2 className="font-outfit text-3xl font-bold text-gray-900">
                Weitere Standorte
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {other.map((term, index) => (
                <TermCard key={term._id} term={term} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* No Terms Available */}
        {terms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Calendar size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-outfit text-2xl font-bold text-gray-400 mb-2">
              Keine Termine verfügbar
            </h3>
            <p className="text-gray-500 font-dmSans">
              Neue Termine werden in Kürze veröffentlicht. Kontaktiere uns für
              weitere Informationen.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-12 shadow-xl border-2 border-gray-200">
            <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-4">
              Fragen zu den Terminen?
            </h3>
            <p className="text-gray-600 font-dmSans text-lg mb-8">
              Wir helfen dir gerne bei der Auswahl des passenden Termins und
              beantworten alle deine Fragen.
            </p>
            <a
              href="https://wa.me/4981521234567?text=Hallo%20Manni%2C%20ich%20habe%20eine%20Frage%20zu%20den%20Theorie-Blockwochen."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-dmSans font-semibold rounded-full hover:bg-[#25D366]/90 transition-all shadow-lg"
            >
              <MessageCircle size={20} />
              WhatsApp Beratung
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
