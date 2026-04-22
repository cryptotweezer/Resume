import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Linkedin,
  Calendar,
  Pencil,
  Target,
  Zap,
  AlertTriangle,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconRenderer } from "@/components/icon-renderer"
import { getProjectBySlug } from "@/actions/projects"
import { isAdmin } from "@/lib/auth"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Status badge colours
// ---------------------------------------------------------------------------
const statusStyle: Record<string, string> = {
  Live: "bg-green-500/10 text-green-400 border-green-500/30",
  "In Development": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Archived: "bg-muted text-muted-foreground border-border",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const admin = await isAdmin()
  const linkedinHref = project.linkedinUrl || project.externalLink

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-20" />
        <div className="relative container px-4 md:px-6 lg:px-12 xl:px-24 pt-10 pb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                <IconRenderer name={project.icon || "Globe"} className="h-8 w-8 text-blue-400" />
              </div>
              {project.status && (
                <Badge
                  variant="outline"
                  className={`${statusStyle[project.status] ?? statusStyle.Archived}`}
                >
                  {project.status}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-4">
              {project.title}
            </h1>

            {/* Action row */}
            <div className="flex flex-wrap items-center gap-3">
              {project.projectUrl && (
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button asChild size="sm" variant="outline" className="border-blue-500/30 hover:border-blue-500">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Repo
                  </a>
                </Button>
              )}
              {linkedinHref && (
                <Button asChild size="sm" variant="outline" className="border-blue-500/30 hover:border-blue-500">
                  <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn Post
                  </a>
                </Button>
              )}
              {admin && (
                <Button asChild size="sm" variant="ghost" className="ml-auto text-muted-foreground hover:text-foreground">
                  <Link href={`/projects/${project.slug ?? project.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Project
                  </Link>
                </Button>
              )}
            </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="container px-4 md:px-6 lg:px-12 xl:px-24 py-10">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Mobile: single column stack. Desktop: 2/3 main + 1/3 sidebar */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:items-start">

          {/* ── Right sidebar (first in DOM → top on mobile, col-3 on desktop) ── */}
          <div className="flex flex-col gap-6 lg:col-start-3 lg:row-start-1">

            {/* Goal */}
            {project.goal && (
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-base text-foreground">Goal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">{project.goal}</p>
                </CardContent>
              </Card>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick info */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
                {project.projectUrl && (
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <ExternalLink className="h-4 w-4 text-blue-400 shrink-0" />
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors truncate min-w-0"
                    >
                      {project.projectUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {project.repoUrl && (
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <Github className="h-4 w-4 text-blue-400 shrink-0" />
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors truncate min-w-0"
                    >
                      {project.repoUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* ── Left column (main content) ─────────────────────────────────── */}
          <div className="flex flex-col gap-8 lg:col-span-2 lg:col-start-1 lg:row-start-1">

            {/* About */}
            {project.longDescription && (
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                    {project.longDescription}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-bold text-foreground">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <Card
                      key={i}
                      className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-200"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-blue-400 break-words">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <h2 className="text-xl font-bold text-foreground">Challenges Solved</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.challenges.map((challenge, i) => (
                    <Card
                      key={i}
                      className="bg-card/50 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-yellow-400 break-words">{challenge.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words">
                          {challenge.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
