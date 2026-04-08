"use server";

import { db, contactLeads } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const saveLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export type ContactLeadInput = z.infer<typeof saveLeadSchema>;

export type ContactLeadRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: Date | null;
};

// Public — called from the chat API route only
export async function saveContactLead(
  input: ContactLeadInput
): Promise<{ success: boolean; message: string }> {
  const parsed = saveLeadSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Invalid contact data." };
  }

  const d = parsed.data;

  await db.insert(contactLeads).values({
    name: d.name,
    email: d.email,
    phone: d.phone ?? null,
    subject: d.subject ?? null,
    message: d.message,
  });

  return { success: true, message: "Contact lead saved." };
}

// Admin only — delete a lead
export async function deleteContactLead(id: number): Promise<{ success: boolean; message: string }> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  await db.delete(contactLeads).where(eq(contactLeads.id, id));
  return { success: true, message: "Lead deleted." };
}

// Admin only — read all leads
export async function getContactLeads(): Promise<ContactLeadRow[]> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return [];

  const rows = await db
    .select()
    .from(contactLeads)
    .orderBy(desc(contactLeads.createdAt));

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? null,
    subject: r.subject ?? null,
    message: r.message,
    createdAt: r.createdAt ?? null,
  }));
}
