"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { LAB_PANELS } from "../lib/labConfig";
import type { Gender } from "../lib/labConfig";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };

function getStatus(
  val: number, low: number, high: number,
  critLow?: number, critHigh?: number
): "LL" | "L" | "N" | "H" | "HH" {
  if (critLow !== undefined && val < critLow) return "LL";
  if (critHigh !== undefined && val > critHigh) return "HH";
  if (val < low) return "L";
  if (val > high) return "H";
  return "N";
}

function getSelectStatus(val: string, normalValues: string[]): "N" | "H" {
  return normalValues.includes(val) ? "N" : "H";
}

function Brackets() {
  const s: React.CSSProperties = {
    position: "absolute", width: "22px", height: "22px",
    borderColor: "rgba(255,255,255,0.55)", borderStyle: "solid",
  };
  return (
    <>
      <span style={{ ...s, top: 0, left: 0,  borderWidth: "2px 0 0 2px" }} />
      <span style={{ ...s, top: 0, right: 0, borderWidth: "2px 2px 0 0" }} />
      <span style={{ ...s, bottom: 0, left: 0,  borderWidth: "0 0 2px 2px" }} />
      <span style={{ ...s, bottom: 0, right: 0, borderWidth: "0 2px 2px 0" }} />
    </>
  );
}

