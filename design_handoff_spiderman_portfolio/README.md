# Handoff: Spider-Man Portfolio — Single-Screen Hero Grid with 3D Showpiece

## Overview

A single-viewport (no-scroll) personal portfolio landing page. Nine grid regions frame a
central WebGL stage that displays a real 3D Spider-Man suit model as a lit studio/product
object standing on a minimal pedestal. Six of the surrounding regions are clickable cards
(About, Projects, Tech stack, Experience, Education, Contact); clicking any card opens a
centered glass-morphic modal containing that section's full content. The visual language is
light, airy glassmorphism over a soft red/blue radial wash, with comic-halftone texture
accents in the card corners.

The page is deliberately **one screen tall on desktop** — the hero object is the dominant
element and nothing scrolls.

## About the Design Files

The files in this bundle are **design references created in HTML** — a working prototype
showing intended look and behavior. They are **not production code to copy directly**.

`Portfolio.dc.html` is authored in a proprietary design-tool component format: a template
section of inline-styled markup plus a JavaScript logic class. It will not drop into a normal
React/Vue/Svelte app as-is. Read it as a **visual and behavioral specification**.

The task is to **recreate this design in the target codebase's existing environment**, using
its established patterns, component conventions, and libraries. If the existing portfolio is
React, build it as React components; if it's plain HTML/CSS, build it that way. Where this
document gives exact pixel/hex values, match them; where it describes behavior, reimplement
the behavior idiomatically.

One hard dependency travels with the design: the 3D stage genuinely requires **three.js**
(v0.160.0 in the prototype). Everything else is plain CSS.

## Fidelity

**High-fidelity (hifi).** All colors, typography, spacing, radii, shadows, transitions, and
the full 3D scene setup are final and specified exactly below. Recreate pixel-perfectly using
the codebase's existing libraries where they exist.

The one intentionally *approximate* area is the 3D model's own materials — the source asset
arrived with unresolvable texture references, so the suit currently renders in neutral studio
greys (see **3D Showpiece → Material handling**). That is the current, accepted state.

---

## Page Structure

```
┌──────────────┬───────────────────────────┬──────────────┐
│  ABOUT       │      HERO TITLE BLOCK     │  PROJECTS    │  row 1  (auto)
│  (card)      │      (name + tagline)     │  (card)      │
├──────────────┼───────────────────────────┼──────────────┤
│  TECH STACK  │                           │  EXPERIENCE  │
│  (card)      │    3D SHOWPIECE STAGE     │  (card)      │  row 2  (1fr)
│              │      (WebGL canvas)       │              │
├──────────────┼───────────────────────────┼──────────────┤
│  EDUCATION   │       CTA BUTTON ROW      │  CONTACT     │  row 3  (auto)
│  (card)      │      + micro-caption      │  (card)      │
└──────────────┴───────────────────────────┴──────────────┘
   col 1              col 2                    col 3
```

### Root grid

| Property | Value |
|---|---|
| `display` | `grid` |
| `grid-template-columns` | `minmax(180px, 264px)  minmax(380px, 1fr)  minmax(180px, 264px)` |
| `grid-template-rows` | `auto  minmax(0, 1fr)  auto` |
| `gap` | `14px` |
| `padding` | `16px` |
| `height` | `100vh` |
| `overflow` | `hidden` |
| `position` | `relative`, `z-index: 1` |

Every grid child sets `min-height: 0` so the center row can shrink correctly.

### Fixed background layers (behind grid, `z-index: 0`, `pointer-events: none`)

**Layer 1 — color wash**, `position: fixed; inset: 0`:
```css
background:
  radial-gradient(900px 700px at 12% 8%,  rgba(207,33,49,.11), transparent 62%),
  radial-gradient(1000px 800px at 88% 92%, rgba(44,63,192,.11), transparent 64%),
  radial-gradient(700px 520px at 50% 50%, rgba(255,255,255,.85), transparent 70%);
```

**Layer 2 — engineering grid**, `position: fixed; inset: 0; opacity: .5`:
```css
background:
  repeating-linear-gradient(0deg,  rgba(19,26,46,.055) 0 1px, transparent 1px 46px),
  repeating-linear-gradient(90deg, rgba(19,26,46,.055) 0 1px, transparent 1px 46px);
mask-image: radial-gradient(120% 100% at 50% 50%, #000 30%, transparent 88%);
```

**Page body**: `background: oklch(0.965 0.008 250)`, `color: #131a2e`,
`-webkit-font-smoothing: antialiased`, `margin/padding: 0`.

---

## Design Tokens

### Colors

