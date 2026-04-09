"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LAB_PANELS } from "../lib/labConfig";
import type { Gender } from "../lib/labConfig";

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
    position: "absolute", width: "22px", height: "22px",
    borderColor: "rgba(255,255,255,0.55)", borderStyle: "solid",
  };
  return (
    <>
      <span style={{ ...s, top: 0, left: 0,  borderWidth: "2px 0 0 2px" }} />
      <span style={{ ...s, top: 0, right: 0, borderWidth: "2px 2px 0 0" }} />
      <span style={{ ...s, bottom: 0, left: 0,  borderWidth: "0 0 2px 2px" }} />
      <span style={{ ...s, bottom: 0, right: 0, borderWidth: "0 2px 2px 0" }} />
    </>
  );
}

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

function getStatus(val: number, low: number, high: number): "L" | "N" | "H" {
  if (val < low) return "L";
  if (val > high) return "H";
  return "N";
}

/* ── Lab Demo Panel (panel 1) ─────────────────────────────── */
function LabDemoPanel() {
  const [step, setStep] = useState<"info" | "lab">("info");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [activeTab, setActiveTab] = useState("cbc");
  const [values, setValues] = useState<Record<string, string>>({});

  const canProceed = age !== "" && parseInt(age) > 0 && gender !== "";
  const ageNum = parseInt(age) || 0;
  const genderVal = gender as Gender;
  const currentPanel = LAB_PANELS.find((p) => p.id === activeTab)!;
  const items = currentPanel.items;
  const hasAnyValue = items.some((item) => values[item.key] !== undefined && values[item.key] !== "");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)" }}>
          LAB MODULE · HIS
        </span>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.08em", color: "rgba(0,0,0,0.5)" }}>
          PANEL:{" "}
          <span style={{ background: "#ffffff", color: "#0a0a0a", padding: "2px 8px", borderRadius: "2px" }}>
            {step === "info" ? "INFO" : activeTab.toUpperCase()}
          </span>
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {step === "info" ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div style={{
                flex: 1, background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "2px",
                padding: "20px", position: "relative",
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <Brackets />
                <p style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ข้อมูลผู้ป่วย
                </p>
                {/* Age */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>อายุ (ปี)</label>
                  <input
                    type="number" value={age} onChange={(e) => setAge(e.target.value)}
                    placeholder="เช่น 35" min={1} max={120}
                    style={{
                      ...MONO, background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px",
                      color: "#fff", fontSize: "13px", padding: "8px 12px", outline: "none", width: "100%",
                    }}
                  />
                </div>
                {/* Gender */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>เพศ</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["M", "F"] as const).map((g) => (
                      <button key={g} onClick={() => setGender(g)} style={{
                        flex: 1, padding: "8px",
                        background: gender === g ? "#F04E00" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${gender === g ? "#F04E00" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: "2px",
                        color: gender === g ? "#fff" : "rgba(255,255,255,0.4)",
                        cursor: "pointer", ...MONO, fontSize: "11px", letterSpacing: "0.06em", transition: "all 0.15s",
                      }}>
                        {g === "M" ? "ชาย" : "หญิง"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => canProceed && setStep("lab")}
                style={{
                  ...MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "12px",
                  background: canProceed ? "#ffffff" : "rgba(0,0,0,0.10)",
                  border: "none", borderRadius: "2px",
                  color: canProceed ? "#F04E00" : "rgba(0,0,0,0.30)",
                  cursor: canProceed ? "pointer" : "not-allowed", transition: "all 0.2s",
                }}
              >
                ถัดไป — กรอกผล Lab →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="lab"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}
            >
            <div style={{
                flex: 1, display: "flex", flexDirection: "column", gap: 0, overflow: "hidden",
                background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "2px",
              }}
            >
              {/* Sub-tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {LAB_PANELS.map((lp) => (
                  <button key={lp.id} onClick={() => { setActiveTab(lp.id); setValues({}); }} style={{
                    ...MONO, fontSize: "9px", letterSpacing: "0.08em", padding: "6px 12px",
                    background: activeTab === lp.id ? "rgba(255,255,255,0.05)" : "transparent",
                    border: "none",
                    borderBottom: activeTab === lp.id ? "2px solid #F04E00" : "2px solid transparent",
                    color: activeTab === lp.id ? "#fff" : "rgba(255,255,255,0.25)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {lp.label}
                  </button>
                ))}
              </div>

              {/* Lab table */}
              <div style={{ flex: 1, overflow: "auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 80px 100px 80px",
                  padding: "8px 12px", background: "rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0,
                }}>
                  {["PARAMETER", "UNIT", "REF RANGE", "VALUE"].map((h) => (
                    <span key={h} style={{ ...MONO, fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{h}</span>
                  ))}
                </div>
                {items.map((item) => {
                  const [low, high] = item.ref(ageNum, genderVal);
                  const val = parseFloat(values[item.key] ?? "");
                  const hasVal = !isNaN(val) && values[item.key] !== "";
                  const status = hasVal ? getStatus(val, low, high) : null;
                  const statusColor = status === "H" ? "#f87171" : status === "L" ? "#60a5fa" : "#4ade80";
                  return (
                    <div key={item.key} style={{
                      display: "grid", gridTemplateColumns: "1fr 80px 100px 80px",
                      alignItems: "center", padding: "7px 12px",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      background: hasVal && status !== "N" ? `${statusColor}08` : "transparent",
                      transition: "background 0.2s",
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{item.label}</div>
                      <div style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>{item.unit}</div>
                      <div style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>{low} – {high}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <input
                          type="number" step={item.step}
                          value={values[item.key] ?? ""}
                          onChange={(e) => setValues((v) => ({ ...v, [item.key]: e.target.value }))}
                          style={{
                            ...MONO, width: "52px",
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${hasVal && status !== "N" ? statusColor : "rgba(255,255,255,0.08)"}`,
                            borderRadius: "2px",
                            color: hasVal && status !== "N" ? statusColor : "#fff",
                            fontSize: "11px", fontWeight: hasVal && status !== "N" ? 700 : 400,
                            padding: "3px 6px", outline: "none", transition: "all 0.2s",
                          }}
                        />
                        {status && status !== "N" && (
                          <span style={{ ...MONO, fontSize: "9px", color: statusColor, fontWeight: 700 }}>{status}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interpretation */}
              {hasAnyValue && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
                >
                  <p style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 4 }}>INTERPRETATION</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                    {currentPanel.interpret(values, ageNum, genderVal)}
                  </p>
                </motion.div>
              )}
            </div>

              <button
                onClick={() => { setStep("info"); setValues({}); }}
                style={{
                  ...MONO, fontSize: "9px", letterSpacing: "0.08em",
                  background: "transparent", border: "none",
                  color: "rgba(255,255,255,0.65)", cursor: "pointer", textAlign: "left", padding: "6px 0 2px",
                }}
              >
                ← เปลี่ยนข้อมูลผู้ป่วย ({gender === "M" ? "ชาย" : "หญิง"}, {age} ปี)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderTop: "1px solid rgba(0,0,0,0.15)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(0,0,0,0.5)" }}>REF: WHO · ADULT RANGE</span>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(0,0,0,0.5)" }}>HIS MODULE · LAB →</span>
      </div>
    </motion.div>
  );
}

/* ── On-accent map (fixed — not theme-dependent) ──────────── */
const ON_ACCENT: Record<string, { fg: string; fgMuted: string; fgFaint: string; line: string; badge: string }> = {
  "#F04E00": { fg: "#fff",    fgMuted: "rgba(255,255,255,0.65)", fgFaint: "rgba(255,255,255,0.35)", line: "rgba(0,0,0,0.15)", badge: "rgba(0,0,0,0.2)"  },
  "#FFE600": { fg: "#0F0D12", fgMuted: "rgba(15,13,18,0.65)",   fgFaint: "rgba(15,13,18,0.35)",   line: "rgba(0,0,0,0.12)", badge: "rgba(0,0,0,0.08)" },
  "#0085FF": { fg: "#fff",    fgMuted: "rgba(255,255,255,0.65)", fgFaint: "rgba(255,255,255,0.35)", line: "rgba(0,0,0,0.15)", badge: "rgba(0,0,0,0.2)"  },
};

/* ── Active panel content ─────────────────────────────────── */
function ActiveContent({ panel }: { panel: (typeof panels)[number] }) {
  const on = ON_ACCENT[panel.accent];
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
        borderBottom: `1px solid ${on.line}`,
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.1em",
          color: on.fgMuted,
        }}>
          AGENT CONTEXT
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.08em",
          color: on.fgMuted,
        }}>
          CURRENT CONTEXT:{" "}
          <span style={{
            background: on.fg, color: panel.accent,
            padding: "2px 8px", borderRadius: "2px",
          }}>
            {panel.context}
          </span>
        </span>
      </div>

      {/* Inner black panel */}
      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column" }}>
        <div style={{
          flex: 1,
          background: "#0a0a0a",
          border: `1px solid ${on.line}`,
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
              color: "rgba(255,255,255,0.25)",
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
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "2px",
                color: "rgba(255,255,255,0.65)",
                cursor: "pointer",
                textAlign: "left",
                textTransform: "uppercase",
                transition: "background 0.15s",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              {q}
            </motion.button>
          ))}
        </div>

        {/* Input bar */}
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="ASK THE AI AGENT A QUESTION..."
            style={{
              flex: 1,
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px", letterSpacing: "0.06em",
              padding: "10px 14px",
              background: "#0a0a0a",
              border: `1px solid ${on.line}`,
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
              background: on.badge,
              border: "none", borderRadius: "50%",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: on.fg, flexShrink: 0,
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
        borderTop: `1px solid ${on.line}`,
      }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: on.fgMuted }}>
          STATUS:{" "}
          <span style={{
            background: on.fg, color: panel.accent,
            padding: "2px 8px", borderRadius: "2px",
          }}>
            {panel.status}
          </span>
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.06em",
          color: on.fgMuted, cursor: "pointer",
        }}>
          LEARN MORE →
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

      {/* Dashed center box */}
      <div style={{
        position: "absolute", zIndex: 1,
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%", height: "40%",
        border: "1px dashed rgba(255,255,255,0.18)",
        borderRadius: "2px",
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "13px", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          {panel.label}
        </span>
      </div>

      {/* Click to chat */}
      <div style={{
        position: "absolute", zIndex: 1,
        bottom: "20px", left: 0, right: 0,
        display: "flex", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          background: "rgba(0,0,0,0.5)",
          padding: "4px 12px",
          borderRadius: "2px",
        }}>
          [ CLICK TO CHAT ]
        </span>
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
                  {panel.id === "frontend" ? (
                    <LabDemoPanel key="lab" />
                  ) : (
                    <ActiveContent key={panel.id} panel={panel} />
                  )}
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
