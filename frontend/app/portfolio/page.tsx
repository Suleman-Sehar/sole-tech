"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { CaseStudy, CaseStudyCategory } from "@/types/portfolio";
import { caseStudies } from "@/lib/data/case-studies";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const categories: (CaseStudyCategory | "All")[] = [
  "All",
  "AI Applications",
  "Agentic Systems",
  "Automation Platforms",
  "SaaS Solutions",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory | "All">("All");

  const filteredStudies = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter(study => study.category === activeCategory);

  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="Our Work"
            subtitle="Portfolio & Case Studies"
          />

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-body ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#008CFF] text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
                variants={fadeInUp}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <AnimatePresence>
              {filteredStudies.map((study, i) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  variants={fadeInUp}
                >
<GlassCard className="p-6 h-full flex flex-col">
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 font-heading">{study.title}</h3>
                    <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-[#00D4FF] mb-3 font-body">
                      {study.category}
                    </span>
                    <p className="text-sm text-gray-400 mb-4 font-body flex-grow line-clamp-3">
                      {study.overview}
                    </p>
                    <Link href={`/portfolio/${study.slug}`} className="text-[#00D4FF] text-sm font-medium flex items-center hover:text-[#008CFF] transition-colors font-body">
                      View Case Study →
                    </Link>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}