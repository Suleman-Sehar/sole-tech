"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function StatCounter({
  value,
  label,
  suffix = "",
  duration = 2,
  className,
}: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={cn("text-center", className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <CountNumber value={value} suffix={suffix} duration={duration} isInView={isInView} />
      <p className="text-gray-400 mt-2 font-body">{label}</p>
    </motion.div>
  );
}

function CountNumber({
  value,
  suffix,
  duration,
  isInView,
}: {
  value: number;
  suffix: string;
  duration: number;
  isInView: boolean;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView || !numberRef.current) return;

    let start = 0;
    const increment = value / (duration * 60);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      if (numberRef.current) {
        numberRef.current.textContent = Math.floor(current).toString();
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span
      ref={numberRef}
      className="text-4xl md:text-5xl font-bold text-gradient font-heading"
    >
      0
    </span>
  );
}

export function StatGrid({
  stats,
  className,
}: {
  stats: { value: number; label: string; suffix?: string }[];
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        className
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={fadeInUp}>
          <StatCounter {...stat} />
        </motion.div>
      ))}
</motion.div>
      );
    }