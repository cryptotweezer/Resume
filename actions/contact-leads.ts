"use server";

import { db, contactLeads } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export type ContactLeadRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: Date | null;
};

// Admin only - delete a lead
export async function deleteContactLead(id: number): Promise<{ success: boolean; message: string }> {
  const adminCheck = await isAdmin();
  if (!adminCheck) return { success: false, message: "Unauthorized." };

  await db.delete(contactLeads).where(eq(contactLeads.id, id));
  return { success: true, message: "Lead deleted." };
}

// Admin only - read all leads
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
