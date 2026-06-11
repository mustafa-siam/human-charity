"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Heart, Loader2 } from "lucide-react";
import { useHero } from "@/components/Hooks/useHero";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const { hero, loading } = useHero();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!hero?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === hero.images.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [hero]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading || !hero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
      </div>
    );
  }

  const { badgeText, headline, description, images, donateLink } = hero;

  return (
    <section className="relative min-h-screen mb-24 overflow-hidden">

      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center lg:bg-right"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="
            w-full
            max-w-3xl
            px-6
            sm:px-10
            lg:px-20
            xl:px-28
          "
        >

      
          <h1
            className="
              text-white
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-semibold
              leading-[1.15]
              mb-6
              tracking-tight
            "
          >
            {headline}
          </h1>

          {/* DESCRIPTION (SOFTER) */}
          <p
            className="
              text-white/80
              text-base
              sm:text-lg
              leading-relaxed
              max-w-xl
              mb-10
            "
          >
            {description}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
             onClick={() => scrollToSection("contact")}
              className="
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                px-7 py-3.5
                rounded-md
                font-medium
                inline-flex
                items-center
                justify-center
                gap-2 cursor-pointer
                transition
              "
            >
              Donate Now
              <Heart size={16} fill="currentColor" />
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className="
                border border-white/80
                text-white
                hover:bg-white
                hover:text-black
                px-7 py-3.5
                rounded-md
                font-medium
                inline-flex
                items-center
                justify-center
                gap-2 cursor-pointer
                transition
              "
            >
              Explore Our Work
              <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              h-2.5 rounded-full transition-all duration-300
              ${index === currentIndex
                ? "bg-white w-6"
                : "bg-white/40 w-2.5 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>

      {/* FADE */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
    </section>
  );
}