"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const CELL = 9;
const GAP = 2;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["M","","W","","F","",""];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

function generateCommitData(): number[] {
  const rand = seededRandom(2024);
  const days = 371;
  const data: number[] = new Array(days).fill(0);

  for (let i = 0; i < days; i++) {
    const isWeekend = i % 7 >= 5;
    let base = 0;
    if (i < 30) {
      if (rand() > 0.75) base = Math.floor(rand() * 2) + 1;
    } else if (i < 90) {
      if (rand() > 0.5) base = Math.floor(rand() * 4) + 1;
    } else {
      if (rand() > 0.32) base = Math.floor(rand() * 7) + 1;
    }
    data[i] = isWeekend ? Math.floor(base * 0.45) : base;
  }

  // Peak sprints — simulate project launches
  for (const start of [100, 148, 200, 252, 308, 350]) {
    for (let i = start; i < start + 12 && i < days; i++) {
      data[i] = Math.min(12, Math.floor(rand() * 5) + 8);
    }
  }

  return data;
}

const COMMIT_DATA = generateCommitData();

const PROJECT_PEAKS: { week: number; label: string }[] = [
  { week: 15, label: "LAB MODULE" },
  { week: 22, label: "HIS QUEUE" },
  { week: 29, label: "QR-GEN" },
  { week: 37, label: "PHARMACY" },
  { week: 45, label: "DASHBOARD" },
];

function getColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.06)";
  if (count <= 2)  return "rgba(0,133,255,0.25)";
  if (count <= 5)  return "rgba(0,133,255,0.5)";
  if (count <= 8)  return "rgba(0,133,255,0.75)";
  return "#0085FF";
}

type CalendarDay = { contributionCount: number; date: string };
type CalendarWeek = { contributionDays: CalendarDay[] };
type CalendarData = { totalContributions: number; weeks: CalendarWeek[] };

