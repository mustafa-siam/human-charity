"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function Notices() {
  return (
    <section className="mb-24 relative overflow-hidden h-[500px] lg:h-[580px]">

      {/* Background Image */}
      <Image
        src="/carevalue.jpg"
        alt="Human Care volunteers helping community members"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Right-side content panel */}
      <div className="absolute inset-0 flex items-center justify-end">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mr-10 lg:mr-20 max-w-sm text-center"
        >
          <p className="text-white/70 uppercase tracking-widest text-xs mb-2">
            Human Care
          </p>

          <h2 className="text-white text-3xl lg:text-4xl font-semibold leading-tight mb-3">
            Compassion Is At The Heart Of What We Do
          </h2>

          {/* Divider */}
          <div className="w-10 h-0.5 bg-emerald-400 mx-auto mb-4" />

          <p className="text-white/80 text-sm leading-relaxed mb-7">
            Support a life. Change a future. Join us in building communities
            with dignity and hope.
          </p>

          <div className="flex flex-col gap-3">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition-colors tracking-wide">
              Join Our Mission
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}