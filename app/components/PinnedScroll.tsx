"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Items ────────────────────────────────────────────────── */
const items = [
  {
    num: "01",
    label: "DESIGN SYSTEM",
    title: "เริ่มจาก\nโครงสร้าง\nก่อนเสมอ",
    desc: "เริ่มจาก token และโครงสร้างโค้ดก่อนเสมอ — folder structure ชัด, component แยก concern ดี ทำให้ตัวเองกลับมาอ่าน 3 เดือนข้างหน้าแล้วยังรู้เรื่อง",
    bullets: ["Design token ก่อน component เสมอ", "Folder structure ที่ทุกคนเดาได้ถูก", "Component รับผิดชอบแค่สิ่งเดียว", "ไม่มี magic number ใน codebase"],
    cta: "ดูผลงาน",
    accent: "#553F83",
    code: `/* โครงสร้างที่ใช้จริง */
src/
  components/   # UI components
  composables/  # shared logic
  stores/       # Pinia state
  views/        # pages
  utils/        # helpers

/* design tokens */
:root {
  --primary:   #553F83;
  --bg:        #111111;
  --surface:   #1A1A1A;
  --text-high: #FFFFFF;
  --hairline:  rgba(255,255,255,0.1);
}

/* ตั้งชื่อให้สื่อ ไม่ต้อง comment */
.eyeline {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}`,
  },
  {
    num: "02",
    label: "FRONTEND DEV",
    title: "UI ที่ดีคือ\nUI ที่ไม่ต้อง\nอธิบาย",
    desc: "ทำให้ทุก interaction รู้สึก smooth และ intuitive ตั้งแต่ปุ่มกดจนถึง error message — UX ที่ดีคือ user ไม่รู้สึกว่ามีอะไรผิดปกติเลย",
    bullets: ["Animation มีเหตุผล ไม่ใช่แค่ effect", "Error message ที่คนอ่านแล้วเข้าใจทันที", "Mobile-first ทุก component", "ทดสอบบน device จริงเสมอ"],
    cta: "ดูผลงาน",
    accent: "#F04E00",
    code: `<!-- transition ที่ทำให้รู้สึก smooth -->
<Transition name="fade">
  <div v-if="isVisible">
    {{ content }}
  </div>
</Transition>

<!-- loading state ที่ user ไม่งง -->
<template v-if="isLoading">
  <SkeletonCard v-for="i in 3" :key="i" />
</template>
<template v-else>
  <DataTable :rows="data" />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>`,
  },
  {
    num: "03",
    label: "BACKEND & API",
    title: "ออกแบบ\nจาก use case\nไม่ใช่ framework",
    desc: "ออกแบบ API จาก use case ก่อน — structure ชัด error handling ครบ ทำให้ frontend ทำงานง่ายและ debug เร็ว แม้จะทำคนเดียว",
    bullets: ["ออกแบบ schema ก่อน code เสมอ", "Validation ทุก input ที่มาจากข้างนอก", "Error message ที่ frontend เอาไปใช้ต่อได้", "API doc ที่ทันสมัยอยู่เสมอ"],
    cta: "ดูผลงาน",
    accent: "#0085FF",
    code: `// ออกแบบ response ให้ frontend ใช้ง่าย
export async function GET(req: Request) {
  try {
    const data = await db.patient.findMany({
      select: {
        id: true,
        name: true,
        // ดึงเฉพาะที่ใช้จริง
      },
    });

    return Response.json({ data });

  } catch (err) {
    // error ที่ debug ได้จริง
    return Response.json(
      { error: "ดึงข้อมูลไม่สำเร็จ" },
      { status: 500 }
    );
  }
}`,
  },
  {
    num: "04",
    label: "DEPLOYMENT",
    title: "Deploy แล้ว\nไม่ต้อง\nนั่งเฝ้า",
    desc: "Deploy ไม่ใช่ขั้นตอนที่ต้องลุ้น — แยก Dev กับ Production ชัด จัดการ env ให้ดี แล้ว push ได้อย่างสบายใจ",
    bullets: ["Dev / Production แยกชัดเจนเสมอ", "Secret ไม่เคย hardcode ใน code", "Deploy แล้วไม่ต้องนั่งเฝ้า", "ถ้าพังก็รู้ทันที ไม่ใช่รู้จาก user"],
    cta: "ดูผลงาน",
    accent: "#FFE600",
    code: `# .env.local (ไม่เคย commit)
DATABASE_URL=postgresql://...
API_SECRET=...

# .env.example (commit ได้)
DATABASE_URL=
API_SECRET=

# docker-compose.yml
services:
  app:
    build: .
    env_file: .env
    ports:
      - "3000:3000"
    restart: unless-stopped

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: \${DB_NAME}
    volumes:
      - pgdata:/var/lib/postgresql`,
  },
  {
    num: "05",
    label: "CODE QUALITY",
    title: "โค้ดที่ดีคือ\nโค้ดที่กลับมา\nอ่านแล้วเข้าใจ",
    desc: "โค้ดที่ดีคือโค้ดที่ทั้งอ่านง่ายและทำงานเร็ว — ถ้า function ไหน query หนักหรืออ่านยากก็แก้ทันที ไม่ปล่อยให้สะสม",
    bullets: ["ตั้งชื่อ function และ variable ให้สื่อความหมาย", "Query หนักต้องรู้ก่อน user รู้", "Refactor เมื่อมีโอกาส ไม่รอให้พัง", "Comment ไว้เสมอ เพราะตัวเองก็ลืม"],
    cta: "ดูผลงาน",
    accent: "#10b981",
    code: `// ❌ อ่านไม่รู้เรื่อง
const d = await db.query(
  \`SELECT * FROM t WHERE x = \${v}\`
);

// ✅ อ่านแล้วเข้าใจทันที
const patient = await db.patient.findUnique({
  where: { id: patientId },
  select: { name: true, labResults: true },
});

// ❌ query ดึงทุกอย่างแล้วกรองใน JS
const all = await db.record.findMany();
const active = all.filter(r => r.active);

// ✅ กรองที่ database ตั้งแต่แรก
const active = await db.record.findMany({
  where: { active: true },
});`,
  },
] as const;

