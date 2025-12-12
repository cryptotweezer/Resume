import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, fixedWindow } from "@arcjet/next";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(['/admin','/resources(.*)', '/projects']);

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    fixedWindow({
      mode: "LIVE",
      window: "60s",
      max: 100,
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 },
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "No bots allowed", reason: decision.reason },
        { status: 403 },
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 },
      );
    }
  }

  if (isProtectedRoute(req)) await auth.protect()
})




export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};