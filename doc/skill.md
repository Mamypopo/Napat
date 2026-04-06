---
name: modern-sanity-hybrid-full
description: Editorial-grade design system (Sanity-like precision × modern minimal), Thai-first IBM Plex Sans Thai, dark/light themes, Next.js-friendly stack with Framer Motion on client islands.
license: MIT
metadata:
  author: Gemini & Your Identity
---

# Modern-Sanity Hybrid Design System (Full Edition)

## 1. Mission & Vision
You are an expert design-system architect for a "Peaceful High-Performance" brand. Your goal is to create a digital experience that feels like a premium editorial magazine (Apple/Porsche) but functions with the raw, technical edge of Sanity.io.

## 2. Brand Identity
- **Motto:** Ship software peacefully.
- **Core Values:** Precision, Silent Power, Editorial Clarity.

## 3. Style Foundations
- **Visual Style:** Ultra-minimal, modern-editorial, hairline-grid, **dark/light themes**. For **portfolio and marketing surfaces**, default to a **bright light** canvas unless the product brief says dark-first.
- **Typography Scale:** 10/12/14/16/20/24/32/48/64/90/120.
- **Fonts (default):** **IBM Plex Sans Thai** is the **primary and default** typeface for Thai UI and body (do not swap unless the user or brief explicitly requests another Thai font).
    - **Optional alternates** (only on request): Prompt (modern UI), Sarabun (long-form readability), Kanit (geometric accent).
    - **display:** IBM Plex Sans Thai (Bold, tight tracking ~-0.04em for headlines).
    - **mono:** JetBrains Mono (technical labels, data, code, English-only meta).
- **Weights:** 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold).
- **Thai UI vs Mono (important):** Use **IBM Plex Sans Thai** for navigation links, primary buttons, and body copy in Thai — typically **15–18px** minimum for interactive text, **no forced uppercase** for Thai. Reserve **JetBrains Mono** at **10–12px** for English-only meta (section eyelines, tags, copyright, code). Mixed-language UI: Thai strings → Plex; English abbreviations in labels → Mono is OK inside the same row if hierarchy stays clear.
- **Color Palette — Dark theme (editorial night):**
    - primary: #553F83 (Signature Deep Purple).
    - secondary: #111111 (page/canvas background).
    - surface: #1A1A1A (Bento cell / card).
    - text-high: #FFFFFF (titles/headers).
    - text-muted: rgba(255, 255, 255, 0.4) (body/labels).
    - glow: rgba(85, 63, 131, 0.15) (spotlight hover).
    - hairline: rgba(255, 255, 255, 0.1).
- **Color Palette — Light theme (bright portfolio default):** Use a **high-luminance** canvas so the page feels airy, not grey-tinted mud.
    - secondary (canvas): #FAFAFC (or #F8F7FB) — main page background.
    - surface: #FFFFFF (cards/cells; pure white is OK).
    - text-high: #0F0D12 (or #141218) — body copy and headings.
    - text-muted: rgba(15, 13, 18, 0.55) — supporting text (adjust slightly if contrast fails WCAG on white).
    - glow: rgba(85, 63, 131, 0.12–0.16) — subtle spotlight on light surfaces.
    - hairline: rgba(15, 13, 18, 0.1–0.12).
    - top bar scrim: rgba(255, 255, 255, 0.88–0.94) + backdrop-blur (same structure as dark, lighter scrim).
- **Borders:** Always **1px** hairline; token above per theme (no heavy shadows).
- **Spacing Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 120.

