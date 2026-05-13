"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "./TextShimmer";
import { useIsMobile } from "../hooks/useMediaQuery";
import { SiGithub, SiLine } from "react-icons/si";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  {
    label: "Email",
    value: "napat@example.com",
    href: "mailto:napat@example.com",
    icon: <HiOutlineMail size={16} />,
  },
  {
    label: "GitHub",
    value: "github.com/napat",
    href: "https://github.com/napat",
    icon: <SiGithub size={14} />,
  },
  {
    label: "LINE",
    value: "@napat",
    href: "https://line.me/ti/p/~@napat",
    icon: <SiLine size={14} />,
  },
];

export default function ContactCTA() {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("napat@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section style={{
      background: "var(--canvas)",
      borderTop: "1px solid var(--hairline)",
      padding: isMobile ? "64px 24px" : "100px 64px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-120px", left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(240,78,0,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "32px" }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 8px #4ade80",
            display: "inline-block",
          }} />
          <TextShimmer style={{ ...MONO, fontSize: "11px", letterSpacing: "0.1em" }}>
            AVAILABLE FOR WORK
          </TextShimmer>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease, delay: 0.08 }}
          style={{
          fontSize: "clamp(36px, 6vw, 80px)",
          fontWeight: 700, letterSpacing: "-0.04em",
          lineHeight: 1.0, color: "var(--text-high)",
          marginBottom: "24px",
        }}>
          มาทำงาน<br />
          <span style={{ color: "#F04E00" }}>ด้วยกันไหม.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease, delay: 0.15 }}
          style={{
          fontSize: "17px", fontWeight: 300,
          color: "var(--text-muted)", lineHeight: 1.75,
          maxWidth: "480px", marginBottom: "52px",
        }}>
          พร้อมรับโปรเจกต์ freelance หรือ full-time
          ทั้ง frontend, backend, และ fullstack
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease, delay: 0.22 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "60px" }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={copyEmail}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "14px 24px",
              background: "#F04E00", border: "none", borderRadius: "4px",
              color: "#fff", cursor: "pointer",
              ...MONO, fontSize: "12px", letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            <HiOutlineMail size={16} />
            {copied ? "COPIED!" : "COPY EMAIL"}
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            href="/resume.pdf" download
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "14px 24px",
              background: "var(--surface)",
              border: "1px solid var(--hairline)",
              borderRadius: "4px",
              color: "var(--text-mid)", textDecoration: "none",
              ...MONO, fontSize: "12px", letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            <HiOutlineDownload size={16} />
            RESUME (PDF)
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--hairline)", marginBottom: "32px" }} />

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "var(--text-subtle)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-high)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-subtle)"; }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{link.icon}</span>
              <span style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>{link.value}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
