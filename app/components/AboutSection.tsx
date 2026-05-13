"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "../hooks/useMediaQuery";
import type { SiteSettings } from "../lib/sanity";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: Array<{ label: string; to: number | null; suffix: string }> = [
  { label: "โปรเจกต์ที่ส่งมอบ", to: 24, suffix: "+"  },
  { label: "ประสบการณ์",          to: 5,  suffix: "yr" },
  { label: "ลูกค้าที่พึงพอใจ",    to: 12, suffix: ""   },
  { label: "กาแฟที่ดื่มไป",       to: null, suffix: "" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 1400;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const skills = [
  { name: "Frontend Engineering", level: "Expert" },
  { name: "Backend & API Design", level: "Advanced" },
  { name: "UI/UX & Design Systems", level: "Advanced" },
  { name: "DevOps · AWS · GCP", level: "Proficient" },
  { name: "TypeScript / Go", level: "Expert" },
];

export default function AboutSection({ settings }: { settings?: SiteSettings | null }) {
  const isMobile = useIsMobile();

  const STATS_DATA = settings?.stats?.length
    ? settings.stats.map((s) => ({
        label: s.label ?? "",
        to: s.value ? (Number(s.value.replace(/\D/g, "")) || null) : null,
        suffix: s.value ? s.value.replace(/[0-9]/g, "") : "",
      }))
    : STATS;

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
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
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
            minHeight: isMobile ? "320px" : "560px",
            borderRight: isMobile ? "none" : "1px solid var(--hairline)",
            borderBottom: isMobile ? "1px solid var(--hairline)" : "none",
            overflow: "hidden",
          }}
        >
          <Image
            src={settings?.avatar ?? "/avatar.png"}
            alt={`Avatar of ${settings?.name ?? "Napat"}`}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            unoptimized={!!settings?.avatar}
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
            {settings?.name ?? "Napat"} · BKK {new Date().getFullYear()}
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          style={{ padding: isMobile ? "36px 24px" : "72px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <p className="eyeline" style={{ marginBottom: "12px" }}>About Me</p>
          {(settings?.nickname || settings?.name) && (
            <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px" }}>
              สวัสดี ผมชื่อ{" "}
              <span style={{ color: "var(--text-high)", fontWeight: 600 }}>
                {settings.nickname ?? settings.name}
              </span>{" "}
            </p>
          )}
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
            {settings?.bio ?? "ผมคือ Full-Stack Developer ที่หลงใหลใน interface ที่ “รู้สึกดี” — ไม่ใช่แค่ใช้งานได้ แต่ต้องมีความละเอียดอ่อนในทุกรายละเอียด ตั้งแต่ typography spacing จนถึง database query plan"}
          </p>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "40px" }}>
            {settings?.bio2 ?? "เชี่ยวชาญด้าน React ecosystem, Node.js, และ cloud infrastructure พร้อมส่งมอบงานที่ทั้งสวยงามและ performant ในทุกโปรเจกต์"}
          </p>

          {/* Skills */}
          <div>
            {(settings?.skills?.length ? settings.skills : skills).map((s, i) => (
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
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        {STATS_DATA.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: i * 0.07 }}
            style={{
              padding: isMobile ? "24px 20px" : "48px 48px",
              borderRight: isMobile
                ? (i % 2 === 0 ? "1px solid var(--hairline)" : "none")
                : (i < 3 ? "1px solid var(--hairline)" : "none"),
              borderBottom: isMobile && i < 2 ? "1px solid var(--hairline)" : "none",
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
              {s.to !== null ? <CountUp to={s.to} suffix={s.suffix} /> : "∞"}
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
