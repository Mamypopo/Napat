"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LabDemoPanel from "./LabDemoPanel";
import GitHeatmap from "./GitHeatmap";
import { useIsMobile } from "../hooks/useMediaQuery";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Panel config (non-translatable) ─────────────────────── */
const PANEL_CONFIG = [
  { id: "frontend"  as const, accent: "#F04E00" },
  { id: "fullstack" as const, accent: "#FFE600" },
  { id: "mobile"    as const, accent: "#0085FF" },
];
type PanelId = "frontend" | "fullstack" | "mobile";
type PanelDisplay = { id: PanelId; accent: string; label: string };

/* ── Chat types ───────────────────────────────────────────── */
type QAItem = { q: string; keywords: string[]; answer: string };
type Message = { role: "user" | "bot"; text: string };

/* ── Blocked words (language-agnostic) ───────────────────── */
const BLOCKED_WORDS = ["หี", "หน้าหี", "สัตว์", "ไอ้สัตว์", "เย็ด", "มึง", "กู", "หำ", "ควย", "สัส", "fuck", "shit", "bitch", "asshole"];

function isBlocked(text: string): boolean {
  const low = text.toLowerCase();
  return BLOCKED_WORDS.some((w) => low.includes(w));
}

function findAnswer(q: string, qa: QAItem[], fallback: string): string {
  const low = q.toLowerCase().replace(/[?!.,]/g, "");
  const words = low.split(/\s+/);
  let best = { score: 0, answer: fallback };
  for (const item of qa) {
    const score = item.keywords.reduce((s, k) => {
      if (low.includes(k)) return s + 2;
      if (words.some((w) => w.includes(k) || k.includes(w))) return s + 1;
      return s;
    }, 0);
    if (score > best.score) best = { score, answer: item.answer };
  }
  return best.answer;
}

/* ── On-accent map ────────────────────────────────────────── */
const ON_ACCENT: Record<string, { fg: string; fgMuted: string; fgFaint: string; line: string; badge: string }> = {
  "#F04E00": { fg: "#fff",    fgMuted: "rgba(255,255,255,0.65)", fgFaint: "rgba(255,255,255,0.35)", line: "rgba(0,0,0,0.15)", badge: "rgba(0,0,0,0.2)"  },
  "#FFE600": { fg: "#0F0D12", fgMuted: "rgba(15,13,18,0.65)",   fgFaint: "rgba(15,13,18,0.35)",   line: "rgba(0,0,0,0.12)", badge: "rgba(0,0,0,0.08)" },
  "#0085FF": { fg: "#fff",    fgMuted: "rgba(255,255,255,0.65)", fgFaint: "rgba(255,255,255,0.35)", line: "rgba(0,0,0,0.15)", badge: "rgba(0,0,0,0.2)"  },
};

