"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useIsMobile } from "../hooks/useMediaQuery";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

const NAV_LINKS = [
  { href: "#work",    label: "ผลงาน"   },
  { href: "#about",   label: "เกี่ยวกับ" },
  { href: "#contact", label: "ติดต่อ"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark]     = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains("light"));
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.classList.contains("light") ? "dark" : "light";
    html.classList.remove("light", "dark");
    html.classList.add(next);
    localStorage.setItem("theme", next);
    setIsDark(next === "dark");
  }

  // When transparent (top of page), Hero behind is always dark — force white
  const onHero = !scrolled && !menuOpen;
  const iconColor    = onHero ? "rgba(255,255,255,0.7)"  : "var(--text-muted)";
  const iconBorder   = onHero ? "rgba(255,255,255,0.2)"  : "var(--hairline)";
  const linkColor    = onHero ? "rgba(255,255,255,0.75)" : "var(--text-muted)";
  const linkHover    = onHero ? "#fff"                    : "var(--text-high)";

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "0 20px" : "0 48px",
    background: scrolled || menuOpen ? "var(--scrim)" : "transparent",
    backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
    WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
    borderBottom: scrolled || menuOpen ? "1px solid var(--hairline)" : "1px solid transparent",
    transition: "background 0.3s ease, border-color 0.3s ease",
  };

  const logo = (
    <span style={{ ...MONO, fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#553F83" }}>
      NP.dev
    </span>
  );

  const themeBtn = (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: "36px", height: "36px",
        border: `1px solid ${iconBorder}`,
        background: "transparent", borderRadius: "2px",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        color: iconColor, transition: "border-color 0.2s, color 0.2s", flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#553F83"; e.currentTarget.style.color = "#553F83"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = iconBorder; e.currentTarget.style.color = iconColor; }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );

  /* ── Mobile ─────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <header style={headerStyle}>
          {logo}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              width: "36px", height: "36px",
              background: "transparent",
              border: `1px solid ${iconBorder}`,
              borderRadius: "2px", cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "5px",
            }}
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <>
                <span style={{ width: "16px", height: "1.5px", background: iconColor, display: "block", borderRadius: "1px" }} />
                <span style={{ width: "16px", height: "1.5px", background: iconColor, display: "block", borderRadius: "1px" }} />
                <span style={{ width: "16px", height: "1.5px", background: iconColor, display: "block", borderRadius: "1px" }} />
              </>
            )}
          </button>
        </header>

        {menuOpen && (
          <div style={{
            position: "fixed", top: "56px", left: 0, right: 0,
            zIndex: 99,
            background: "var(--scrim)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--hairline)",
            padding: "8px 0 16px",
          }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  fontSize: "16px", fontWeight: 400,
                  color: "var(--text-high)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--hairline)",
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {isDark ? "Dark mode" : "Light mode"}
              </span>
              {themeBtn}
            </div>
          </div>
        )}
      </>
    );
  }

  /* ── Desktop ────────────────────────────────────────────────── */
  return (
    <header style={headerStyle}>
      {logo}
      <nav style={{ display: "flex", gap: "32px" }}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ fontSize: "15px", fontWeight: 400, color: linkColor, textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
          >
            {label}
          </Link>
        ))}
      </nav>
      {themeBtn}
    </header>
  );
}
