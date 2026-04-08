import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "../../lib/projects";
import BackButton from "./BackButton";

export function generateStaticParams() {
  return projects
    .filter((p) => p.type === "case-study")
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.type === "case-study");
  if (!project) notFound();

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <BackButton category={project.category} />

      {/* Hero image */}
      <div style={{ position: "relative", height: "55vh", overflow: "hidden" }}>
        <Image
          src={project.img}
          alt={project.name}
          fill
          style={{ objectFit: "cover", filter: "brightness(0.55) contrast(1.1)" }}
          priority
          unoptimized
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, var(--bg) 0%, transparent 60%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 48, left: 64, right: 64 }}>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#553F83",
              border: "1px solid #553F83",
              borderRadius: "2px",
              padding: "3px 10px",
            }}
          >
            Case Study
          </span>
          <h1
            style={{
              marginTop: "16px",
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#fff",
            }}
          >
            {project.name}
          </h1>
        </div>
      </div>

      {/* Content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        {/* Left — main content */}
        <div style={{ padding: "64px", borderRight: "1px solid var(--hairline)" }}>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "48px",
              maxWidth: "640px",
            }}
          >
            {project.desc}
          </p>

          {project.modules && (
            <>
              <p className="eyeline" style={{ marginBottom: "20px" }}>Modules</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid var(--hairline)",
                }}
              >
                {project.modules.map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid var(--hairline)",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        opacity: 0.5,
                        minWidth: "24px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right — meta */}
        <div style={{ padding: "64px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Role */}
            {project.role && (
              <div>
                <p className="eyeline" style={{ marginBottom: "8px" }}>Role</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>
                  {project.role}
                </p>
              </div>
            )}

            {/* Year */}
            <div>
              <p className="eyeline" style={{ marginBottom: "8px" }}>Year</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>
                {project.year}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <p className="eyeline" style={{ marginBottom: "12px" }}>Tech Stack</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      border: "1px solid var(--hairline)",
                      borderRadius: "2px",
                      background: "var(--badge)",
                      color: "var(--text-muted)",
                      display: "inline-block",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            {project.url && (
              <div>
                <p className="eyeline" style={{ marginBottom: "12px" }}>Live</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    padding: "10px 20px",
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
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
