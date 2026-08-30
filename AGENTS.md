# AGENTS.md

Personal CV / portfolio for Andres Henao. Next.js 16 App Router, deployed on Vercel at
https://cv.andreshenao.com.au.

## Before touching the database

Read `C:\Users\crypt\.codex\skills\andres-supabase\SKILL.md` and then only
`references/resume.md`. It is the authority on the database layout and the rules of
engagement.

The short version:

- One Supabase project, `icbgsbjgkiwoegrfychc`, shared by three unrelated apps separated
  by schema: **`resume`** (this repo), `pis` and `awesome`. `public` is empty by design.
- **This repo means the `resume` schema only.** Never write to `pis` or `awesome`.
- **Schema-qualify every statement.** Both `resume.projects` and `pis.projects` exist and
  are unrelated (`resume.projects.id` is `integer`, `pis.projects.id` is `uuid`).
- Reads and INSERT/UPDATE need no confirmation. **DELETE, TRUNCATE and DDL always do.**
- `drizzle.config.ts` sets `schemaFilter: ["resume"]`. Removing it makes drizzle-kit
  generate `DROP` statements for the `pis` tables.

## Cache invalidation is automatic

The public pages are statically prerendered and CDN-cached, so a database write is not
visible to visitors until the cache is purged. Database triggers handle that on their own
(`resume.notify_revalidate()` → `POST /api/revalidate` via pg_net). **Do not call anything
by hand after writing.** See the "Caching / ISR" section of `CLAUDE.md` if something is
not showing up.

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm lint         # lint app/, components/, lib/, hooks/
```

There are no tests in this project.

## Conventions

- Server actions live in `actions/` at the root. `app/actions/` is an unused duplicate:
  do not write there.
- shadcn/ui primitives in `components/ui/`, business components in `components/`.
- Radix `Select` cannot take `value=""`. Use `value="none"` as the sentinel for optional
  selects and convert to `undefined` on submit.
- Do not use em dashes in any output: UI copy, docs, commit messages.