| Token | Value | Use |
|---|---|---|
| Page background | `oklch(0.965 0.008 250)` | body |
| Ink (primary text) | `#131a2e` | headings, body text |
| Ink 78% | `rgba(19,26,46,.78)` | modal body paragraphs |
| Ink 72% | `rgba(19,26,46,.72)` | neutral chip text |
| Ink 70% | `rgba(19,26,46,.70)` | modal list descriptions |
| Ink 66% | `rgba(19,26,46,.66)` | card body copy |
| Ink 62% | `rgba(19,26,46,.62)` | hero tagline |
| Ink 50% | `rgba(19,26,46,.50)` | "+11 more" chip |
| Ink 45% | `rgba(19,26,46,.45)` | card eyebrow labels, modal group labels |
| Ink 42% | `rgba(19,26,46,.42)` | small meta labels, dates |
| Ink 40% | `rgba(19,26,46,.40)` | project years, overlay "3D" glyph |
| Ink 38% | `rgba(19,26,46,.38)` | footer micro-caption |
| Ink 34% | `rgba(19,26,46,.34)` | overlay format hint |
| Ink 30% | `rgba(19,26,46,.30)` | model info readout |
| Spider red | `#cf2131` | eyebrows, accents, primary CTA, link hover |
| Spider blue | `#2c3fc0` | secondary CTA, tech chips, sub-labels, default link |
| Card border | `rgba(19,26,46,.10)` | all card/panel borders |
| Halftone ink | `rgba(19,26,46,.05–.06)` | corner texture |
| Shadow base | `rgba(16,22,45,.55)` | card drop shadow |
| Modal veil | `rgba(238,240,246,.6)` | modal backdrop |
| Stand / 3D matte | `#161c2b` | pedestal material |
| Contact shadow | `#131a2e` @ 20% | three.js `ShadowMaterial` |

`::selection` — background `#cf2131`, color `#fff`.

### Typography

Google Fonts, one `<link>`:
`Archivo` (400, 500, 600, 700) · `Archivo Black` · `JetBrains Mono` (400, 500).

| Role | Family | Size | Weight | Other |
|---|---|---|---|---|
| Hero name | Archivo Black | `clamp(30px, 3.4vw, 46px)` | 400 (black face) | `line-height: .98`, `letter-spacing: -.02em` |
| Hero eyebrow | JetBrains Mono | `10px` | 400 | `letter-spacing: .18em`, uppercase, `#cf2131` |
| Hero tagline | Archivo | `14px` | 400 | `max-width: 44ch`, `text-wrap: pretty` |
| Card eyebrow | JetBrains Mono | `10px` | 400 | `letter-spacing: .16em`, uppercase |
| Card title | Archivo Black | `19px` | 400 | `line-height: 1.05`, `letter-spacing: -.01em` |
| Card body | Archivo | `13px` | 400 | `line-height: 1.5`, `text-wrap: pretty` |
| Card CTA ("OPEN →") | JetBrains Mono | `10px` | 400 | `letter-spacing: .14em`, `#cf2131`, `margin-top: 4px` |
| Modal eyebrow | JetBrains Mono | `10px` | 400 | `letter-spacing: .2em`, uppercase, `#cf2131` |
| Modal title | Archivo Black | `34px` | 400 | `line-height: 1`, `letter-spacing: -.025em` |
| Modal paragraph | Archivo | `15px` | 400 | `line-height: 1.65`, `max-width: 56–60ch` |
| Modal item title | Archivo Black | `17px` | 400 | — |
| Modal item body | Archivo | `14px` | 400 | `line-height: 1.55` |
| Chips (card) | JetBrains Mono | `10.5px` | 400 | — |
| Chips (modal) | JetBrains Mono | `12px` | 400 | — |
| CTA primary | Archivo | `13.5px` | 600 | `letter-spacing: .01em` |
| CTA secondary | Archivo | `13.5px` | 600 | — |
| Stat / contact value | Archivo | `14px` | 600 | — |
| Micro-caption | JetBrains Mono | `9.5px` | 400 | `letter-spacing: .18em`, uppercase |
| Model readout | JetBrains Mono | `9px` | 400 | `letter-spacing: .12em`, uppercase, `line-height: 1.5` |

### Radii

`16px` cards · `20px` modal shell · `14px` modal list items · `13px` contact tiles ·
`12px` about stat tiles · `999px` pills/chips/buttons · `18px` drag-target outline ·
`16px` overlay "3D" glyph tile.

### Shadows

| Use | Value |
|---|---|
| Card (rest) | `inset 0 1px 0 rgba(255,255,255,.85), 0 20px 44px -28px rgba(16,22,45,.55)` |
| Card (hover) | `inset 0 1px 0 rgba(255,255,255,.9), 0 28px 56px -26px rgba(16,22,45,.5), 0 0 0 1px rgba(207,33,49,.12)` |
| Modal shell | `inset 0 1px 0 rgba(255,255,255,.92), 0 44px 96px -44px rgba(16,22,45,.6)` |
| CTA primary (rest) | `0 14px 30px -14px rgba(207,33,49,.75)` |
| CTA primary (hover) | `0 20px 38px -14px rgba(207,33,49,.8)` |

