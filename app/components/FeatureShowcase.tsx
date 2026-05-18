"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../hooks/useMediaQuery";
import type { BackgroundData, BackgroundTab } from "../lib/sanity";

const ease = [0.22, 1, 0.36, 1] as const;

const TAB_IDS = ["education", "experience", "freelance"] as const;
type TabId = (typeof TAB_IDS)[number];

/* ── Geometry-only config (no translatable text) ──────────── */
type SceneConfig = {
  badgeAccent: boolean;
  milestones: { x: number; y: number; dim?: boolean }[];
  nodes: { id: string; x: number; y: number; accent?: boolean }[];
  lines: { x1: number; y1: number; x2: number; y2: number }[];
  metric_values: { value: string; accent?: boolean }[];
};

const SCENES_CONFIG: Record<TabId, SceneConfig> = {
  education: {
    badgeAccent: false,
    milestones: [
      { x: 0, y: 8  },
      { x: 0, y: 18, dim: true },
      { x: 0, y: 38 },
      { x: 0, y: 64 },
      { x: 0, y: 75, dim: true },
      { x: 0, y: 84, dim: true },
      { x: 0, y: 92 },
    ],
    nodes: [
      { id: "e1", x: 12, y: 20 },
      { id: "e2", x: 12, y: 42 },
      { id: "e3", x: 12, y: 63 },
      { id: "e4", x: 12, y: 82 },
      { id: "e5", x: 62, y: 22 },
      { id: "e6", x: 62, y: 44 },
      { id: "e7", x: 62, y: 66 },
      { id: "e8", x: 88, y: 44, accent: true },
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
    metric_values: [
      { value: "3 yr", accent: true },
      { value: "2025" },
      { value: "CS" },
      { value: "1" },
    ],
  },
  experience: {
    badgeAccent: false,
    milestones: [
      { x: 0, y: 8  },
      { x: 0, y: 20, dim: true },
      { x: 0, y: 35, dim: true },
      { x: 0, y: 52 },
      { x: 0, y: 72 },
      { x: 0, y: 82, dim: true },
      { x: 0, y: 92, dim: true },
    ],
    nodes: [
      { id: "x1", x: 10, y: 22 },
      { id: "x2", x: 10, y: 44 },
      { id: "x3", x: 10, y: 66 },
      { id: "x4", x: 10, y: 84 },
      { id: "x5", x: 58, y: 22 },
      { id: "x6", x: 58, y: 44 },
      { id: "x7", x: 58, y: 66 },
      { id: "x8", x: 88, y: 44, accent: true },
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
    metric_values: [
      { value: "10+", accent: true },
      { value: "0→1" },
      { value: "Gov" },
      { value: "Solo" },
    ],
  },
  freelance: {
    badgeAccent: true,
    milestones: [
      { x: 0, y: 8  },
      { x: 0, y: 22, dim: true },
      { x: 0, y: 38, dim: true },
      { x: 0, y: 54, dim: true },
      { x: 0, y: 70, dim: true },
      { x: 0, y: 88, dim: true },
    ],
    nodes: [
      { id: "f1", x: 12, y: 20 },
      { id: "f2", x: 12, y: 42 },
      { id: "f3", x: 12, y: 63 },
      { id: "f4", x: 12, y: 82 },
      { id: "f5", x: 62, y: 22 },
      { id: "f6", x: 62, y: 44 },
      { id: "f7", x: 62, y: 66 },
      { id: "f8", x: 88, y: 44, accent: true },
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
    metric_values: [
      { value: "6+",   accent: true },
      { value: "Live" },
      { value: "Solo" },
      { value: "2026" },
    ],
  },
};

/* ── Types ────────────────────────────────────────────────── */
type SceneText = {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  highlights: string[];
  badge: string;
  milestone_labels: string[];
  node_labels: string[];
  node_details: string[];
  metric_labels: string[];
};

type Scene = {
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
};

/* ── Build full scene: geometry + i18n text + Sanity override  */
function buildScene(cfg: SceneConfig, text: SceneText, isEn: boolean, sanity?: BackgroundTab | null): Scene {
  return {
    period:      sanity?.period      ?? text.period,
    role:        sanity?.role        ?? text.role,
    org:         sanity?.org         ?? text.org,
    location:    sanity?.location    ?? text.location,
    description: (isEn ? sanity?.descriptionEn : null) ?? sanity?.description ?? text.description,
    highlights:  (isEn && sanity?.highlightsEn?.length ? sanity.highlightsEn : null)
                 ?? (sanity?.highlights?.length ? sanity.highlights : null)
                 ?? text.highlights,
    badge:       sanity?.badge       ?? text.badge,
    badgeAccent: sanity?.badgeAccent !== undefined ? sanity.badgeAccent : cfg.badgeAccent,
    milestones:  cfg.milestones.map((m, i) => ({ ...m, label: text.milestone_labels[i] ?? "" })),
    nodes:       cfg.nodes.map((n, i) => ({ ...n, label: text.node_labels[i] ?? "", detail: text.node_details[i] })),
    lines:       cfg.lines.map((l) => ({ ...l })),
    metrics:     sanity?.metrics?.length
      ? sanity.metrics.map((m) => ({ value: m.value, label: (isEn ? m.labelEn : null) ?? m.label, accent: m.accent ?? false }))
      : cfg.metric_values.map((m, i) => ({ ...m, label: text.metric_labels[i] ?? "" })),
  };
}

/* ── Dot grid ─────────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg style={{ position: "absolute", inset: "16px", width: "calc(100% - 32px)", height: "calc(100% - 32px)", opacity: 0.25, pointerEvents: "none" }}>
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
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <motion.line
          x1="64" y1="5%" x2="64" y2="95%"
          stroke="var(--hairline)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease }}
        />
        {years.map((m, i) => (
          <motion.line
            key={`tick-${i}`}
            x1="64" y1={`${m.y}%`} x2="76" y2={`${m.y}%`}
            stroke="var(--text-subtle)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease }}
          />
        ))}
      </svg>
      {years.map((m, i) => (
        <motion.div
          key={`year-${i}`}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease }}
          style={{ position: "absolute", left: "80px", top: `${m.y}%`, transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "8px", pointerEvents: "none" }}
        >
          <span style={{ position: "absolute", left: "-16px", width: "7px", height: "7px", borderRadius: "50%", background: "#553F83", boxShadow: "0 0 8px rgba(85,63,131,0.8)", transform: "translateX(-50%)" }} />
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600, color: "var(--text-mid)", whiteSpace: "nowrap" }}>
            {m.label}
          </span>
        </motion.div>
      ))}
      {events.map((m, i) => (
        <motion.div
          key={`event-${i}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease }}
          style={{ position: "absolute", left: "84px", top: `${m.y}%`, transform: "translateY(-50%)", fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)", whiteSpace: "nowrap", pointerEvents: "none" }}
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
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "10px" }}>
          {d.period}
        </p>
        <h3 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-high)", marginBottom: "6px" }}>
          {d.role}
        </h3>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#553F83", marginBottom: "24px" }}>
          {d.org} · {d.location}
        </p>
        <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "24px" }}>
          {d.description}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
          {d.highlights.map((h) => (
            <div key={h} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: "#553F83", marginTop: "3px", flexShrink: 0 }}>→</span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{h}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: d.badgeAccent ? "#22c55e" : "var(--text-subtle)", boxShadow: d.badgeAccent ? "0 0 6px rgba(34,197,94,0.6)" : "none" }} />
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: d.badgeAccent ? "#22c55e" : "var(--text-subtle)" }}>
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", background: "var(--canvas)" }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={`${tabKey}-metric-${i}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.08, ease }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 28px", borderRight: i % 2 === 0 ? "1px solid var(--hairline)" : "none", borderBottom: i < 2 ? "1px solid var(--hairline)" : "none", position: "relative", overflow: "hidden" }}
          >
            {m.accent && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#553F83" }} />
            )}
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "clamp(28px, 2.8vw, 40px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: m.accent ? "#553F83" : "var(--text-high)", marginBottom: "10px" }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function FeatureShowcase({ background }: { background?: BackgroundData | null }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [activeTab, setActiveTab] = useState<TabId>("education");
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const sceneTexts = {
    education:  t("showcase.education",  { returnObjects: true }) as SceneText,
    experience: t("showcase.experience", { returnObjects: true }) as SceneText,
    freelance:  t("showcase.freelance",  { returnObjects: true }) as SceneText,
  };

  const activeScenes: Record<TabId, Scene> = {
    education:  buildScene(SCENES_CONFIG.education,  sceneTexts.education,  isEn, background?.education),
    experience: buildScene(SCENES_CONFIG.experience, sceneTexts.experience, isEn, background?.experience),
    freelance:  buildScene(SCENES_CONFIG.freelance,  sceneTexts.freelance,  isEn, background?.freelance),
  };

  const advance = useCallback(() => {
    setActiveTab((cur) => {
      const idx = TAB_IDS.indexOf(cur);
      return TAB_IDS[(idx + 1) % TAB_IDS.length];
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
      style={{ background: "var(--canvas)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{ padding: isMobile ? "40px 24px 20px" : "64px 64px 24px", borderBottom: "1px solid var(--hairline)", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", gap: isMobile ? "8px" : "0", justifyContent: "space-between" }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "10px" }}>
            {t("showcase.eyeline")}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--text-high)" }}>
            {t("showcase.heading1")}<span style={{ color: "#553F83" }}>{t("showcase.heading2")}</span>
          </h2>
        </div>
        {!isMobile && (
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
            {t("showcase.subtitle")}
          </p>
        )}
      </motion.div>

      {/* ── Panels ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "360px 1fr 1fr", height: isMobile ? "auto" : "440px", borderBottom: "1px solid var(--hairline)", overflow: "hidden" }}
      >
        {!isMobile && (
          <div style={{ borderRight: "1px solid var(--hairline)", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab + "-strip"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ height: "100%" }}>
                <TimelineStrip scene={activeScenes[activeTab]} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        <div style={{ borderRight: isMobile ? "none" : "1px solid var(--hairline)", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <DetailPanel key={activeTab} scene={activeScenes[activeTab]} tabKey={activeTab} />
          </AnimatePresence>
        </div>
        {!isMobile && (
          <div style={{ position: "relative" }}>
            <MetricsPanel scene={activeScenes[activeTab]} tabKey={activeTab} />
          </div>
        )}
      </motion.div>

      {/* ── Tab bar ───────────────────────────────────────── */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--hairline)" }}>
        {TAB_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{ position: "relative", flex: 1, padding: isMobile ? "16px 12px" : "20px 32px", background: "transparent", border: "none", borderRight: i < TAB_IDS.length - 1 ? "1px solid var(--hairline)" : "none", cursor: "pointer", fontFamily: "var(--font-mono), monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: activeTab === id ? "var(--text-high)" : "var(--text-subtle)", transition: "color 0.2s ease" }}
          >
            <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.06)" }} />
            {activeTab === id && (
              <motion.span
                key={id}
                initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ duration: 5.5, ease: "linear" }}
                style={{ position: "absolute", top: 0, left: 0, height: "2px", background: "#553F83" }}
              />
            )}
            {t(`showcase.tabs.${id}`)}
          </button>
        ))}
      </div>
    </section>
  );
}
