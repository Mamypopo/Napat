"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const skills = [
  { name: "Frontend Engineering", level: "Expert" },
  { name: "Backend & API Design", level: "Advanced" },
  { name: "UI/UX & Design Systems", level: "Advanced" },
  { name: "DevOps · AWS · GCP", level: "Proficient" },
  { name: "TypeScript / Go", level: "Expert" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      {/* Full-bleed feature row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          style={{
            position: "relative",
            minHeight: "560px",
            borderRight: "1px solid var(--hairline)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/avatar.png"
            alt="Avatar of Napat"
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "6px 14px",
              borderRadius: "2px",
            }}
          >
            Portrait · BKK 2026
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          style={{ padding: "72px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <p className="eyeline" style={{ marginBottom: "24px" }}>About Me</p>
          <h2
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--text-high)",
              marginBottom: "28px",
            }}
          >
            Precision<br />meets<br /><span style={{ color: "#553F83" }}>Craft.</span>
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "16px" }}>
            ผมคือ Full-Stack Developer ที่หลงใหลใน interface ที่ "รู้สึกดี" — ไม่ใช่แค่ใช้งานได้
            แต่ต้องมีความละเอียดอ่อนในทุกรายละเอียด ตั้งแต่ typography spacing จนถึง database query plan
          </p>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "40px" }}>
            เชี่ยวชาญด้าน React ecosystem, Node.js, และ cloud infrastructure
            พร้อมส่งมอบงานที่ทั้งสวยงามและ performant ในทุกโปรเจกต์
          </p>

          {/* Skills */}
          <div>
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.07 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--hairline)",
                  ...(i === 0 ? { borderTop: "1px solid var(--hairline)" } : {}),
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>
                  {s.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#553F83",
                  }}
                >
                  {s.level}
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "36px" }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                padding: "14px 28px",
                background: "#553F83",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                border: "1px solid #553F83",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6b52a3")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#553F83")}
            >
              ทำงานด้วยกัน →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        {[
          { num: "24+", label: "โปรเจกต์ที่ส่งมอบ" },
          { num: "5yr", label: "ประสบการณ์" },
          { num: "12", label: "ลูกค้าที่พึงพอใจ" },
          { num: "∞", label: "กาแฟที่ดื่มไป" },
        ].map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: i * 0.07 }}
            style={{
              padding: "48px 48px",
              borderRight: i < 3 ? "1px solid var(--hairline)" : "none",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              style={{
                fontSize: "clamp(40px, 5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#553F83",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {s.num}
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
