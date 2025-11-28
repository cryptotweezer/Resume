"use server";

import { db, blogPosts } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const blogPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, "Icon is required"),
    externalLink: z.string().url("Must be a valid URL"),
});

export async function addBlogPost(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        icon: formData.get("icon"),
        externalLink: formData.get("externalLink"),
    };

    const validatedData = blogPostSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            success: false,
            message: "Invalid data",
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    try {
        await db.insert(blogPosts).values({
            title: validatedData.data.title,
            excerpt: validatedData.data.description,
            icon: validatedData.data.icon,
            externalLink: validatedData.data.externalLink,
            // Slug is optional/nullable now, but we can generate a simple one if needed or leave it null
            // Content is optional/nullable
            author: "Admin",
        });

        revalidatePath("/blog");
        revalidatePath("/admin");

        return { success: true, message: "Blog post added successfully" };
    } catch (error) {
        console.error("Failed to add blog post:", error);
        return { success: false, message: "Failed to add blog post" };
    }
}
