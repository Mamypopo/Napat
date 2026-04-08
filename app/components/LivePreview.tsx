"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* ── Constants ─────────────────────────────────────────────── */

const PHRASES = [
  "Ship software peacefully.",
  "Build things that matter.",
  "Code with intention.",
  "Design with precision.",
];

const IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80",
];

const THEMES = [
  { label: "Purple", overlay: "rgba(85, 63, 131, 0.38)", accent: "#553F83" },
  { label: "Teal", overlay: "rgba(8, 145, 178, 0.38)", accent: "#0891b2" },
  { label: "Amber", overlay: "rgba(180, 100, 10, 0.38)", accent: "#d97706" },
];

const FILTERS = [
  { label: "Raw", desc: "No processing", css: "none" },
  {
    label: "Cinematic",
    desc: "Low-sat high contrast",
    css: "brightness(0.85) contrast(1.25) saturate(0.7)",
  },
  {
    label: "B&W",
    desc: "Grayscale + sharp",
    css: "grayscale(1) contrast(1.15)",
  },
];

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
};

/* ── Copy icon ─────────────────────────────────────────────── */

function CopyIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── JSON Panel (inline editable) ─────────────────────────── */

type JsonPanelProps = {
  headlineText: string;
  userDesc: string;
  imgIdx: number;
  filterIdx: number;
  published: boolean;
  setUserInput: (v: string) => void;
  setUserDesc: (v: string) => void;
  setImgIdx: (v: number) => void;
  setFilterIdx: (v: number) => void;
};

