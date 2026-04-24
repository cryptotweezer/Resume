import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { boolean, integer, pgTable, serial, text, timestamp, varchar, json } from "drizzle-orm/pg-core";

const connectionString = process.env.DATABASE_URL!;

// prepare: false required for Supabase transaction pooler (port 6543)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);

// Define the subscribers table schema - for newsletter subscribers only
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define the users table schema - for authentication and role-based access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  clerkId: text("clerk_id").notNull().unique(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  isFirstUser: boolean("is_first_user").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define the blog posts table schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  coverImage: text("cover_image"),
  author: text("author").default("Admin"),
  readTime: text("read_time"),
  icon: text("icon"),
  externalLink: text("external_link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define the projects table schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  icon: text("icon").notNull(),
  goal: text("goal"),
  techStack: json("tech_stack"),       // string[]
  features: json("features"),          // { title: string, description: string }[]
  challenges: json("challenges"),      // { title: string, description: string }[]
  projectUrl: text("project_url"),
  repoUrl: text("repo_url"),
  linkedinUrl: text("linkedin_url"),
  coverImage: text("cover_image"),
  status: varchar("status", { length: 50 }),
  showInLab: boolean("show_in_lab").default(false).notNull(),
  labRole: text("lab_role"),
  // kept for backward compat with external writers
  externalLink: text("external_link"),
  items: json("items"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define the toolkits table schema
export const toolkits = pgTable("toolkits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),       // short - shown in CardDescription
  body: text("body").notNull(),                      // longer - shown in CardContent
  icon: varchar("icon", { length: 50 }).notNull().default("Shield"),
  url: text("url").notNull(),
  urlLabel: varchar("url_label", { length: 50 }).notNull().default("Visit Website"),
  secondaryUrl: text("secondary_url"),
  secondaryLabel: varchar("secondary_label", { length: 50 }),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Key achievements displayed on the About page
export const keyAchievements = pgTable("key_achievements", {
  id: serial("id").primaryKey(),
  value: integer("value").notNull(),
  suffix: text("suffix").notNull().default("%"),
  label: text("label").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact leads captured by Boto chat assistant
export const contactLeads = pgTable("contact_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})
