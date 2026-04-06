"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Items ────────────────────────────────────────────────── */
const items = [
  {
    num: "01",
    label: "DESIGN SYSTEM",
    title: "ออกแบบอย่างมี\nระบบ ไม่ใช่แค่\nสวยงาม",
    desc: "ทุก UI เริ่มจาก design token — สี, spacing, typography ที่สอดคล้องกันตลอด codebase ทำให้ปรับเปลี่ยนได้เร็วและ consistent",
    bullets: ["Design tokens & CSS variables", "IBM Plex Sans Thai + JetBrains Mono", "Dark / Light theme system", "Hairline grid, 0 shadows"],
    cta: "ดู Design System",
    accent: "#553F83",
    code: `/* globals.css */
:root {
  --primary:   #553F83;
  --bg:        #111111;
  --surface:   #1A1A1A;
  --text-high: #FFFFFF;
  --hairline:  rgba(255,255,255,0.1);
}

/* Typography */
.display {
  font-size: clamp(64px, 10vw, 120px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

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
    title: "Interface ที่\nรู้สึกดีใน\nทุก interaction",
    desc: "React + Next.js App Router พร้อม Framer Motion สำหรับ animation ที่ fluid — ตั้งแต่ scroll-driven sections จนถึง micro-interactions",
    bullets: ["Next.js 16 App Router", "Framer Motion scroll-driven", "Tailwind CSS v4", "TypeScript strict mode"],
    cta: "ดู Frontend Work",
    accent: "#F04E00",
    code: `// PinnedScroll.tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});

useMotionValueEvent(
  scrollYProgress,
  "change",
  (v) => {
    setActive(
      Math.min(items.length - 1,
        Math.floor(v * items.length)
      )
    );
  }
);

// Smooth progress bar per item
const itemProgress = useTransform(
  scrollYProgress,
  [active / N, (active + 1) / N],
  [0, 1]
);`,
  },
  {
    num: "03",
    label: "BACKEND & API",
    title: "API ที่ออกแบบ\nมาเพื่อ\nScale จริง",
    desc: "Node.js + PostgreSQL พร้อม type-safe API ด้วย tRPC หรือ REST ที่มี proper error handling, validation, และ rate limiting",
    bullets: ["Node.js / Go backends", "PostgreSQL + Prisma ORM", "REST & tRPC type-safe", "Redis caching layer"],
    cta: "ดู Backend Work",
    accent: "#0085FF",
    code: `// router/project.ts
export const projectRouter = router({
  list: publicProcedure
    .input(z.object({
      status: z.enum([
        "shipped", "live", "wip"
      ]).optional(),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.project.findMany({
        where: { status: input.status },
        take: 12,
        cursor: input.cursor
          ? { id: input.cursor }
          : undefined,
        orderBy: { createdAt: "desc" },
        include: { tags: true },
      });
    }),
});`,
  },
  {
    num: "04",
    label: "DEPLOYMENT",
    title: "Deploy ได้\nทุกวัน โดย\nไม่กลัว",
    desc: "CI/CD pipeline ที่รัน lint, test, build อัตโนมัติก่อน deploy — zero-downtime deployment บน Vercel หรือ Docker + AWS",
    bullets: ["GitHub Actions CI/CD", "Docker containerization", "Vercel / AWS deployment", "Environment secrets management"],
    cta: "ดู DevOps Setup",
    accent: "#FFE600",
    code: `# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: vercel/action@v1
        with:
          vercel-token: \${{ secrets.TOKEN }}`,
  },
  {
    num: "05",
    label: "OPTIMIZATION",
    title: "เร็ว วัดได้\nปรับปรุง\nได้จริง",
    desc: "Performance ไม่ใช่แค่ Lighthouse score — วัดจาก Core Web Vitals จริง, bundle analysis, และ query optimization ที่ database",
    bullets: ["Core Web Vitals monitoring", "Bundle size analysis", "Image & font optimization", "DB query profiling"],
    cta: "ดู Performance",
    accent: "#10b981",
    code: `// next.config.ts
const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
    ],
  },
};

// Measure: app/layout.tsx
export function reportWebVitals(
  metric: NextWebVitalsMetric
) {
  if (metric.label === "web-vital") {
    analytics.track(metric.name, {
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }
}`,
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

  const N = items.length;

  function scrollToItem(i: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    // Place scroll so item i is at the start of its "slot"
    const target = containerTop + (i / N) * containerHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.floor(v * N)));
  });

  const item = items[active];
  const light = isLight(item.accent);

  return (
    /* ── Tall outer container — scroll happens here ────────── */
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh`, position: "relative" }}
    >
      {/* ── Sticky inner panel ─────────────────────────────── */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "220px 1fr 1fr",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
        <DotGrid />

        {/* ── Left: numbered nav ───────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 2,
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
          gap: "4px",
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
    </div>
  );
}
