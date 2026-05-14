"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useMediaQuery";
import type { Project } from "../../lib/projects";
import { imgWithFallback } from "../../lib/sanity";

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 20, right: 20,
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff", borderRadius: "2px", padding: "6px 14px",
        fontFamily: "var(--font-mono), monospace", fontSize: "11px",
        letterSpacing: "0.08em", cursor: "pointer", zIndex: 10,
      }}>ESC</button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-mono), monospace", fontSize: "11px",
        color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
      }}>
        {current + 1} / {images.length}
      </div>

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { setTouchStartX(e.touches[0].clientX); }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          if (dx < -50) setCurrent((c) => (c + 1) % images.length);
          else if (dx > 50) setCurrent((c) => (c - 1 + images.length) % images.length);
        }}
        style={{
          position: "relative", width: "90vw", maxWidth: "1200px",
          height: "80vh", borderRadius: "4px", overflow: "hidden",
        }}
      >
        <Image src={images[current]} alt={`Screenshot ${current + 1}`} fill style={{ objectFit: "contain" }} unoptimized />
      </motion.div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 44, height: 44, borderRadius: "2px", fontSize: "18px", cursor: "pointer" }}
          >←</button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
            style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 44, height: 44, borderRadius: "2px", fontSize: "18px", cursor: "pointer" }}
          >→</button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "8px", padding: "8px",
          background: "rgba(0,0,0,0.5)", borderRadius: "4px",
        }}>
          {images.map((src, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              style={{
                position: "relative", width: 56, height: 38, borderRadius: "2px",
                overflow: "hidden", cursor: "pointer", flexShrink: 0,
                border: `1px solid ${i === current ? "#553F83" : "rgba(255,255,255,0.15)"}`,
                opacity: i === current ? 1 : 0.5, transition: "all 0.15s",
              }}
            >
              <Image src={src} alt={`thumb ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function GalleryThumb({ src, name, index, onClick }: { src: string; name: string; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "16/9",
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid var(--hairline)",
        cursor: "zoom-in",
      }}
    >
      <Image
        src={src}
        alt={`${name} screenshot ${index + 1}`}
        fill
        style={{ objectFit: "cover", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s ease" }}
        unoptimized
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0)",
        transition: "background 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {hovered && (
          <span style={{
            fontFamily: "var(--font-mono), monospace", fontSize: "10px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#fff", background: "rgba(0,0,0,0.6)",
            padding: "6px 14px", borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            View
          </span>
        )}
      </div>
    </div>
  );
}

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero image */}
      <div style={{ position: "relative", height: isMobile ? "45vw" : "55vh", minHeight: isMobile ? "220px" : "320px", overflow: "hidden" }}>
        <Image
          src={imgWithFallback(project.img, project.name)}
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

          {/* Outcome */}
          {project.outcome && (
            <motion.div {...fadeUp(0.17)} style={{ marginBottom: "48px" }}>
              <p style={{ ...MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#553F83", marginBottom: "12px" }}>
                Impact / Outcome
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.75 }}>{project.outcome}</p>
            </motion.div>
          )}

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <motion.div {...fadeUp(0.18)} style={{ marginBottom: "48px" }}>
              <p className="eyeline" style={{ marginBottom: "20px" }}>Gallery</p>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "10px",
              }}>
                {project.images.map((src, i) => (
                  <GalleryThumb key={i} src={src} name={project.name} index={i} onClick={() => setLightboxIndex(i)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Modules */}
          {project.modules && (
            <motion.div {...fadeUp(0.2)}>
              <p className="eyeline" style={{ marginBottom: "20px" }}>Modules</p>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--hairline)" }}>
                {project.modules.filter((mod) => mod != null).map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid var(--hairline)",
                      display: "flex", alignItems: "flex-start", gap: "16px",
                    }}
                  >
                    <span style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)", minWidth: "24px", paddingTop: "2px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)", display: "block" }}>
                        {mod.name}
                      </span>
                      {mod.desc && (
                        <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginTop: "4px", display: "block" }}>
                          {mod.desc}
                        </span>
                      )}
                    </div>
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
            {project.teamSize && (
              <div>
                <p className="eyeline" style={{ marginBottom: "8px" }}>Team Size</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.teamSize}</p>
              </div>
            )}
            <div>
              <p className="eyeline" style={{ marginBottom: "8px" }}>Year</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.year}</p>
            </div>
            {project.duration && (
              <div>
                <p className="eyeline" style={{ marginBottom: "8px" }}>Duration</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.duration}</p>
              </div>
            )}
            {project.scale && (
              <div>
                <p className="eyeline" style={{ marginBottom: "8px" }}>Scale</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>{project.scale}</p>
              </div>
            )}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && project.images && (
          <Lightbox
            images={project.images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

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
