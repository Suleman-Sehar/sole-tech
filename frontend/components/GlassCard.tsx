"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glowOnHover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "transition-all duration-300",
        glowOnHover && "hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={glowOnHover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#008CFF]/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}