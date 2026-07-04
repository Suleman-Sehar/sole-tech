"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter, StatGrid } from "@/components/StatCounter";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function StyleGuide() {
  return (
    <main className="bg-[#0F172A] min-h-screen">
      <section className="min-h-screen flex items-center justify-center">
        <AnimatedBackground intensity="medium" className="absolute inset-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading mb-4">
              Sole-Tech Style Guide
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-body">
              Reusable components library
            </p>
          </div>
        </AnimatedBackground>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Components"
            title="GradientButton"
            centered
          />
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <GradientButton>Primary CTA</GradientButton>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GradientButton variant="secondary">Secondary CTA</GradientButton>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GradientButton size="sm">Small Button</GradientButton>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GradientButton size="lg">Large Button</GradientButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Components"
            title="GlassCard"
            centered
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 font-heading">Default Card</h3>
                <p className="text-gray-400 font-body">Glassmorphism effect with hover glow.</p>
              </GlassCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-6" glowOnHover={false}>
                <h3 className="text-xl font-semibold text-white mb-2 font-heading">No Glow</h3>
                <p className="text-gray-400 font-body">Glassmorphism without hover animation.</p>
              </GlassCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-6 cursor-pointer" onClick={() => alert("Clicked!")}>
                <h3 className="text-xl font-semibold text-white mb-2 font-heading">Clickable</h3>
                <p className="text-gray-400 font-body">Click me!</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Components"
            title="StatCounter"
            centered
          />
          <StatGrid
            stats={[
              { value: 150, label: "Projects Delivered", suffix: "+" },
              { value: 10, label: "Years Experience", suffix: "+" },
              { value: 50, label: "Team Members", suffix: "+" },
              { value: 99, label: "Client Satisfaction", suffix: "%" },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Components"
            title="SectionHeading Variants"
            centered
          />
          <div className="space-y-12">
            <SectionHeading
              eyebrow="Eyebrow Text"
              title="Section with Eyebrow and Subtitle"
              subtitle="This is a subtitle that appears below the title when provided."
              centered
            />
            <SectionHeading
              eyebrow="Left Aligned"
              title="Left Aligned Heading"
              subtitle="This heading is left aligned instead of centered."
              centered={false}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Colors"
            title="Brand Colors"
            centered
          />
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#00D4FF]" />
                <p className="text-white font-body text-sm">#00D4FF (Cyan)</p>
              </GlassCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#008CFF]" />
                <p className="text-white font-body text-sm">#008CFF (Blue)</p>
              </GlassCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#0047FF]" />
                <p className="text-white font-body text-sm">#0047FF (Dark Blue)</p>
              </GlassCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#008CFF] to-[#0047FF]" />
                <p className="text-white font-body text-sm">Gradient</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}