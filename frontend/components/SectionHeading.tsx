"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-12", centered && "text-center", className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {eyebrow && (
        <span className="text-sm font-medium text-[#00D4FF] uppercase tracking-wider mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-3xl font-body">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}