export default function LabDemoPanel() {
  const [step, setStep] = useState<"info" | "lab">("info");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [activeTab, setActiveTab] = useState("cbc");
  const [values, setValues] = useState<Record<string, string>>({});

  const canProceed = age !== "" && parseInt(age) > 0 && gender !== "";
  const ageNum = parseInt(age) || 0;
  const genderVal = gender as Gender;
  const currentPanel = LAB_PANELS.find((p) => p.id === activeTab)!;
  const items = currentPanel.items;
  const hasAnyValue = items.some((item) => values[item.key] !== undefined && values[item.key] !== "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)" }}>
          LAB MODULE · HIS
        </span>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.08em", color: "rgba(0,0,0,0.5)" }}>
          PANEL:{" "}
          <span style={{ background: "#ffffff", color: "#0a0a0a", padding: "2px 8px", borderRadius: "2px" }}>
            {step === "info" ? "INFO" : activeTab.toUpperCase()}
          </span>
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {step === "info" ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div style={{
                flex: 1, background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.10)", borderRadius: "2px",
                padding: "20px", position: "relative",
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <Brackets />
                <p style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ข้อมูลผู้ป่วย
                </p>
                {/* Age */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>อายุ (ปี)</label>
                  <input
                    type="number" value={age} onChange={(e) => setAge(e.target.value)}
                    placeholder="เช่น 35" min={1} max={120}
                    style={{
                      ...MONO, background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)", borderRadius: "2px",
                      color: "#fff", fontSize: "13px", padding: "8px 12px", outline: "none", width: "100%",
                    }}
                  />
                </div>
                {/* Gender */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>เพศ</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["M", "F"] as const).map((g) => (
                      <button key={g} onClick={() => setGender(g)} style={{
                        flex: 1, padding: "8px",
                        background: gender === g ? "#F04E00" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${gender === g ? "#F04E00" : "rgba(255,255,255,0.10)"}`,
                        borderRadius: "2px",
                        color: gender === g ? "#fff" : "rgba(255,255,255,0.45)",
                        cursor: "pointer", ...MONO, fontSize: "11px", letterSpacing: "0.06em", transition: "all 0.15s",
                      }}>
                        {g === "M" ? "ชาย" : "หญิง"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => canProceed && setStep("lab")}
                style={{
                  ...MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "12px",
                  background: canProceed ? "#ffffff" : "rgba(0,0,0,0.10)",
                  border: "none", borderRadius: "2px",
                  color: canProceed ? "#F04E00" : "rgba(0,0,0,0.30)",
                  cursor: canProceed ? "pointer" : "not-allowed", transition: "all 0.2s",
                }}
              >
                ถัดไป — กรอกผล Lab →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="lab"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}
            >
              <div style={{
                flex: 1, display: "flex", flexDirection: "column", gap: 0, overflow: "hidden",
                background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "2px",
              }}>
                {/* Sub-tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {LAB_PANELS.map((lp) => (
                    <button key={lp.id} onClick={() => { setActiveTab(lp.id); setValues({}); }} style={{
                      ...MONO, fontSize: "9px", letterSpacing: "0.08em", padding: "6px 12px",
                      background: activeTab === lp.id ? "rgba(255,255,255,0.05)" : "transparent",
                      border: "none",
                      borderBottom: activeTab === lp.id ? "2px solid #F04E00" : "2px solid transparent",
                      color: activeTab === lp.id ? "#fff" : "rgba(255,255,255,0.25)",
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
                      {lp.label}
                    </button>
                  ))}
                </div>

                {/* Lab table */}
                <div style={{ flex: 1, overflow: "auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 110px 160px",
                    padding: "8px 12px", background: "rgba(255,255,255,0.05)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0,
                  }}>
                    {["PARAMETER", "REF RANGE", "VALUE"].map((h, i) => (
                      <span key={h} style={{ ...MONO, fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textAlign: i === 2 ? "right" : "left" }}>{h}</span>
                    ))}
                  </div>
                  {items.map((item) => {
                    const isSelect = !!item.options;
                    const selVal = values[item.key] ?? "";
                    const hasVal = selVal !== "";

                    let status: "LL" | "L" | "N" | "H" | "HH" | null = null;
                    let statusColor = "#4ade80";
                    if (isSelect) {
                      if (hasVal) {
                        const s = getSelectStatus(selVal, item.normalValues ?? []);
                        status = s;
                        statusColor = s === "H" ? "#fb923c" : "#4ade80";
                      }
                    } else {
                      const [low, high] = item.ref!(ageNum, genderVal);
                      const numVal = parseFloat(selVal);
                      if (!isNaN(numVal) && hasVal) {
                        status = getStatus(numVal, low, high, item.critLow, item.critHigh);
                        statusColor =
                          status === "HH" ? "#ef4444" :
                          status === "H"  ? "#fb923c" :
                          status === "LL" ? "#a855f7" :
                          status === "L"  ? "#60a5fa" : "#4ade80";
                      }
                    }

                    const refText = isSelect
                      ? (item.normalValues?.slice(0, 2).join(" / ") ?? "Normal")
                      : (() => { const [l, h] = item.ref!(ageNum, genderVal); return `${l} – ${h}${item.unit ? ` ${item.unit}` : ""}`; })();

                    return (
                      <div key={item.key} style={{
                        display: "grid", gridTemplateColumns: "1fr 110px 160px",
                        alignItems: "center", padding: "7px 12px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        background: hasVal && status !== "N" ? `${statusColor}08` : "transparent",
                        transition: "background 0.2s",
                      }}>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{item.label}</div>
                        <div style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>{refText}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                          {status && status !== "N" && (
                            <span style={{ ...MONO, fontSize: "9px", color: statusColor, fontWeight: 700 }}>{status}</span>
                          )}
                          {isSelect ? (
                            <Select.Root
                              value={selVal}
                              onValueChange={(v) => setValues((prev) => ({ ...prev, [item.key]: v }))}
                            >
                              <Select.Trigger style={{
                                ...MONO, width: "120px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                background: "rgba(255,255,255,0.05)",
                                border: `1px solid ${hasVal && status !== "N" ? statusColor : "rgba(255,255,255,0.08)"}`,
                                borderRadius: "2px",
                                color: hasVal && status !== "N" ? statusColor : hasVal ? "#fff" : "rgba(255,255,255,0.3)",
                                fontSize: "10px", padding: "3px 8px", outline: "none", cursor: "pointer",
                              }}>
                                <Select.Value placeholder="—" />
                                <Select.Icon style={{ marginLeft: 4, opacity: 0.4, fontSize: "8px" }}>▾</Select.Icon>
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content
                                  position="popper"
                                  sideOffset={4}
                                  style={{
                                    ...MONO,
                                    background: "#1c1c1c",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: "4px",
                                    fontSize: "10px",
                                    minWidth: "120px",
                                    zIndex: 9999,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <Select.Viewport>
                                    {item.options!.map((opt) => (
                                      <Select.Item
                                        key={opt} value={opt}
                                        style={{
                                          padding: "6px 10px", cursor: "pointer", outline: "none",
                                          color: item.normalValues?.includes(opt) ? "rgba(255,255,255,0.65)" : "#f87171",
                                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                        onFocus={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                                        onBlur={(e) => { e.currentTarget.style.background = "transparent"; }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                                      >
                                        <Select.ItemText>{opt}</Select.ItemText>
                                      </Select.Item>
                                    ))}
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          ) : (
                            <div style={{ width: "120px", display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                              <input
                                type="number" step={item.step}
                                value={selVal}
                                onChange={(e) => setValues((v) => ({ ...v, [item.key]: e.target.value }))}
                                style={{
                                  ...MONO, flex: 1, minWidth: 0,
                                  background: "rgba(255,255,255,0.05)",
                                  border: `1px solid ${hasVal && status !== "N" ? statusColor : "rgba(255,255,255,0.08)"}`,
                                  borderRadius: "2px",
                                  color: hasVal && status !== "N" ? statusColor : "#fff",
                                  fontSize: "11px", fontWeight: hasVal && status !== "N" ? 700 : 400,
                                  padding: "3px 6px", outline: "none", transition: "all 0.2s",
                                  textAlign: "left",
                                }}
                              />
                              {item.unit && <span style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{item.unit}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Interpretation */}
                {hasAnyValue && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
                  >
                    <p style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 4 }}>INTERPRETATION</p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                      {currentPanel.interpret(values, ageNum, genderVal)}
                    </p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => { setStep("info"); setValues({}); }}
                style={{
                  ...MONO, fontSize: "9px", letterSpacing: "0.08em",
                  background: "transparent", border: "none",
                  color: "rgba(255,255,255,0.65)", cursor: "pointer", textAlign: "left", padding: "6px 0 2px",
                }}
              >
                ← เปลี่ยนข้อมูลผู้ป่วย ({gender === "M" ? "ชาย" : "หญิง"}, {age} ปี)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderTop: "1px solid rgba(0,0,0,0.15)",
      }}>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(0,0,0,0.5)" }}>REF: WHO · ADULT RANGE</span>
        <span style={{ ...MONO, fontSize: "10px", color: "rgba(0,0,0,0.5)" }}>HIS MODULE · LAB →</span>
      </div>
    </motion.div>
  );
}
