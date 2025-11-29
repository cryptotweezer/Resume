import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects } from "@/actions/projects"
import { IconRenderer } from "@/components/icon-renderer"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col">
      <section className="w-full pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-10 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 pb-2">Projects</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Showcasing cybersecurity, AI, and full-stack development projects combining secure architecture with intelligent automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pt-0 pb-12 md:pb-24 lg:pb-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={project.externalLink || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-2">
                      <IconRenderer name={project.icon || "Globe"} className="h-10 w-10 text-blue-400" />
                    </div>
                    <CardTitle className="text-foreground">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <p className="text-xs text-muted-foreground">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

