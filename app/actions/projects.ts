"use server";

import { db, projects } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { asc, desc, eq, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ProjectCreateInput, projectCreateInputSchema, ProjectFeature } from "@/lib/types";
import { generateSlug } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProjectRow = {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  longDescription: string | null;
  icon: string;
  goal: string | null;
  techStack: string[] | null;
  features: ProjectFeature[] | null;
  challenges: ProjectFeature[] | null;
  projectUrl: string | null;
  linkedinUrl: string | null;
  coverImage: string | null;
  status: string | null;
  externalLink: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type ActionResult<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapRow(row: typeof projects.$inferSelect): ProjectRow {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.longDescription ?? null,
    icon: row.icon,
    goal: row.goal ?? null,
    techStack: Array.isArray(row.techStack) ? (row.techStack as string[]) : null,
    features: Array.isArray(row.features) ? (row.features as ProjectFeature[]) : null,
    challenges: Array.isArray(row.challenges) ? (row.challenges as ProjectFeature[]) : null,
    projectUrl: row.projectUrl ?? null,
    linkedinUrl: row.linkedinUrl ?? null,
    coverImage: row.coverImage ?? null,
    status: row.status ?? null,
    externalLink: row.externalLink ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

async function buildUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const base = generateSlug(title);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, candidate))
      .limit(1);

    if (existing.length === 0 || existing[0].id === excludeId) break;
    candidate = `${base}-${counter++}`;
  }

  return candidate;
}

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<ProjectRow[]> {
  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
  return rows.map(mapRow);
}

export async function getProjectBySlug(slugOrId: string): Promise<ProjectRow | null> {
  const numericId = parseInt(slugOrId, 10);

  const rows = await db
    .select()
    .from(projects)
    .where(
      isNaN(numericId)
        ? eq(projects.slug, slugOrId)
        : or(eq(projects.slug, slugOrId), eq(projects.id, numericId))
    )
    .limit(1);

  return rows.length > 0 ? mapRow(rows[0]) : null;
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createProject(
  input: ProjectCreateInput
): Promise<ActionResult<ProjectRow>> {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, message: "Unauthorized." };
  }

  const parsed = projectCreateInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.message };
  }

  const d = parsed.data;
  const slug = await buildUniqueSlug(d.title);

  const [inserted] = await db
    .insert(projects)
    .values({
      title: d.title,
      slug,
      description: d.description,
      longDescription: d.longDescription || null,
      icon: d.icon,
      goal: d.goal || null,
      techStack: d.techStack ?? null,
      features: d.features ?? null,
      challenges: d.challenges ?? null,
      projectUrl: d.projectUrl || null,
      linkedinUrl: d.linkedinUrl || null,
      coverImage: d.coverImage || null,
      status: d.status ?? null,
    })
    .returning();

  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true, message: "Project created successfully!", data: mapRow(inserted) };
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateProject(
  id: number,
  input: ProjectCreateInput
): Promise<ActionResult<ProjectRow>> {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, message: "Unauthorized." };
  }

  const parsed = projectCreateInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.message };
  }

  const d = parsed.data;
  const existing = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (existing.length === 0) {
    return { success: false, message: "Project not found." };
  }

  // Regenerate slug only if title changed
  const slug =
    existing[0].title !== d.title
      ? await buildUniqueSlug(d.title, id)
      : existing[0].slug;

  const [updated] = await db
    .update(projects)
    .set({
      title: d.title,
      slug,
      description: d.description,
      longDescription: d.longDescription || null,
      icon: d.icon,
      goal: d.goal || null,
      techStack: d.techStack ?? null,
      features: d.features ?? null,
      challenges: d.challenges ?? null,
      projectUrl: d.projectUrl || null,
      linkedinUrl: d.linkedinUrl || null,
      coverImage: d.coverImage || null,
      status: d.status ?? null,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  revalidatePath("/projects");
  revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/admin");

  return { success: true, message: "Project updated successfully!", data: mapRow(updated) };
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteProject(id: number): Promise<ActionResult> {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, message: "Unauthorized." };
  }

  await db.delete(projects).where(eq(projects.id, id));

  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true, message: "Project deleted." };
}

// ---------------------------------------------------------------------------
// Seed - The Watchtower sample project
// ---------------------------------------------------------------------------

