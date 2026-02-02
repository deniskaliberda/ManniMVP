"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
  phone: "4981521234567", // Format: Country code + number (no +, no spaces)
  message: "Hallo Manni, ich interessiere mich für den Führerschein. Kannst du mir weiterhelfen?",
};

export default function WhatsAppWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Fixed Widget Container */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={handleClick}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative w-16 h-16 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center cursor-pointer overflow-visible focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="WhatsApp Chat öffnen"
        >
          {/* Pulse Ring Animation (Burgundy) */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#8B1B23]"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 1.5, 1.8],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Second Pulse Ring (Delayed) */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#8B1B23]"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 1.5, 1.8],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />

          {/* WhatsApp Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <MessageCircle size={32} className="text-white" strokeWidth={2} />
          </motion.div>

          {/* Green Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-50 -z-10" />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="relative bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl font-dmSans text-sm">
                Fragen? Schreib uns direkt!
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
