@AGENTS.md

# Mantis Website Redesign

Marketing/website project. Deployed on Vercel (project `mantis-website-redesign`).
GitHub: https://github.com/WaFu1029/MantisBiotechWebsiteRedesign — pushes to `main` auto-deploy to production; other branches/PRs get preview URLs.

## Stack
- Next.js 16 (App Router, `src/` dir, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (config lives in `src/app/globals.css`, no tailwind.config file)
- shadcn/ui — add components with `npx shadcn@latest add <name>` (they land in `src/components/ui/`)
- `cn()` helper in `src/lib/utils.ts`; import alias `@/*` → `src/*`

## Commands
- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — production build (run before deploying to catch errors)
- `npm run lint` — ESLint
- `vercel` — preview deploy; `vercel --prod` — production deploy
- `vercel env pull .env.local` — sync env vars from Vercel

## Conventions
- Prefer Server Components; add `"use client"` only when a component needs state/effects/browser APIs.
- Use `next/image` for images and `next/font` for fonts.
- Put static assets in `public/`.
- Never commit `.env*` files; add secrets with `vercel env add`.
