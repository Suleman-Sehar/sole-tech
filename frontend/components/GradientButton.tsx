"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GradientButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  if (variant === "secondary") {
    return (
      <motion.button
        className={cn(
          "rounded-full border border-white/10 bg-white/5 text-white font-medium",
          "hover:bg-white/10 transition-all duration-300",
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={cn(
        "relative rounded-full font-medium text-white overflow-hidden group",
        "shadow-lg shadow-[#00D4FF]/20",
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#008CFF] to-[#0047FF]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#008CFF] to-[#0047FF] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}