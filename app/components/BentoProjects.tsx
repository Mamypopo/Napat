"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    eyeline: "E-Commerce · 2025",
    title: "Luminary Store Platform",
    desc: "ระบบ e-commerce ครบวงจร multi-vendor รองรับ real-time inventory และ analytics dashboard",
    tags: ["Next.js", "TypeScript", "Stripe", "Postgres"],
    img: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=900&q=80&auto=format&fit=crop",
    span: 7,
    featured: true,
  },
  {
    id: 2,
    eyeline: "SaaS · 2025",
    title: "Apex Analytics",
    desc: "Dashboard วิเคราะห์ข้อมูลธุรกิจ real-time พร้อม customizable widgets",
    tags: ["React", "D3.js", "FastAPI"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    span: 5,
    featured: false,
  },
  {
    id: 3,
    eyeline: "Mobile · 2024",
    title: "Serene — Wellness App",
    desc: "แอปดูแลสุขภาพจิต มี guided meditation และ mood tracking",
    tags: ["React Native", "Expo", "Firebase"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format&fit=crop",
    span: 4,
    featured: false,
  },
  {
    id: 4,
    eyeline: "Design System · 2024",
    title: "Forge UI — Component Library",
    desc: "Design token system และ component library สำหรับทีม product ขนาดใหญ่ พร้อม Storybook + Figma sync",
    tags: ["TypeScript", "Radix UI", "Tailwind", "Storybook"],
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1000&q=80&auto=format&fit=crop",
    span: 8,
    featured: false,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function BentoCell({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cellRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--sx", `${x}%`);
    e.currentTarget.style.setProperty("--sy", `${y}%`);
  }

  return (
    <motion.div
      ref={cellRef}
      className="spotlight-cell"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      style={{
        gridColumn: `span ${project.span}`,
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
        borderRight: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
        cursor: "pointer",
      }}
    >
      {/* Media strip */}
      <div
        style={{
          width: "100%",
          aspectRatio: project.featured ? "16/8" : "16/9",
          overflow: "hidden",
          borderBottom: "1px solid var(--hairline)",
          position: "relative",
        }}
      >
        <Image
          src={project.img}
          alt={project.title}
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
        />
      </div>

      {/* Body */}
      <div style={{ padding: "28px 32px 32px", position: "relative", zIndex: 3 }}>
        <p className="eyeline" style={{ marginBottom: "10px" }}>{project.eyeline}</p>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--text-high)",
            marginBottom: "8px",
          }}
        >
          {project.title}
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>
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
      </div>
    </motion.div>
  );
}

export default function BentoProjects() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="work" style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          padding: "80px 64px 0",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingBottom: "24px",
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

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            textDecoration: "none",
            border: "1px solid var(--hairline)",
            borderRadius: "2px",
            padding: "8px 16px",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#553F83";
            e.currentTarget.style.borderColor = "#553F83";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--hairline)";
          }}
        >
          View All →
        </motion.a>
      </div>

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          borderLeft: "1px solid var(--hairline)",
          borderRight: "1px solid var(--hairline)",
        }}
      >
        {projects.map((project, i) => (
          <BentoCell key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