### Spacing

Grid gap `14px` · page padding `16px` · card padding `17px 18px 15px` ·
card internal gap `9px` (Tech stack uses `11px`) · modal padding `32px 34px 34px` ·
chip gaps `6px` (card) / `7px` (modal) · modal list gap `12px`.

---

## Screens / Views

### 1. Landing (default state)

**Purpose:** orient the visitor, present the 3D showpiece, offer six section entry points and
two CTAs — all without scrolling.

#### Hero title block — `grid-area: 1 / 2 / 2 / 3`

Flex column, `align-items: center`, `justify-content: center`, `gap: 7px`, centered text,
`padding: 6px 8px 0`.

1. Eyebrow: `Friendly neighbourhood portfolio`
2. `<h1>`: `YOUR NAME`
3. Tagline: `Full-stack developer. Ships fast, lands quiet. Currently swinging between React, Node and things that shouldn't be in production yet.`

#### The six cards

All six share one recipe. They are `<button type="button">` elements (full-card click target),
flex column, `align-items: flex-start`, left-aligned text, `cursor: pointer`,
`position: relative`, `overflow: hidden`, `color: #131a2e`.

```css
border: 1px solid rgba(19,26,46,.10);
border-radius: 16px;
background: linear-gradient(155deg, rgba(255,255,255,.74), rgba(255,255,255,.40));
backdrop-filter: blur(16px) saturate(150%);
padding: 17px 18px 15px;
transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s, border-color .22s;
```

**Hover:** `transform: translateY(-3px)`, `border-color: rgba(207,33,49,.4)`, hover shadow.

**Halftone corner texture** — an absolutely-positioned `<span>` filling the card,
`pointer-events: none`, `opacity: .85`. The origin point differs per card so the texture
radiates from the card's outward corner:

```css
background:
  repeating-conic-gradient(from -8deg at <ORIGIN>, rgba(19,26,46,.06) 0deg .5deg, transparent .5deg 13deg),
  repeating-radial-gradient(circle at <ORIGIN>, transparent 0 34px, rgba(19,26,46,.05) 34px 35px);
```

| Card | Grid area | Origin | Eyebrow | Title | Body |
|---|---|---|---|---|---|
| About | `1 / 1 / 2 / 2` | `8% -6%` | `01 / origin` | About | Five years of shipping. No radioactive spiders involved. |
| Projects | `1 / 3 / 2 / 4` | `92% -6%` | `02 / case files` | Projects | Three things I built that didn't fall out of the sky. |
| Tech stack | `2 / 1 / 3 / 2` | `8% -6%` | `03 / web-shooters` | Tech stack | *(chips instead of prose — see below)* |
| Experience | `2 / 3 / 3 / 4` | `92% -6%` | `04 / patrol log` | Experience | Senior Frontend Engineer at Horizon Labs — 2023 to now. |
| Education | `3 / 1 / 4 / 2` | `8% 106%` | `05 / training arc` | Education | B.Tech, Computer Science — State University, 2020. |
| Contact | `3 / 3 / 4 / 4` | `92% 106%` | `06 / signal` | Contact | you@yourdomain.com — replies faster than a police scanner. |

Every card ends with the `OPEN →` micro-CTA.

**Tech stack card body** replaces prose with a `flex-wrap` chip row (`gap: 6px`):
TypeScript · React · Node · Postgres, each
`padding: 4px 8px; border-radius: 999px; border: 1px solid rgba(44,63,192,.22); color: #2c3fc0; background: rgba(44,63,192,.06)`
— plus a muted `+11 more` chip using
`border: 1px solid rgba(19,26,46,.14); color: rgba(19,26,46,.5)`.

#### CTA row — `grid-area: 3 / 2 / 4 / 3`

Flex column, centered, `gap: 11px`, `padding: 2px 8px 4px`. Inner row is flex, `gap: 10px`,
`flex-wrap: wrap`, centered.

**Primary** — `<a download>`: `Download résumé` + inline mono `PDF · 180KB` at `10px`,
`opacity: .75`. Style: `padding: 11px 20px; border-radius: 999px; background: #cf2131;
color: #fff; font-weight: 600`. Hover: `translateY(-2px)` + deeper shadow.

**Secondary** — `<button>`: `Get in touch`. Style: `padding: 11px 18px; border-radius: 999px;
border: 1px solid rgba(44,63,192,.3); color: #2c3fc0; background: rgba(44,63,192,.05);
font-weight: 600`. Hover: `border-color: rgba(207,33,49,.45)`,
`background: rgba(207,33,49,.06)`, `color: #cf2131`. Opens the Contact modal.

**Micro-caption** below: `Hover the mask · no scrolling required`.

---

### 2. Section modal (six variants)

Opens on card click or the secondary CTA. Closes via the ✕ button, a backdrop click, or the
**Escape** key (global `keydown` listener).

