"use client";

import { FaInstagram, FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useIsMobile } from "../hooks/useMediaQuery";

const socials = [
  { icon: FaLinkedin,  label: "LinkedIn",  href: "#" },
  { icon: FaGithub,    label: "GitHub",    href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaDiscord,   label: "Discord",   href: "#" },
  { icon: FaFacebook,  label: "Facebook",  href: "#" },
];

export default function Footer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <footer style={{
        borderTop: "1px solid var(--hairline)",
        background: "var(--bg)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        {/* Socials */}
        <nav style={{ display: "flex", gap: "4px" }}>
          {socials.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", color: "var(--text-muted)", textDecoration: "none" }}>
              <Icon size={15} />
            </a>
          ))}
        </nav>
        {/* Status dot only */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            © Napat 2026
          </span>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Footer bar */}
      <footer
        style={{
          borderTop: "1px solid var(--hairline)",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "stretch",
          background: "var(--bg)",
          minHeight: "56px",
        }}
      >
        {/* Left — label + social icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", borderRight: "1px solid var(--hairline)" }}>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}>
            Keep in touch
          </span>
          <nav style={{ display: "flex", gap: "4px" }}>
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "32px", height: "32px",
                  borderRadius: "2px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#553F83"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                <Icon size={15} />
              </a>
            ))}
          </nav>
        </div>

        {/* Center — copyright */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "0 32px",
          borderRight: "1px solid var(--hairline)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px", letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}>
            © Napat 2026
          </span>
        </div>

        {/* Right — status badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "16px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid var(--hairline)",
            borderRadius: "99px",
            padding: "5px 14px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34,197,94,0.6)",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "9px", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}>
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
