"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100svh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -60%)",
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(85,63,131,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hairline grid lines for texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity: 0.35,
      }} />

      <div style={{ maxWidth: "520px", width: "100%", position: "relative" }}>
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            fontSize: "clamp(100px, 22vw, 180px)",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(85,63,131,0.4)",
            userSelect: "none",
            marginBottom: "-16px",
          }}
        >
          404
        </motion.div>

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          style={{
            ...MONO, fontSize: "10px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#553F83",
            marginBottom: "20px",
          }}
        >
          PAGE_NOT_FOUND · ERR_404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.2 }}
          style={{
            fontSize: "clamp(36px, 7vw, 64px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.0, color: "var(--text-high)",
            marginBottom: "20px",
          }}
        >
          หน้านี้ไม่<br />มีอยู่แล้ว
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.3 }}
          style={{
            fontSize: "15px", fontWeight: 300,
            color: "var(--text-muted)", lineHeight: 1.75,
            marginBottom: "48px",
          }}
        >
          URL นี้ไม่มีอยู่ หรืออาจถูกย้ายไปแล้ว<br />
          ลองกลับไปที่หน้าแรกได้เลยครับ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px",
              background: "#553F83", color: "#fff",
              fontSize: "13px", fontWeight: 600,
              ...MONO, letterSpacing: "0.06em",
              borderRadius: "2px", textDecoration: "none",
              border: "1px solid #553F83",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6b52a3")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#553F83")}
          >
            ← HOME
          </Link>
          <Link
            href="/#work"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px",
              background: "transparent", color: "var(--text-muted)",
              fontSize: "13px", fontWeight: 400,
              ...MONO, letterSpacing: "0.06em",
              borderRadius: "2px", textDecoration: "none",
              border: "1px solid var(--hairline)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#553F83"; e.currentTarget.style.color = "var(--text-high)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--hairline)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ดูผลงาน →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
