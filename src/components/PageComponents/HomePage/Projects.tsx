"use client";

import { motion } from "motion/react";
import { ArrowRight, Users, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/components/Hooks/useProjects";
import { ImagePosition } from "@/components/Hooks/ImagePosition";

export function Projects() {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-emerald-500" size={50} />
      </div>
    );
  }

  // Layout: 6 cards — 1 hero (tall left), 2 mid-right stacked, 3 bottom strip
  const hero   = projects[0];
  const midTop = projects[1];
  const midBot = projects[2];
  const strip  = projects.slice(3, 6);

  return (
    <section id="projects" className="mb-24">
      <div className="container mx-auto px-6">
        {/* Header matched perfectly to Contact, Gallery, and Focus structures */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-emerald-500 text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-6 h-px bg-emerald-500" />
              Real-World Change
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              Creating Impact<br />
              <span className="text-emerald-500">Across the Nation</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm lg:text-right">
            We believe in action over promises. Every number represents a face, a story, and a new beginning.
          </p>
        </div>

        {/* ── TOP ROW: hero (left 2/3) + two stacked cards (right 1/3) ── */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* HERO — tall, spans 2 cols */}
          {hero && (
            <Link href={`/projects/${hero.slug}`} className="col-span-2">
              <motion.div
                className="group relative rounded-2xl overflow-hidden bg-gray-900 cursor-pointer"
                style={{ height: "480px" }}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={hero.image}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-center gap-4 text-white/55 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {hero.beneficiaries}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {hero.timeline}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-snug group-hover:text-[#10B981] transition-colors duration-300">
                    {hero.title}
                  </h3>

                  <p className="text-white/65 text-sm leading-relaxed line-clamp-2 mb-5 max-w-lg">
                    {hero.description}
                  </p>

                  <motion.span
                    className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Explore Project <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          )}

          {/* RIGHT COLUMN — two stacked */}
          <div className="col-span-1 flex flex-col gap-3">
            {[midTop, midBot].map((project) =>
              project ? (
                <Link key={project.title} href={`/projects/${project.slug}`} className="flex-1">
                  <motion.div
                    className="group relative rounded-2xl overflow-hidden bg-gray-900 cursor-pointer h-full"
                    style={{ minHeight: "230px" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImagePosition
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white/50 text-xs flex items-center gap-1 mb-1.5">
                        <Users className="w-3 h-3" /> {project.beneficiaries}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#10B981] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ) : null
            )}
          </div>
        </div>

        {/* ── BOTTOM ROW: 3 equal cards ── */}
        <div className="grid grid-cols-3 gap-3">
          {strip.map((project) =>
            project ? (
              <Link key={project.title} href={`/projects/${project.slug}`}>
                <motion.div
                  className="group relative rounded-2xl overflow-hidden bg-gray-900 cursor-pointer"
                  style={{ height: "220px" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImagePosition
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white/45 text-xs flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3" /> {project.timeline}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#10B981] transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-colors duration-300"
                        whileHover={{ rotate: -45 }}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : null
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/projects">
            <motion.button
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}