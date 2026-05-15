"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";
import type { BackgroundData, BackgroundTab } from "../lib/sanity";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Tab data ─────────────────────────────────────────────── */
const tabs = [
  { id: "education",  label: "Education"  },
  { id: "experience", label: "Experience" },
  { id: "freelance",  label: "Projects"  },
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
  metrics: { value: string; label: string; accent?: boolean }[];
}> = {
  education: {
    period: "2022 — 2025",
    role: "Bachelor of Computer Science",
    org: "Rangsit University",
    location: "Pathum Thani, Thailand",
    description:
      "ศึกษาด้าน Computer Science ที่ ม.รังสิต ครอบคลุมตั้งแต่ programming fundamentals จนถึง software engineering และ web development",
    highlights: [
      "Senior project: ระบบจิตอาสามหาวิทยาลัย — อาจารย์โพสต์ นักศึกษาสมัคร ออกเอกสารอัตโนมัติ",
    ],
    badge: "GRADUATED",
    milestones: [
      { label: "2022",           x: 0, y: 8  },
      { label: "ENROLLED",       x: 0, y: 18, dim: true },
      { label: "2023",           x: 0, y: 38 },
      { label: "2024",           x: 0, y: 64 },
      { label: "SENIOR PROJECT", x: 0, y: 75, dim: true },
      { label: "GRADUATED",      x: 0, y: 84, dim: true },
      { label: "2025",           x: 0, y: 92 },
    ],
    nodes: [
      { id: "e1", x: 12, y: 20, label: "ALGORITHMS",      detail: "Sorting, graph, dynamic programming — foundation ของทุก system" },
      { id: "e2", x: 12, y: 42, label: "DATA STRUCTURES", detail: "Tree, hash map, linked list — ใช้จริงในการออกแบบ database" },
      { id: "e3", x: 12, y: 63, label: "DATABASES",       detail: "Relational model, SQL, normalization — ออกแบบ schema ได้ถูกต้อง" },
      { id: "e4", x: 12, y: 82, label: "WEB DEV",         detail: "HTML, CSS, JavaScript — จุดเริ่มต้นของ frontend journey" },
      { id: "e5", x: 62, y: 22, label: "PYTHON",          detail: "First language — algorithm assignments และ data projects" },
      { id: "e6", x: 62, y: 44, label: "JAVASCRIPT",      detail: "เริ่มต้นสาย web — ต่อยอดสู่ Vue และ React" },
      { id: "e7", x: 62, y: 66, label: "VUE.JS",          detail: "Framework แรกที่ใช้จริง — ต่อยอดมาใช้งานใน production" },
      { id: "e8", x: 88, y: 44, label: "RSU · PTT", accent: true, detail: "Rangsit University, Pathum Thani — B.Sc. Computer Science 2022–2025" },
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
    metrics: [
      { value: "3 yr",  label: "Bachelor's Degree", accent: true },
      { value: "2025",  label: "Graduated"                       },
      { value: "CS",    label: "Major"                           },
      { value: "1",     label: "Senior Project"                  },
    ],
  },

  experience: {
    period: "2024 — Present",
    role: "Full-Stack Developer",
    org: "Semed Living Care Hospital",
    location: "Bangkok, Thailand",
    description:
      "พัฒนาระบบ healthcare software ครบวงจรตั้งแต่ 0 — ออกแบบ วางแผน พัฒนา และ deploy คนเดียวกว่า 10 ระบบ ทั้ง web application และ desktop program ที่ใช้งานจริง",
    highlights: [
      "สร้าง HIS ครบวงจร — Lab, Checkup, ใบรับรองแพทย์ — ใช้งาน production จริง",
      "เชื่อมต่อ API กรมจัดหางาน สำหรับระบบตรวจสุขภาพแรงงานต่างด้าว",
      "ระบบ real-time checkup ให้ทีมออกหน่วยบันทึกข้อมูลผ่าน tablet — ลูกค้าดูความคืบหน้าได้ทันที",
      "Barcode interceptor — ดักจับค่าบาร์โค้ดข้ามโปรแกรม inject เข้า HIS อัตโนมัติ",
    ],
    badge: "FULL-TIME",
    milestones: [
      { label: "2024",        x: 0, y: 8  },
      { label: "PARTTIME",    x: 0, y: 20, dim: true },
      { label: "FIRST SHIP",  x: 0, y: 35, dim: true },
      { label: "2025",        x: 0, y: 52 },
      { label: "2026",        x: 0, y: 72 },
      { label: "HIS LAUNCH",  x: 0, y: 82, dim: true },
      { label: "PRESENT",     x: 0, y: 92, dim: true },
    ],
    nodes: [
      { id: "x1", x: 10, y: 22, label: "VUE.JS",   detail: "Frontend หลัก — ใช้ใน HIS, Checkup, และระบบในคลินิกส่วนใหญ่" },
      { id: "x2", x: 10, y: 44, label: "NODE.JS",  detail: "Backend API — เชื่อมระบบภายในและ API กรมจัดหางาน" },
      { id: "x3", x: 10, y: 66, label: "REACT",    detail: "ใช้ใน web tools บางระบบ — QR-based ordering, dashboard" },
      { id: "x4", x: 10, y: 84, label: "PYTHON",   detail: "AI translation service, barcode interceptor, automation scripts" },
      { id: "x5", x: 58, y: 22, label: "REALTIME", detail: "WebSocket / polling — ลูกค้าดูผลตรวจ + ทีมออกหน่วย live" },
      { id: "x6", x: 58, y: 44, label: "REST API", detail: "Gov API integration — รับ-ส่งข้อมูลแรงงานต่างด้าวกับกรมจัดหางาน" },
      { id: "x7", x: 58, y: 66, label: "MYSQL",    detail: "Primary database — ออกแบบ schema สำหรับระบบ HIS ครบวงจร" },
      { id: "x8", x: 88, y: 44, label: "SEMED", accent: true, detail: "Semed Living Care Hospital — 10+ systems built solo, all in production" },
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
    metrics: [
      { value: "10+",  label: "Systems Built",    accent: true },
      { value: "0→1",  label: "Built from Scratch"             },
      { value: "Gov",  label: "API Integrated"                 },
      { value: "Solo", label: "End-to-End"                     },
    ],
  },

  freelance: {
    period: "2024 — Now",
    role: "Personal Projects",
    org: "Independent",
    location: "Bangkok, Thailand",
    description:
      "พัฒนา side projects นอกเวลางาน เน้น web tools ที่แก้ปัญหาจริงและ deploy ใช้งานได้จริง ตั้งแต่ระบบสั่งอาหาร realtime จนถึง QR tools",
    highlights: [
      "MooPrompt — ระบบสั่งอาหารหมูกระทะผ่าน QR ส่ง order realtime ถึงครัว",
      "FlowTrak — ระบบติดตามงานองค์กร realtime",
      "QR-Gen — สร้างและตกแต่ง QR Code หลายประเภท (ใช้งานจริง)",
      "Senior Project — ระบบจิตอาสามหาวิทยาลัย อาจารย์โพสต์ นักศึกษาสมัคร ออกเอกสารอัตโนมัติ",
    ],
    badge: "OPEN TO WORK",
    badgeAccent: true,
    milestones: [
      { label: "2026",        x: 0, y: 8  },
      { label: "QR-GEN",      x: 0, y: 22, dim: true },
      { label: "MOOPROMPT",   x: 0, y: 38, dim: true },
      { label: "FLOWTRAK",    x: 0, y: 54, dim: true },
      { label: "SENIOR PROJ", x: 0, y: 70, dim: true },
      { label: "PRESENT",     x: 0, y: 88, dim: true },
    ],
    nodes: [
      { id: "f1", x: 12, y: 20, label: "QR-GEN",      detail: "สร้างและตกแต่ง QR Code หลายรูปแบบ — ใช้งานจริง" },
      { id: "f2", x: 12, y: 42, label: "MOOPROMPT",   detail: "ระบบสั่งอาหารหมูกระทะ — scan QR → order ถึงครัว realtime" },
      { id: "f3", x: 12, y: 63, label: "FLOWTRAK",    detail: "ติดตาม task ในองค์กร — status update realtime ทุก member" },
      { id: "f4", x: 12, y: 82, label: "SENIOR PROJ", detail: "ระบบจิตอาสา ม.รังสิต — โพสต์ สมัคร อนุมัติ ออกเอกสารอัตโนมัติ" },
      { id: "f5", x: 62, y: 22, label: "VUE.JS",      detail: "Framework หลักสำหรับ side projects ส่วนใหญ่" },
      { id: "f6", x: 62, y: 44, label: "REACT",       detail: "ใช้ใน MooPrompt และ FlowTrak" },
      { id: "f7", x: 62, y: 66, label: "NODE.JS",     detail: "Backend API สำหรับทุก project — realtime ด้วย WebSocket" },
      { id: "f8", x: 88, y: 44, label: "LIVE", accent: true, detail: "ทุก project deploy และใช้งานจริง — solo built ทั้งหมด" },
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
    metrics: [
      { value: "6+",    label: "Projects Built", accent: true },
      { value: "Live",  label: "In Production"               },
      { value: "Solo",  label: "Built Alone"                 },
      { value: "2026",  label: "All This Year"               },
    ],
  },
};

/* ── Dot grid ─────────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg
      style={{ position: "absolute", inset: "16px", width: "calc(100% - 32px)", height: "calc(100% - 32px)", opacity: 0.25, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="dots-timeline" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-timeline)" style={{ color: "var(--text-subtle)" }} />
    </svg>
  );
}

/* ── Timeline strip (leftmost column) ────────────────────── */
function TimelineStrip({ scene }: { scene: Scene }) {
  const { milestones } = scene;
  const years  = milestones.filter((m) => !m.dim);
  const events = milestones.filter((m) => m.dim);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "var(--canvas)", overflow: "hidden" }}>
      <DotGrid />

      {/* Vertical spine */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <motion.line
          x1="64" y1="5%" x2="64" y2="95%"
          stroke="var(--hairline)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease }}
        />
        {years.map((m, i) => (
          <motion.line
            key={`tick-${i}`}
            x1="64" y1={`${m.y}%`}
            x2="76" y2={`${m.y}%`}
            stroke="var(--text-subtle)"
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
            color: "var(--text-mid)",
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
            color: "var(--text-subtle)",
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
function DetailPanel({ scene, tabKey }: { scene: Scene; tabKey: string }) {
  const d = scene;
  return (
    <div style={{ height: "100%", overflow: "hidden", position: "relative", background: "var(--surface)" }}>
      <motion.div
        key={tabKey + "-detail"}
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
          color: "var(--text-subtle)",
          marginBottom: "10px",
        }}>
          {d.period}
        </p>

        {/* Role */}
        <h3 style={{
          fontSize: "clamp(20px, 2.2vw, 28px)",
          fontWeight: 700, letterSpacing: "-0.03em",
          lineHeight: 1.1, color: "var(--text-high)",
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
          color: "var(--text-muted)", lineHeight: 1.75,
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
              <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: d.badgeAccent ? "#22c55e" : "var(--text-subtle)",
            boxShadow: d.badgeAccent ? "0 0 6px rgba(34,197,94,0.6)" : "none",
          }} />
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: d.badgeAccent ? "#22c55e" : "var(--text-subtle)",
          }}>
            {d.badge}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Metrics panel (right) ────────────────────────────────── */
function MetricsPanel({ scene, tabKey }: { scene: Scene; tabKey: string }) {
  const { metrics } = scene;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey + "-metrics"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          width: "100%", height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          background: "var(--canvas)",
        }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={`${tabKey}-metric-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.08, ease }}
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "32px 28px",
              borderRight: i % 2 === 0 ? "1px solid var(--hairline)" : "none",
              borderBottom: i < 2 ? "1px solid var(--hairline)" : "none",
              position: "relative", overflow: "hidden",
            }}
          >
            {m.accent && (
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "2px", background: "#553F83",
              }} />
            )}
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(28px, 2.8vw, 40px)",
              fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
              color: m.accent ? "#553F83" : "var(--text-high)",
              marginBottom: "10px",
            }}>
              {m.value}
            </div>
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Merge Sanity data over hardcoded scene ───────────────── */
type Scene = typeof scenes.education;

function mergeScene(base: Scene, s?: BackgroundTab | null): Scene {
  if (!s) return base;
  return {
    ...base,
    ...(s.period      && { period:      s.period }),
    ...(s.role        && { role:        s.role }),
    ...(s.org         && { org:         s.org }),
    ...(s.location    && { location:    s.location }),
    ...(s.description && { description: s.description }),
    ...(s.highlights?.length && { highlights: s.highlights }),
    ...(s.badge       && { badge:       s.badge }),
    ...(s.badgeAccent !== undefined && { badgeAccent: s.badgeAccent }),
    ...(s.metrics?.length && {
      metrics: s.metrics.map((m) => ({ value: m.value, label: m.label, accent: m.accent ?? false })),
    }),
  };
}

/* ── Main component ───────────────────────────────────────── */
export default function FeatureShowcase({ background }: { background?: BackgroundData | null }) {
  const [activeTab, setActiveTab] = useState<TabId>("education");
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const activeScenes: typeof scenes = {
    education:  mergeScene(scenes.education,  background?.education),
    experience: mergeScene(scenes.experience, background?.experience),
    freelance:  mergeScene(scenes.freelance,  background?.freelance),
  };

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
        background: "var(--canvas)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{
          padding: isMobile ? "40px 24px 20px" : "64px 64px 24px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? "8px" : "0",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "10px",
          }}>
            Background
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.0, color: "var(--text-high)",
          }}>
            เส้นทางที่<span style={{ color: "#553F83" }}>เดินมา</span>
          </h2>
        </div>
        {!isMobile && (
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}>
            Education · Experience · Projects
          </p>
        )}
      </motion.div>

      {/* ── Panels ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "360px 1fr 1fr",
          height: isMobile ? "auto" : "440px",
          borderBottom: "1px solid var(--hairline)",
          overflow: "hidden",
        }}
      >
        {/* Timeline strip — hidden on mobile */}
        {!isMobile && (
          <div style={{ borderRight: "1px solid var(--hairline)", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-strip"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ height: "100%" }}
              >
                <TimelineStrip scene={activeScenes[activeTab]} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Detail panel */}
        <div style={{ borderRight: isMobile ? "none" : "1px solid var(--hairline)", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <DetailPanel key={activeTab} scene={activeScenes[activeTab]} tabKey={activeTab} />
          </AnimatePresence>
        </div>

        {/* Metrics panel — hidden on mobile */}
        {!isMobile && (
          <div style={{ position: "relative" }}>
            <MetricsPanel scene={activeScenes[activeTab]} tabKey={activeTab} />
          </div>
        )}
      </motion.div>

      {/* ── Tab bar ───────────────────────────────────────── */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--hairline)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              position: "relative",
              flex: 1,
              padding: isMobile ? "16px 12px" : "20px 32px",
              background: "transparent",
              border: "none",
              borderRight: i < tabs.length - 1 ? "1px solid var(--hairline)" : "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: activeTab === tab.id ? "var(--text-high)" : "var(--text-subtle)",
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
