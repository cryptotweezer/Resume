import { db, subscribers, users } from "@/lib/db";
import { User } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

/**
 * Checks if the current user is an admin using the user's email from Clerk
 * Safe to use in routes and pages
 * @returns Boolean indicating if the current user has admin privileges
 */
export async function isAdmin(): Promise<boolean> {
  try {
    // Use currentUser() which is safe in route handlers and pages
    const clerk = await currentUser();

    // If no user is logged in, they can't be an admin
    if (!clerk || !clerk.emailAddresses || clerk.emailAddresses.length === 0) {
      return false;
    }

    // Get primary email
    const primaryEmailObj = clerk.emailAddresses.find(email => email.id === clerk.primaryEmailAddressId)
      || clerk.emailAddresses[0];

    const email = primaryEmailObj.emailAddress;

    // Query the database to find the user record by email and check role
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // If user exists and is admin, return true
    return userResults.length > 0 && userResults[0].role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Gets the current user from the database based on Clerk user
 * Safe to use in routes and pages
 * @returns User object with role information
 */
export async function getCurrentUser() {
  try {
    // Use currentUser() which is safe in route handlers and pages
    const clerk = await currentUser();

    // If no user is logged in, return null
    if (!clerk || !clerk.emailAddresses || clerk.emailAddresses.length === 0) {
      return null;
    }

    // Get primary email
    const primaryEmailObj = clerk.emailAddresses.find(email => email.id === clerk.primaryEmailAddressId)
      || clerk.emailAddresses[0];

    const email = primaryEmailObj.emailAddress;

    // Query the database to find the user record by email
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Return the user record or null if not found
    return userResults.length > 0 ? userResults[0] : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Creates or updates the user record in the database based on Clerk user data
 * Can be used in API routes or server components safely
 * @param email User email
 * @param name User name (optional)
 * @returns The user record
 */
export async function syncUserWithDatabase(email: string, name: string = ''): Promise<User | null> {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    // Get Clerk user for ID
    const clerk = await currentUser();
    if (!clerk) {
      throw new Error("No authenticated user found");
    }

    const clerkId = clerk.id;

    // Check if user already exists by Clerk ID (most reliable)
    const existingUserByClerkId = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (existingUserByClerkId.length > 0) {
      const user = existingUserByClerkId[0];

      // Update email/name if changed
      if (user.email !== email || user.name !== name) {
        await db.update(users)
          .set({ email, name, updatedAt: new Date() })
          .where(eq(users.id, user.id));

        // Return updated user
        return { ...user, email, name };
      }

      return user;
    }

    // Check if user exists by email (fallback for pre-existing users or linking)
    const existingUserByEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // If user exists by email but not clerkId, link them
    if (existingUserByEmail.length > 0) {
      const user = existingUserByEmail[0];

      await db.update(users)
        .set({ clerkId, name: name || user.name, updatedAt: new Date() })
        .where(eq(users.id, user.id));

      return { ...user, clerkId, name: name || user.name };
    }

    // The first account becomes admin, but only while no admin exists at all,
    // and under a transaction lock so two simultaneous sign-ups cannot both win.
    const newUser = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext('resume.users.first_admin'))`);

      const admins = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.role, 'admin'))
        .limit(1);
      const isFirstUser = admins.length === 0;

      const [inserted] = await tx.insert(users).values({
        email,
        name,
        clerkId,
        role: isFirstUser ? 'admin' : 'user',
        isFirstUser,
      }).returning();
      return inserted;
    });

    // Also add to subscribers if not already there (for newsletters)
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);

    if (existingSubscriber.length === 0) {
      await db.insert(subscribers).values({
        email,
        name
      });
    }

    return newUser;
  } catch (error) {
    console.error("Error syncing user with database:", error);
    return null;
  }
}
