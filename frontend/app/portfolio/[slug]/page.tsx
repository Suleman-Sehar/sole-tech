"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import Link from "next/link";

const caseStudies = [
  {
    slug: "autonomous-trading-agents",
    title: "Autonomous Trading Agents",
    category: "Agentic Systems",
    overview: "AI agents that analyze market data and execute trades autonomously.",
    challenge: "Client needed to automate trading decisions across multiple markets with minimal human intervention.",
    solution: "Built a multi-agent system using reinforcement learning to optimize trading strategies.",
    results: ["45% increase in trading performance", "Reduced human oversight by 90%", "24/7 autonomous operation"],
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
  },
];

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = useMemo(() => caseStudies.find(s => s.slug === params.slug), [params.slug]);

  if (!study) {
    return notFound();
  }

  return (
    <main>
      <section className="relative py-20 md:py-32 bg-[#0F172A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#008CFF]/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GlassCard className="p-8 md:p-12">
            <span className="text-sm text-[#00D4FF] uppercase tracking-wider font-body">{study.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4 font-heading">
              {study.title}
            </h1>
            <p className="text-lg text-gray-300 font-body">{study.overview}</p>
          </GlassCard>
        </div>
      </section>

      <section className="py-20 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-80 mb-12 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#008CFF]/20 flex items-center justify-center">
            <span className="text-6xl">📊</span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Challenge"
            title="The Challenge"
          />
          <motion.p
            className="text-lg text-gray-300 max-w-4xl font-body"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {study.challenge}
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Solution"
            title="Our Solution"
          />
          <motion.p
            className="text-lg text-gray-300 max-w-4xl font-body"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {study.solution}
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Results"
            title="The Results"
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {study.results.map((result, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-6 text-center">
                  <p className="text-lg text-white font-body">{result}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technologies"
            title="Technologies Used"
          />
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {study.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-body"
                variants={fadeInUp}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
              Have a similar project in mind?
            </h2>
            <Link href="/contact">
              <GradientButton className="mx-auto">Get in Touch</GradientButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function notFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 font-heading">404</h1>
        <h2 className="text-2xl text-gray-300 mb-6 font-body">Case study not found</h2>
        <Link href="/portfolio" className="text-[#00D4FF] hover:text-[#008CFF] font-body">
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}