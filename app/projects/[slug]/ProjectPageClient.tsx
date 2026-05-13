"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useMediaQuery";
import type { Project } from "../../lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease, delay },
  };
}

export default function ProjectPageClient({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
}) {
  const isMobile = useIsMobile();
  const px = isMobile ? "24px" : "64px";
  const py = isMobile ? "40px" : "64px";

  return (
    <>
      {/* Hero image */}
      <div style={{ position: "relative", height: isMobile ? "45vw" : "55vh", minHeight: isMobile ? "220px" : "320px", overflow: "hidden" }}>
        <Image
          src={project.img}
          alt={project.name}
          fill
          style={{ objectFit: "cover", filter: "brightness(0.55) contrast(1.1)" }}
          priority
          unoptimized
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, var(--bg) 0%, transparent 60%)",
        }} />
        <div style={{ position: "absolute", bottom: isMobile ? 24 : 48, left: px, right: px }}>
          <motion.span
            {...fadeUp(0.1)}
            style={{
              ...MONO, fontSize: "10px", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#553F83",
              border: "1px solid #553F83", borderRadius: "2px",
              padding: "3px 10px", display: "inline-block",
            }}
          >
            Case Study
          </motion.span>
          <motion.h1
            {...fadeUp(0.2)}
            style={{
              marginTop: "12px",
              fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(36px, 6vw, 80px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              lineHeight: 1.0, color: "#fff",
            }}
          >
            {project.name}
          </motion.h1>
        </div>
      </div>

      {/* Content grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
        borderTop: "1px solid var(--hairline)",
      }}>
        {/* Left — main content */}
        <div style={{
          padding: `${py} ${px}`,
          borderRight: isMobile ? "none" : "1px solid var(--hairline)",
          borderBottom: isMobile ? "1px solid var(--hairline)" : "none",
        }}>
          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontSize: isMobile ? "16px" : "18px",
              color: "var(--text-muted)", lineHeight: 1.8,
              marginBottom: "48px", maxWidth: "640px",
            }}
          >
            {project.desc}
          </motion.p>

          {/* Problem / Solution */}
          {(project.problem || project.solution) && (
            <motion.div {...fadeUp(0.15)} style={{ marginBottom: "48px", display: "flex", flexDirection: "column", gap: "32px" }}>
              {project.problem && (
                <div>
                  <p style={{ ...MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#553F83", marginBottom: "12px" }}>
                    Problem
                  </p>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.75 }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <p style={{ ...MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#553F83", marginBottom: "12px" }}>
                    Solution
                  </p>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.75 }}>{project.solution}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Modules */}
          {project.modules && (
            <motion.div {...fadeUp(0.2)}>
              <p className="eyeline" style={{ marginBottom: "20px" }}>Modules</p>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--hairline)" }}>
                {project.modules.map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid var(--hairline)",
                      display: "flex", alignItems: "center", gap: "16px",
                    }}
                  >
                    <span style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)", minWidth: "24px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{mod}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right — meta */}
        <motion.div {...fadeUp(0.15)} style={{ padding: isMobile ? `${py} ${px}` : `${py} 48px` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {project.role && (
              <div>
                <p className="eyeline" style={{ marginBottom: "8px" }}>Role</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.role}</p>
              </div>
            )}
            <div>
              <p className="eyeline" style={{ marginBottom: "8px" }}>Year</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.year}</p>
            </div>
            <div>
              <p className="eyeline" style={{ marginBottom: "12px" }}>Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      ...MONO, fontSize: "10px", letterSpacing: "0.08em",
                      textTransform: "uppercase", padding: "5px 12px",
                      border: "1px solid var(--hairline)", borderRadius: "2px",
                      background: "var(--badge)", color: "var(--text-muted)",
                      display: "inline-block",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {project.url && (
              <div>
                <p className="eyeline" style={{ marginBottom: "12px" }}>Live</p>
                <a
                  href={project.url}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", padding: "10px 20px",
                    background: "#553F83", color: "#fff",
                    fontSize: "13px", fontWeight: 600,
                    borderRadius: "2px", textDecoration: "none",
                  }}
                >
                  Visit →
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Next / Prev navigation */}
      {(prev || next) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
            borderTop: "1px solid var(--hairline)",
          }}
        >
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              style={{
                display: "flex", flexDirection: "column", gap: "8px",
                padding: isMobile ? "24px" : "32px 48px",
                borderRight: next ? "1px solid var(--hairline)" : "none",
                textDecoration: "none",
                transition: "background 0.2s",
                group: "prev",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                ← Previous
              </span>
              <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: 600, color: "var(--text-high)" }}>
                {prev.name}
              </span>
              <span style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)" }}>{prev.category}</span>
            </Link>
          )}
          {!prev && next && <div />}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              style={{
                display: "flex", flexDirection: "column", gap: "8px",
                padding: isMobile ? "24px" : "32px 48px",
                textDecoration: "none", textAlign: "right",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                Next →
              </span>
              <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: 600, color: "var(--text-high)" }}>
                {next.name}
              </span>
              <span style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)" }}>{next.category}</span>
            </Link>
          )}
        </motion.div>
      )}
    </>
  );
}
