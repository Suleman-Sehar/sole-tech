"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { StatGrid } from "@/components/StatCounter";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const placeholderStory = `Sole-Tech was founded in 2020 with a vision to democratize artificial intelligence for businesses of all sizes. Our founders, coming from diverse backgrounds in software engineering and data science, recognized that AI transformation was becoming essential for competitive advantage in the modern digital landscape. Starting from a small garage office, we've grown to serve clients across multiple industries, helping them harness the power of machine learning, automation, and intelligent systems to solve real-world problems. Today, we continue to innovate and push the boundaries of what's possible with AI, maintaining our commitment to excellence and client success.`;

// PLACEHOLDER CONTENT - Replace with actual mission/vision/values
const missionVisionValues = [
  {
    title: "Mission",
    description: "To empower organizations with cutting-edge AI solutions that drive measurable business outcomes and sustainable growth.",
  },
  {
    title: "Vision",
    description: "A world where every business leverages artificial intelligence to solve complex challenges and create value for their customers.",
  },
  {
    title: "Core Values",
    description: "Innovation, Integrity, Excellence, Collaboration, and Customer-Centricity guide everything we do.",
  },
];

// PLACEHOLDER CONTENT - Replace with actual statistics
const companyHighlights = [
  { value: 150, label: "Projects Delivered", suffix: "+" },
  { value: 12, label: "Industries Served", suffix: "+" },
  { value: 50, label: "Years of Combined Experience", suffix: "+" },
];

export default function About() {
  return (
    <main>
      <section className="relative min-h-[40vh] flex items-center bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading">
              About Sole-Tech
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-4 font-body">
              Building the future of AI-powered business solutions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="Company Story"
          />
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              className="text-lg text-gray-300 leading-relaxed font-body"
              variants={fadeInUp}
            >
              {/* PLACEHOLDER CONTENT - Replace with actual company story */}
              {placeholderStory}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Foundation"
            title="Mission, Vision & Core Values"
            centered
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {missionVisionValues.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-8 h-full text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 font-heading">{item.title}</h3>
                  <p className="text-gray-400 font-body">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Highlights"
            title="Company Highlights"
            centered
          />
          <StatGrid stats={companyHighlights} />
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Vision"
            title="Innovating the Future"
          />
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp}>
              <p className="text-lg text-gray-300 leading-relaxed font-body mb-6">
                We envision a world where artificial intelligence seamlessly integrates with human creativity and business acumen. Our approach combines technical excellence with strategic thinking, ensuring that every AI solution we build not only meets current needs but also scales for future opportunities.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-body">
                Through continuous research, development, and collaboration with industry leaders, we strive to stay at the forefront of AI innovation, delivering solutions that transform how businesses operate and compete.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <AnimatedBackground intensity="low" className="h-80 rounded-2xl">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#008CFF] flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-body">AI Innovation at Work</p>
                  </div>
                </div>
              </AnimatedBackground>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}