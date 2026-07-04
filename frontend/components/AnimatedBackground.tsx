"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnimatedBackgroundProps {
  children?: ReactNode;
  className?: string;
  particleCount?: number;
  intensity?: "low" | "medium" | "high";
  heroBgImage?: boolean;
}

export function AnimatedBackground({
  children,
  className,
  intensity = "medium",
  heroBgImage = false,
}: AnimatedBackgroundProps) {
  const opacity = {
    low: "opacity-10",
    medium: "opacity-20",
    high: "opacity-30",
  }[intensity];

  const particles = [
    { id: 0, size: 3.2, x: 15, y: 20, duration: 15, delay: 1 },
    { id: 1, size: 2.1, x: 80, y: 10, duration: 18, delay: 2 },
    { id: 2, size: 4.5, x: 45, y: 60, duration: 22, delay: 3 },
    { id: 3, size: 2.8, x: 70, y: 35, duration: 20, delay: 4 },
    { id: 4, size: 3.5, x: 25, y: 45, duration: 17, delay: 5 },
    { id: 5, size: 2.3, x: 90, y: 75, duration: 25, delay: 1 },
    { id: 6, size: 3.8, x: 10, y: 80, duration: 19, delay: 2 },
    { id: 7, size: 2.6, x: 60, y: 25, duration: 21, delay: 3 },
    { id: 8, size: 3.1, x: 35, y: 55, duration: 16, delay: 4 },
    { id: 9, size: 2.4, x: 85, y: 40, duration: 23, delay: 5 },
    { id: 10, size: 4.0, x: 50, y: 15, duration: 14, delay: 1 },
    { id: 11, size: 2.9, x: 20, y: 70, duration: 24, delay: 2 },
    { id: 12, size: 3.3, x: 65, y: 30, duration: 17, delay: 3 },
    { id: 13, size: 2.7, x: 40, y: 85, duration: 20, delay: 4 },
    { id: 14, size: 3.6, x: 95, y: 50, duration: 19, delay: 5 },
    { id: 15, size: 2.2, x: 25, y: 65, duration: 22, delay: 1 },
    { id: 16, size: 3.9, x: 75, y: 25, duration: 16, delay: 2 },
    { id: 17, size: 2.5, x: 10, y: 40, duration: 21, delay: 3 },
    { id: 18, size: 3.4, x: 55, y: 90, duration: 18, delay: 4 },
    { id: 19, size: 2.0, x: 40, y: 25, duration: 23, delay: 5 },
  ];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        {heroBgImage && (
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0F172A] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 via-transparent to-[#008CFF]/5" />

        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={cn(
              "absolute rounded-full bg-gradient-to-r from-[#00D4FF] to-[#008CFF]",
              opacity
            )}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#008CFF]/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}