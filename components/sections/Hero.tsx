"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import für 3D-Komponente (Client-side only)
const SimulatorScene = dynamic(() => import("./SimulatorScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl">
      <div className="animate-pulse text-primary">Lädt...</div>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-dmSans font-medium text-primary">
                Premium Fahrschule in Herrsching
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Dein Führerschein.{" "}
              <span className="text-primary">Entspannt</span> gemacht.
            </h1>

            {/* Subline */}
            <p className="font-dmSans text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Moderne Fahrausbildung mit innovativen Simulatoren und umweltfreundlichen 
              E-Autos. Erlebe Premium-Qualität am Ammersee.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <span className="text-sm font-dmSans">3 Premium-Simulatoren</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <span className="text-sm font-dmSans">E-Auto Flotte</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <span className="text-sm font-dmSans">Flexible Termine</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary Button */}
              <Link href="/anmelden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-primary text-white font-dmSans font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ borderRadius: "100px" }}
                >
                  Jetzt anmelden
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>

              {/* Secondary Button */}
              <Link href="/fuehrerscheine">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white border-2 border-primary/20 text-foreground font-dmSans font-semibold rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                  style={{ borderRadius: "100px" }}
                >
                  Angebot ansehen
                  <Play
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-8 pt-8 border-t border-border/50"
            >
              <div>
                <div className="font-outfit text-3xl font-bold text-primary">500+</div>
                <div className="text-sm font-dmSans text-muted-foreground">
                  Zufriedene Fahrschüler
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-outfit text-3xl font-bold text-primary">98%</div>
                <div className="text-sm font-dmSans text-muted-foreground">
                  Erfolgsquote
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-outfit text-3xl font-bold text-primary">15+</div>
                <div className="text-sm font-dmSans text-muted-foreground">
                  Jahre Erfahrung
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Simulator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glassmorphism Container */}
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
              
              {/* Main Container */}
              <div className="relative h-full backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
                {/* 3D Scene */}
                <SimulatorScene />

                {/* Floating Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/80 border border-white/60 rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Play size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-outfit font-bold text-foreground">
                        Premium Simulator
                      </div>
                      <div className="text-sm font-dmSans text-muted-foreground">
                        Innovative 3D-Technologie
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-dmSans text-muted-foreground uppercase tracking-wider">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