## 4. Design Rules & Behavior
- **The Hairline Grid:** Do not use shadows. Use 1px borders to define all structures and containers.
- **Bento Architecture:** All content must be grouped into an asymmetric Bento Grid. Use varying cell sizes to show hierarchy.
- **Interactive Spotlight:** Every interactive bento cell MUST feature a mouse-following radial gradient glow on both the background and the border.
- **Editorial Contrast:** Pair massive Display headings (90px+) with tiny Mono labels (10px) for a high-end, structured look.
- **Smooth Motion:** Animations must feel "Apple-smooth" — prefer **ease-out** (or cubic-bezier close to `[0.22, 1, 0.36, 1]`) and **300–500ms** durations.
- **Motion implementation:**
    - **Next.js / React:** Use **Framer Motion** for section reveals, staggered Bento cells, nav/theme transitions, and subtle hover/layout shifts — map tokens above to `transition` props; keep motion **low-amplitude** to match "Peaceful High-Performance."
    - **Non-React (static HTML, etc.):** Use **CSS transitions** on color, transform, and opacity; optional small script for spotlight cursor position on cells.
    - **Accessibility:** Respect **`prefers-reduced-motion`** (disable or shorten non-essential motion).

### 4.1 Next.js implementation (default app stack)
- **Router:** Prefer **App Router** (`app/`) for new portfolio/marketing sites unless constraints require Pages Router.
- **Fonts:** Load **IBM Plex Sans Thai** and **JetBrains Mono** via **`next/font/google`** (subset weights 300–700 for Plex, 400–500 for Mono); wire through root `layout.tsx` so Thai body copy is never blocked by layout shift.
- **Framer Motion + RSC:** Default to **Server Components** for static editorial blocks (hero copy, metadata). Mark only interactive/animated trees with **`'use client'`** — e.g. `motion.section`, Bento spotlight cells, theme toggle. Keeps bundles small and aligns with Next.js streaming.
- **Theme:** Use **`class` on `<html>`** (e.g. `light` / `dark`) driving the CSS variables in §3. For avoiding flash of wrong theme, use a small inline script before paint, or **`next-themes`** with **`suppressHydrationWarning`** on `<html>`; persist choice (localStorage / cookie) per §5.1.
- **Media:** Use **`next/image`** for portfolio thumbs and portrait placeholders; apply hairline frames and low-key filters in CSS per §5.2 and §6.
- **CMS:** If content is **Sanity**, Next.js + `@sanity/image-url` (and optional Presentation) matches this system’s structured editorial model.

## 5. Component Families & Rules

### 5.1 Navigation & Structure
- **Top Bar:** Transparent scrim with **~20px backdrop-blur**. **1px** bottom border only; scrim color follows **active theme** (see §3 light/dark hairline + top bar scrim).
- **Theme:** Support **light/dark toggle** (or system `prefers-color-scheme`) for portfolio sites; **persist** user choice (e.g. `localStorage`) when applicable.
- **Sidebars:** Minimalist. Nav items in **Thai** → IBM Plex Sans Thai (~16px); nav in **English only** → Mono allowed at 10–12px uppercase. Same rule for menus and in-page anchors.
- **Footer:** Large typography for CTA, tiny Mono for copyright/legal.

### 5.2 Interactive Elements
- **Buttons:** Sharp corners (0-2px radius). Ghost style with hairline borders or solid Primary. **Thai button labels** → IBM Plex Sans Thai, ~16px, semi-bold acceptable; **English-only** actions → Mono OK.
- **Inputs/Forms:** Surface color background. No borders unless focused. Focus state: 1px Primary border + subtle purple glow.
- **Cards/Bento Cells:** Must share borders (`border-collapse` style). Hover: Scale 1.02 + Spotlight Glow. Portfolio-style cells MAY include a **top media strip** (image/video still): low-key, darkened (`brightness`/`contrast`), hairline separator below thumb — keeps editorial tone from §6.

### 5.3 Data & Content
- **Tables/Data Lists:** Use hairline separators. No alternating row colors. Hover row: Primary text color.
- **Badges/Chips:** Mono font, 10px, uppercase; background **dark theme:** ~`white/5`; **light theme:** ~`black/6`; hairline border per theme.
- **Charts:** Minimalist line/bar charts using Primary purple. No grid lines except axes.

### 5.4 Feedback & Overlays
- **Modals/Drawers:** Sharp corners. Dark backdrop (80% opacity). Enter: Fade-in + Slide-up.
- **Toasts/Alerts:** Minimalist bars at top-right. Success=Green/White, Danger=Red/White.

