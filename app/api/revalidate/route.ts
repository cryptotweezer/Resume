import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Rutas cacheadas cuyo contenido sale de la base. Estan juntas para que una
// sola llamada refresque todo lo que puede tocar un INSERT hecho por fuera
// de la app (Supabase MCP, SQL directo, el dashboard de Supabase).
const CONTENT_PATHS = ["/", "/blog", "/projects", "/about", "/resources/tools"];

function matchesSecret(provided: string | null, expected: string) {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not configured" }, { status: 500 });
  }

  if (!matchesSecret(request.headers.get("x-revalidate-secret"), secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Body opcional: { "paths": ["/blog"] } para refrescar solo una parte.
  let paths = CONTENT_PATHS;
  try {
    const body = await request.json();
    if (Array.isArray(body?.paths) && body.paths.length > 0) {
      paths = body.paths.filter((p: unknown): p is string => typeof p === "string" && p.startsWith("/"));
    }
  } catch {
    // Sin body valido revalidamos todo.
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: paths, at: new Date().toISOString() });
}
