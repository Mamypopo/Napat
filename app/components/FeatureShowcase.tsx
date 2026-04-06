"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Tab data ─────────────────────────────────────────────── */
const tabs = [
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend"  },
  { id: "devops",   label: "DevOps"   },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ── Visualization data per tab ───────────────────────────── */
const scenes: Record<TabId, {
  nodes: { id: string; x: number; y: number; label: string; accent?: boolean }[];
  lines: { x1: number; y1: number; x2: number; y2: number }[];
  code: string;
  card: { title: string; sub: string; badge: string };
}> = {
  frontend: {
    nodes: [
      { id: "n1", x: 12,  y: 22,  label: "DESIGN TOKENS"   },
      { id: "n2", x: 12,  y: 42,  label: "COMPONENTS"      },
      { id: "n3", x: 12,  y: 62,  label: "PAGES"           },
      { id: "n4", x: 65,  y: 18,  label: "FRAMER MOTION"   },
      { id: "n5", x: 65,  y: 38,  label: "TAILWIND V4"     },
      { id: "n6", x: 65,  y: 58,  label: "NEXT.JS 16"      },
      { id: "n7", x: 65,  y: 78,  label: "TYPESCRIPT"      },
      { id: "n8", x: 88,  y: 38,  label: "VERCEL", accent: true },
    ],
    lines: [
      { x1: 18, y1: 22, x2: 65, y2: 18 },
      { x1: 18, y1: 42, x2: 65, y2: 38 },
      { x1: 18, y1: 62, x2: 65, y2: 58 },
      { x1: 71, y1: 18, x2: 88, y2: 38 },
      { x1: 71, y1: 38, x2: 88, y2: 38 },
      { x1: 71, y1: 58, x2: 88, y2: 38 },
      { x1: 71, y1: 78, x2: 88, y2: 38 },
    ],
    code: `// app/components/Hero.tsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Ship Software{" "}
      <span className="text-primary">
        Peacefully.
      </span>
    </motion.h1>
  );
}`,
    card: { title: "Build complete", sub: "napat-portfolio deployed", badge: "SUCCESS" },
  },

  backend: {
    nodes: [
      { id: "b1", x: 12, y: 25, label: "REST API"      },
      { id: "b2", x: 12, y: 50, label: "GRAPHQL"       },
      { id: "b3", x: 12, y: 75, label: "WEBSOCKET"     },
      { id: "b4", x: 60, y: 20, label: "NODE.JS"       },
      { id: "b5", x: 60, y: 45, label: "POSTGRES"      },
      { id: "b6", x: 60, y: 70, label: "REDIS CACHE"   },
      { id: "b7", x: 88, y: 45, label: "AWS RDS", accent: true },
    ],
    lines: [
      { x1: 18, y1: 25, x2: 60, y2: 20 },
      { x1: 18, y1: 50, x2: 60, y2: 45 },
      { x1: 18, y1: 75, x2: 60, y2: 70 },
      { x1: 66, y1: 20, x2: 88, y2: 45 },
      { x1: 66, y1: 45, x2: 88, y2: 45 },
      { x1: 66, y1: 70, x2: 88, y2: 45 },
    ],
    code: `// server/router/product.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
  list: publicProcedure
    .input(z.object({ cursor: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        take: 20,
        cursor: input.cursor
          ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });
    }),
});`,
    card: { title: "Query executed", sub: "products.findMany → 20 rows", badge: "200 OK" },
  },

  devops: {
    nodes: [
      { id: "d1", x: 10, y: 30, label: "GIT PUSH"      },
      { id: "d2", x: 10, y: 60, label: "PR MERGE"      },
      { id: "d3", x: 52, y: 20, label: "CI LINT"       },
      { id: "d4", x: 52, y: 45, label: "CI TESTS"      },
      { id: "d5", x: 52, y: 70, label: "DOCKER BUILD"  },
      { id: "d6", x: 86, y: 30, label: "STAGING",      },
      { id: "d7", x: 86, y: 60, label: "PRODUCTION", accent: true },
    ],
    lines: [
      { x1: 16, y1: 30, x2: 52, y2: 20 },
      { x1: 16, y1: 30, x2: 52, y2: 45 },
      { x1: 16, y1: 60, x2: 52, y2: 45 },
      { x1: 16, y1: 60, x2: 52, y2: 70 },
      { x1: 58, y1: 20, x2: 86, y2: 30 },
      { x1: 58, y1: 45, x2: 86, y2: 30 },
      { x1: 58, y1: 70, x2: 86, y2: 60 },
    ],
    code: `# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --ci
      - run: docker build -t app .
      - run: docker push registry/app
      - uses: vercel/action@v1`,
    card: { title: "Deployed to prod", sub: "main → production · 1m 42s", badge: "LIVE" },
  },
};

/* ── Dot grid SVG background ──────────────────────────────── */
function DotGrid() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

/* ── Graph visualization ──────────────────────────────────── */
function GraphPanel({ tab }: { tab: TabId }) {
  const scene = scenes[tab];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <DotGrid />

      {/* SVG lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {scene.lines.map((l, i) => (
          <motion.line
            key={`${tab}-line-${i}`}
            x1={`${l.x1}%`} y1={`${l.y1}%`}
            x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {scene.nodes.map((n, i) => (
        <motion.div
          key={`${tab}-node-${n.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: n.accent ? "#553F83" : "rgba(255,255,255,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: n.accent ? "#553F83" : "rgba(255,255,255,0.3)",
            flexShrink: 0,
            boxShadow: n.accent ? "0 0 8px rgba(85,63,131,0.7)" : "none",
          }} />
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Code panel ───────────────────────────────────────────── */
function CodePanel({ tab }: { tab: TabId }) {
  const lines = scenes[tab].code.split("\n");
  return (
    <div style={{ height: "100%", overflow: "hidden", position: "relative" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1, padding: "24px" }}>
        {/* Fake window chrome */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        {lines.map((line, i) => (
          <motion.div
            key={`${tab}-code-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease }}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              lineHeight: "1.75",
              color: line.startsWith("//") || line.startsWith("#")
                ? "rgba(255,255,255,0.3)"
                : line.includes("import") || line.includes("export") || line.includes("const") || line.includes("return")
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.55)",
              whiteSpace: "pre",
            }}
          >
            {line || " "}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Floating toast card ─────────────────────────────────── */
function ToastCard({ tab }: { tab: TabId }) {
  const { card } = scenes[tab];
  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.4, ease }}
      style={{
        position: "absolute",
        bottom: "24px",
        left: "24px",
        background: "rgba(30,30,30,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "4px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        minWidth: "220px",
        zIndex: 10,
      }}
    >
      {/* Avatar */}
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        background: "linear-gradient(135deg, #553F83, #8B5CF6)",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "12px", color: "#fff", fontWeight: 700,
      }}>
        N
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "2px" }}>
          {card.title}
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mono), monospace" }}>
          {card.sub}
        </div>
      </div>
      <span style={{
        marginLeft: "auto",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "9px",
        letterSpacing: "0.08em",
        padding: "3px 8px",
        border: "1px solid rgba(85,63,131,0.5)",
        borderRadius: "2px",
        color: "#8B5CF6",
      }}>
        {card.badge}
      </span>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("frontend");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Headline row ──────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{
            padding: "64px 64px",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "20px",
            }}
          >
            Tech Stack
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#ffffff",
            }}
          >
            เครื่องมือที่ใช้<br />
            ทำให้งาน<br />
            <span style={{ color: "#553F83" }}>เสร็จจริง.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          style={{ padding: "64px 64px", display: "flex", alignItems: "center" }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              maxWidth: "420px",
            }}
          >
            ทุก stack ที่เลือกมีเหตุผล — ตั้งแต่ Frontend ที่ smooth
            ไปจนถึง DevOps pipeline ที่ deploy ได้ทุกวันโดยไม่กลัว
          </p>
        </motion.div>
      </div>

      {/* ── Visualization panel ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "440px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Code panel */}
        <div
          style={{
            borderRight: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            position: "relative",
            background: "#0d0d0d",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-code"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%" }}
            >
              <CodePanel tab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Graph panel */}
        <div style={{ position: "relative", background: "#0a0a0a" }}>
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

          {/* Floating toast */}
          <AnimatePresence mode="wait">
            <ToastCard key={activeTab} tab={activeTab} />
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
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.35)",
              transition: "color 0.2s ease",
            }}
          >
            {/* Active underline */}
            {activeTab === tab.id && (
              <motion.span
                layoutId="tab-indicator"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: "#553F83",
                }}
                transition={{ duration: 0.3, ease }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
