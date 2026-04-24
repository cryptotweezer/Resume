"use server";

import { db, projects } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { desc, eq, or } from "drizzle-orm";
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
  repoUrl: string | null;
  linkedinUrl: string | null;
  coverImage: string | null;
  status: string | null;
  showInLab: boolean;
  labRole: string | null;
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
    slug: row.slug ?? null,
    description: row.description,
    longDescription: row.longDescription ?? null,
    icon: row.icon,
    goal: row.goal ?? null,
    techStack: Array.isArray(row.techStack) ? (row.techStack as string[]) : null,
    features: Array.isArray(row.features) ? (row.features as ProjectFeature[]) : null,
    challenges: Array.isArray(row.challenges) ? (row.challenges as ProjectFeature[]) : null,
    projectUrl: row.projectUrl ?? null,
    repoUrl: row.repoUrl ?? null,
    linkedinUrl: row.linkedinUrl ?? null,
    coverImage: row.coverImage ?? null,
    status: row.status ?? null,
    showInLab: row.showInLab,
    labRole: row.labRole ?? null,
    externalLink: row.externalLink ?? null,
    createdAt: row.createdAt ?? null,
    updatedAt: row.updatedAt ?? null,
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

export async function getLabProjects(): Promise<ProjectRow[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.showInLab, true))
    .orderBy(projects.createdAt);
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
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  const parsed = projectCreateInputSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.message };

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
      repoUrl: d.repoUrl || null,
      linkedinUrl: d.linkedinUrl || null,
      status: d.status ?? null,
      showInLab: d.showInLab ?? false,
      labRole: d.labRole || null,
    })
    .returning();

  revalidatePath("/projects");
  revalidatePath("/about");
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
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  const parsed = projectCreateInputSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.message };

  const d = parsed.data;
  const existing = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (existing.length === 0) return { success: false, message: "Project not found." };

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
      repoUrl: d.repoUrl || null,
      linkedinUrl: d.linkedinUrl || null,
      status: d.status ?? null,
      showInLab: d.showInLab ?? false,
      labRole: d.labRole || null,
      createdAt: d.createdAt ? new Date(d.createdAt) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  revalidatePath("/projects");
  if (updated.slug) revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/about");
  revalidatePath("/admin");

  return { success: true, message: "Project updated!", data: mapRow(updated) };
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteProject(id: number): Promise<ActionResult> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/admin");

  return { success: true, message: "Project deleted." };
}

