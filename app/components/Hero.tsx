"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "../hooks/useMediaQuery";
import { TextScramble } from "./TextScramble";
import type { SiteSettings } from "../lib/sanity";

const ease = [0.22, 1, 0.36, 1] as const;

function TextReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", lineHeight: "inherit", verticalAlign: "bottom" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function MagneticButton({
  href, children, style, onMouseEnter, onMouseLeave,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }

  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    x.set(0);
    y.set(0);
    onMouseLeave?.(e);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </motion.a>
  );
}

export default function Hero({ settings }: { settings?: SiteSettings | null }) {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ["0%", "-20%"]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Full-bleed background image with parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          bottom: "-25%",
          zIndex: 0,
          y: bgY,
        }}
      >
        <Image
          src={settings?.heroImage ?? "https://images.unsplash.com/photo-1776231972021-49d6b6152156?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Hero background"
          fill
          priority
          unoptimized={!!settings?.heroImage}
          style={{
            objectFit: "cover",
            filter: "brightness(0.22) contrast(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.7) 60%, rgba(17,17,17,1) 100%)",
          }}
        />
      </motion.div>

      {/* Radial purple glow top-left */}
      {/* <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(85,63,131,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      /> */}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "0 24px 56px" : "0 64px 80px",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        {/* Eyeline */}
        <motion.p
          className="eyeline"
          style={{ marginBottom: "24px", color: "rgba(255,255,255,0.5)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <TextScramble
            text={[settings?.jobTitle, settings?.location, new Date().getFullYear().toString()].filter(Boolean).join(" · ") || "Full-Stack Developer · Bangkok · 2026"}
            delay={0.5}
          />
        </motion.p>

        {/* Display heading — text reveal per line */}
        <h1
          style={{
            fontSize: "clamp(64px, 10vw, 120px)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            marginBottom: "40px",
          }}
        >
          <TextReveal delay={0.2}>Ship</TextReveal><br />
          <TextReveal delay={0.35}>Software</TextReveal><br />
          <TextReveal delay={0.5}>
            <span style={{ color: "#553F83" }}>Peace</span>fully.
          </TextReveal>
        </h1>

        {/* Sub + CTA row */}
        <motion.div
          style={{ display: "flex", alignItems: "flex-end", gap: "64px", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.7 }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "400px",
            }}
          >
            {settings?.heroTagline ?? settings?.bio ?? "ผมสร้าง digital products ที่ทั้งสวยงาม แม่นยำ และมีประสิทธิภาพสูง — จาก interface จนถึง infrastructure"}
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            {isMobile ? (
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "#553F83",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "1px solid #553F83",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                ดูผลงาน
              </a>
            ) : (
              <MagneticButton
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "#553F83",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "1px solid #553F83",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#6b52a3";
                  e.currentTarget.style.borderColor = "#6b52a3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#553F83";
                  e.currentTarget.style.borderColor = "#553F83";
                }}
              >
                ดูผลงาน
              </MagneticButton>
            )}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                background: "transparent",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 400,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#553F83")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              ติดต่อ
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--hairline)",
          zIndex: 3,
        }}
      />
    </section>
  );
}
