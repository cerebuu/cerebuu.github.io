# Caleb Adriel M. Tingson — Portfolio

An interactive, game-inspired portfolio built for AT1. It presents my background, technical skills, selected projects, leadership and work experience, certifications, contact details, and required HTML/CSS course activities. Visitors can explore the Three.js world or use the accessible, scrollable **Resume Mode**.

## Live site

[https://cerebuu.github.io/](https://cerebuu.github.io/)

## Included AT1 activities

- HTML Activity 1.1 — Fashion Blog
- HTML Activity 1.2 — Wine Festival Schedule
- CSS Activity 2.1 — Davies Burger

The activities are available from the portfolio's Resume Mode and are published as static pages under `static/activities/` and `static/Activity/Burger/`.

## Technology

- HTML5 and CSS3, including Flexbox, Grid, responsive media queries, and accessible focus styles
- JavaScript, Three.js, Cannon.js, GSAP, and Howler
- Vite for local development and production builds
- GitHub Pages for deployment

## Run locally

Prerequisite: Node.js 18 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use **Resume Mode** to review the text-first, keyboard-accessible version of the portfolio.

## Build for production

```bash
npm run build
```

This creates the production-ready `dist/` folder. To publish the current production build to GitHub Pages:

```bash
npm run deploy
```

After deployment, verify the homepage and each course activity returns successfully before submitting.

## Project structure

- `src/` — Vite application, portfolio content, Three.js experience, and styles
- `src/content.js` — single source of truth for portfolio content shown in Resume Mode
- `src/activities/` — course activity metadata used by the portfolio
- `static/` — public assets, activity pages, documents, models, and audio
