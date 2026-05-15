"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../lib/projects";
import { imgWithFallback } from "../lib/sanity";
import { useIsMobile } from "../hooks/useMediaQuery";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Project modal — Classic Split ─────────────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const allImages = project.images && project.images.length > 0 ? project.images : [project.img].filter(Boolean) as string[];
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(10px)",
          zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--hairline)",
            borderRadius: "4px",
            width: "100%",
            maxWidth: isMobile ? "100%" : "900px",
            maxHeight: "90vh",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
        >
          {/* ── Left: Image + thumbnails ── */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: isMobile ? "none" : "1px solid var(--hairline)", borderBottom: isMobile ? "1px solid var(--hairline)" : "none" }}>
            {/* Main image */}
            <div
              style={{ position: "relative", flex: 1, minHeight: isMobile ? "220px" : "300px", cursor: "zoom-in", overflow: "hidden" }}
              onClick={() => setLightbox(true)}
            >
              <Image
                src={imgWithFallback(allImages[activeImg], project.name)}
                alt={project.name}
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                unoptimized
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)",
                pointerEvents: "none",
              }} />
              {allImages.length > 1 && (
                <span style={{
                  position: "absolute", bottom: 10, right: 10,
                  fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.08em",
                  background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.7)",
                  padding: "3px 8px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.12)",
                }}>
                  {activeImg + 1} / {allImages.length}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{
                display: "flex", gap: "1px",
                borderTop: "1px solid var(--hairline)",
                background: "var(--hairline)",
                flexShrink: 0,
              }}>
                {allImages.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      position: "relative", flex: 1, height: "60px",
                      cursor: "pointer", overflow: "hidden",
                      background: "var(--surface)",
                      outline: i === activeImg ? "2px solid #553F83" : "none",
                      outlineOffset: "-2px",
                      transition: "opacity 0.15s",
                      opacity: i === activeImg ? 1 : 0.55,
                    }}
                  >
                    <Image src={src} alt={`thumb ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div style={{ padding: "32px 32px 32px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                alignSelf: "flex-end", marginBottom: "20px",
                background: "transparent", border: "1px solid var(--hairline)",
                borderRadius: "2px", color: "var(--text-subtle)",
                cursor: "pointer", fontFamily: "var(--font-mono), monospace",
                fontSize: "10px", padding: "4px 10px", letterSpacing: "0.06em",
              }}
            >
              ESC
            </button>

            <p className="eyeline" style={{ marginBottom: "6px" }}>
              {[project.category, project.year].filter(Boolean).join(" · ")}
            </p>
            <h3 style={{
              fontSize: "24px", fontWeight: 700, letterSpacing: "-0.03em",
              color: "var(--text-high)", marginBottom: "16px", lineHeight: 1.2,
            }}>
              {project.name}
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "24px" }}>
              {project.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "auto" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono), monospace", fontSize: "9px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "4px 10px", border: "1px solid var(--hairline)",
                  borderRadius: "2px", background: "var(--badge)", color: "var(--text-muted)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "28px" }}>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "10px 20px", background: "#553F83", color: "#fff",
                    fontSize: "12px", fontWeight: 600, borderRadius: "2px",
                    textDecoration: "none", fontFamily: "var(--font-mono), monospace",
                    letterSpacing: "0.06em",
                  }}
                >
                  Visit →
                </a>
              )}
              {project.slug && (
                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "10px 20px",
                    background: "transparent", border: "1px solid var(--hairline)",
                    color: "var(--text-mid)", fontSize: "12px", fontWeight: 500,
                    borderRadius: "2px", textDecoration: "none",
                    fontFamily: "var(--font-mono), monospace", letterSpacing: "0.06em",
                  }}
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "zoom-out",
            }}
          >
            <div style={{ position: "relative", width: "90vw", height: "85vh" }}>
              <Image
                src={imgWithFallback(allImages[activeImg], project.name)}
                alt={project.name}
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Bento cell ────────────────────────────────────────────── */

function BentoCell({
  project,
  index,
  onOpenModal,
  isMobile,
}: {
  project: Project;
  index: number;
  onOpenModal: (p: Project) => void;
  isMobile: boolean;
}) {
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--sx", `${x}%`);
    e.currentTarget.style.setProperty("--sy", `${y}%`);
  }

  const isLarge = project.type === "case-study";

  const inner = (
    <motion.div
      className="spotlight-cell"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
        borderRight: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
        cursor: "pointer",
        height: "100%",
      }}
    >
      {/* Media strip */}
      <div
        style={{
          width: "100%",
          aspectRatio: isLarge ? "16/7" : "16/9",
          overflow: "hidden",
          borderBottom: "1px solid var(--hairline)",
          position: "relative",
        }}
      >
        <Image
          src={imgWithFallback(project.img, project.name)}
          alt={project.name}
          fill
          style={{
            objectFit: "cover",
            filter: "brightness(0.82) contrast(1.08)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.filter = "brightness(0.92) contrast(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "brightness(0.82) contrast(1.08)";
          }}
          unoptimized
        />
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px 24px", position: "relative", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p className="eyeline">{project.category}</p>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isLarge ? "#553F83" : "var(--text-muted)",
              border: `1px solid ${isLarge ? "#553F83" : "var(--hairline)"}`,
              borderRadius: "2px",
              padding: "2px 8px",
            }}
          >
            {isLarge ? "Case Study" : "Project"}
          </span>
        </div>
        <h3
          style={{
            fontSize: isLarge ? "18px" : "15px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--text-high)",
            marginBottom: "6px",
          }}
        >
          {project.name}
        </h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "14px" }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.tags.slice(0, isLarge ? 4 : 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "9px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 8px",
                border: "1px solid var(--hairline)",
                borderRadius: "2px",
                background: "var(--badge)",
                color: "var(--text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const colSpan = isMobile ? (isLarge ? 2 : 1) : project.span;

  if (isLarge) {
    return (
      <div style={{ gridColumn: `span ${colSpan}` }}>
        <Link
          href={`/projects/${project.slug}`}
          style={{ textDecoration: "none", display: "block", height: "100%" }}
          onClick={() => sessionStorage.setItem("scrollY", String(window.scrollY))}
        >
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ gridColumn: `span ${colSpan}` }} onClick={() => onOpenModal(project)}>
      {inner}
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────── */

export default function BentoProjects({ projects }: { projects: Project[] }) {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const [activeModal, setActiveModal] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  const large = projects.filter((p: Project) => p.type === "case-study");
  const small = projects.filter((p: Project) => p.type === "project");

  return (
    <section id="work" style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          padding: isMobile ? "40px 24px 16px" : "80px 64px 24px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: isMobile ? "flex-start" : "flex-end",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "0",
          justifyContent: "space-between",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
        >
          <p className="eyeline" style={{ marginBottom: "8px" }}>Selected Work</p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text-high)",
            }}
          >
            ผลงานที่คัดสรร
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
            {large.length} CASE STUDIES · {small.length} PROJECTS
          </span>
        </motion.div>
      </div>

      {/* Large projects */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
          borderLeft: "1px solid var(--hairline)",
          borderRight: "1px solid var(--hairline)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        {large.map((project, i) => (
          <BentoCell key={project.id} project={project} index={i} onOpenModal={setActiveModal} isMobile={isMobile} />
        ))}
      </div>

      {/* Small projects header */}
      <div
        style={{
          padding: isMobile ? "20px 24px 12px" : "32px 64px 16px",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <p className="eyeline">Side Projects</p>
      </div>

      {/* Small projects */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
          borderLeft: "1px solid var(--hairline)",
          borderRight: "1px solid var(--hairline)",
        }}
      >
        {small.map((project, i) => (
          <BentoCell key={project.id} project={project} index={i} onOpenModal={setActiveModal} isMobile={isMobile} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
