"use client";

import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const faqs = [
  {
    question: "What types of AI solutions do you build?",
    answer:
      "We specialize in Agentic AI systems, machine learning models, NLP solutions, AI automation workflows, and custom software with AI integration. Our solutions span from autonomous agents to predictive analytics.",
  },
  {
    question: "How long does it typically take to build an AI solution?",
    answer:
      "Project timelines vary based on complexity, but most projects range from 4-12 weeks. We provide detailed timelines during our initial consultation after understanding your requirements.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive maintenance packages including monitoring, updates, performance optimization, and scaling support. All solutions include a 30-day warranty period.",
  },
  {
    question: "What's your approach to data security and privacy?",
    answer:
      "We implement enterprise-grade security including encryption at rest/transit, access controls, and compliance with industry standards. All client data is handled with strict confidentiality.",
  },
  {
    question: "Can you integrate AI into our existing systems?",
    answer:
      "Absolutely. We have extensive experience integrating AI capabilities into existing platforms via APIs, microservices, and custom integrations while minimizing disruption to your operations.",
  },
  {
    question: "What's the investment range for AI projects?",
    answer:
      "Project costs vary widely based on scope. We work with businesses of all sizes and offer flexible engagement models. Contact us for a detailed proposal tailored to your needs.",
  },
];

export default function FAQ() {
  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions about our AI development services"
            centered
          />

          <motion.div
            className="max-w-4xl mx-auto mt-12 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 font-heading">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}