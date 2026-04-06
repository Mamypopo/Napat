"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Panel data ───────────────────────────────────────────── */
const panels = [
  {
    id: "frontend",
    label: "FRONTEND PROJECT",
    context: "REACT, NEXT.JS",
    accent: "#F04E00",
    questions: [
      "HOW WAS THE DESIGN SYSTEM BUILT?",
      "WHAT ANIMATION LIBRARY DID YOU USE?",
      "HOW DID YOU HANDLE DARK MODE?",
    ],
    status: "SHIPPED",
    detail: "E-Commerce Platform",
  },
  {
    id: "fullstack",
    label: "FULLSTACK PROJECT",
    context: "NODE.JS, POSTGRES",
    accent: "#FFE600",
    questions: [
      "HOW DID YOU DESIGN THE API?",
      "WHAT'S YOUR DATABASE SCHEMA LIKE?",
      "HOW DID YOU HANDLE AUTH?",
    ],
    status: "LIVE",
    detail: "SaaS Analytics Dashboard",
  },
  {
    id: "mobile",
    label: "MOBILE PROJECT",
    context: "REACT NATIVE, EXPO",
    accent: "#0085FF",
    questions: [
      "HOW DID YOU HANDLE OFFLINE MODE?",
      "WHAT'S THE NAVIGATION STRUCTURE?",
      "HOW DID YOU PUBLISH TO APP STORE?",
    ],
    status: "IN REVIEW",
    detail: "Wellness App",
  },
] as const;

type PanelId = (typeof panels)[number]["id"];

/* ── Dot grid background ──────────────────────────────────── */
function DotGrid({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        opacity, pointerEvents: "none",
      }}
    >
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

/* ── Corner brackets ──────────────────────────────────────── */
function Brackets() {
  const s: React.CSSProperties = {
    position: "absolute", width: "16px", height: "16px",
    borderColor: "rgba(255,255,255,0.4)", borderStyle: "solid",
  };
  return (
    <>
      <span style={{ ...s, top: 0, left: 0,  borderWidth: "1px 0 0 1px" }} />
      <span style={{ ...s, top: 0, right: 0, borderWidth: "1px 1px 0 0" }} />
      <span style={{ ...s, bottom: 0, left: 0,  borderWidth: "0 0 1px 1px" }} />
      <span style={{ ...s, bottom: 0, right: 0, borderWidth: "0 1px 1px 0" }} />
    </>
  );
}

/* ── Is accent light? (for contrast) ─────────────────────── */
function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

/* ── Active panel content ─────────────────────────────────── */
function ActiveContent({ panel }: { panel: (typeof panels)[number] }) {
  const light = isLight(panel.accent);
  const fg = light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
  const fgStrong = light ? "#000" : "#fff";
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!input.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setInput(""); }, 1800);
  }

  return (
    <motion.div
      key={panel.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px",
        borderBottom: `1px solid ${light ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"}`,
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.1em",
          color: fg,
        }}>
          PROJECT CONTEXT
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.08em",
          background: fgStrong, color: light ? "#fff" : "#000",
          padding: "3px 10px", borderRadius: "2px",
        }}>
          {panel.context}
        </span>
      </div>

      {/* Inner black panel */}
      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column" }}>
        <div style={{
          flex: 1,
          background: "#0a0a0a",
          position: "relative",
          borderRadius: "2px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px",
          gap: "8px",
          overflow: "hidden",
          minHeight: "200px",
        }}>
          <Brackets />

          {/* Project title inside */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px", letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {panel.detail}
          </motion.p>

          {/* Suggested questions */}
          {panel.questions.map((q, i) => (
            <motion.button
              key={q}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.08, ease }}
              onClick={() => setInput(q)}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px", letterSpacing: "0.06em",
                padding: "7px 12px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2px",
                color: "rgba(255,255,255,0.75)",
                cursor: "pointer",
                textAlign: "left",
                textTransform: "uppercase",
                transition: "background 0.15s",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              {q}
            </motion.button>
          ))}
        </div>

        {/* Input bar */}
        <div style={{
          display: "flex", gap: "8px",
          marginTop: "12px",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="ASK ABOUT THIS PROJECT..."
            style={{
              flex: 1,
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px", letterSpacing: "0.06em",
              padding: "10px 14px",
              background: "#0a0a0a",
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "2px",
              color: "#fff",
              outline: "none",
              textTransform: "uppercase",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: "36px", height: "36px",
              background: "#000",
              border: "none", borderRadius: "50%",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0,
              transition: "opacity 0.2s",
            }}
          >
            {sent ? "✓" : "↑"}
          </button>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px",
        borderTop: `1px solid ${light ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"}`,
      }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: fg }}>
          STATUS:{" "}
          <span style={{
            background: fgStrong, color: light ? "#fff" : "#000",
            padding: "2px 8px", borderRadius: "2px",
          }}>
            {panel.status}
          </span>
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.06em",
          color: fg, cursor: "pointer",
        }}>
          VIEW PROJECT →
        </span>
      </div>
    </motion.div>
  );
}

