import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectBySlug } from "@/actions/projects"
import { isAdmin } from "@/lib/auth"
import { EditProjectForm } from "@/components/edit-project-form"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const admin = await isAdmin()
  if (!admin) redirect("/projects")

  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full pt-6 md:pt-10 pb-4 bg-background border-b border-border">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <Link href={`/projects/${project.slug ?? project.id}`}>
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Edit — <span className="text-blue-400">{project.title}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Changes are saved to the database and reflected immediately.
          </p>
        </div>
      </section>

      <div className="container px-4 md:px-6 lg:px-12 xl:px-24 py-10 max-w-4xl">
        <EditProjectForm project={project} />
      </div>
    </div>
  )
}