/* ── Dot grid ─────────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1, pointerEvents: "none" }}>
      <defs>
        <pattern id="pg" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#fff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg)" />
    </svg>
  );
}

/* ── isLight helper ───────────────────────────────────────── */
function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

/* ── Code panel ───────────────────────────────────────────── */
function CodeVisual({ item }: { item: (typeof items)[number] }) {
  const lines = item.code.split("\n");
  return (
    <div style={{
      background: "#0d0d0d",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "4px",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Window chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#111",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map((c) => (
          <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          marginLeft: "8px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.3)",
        }}>
          {item.label.toLowerCase().replace(/ /g, "-")}.ts
        </span>
      </div>
      {/* Lines */}
      <div style={{ padding: "20px", flex: 1, overflow: "hidden" }}>
        {lines.map((line, i) => (
          <motion.div
            key={`${item.num}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03, ease }}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11.5px",
              lineHeight: "1.8",
              whiteSpace: "pre",
              color:
                line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("/*") || line.trim().startsWith("*")
                  ? "rgba(255,255,255,0.25)"
                  : line.includes("const ") || line.includes("export ") || line.includes("import ") || line.includes("name:")
                  ? item.accent
                  : "rgba(255,255,255,0.65)",
            }}
          >
            {line || " "}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function PinnedScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const N = items.length;

  function scrollToItem(i: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const target = containerTop + (i / N) * containerHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isMobile) setActive(Math.min(N - 1, Math.floor(v * N)));
  });

  const item = items[active];
  const light = isLight(item.accent);

  return (
    <div style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      {isMobile ? (
        <div style={{ padding: "40px 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "12px" }}>How I Work</p>
          <h2 style={{ fontSize: "clamp(28px, 7vw, 40px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#fff" }}>
            วิธีที่ผมทำงาน<br /><span style={{ color: "#553F83" }}>ตั้งแต่ต้นจนจบ</span>
          </h2>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr 1fr",
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "28px 32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#553F83" }}>02</span>
            <span style={{ display: "block", width: "20px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>How I Work</span>
          </div>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "48px 56px" }}>
            <h2 style={{ fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#fff" }}>
              วิธีที่ผมทำงาน<br /><span style={{ color: "#553F83" }}>ตั้งแต่ต้นจนจบ</span>
            </h2>
          </div>
          <div style={{ padding: "48px 56px", display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "380px" }}>
              Scroll เพื่อ explore แต่ละ discipline — หรือคลิก nav ซ้ายมือเพื่อข้ามไปยัง section ที่สนใจ
            </p>
          </div>
        </div>
      )}

      {/* ── Outer container — ref always attached ──────────────── */}
      <div
        ref={containerRef}
        style={{ height: isMobile ? "auto" : `${N * 100}vh`, position: "relative" }}
      >
      {isMobile ? (
        /* ── Mobile: stacked list ──────────────────────────────── */
        <>
          {items.map((it) => (
            <div key={it.num} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "32px 24px" }}>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: it.accent, marginBottom: "16px" }}>
                {it.num} · {it.label}
              </p>
              <h3 style={{ fontSize: "clamp(22px, 6vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "16px", whiteSpace: "pre-line" }}>
                {it.title}
              </h3>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "20px" }}>
                {it.desc}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {it.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: it.accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : (
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "220px 1fr 1fr",
        gridTemplateRows: "1fr",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
        <div style={{ gridColumn: "1 / -1", position: "absolute", inset: 0, pointerEvents: "none" }}>
          <DotGrid />
        </div>

        {/* ── Left: numbered nav ───────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 2,
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
          gap: "4px",
          overflow: "hidden",
        }}>
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <div
                key={it.num}
                onClick={() => scrollToItem(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: i < N - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                  opacity: isActive ? 1 : 0.35,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.65"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.35"; }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "10px",
                  color: isActive ? item.accent : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                  transition: "color 0.3s ease",
                }}>
                  {it.num}
                </span>

                {/* Label */}
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                  transition: "color 0.3s ease",
                }}>
                  {it.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      marginLeft: "auto",
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: item.accent,
                      flexShrink: 0,
                    }}
                    transition={{ duration: 0.3, ease }}
                  />
                )}
              </div>
            );
          })}

          {/* Progress bar */}
          <div style={{
            marginTop: "32px",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0, left: 0, height: "100%",
                background: item.accent,
                width: `${((active + 1) / N) * 100}%`,
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
          </div>
          <div style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
          }}>
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </div>
        </div>

        {/* ── Center: content ──────────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 2,
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 56px",
          overflow: "hidden",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* Eyeline */}
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px", letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: item.accent,
                marginBottom: "24px",
              }}>
                {item.label}
              </p>

              {/* Title */}
              <h2 style={{
                fontSize: "clamp(32px, 3.5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "#fff",
                marginBottom: "28px",
                whiteSpace: "pre-line",
              }}>
                {item.title}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: "16px", fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                marginBottom: "32px",
                maxWidth: "420px",
              }}>
                {item.desc}
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
                {item.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: item.accent,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "12px", letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                    }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  border: `1px solid ${item.accent}`,
                  borderRadius: "2px",
                  color: item.accent,
                  background: "transparent",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.accent;
                  e.currentTarget.style.color = light ? "#000" : "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = item.accent;
                }}
              >
                {item.cta} →
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right: code visual ───────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "48px 48px",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ width: "100%", height: "100%", maxHeight: "520px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-code"}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease }}
                style={{ height: "100%" }}
              >
                <CodeVisual item={item} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Accent left border ───────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "3px",
            background: item.accent,
            transition: "background 0.4s ease",
          }}
        />
      </div>
      )}
      </div>
    </div>
  );
}
