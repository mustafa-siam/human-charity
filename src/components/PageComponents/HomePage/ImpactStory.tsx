"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGallery } from "@/components/Hooks/useGallery";

export function ImpactStory() {
  const { items, loading } = useGallery();

  // Show latest 4 images
  const galleryItems = items.slice(0, 4);

  return (
    <section className="mb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header matched perfectly to Contact header structure */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-emerald-500 text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-6 h-px bg-emerald-500" />
                Moments of Care
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Moments that<br />
                <span className="text-emerald-500">define our mission</span>
              </h2>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-3 max-w-md">
              <p className="text-gray-500 text-sm leading-relaxed lg:text-right">
                Explore meaningful moments from our journey — where kindness, support, and collective effort create lasting change in communities.
              </p>
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-emerald-600 font-medium hover:gap-3 transition-all text-sm self-start lg:self-end"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[260px] rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Gallery Images */}
          {!loading && galleryItems.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.url}
                    alt={item.title || "Human Care gallery image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-medium text-sm line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && galleryItems.length === 0 && (
            <div className="py-16 text-center rounded-2xl bg-white">
              <p className="text-gray-500">
                No gallery images available at the moment.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}