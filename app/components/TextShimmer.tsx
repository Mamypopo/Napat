"use client";

import { motion } from "framer-motion";

export function TextShimmer({
  children,
  duration = 3.5,
  style,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      style={{
        ...style,
        background:
          "linear-gradient(90deg, var(--text-muted) 0%, var(--text-high) 40%, #553F83 50%, var(--text-high) 60%, var(--text-muted) 100%)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
      }}
      animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
      transition={{ duration, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
    >
      {children}
    </motion.span>
  );
}