export default function GitHeatmap() {
  const [hovered, setHovered] = useState<{ index: number; rect: DOMRect } | null>(null);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((data: CalendarData) => { if (data.weeks) setCalendar(data); })
      .catch(() => {});
  }, []);

  const year = calendar?.weeks[0]?.contributionDays[0]?.date
    ? new Date(calendar.weeks[0].contributionDays[0].date).getFullYear()
    : new Date().getFullYear();

  const commitData = useMemo(() => {
    if (!calendar) return COMMIT_DATA;
    return calendar.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount));
  }, [calendar]);

  const weeks = useMemo(() => {
    if (calendar) return calendar.weeks.map((w) => w.contributionDays.map((d) => d.contributionCount));
    const result: number[][] = [];
    for (let w = 0; w < 53; w++) result.push(commitData.slice(w * 7, w * 7 + 7));
    return result;
  }, [calendar, commitData]);

  const total = calendar?.totalContributions ?? commitData.reduce((a, b) => a + b, 0);
  const activeDays = commitData.filter((d) => d > 0).length;
  let maxStreak = 0, streak = 0;
  for (const d of commitData) {
    if (d > 0) { streak++; maxStreak = Math.max(maxStreak, streak); }
    else streak = 0;
  }

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    if (calendar) {
      calendar.weeks.forEach((week, wi) => {
        const date = week.contributionDays[0]?.date;
        if (!date) return;
        const m = new Date(date).getMonth();
        if (m !== lastMonth) { labels.push({ label: MONTHS[m], col: wi }); lastMonth = m; }
      });
    } else {
      const start = new Date(year, 0, 1);
      for (let w = 0; w < 53; w++) {
        const d = new Date(start);
        d.setDate(d.getDate() + w * 7);
        if (d.getMonth() !== lastMonth) {
          labels.push({ label: MONTHS[d.getMonth()], col: w });
          lastMonth = d.getMonth();
        }
      }
    }
    return labels;
  }, [calendar, year]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>COMMIT ACTIVITY</span>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>
          YEAR: <span style={{ background: "#fff", color: "#0085FF", padding: "2px 8px", borderRadius: "2px" }}>{year}</span>
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden", minHeight: 0 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, flexShrink: 0 }}>
          {[
            { label: "COMMITS", value: total },
            { label: "ACTIVE DAYS", value: activeDays },
            { label: "LONGEST STREAK", value: `${maxStreak}d` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "2px", padding: "10px 12px",
            }}>
              <p style={{ ...MONO, fontSize: "7px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
              <p style={{ ...MONO, fontSize: "15px", fontWeight: 700, color: "#fff" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Heatmap card */}
        <div style={{
          flex: 1, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "2px", padding: "12px 14px",
          display: "flex", flexDirection: "column", gap: 8, overflow: "hidden", minHeight: 0,
        }}>
          <p style={{ ...MONO, fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", flexShrink: 0 }}>
            JAN {year} — DEC {year} {!calendar && "· MOCK DATA"}
          </p>

          <div style={{ overflowX: "auto", overflowY: "hidden", flex: 1 }}>
            <div style={{ display: "flex", gap: GAP }}>
              {/* Day labels */}
              <div style={{ display: "flex", flexDirection: "column", gap: GAP, paddingTop: 22, flexShrink: 0 }}>
                {DAY_LABELS.map((d, i) => (
                  <div key={i} style={{ height: CELL, ...MONO, fontSize: "7px", color: "rgba(255,255,255,0.2)", lineHeight: `${CELL}px`, width: 8 }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Weeks grid */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                {/* Month labels */}
                <div style={{ position: "relative", height: 14, marginBottom: 4 }}>
                  {monthLabels.map(({ label, col }) => (
                    <span key={col} style={{
                      position: "absolute", left: col * (CELL + GAP),
                      ...MONO, fontSize: "7px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap",
                    }}>{label}</span>
                  ))}
                </div>

                {/* Project peak labels */}
                <div style={{ position: "relative", height: 10, marginBottom: 3 }}>
                  {PROJECT_PEAKS.map(({ week, label }) => (
                    <span key={label} style={{
                      position: "absolute", left: week * (CELL + GAP),
                      ...MONO, fontSize: "6px", color: "#0085FF", whiteSpace: "nowrap", letterSpacing: "0.06em",
                    }}>↑ {label}</span>
                  ))}
                </div>

                {/* Cells */}
                <div style={{ display: "flex", gap: GAP }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                      {week.map((count, di) => {
                        const idx = wi * 7 + di;
                        return (
                          <div
                            key={di}
                            onMouseEnter={(e) => setHovered({ index: idx, rect: e.currentTarget.getBoundingClientRect() })}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                              width: CELL, height: CELL, borderRadius: "1px",
                              background: getColor(count),
                              cursor: count > 0 ? "default" : "default",
                              transition: "opacity 0.1s",
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ ...MONO, fontSize: "7px", color: "rgba(255,255,255,0.2)" }}>Less</span>
            {[0, 2, 5, 8, 12].map((v) => (
              <div key={v} style={{ width: CELL, height: CELL, borderRadius: "1px", background: getColor(v) }} />
            ))}
            <span style={{ ...MONO, fontSize: "7px", color: "rgba(255,255,255,0.2)" }}>More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hovered !== null && (() => {
        const flatDays = calendar ? calendar.weeks.flatMap((w) => w.contributionDays) : null;
        const dateStr = flatDays?.[hovered.index]?.date;
        const d = dateStr ? new Date(dateStr) : (() => { const x = new Date(year, 0, 1); x.setDate(x.getDate() + hovered.index); return x; })();
        const count = commitData[hovered.index] ?? 0;
        return (
          <div style={{
            position: "fixed",
            left: hovered.rect.left + CELL / 2,
            top: hovered.rect.top - 30,
            transform: "translateX(-50%)",
            background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "3px", padding: "3px 8px",
            ...MONO, fontSize: "9px", color: "#fff",
            pointerEvents: "none", zIndex: 9999,
            whiteSpace: "nowrap",
          }}>
            {d.toLocaleDateString("th-TH", { day: "numeric", month: "short" })} · {count} commit{count !== 1 ? "s" : ""}
          </div>
        );
      })()}

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
          STATUS: <span style={{ background: "#fff", color: "#0085FF", padding: "2px 8px", borderRadius: "2px" }}>ACTIVE</span>
        </span>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>GITHUB ACTIVITY →</span>
      </div>
    </motion.div>
  );
}