/* ── Chat panel ───────────────────────────────────────────── */
function ChatPanel() {
  const { t } = useTranslation();
  const qa = t("chat.qa", { returnObjects: true }) as QAItem[];
  const commands = t("chat.commands", { returnObjects: true }) as Record<string, string>;
  const fallback = t("chat.fallback");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const on = ON_ACCENT["#FFE600"];

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  function handleSend(text: string) {
    if (!text.trim() || isTyping) return;
    if (text.trim() === "/clear") { setMessages([]); setInput(""); return; }
    if (text.trim() === "/") {
      setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: commands["/help"] ?? "" }]);
      setInput("");
      return;
    }
    setInput("");
    if (isBlocked(text)) {
      setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: t("chat.blocked") }]);
      return;
    }
    const answer = commands[text.trim().toLowerCase()] ?? findAnswer(text, qa, fallback);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: "" }]);
    setIsTyping(true);
    let i = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      i++;
      const typed = answer.slice(0, i);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "bot", text: typed };
        return next;
      });
      if (i >= answer.length) {
        clearInterval(timerRef.current!);
        setIsTyping(false);
      }
    }, 22);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${on.line}` }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", color: on.fgMuted }}>{t("chat.agent_context")}</span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.08em", color: on.fgMuted }}>
          {t("chat.current_context")}{" "}
          <span style={{ background: on.fg, color: "#FFE600", padding: "2px 8px", borderRadius: "2px" }}>{t("demo.panel_fullstack_ctx")}</span>
        </span>
      </div>

      {/* Dark inner panel */}
      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{
          flex: 1, background: "#0a0a0a", border: `1px solid ${on.line}`,
          position: "relative", borderRadius: "2px",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "20px", gap: "8px", overflow: "hidden", minHeight: 0,
        }}>
          <Brackets />

          {messages.length === 0 ? (
            <>
              <motion.p
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "8px" }}
              >
                {t("chat.ask_label")}
              </motion.p>
              {qa.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, ease }}
                  onClick={() => handleSend(item.q)}
                  style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.06em",
                    padding: "7px 12px", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px",
                    color: "rgba(255,255,255,0.65)", cursor: "pointer",
                    textAlign: "left", textTransform: "uppercase", transition: "background 0.15s", width: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                  {item.q}
                </motion.button>
              ))}
            </>
          ) : (
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "8px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
                    {msg.role === "user" ? t("chat.msg_you") : t("chat.msg_napat")}
                  </span>
                  <div style={{
                    maxWidth: "85%", padding: "8px 12px", borderRadius: "2px",
                    background: msg.role === "user" ? "rgba(255,255,255,0.08)" : "rgba(255,214,0,0.12)",
                    border: `1px solid ${msg.role === "user" ? "rgba(255,255,255,0.08)" : "rgba(255,214,0,0.2)"}`,
                    fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.04em",
                    color: msg.role === "user" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.85)",
                    lineHeight: 1.7, whiteSpace: "pre-line",
                  }}>
                    {msg.text}
                    {msg.role === "bot" && isTyping && i === messages.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ display: "inline-block", width: "2px", height: "12px", background: "#FFE600", marginLeft: "2px", verticalAlign: "middle" }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px", position: "relative" }}>
          {input.startsWith("/") && (() => {
            const filtered = Object.keys(commands).filter((cmd) => cmd.startsWith(input.toLowerCase()));
            if (filtered.length === 0) return null;
            return (
              <div style={{
                position: "absolute", bottom: "calc(100% + 6px)", left: 0, right: 0,
                background: "#1a1a1a", border: `1px solid rgba(255,255,255,0.15)`,
                borderRadius: "4px", overflow: "hidden", zIndex: 20,
                boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
              }}>
                {filtered.map((cmd) => (
                  <button
                    key={cmd}
                    onMouseDown={(e) => { e.preventDefault(); setInput(cmd); }}
                    style={{
                      display: "block", width: "100%", padding: "8px 14px", textAlign: "left",
                      background: "transparent", border: "none", borderBottom: `1px solid rgba(255,255,255,0.06)`,
                      fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ color: "#FFE600" }}>{cmd}</span>
                  </button>
                ))}
              </div>
            );
          })()}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (input.startsWith("/")) {
                  const filtered = Object.keys(commands).filter((cmd) => cmd.startsWith(input.toLowerCase()));
                  if (filtered.length === 1) { handleSend(filtered[0]); return; }
                }
                handleSend(input);
              }
            }}
            placeholder={t("chat.placeholder")}
            disabled={isTyping}
            style={{
              flex: 1, fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.06em",
              padding: "10px 14px", background: "#0a0a0a",
              border: `1px solid ${on.line}`, borderRadius: "2px",
              color: "#fff", outline: "none", textTransform: "uppercase",
            }}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={isTyping || !input.trim()}
            style={{
              width: "36px", height: "36px", background: on.badge, border: "none", borderRadius: "50%",
              cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: on.fg, flexShrink: 0,
              opacity: isTyping || !input.trim() ? 0.4 : 1, transition: "opacity 0.2s",
            }}
          >
            {isTyping ? "…" : "↑"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: `1px solid ${on.line}` }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: on.fgMuted }}>
          STATUS:{" "}
          <span style={{ background: on.fg, color: "#FFE600", padding: "2px 8px", borderRadius: "2px" }}>
            {isTyping ? t("chat.typing") : t("chat.online")}
          </span>
        </span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: on.fgMuted, cursor: "pointer" }}>
          {t("chat.learn_more")}
        </span>
      </div>
    </motion.div>
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

/* ── Dot grid background ──────────────────────────────────── */
function DotGrid({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}>
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

/* ── Inactive panel ───────────────────────────────────────── */
function InactivePanel({ panel, onClick }: { panel: PanelDisplay; onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        background: "#111", cursor: "pointer",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "20px", height: "100%",
        transition: "background 0.2s",
      }}
      whileHover={{ background: "#181818" }}
    >
      <DotGrid opacity={0.14} />
      <div style={{ position: "relative", zIndex: 1 }} />
      <div style={{
        position: "absolute", zIndex: 1,
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70%", height: "40%",
        border: "1px dashed rgba(255,255,255,0.18)", borderRadius: "2px",
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "13px", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          {panel.label}
        </span>
      </div>
      <div style={{ position: "absolute", zIndex: 1, bottom: "20px", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "2px",
        }}>
          {t("demo.click_to_chat")}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function ProjectDemo() {
  const { t } = useTranslation();
  const [active, setActive] = useState<PanelId>("fullstack");
  const isMobile = useIsMobile();

  const panels: PanelDisplay[] = PANEL_CONFIG.map((p) => ({
    ...p,
    label: t(`demo.panel_${p.id}_label`),
  }));
  const activePanel = panels.find((p) => p.id === active)!;

  return (
    <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Headline row */}
      <div style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ padding: isMobile ? "40px 24px" : "56px 64px" }}>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "20px",
          }}>
            {t("demo.heading")}
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.0, color: "#fff",
          }}>
            {t("demo.h1")}<br />
            {t("demo.h2")}<br />
            <span style={{ color: activePanel.accent }}>{t("demo.h3")}</span>
          </h2>
        </div>
        {!isMobile && (
          <div style={{ padding: "56px 64px", display: "flex", alignItems: "center" }}>
            <p style={{
              fontSize: "17px", fontWeight: 300,
              color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "380px",
            }}>
              {t("demo.subheading")}
            </p>
          </div>
        )}
      </div>

      {/* 3-panel row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
        height: isMobile ? "480px" : "520px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {panels.map((panel, i) => {
          const isActive = panel.id === active;
          const isRight = i === panels.length - 1;

          if (isMobile && !isActive) return null;

          return (
            <motion.div
              key={panel.id}
              layout
              style={{
                position: "relative", overflow: "hidden",
                background: isActive ? panel.accent : "#111",
                borderRight: !isMobile && !isRight ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
              transition={{ duration: 0.4, ease }}
            >
              {isActive ? (
                <AnimatePresence mode="wait">
                  {panel.id === "frontend" ? (
                    <LabDemoPanel key="lab" />
                  ) : panel.id === "fullstack" ? (
                    <ChatPanel key="chat" />
                  ) : (
                    <GitHeatmap key="heatmap" />
                  )}
                </AnimatePresence>
              ) : (
                <InactivePanel panel={panel} onClick={() => setActive(panel.id)} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom tab strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
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
                padding: isMobile ? "14px 8px" : "18px 24px",
                background: "transparent", border: "none",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono), monospace",
                fontSize: isMobile ? "8px" : "10px", letterSpacing: isMobile ? "0.04em" : "0.1em",
                textTransform: "uppercase",
                color: isActive ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "color 0.2s",
              }}
            >
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