function JsonPanel({ headlineText, userDesc, imgIdx, filterIdx, published, setUserInput, setUserDesc, setImgIdx, setFilterIdx }: JsonPanelProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = (key: string, val: string) => {
    if (key === "title")       setUserInput(val);
    if (key === "description") setUserDesc(val);
    if (key === "image") {
      const n = parseInt(val);
      if (!isNaN(n) && n >= 1 && n <= IMAGES.length) setImgIdx(n - 1);
    }
    if (key === "filter") {
      const idx = FILTERS.findIndex(f => f.label.toLowerCase() === val.toLowerCase());
      if (idx !== -1) setFilterIdx(idx);
    }
    setEditingKey(null);
  };

  const startEdit = (key: string, currentVal: string) => {
    setEditingKey(key);
    setDraft(currentVal);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const rows: { key: string; val: string; color: string; editable: boolean }[] = [
    { key: "title",       val: headlineText || "",                        color: "#c3e88d", editable: true },
    { key: "description", val: userDesc || "",                            color: "#c3e88d", editable: true },
    { key: "image",       val: String(imgIdx + 1),                       color: "#f78c6c", editable: true },
    { key: "filter",      val: FILTERS[filterIdx].label.toLowerCase(),   color: "#c3e88d", editable: true },
    { key: "status",      val: published ? "published" : "draft",        color: published ? "#4ade80" : "#fb923c", editable: false },
  ];

  return (
    <div
      style={{
        borderRight: "1px solid rgba(255,255,255,0.08)",
        overflow: "auto",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 4, fontFamily: "var(--font-mono), monospace" }}>
        CONFIG.JSON
      </div>
      <pre style={{ margin: 0, fontFamily: "var(--font-mono), monospace", fontSize: 11, lineHeight: 1.9, overflowX: "auto" }}>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>{"{"}</span>{"\n"}
        {rows.map((row, i) => (
          <div key={row.key}>
            {"  "}
            <span style={{ color: "#82aaff" }}>{JSON.stringify(row.key)}</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{": "}</span>
            {editingKey === row.key ? (
              <input
                ref={inputRef}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onBlur={() => commit(row.key, draft)}
                onKeyDown={e => {
                  if (e.key === "Enter") commit(row.key, draft);
                  if (e.key === "Escape") setEditingKey(null);
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderBottom: `1px solid ${row.color}`,
                  color: row.color,
                  fontSize: 11,
                  fontFamily: "var(--font-mono), monospace",
                  outline: "none",
                  width: `${Math.max(draft.length + 2, 8)}ch`,
                  padding: "0 2px",
                }}
                autoFocus
              />
            ) : (
              <motion.span
                key={row.val}
                style={{
                  color: row.color,
                  cursor: row.editable ? "text" : "default",
                  borderBottom: row.editable ? "1px solid transparent" : "none",
                  transition: "border-color 0.15s",
                }}
                whileHover={row.editable ? { borderColor: row.color } : {}}
                onClick={() => row.editable && startEdit(row.key, row.val)}
                title={row.editable ? "Click to edit" : undefined}
              >
                {JSON.stringify(row.val)}
              </motion.span>
            )}
            {i < rows.length - 1 && <span style={{ color: "rgba(255,255,255,0.25)" }}>{","}</span>}
          </div>
        ))}
        {"\n"}
        <span style={{ color: "rgba(255,255,255,0.25)" }}>{"}"}</span>
      </pre>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */

export default function LivePreview() {
  /* image + theme + filter state */
  const [imgIdx, setImgIdx]         = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [themeIdx, setThemeIdx] = useState(0);
  const [filterIdx, setFilterIdx] = useState(0);
  const [published, setPublished] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setImgIdx(IMAGES.length); // index beyond presets = uploaded
  };

  /* typewriter state */
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [userDesc, setUserDesc] = useState("");

  /* typewriter refs */
  const phraseIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const directionRef = useRef<"type" | "delete">("type");
  const twTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<() => void>(() => {});

  /* cursor blink */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  /* typewriter engine */
  const tick = useCallback(() => {
    const phrase = PHRASES[phraseIdxRef.current];

    if (directionRef.current === "type") {
      charIdxRef.current += 1;
      setDisplayed(phrase.slice(0, charIdxRef.current));

      if (charIdxRef.current >= phrase.length) {
        directionRef.current = "delete";
        twTimerRef.current = setTimeout(tickRef.current, 1500);
        return;
      }
      twTimerRef.current = setTimeout(tickRef.current, 80);
    } else {
      charIdxRef.current -= 1;
      setDisplayed(phrase.slice(0, charIdxRef.current));

      if (charIdxRef.current <= 0) {
        phraseIdxRef.current = (phraseIdxRef.current + 1) % PHRASES.length;
        directionRef.current = "type";
        twTimerRef.current = setTimeout(tickRef.current, 120);
        return;
      }
      twTimerRef.current = setTimeout(tickRef.current, 40);
    }
  }, []);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    if (userInput) {
      if (twTimerRef.current) clearTimeout(twTimerRef.current);
      return;
    }
    charIdxRef.current = 0;
    directionRef.current = "type";
    twTimerRef.current = setTimeout(() => {
      setDisplayed("");
      tickRef.current();
    }, 400);

    return () => {
      if (twTimerRef.current) clearTimeout(twTimerRef.current);
    };
  }, [userInput, tick]);

  const handlePublish = () => setPublished(v => !v);

  const headlineText  = userInput || displayed;
  const previewDesc   = userDesc;
  const previewImgSrc = imgIdx === IMAGES.length ? (uploadedUrl ?? IMAGES[0]) : IMAGES[imgIdx];
  const previewFilter = FILTERS[filterIdx];
  const theme = THEMES[themeIdx];

  /* ── Render ──────────────────────────────────────────────── */

  return (
    <section
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Preview area ─────────────────────────────────────── */}
      <motion.div
        animate={{ boxShadow: published ? "inset 0 0 0 2px #4ade80" : "inset 0 0 0 0px #4ade80" }}
        transition={{ duration: 0.4 }}
        style={{ height: "60vh", position: "relative", overflow: "hidden" }}
      >
        {/* Background image */}
        <AnimatePresence mode="sync">
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={previewImgSrc}
              alt="Hero background"
              fill
              style={{
                objectFit: "cover",
                filter: previewFilter.css === "none" ? undefined : previewFilter.css,
              }}
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Base gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%)",
            zIndex: 1,
          }}
        />

        {/* Theme color overlay */}
        <AnimatePresence mode="sync">
          <motion.div
            key={themeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              inset: 0,
              background: theme.overlay,
              zIndex: 1,
              mixBlendMode: "multiply",
            }}
          />
        </AnimatePresence>

        {/* Mock browser chrome */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: "rgba(0,0,0,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(6px)",
            ...MONO,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 2, marginLeft: 12 }}>
            {["HERO.TSX", "TERMINAL"].map((tab) => (
              <div
                key={tab}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  padding: "3px 10px",
                  color:
                    tab === "HERO.TSX"
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                  background:
                    tab === "HERO.TSX"
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  borderRadius: 4,
                }}
              >
                {tab}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
            aria-label="Copy"
          >
            <CopyIcon />
          </button>
        </div>

        {/* Description — bottom right */}
        {previewDesc && (
          <motion.p
            key={previewDesc}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute",
              bottom: 48,
              right: 48,
              zIndex: 2,
              maxWidth: "360px",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            {previewDesc}
          </motion.p>
        )}

        {/* Headline */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            right: previewDesc ? "440px" : "48px",
            zIndex: 2,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            <AnimatePresence mode="popLayout">
              {headlineText.split("").map((char, i) => (
                <motion.span
                  key={`${i}-${char}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.012 }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </AnimatePresence>
            <span
              style={{
                opacity: cursorVisible ? 1 : 0,
                marginLeft: 2,
                fontWeight: 300,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              |
            </span>
          </h2>
        </div>
      </motion.div>

      {/* ── Editor panel ─────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          height: 420,
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Col 1 — Live JSON config (inline editable) */}
        <JsonPanel
          headlineText={headlineText}
          userDesc={userDesc}
          imgIdx={imgIdx}
          filterIdx={filterIdx}
          published={published}
          setUserInput={setUserInput}
          setUserDesc={setUserDesc}
          setImgIdx={setImgIdx}
          setFilterIdx={setFilterIdx}
        />

        {/* Col 2 — Studio panel */}
        <div
          style={{
            borderRight: "1px solid rgba(255,255,255,0.08)",
            padding: "14px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.08em",
              ...MONO,
            }}
          >
            Studio&nbsp;/&nbsp;
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Hero</span>
          </div>

          {/* Title field */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                ...MONO,
              }}
            >
              TITLE
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type headline…"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: "#fff",
                fontSize: 11,
                padding: "5px 8px",
                outline: "none",
                ...MONO,
              }}
            />
          </div>

          {/* Description field */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                ...MONO,
              }}
            >
              DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={userDesc}
              onChange={(e) => setUserDesc(e.target.value)}
              placeholder="Enter description…"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: "#fff",
                fontSize: 11,
                padding: "5px 8px",
                outline: "none",
                resize: "none",
                ...MONO,
              }}
            />
          </div>

          {/* Image asset picker */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                ...MONO,
              }}
            >
              IMAGE
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  style={{
                    padding: 0,
                    border: imgIdx === i ? "2px solid #553F83" : "2px solid rgba(255,255,255,0.1)",
                    borderRadius: 4,
                    cursor: "pointer",
                    background: "transparent",
                    overflow: "hidden",
                    position: "relative",
                    width: 60,
                    height: 40,
                    flexShrink: 0,
                  }}
                  aria-label={`Select image ${i + 1}`}
                >
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
                </button>
              ))}

              {/* Uploaded thumbnail */}
              {uploadedUrl && (
                <button
                  onClick={() => setImgIdx(IMAGES.length)}
                  style={{
                    padding: 0,
                    border: imgIdx === IMAGES.length ? "2px solid #553F83" : "2px solid rgba(255,255,255,0.1)",
                    borderRadius: 4,
                    cursor: "pointer",
                    background: "transparent",
                    overflow: "hidden",
                    position: "relative",
                    width: 60,
                    height: 40,
                    flexShrink: 0,
                  }}
                  aria-label="Uploaded image"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadedUrl} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              )}

              {/* Upload button */}
              <button
                onClick={() => uploadInputRef.current?.click()}
                style={{
                  width: 60,
                  height: 40,
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: 4,
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-label="Upload image"
                title="Upload image"
              >
                +
              </button>
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Col 3 — Visual + Publish */}
        <div
          style={{
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            overflow: "auto",
          }}
        >
          {/* Theme */}
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", ...MONO }}>
            THEME
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {THEMES.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setThemeIdx(i)}
                title={t.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 4px",
                  background: themeIdx === i ? "rgba(255,255,255,0.06)" : "transparent",
                  border: themeIdx === i ? `1px solid ${t.accent}` : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: t.accent,
                  boxShadow: themeIdx === i ? `0 0 8px ${t.accent}90` : "none",
                }} />
                <span style={{ fontSize: 8, color: themeIdx === i ? "#fff" : "rgba(255,255,255,0.35)", ...MONO, letterSpacing: "0.04em" }}>
                  {t.label.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* Filter */}
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", ...MONO }}>
            FILTER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setFilterIdx(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  background:
                    filterIdx === i ? "rgba(255,255,255,0.06)" : "transparent",
                  border:
                    filterIdx === i
                      ? "1px solid rgba(255,255,255,0.25)"
                      : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 4,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 20,
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={IMAGES[Math.min(imgIdx, IMAGES.length - 1)]}
                    alt=""
                    fill
                    style={{
                      objectFit: "cover",
                      filter: f.css === "none" ? undefined : f.css,
                    }}
                    unoptimized
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color:
                        filterIdx === i ? "#fff" : "rgba(255,255,255,0.55)",
                      ...MONO,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {f.label.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.25)",
                      ...MONO,
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
                {filterIdx === i && (
                  <div
                    style={{
                      marginLeft: "auto",
                      color: "rgba(255,255,255,0.6)",
                      display: "flex",
                    }}
                  >
                    <CheckIcon />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Publish button */}
          <AnimatePresence mode="wait">
            {published ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "8px 14px",
                  background: "rgba(74, 222, 128, 0.12)",
                  border: "1px solid rgba(74, 222, 128, 0.4)",
                  borderRadius: 6,
                  color: "#4ade80",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  ...MONO,
                }}
              >
                <CheckIcon />
                PUBLISHED
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handlePublish}
                style={{
                  background: "#553F83",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  ...MONO,
                }}
                whileHover={{ background: "#6b52a3" }}
              >
                PUBLISH →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
