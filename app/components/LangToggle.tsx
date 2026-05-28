"use client";

import { useTranslation } from "react-i18next";
import { setLang } from "../lib/i18n";

export default function LangToggle({ onHero = false }: { onHero?: boolean }) {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const color  = onHero ? "rgba(255,255,255,0.7)"  : "var(--text-mid)";
  const border = onHero ? "rgba(255,255,255,0.2)"  : "var(--hairline)";

  function toggle() {
    setLang(current === "th" ? "en" : "th");
  }

  return (
    <button
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px",
        letterSpacing: "0.08em",
        color,
        background: "transparent",
        border: `1px solid ${border}`,
        borderRadius: "2px",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = onHero ? "#fff" : "var(--text-high)";
        e.currentTarget.style.borderColor = onHero ? "#fff" : "var(--text-high)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.borderColor = border;
      }}
    >
      <span style={{ opacity: current === "th" ? 1 : 0.4 }}>TH</span>
      <span style={{ opacity: 0.3 }}>/</span>
      <span style={{ opacity: current === "en" ? 1 : 0.4 }}>EN</span>
    </button>
  );
}
