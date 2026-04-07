# Louis Miguel Bernal — Portfolio

A sleek, dark-themed personal portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- **Dark minimal aesthetic** with green accent (`#4af2a1`) and soft blue secondary
- **Animated typing effect** in the hero with rotating role titles
- **Scroll-triggered animations** on all sections (fade-up, stagger)
- **Animated skill bars** that fill on scroll
- **Sticky navbar** with blur glass effect on scroll
- **Project cards** — 2 featured + 4 smaller cards with hover effects
- **Experience timeline** with active dot indicator
- **Contact form** with send animation
- **Noise texture overlay** for depth
- Fully responsive, mobile-first layout

## 📁 Structure

```
src/
  app/
    page.tsx          ← Main page (assembles all sections)
    layout.tsx        ← Metadata, fonts, global layout
    globals.css       ← CSS vars, Tailwind base, animations, scrollbar
  components/
    Navbar.tsx        ← Sticky nav with mobile menu
    Hero.tsx          ← Typing animation, stats, CTAs
    About.tsx         ← Bio + work experience timeline
    Projects.tsx      ← Featured + grid project cards
    Skills.tsx        ← Animated skill bars + tech tags
    Contact.tsx       ← Contact form
    Footer.tsx        ← Social links + credits
public/
  profile.jpg         ← Your profile photo (add here)
  resume.pdf          ← Your resume (add here)
postcss.config.mjs
tailwind.config.ts
tsconfig.json
next.config.mjs
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## 🎨 Customization

### 1. Update your info
Edit `src/components/Hero.tsx` — change name, bio, and roles array.

### 2. Add your projects
Edit `src/components/Projects.tsx` — update the `projects` array with your real work.

### 3. Update experience
Edit `src/components/About.tsx` — update the `experience` array.

### 4. Update skills
Edit `src/components/Skills.tsx` — adjust `skillGroups` and `techStack`.

### 5. Add your assets
- Drop `profile.jpg` in `/public/`
- Drop `resume.pdf` in `/public/`

### 6. Update metadata
Edit `src/app/layout.tsx` — update title, description, and OG metadata.

### 7. Update contact links
Edit `src/components/About.tsx` and `src/components/Footer.tsx` with your real links.

## 🌐 Deploy

```bash
# Deploy to Vercel (recommended)
npx vercel

# Or build for production
npm run build
npm start
```

## 🖌 Color Palette

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#080b0f` | Page background |
| `--accent` | `#4af2a1` | Primary accent (green) |
| `--accent-2` | `#7eb8f7` | Secondary accent (blue) |
| `--text` | `#e8edf2` | Primary text |
| `--text-muted` | `#6b8299` | Secondary text |

## 🔤 Fonts

- **DM Serif Display** — headings (elegant, editorial)
- **Syne** — body / nav (geometric, modern)
- **DM Mono** — labels, tags, code (clean monospace)