export async function seedWatchtowerProject(): Promise<ActionResult> {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, message: "Unauthorized." };
  }

  const slug = "the-watchtower";
  const existing = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, message: "The Watchtower already exists." };
  }

  await db.insert(projects).values({
    title: "The Watchtower",
    slug,
    description:
      "Active Defense node and web honeynet for real-time threat hunting. Detects, classifies, and isolates malicious activity using AI and deception technology.",
    longDescription: `The Watchtower is a production-grade cybersecurity project built as an active defense node and web honeynet. It was designed to do more than passively log attacks - it actively engages, tracks, and responds to adversaries in real time.

The system combines deception technology, edge computing, and an AI agent (Sentinel-02) that adapts its behavior based on the accumulated threat score of each visitor. Attackers who cross the 90% risk threshold are permanently logged in a gamified "Wall of Infamy" that survives forensic wipes.

Built entirely as a full-stack application, The Watchtower demonstrates the intersection of cybersecurity architecture, AI integration, and modern web development - all deployed on a serverless edge infrastructure.`,
    icon: "Shield",
    goal: "Build a production-grade honeypot and active threat intelligence platform that not only detects attackers but dynamically engages them, fingerprints their behavior, and creates persistent adversary profiles - demonstrating real-world offensive and defensive security techniques in a live environment.",
    techStack: [
      "Next.js 15.1",
      "React 19",
      "TypeScript",
      "Supabase (PostgreSQL)",
      "Drizzle ORM",
      "OpenAI GPT-4o",
      "Arcjet",
      "Clerk",
      "Tailwind CSS v4",
      "Vercel",
    ],
    features: [
      {
        title: "The Triple Lock",
        description:
          "Three-layer defense architecture: Binary-Ghost (memory alteration detection that identifies if a bot is manipulating the DOM), Shadow-Field (hidden decoy form fields that human users never see but bots fill in), and Ghost-Key (fake social-engineered debug routes that lure attackers into revealing their intent).",
      },
      {
        title: "Sentinel-02 (Risk-Adaptive AI)",
        description:
          "An AI agent powered by GPT-4o that dynamically changes its personality and responses - from helpful and boring, to hostile and deceptive - based on the attacker's accumulated risk score and which endpoints they have breached. The higher the score, the more aggressive Sentinel-02 becomes.",
      },
      {
        title: "Infamy Engine & Fingerprinting",
        description:
          "Tracks adversary paths via encrypted cookies and server-side sessions, assigning dynamic Risk Scores based on real-time interactions with Arcjet's WAF. Attackers who reach 90% risk are added to the gamified Wall of Infamy. These profiles persist even if the attacker clears cookies or changes IPs.",
      },
      {
        title: "War Room Dashboard",
        description:
          "A real-time command center with vectorized heatmaps, live request streams, and performance telemetry. Calculates database stress levels using Drizzle ORM query metrics and displays attacker geography, frequency patterns, and endpoint hit maps.",
      },
      {
        title: "Edge Infrastructure & Streaming AI",
        description:
          "Orchestrates edge computing across Vercel's global network, server-to-client text streaming for AI responses, and GDPR-compliant data retention pipelines - ensuring the system performs at scale without compromising legal obligations.",
      },
    ],
    challenges: [
      {
        title: "Real-Time Threat Classification at the Edge",
        description:
          "Designing an AI that could accurately assess threat severity required multi-signal analysis: combining Arcjet scores, request header fingerprints, endpoint access sequences, and behavioral patterns - all evaluated in milliseconds at the edge without impacting legitimate user experience.",
      },
      {
        title: "Persistent Attacker Tracking Across Sessions",
        description:
          "Building a fingerprinting system that survives forensic wipes (cookie clears, IP changes, browser switches) while remaining GDPR-compliant was a significant architectural challenge. The solution uses encrypted session tokens with server-side state stored in Supabase, combined with heuristic behavioral scoring.",
      },
    ],
    projectUrl: "https://sentinel.andreshenao.com.au",
    linkedinUrl: null,
    coverImage: null,
    status: "Live",
  });

  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true, message: "The Watchtower sample project created!" };
}

// ---------------------------------------------------------------------------
// Clear all projects (admin only - destructive)
// ---------------------------------------------------------------------------

export async function clearAllProjects(): Promise<ActionResult> {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, message: "Unauthorized." };
  }

  await db.delete(projects).where(sql`1=1`);

  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true, message: "All projects deleted." };
}
