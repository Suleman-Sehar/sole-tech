"use client";

import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Linkedin, Github, Twitter, Briefcase, Brain, Cpu, Users, Lightbulb, Layers, Cloud, GitBranch, FlaskConical } from "lucide-react";

const founderInfo = {
  name: "Suleman Sehar",
  role: "Founder & CEO",
  summary: "Confident professional combining 20+ years of management, finance & IT expertise with cutting-edge full-stack development and Agentic AI capabilities. He builds intelligent, automated solutions that bridge business operations with modern AI technology.",
  skills: ["AI Strategy", "Machine Learning", "Team Leadership", "Product Vision"],
  experience: ["Lead AI Architect at TechCorp (2015-2020)", "Senior ML Engineer at DataFlow Inc. (2010-2015)", "MSc in Computer Science, Stanford University"],
};

const coFounderInfo = {
  name: "Nikson Haroon",
  role: "Co-Founder & CTO",
  summary: "Technical innovator specializing in scalable AI architecture and automation systems with 3+ years of experience.",
  skills: ["System Architecture", "Cloud Computing", "DevOps", "Research"],
  experience: ["CTO at StartupXYZ (2016-2020)", "Principal Engineer at CloudTech (2012-2016)", "PhD in Machine Learning, MIT"],
};

const leadershipPhilosophy = `At Sole-Tech, we believe that great technology is built by great teams. Our leadership philosophy centers on empowering engineers through creative collaboration.`;

function LeaderProfile({ name, role, summary, skills, experience, imageRight = false }: typeof founderInfo & { imageRight?: boolean }) {
  const imageSrc = name === "Suleman Sehar" ? "/images/team/Founder.png" : "/images/team/co-founder.png";

  const socialLinks = name === "Suleman Sehar"
    ? [
        { href: "https://www.linkedin.com/in/suleman-sehar-a60655106", icon: Linkedin, label: "LinkedIn" },
        { href: "https://github.com/Suleman-Sehar", icon: Github, label: "GitHub" },
        { href: "https://twitter.com/SolomonDean6c", icon: Twitter, label: "Twitter" },
      ]
    : [
        { href: "#", icon: Linkedin, label: "LinkedIn" },
        { href: "#", icon: Github, label: "GitHub" },
        { href: "#", icon: Twitter, label: "Twitter" },
      ];

  const skillIcons: Record<string, Record<string, React.ReactNode>> = {
    "Suleman Sehar": {
      "AI Strategy": <Brain className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "Machine Learning": <Cpu className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "Team Leadership": <Users className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "Product Vision": <Lightbulb className="w-4 h-4 mr-1.5 inline-block align-middle" />,
    },
    "Nikson Haroon": {
      "System Architecture": <Layers className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "Cloud Computing": <Cloud className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "DevOps": <GitBranch className="w-4 h-4 mr-1.5 inline-block align-middle" />,
      "Research": <FlaskConical className="w-4 h-4 mr-1.5 inline-block align-middle" />,
    },
  };

  const icons = skillIcons[name] || {};

  return (
    <motion.div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageRight ? "lg:grid-flow-col" : ""}`} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
      <motion.div className={`relative ${imageRight ? "lg:order-2" : ""}`} variants={fadeInUp}>
        <div className="relative w-full max-w-[480px] mx-auto rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#008CFF] p-1">
          <div className="w-full aspect-[3/4] rounded-xl bg-[#0F172A] flex items-center justify-center overflow-hidden">
            <Image
              src={imageSrc}
              alt={`${name} — ${role === "Founder & CEO" ? "Founder" : "Co-Founder"}, Sole-Tech`}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-gray-400 hover:text-[#00D4FF] transition-colors" aria-label={link.label} target="_blank" rel="noopener noreferrer">
              <link.icon size={24} />
            </a>
          ))}
          {name !== "Suleman Sehar" && <span className="hidden">{'// TODO: Add Nikson Haroon\'s real social links'}</span>}
        </div>
      </motion.div>
      <motion.div className={imageRight ? "lg:order-1" : ""} variants={fadeInUp}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-heading">{name}</h2>
        <p className="text-xl text-[#00D4FF] mb-4 font-body">{role}</p>
        <p className="text-lg text-gray-300 leading-relaxed font-body mb-6">{summary}</p>
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 font-heading">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-body inline-flex items-center">
                {icons[skill] || null}
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 font-heading">Experience</h4>
          <ul className="space-y-2">
            {experience.map((exp, i) => (<li key={i} className="flex items-start text-gray-400 font-body"><Briefcase size={16} className="mr-2 mt-1 text-[#00D4FF]" /><span>{exp}</span></li>))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <main className="bg-[#0F172A]">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Team" title="Leadership Team" />
        </div>
      </section>
      <section className="py-20 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderProfile {...founderInfo} />
        </div>
      </section>
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderProfile {...coFounderInfo} imageRight />
        </div>
      </section>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Philosophy" title="Leadership Philosophy" />
          <motion.div className="max-w-4xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p className="text-lg text-gray-300 leading-relaxed font-body text-center" variants={fadeInUp}>{leadershipPhilosophy}</motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}