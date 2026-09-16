import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { detectBot, shield, fixedWindow } from "@arcjet/next";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(['/admin', '/resources(.*)', '/projects']);

// Se llama desde scripts/CLI, no desde un navegador, asi que detectBot lo
// rechazaria. Va protegido por el secreto en x-revalidate-secret.
const isRevalidateRoute = createRouteMatcher(['/api/revalidate']);

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // Link previews. Without these the scrapers get a 403 and every
        // pasted link shows as a bare URL, no title, no image. They are named
        // one by one rather than by category so the exception stays this list
        // and nothing else.
        "LINKEDIN_CRAWLER",
        "FACEBOOK_CRAWLER",
        "FACEBOOK_SHARE_CRAWLER",
        "TWITTER_CRAWLER",
        "WHATSAPP_CRAWLER",
        "SLACK_CRAWLER",
        "SLACK_IMAGE_PROXY",
        "DISCORD_CRAWLER",
        "TELEGRAM_CRAWLER",
      ],
    }),
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 100,
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  if (!isRevalidateRoute(req)) {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
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