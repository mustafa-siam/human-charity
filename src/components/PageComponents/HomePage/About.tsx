"use client";

import { motion } from "motion/react";
import Image from "next/image";

const stats = [
  { value: "50K+", label: "Lives supported annually" },
  { value: "8", label: "Districts actively served" },
  { value: "120+", label: "Community initiatives" },
  { value: "95%", label: "Direct program funding" },
];

export function About() {
  return (
    <section id="about" className="mb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:pr-6"
        >
          <span className="inline-flex items-center gap-2 text-emerald-500 text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-6 h-px bg-emerald-500" />
                About Human Care
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Building dignity,<br />
                <span className="text-emerald-500"> opportunity, and hope</span>
              </h2>
          

          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            Since 2010, Human Care has been working across Bangladesh to support
            underserved communities through education, healthcare access, emergency
            response, and sustainable development programs.
          </p>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-emerald-500 pl-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* IMPACT POINTS (BALANCE + MEANINGFUL CONTENT) */}
          <div className="mt-10 space-y-5">
            <div className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                We work closely with local communities to identify real needs and
                design practical, long-term solutions that create measurable impact.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Our programs focus on education access, basic healthcare, and
                emergency relief for vulnerable families across rural regions.
              </p>
            </div>          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          {/* MAIN IMAGE */}
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/carevalue2.jpg"
              alt="Human Care field work"
              fill
              className="object-cover"
            />
          </div>

          {/* SECONDARY IMAGES */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/care1.jpg"
                alt="Education support program"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/care2.jpg"
                alt="Healthcare outreach work"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}