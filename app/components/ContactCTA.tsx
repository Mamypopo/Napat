"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "./TextShimmer";
import { useIsMobile } from "../hooks/useMediaQuery";
import { SiGithub, SiLine } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "Email",    value: "napat@example.com",          href: "mailto:napat@example.com",        icon: <HiOutlineMail size={16} /> },
  { label: "GitHub",   value: "github.com/napat",           href: "https://github.com/napat",         icon: <SiGithub size={14} />     },
  { label: "LinkedIn", value: "linkedin.com/in/napat",      href: "https://linkedin.com/in/napat",    icon: <FaLinkedin size={14} />   },
  { label: "LINE",     value: "@napat",                     href: "https://line.me/ti/p/~@napat",     icon: <SiLine size={14} />       },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 0",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--hairline)",
  color: "var(--text-high)",
  fontSize: "15px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

export default function ContactCTA() {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  function copyEmail() {
    navigator.clipboard.writeText("napat@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    // TODO: wire to CMS/API
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section
      id="contact"
      style={{
        background: "var(--canvas)",
        borderTop: "1px solid var(--hairline)",
        padding: isMobile ? "64px 24px" : "100px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            background: "#4ade80", boxShadow: "0 0 8px #4ade80",
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
            lineHeight: 1.0, color: "var(--text-high)", marginBottom: "24px",
          }}
        >
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
          }}
        >
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
              ...MONO, fontSize: "12px", letterSpacing: "0.08em", fontWeight: 500,
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
              border: "1px solid var(--hairline)", borderRadius: "4px",
              color: "var(--text-mid)", textDecoration: "none",
              ...MONO, fontSize: "12px", letterSpacing: "0.08em", fontWeight: 500,
            }}
          >
            <HiOutlineDownload size={16} />
            RESUME (PDF)
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "60px" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "var(--text-subtle)", textDecoration: "none",
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

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--hairline)", marginBottom: "48px" }} />

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          <p style={{ ...MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "28px" }}>
            ส่งข้อความ
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "32px",
                border: "1px solid var(--hairline)",
                borderRadius: "4px",
                background: "var(--surface)",
                display: "flex", flexDirection: "column", gap: "8px",
              }}
            >
              <span style={{ fontSize: "24px" }}>✓</span>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>ส่งแล้ว!</p>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>จะติดต่อกลับโดยเร็วที่สุดครับ</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "28px" }}>
                <div>
                  <label style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", display: "block", marginBottom: "8px" }}>
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Napat P."
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputBase}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#553F83")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--hairline)")}
                  />
                </div>
                <div>
                  <label style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", display: "block", marginBottom: "8px" }}>
                    อีเมล
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hello@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputBase}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#553F83")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--hairline)")}
                  />
                </div>
              </div>

              <div>
                <label style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", display: "block", marginBottom: "8px" }}>
                  ข้อความ
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="สวัสดีครับ อยากพูดคุยเรื่อง..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  style={{ ...inputBase, resize: "vertical", minHeight: "100px" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#553F83")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--hairline)")}
                />
              </div>

              <div>
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
                  whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 32px",
                    background: status === "submitting" ? "var(--surface)" : "#553F83",
                    border: "none", borderRadius: "4px",
                    color: status === "submitting" ? "var(--text-muted)" : "#fff",
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    ...MONO, fontSize: "12px", letterSpacing: "0.08em", fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                >
                  {status === "submitting" ? "กำลังส่ง..." : "ส่งข้อความ →"}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