/* ── Inactive panel ───────────────────────────────────────── */
function InactivePanel({
  panel,
  onClick,
}: {
  panel: (typeof panels)[number];
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        background: "#111",
        cursor: "pointer",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        height: "100%",
        transition: "background 0.2s",
      }}
      whileHover={{ background: "#181818" }}
    >
      <DotGrid opacity={0.14} />
      <div style={{ position: "relative", zIndex: 1 }} />

      {/* Label center */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px", letterSpacing: "0.1em",
        color: "rgba(255,255,255,0.3)",
        textTransform: "uppercase",
      }}>
        {panel.label}
      </div>

      {/* Click to chat */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "10px", letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.2)",
      }}>
        [ CLICK TO VIEW ]
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function ProjectDemo() {
  const [active, setActive] = useState<PanelId>("fullstack");
  const activePanel = panels.find((p) => p.id === active)!;

  return (
    <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Headline row */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{
          padding: "56px 64px",
        }}>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "20px",
          }}>
            Project Demos
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.0, color: "#fff",
          }}>
            เลือก project<br />
            แล้วลองคุย<br />
            <span style={{ color: activePanel.accent }}>กันเลย.</span>
          </h2>
        </div>
        <div style={{ padding: "56px 64px", display: "flex", alignItems: "center" }}>
          <p style={{
            fontSize: "17px", fontWeight: 300,
            color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "380px",
          }}>
            แต่ละโปรเจกต์มีบริบทและ stack ที่ต่างกัน — คลิกเพื่อดูรายละเอียด
            และ explore วิธีที่ผมแก้ปัญหาในแต่ละ context
          </p>
        </div>
      </div>

      {/* 3-panel row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        height: "520px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {panels.map((panel, i) => {
          const isActive = panel.id === active;
          const isLeft = i === 0;
          const isRight = i === panels.length - 1;

          return (
            <motion.div
              key={panel.id}
              layout
              style={{
                position: "relative",
                overflow: "hidden",
                background: isActive ? panel.accent : "#111",
                borderRight: !isRight ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
              transition={{ duration: 0.4, ease }}
            >
              {isActive ? (
                <AnimatePresence mode="wait">
                  <ActiveContent key={panel.id} panel={panel} />
                </AnimatePresence>
              ) : (
                <InactivePanel panel={panel} onClick={() => setActive(panel.id)} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Narrow bottom strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 2fr 1fr",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {panels.map((panel, i) => {
          const isActive = panel.id === active;
          return (
            <motion.button
              key={panel.id}
              onClick={() => setActive(panel.id)}
              style={{
                position: "relative",
                padding: "18px 24px",
                background: "transparent",
                border: "none",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px", letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "color 0.2s",
              }}
            >
              {/* Active top border */}
              {isActive && (
                <motion.span
                  layoutId="demo-tab-indicator"
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "2px", background: panel.accent,
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              )}
              {panel.label}
            </motion.button>
          );
        })}
      </div>

    </section>
  );
}
