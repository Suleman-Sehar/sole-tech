"use client";

import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Bot, Brain, MessageSquare, Globe, Lightbulb, Check } from "lucide-react";

const serviceStructuredData = [
  { "@type": "Service", name: "Agentic AI Development", description: "We build autonomous AI agents that can reason, plan, and execute complex tasks independently.", provider: { "@type": "Organization", name: "Sole-Tech" } },
  { "@type": "Service", name: "Machine Learning", description: "Custom ML models tailored to your data, delivering predictive insights.", provider: { "@type": "Organization", name: "Sole-Tech" } },
  { "@type": "Service", name: "NLP Solutions", description: "Natural language processing systems that understand and generate human language.", provider: { "@type": "Organization", name: "Sole-Tech" } },
  { "@type": "Service", name: "Web & Software Development", description: "Modern web applications with AI integration at their core.", provider: { "@type": "Organization", name: "Sole-Tech" } },
  { "@type": "Service", name: "AI Consulting", description: "Strategic guidance for AI adoption and implementation.", provider: { "@type": "Organization", name: "Sole-Tech" } },
];

const services = [
  { id: "agentic-ai", icon: Bot, title: "Agentic AI Development", description: "We build autonomous AI agents that can reason, plan, and execute complex tasks independently, creating intelligent workflows that adapt to your business needs.", features: ["Autonomous Agents", "Multi-Agent Systems", "Workflow Automation", "AI Decision Engines"], image: "/images/services/AI-Agents-SW-Dev.webp" },
  { id: "ml", icon: Brain, title: "Machine Learning", description: "Custom ML models tailored to your data, delivering predictive insights and intelligent automation that drive measurable business outcomes.", features: ["Predictive Analytics", "Recommendation Systems", "Data Intelligence"], image: "/images/services/cyberglossary-type-of-machine-learning.jpg" },
  { id: "nlp", icon: MessageSquare, title: "NLP Solutions", description: "Natural language processing systems that understand, generate, and interact with human language across multiple modalities and contexts.", features: ["Chatbots", "AI Assistants", "Document Intelligence", "Semantic Search"], image: "/images/services/NLP-services.jpg" },
  { id: "web", icon: Globe, title: "Web & Software Development", description: "Modern web applications and SaaS platforms built with AI integration at their core, delivering seamless user experiences.", features: ["SaaS Platforms", "Dashboards", "Enterprise Applications"], image: "/images/services/software-developer-g1372d020e_1280.jpg" },
  { id: "consulting", icon: Lightbulb, title: "AI Consulting", description: "Strategic guidance from AI experts to help you identify opportunities, design architectures, and plan successful AI adoption.", features: ["Strategy", "Architecture Design", "AI Adoption Planning"], image: "/images/services/AI-consulting.jpg" },
];

function ServiceBlock({ service, index }: { service: (typeof services)[0]; index: number }) {
  const isEven = index % 2 === 0;
  const Icon = service.icon;
  const bgColor = isEven ? "bg-[#0F172A]" : "bg-[#111827]";

  return (
    <section id={service.id} className={`py-20 md:py-32 ${bgColor} scroll-mt-20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.div className={isEven ? "" : "lg:order-2"} variants={fadeInUp}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#00D4FF]/20 to-[#008CFF]/20 flex items-center justify-center mb-6">
              <Icon size={48} className="text-[#00D4FF]" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading">{service.title}</h2>
            <p className="text-lg text-gray-300 mb-6 font-body">{service.description}</p>
            <div className="space-y-3 mb-8">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check size={20} className="text-[#00D4FF] mr-3 flex-shrink-0" />
                  <span className="text-gray-400 font-body">{feature}</span>
                </div>
              ))}
            </div>
            <Link href={`/contact?service=${service.id}`}><GradientButton>Discuss This Service</GradientButton></Link>
          </motion.div>
          <motion.div className={isEven ? "" : "lg:order-1"} variants={fadeInUp}>
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": serviceStructuredData }) }} />
      <main>
        <section className="py-20 md:py-32 bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Services" title="Our AI Solutions" subtitle="Comprehensive services to transform your business through artificial intelligence" />
          </div>
        </section>
        {services.map((service, index) => (<ServiceBlock key={service.id} service={service} index={index} />))}
      </main>
    </>
  );
}