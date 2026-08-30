import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects } from "@/actions/projects"
import { IconRenderer } from "@/components/icon-renderer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"

export const revalidate = 600;

const statusColor: Record<string, string> = {
  Live: "bg-green-500/10 text-green-400 border-green-500/20",
  "In Development": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Archived: "bg-muted text-muted-foreground border-border",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col">
      <section className="w-full pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-10 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 pb-2">
                Projects
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Showcasing cybersecurity, AI, and full-stack development projects combining secure
                architecture with intelligent automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pt-0 pb-12 md:pb-24 lg:pb-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          {projects.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">No projects yet.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const href = `/projects/${project.slug ?? project.id}`
                return (
                  <Link key={project.id} href={href} className="block h-full group">
                    <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <IconRenderer
                            name={project.icon || "Globe"}
                            className="h-10 w-10 text-blue-400"
                          />
                          {project.status && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${statusColor[project.status] ?? statusColor.Archived}`}
                            >
                              {project.status}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-foreground group-hover:text-blue-400 transition-colors duration-200">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground line-clamp-3">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto pt-0">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(project.createdAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
