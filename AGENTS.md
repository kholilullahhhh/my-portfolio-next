# AGENTS.md

Next.js portfolio site (App Router) for Muhammad Kholilullah. Static export, no backend.

## Commands

- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build` (static export to `out/`; also runs type checking)
- Lint: `npm run lint` (i.e. `next lint`). **Build ignores ESLint** (`eslint.ignoreDuringBuilds: true` in `next.config.js`), so run lint explicitly — it will not be caught by builds/CI.
- Typecheck: `npx tsc --noEmit` (no npm script for this).
- No test framework or test scripts exist.

## Static export (`output: 'export'`)

- `next.config.js` sets `output: 'export'` and `images.unoptimized: true`. Produces a fully static `out/` directory.
- `npm run start` (`next start`) does **not** work with static export — preview the build by serving `out/` (e.g. `npx serve out`).
- No server features, API routes, or dynamic image optimization — avoid adding any.
- New images must be added as static files in `public/` and referenced by path.

## App structure

- `/` (app/page.tsx) just redirects to `/home`. All real pages are App Router routes: `home`, `about`, `projects`, `contact`.
- Pages are largely `"use client"` components using framer-motion; `Navigation` + `Footer` live in `app/layout.tsx` (note: `contact/page.tsx` also imports `Footer` itself).
- Path alias: `@/*` maps to repo root. Import like `@/components/ui/button`, `@/lib/utils`.
- shadcn/ui components in `components/ui/` (style "default", RSC-compatible). Add new ones with `npx shadcn-ui@latest add <name>`.

## Content

- Portfolio data (projects, skills, testimonials) in `lib/data.ts`; types in `types/index.ts`.
- Contact form (`app/contact/page.tsx`) is simulated: on submit it waits 1.5s, shows a toast, and `console.log`s — no API/email backend.
- README claims Next.js 14 but package.json pins `next@13.5.1`. Trust package.json. README also still references placeholder branding (e.g. `johndoe.dev` URLs, placeholder images) in `app/layout.tsx` metadata and `lib/data.ts`.