"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Slide data ───────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    category: "WEB PROJECT",
    title: "Luminary Store",
    bg: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1800&q=80&auto=format&fit=crop",
    stats: [
      { value: "40%",   label: "FASTER LOAD TIME" },
      { value: "2.4k",  label: "ACTIVE USERS"     },
      { value: "Next.js", label: "TECH STACK"     },
    ],
    quote: "ระบบ e-commerce ที่ต้องรองรับ traffic spike ช่วงเซลล์ — ออกแบบ caching strategy ใหม่ทั้งหมด",
    sub: "Personal Project · 2025",
    accent: "#F04E00",
  },
  {
    id: 2,
    category: "MOBILE APP",
    title: "Serene Wellness",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80&auto=format&fit=crop",
    stats: [
      { value: "4.8★",  label: "APP STORE RATING" },
      { value: "500+",  label: "DAILY USERS"       },
      { value: "React Native", label: "STACK"      },
    ],
    quote: "แอป meditation ที่ต้องทำงาน offline ได้ — challenge คือ sync state กลับมาเมื่อ reconnect",
    sub: "Side Project · 2024",
    accent: "#0085FF",
  },
  {
    id: 3,
    category: "PHOTOGRAPHY",
    title: "Urban Frames",
    bg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&auto=format&fit=crop",
    stats: [
      { value: "200+",  label: "SHOTS TAKEN"       },
      { value: "35mm",  label: "FILM FORMAT"       },
      { value: "BKK",   label: "LOCATION"          },
    ],
    quote: "ถ่ายภาพ street photography ในกรุงเทพ — หาแสง หามุม หาช่วงเวลาที่ใช่",
    sub: "Hobby · Ongoing",
    accent: "#FFE600",
  },
  {
    id: 4,
    category: "OPEN SOURCE",
    title: "Forge UI",
    bg: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1800&q=80&auto=format&fit=crop",
    stats: [
      { value: "48",    label: "COMPONENTS"        },
      { value: "1.2k",  label: "GITHUB STARS"      },
      { value: "MIT",   label: "LICENSE"           },
    ],
    quote: "Design system ที่เริ่มจาก internal tool แล้วกลายเป็น open source — เพราะคนขอมา",
    sub: "Open Source · 2024",
    accent: "#10b981",
  },
  {
    id: 5,
    category: "HOBBY",
    title: "Coffee Diaries",
    bg: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80&auto=format&fit=crop",
    stats: [
      { value: "∞",     label: "CUPS CONSUMED"     },
      { value: "12",    label: "ROASTERS VISITED"  },
      { value: "V60",   label: "BREW METHOD"       },
    ],
    quote: "ชอบ specialty coffee มากพอที่จะไปเยี่ยม roastery ทุกที่ที่ไปเที่ยว — ยังไม่หยุด",
    sub: "Personal · Ongoing",
    accent: "#a16207",
  },
] as const;

/* ── isLight helper ───────────────────────────────────────── */
function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

/* ── Slide background ─────────────────────────────────────── */
function SlideBg({ slide, direction }: { slide: (typeof slides)[number]; direction: number }) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, scale: 1.04, x: direction * 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98, x: direction * -40 }}
      transition={{ duration: 0.7, ease }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Image
        src={slide.bg}
        alt={slide.title}
        fill
        style={{ objectFit: "cover", filter: "brightness(0.28) contrast(1.1)" }}
        priority
      />
      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)",
      }} />
    </motion.div>
  );
}

/* ── Stats card ───────────────────────────────────────────── */
function StatsCard({ slide }: { slide: (typeof slides)[number] }) {
  const light = isLight(slide.accent);
  return (
    <motion.div
      key={slide.id + "-card"}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.5, ease, delay: 0.1 }}
      style={{
        background: "rgba(10,10,10,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        overflow: "hidden",
        minWidth: "320px",
      }}
    >
      {/* Card header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", letterSpacing: "0.1em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
        }}>
          {slide.category}
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px", fontWeight: 700,
          letterSpacing: "0.06em",
          color: slide.accent,
        }}>
          {slide.title}
        </span>
      </div>

      {/* Stats rows */}
      {slide.stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "14px 20px",
            borderBottom: i < slide.stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            lineHeight: 1,
          }}>
            {s.value}
          </span>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1.4,
          }}>
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function CaseStudySlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, -1);
  }, [current, total, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % total, 1);
  }, [current, total, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const slide = slides[current];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Background ──────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <SlideBg key={slide.id} slide={slide} direction={direction} />
      </AnimatePresence>

      {/* ── Slide counter top-right ──────────────────────────── */}
      <div style={{
        position: "absolute", top: "32px", right: "48px",
        display: "flex", gap: "12px", zIndex: 10,
      }}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px", letterSpacing: "0.08em",
              background: i === current ? "#fff" : "transparent",
              color: i === current ? "#000" : "rgba(255,255,255,0.3)",
              border: "1px solid",
              borderColor: i === current ? "#fff" : "rgba(255,255,255,0.2)",
              borderRadius: "2px",
              padding: "4px 9px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* ── Category eyeline top-left ────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-cat"}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.4, ease }}
          style={{
            position: "absolute", top: "32px", left: "48px", zIndex: 10,
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px", letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: slide.accent,
          }}
        >
          {slide.category}
        </motion.div>
      </AnimatePresence>

      {/* ── Main content layout ──────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 48px",
        gap: "48px",
      }}>
        {/* Left — headline */}
        <div>
          <AnimatePresence mode="wait">
            <motion.h2
              key={slide.id + "-title"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#fff",
              }}
            >
              {slide.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Center — stats card */}
        <div style={{ flexShrink: 0 }}>
          <AnimatePresence mode="wait">
            <StatsCard key={slide.id} slide={slide} />
          </AnimatePresence>
        </div>

        {/* Right — empty, balanced */}
        <div />
      </div>

      {/* ── Quote bottom-left ────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: "48px", left: "48px",
        zIndex: 10, maxWidth: "480px",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-quote"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
          >
            <p style={{
              fontSize: "16px", fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              marginBottom: "12px",
            }}>
              "{slide.quote}"
            </p>
            <p style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── View project bottom-right ────────────────────────── */}
      <div style={{
        position: "absolute", bottom: "48px", right: "48px", zIndex: 10,
      }}>
        <AnimatePresence mode="wait">
          <motion.a
            key={slide.id + "-cta"}
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "99px",
              padding: "10px 20px",
              display: "inline-block",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = slide.accent;
              e.currentTarget.style.color = slide.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            VIEW PROJECT →
          </motion.a>
        </AnimatePresence>
      </div>

      {/* ── Prev / Next arrow buttons ────────────────────────── */}
      {[{ fn: prev, label: "←", side: "left" }, { fn: next, label: "→", side: "right" }].map(({ fn, label, side }) => (
        <button
          key={side}
          onClick={fn}
          style={{
            position: "absolute",
            top: "50%", transform: "translateY(-50%)",
            [side]: "20px",
            zIndex: 10,
            width: "44px", height: "44px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "2px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          {label}
        </button>
      ))}

      {/* ── Progress bar bottom ──────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "2px", background: "rgba(255,255,255,0.08)", zIndex: 10,
      }}>
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: paused ? 0 : 5, ease: "linear" }}
          style={{ height: "100%", background: slide.accent }}
        />
      </div>
    </section>
  );
}
