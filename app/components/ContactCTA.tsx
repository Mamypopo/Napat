"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "./TextShimmer";
import { useIsMobile } from "../hooks/useMediaQuery";
import { SiGithub, SiLine } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineDownload, HiOutlinePhone } from "react-icons/hi";
import type { SiteSettings } from "../lib/sanity";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

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

export default function ContactCTA({ settings }: { settings?: SiteSettings | null }) {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const email = settings?.email ?? "napat@example.com";
  const resumeUrl = settings?.resumeFile ?? settings?.resumeUrl ?? "/resume.pdf";
  const isAvailable = settings?.available ?? true;

  const LINKS = [
    { label: "Email",  value: email,  href: `mailto:${email}`, icon: <HiOutlineMail size={16} /> },
    ...(settings?.phone    ? [{ label: "Phone",    value: settings.phone,                                  href: `tel:${settings.phone}`,                          icon: <HiOutlinePhone size={14} /> }] : []),
    ...(settings?.github   ? [{ label: "GitHub",   value: settings.github.replace("https://", ""),         href: settings.github,                                  icon: <SiGithub size={14} />       }] : []),
    ...(settings?.linkedin ? [{ label: "LinkedIn", value: settings.linkedin.replace("https://", ""),       href: settings.linkedin,                                icon: <FaLinkedin size={14} />     }] : []),
    ...(settings?.line     ? [{ label: "LINE",     value: `@${settings.line}`,                             href: `https://line.me/ti/p/~${settings.line}`,         icon: <SiLine size={14} />         }] : []),
  ];

  function copyEmail() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
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

        {/* Status + meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}
        >
          {/* Available dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: isAvailable ? "#4ade80" : "#f87171",
              boxShadow: isAvailable ? "0 0 8px #4ade80" : "0 0 8px #f87171",
              display: "inline-block",
            }} />
            <TextShimmer style={{ ...MONO, fontSize: "11px", letterSpacing: "0.1em" }}>
              {isAvailable ? "AVAILABLE FOR WORK" : "NOT AVAILABLE"}
            </TextShimmer>
          </div>

          {/* Work mode tag */}
          {settings?.workMode && (
            <span style={{
              ...MONO, fontSize: "10px", letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              border: "1px solid var(--hairline)",
              borderRadius: "2px",
              color: "var(--text-subtle)",
            }}>
              {settings.workMode}
            </span>
          )}

          {/* Language tags */}
          {settings?.languages?.map((l) => (
            <span key={l.lang} style={{
              ...MONO, fontSize: "10px", letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              border: "1px solid var(--hairline)",
              borderRadius: "2px",
              color: "var(--text-subtle)",
            }}>
              {l.lang} · {l.level}
            </span>
          ))}
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
            href={resumeUrl} download
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
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "4px",
                background: "var(--surface)",
                display: "flex", flexDirection: "column", gap: "8px",
              }}
            >
              <span style={{ fontSize: "20px", color: "#4ade80" }}>✓</span>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>ส่งแล้ว!</p>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>จะติดต่อกลับโดยเร็วที่สุดครับ</p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "32px",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "4px",
                background: "var(--surface)",
                display: "flex", flexDirection: "column", gap: "8px",
              }}
            >
              <span style={{ fontSize: "20px", color: "#f87171" }}>✕</span>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>ส่งไม่สำเร็จ</p>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>กรุณาลองอีกครั้ง หรือติดต่อผ่านอีเมลโดยตรงครับ</p>
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
