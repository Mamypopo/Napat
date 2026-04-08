"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../lib/projects";
import type { Project } from "../lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Small project modal ───────────────────────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          maxWidth: "560px",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <Image
            src={project.img}
            alt={project.name}
            fill
            style={{ objectFit: "cover", filter: "brightness(0.8) contrast(1.1)" }}
            unoptimized
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "2px",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              padding: "4px 10px",
              letterSpacing: "0.06em",
            }}
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 32px" }}>
          <p className="eyeline" style={{ marginBottom: "8px" }}>{project.category}</p>
          <h3 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-high)", marginBottom: "12px" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
            {project.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
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
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                marginTop: "20px",
                padding: "8px 20px",
                background: "#553F83",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "2px",
                
                textDecoration: "none",
              }}
            >
              Visit →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Bento cell ────────────────────────────────────────────── */

function BentoCell({
  project,
  index,
  onOpenModal,
}: {
  project: Project;
  index: number;
  onOpenModal: (p: Project) => void;
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
          src={project.img}
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

  if (isLarge) {
    return (
      <div style={{ gridColumn: `span ${project.span}` }}>
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
    <div style={{ gridColumn: `span ${project.span}` }} onClick={() => onOpenModal(project)}>
      {inner}
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────── */

export default function BentoProjects() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  const large = projects.filter((p) => p.type === "case-study");
  const small = projects.filter((p) => p.type === "project");

  return (
    <section id="work" style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          padding: "80px 64px 24px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: "flex-end",
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
          gridTemplateColumns: "repeat(12, 1fr)",
          borderLeft: "1px solid var(--hairline)",
          borderRight: "1px solid var(--hairline)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        {large.map((project, i) => (
          <BentoCell key={project.id} project={project} index={i} onOpenModal={setActiveModal} />
        ))}
      </div>

      {/* Small projects header */}
      <div
        style={{
          padding: "32px 64px 16px",
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
          gridTemplateColumns: "repeat(12, 1fr)",
          borderLeft: "1px solid var(--hairline)",
          borderRight: "1px solid var(--hairline)",
        }}
      >
        {small.map((project, i) => (
          <BentoCell key={project.id} project={project} index={i} onOpenModal={setActiveModal} />
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
