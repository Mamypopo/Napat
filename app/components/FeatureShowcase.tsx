"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Tab data ─────────────────────────────────────────────── */
const tabs = [
  { id: "education",  label: "Education"  },
  { id: "experience", label: "Experience" },
  { id: "freelance",  label: "Freelance"  },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ── Timeline data per tab ────────────────────────────────── */
const scenes: Record<TabId, {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  highlights: string[];
  badge: string;
  badgeAccent?: boolean;
  milestones: { label: string; x: number; y: number; dim?: boolean }[];
  nodes: { id: string; x: number; y: number; label: string; accent?: boolean; detail?: string }[];
  lines: { x1: number; y1: number; x2: number; y2: number }[];
}> = {
  education: {
    period: "2019 — 2023",
    role: "Bachelor of Computer Science",
    org: "Kasetsart University",
    location: "Bangkok, Thailand",
    description:
      "ศึกษาด้าน Computer Science ตั้งแต่ foundations ถึง software engineering — ผ่านทั้ง theory และ hands-on projects ตลอด 4 ปี",
    highlights: [
      "Senior project: Real-time collaborative code editor",
      "TA วิชา Data Structures & Algorithms ปีที่ 3–4",
      "รางวัลชนะเลิศ Hackathon ระดับมหาวิทยาลัย 2022",
    ],
    badge: "GRADUATED",
    milestones: [
      { label: "2019",            x: 0, y: 8  },
      { label: "ENROLLED",        x: 0, y: 17, dim: true },
      { label: "2020",            x: 0, y: 28 },
      { label: "2021",            x: 0, y: 44 },
      { label: "TA ALGORITHMS",   x: 0, y: 53, dim: true },
      { label: "HACKATHON WIN",   x: 0, y: 61, dim: true },
      { label: "2022",            x: 0, y: 72 },
      { label: "SENIOR PROJECT",  x: 0, y: 81, dim: true },
      { label: "2023",            x: 0, y: 92 },
    ],
    nodes: [
      { id: "e1", x: 12, y: 20, label: "ALGORITHMS",      detail: "Sorting, graph, dynamic programming — ใช้ทุกครั้งที่ optimize code" },
      { id: "e2", x: 12, y: 42, label: "DATA STRUCTURES", detail: "Tree, hash map, linked list — foundation ของทุก system design" },
      { id: "e3", x: 12, y: 63, label: "DATABASES",       detail: "Relational model, SQL, normalization — ออกแบบ schema ได้ถูกต้องตั้งแต่ต้น" },
      { id: "e4", x: 12, y: 82, label: "NETWORKING",      detail: "TCP/IP, HTTP, DNS — เข้าใจ protocol ที่อยู่ใต้ทุก web app" },
      { id: "e5", x: 62, y: 22, label: "PYTHON",          detail: "First language — ใช้ทำ algorithm assignments และ data projects" },
      { id: "e6", x: 62, y: 44, label: "JAVA",            detail: "OOP deep dive — เรียนรู้ design patterns และ concurrency" },
      { id: "e7", x: 62, y: 66, label: "C / C++",         detail: "Low-level programming — memory management และ pointer arithmetic" },
      { id: "e8", x: 88, y: 44, label: "KU · BKK", accent: true, detail: "Kasetsart University, Bangkok — B.Sc. Computer Science 2019–2023" },
    ],
    lines: [
      { x1: 18, y1: 20, x2: 62, y2: 22 },
      { x1: 18, y1: 42, x2: 62, y2: 44 },
      { x1: 18, y1: 63, x2: 62, y2: 66 },
      { x1: 18, y1: 82, x2: 62, y2: 66 },
      { x1: 68, y1: 22, x2: 88, y2: 44 },
      { x1: 68, y1: 44, x2: 88, y2: 44 },
      { x1: 68, y1: 66, x2: 88, y2: 44 },
    ],
  },

  experience: {
    period: "2023 — 2025",
    role: "Full-Stack Developer",
    org: "Company Name",
    location: "Bangkok, Thailand",
    description:
      "พัฒนา web application ครบวงจร ตั้งแต่ออกแบบ database schema ถึง ship feature ให้ผู้ใช้จริง — ทำงานใน team ขนาด 8 คน",
    highlights: [
      "ลด page load time ลง 40% ด้วย caching strategy ใหม่",
      "ออกแบบ REST API ที่รองรับ 10k req/min",
      "นำ CI/CD pipeline มาใช้ ลด deploy time 30 นาที → 3 นาที",
    ],
    badge: "FULL-TIME",
    milestones: [
      { label: "2023",         x: 0, y: 8  },
      { label: "JOINED",       x: 0, y: 18, dim: true },
      { label: "FIRST SHIP",   x: 0, y: 27, dim: true },
      { label: "2024",         x: 0, y: 40 },
      { label: "API REDESIGN", x: 0, y: 52, dim: true },
      { label: "PERF +40%",    x: 0, y: 62, dim: true },
      { label: "2025",         x: 0, y: 75 },
      { label: "TEAM LEAD",    x: 0, y: 85, dim: true },
    ],
    nodes: [
      { id: "x1", x: 10, y: 22, label: "NEXT.JS",    detail: "App Router, RSC, SSR — หลัก frontend stack ทั้ง project" },
      { id: "x2", x: 10, y: 44, label: "NODE.JS",    detail: "REST API + tRPC — type-safe ตั้งแต่ server ถึง client" },
      { id: "x3", x: 10, y: 66, label: "POSTGRESQL", detail: "Primary database — ออกแบบ schema รองรับ 10k+ records" },
      { id: "x4", x: 10, y: 84, label: "TYPESCRIPT", detail: "Strict mode — ลด runtime error ได้เกือบ 100%" },
      { id: "x5", x: 58, y: 22, label: "AWS EC2",    detail: "Production server — auto-scaling + load balancer" },
      { id: "x6", x: 58, y: 44, label: "DOCKER",     detail: "Containerized deployment — dev/prod environment เหมือนกัน 100%" },
      { id: "x7", x: 58, y: 66, label: "REDIS",      detail: "Caching layer — ลด DB query ลง 70% ในชั่วโมง peak" },
      { id: "x8", x: 88, y: 44, label: "PROD", accent: true, detail: "Production system — 99.9% uptime, monitored 24/7" },
    ],
    lines: [
      { x1: 16, y1: 22, x2: 58, y2: 22 },
      { x1: 16, y1: 44, x2: 58, y2: 44 },
      { x1: 16, y1: 66, x2: 58, y2: 66 },
      { x1: 16, y1: 84, x2: 58, y2: 66 },
      { x1: 64, y1: 22, x2: 88, y2: 44 },
      { x1: 64, y1: 44, x2: 88, y2: 44 },
      { x1: 64, y1: 66, x2: 88, y2: 44 },
    ],
  },

  freelance: {
    period: "2024 — Now",
    role: "Freelance Developer",
    org: "Independent",
    location: "Remote",
    description:
      "รับงาน freelance ทั้ง web app, design system และ consulting — ทำงานกับ client หลากหลายอุตสาหกรรมทั้งในและต่างประเทศ",
    highlights: [
      "สร้าง e-commerce platform ให้ SME ไทย 3 ราย",
      "Consulting ด้าน frontend architecture ให้ startup Series B",
      "Open source: Forge UI — 1.2k GitHub stars",
    ],
    badge: "OPEN TO WORK",
    badgeAccent: true,
    milestones: [
      { label: "2024",         x: 0, y: 8  },
      { label: "FIRST CLIENT", x: 0, y: 18, dim: true },
      { label: "FORGE UI",     x: 0, y: 28, dim: true },
      { label: "1.2K STARS",   x: 0, y: 38, dim: true },
      { label: "SERIES B",     x: 0, y: 50, dim: true },
      { label: "2025",         x: 0, y: 62 },
      { label: "NOW",          x: 0, y: 80 },
    ],
    nodes: [
      { id: "f1", x: 12, y: 20, label: "E-COMMERCE",   detail: "Multi-vendor platform สำหรับ SME ไทย — รองรับ traffic spike ช่วงเซลล์" },
      { id: "f2", x: 12, y: 42, label: "SAAS",         detail: "Analytics dashboard ให้ startup — subscription model + role-based access" },
      { id: "f3", x: 12, y: 63, label: "CONSULTING",   detail: "Frontend architecture review ให้ Series B startup — ลด tech debt 60%" },
      { id: "f4", x: 12, y: 82, label: "OPEN SOURCE",  detail: "Forge UI — component library ที่เริ่มจาก internal tool จนมี 1.2k stars" },
      { id: "f5", x: 62, y: 22, label: "NEXT.JS",      detail: "Stack หลักสำหรับ freelance web — App Router + Vercel deployment" },
      { id: "f6", x: 62, y: 44, label: "REACT NATIVE", detail: "Mobile app สำหรับ wellness client — iOS + Android จาก codebase เดียว" },
      { id: "f7", x: 62, y: 66, label: "FIGMA",        detail: "Design handoff และ prototyping — ทำงานร่วมกับ designer โดยตรง" },
      { id: "f8", x: 88, y: 44, label: "REMOTE", accent: true, detail: "100% remote — ทำงานกับ client ทั้งในและต่างประเทศผ่าน async workflow" },
    ],
    lines: [
      { x1: 18, y1: 20, x2: 62, y2: 22 },
      { x1: 18, y1: 42, x2: 62, y2: 44 },
      { x1: 18, y1: 63, x2: 62, y2: 66 },
      { x1: 18, y1: 82, x2: 62, y2: 66 },
      { x1: 68, y1: 22, x2: 88, y2: 44 },
      { x1: 68, y1: 44, x2: 88, y2: 44 },
      { x1: 68, y1: 66, x2: 88, y2: 44 },
    ],
  },
};

/* ── Dot grid ─────────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg
      style={{ position: "absolute", inset: "16px", width: "calc(100% - 32px)", height: "calc(100% - 32px)", opacity: 0.15, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="dots-timeline" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-timeline)" />
    </svg>
  );
}

/* ── Timeline strip (leftmost column) ────────────────────── */
function TimelineStrip({ tab }: { tab: TabId }) {
  const { milestones } = scenes[tab];
  const years  = milestones.filter((m) => !m.dim);
  const events = milestones.filter((m) => m.dim);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0a0a0a", overflow: "hidden" }}>
      <DotGrid />

      {/* Vertical spine */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <motion.line
          x1="64" y1="5%" x2="64" y2="95%"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease }}
        />
        {/* Horizontal tick lines from spine to year labels */}
        {years.map((m, i) => (
          <motion.line
            key={`tick-${i}`}
            x1="64" y1={`${m.y}%`}
            x2="76" y2={`${m.y}%`}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease }}
          />
        ))}
      </svg>

      {/* Year markers on spine */}
      {years.map((m, i) => (
        <motion.div
          key={`year-${i}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease }}
          style={{
            position: "absolute",
            left: "80px", top: `${m.y}%`,
            transform: "translateY(-50%)",
            display: "flex", alignItems: "center", gap: "8px",
            pointerEvents: "none",
          }}
        >
          {/* Dot on spine */}
          <span style={{
            position: "absolute", left: "-16px",
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#553F83",
            boxShadow: "0 0 8px rgba(85,63,131,0.8)",
            transform: "translateX(-50%)",
          }} />
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "11px", letterSpacing: "0.1em",
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            whiteSpace: "nowrap",
          }}>
            {m.label}
          </span>
        </motion.div>
      ))}

      {/* Event labels floating right of spine */}
      {events.map((m, i) => (
        <motion.div
          key={`event-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease }}
          style={{
            position: "absolute",
            left: "84px", top: `${m.y}%`,
            transform: "translateY(-50%)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          · {m.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Detail panel (center) ────────────────────────────────── */
function DetailPanel({ tab }: { tab: TabId }) {
  const d = scenes[tab];
  return (
    <div style={{ height: "100%", overflow: "hidden", position: "relative", background: "#0d0d0d" }}>
      <motion.div
        key={tab + "-detail"}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 16 }}
        transition={{ duration: 0.35, ease }}
        style={{ position: "relative", zIndex: 1, padding: "36px 36px 28px" }}
      >
        {/* Period */}
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          marginBottom: "10px",
        }}>
          {d.period}
        </p>

        {/* Role */}
        <h3 style={{
          fontSize: "clamp(20px, 2.2vw, 28px)",
          fontWeight: 700, letterSpacing: "-0.03em",
          lineHeight: 1.1, color: "#fff",
          marginBottom: "6px",
        }}>
          {d.role}
        </h3>

        {/* Org + location */}
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px", letterSpacing: "0.06em",
          color: "#553F83",
          marginBottom: "24px",
        }}>
          {d.org} · {d.location}
        </p>

        {/* Description */}
        <p style={{
          fontSize: "14px", fontWeight: 300,
          color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
          marginBottom: "24px",
        }}>
          {d.description}
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
          {d.highlights.map((h) => (
            <div key={h} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px", color: "#553F83",
                marginTop: "3px", flexShrink: 0,
              }}>→</span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: d.badgeAccent ? "#22c55e" : "rgba(255,255,255,0.3)",
            boxShadow: d.badgeAccent ? "0 0 6px rgba(34,197,94,0.6)" : "none",
          }} />
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: d.badgeAccent ? "#22c55e" : "rgba(255,255,255,0.25)",
          }}>
            {d.badge}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Graph panel (right) ──────────────────────────────────── */
