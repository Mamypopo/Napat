"use client";

const items = [
  "Next.js", "TypeScript", "React", "Node.js", "PostgreSQL",
  "Framer Motion", "Tailwind CSS", "Go", "Docker", "Vercel",
  "AWS", "Figma", "Prisma", "tRPC", "GraphQL",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderBottom: "1px solid var(--hairline)",
        borderTop: "1px solid var(--hairline)",
        overflow: "hidden",
        background: "var(--surface)",
        padding: "20px 0",
      }}
    >
      <div
        className="animate-marquee"
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "24px",
              padding: "0 32px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {item}
            <span style={{ color: "#553F83", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
