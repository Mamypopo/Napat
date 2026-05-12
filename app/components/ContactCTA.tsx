"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";
import { SiGithub, SiLine } from "react-icons/si";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

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
      background: "#0a0a0a",
      borderTop: "1px solid rgba(255,255,255,0.08)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "32px" }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 8px #4ade80",
            display: "inline-block",
          }} />
          <span style={{ ...MONO, fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: "clamp(36px, 6vw, 80px)",
          fontWeight: 700, letterSpacing: "-0.04em",
          lineHeight: 1.0, color: "#fff",
          marginBottom: "24px",
        }}>
          มาทำงาน<br />
          <span style={{ color: "#F04E00" }}>ด้วยกันไหม.</span>
        </h2>

        <p style={{
          fontSize: "17px", fontWeight: 300,
          color: "rgba(255,255,255,0.45)", lineHeight: 1.75,
          maxWidth: "480px", marginBottom: "52px",
        }}>
          พร้อมรับโปรเจกต์ freelance หรือ full-time
          ทั้ง frontend, backend, และ fullstack
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "60px" }}>
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
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              ...MONO, fontSize: "12px", letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            <HiOutlineDownload size={16} />
            RESUME (PDF)
          </motion.a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "32px" }} />

        {/* Links */}
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{link.icon}</span>
              <span style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
