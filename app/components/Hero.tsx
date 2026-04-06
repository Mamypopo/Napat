"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Full-bleed background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=1800&q=85&auto=format&fit=crop"
          alt="Hero background"
          fill
          priority
          style={{
            objectFit: "cover",
            filter: "brightness(0.22) contrast(1.1)",
          }}
        />
        {/* Gradient overlay — darkens bottom for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.7) 60%, rgba(17,17,17,1) 100%)",
          }}
        />
      </div>

      {/* Radial purple glow top-left */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(85,63,131,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 64px 80px",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        {/* Eyeline */}
        <motion.p
          className="eyeline"
          style={{ marginBottom: "24px", color: "rgba(255,255,255,0.5)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          Full-Stack Developer · Bangkok · 2026
        </motion.p>

        {/* Display heading */}
        <motion.h1
          style={{
            fontSize: "clamp(64px, 10vw, 120px)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            marginBottom: "40px",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          Ship<br />
          Software<br />
          <span style={{ color: "#553F83" }}>Peace</span>fully.
        </motion.h1>

        {/* Sub + CTA row */}
        <motion.div
          style={{ display: "flex", alignItems: "flex-end", gap: "64px", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.38 }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "400px",
            }}
          >
            ผมสร้าง digital products ที่ทั้งสวยงาม แม่นยำ
            และมีประสิทธิภาพสูง — จาก interface จนถึง infrastructure
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href="#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "#553F83",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                border: "1px solid #553F83",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6b52a3";
                e.currentTarget.style.borderColor = "#6b52a3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#553F83";
                e.currentTarget.style.borderColor = "#553F83";
              }}
            >
              ดูผลงาน
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                background: "transparent",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 400,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#553F83")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              ติดต่อ
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--hairline)",
          zIndex: 3,
        }}
      />
    </section>
  );
}
