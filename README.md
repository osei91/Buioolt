# Buioolt

A landing page for a service that helps people migrate AI-builder apps (Bolt, Lovable, Replit, v0, AI Studio, Base44, etc.) off expensive platform lock-in and onto self-hosting.

Built with React, Tailwind CSS, and Vite.

## What's on the page

- **Hero** with a rotating, animated cost ledger comparing "stay on the builder" vs "self-host" for different tools.
- **Problem section** explaining the lock-in issue in plain language.
- **How it works** — three-step process.
- **Lock-in score calculator** — visitors paste their `package.json` and get a 0–100 score based on which dependencies tie them to a specific platform (Supabase, Clerk, Replit packages, Base44 SDK, Firebase, etc.), with the specific findings listed.
- **Cost table** — a static before/after comparison across all the listed builders.
- **Pricing** — two flat-fee tiers (Essential for prototypes/dev, Production Secure for live apps).
- **Migration request form** — collects tool/stack, app status, email, and primary goal, with a live cost preview that updates as the visitor picks a tool.

## Running it locally

```bash
npm install
npm run dev
```

Open the printed local URL. To build for production:

```bash
npm run build
```

The output goes to `dist/`, which you can deploy to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host.

## Email setup status

The Formspree endpoint is already set to `https://formspree.io/f/mlgyrlgr` in `src/components/MigrateForm.jsx`. If that's your form (pointed at your Gmail), you're done. The first submission triggers a one-time confirmation email from Formspree — confirm it, and every form submission after that lands straight in your inbox.

If you ever need to swap it for a different Formspree form or another service (Getform, Web3Forms, etc.), just update the `FORM_ENDPOINT` constant near the top of that file.

## Editing the numbers

All the cost assumptions live in two files, so you can tune them without touching any component:

- `src/data/builders.js` — the list of builders, their estimated monthly lock-in cost, and the flat migration fee.
- `src/data/pricing.js` — the two pricing tiers (Essential / Production Secure) and their feature lists.
- `src/lib/cost.js` — the year-one math (stay cost vs. migrate cost vs. savings).

The lock-in score logic (which dependency names raise the score, and by how much) lives in `src/lib/lockInScore.js`.

## Project structure

```
src/
  components/      UI sections (Hero, Problem, HowItWorks, LockInCalculator, CostTable, MigrateForm, Footer, Navbar, Counter)
  data/            Builder cost reference data
  lib/              Cost math, lock-in scoring, scroll-reveal hook
```