## 6. Rules: Do & Don't
- **DO:** Use "Low-key" photography (dark, high contrast) for personal and project images.
- **DO:** Ensure Thai line-height is at least 1.6x for IBM Plex Sans Thai readability.
- **DON'T:** Use rounded corners larger than 12px. Keep it "technical."
- **DON'T:** Use vibrant or multi-color gradients. Stick to monochromatic depth.

## 7. Cloned UI Patterns (Reference Library)

Patterns reverse-engineered from reference sites and adapted for this portfolio.
Use these as building blocks — swap content/colors, keep the interaction model.

### 7.1 Sanity.io — 3-Panel Click-to-Activate (`ProjectDemo`)
**Source:** sanity.io hero feature sections  
**File:** `app/components/ProjectDemo.tsx`

**Structure:**
- `gridTemplateColumns: "1fr 2fr 1fr"` — side panels thin, active panel 2x wide
- Active panel: fills with a **vivid accent color** (orange `#F04E00`, yellow `#FFE600`, blue `#0085FF`)
- Inactive panels: `#111` background + dense dot grid (10×10px) + dashed center box + `[ CLICK TO CHAT ]`
- Tab bar below mirrors panel order with `layoutId` sliding indicator

**Key details:**
- **Corner brackets** — 4 `<span>` with partial borders, `22×22px`, `2px` weight
- **Contrast helper** `isLight(hex)` — luminance check, auto-switches `fg`/`fgStrong` (critical for yellow)
- **Inner panel** `#0a0a0a` with `border: 1px solid rgba(255,255,255,0.12)` — "window in frame" depth
- **Dashed center box** on inactive: `border: 1px dashed`, `background: rgba(0,0,0,0.35)` — click target hint
- **Header pattern**: `AGENT CONTEXT` left / `CURRENT CONTEXT: [TAG]` right
- **Footer pattern**: `STATUS: [BADGE]` left / `LEARN MORE →` right
- Input placeholder: `ASK THE AI AGENT A QUESTION...`

**Sanity accent colors (exact):**
```
Orange  → #F04E00
Yellow  → #FFE600  (isLight = true → use black text)
Blue    → #0085FF
```

**Animation:** `AnimatePresence mode="wait"` on inner content, `motion.div layout` on panel bg, `layoutId="demo-tab-indicator"` for tab underline.

---

### 7.2 Career Timeline with Node Graph (`FeatureShowcase`)
**File:** `app/components/FeatureShowcase.tsx`  
**Repurposed from:** Sanity-style feature showcase → Career/Education timeline

**Structure (3-column):**
```
gridTemplateColumns: "360px 1fr 1fr"
```
- **Left (360px):** `TimelineStrip` — vertical spine + year dots + event labels
- **Center (1fr):** `DetailPanel` — period, role, org, description, highlights, badge
- **Right (1fr):** `GraphPanel` — skill node graph with clickable nodes + detail tooltip

**Timeline strip details:**
- SVG vertical spine at `x=64` with `pathLength` 0→1 draw-in animation
- Year markers: purple dot (`#553F83` + glow) + horizontal tick line → year label
- Event labels (dim): `fontSize: 10px, opacity: 0.28`, stagger animate-in
- Data shape: `{ label, x, y, dim? }[]` — `dim: true` = event, `dim: false` = year marker

**Graph panel details:**
- Static dim track line + animated `pathLength 1.8s` draw-in line (stays, no loop)
- Nodes are `<button>` — click toggles `activeNode` state
- Tooltip card at `bottom: 20px, left: 20px` — `AnimatePresence` fade in/out
- Node derives `null` automatically when tab changes (no useEffect reset needed)

**Auto-advance pattern:**
- `setInterval(advance, 5500)` — cycles through tabs
- `useCallback` with functional `setActiveTab` updater (stable ref, no deps)
- Pause on `onMouseEnter` / resume on `onMouseLeave`
- Progress bar: `motion.span key={tab.id}` animates `width: 0% → 100%` over `5.5s linear`
- Both interval and progress bar duration **must match exactly**

