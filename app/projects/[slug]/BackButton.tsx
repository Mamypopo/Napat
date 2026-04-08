"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ category }: { category: string }) {
  const router = useRouter();

  return (
    <div
      style={{
        padding: "20px 64px",
        borderBottom: "1px solid var(--hairline)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <button
        onClick={() => router.back()}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ← Back
      </button>
      <span style={{ color: "var(--hairline)" }}>·</span>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {category}
      </span>
    </div>
  );
}
