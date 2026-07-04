"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Cpu, ShieldCheck, Layers, Zap, Users, Bot, Workflow, Brain, MessageSquare, Globe, Lightbulb, ArrowRight } from "lucide-react";

const placeholderTestimonials = [
  { quote: "Sole-Tech transformed our business with their AI automation solution.", name: "Sarah Johnson", role: "CTO, TechCorp", rating: 5 },
  { quote: "The team delivered our machine learning model ahead of schedule.", name: "Michael Chen", role: "Head of Innovation, DataFlow Inc.", rating: 5 },
  { quote: "Working with Sole-Tech was seamless.", name: "Emma Rodriguez", role: "CEO, FutureLabs", rating: 5 },
];

const features = [
  { icon: Cpu, title: "AI-First Development", description: "We build solutions with AI at the core." },
  { icon: ShieldCheck, title: "Enterprise Security", description: "Bank-grade security for all our solutions." },
  { icon: Layers, title: "Scalable Architecture", description: "Built to handle growth from day one." },
  { icon: Zap, title: "Rapid Delivery", description: "Agile methodologies for faster time-to-market." },
  { icon: Users, title: "Expert Engineering Team", description: "Seasoned professionals with deep technical expertise." },
];

const services = [
  { icon: Bot, title: "Agentic AI Development", description: "Autonomous AI agents that work for your business.", href: "/services#agentic-ai" },
  { icon: Workflow, title: "AI Automation", description: "Streamline operations with intelligent workflows.", href: "/services#automation" },
  { icon: Brain, title: "Machine Learning", description: "Custom ML models for your specific needs.", href: "/services#ml" },
  { icon: MessageSquare, title: "NLP Solutions", description: "Natural language processing for text and voice.", href: "/services#nlp" },
  { icon: Globe, title: "Web Development", description: "Modern web apps with AI integration.", href: "/services#web" },
  { icon: Lightbulb, title: "AI Consulting", description: "Strategic guidance for AI adoption.", href: "/services#consulting" },
];

const processSteps = [
  { step: "01", title: "Discovery", description: "Understanding your business needs." },
  { step: "02", title: "Strategy", description: "Creating a roadmap for AI implementation." },
  { step: "03", title: "Development", description: "Building the solution with agile sprints." },
  { step: "04", title: "Deployment", description: "Launching with proper monitoring." },
  { step: "05", title: "Optimization", description: "Continuous improvement and scaling." },
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen flex items-center">
        <AnimatedBackground intensity="medium" className="absolute inset-0" heroBgImage>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading leading-tight">
                Building Intelligent AI Solutions That Transform Businesses
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl font-body">
                We design and develop Agentic AI systems, AI automation workflows, machine learning solutions, and custom software that help organizations scale faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <GradientButton className="w-full sm:w-auto">Book Consultation</GradientButton>
                </Link>
                <Link href="/services">
                  <GradientButton variant="secondary" className="w-full sm:w-auto">View Services</GradientButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Sole-Tech"
            subtitle="We combine technical excellence with strategic thinking to deliver AI solutions that drive real business impact."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#008CFF] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-heading">{feature.title}</h3>
                  <p className="text-sm text-gray-400 font-body">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="What We Do"
            subtitle="Comprehensive AI services designed to accelerate your business growth."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="w-10 h-10 mb-4 rounded-lg bg-gradient-to-r from-[#00D4FF]/20 to-[#008CFF]/20 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-heading">{service.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 font-body flex-grow">{service.description}</p>
                  <Link href={service.href} className="text-[#00D4FF] text-sm font-medium flex items-center hover:text-[#008CFF] transition-colors font-body">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Our Client Process"
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D4FF] via-[#008CFF] to-[#0047FF] opacity-30" />

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {processSteps.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative">
                  <div className="lg:text-center">
                    <div className="w-24 h-24 mx-auto lg:mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0047FF] flex items-center justify-center text-2xl font-bold text-white font-heading">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-heading">{step.title}</h3>
                    <p className="text-sm text-gray-400 font-body">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* PLACEHOLDER CONTENT - Replace with real testimonials */}
            {placeholderTestimonials.map((testimonial, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <span key={j} className="text-[#00D4FF]">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 flex-grow font-body italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="text-white font-semibold font-heading">{testimonial.name}</p>
                    <p className="text-sm text-gray-400 font-body">{testimonial.role}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 via-[#008CFF]/20 to-[#0047FF]/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
              Ready to build your next AI solution?
            </h2>
            <Link href="/contact">
              <GradientButton className="mx-auto">Schedule a Call</GradientButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}