**Dot grid trick:**
- `inset: "16px"` on the SVG keeps dots away from borders — cleaner edge

**Tab data shape:**
```ts
{
  period, role, org, location, description,
  highlights: string[],
  badge, badgeAccent?: boolean,
  milestones: { label, x, y, dim? }[],
  nodes: { id, x, y, label, accent?, detail? }[],
  lines: { x1, y1, x2, y2 }[]
}
```

---

### 7.3 Pinned Scroll Section (`PinnedScroll`)
**File:** `app/components/PinnedScroll.tsx`

**Core pattern:**
- Outer container: `height: "500vh"`, `ref={containerRef}`
- Inner sticky panel: `position: sticky, top: 0, height: "100vh"`
- `useScroll({ target: containerRef, offset: ["start start", "end end"] })` → `scrollYProgress` 0→1
- `useMotionValueEvent` maps progress to `active` index: `Math.min(N-1, Math.floor(v * N))`
- `scrollToItem(i)` — programmatic scroll to item slot: `containerTop + (i/N) * containerHeight`

**Header placement:** Header is **outside** the tall container so it scrolls away normally. Sticky panel is content-only.

**Layout (3-col sticky panel):**
```
gridTemplateColumns: "220px 1fr 1fr"
Left: clickable nav (numbered, active dot layoutId, progress bar)
Center: AnimatePresence content swap
Right: CodeVisual (fake macOS window chrome)
```

---

### 7.4 Full-screen Case Study Slider (`CaseStudySlider`)
**File:** `app/components/CaseStudySlider.tsx`

**Structure:** `height: "100vh"`, `position: relative`, `overflow: hidden`

**Key details:**
- Background: `<Image fill>` with `brightness(0.28) contrast(1.1)` + gradient overlay
- Layout: `gridTemplateColumns: "1fr auto 1fr"` — title left, stats card center
- Stats card: glassmorphism — `background: rgba(10,10,10,0.82)`, `backdropFilter: blur(20px)`
- Slide counter: numbered buttons top-right, active = white bg
- Progress bar: `motion.div key={current}` animates `width 0%→100%` over 5s linear
- Auto-play: `setInterval(next, 5000)`, pause `onMouseEnter`
- Keyboard: `ArrowLeft` / `ArrowRight` via `window.addEventListener`

---

### 7.5 Marquee Strip (`MarqueeStrip`)
**File:** `app/components/MarqueeStrip.tsx`

- CSS `animate-marquee` keyframe (defined in `globals.css`)
- Doubled items array for seamless loop
- `animationPlayState: paused ? "paused" : "running"` — pause on hover via `useState`

---

### 7.3 Full-bleed Section Pattern (General)
Used in Hero, FeatureShowcase, ProjectDemo:
- Section `background` covers full viewport width — **no** `max-width` wrapper on the section itself
- Inner content uses `padding: "0 64px"` or a `max-width: 1280px` child div
- `borderTop/borderBottom: "1px solid var(--hairline)"` to stack sections cleanly
- Dark sections use `background: "#0a0a0a"` (slightly off-black, not pure `#000`)

## 8. Quality Gates (QA Checklist)
- [ ] Are all borders 1px and consistent?
- [ ] Is **IBM Plex Sans Thai** used as default for Thai UI unless an alternate was explicitly requested?
- [ ] Is the typography hierarchy sharp (Display vs Mono), and is **Thai UI** large enough (Plex, not tiny Mono)?
- [ ] In **light theme**, is the canvas **bright enough** (#FAFAFC-range) and are text/hairline tokens readable (contrast OK)?
- [ ] Does every interactive element have a hover state?
- [ ] Is the "Spotlight Glow" functional and smooth (and sane on **light** surfaces)?
- [ ] If **Next.js**: are **`'use client'`** boundaries minimal (motion/theme/spotlight only), fonts from **`next/font`**, and images via **`next/image`** where appropriate?
- [ ] If **Next.js / React**: does Framer Motion respect **prefers-reduced-motion** and stay within **300–500ms** ease-out feel?
- [ ] Does the UI feel "Peaceful" and "Precise"?