import { db, contactLeads } from "@/lib/db";
import { z } from "zod";

// Server-only helper, not a server action: only the chat API route calls it,
// so it is not reachable as a public POST endpoint.
const saveLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(3000),
});

export type ContactLeadInput = z.infer<typeof saveLeadSchema>;

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
    phone: d.phone || null,
    subject: d.subject || null,
    message: d.message,
  });

  return { success: true, message: "Contact lead saved." };
}
