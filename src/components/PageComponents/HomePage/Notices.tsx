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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end px-2 lg:px-0">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[500px] text-center lg:text-center lg:mr-10"
        >
          <p className="text-white/70 uppercase tracking-[3px] text-xs mb-3">
            Human Care
          </p>

          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-4">
            Together, We Care. <br /> Together, We Change Lives.
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-emerald-400 mx-auto mb-5" />

          <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8">
            Support a life. Change a future. Join us in building communities
            with dignity and hope.
          </p>

          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition-colors tracking-wide w-full sm:w-auto">
            Join Our Mission
          </button>
        </motion.div>
      </div>

    </section>
  );
}