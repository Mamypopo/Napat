"use client";

import { useTranslation } from "react-i18next";
import { setLang } from "../lib/i18n";

export default function LangToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

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
        color: "var(--text-mid)",
        background: "transparent",
        border: "1px solid var(--hairline)",
        borderRadius: "2px",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text-high)";
        e.currentTarget.style.borderColor = "var(--text-high)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-mid)";
        e.currentTarget.style.borderColor = "var(--hairline)";
      }}
    >
      <span style={{ opacity: current === "th" ? 1 : 0.4 }}>TH</span>
      <span style={{ opacity: 0.3 }}>/</span>
      <span style={{ opacity: current === "en" ? 1 : 0.4 }}>EN</span>
    </button>
  );
}
