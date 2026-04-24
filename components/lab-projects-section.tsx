"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconRenderer } from "@/components/icon-renderer"
import { getLabProjects, ProjectRow } from "@/actions/projects"

export function LabProjectsSection() {
  const [projects, setProjects] = useState<ProjectRow[]>([])

  useEffect(() => {
    getLabProjects().then(setProjects)
  }, [])

  if (projects.length === 0) return null

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl items-stretch gap-6 lg:gap-8">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col"
        >
          <CardHeader>
            <IconRenderer name={project.icon} className="h-10 w-10 text-blue-400 mb-2" />
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-foreground">{project.title}</CardTitle>
              {project.status && (
                <span className={`flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium ${project.status === "Live" ? "text-green-400" : "text-yellow-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${project.status === "Live" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
                  {project.status}
                </span>
              )}
            </div>
            {project.labRole && (
              <CardDescription className="text-blue-400 text-xs font-medium">{project.labRole}</CardDescription>
            )}
            <p className="text-sm text-muted-foreground pt-1">{project.description}</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            {project.features && project.features.length > 0 && (
              <ul className="space-y-2">
                {project.features.slice(0, 4).map((f) => (
                  <li key={f.title} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {f.title}
                  </li>
                ))}
              </ul>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{t}</span>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-auto pt-2">
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Platform
                </Link>
              )}
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
