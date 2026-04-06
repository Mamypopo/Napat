"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  return (
    <>
      {/* Contact CTA — full-bleed */}
      <section
        id="contact"
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--hairline)",
          padding: "120px 64px",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "64px",
          flexWrap: "wrap",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(85,63,131,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyeline" style={{ marginBottom: "20px" }}>Get In Touch</p>
          <h2
            style={{
              fontSize: "clamp(48px, 8vw, 90px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text-high)",
            }}
          >
            มีโปรเจกต์<br />ในใจ<span style={{ color: "#553F83" }}>อยู่?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}
        >
          <a
            href="mailto:hello@napat.dev"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "18px 36px",
              background: "#553F83",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid #553F83",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6b52a3")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#553F83")}
          >
            ส่ง Email มาเลย
          </a>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 36px",
              background: "transparent",
              color: "var(--text-high)",
              fontSize: "15px",
              fontWeight: 400,
              border: "1px solid var(--hairline)",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#553F83";
              e.currentTarget.style.color = "#553F83";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--hairline)";
              e.currentTarget.style.color = "var(--text-high)";
            }}
          >
            LinkedIn Profile
          </a>
        </motion.div>
      </section>

      {/* Footer bar */}
      <footer
        style={{
          borderTop: "1px solid var(--hairline)",
          padding: "28px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg)",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          © 2026 Napat — All rights reserved
        </span>
        <nav style={{ display: "flex", gap: "24px" }}>
          {["GitHub", "Dribbble", "Resume", "hello@napat.dev"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#553F83")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
