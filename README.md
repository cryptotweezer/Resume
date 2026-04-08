# Personal Portfolio — Andres Henao

Production full-stack portfolio and personal CMS for a Cybersecurity and AI Engineer. Live at [cv.andreshenao.com.au](https://cv.andreshenao.com.au).

## Overview

This is a Next.js 16 App Router application that serves as both a professional showcase and a live demonstration of full-stack engineering capabilities. All content — projects, blog posts, and toolkit entries — is database-driven and manageable through a custom admin dashboard without touching the codebase. An AI assistant named Boto answers visitor questions in real time via a floating chat widget on every page.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v3, shadcn/ui (Radix UI primitives) |
| Database | Supabase (PostgreSQL) via `postgres` driver |
| ORM | Drizzle ORM, Drizzle Kit |
| Auth | Clerk |
| AI | OpenAI GPT-3.5-Turbo (function calling) |
| Security | Arcjet (bot detection, rate limiting, WAF) |
| 3D | Three.js, React Three Fiber, @react-three/drei |
| Forms | React Hook Form, Zod |
| Email | Nodemailer |
| Deployment | Vercel (with Analytics and Speed Insights) |
| Package manager | pnpm |

## Project Structure

```
app/
  about/                  Resume and key achievements page
  admin/                  Admin dashboard (projects, toolkits, blog, leads)
  admin/toolkits/         Toolkit edit forms
  api/chat/               Boto AI assistant endpoint (OpenAI function calling)
  blog/                   Blog listing and [slug] detail pages
  contact/                Contact form (Nodemailer)
  projects/               Project listing and [slug] detail pages
  projects/[slug]/edit    Admin-only project edit form
  resources/tools/        Toolkit page
  page.tsx                Home page with Three.js globe

actions/                  Server actions — canonical location, do not use app/actions/
  contact-leads.ts        saveContactLead (public), getContactLeads, deleteContactLead
  projects.ts             Full CRUD for projects
  toolkits.ts             Full CRUD for toolkits

components/               Business and UI components
  ui/                     shadcn/ui primitives

context/
  ui-context.tsx          Global UI state (chat widget open/close)

lib/
  auth.ts                 isAdmin(), syncUserWithDatabase()
  db.ts                   Drizzle schema — single source of truth for all tables
  types.ts                Zod schemas and inferred TypeScript types
  utils.ts                Shared utilities
```

## Database Schema

Schema is defined in `lib/db.ts`. Tables:

| Table | Purpose |
|---|---|
| `subscribers` | Newsletter subscribers |
| `users` | Auth users synced from Clerk, with role-based access |
| `blog_posts` | Blog content |
| `projects` | Portfolio projects with JSON columns for tech stack, features, and challenges |
| `toolkits` | Tools displayed on the resources page |
| `contact_leads` | Messages collected by Boto via the chat widget |

The `projects` table has a PostgreSQL trigger (`trg_projects_auto_slug`) that auto-generates URL slugs from the title on INSERT when no slug is provided. This allows external tools (such as Claude with Supabase MCP) to insert projects without knowledge of internal slug conventions.

## Authentication and Authorization

Clerk handles authentication. The first user who signs up is automatically assigned the `admin` role via `syncUserWithDatabase()` in `lib/auth.ts` — no manual configuration required. Admin status is determined by querying the `users` table, not Clerk metadata. All destructive server actions call `isAdmin()` before executing.

## Boto AI Assistant

Boto is powered by OpenAI GPT-3.5-Turbo and has access to a single function tool: `save_contact_lead`. It can only write to the `contact_leads` table — no other database access is permitted. On every request, the chat API fetches the latest projects and blog posts from the database and injects them into the system prompt, giving Boto up-to-date context about the portfolio.

When a visitor asks about contacting Andres, Boto collects name, email, phone (optional), subject (optional), and message conversationally — one field at a time — confirms the details with the user before saving, then calls the function tool to persist the lead. All collected leads are visible and deletable from `/admin`.

The chat widget requires Clerk sign-in to use.

## Development

```bash
pnpm install
pnpm dev                        # Start dev server with Turbopack
pnpm build                      # Production build
pnpm lint                       # Lint app/, components/, lib/, hooks/
pnpm dev --hostname 0.0.0.0     # Expose to local network (mobile testing)
```

## Database Migrations

```bash
pnpm drizzle-kit generate       # Generate migration files from schema changes in lib/db.ts
pnpm drizzle-kit migrate        # Apply pending migrations to the database
pnpm drizzle-kit studio         # Open Drizzle Studio (visual database browser)
```

If `drizzle-kit migrate` fails due to missing migration history on an existing database, apply schema changes directly using a Node.js script with the `postgres` package and the `DATABASE_URL` environment variable.

## Environment Variables

```
DATABASE_URL                        Supabase PostgreSQL connection string (transaction pooler)
DATABASE_URL_DIRECT                 Direct connection URL for migrations (optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
OPENAI_API_KEY
```

## Deployment Notes

Deployed on Vercel. `typescript.ignoreBuildErrors: true` is set in `next.config.mjs` so TypeScript errors do not block production builds. Images are unoptimized. The path alias `@/` maps to the project root.
