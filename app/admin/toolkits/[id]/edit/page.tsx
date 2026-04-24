import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAdmin } from "@/lib/auth"
import { db, toolkits } from "@/lib/db"
import { eq } from "drizzle-orm"
import { EditToolkitForm } from "@/components/edit-toolkit-form"

export default async function EditToolkitPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const admin = await isAdmin()
  if (!admin) redirect("/")

  const { id } = await params
  const numericId = parseInt(id, 10)
  if (isNaN(numericId)) notFound()

  const rows = await db.select().from(toolkits).where(eq(toolkits.id, numericId)).limit(1)
  if (rows.length === 0) notFound()

  const tool = rows[0]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full pt-6 md:pt-10 pb-4 bg-background border-b border-border">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Edit Tool: <span className="text-blue-400">{tool.name}</span>
          </h1>
        </div>
      </section>

      <div className="container px-4 md:px-6 lg:px-12 xl:px-24 py-10 max-w-3xl">
        <EditToolkitForm tool={{
          id: tool.id,
          name: tool.name,
          category: tool.category,
          description: tool.description,
          body: tool.body,
          icon: tool.icon,
          url: tool.url,
          urlLabel: tool.urlLabel,
          secondaryUrl: tool.secondaryUrl ?? null,
          secondaryLabel: tool.secondaryLabel ?? null,
          sortOrder: tool.sortOrder ?? 0,
          createdAt: tool.createdAt ?? null,
          updatedAt: tool.updatedAt ?? null,
        }} />
      </div>
    </div>
  )
}
