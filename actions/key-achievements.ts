"use server";

import { db, keyAchievements } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type KeyAchievementRow = {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
  sortOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export async function getKeyAchievements(): Promise<KeyAchievementRow[]> {
  return db.select().from(keyAchievements).orderBy(asc(keyAchievements.sortOrder));
}

export async function createKeyAchievement(data: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  sortOrder?: number;
}) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const [row] = await db.insert(keyAchievements).values(data).returning();
  revalidatePath("/about");
  return row;
}

export async function updateKeyAchievement(id: number, data: Partial<{
  value: number;
  suffix: string;
  label: string;
  description: string;
  sortOrder: number;
}>) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const [row] = await db.update(keyAchievements).set(data).where(eq(keyAchievements.id, id)).returning();
  revalidatePath("/about");
  return row;
}

export async function deleteKeyAchievement(id: number) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await db.delete(keyAchievements).where(eq(keyAchievements.id, id));
  revalidatePath("/about");
}
