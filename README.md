# Jiteen Mohanty — Portfolio

A polished, product-grade personal portfolio for **Jiteen Mohanty**, Full Stack Engineer & Product Builder. Built to feel like a software product, not a résumé page — with light/dark theming, subtle Framer Motion, detailed project case studies, a journey timeline, and a hidden terminal easter egg.

> Inspiration: Linear · Stripe · Vercel · Raycast · Notion.

---

## ✨ Features

- **11 sections** — Hero, About, Experience, Projects, Skills, Education, Journey, Fun Facts, Resume, Contact, Footer.
- **Project case studies** — dedicated `/projects/:slug` pages with overview, problem/solution, features, **architecture diagrams** (layered + microservices), challenges, and results.
- **Light / dark theme** — system-aware, persisted, no flash of incorrect theme.
- **Hidden terminal** — type `whois jiteen` anywhere (or press `Ctrl`/`⌘` + `K`). Commands: `help`, `whois`, `projects`, `skills`, `music`, `future`, `social`, `resume`, `secret`, `clear`, `exit`.
- **Motion** — staggered reveals, hover elevation, animated hero "systems" graphic, timeline — all respecting `prefers-reduced-motion`.
- **SEO** — Open Graph + Twitter cards, JSON-LD `Person` schema, generated `og-image.png`, web manifest, semantic HTML.
- **Accessible** — keyboard nav, skip-to-content link, ARIA labels, visible focus states, color-contrast-aware tokens.
- **Responsive** — mobile-first through ultra-wide.

---

## 🧰 Tech Stack

| Area        | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | React 18 + Vite 5                       |
| Styling     | Tailwind CSS 3 (CSS-variable tokens)    |
| Animation   | Framer Motion 11                        |
| Routing     | React Router 6                          |
| Icons       | lucide-react                            |
| Deploy      | Vercel (SPA rewrites included)          |

Frontend-only. All content lives in typed-ish data modules under `src/data/`, so a backend/CMS can be added later without touching components.

---

## 🚀 Getting Started

```bash
# install
npm install

# dev server  → http://localhost:5173
npm run dev

# production build → ./dist
npm run build

# preview the production build
npm run preview
```

Requires Node 18+ (built and tested on Node 20).

---

## 📁 Project Structure

```
portfolio/
├── public/                 # static assets
│   ├── resume.pdf          # ← your resume (served at /resume.pdf)
│   ├── favicon.svg
│   ├── og-image.png        # social share image (1200×630)
│   └── apple-touch-icon.png
├── src/
│   ├── animations/         # shared Framer Motion variants
│   ├── components/
│   │   ├── common/         # Button, Badge, Reveal, ThemeToggle, Icon, …
│   │   ├── layout/         # Navbar, Footer, ScrollManager
│   │   ├── projects/       # ProjectCard, ProductMock, ArchitectureDiagram, Gallery
│   │   ├── sections/       # Hero, About, Experience, … Contact
│   │   └── terminal/       # hidden terminal easter egg
│   ├── constants/          # nav links, section ids
│   ├── data/               # ← all content (edit these)
│   ├── hooks/              # useTheme, useScrollSpy, useEasterEgg, …
│   ├── pages/              # Home, ProjectDetail, NotFound
│   ├── theme/              # ThemeProvider
│   ├── utils/              # cn, accents
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # design tokens + base styles
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## ✏️ Editing Content

Everything is data-driven — no need to touch components:

| What                | File                      |
| ------------------- | ------------------------- |
| Name, bio, socials  | `src/data/profile.js`     |
| Work experience     | `src/data/experience.js`  |
| Projects / case studies | `src/data/projects.js` |
| Skills              | `src/data/skills.js`      |
| Education           | `src/data/education.js`   |
| Journey timeline    | `src/data/timeline.js`    |
| Fun facts           | `src/data/funFacts.js`    |
| Terminal responses  | `src/data/terminal.js`    |

### Adding project screenshots

Project galleries currently show an elegant **representative mockup** (no real screenshots shipped). To add real images:

1. Drop images in `public/projects/<slug>/`.
2. Add them to that project's `gallery` array in `src/data/projects.js`:
   ```js
   gallery: [
     { src: '/projects/home-hub/dashboard.png', alt: 'Security dashboard' },
     { src: '/projects/home-hub/visitor.png', alt: 'Visitor approval' },
   ]
   ```
   The gallery automatically turns into a carousel when images are present.

### Replacing the resume

Replace `public/resume.pdf`. The Hero, Navbar, Resume section, and terminal `resume` command all link to `/resume.pdf`.

---

## 🌐 Deploy to Vercel

**Option A — Dashboard**

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset auto-detects **Vite**. Defaults are correct:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy**. `vercel.json` already adds SPA rewrites so `/projects/...` deep links work.

**Option B — CLI**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### After deploying

Update the absolute URLs to your real domain in:
- `index.html` — `og:url`, `twitter:image`, `canonical`, JSON-LD `url`
- `public/og-image.png` is already generated; regenerate if you rebrand.

Also deployable as-is to **Netlify** (publish dir `dist`, with an SPA redirect) or **GitHub Pages** (add a `base` in `vite.config.js`).

---

## 🥚 Easter Egg

Type **`whois jiteen`** anywhere, or hit **`Ctrl`/`⌘` + `K`**. Try `projects`, `skills`, `music`, `secret`.

---

## 📝 Notes on content

A couple of details were reconciled between the résumé and the brief: graduation is shown as **June 2024** (B.Tech, SOA University), and Project 3 is titled **LegalConnectIndia** (HackerWar 4.0 winner). Adjust any of this in `src/data/`.

---

Built with React, Tailwind & Framer Motion — and a little AI in the loop. 🤖
