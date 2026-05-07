"use client";

import { useState } from "react";

const items = [
  "Next.js", "TypeScript", "React", "Node.js", "PostgreSQL",
  "Framer Motion", "Tailwind CSS", "Go", "Docker", "Vercel",
  "AWS", "Figma", "Prisma", "tRPC", "GraphQL",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: "hidden",
        background: "#553F83",
        padding: "14px 0",
        cursor: "default",
      }}
    >
      <div
        className="animate-marquee"
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap", width: "max-content", animationPlayState: paused ? "paused" : "running" }}
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
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {item}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
