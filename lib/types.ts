/**
 * This file contains all types used throughout the application
 * aligned with the Drizzle ORM schema definitions.
 * Using Zod for runtime validation.
 */

import { z } from 'zod';
import { users, subscribers, blogPosts, projects, toolkits } from './db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

/**
 * Drizzle-inferred types
 * These types are directly generated from the Drizzle schema
 */
export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export type Subscriber = InferSelectModel<typeof subscribers>;
export type SubscriberInsert = InferInsertModel<typeof subscribers>;

export type BlogPost = InferSelectModel<typeof blogPosts>;
export type BlogPostInsert = InferInsertModel<typeof blogPosts>;

export type Project = InferSelectModel<typeof projects>;
export type ProjectInsert = InferInsertModel<typeof projects>;

/**
 * Possible user roles in the system
 */
export const userRoleEnum = z.enum(['admin', 'user']);
export type UserRole = z.infer<typeof userRoleEnum>;

/**
 * Base types for React 19 Server Action states
 * These are used with useActionState hook
 */
export type ActionStatus = "idle" | "submitting" | "success" | "error";

export interface ActionState {
  status: ActionStatus;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Zod schemas for validation
 * These schemas are used for runtime validation of data
 */
export const userSchema = createSelectSchema(users).extend({
  role: userRoleEnum,
  // Ensure proper type handling for dates from DB
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
});

export const userInsertSchema = createInsertSchema(users).extend({
  role: userRoleEnum,
});

export const subscriberSchema = createSelectSchema(subscribers).extend({
  // Ensure proper type handling for dates from DB
  created_at: z.date().nullable(),
});

export const subscriberInsertSchema = createInsertSchema(subscribers);

export const blogPostSchema = createSelectSchema(blogPosts).extend({
  // Ensure proper type handling for dates from DB
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
});

export const blogPostInsertSchema = createInsertSchema(blogPosts);

/**
 * Structured feature/challenge item for projects
 */
export const projectFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type ProjectFeature = z.infer<typeof projectFeatureSchema>;

/**
 * Project schema - JSON columns are typed explicitly
 */
export const projectSchema = createSelectSchema(projects).extend({
  techStack: z.array(z.string()).nullable(),
  features: z.array(projectFeatureSchema).nullable(),
  challenges: z.array(projectFeatureSchema).nullable(),
  items: z.array(z.string()).nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const projectInsertSchema = createInsertSchema(projects).extend({
  techStack: z.array(z.string()).nullable().optional(),
  features: z.array(projectFeatureSchema).nullable().optional(),
  challenges: z.array(projectFeatureSchema).nullable().optional(),
  items: z.array(z.string()).nullable().optional(),
});

/**
 * Input schema for creating or updating a project
 */
export const projectCreateInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  icon: z.string().min(1),
  goal: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  features: z.array(projectFeatureSchema).optional(),
  challenges: z.array(projectFeatureSchema).optional(),
  projectUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["Live", "In Development", "Completed", "Archived"]).optional(),
  showInLab: z.boolean().optional(),
  labRole: z.string().optional(),
  createdAt: z.string().optional(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateInputSchema>;

/**
 * Toolkit types
 */
export type Toolkit = InferSelectModel<typeof toolkits>;
export type ToolkitInsert = InferInsertModel<typeof toolkits>;

export const toolkitCreateInputSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
  icon: z.string().min(1),
  url: z.string().url(),
  urlLabel: z.string().min(1).default("Visit Website"),
  secondaryUrl: z.string().url().optional().or(z.literal("")),
  secondaryLabel: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export type ToolkitCreateInput = z.infer<typeof toolkitCreateInputSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSubscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().optional(),
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;
