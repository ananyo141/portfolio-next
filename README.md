# ananyobrata.vercel.app

Personal site and blog. Next.js 16 (App Router), React 19, Tailwind CSS 4, Sanity for essays, SMTP contact form.

## Stack

- **Framework:** Next.js 16 with Turbopack, TypeScript, Node ≥ 24
- **Styling:** Tailwind v4 `@theme inline` tokens in `src/app/globals.css`, light/dark via `html.dark`
- **Fonts:** Bricolage Grotesque, Instrument Serif, JetBrains Mono (`next/font`)
- **Content:** Sanity (`/studio` embedded), Portable Text; projects, experience and skills live in `src/data/*.json`
- **Email:** Nodemailer + React Email templates behind `/api/contact`

## Getting started

```sh
yarn install
cp .env.example .env.local   # fill in the values below
yarn dev                     # http://localhost:3000
```

| Variable                                                                | Purpose                                |
| ----------------------------------------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`           | Sanity project for the blog and Studio |
| `NEXT_PUBLIC_SANITY_API_VERSION`                                        | Optional, defaults in `sanity/env.ts`  |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_RECEIVER` | SMTP for the contact form              |

## Scripts

| Command                                  | What it does                                          |
| ---------------------------------------- | ----------------------------------------------------- |
| `yarn dev` / `yarn build` / `yarn start` | Next.js dev server, production build, serve the build |
| `yarn typecheck`                         | `tsc --noEmit`                                        |
| `yarn lint` / `yarn lint:fix`            | ESLint over `src`                                     |
| `yarn format` / `yarn format:check`      | Prettier                                              |

Husky runs lint-staged on commit and commitlint on the message (Conventional Commits, header ≤ 72 chars).

## Layout

```
src/
  app/          routes: /, /blog, /blog/[slug], /studio, /api/contact, feed.xml, sitemap, icons
  components/   one file per section (hero, marquee, shell, projects, experience, …)
  lib/          pure helpers (blog summaries, project filters, trace geometry, time) + hooks
  data/         projects.json, experience.json, skills.json, site.json, contact.json
  network/      Sanity GROQ queries
sanity/         schema and client config
```

## Content

- **Essays** come from Sanity. Each post has `title`, `slug`, `publishedAt`, `excerpt`, optional `pullQuote`, `categories` and a Portable Text `body`. Categories map onto the blog's topic filters; when `pullQuote` is empty a sentence is picked from the body automatically.
- **Projects** are static in `src/data/projects.json`. `featured` marks the hero card, `archived` moves a project into the collapsed archive list, and `youtube` / `live` / `github` drive the links.
- The sitemap, RSS feed and Open Graph images are generated from the same Sanity data. Pages and the sitemap revalidate on a schedule; the feed is served on demand.

## Deploy

Hosted on Vercel. Pushes to `master` deploy; the production domain is set in `src/data/site.json`.