**Container:** `position: fixed; inset: 0; z-index: 40; display: grid; place-items: center;
padding: 28px`.

**Backdrop:** `position: absolute; inset: 0; background: rgba(238,240,246,.6);
backdrop-filter: blur(7px)`, animation `veilIn .22s ease` (opacity 0 → 1). Click closes.

**Panel:**
```css
width: min(740px, 100%);
max-height: 84vh;
overflow: auto;
padding: 32px 34px 34px;
border-radius: 20px;
border: 1px solid rgba(19,26,46,.12);
background: linear-gradient(155deg, rgba(255,255,255,.88), rgba(255,255,255,.64));
backdrop-filter: blur(24px) saturate(160%);
animation: panelIn .3s cubic-bezier(.2,.8,.2,1);
```
`@keyframes panelIn` — `from { opacity: 0; transform: translateY(16px) scale(.985) } to { opacity: 1; transform: none }`.

The panel carries its own halftone overlay (`radius: 20px`, `opacity: .8`, origin `96% -4%`,
`34px/35px` → `46px/47px` ring, `13deg` → `11deg` conic spacing).

**Close button:** `top: 16px; right: 16px; 34×34px; border-radius: 999px;
border: 1px solid rgba(19,26,46,.12); color: rgba(19,26,46,.6);
background: rgba(255,255,255,.6); font-size: 16px`. Hover → `color: #cf2131`,
`border-color: rgba(207,33,49,.4)`.

Every variant opens with its mono eyebrow, then the `34px` Archivo Black title.

#### About — `01 / origin story`
Two paragraphs (`15px`, `line-height: 1.65`, `max-width: 60ch`), then a stat grid:
`repeat(auto-fit, minmax(150px, 1fr))`, `gap: 14px`. Each tile `padding: 13px 15px;
border-radius: 12px; border: 1px solid rgba(19,26,46,.10); background: rgba(255,255,255,.5)`,
holding a `9.5px` mono uppercase label (`letter-spacing: .16em`) over a `14px/600` value.

Tiles: Based → `Your City, IN` · Focus → `Interfaces & systems` · Currently → `Horizon Labs` ·
**Open to → `Freelance & full-time`** (accent tile: `border: 1px solid rgba(207,33,49,.22)`,
`background: rgba(207,33,49,.05)`, label `rgba(207,33,49,.7)`, value `#cf2131`).

Copy:
> I build web things that hold up under load and look good doing it. Five years of shipping — mostly TypeScript and React on the front, Node and Postgres behind it, and whatever glue the problem actually needs.

> No radioactive spiders involved. Just a stubborn habit of reading the source, a soft spot for interfaces that respond in under 100ms, and an allergy to shipping something I wouldn't use myself.

#### Projects — `02 / case files`
Flex column, `gap: 12px`. Each entry is an `<a>` card: `padding: 17px 18px;
border-radius: 14px; border: 1px solid rgba(19,26,46,.10); background: rgba(255,255,255,.55);
transition: border-color .2s, transform .2s`. Hover → `border-color: rgba(207,33,49,.4)`,
`transform: translateX(3px)`.

Header row: `display: flex; align-items: baseline; justify-content: space-between; gap: 12px`
— `17px` Archivo Black title, `10px` mono year at 40% ink. Then `14px` description, then a
`10.5px` mono stack line in `#2c3fc0`.

| Title | Year | Description | Stack |
|---|---|---|---|
| Web-Slinger | 2025 | Real-time delivery routing dashboard. Cut dispatcher decision time by 40% and gave ops a map they stopped fighting. | React · WebSockets · Mapbox · Redis |
| Spider-Sense | 2024 | Anomaly detection for API traffic. Flags the weirdness before your pager does — median 90 seconds ahead of alerting. | Python · FastAPI · ClickHouse |
| Daily Bugle | 2023 | Static site generator for small newsroom teams. 200ms builds, zero config, no opinions about your CMS. | Rust · WASM · Markdown |

#### Tech stack — `03 / web-shooters`
Three labelled groups, flex column `gap: 18px`. Group label is `10px` mono uppercase,
`letter-spacing: .16em`, 45% ink, `margin-bottom: 9px`. Chips are `12px` mono,
`padding: 6px 11px`, `border-radius: 999px`, `gap: 7px`.

- **Front of house** — TypeScript, React, Next.js, Svelte, Canvas / WebGL — blue chips
  (`border: 1px solid rgba(44,63,192,.22); color: #2c3fc0; background: rgba(44,63,192,.06)`)
- **Back of house** — Node, Python, PostgreSQL, Redis, GraphQL — neutral chips
  (`border: 1px solid rgba(19,26,46,.14); color: rgba(19,26,46,.72); background: rgba(255,255,255,.5)`)
- **Keeping it airborne** — Docker, AWS, Terraform, Playwright — neutral; plus
  **`Rust — learning`** in red (`border: 1px solid rgba(207,33,49,.28); color: #cf2131;
  background: rgba(207,33,49,.05)`)

