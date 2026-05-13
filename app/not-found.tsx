import Link from "next/link";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100svh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
    }}>
      <div style={{ maxWidth: "480px", width: "100%" }}>
        <p style={{
          ...MONO, fontSize: "10px", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "#553F83",
          marginBottom: "24px",
        }}>
          404
        </p>

        <h1 style={{
          fontSize: "clamp(40px, 8vw, 80px)",
          fontWeight: 700, letterSpacing: "-0.04em",
          lineHeight: 1.0, color: "var(--text-high)",
          marginBottom: "20px",
        }}>
          Page not<br />found.
        </h1>

        <p style={{
          fontSize: "16px", fontWeight: 300,
          color: "var(--text-muted)", lineHeight: 1.75,
          marginBottom: "48px",
        }}>
          หน้านี้ไม่มีอยู่ หรืออาจถูกย้ายไปแล้ว
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "14px 28px",
            background: "#553F83", color: "#fff",
            fontSize: "14px", fontWeight: 600,
            ...MONO, letterSpacing: "0.06em",
            borderRadius: "2px", textDecoration: "none",
            border: "1px solid #553F83",
            transition: "background 0.2s",
          }}
        >
          ← กลับหน้าแรก
        </Link>
      </div>
    </main>
  );
}
