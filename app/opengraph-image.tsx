import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Napat — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "-100px", left: "-100px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,78,0,0.25) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-80px", right: "-80px",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(85,63,131,0.2) 0%, transparent 70%)",
        }} />

        {/* Top — eyebrow */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#4ade80",
          }} />
          <span style={{
            fontSize: "14px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
          }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{
            fontSize: "80px", fontWeight: 700,
            letterSpacing: "-0.04em", lineHeight: 1.0,
            color: "#fff",
          }}>
            Napat
          </span>
          <span style={{
            fontSize: "80px", fontWeight: 700,
            letterSpacing: "-0.04em", lineHeight: 1.0,
            color: "#F04E00",
          }}>
            Full-Stack Dev.
          </span>
        </div>

        {/* Bottom — stack + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {["React", "Next.js", "TypeScript", "Node.js", "Go"].map((t) => (
              <div key={t} style={{
                padding: "6px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "4px",
                fontSize: "13px", color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
              }}>
                {t}
              </div>
            ))}
          </div>
          <span style={{
            fontSize: "14px", color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.06em",
          }}>
            napat.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