#### Experience — `04 / patrol log`
Flex column, `gap: 16px`. Each role: `padding-left: 16px` with a 2px left border — the current
role uses `rgba(207,33,49,.55)`, past roles `rgba(19,26,46,.16)`. Inside: `10.5px` mono date
range (red for current, 45% ink otherwise), `17px` Archivo Black role, `13px` `#2c3fc0`
company, `14px` description.

| Dates | Role | Company | Description |
|---|---|---|---|
| 2023 → NOW | Senior Frontend Engineer | Horizon Labs | Own the design system and the dashboard shell used by 40k daily users. Took first-paint from 3.1s to 0.9s and stopped the redesign from eating itself. |
| 2021 → 2023 | Frontend Engineer | Meridian | Built the checkout flow three times until it converted. Shipped an internal charting library that outlived the product it was for. |
| 2020 → 2021 | Junior Developer | Ostrich Digital | Agency work. Twenty-odd client sites, one very patient art director, and the year I learned what "responsive" actually costs. |

#### Education — `05 / training arc`
One card: `padding: 18px 19px; border-radius: 14px; border: 1px solid rgba(19,26,46,.10);
background: rgba(255,255,255,.55); margin-bottom: 18px`. Baseline row pairs
`B.Tech, Computer Science` (17px Archivo Black) with `2016 → 2020` (10.5px mono, 42% ink),
then `13.5px` `#2c3fc0` `State University`, then the description:

> Graduated with distinction. Final-year project on real-time graph rendering in the browser, which is roughly how this mask exists.

Below: label `Coursework worth mentioning`, then neutral `12px` mono chips —
Computer Graphics · Distributed Systems · HCI · Compilers.

#### Contact — `06 / signal`
Intro paragraph (`max-width: 56ch`):

> Point the searchlight anywhere below. I answer email fastest, usually within a day — sooner if the subject line is interesting.

Then a tile grid: `repeat(auto-fit, minmax(210px, 1fr))`, `gap: 11px`, `margin-bottom: 20px`.
Each tile is an `<a>`, flex column `gap: 4px`, `padding: 15px 16px; border-radius: 13px;
border: 1px solid rgba(19,26,46,.10); background: rgba(255,255,255,.55)`, hover
`border-color: rgba(207,33,49,.42)`. Contents: `9.5px` mono uppercase label (42% ink) over a
`14px/600` value.

Email → `you@yourdomain.com` (`mailto:`) · GitHub → `@yourhandle` ·
LinkedIn → `/in/yourhandle` · Elsewhere → `@yourhandle`.

Footer badge: `● AVAILABLE FOR WORK — Q4 2026` —
`display: inline-flex; align-items: center; gap: 9px; padding: 9px 15px;
border-radius: 999px; border: 1px solid rgba(207,33,49,.25);
background: rgba(207,33,49,.05); font-size: 11px; letter-spacing: .05em; color: #cf2131`.

---

## 3D Showpiece (center stage)

`grid-area: 2 / 2 / 3 / 3`, `position: relative`, `min-height: 0`, `overflow: hidden`.
A single absolutely-positioned mount (`inset: 0`) holds the WebGL canvas
(`display: block; width: 100%; height: 100%`).

