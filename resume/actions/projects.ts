"use server";

import { db, projects } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, "Icon is required"),
    externalLink: z.string().url("Must be a valid URL"),
});

export async function addProject(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        icon: formData.get("icon"),
        externalLink: formData.get("externalLink"),
    };

    const validatedData = projectSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            success: false,
            message: "Invalid data",
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    try {
        await db.insert(projects).values({
            title: validatedData.data.title,
            description: validatedData.data.description,
            icon: validatedData.data.icon,
            externalLink: validatedData.data.externalLink,
        });

        revalidatePath("/projects");
        revalidatePath("/admin");

        return { success: true, message: "Project added successfully" };
    } catch (error) {
        console.error("Failed to add project:", error);
        return { success: false, message: "Failed to add project" };
    }
}

export async function getProjects() {
    try {
        const allProjects = await db.select().from(projects);
        return allProjects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}