function GraphPanel({ tab }: { tab: TabId }) {
  const scene = scenes[tab];
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeNodeData = scene.nodes.find((n) => n.id === activeNode) ?? null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0a0a0a" }}>
      <DotGrid />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {scene.lines.map((l, i) => (
          <g key={`${tab}-line-${i}`}>
            {/* static dim track */}
            <line
              x1={`${l.x1}%`} y1={`${l.y1}%`}
              x2={`${l.x2}%`} y2={`${l.y2}%`}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.5"
            />
            {/* animated draw-in, loops with delay */}
            <motion.line
              x1={`${l.x1}%`} y1={`${l.y1}%`}
              x2={`${l.x2}%`} y2={`${l.y2}%`}
              stroke="#553F83"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: i * 0.2, ease }}
            />
          </g>
        ))}
      </svg>

      {/* Nodes */}
      {scene.nodes.map((n, i) => (
        <motion.button
          key={`${tab}-node-${n.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
          onClick={() => setActiveNode(activeNode === n.id ? null : n.id)}
          style={{
            position: "absolute",
            left: `${n.x}%`, top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
            display: "flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.1em",
            color: activeNode === n.id
              ? "#fff"
              : n.accent ? "#553F83" : "rgba(255,255,255,0.45)",
            whiteSpace: "nowrap",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            borderRadius: "2px",
            transition: "color 0.2s",
            zIndex: 2,
          }}
        >
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
            background: activeNode === n.id
              ? "#fff"
              : n.accent ? "#553F83" : "rgba(255,255,255,0.2)",
            boxShadow: n.accent ? "0 0 8px rgba(85,63,131,0.7)" : "none",
            transition: "background 0.2s",
          }} />
          {n.label}
        </motion.button>
      ))}

      {/* Detail tooltip */}
      <AnimatePresence>
        {activeNodeData && (
          <motion.div
            key={activeNodeData.id}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease }}
            style={{
              position: "absolute",
              bottom: "20px", left: "20px", right: "20px",
              background: "rgba(15,15,15,0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(85,63,131,0.4)",
              borderRadius: "2px",
              padding: "12px 16px",
              zIndex: 10,
            }}
          >
            <p style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "9px", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#553F83", marginBottom: "6px",
            }}>
              {activeNodeData.label}
            </p>
            <p style={{
              fontSize: "12px", fontWeight: 300,
              color: "rgba(255,255,255,0.6)", lineHeight: 1.65,
            }}>
              {activeNodeData.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("education");
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const advance = useCallback(() => {
    setActiveTab((cur) => {
      const idx = tabs.findIndex((t) => t.id === cur);
      return tabs[(idx + 1) % tabs.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, 5500);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{
          padding: "64px 64px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "10px",
          }}>
            Background
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.0, color: "#fff",
          }}>
            เส้นทางที่<span style={{ color: "#553F83" }}>เดินมา</span>
          </h2>
        </div>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
          flexShrink: 0,
        }}>
          Education · Experience · Freelance
        </p>
      </motion.div>

      {/* ── Panels ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr 1fr",
          height: "440px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Timeline strip — leftmost */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-strip"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ height: "100%" }}
            >
              <TimelineStrip tab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Detail panel — center */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <DetailPanel key={activeTab} tab={activeTab} />
          </AnimatePresence>
        </div>

        {/* Graph panel — right */}
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-graph"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%", position: "relative" }}
            >
              <GraphPanel tab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Tab bar ───────────────────────────────────────── */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              position: "relative",
              flex: 1,
              padding: "20px 32px",
              background: "transparent",
              border: "none",
              borderRight: i < tabs.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.35)",
              transition: "color 0.2s ease",
            }}
          >
            {/* dim track always visible */}
            <span style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "2px", background: "rgba(255,255,255,0.06)",
            }} />
            {/* animated fill on active tab */}
            {activeTab === tab.id && (
              <motion.span
                key={tab.id}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5.5, ease: "linear" }}
                style={{
                  position: "absolute", top: 0, left: 0,
                  height: "2px", background: "#553F83",
                }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