> **Alignment note (learned the hard way):** the canvas host must exactly track the stage box.
> A stray inline `inset`/`width`/`height` on that element offsets *and* stretches the entire
> render, which reads as "the model isn't centered." Pin it to `position: absolute; top/left/
> right/bottom: 0; width: auto; height: auto` and size the renderer from the **canvas host's own
> bounding rect** (not the stage's `clientWidth`) so buffer aspect always equals display aspect.

### Renderer

```js
new THREE.WebGLRenderer({ antialias: true, alpha: true,
                          preserveDrawingBuffer: true, powerPreference: 'high-performance' })
pixelRatio       = min(devicePixelRatio, 2)
outputColorSpace = SRGBColorSpace
toneMapping      = ACESFilmicToneMapping
toneMappingExposure = 1.0            // tweakable 0.6–1.6
shadowMap        = { enabled: true, type: PCFSoftShadowMap }
```
Transparent background — the page's own gradients show through; the scene has no backdrop.

### Environment

`RoomEnvironment` through `PMREMGenerator` (blur `0.04`) assigned to `scene.environment`.
This neutral studio IBL is what makes the surfaces read as product photography. No visible
environment geometry.

### Lighting rig

| Light | Type | Color | Intensity | Position | Notes |
|---|---|---|---|---|---|
| Key | Directional | `0xfff5ea` | 2.5 | `(1.5, 2.4, 1.9)` | casts shadow; map `2048²`, `radius 5`, `bias -0.0008`, `normalBias 0.02`; ortho frustum `±1.6`, near `0.3`, far `12` |
| Fill | Directional | `0xe2ecff` | 0.6 | `(-2.1, 0.9, 1.4)` | cool, soft |
| Rim | Directional | `0xffffff` | 0.85 | `(-0.7, 1.3, -2.2)` | restrained back edge |
| Ambient | Hemisphere | `0xffffff` / `0x93a0b5` | 0.3 | — | sky/ground fill |

Warm key + cool fill + white rim = clean, premium, non-cinematic. No colored spotlights, no
bloom, no volumetrics.

### Grounding

Two stacked elements sell physical contact:

1. **Shadow catcher** — `PlaneGeometry(8, 8)`, `rotation.x = -π/2`, `receiveShadow: true`,
   `ShadowMaterial({ color: 0x131a2e, opacity: 0.2 })`. Catches the real cast shadow.
2. **Painted contact blob** — `PlaneGeometry(1, 1)` at `y = 0.0015`, `rotation.x = -π/2`,
   `MeshBasicMaterial` with a generated 256² radial-gradient canvas texture
   (`rgba(19,26,46,0.55)` center → `0.22` at 45% → transparent), `opacity: 0.42`,
   `depthWrite: false`. Scaled to `max(modelWidth, modelDepth) × 2.6` on both axes. This is the
   soft ambient-occlusion pool directly beneath the feet.

### Pedestal

Deliberately quiet infrastructure — a `Group` of two cylinders sharing one material:
`MeshStandardMaterial({ color: 0x161c2b, roughness: 0.62, metalness: 0.18, envMapIntensity: 0.5 })`.

| Part | Geometry | Position |
|---|---|---|
| Plate | `CylinderGeometry(0.2, 0.225, 0.022, 72)` | `y = 0.011` |
| Neck | `CylinderGeometry(0.085, 0.105, 0.05, 48)` | `y = 0.047` |

Both cast and receive shadows. Effective stand height (`standTop`) = `0.07` in model units;
the figure's feet rest exactly on it. Toggleable via the `showStand` prop (default on).

### The model

Source asset: an FBX Spider-Man **Homecoming suit** — a full standing figure, not a bust.
It is loaded at runtime by the user (drag-and-drop) and cached in IndexedDB, so it is **not
bundled in this handoff**. The prototype also probes `models/hero.glb` / `models/hero.gltf` on
load, which is the cleanest integration path for a real codebase: ship a converted GLB at a
known URL and load it directly.

Accepted formats: **GLB, GLTF, OBJ + MTL, FBX** — whole folders may be dropped, and every
relative texture/`.mtl`/`.bin` reference is rewritten onto object URLs via
`LoadingManager.setURLModifier`.

**Normalization applied on install** (reproduce this, or bake it into the exported asset):
1. Uniformly scale so total height = 1 unit.
2. Center on X and Z; drop `position.y` so the bounding-box minimum sits at `y = 0`.
3. Place the figure on top of the stand (`tilt.position.y = standTop`).
4. All meshes `castShadow` + `receiveShadow`, `frustumCulled = false`.

**Import cleanup** — these are real defects in the source asset; a converted GLB should have
them fixed at export time instead:
- **Rigify widgets removed.** ~130 `WGT-*` meshes (bone-control widgets, hidden in Blender but
  exported as real geometry) and stray `Sphere*` helpers are deleted. Mesh count drops
  144 → 14.
- **Skinned meshes baked.** Every `SkinnedMesh` is replaced by a plain `Mesh` in rest pose —
  this is a static display piece, and the FBX bind pose was collapsing the geometry.
- **Multi-material meshes without geometry groups collapsed to a single material.** The main
  `BODY` mesh declared 2 materials but 0 groups; three.js then issues *zero* draw calls and the
  mesh renders invisibly. This was the root cause of the "blank stage" bug.
- **Dead texture references dropped.** Any texture whose image resolved to 0×0 is nulled.

**Material handling.** The asset's own colors and surviving maps are kept, but legacy
Phong/Lambert is converted to `MeshStandardMaterial` (`roughness: 0.55`, `metalness: 0.06`) so
the studio IBL lights it correctly. `envMapIntensity: 0.7`, `side: DoubleSide`,
`shadowSide: FrontSide`. Bogus transparency (`opacity < 0.05`) and vertex-color flags with no
color attribute are corrected. `map`/`emissiveMap` are tagged `SRGBColorSpace`.

Because the dropped FBX arrived **without its texture files**, `base_color_texture` resolved
empty and the suit renders in **neutral studio greys** (a placeholder near-white is darkened to
`0x9aa2ae` so it doesn't disappear against the light page) with darker accent parts. Supplying
the texture folder — or a GLB with embedded textures — restores the red/blue suit with no code
change. The status readout appends `N textures missing — drop the folder` when this happens.

### Camera & framing

`PerspectiveCamera(fov 30, near 0.01, far 100)`. Framing is computed, never hard-coded:

- `modelFill` (default **82%**, range 70–86) is the fraction of stage **height** the model
  occupies. On narrow screens it's multiplied by `0.92`.
- Horizontal guard: the model may occupy at most `0.82` of stage width.
- Distance = `max(verticalFitDistance, horizontalFitDistance) × 1.02`, so the figure never
  clips or collides with the cards regardless of aspect ratio.
- Camera sits at `(0, centerY + extent × 0.045, distance)` looking at `(0, centerY, 0)` — a
  very slight high angle.
- Framing presets (`framing` prop): **Full figure** (default), **Bust**
  (`h .36, cy .82, w .52`), **Head** (`h .18, cy .915, w .27`), expressed as fractions of model
  height.

Reframing runs on resize, on prop change, and on a periodic check every 20 frames (this catches
fullscreen, zoom, and devtools changes that fire no observable resize event).

### Glass museum display case — PRESENT IN CODE, DISABLED

A `MeshPhysicalMaterial` vitrine exists in the source (`buildCase()` / `updateCase()`) but its
`showCase` prop **defaults to `false`**, so **the current design shows no glass case**. The
figure stands on its pedestal in open studio light. This is intentional — the case was tried
and removed.

If a target codebase reimplements the toggle, the specified glass is: `color 0xf5f8ff`,
`metalness 0`, `roughness 0.045`, `transmission 1`, `thickness 0.35`, `ior 1.52`,
`reflectivity 0.55`, `clearcoat 1`, `clearcoatRoughness 0.04`, `envMapIntensity 1.6`,
`attenuationDistance 2`, `FrontSide`, plus a `0xffffff` edge overlay at `opacity 0.3` and a slim
metallic foot (`0xe7ebf2`, `metalness 0.75`, `roughness 0.25`, `opacity 0.6`). **Do not build
this unless explicitly asked** — it is not part of the current design.

### Stage overlays

**Status overlay** (shown whenever the model isn't ready) — centered, `pointer-events: none`,
`padding: 22px`, flex column `gap: 12px`, `max-width: 38ch`, centered text:
- a `58×58px` tile, `border-radius: 16px`, `border: 1px dashed rgba(19,26,46,.26)`,
  `background: rgba(255,255,255,.4)`, containing `3D` in `9.5px` mono at 40% ink
- a `10px` mono uppercase status label in `#cf2131` — one of `Starting renderer`,
  `Loading model`, `Awaiting model`, or an error label
- a `13px` message (`line-height: 1.6`, 64% ink). Empty-state copy:
  *"Drop the HOMECOMING+SUIT folder here — or just the model file. Textures and .mtl resolve
  automatically, and it is remembered on reload."*
- a `9.5px` mono format hint at 34% ink: `GLB · GLTF · OBJ+MTL · FBX`

**Drag-over affordance:** `position: absolute; inset: 6px; border-radius: 18px;
border: 2px dashed rgba(207,33,49,.5); background: rgba(207,33,49,.045)`.

**Model readout** (when ready): pinned bottom-left across the stage width,
`pointer-events: none`, `9px` mono uppercase at 30% ink, `line-height: 1.5`,
`letter-spacing: .12em`. Format: `<filename> · N meshes · Nk tris`, plus the missing-texture
warning when applicable.

---

## Interactions & Behavior

| Interaction | Behavior |
|---|---|
| Card click | Opens that section's modal |
| `Get in touch` | Opens the Contact modal |
| Modal ✕ / backdrop click / **Escape** | Closes the modal |
| Card hover | `translateY(-3px)`, red-tinted border + lifted shadow, `.22s cubic-bezier(.2,.8,.2,1)` |
| Project row hover | `translateX(3px)`, red border, `.2s` |
| Contact / project / education tile hover | Border shifts to `rgba(207,33,49,.4–.42)` |
| Primary CTA hover | `translateY(-2px)`, deeper red shadow |
| Secondary CTA hover | Red border/background/text |
| Link default / hover | `#2c3fc0` → `#cf2131` |
| Cursor over the 3D stage | Subtle parallax — see below |
| Drag files onto the stage | Dashed red drop outline; drop loads the model |

### 3D parallax

Pointer position over the stage normalizes to `[-1, 1]` on both axes and is eased toward the
target at `0.055` per frame. Applied to the model group only:
`rotation.y = px × 0.07`, `rotation.x = py × 0.035` — roughly **±4° / ±2°**, restrained on
purpose. Leaving the stage eases back to zero. **No auto-rotation, no continuous animation.**
At rest the scene is a still composition. Toggleable via the `parallax` prop.

### Keyframes

```css
@keyframes panelIn { from { opacity:0; transform: translateY(16px) scale(.985) } to { opacity:1; transform:none } }
@keyframes veilIn  { from { opacity:0 } to { opacity:1 } }
@keyframes spin    { to { transform: rotate(360deg) } }   /* declared, currently unused */
```

---

## Responsive Behavior

Desktop is the priority. There is exactly **one breakpoint: `window.innerWidth < 820px`**,
applied imperatively (a JS resize handler rewriting grid properties), not via media queries.
A real implementation should express this as a CSS media query.

### Desktop (≥ 820px)
Three-column / three-row grid as specified. `height: 100vh`, `overflow: hidden` — nothing
scrolls. Center stage flexes to fill the middle row.

### Tablet & Mobile (< 820px)
- `grid-template-columns: 1fr` — single column, all `grid-area` assignments cleared
- `grid-template-rows: auto`, `height: auto`, `min-height: 100vh`, `overflow: visible`
  (the page becomes scrollable)
- The 3D stage takes a fixed `height: 54vh`
- `modelFill` is multiplied by `0.92` for extra breathing room
- Children reorder via an explicit source order:

| Order | Region |
|---|---|
| 0 | Hero title block |
| 1 | 3D showpiece stage |
| 2 | About |
| 3 | Projects |
| 4 | Tech stack |
| 5 | Experience |
| 6 | Education |
| 7 | Contact |
| 8 | CTA row |

The showpiece sits directly under the title on mobile; the CTAs move to the very bottom.
Modal panels are already fluid (`min(740px, 100%)`, `max-height: 84vh`) and need no changes.

---

## State Management

Component state:

| Key | Type | Purpose |
|---|---|---|
| `open` | `null \| 'about' \| 'projects' \| 'tech' \| 'experience' \| 'education' \| 'contact'` | which modal is showing |
| `status` | `'boot' \| 'loading' \| 'empty' \| 'ready' \| 'error'` | 3D stage lifecycle |
| `msg` | string | status/error message body |
| `name` | string | model readout, or error label |
| `drag` | boolean | drag-over affordance |

Tweakable props (design-tool controls; expose as component props or config):

| Prop | Editor | Default | Range |
|---|---|---|---|
| `framing` | enum | `Full figure` | Full figure / Bust / Head |
| `modelFill` | range % | `82` | 70–86 |
| `showCase` | boolean | **`false`** | — |
| `showStand` | boolean | `true` | — |
| `parallax` | boolean | `true` | — |
| `exposure` | range | `1` | 0.6–1.6 |

**Persistence:** the loaded model bundle is cached in IndexedDB
(db `portfolio-hero-model`, store `bundles`, key `bundle`) and restored on reload. In a real
codebase, prefer shipping a GLB as a static asset and dropping the drag-and-drop path entirely.

**No data fetching** — all copy is static. Only the 3D asset and Google Fonts load over the
network.

---

## Assets

| Asset | Source | Notes |
|---|---|---|
| Spider-Man Homecoming suit (FBX) | User-supplied, loaded at runtime from `C:\Users\jitee\Downloads\HOMECOMING+SUIT` | **Not included in this bundle.** Convert to GLB (Blender → File → Export → glTF 2.0, embed textures) and serve at `models/hero.glb`. Textures were missing in the version tested — including them restores the suit's real colors. |
| three.js `0.160.0` | `https://esm.sh/three@0.160.0` + `examples/jsm` loaders & `RoomEnvironment` | Replace with the codebase's own three.js dependency |
| Archivo, Archivo Black, JetBrains Mono | Google Fonts | Self-host if the codebase already does |
| Contact-shadow blob | Generated at runtime on a 256² canvas | No file needed |

No icon library. The only glyphs are the text characters `→`, `✕`, and `●`.

**Rights note:** the Spider-Man model and character are third-party intellectual property
(Marvel). This is fine for a personal, non-commercial portfolio in most contexts, but it is not
a licensed asset — worth confirming before any commercial or promotional use.

---

## Files

| File | What it is |
|---|---|
| `Portfolio.dc.html` | The complete design prototype — inline-styled template plus a JavaScript logic class holding the three.js scene, responsive handler, loaders, and state. Read as spec, not as code to copy. |
| `support.js` | Runtime for the proprietary design-component format. **Not included in this bundle and not needed in the target codebase** — it only exists so the prototype can render inside the design tool. |

Because the runtime isn't bundled, `Portfolio.dc.html` will not render standalone in a plain
browser — read it as source. To see the design running, open it in the original design session
and drag the `HOMECOMING+SUIT` folder onto the center stage. Screenshots can be added to this
bundle on request.

### Reading the prototype source

- Everything between `<x-dc>` and `</x-dc>` is the markup, styled entirely with inline
  `style` attributes. `style-hover` attributes are hover states — translate them to `:hover`
  rules or your styling solution.
- `<sc-if value="…">` blocks are conditional renders; `{{ name }}` holes are values supplied by
  the logic class's `renderVals()`.
- The `<script type="text/x-dc">` block is the logic class: 3D scene in `initScene()`, framing
  math in `frame()`, asset import cleanup in `install()` and `studioMaterial()`, the breakpoint
  in `applyResponsive()`.
