"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  index: string;    // "02"
  label: string;    // "HOW I WORK"
  headline: string; // "Everything you need\nto build great software"
  sub?: string;     // right-side note
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionDivider({ index, label, headline, sub }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--hairline)",
        overflow: "hidden",
      }}
    >
      {/* Top strip — thin eyeline bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 64px",
        borderBottom: "1px solid var(--hairline)",
      }}>
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease }}
        >
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "#553F83",
          }}>
            {index}
          </span>
          <span style={{
            display: "block", width: "28px", height: "1px",
            background: "var(--hairline)",
          }} />
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}>
            {label}
          </span>
        </motion.div>

        {sub && (
          <motion.span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.45,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.45 } : {}}
            transition={{ duration: 0.45, ease, delay: 0.1 }}
          >
            {sub}
          </motion.span>
        )}
      </div>

      {/* Big headline */}
      <div style={{ padding: "72px 64px 80px" }}>
        <motion.h2
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "var(--text-high)",
            whiteSpace: "pre-line",
            maxWidth: "820px",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
        >
          {headline}
        </motion.h2>
      </div>
    </div>
  );
}
