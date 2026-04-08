"use server";

import { db, toolkits } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { asc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ToolkitCreateInput, toolkitCreateInputSchema } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToolkitRow = {
  id: number;
  name: string;
  category: string;
  description: string;
  body: string;
  icon: string;
  url: string;
  urlLabel: string;
  secondaryUrl: string | null;
  secondaryLabel: string | null;
  sortOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type ActionResult<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mapRow(row: typeof toolkits.$inferSelect): ToolkitRow {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    body: row.body,
    icon: row.icon,
    url: row.url,
    urlLabel: row.urlLabel,
    secondaryUrl: row.secondaryUrl ?? null,
    secondaryLabel: row.secondaryLabel ?? null,
    sortOrder: row.sortOrder ?? null,
    createdAt: row.createdAt ?? null,
    updatedAt: row.updatedAt ?? null,
  };
}

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

export async function getToolkits(): Promise<ToolkitRow[]> {
  const rows = await db
    .select()
    .from(toolkits)
    .orderBy(asc(toolkits.sortOrder), asc(toolkits.createdAt));
  return rows.map(mapRow);
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createToolkit(
  input: ToolkitCreateInput
): Promise<ActionResult<ToolkitRow>> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  const parsed = toolkitCreateInputSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.message };

  const d = parsed.data;

  const [inserted] = await db
    .insert(toolkits)
    .values({
      name: d.name,
      category: d.category,
      description: d.description,
      body: d.body,
      icon: d.icon,
      url: d.url,
      urlLabel: d.urlLabel,
      secondaryUrl: d.secondaryUrl || null,
      secondaryLabel: d.secondaryLabel || null,
      sortOrder: d.sortOrder ?? 0,
    })
    .returning();

  revalidatePath("/resources/tools");
  revalidatePath("/admin");

  return { success: true, message: "Tool added successfully!", data: mapRow(inserted) };
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateToolkit(
  id: number,
  input: ToolkitCreateInput
): Promise<ActionResult<ToolkitRow>> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  const parsed = toolkitCreateInputSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.message };

  const d = parsed.data;

  const existing = await db.select().from(toolkits).where(eq(toolkits.id, id)).limit(1);
  if (existing.length === 0) return { success: false, message: "Tool not found." };

  const [updated] = await db
    .update(toolkits)
    .set({
      name: d.name,
      category: d.category,
      description: d.description,
      body: d.body,
      icon: d.icon,
      url: d.url,
      urlLabel: d.urlLabel,
      secondaryUrl: d.secondaryUrl || null,
      secondaryLabel: d.secondaryLabel || null,
      sortOrder: d.sortOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(toolkits.id, id))
    .returning();

  revalidatePath("/resources/tools");
  revalidatePath("/admin");

  return { success: true, message: "Tool updated!", data: mapRow(updated) };
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteToolkit(id: number): Promise<ActionResult> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  await db.delete(toolkits).where(eq(toolkits.id, id));

  revalidatePath("/resources/tools");
  revalidatePath("/admin");

  return { success: true, message: "Tool deleted." };
}
