import { isAdmin } from "@/lib/auth"
import { getProjects } from "@/actions/projects"
import { getToolkits } from "@/actions/toolkits"
import { getContactLeads } from "@/actions/contact-leads"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserRoleManagement } from "@/components/user-role-management"
import { AddBlogPostForm } from "@/components/add-blog-post-form"
import { AddProjectForm } from "@/components/add-project-form"
import { AddToolkitForm } from "@/components/add-toolkit-form"
import { ProjectAdminActions } from "@/components/project-admin-actions"
import { ToolkitAdminActions } from "@/components/toolkit-admin-actions"
import { ContactLeadActions } from "@/components/contact-lead-actions"
import Link from "next/link"
import { Database, Pencil, MessageSquare } from "lucide-react"
import { redirect } from "next/navigation"

const statusStyle: Record<string, string> = {
  Live: "bg-green-500/10 text-green-400 border-green-500/20",
  "In Development": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Archived: "bg-muted text-muted-foreground border-border",
}

export default async function AdminPage() {
  const admin = await isAdmin()
  if (!admin) redirect("/")

  const [projects, tools, leads] = await Promise.all([getProjects(), getToolkits(), getContactLeads()])

  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ── Utilities ── */}
      <Card>
        <CardHeader>
          <CardTitle>Database Tools</CardTitle>
          <CardDescription>Access database utilities and testing functions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/db-test" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              DB Test
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* ── User Management ── */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserRoleManagement />
        </CardContent>
      </Card>

      {/* ── Project Management ── */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            {projects.length} project{projects.length !== 1 ? "s" : ""} in database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {projects.length > 0 && (
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, i) => (
                    <tr
                      key={project.id}
                      className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                    >
                      <td className="px-4 py-3 font-medium">{project.title}</td>
                      <td className="px-4 py-3">
                        {project.status ? (
                          <Badge variant="outline" className={`text-xs ${statusStyle[project.status] ?? statusStyle.Archived}`}>
                            {project.status}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                        {project.slug ?? `id:${project.id}`}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="ghost" className="h-8">
                            <Link href={`/projects/${project.slug ?? project.id}/edit`}>
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <ProjectAdminActions projectId={project.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Add New Project ── */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>Create a new project entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProjectForm />
        </CardContent>
      </Card>

      {/* ── Toolkit Management ── */}
      <Card>
        <CardHeader>
          <CardTitle>Toolkit</CardTitle>
          <CardDescription>
            {tools.length} tool{tools.length !== 1 ? "s" : ""} in database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {tools.length > 0 && (
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Order</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool, i) => (
                    <tr key={tool.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="px-4 py-3 font-medium">{tool.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">{tool.sortOrder ?? 0}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="ghost" className="h-8">
                            <Link href={`/admin/toolkits/${tool.id}/edit`}>
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <ToolkitAdminActions toolId={tool.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Add New Tool ── */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Tool</CardTitle>
          <CardDescription>Add a tool to the Toolkit page.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddToolkitForm />
        </CardContent>
      </Card>

      {/* ── Blog Posts ── */}
      <Card>
        <CardHeader>
          <CardTitle>Add Blog Post</CardTitle>
          <CardDescription>Create a new blog post card.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm />
        </CardContent>
      </Card>

      {/* ── Contact Leads (Boto) ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Contact Leads
          </CardTitle>
          <CardDescription>
            {leads.length} lead{leads.length !== 1 ? "s" : ""} collected by Boto
          </CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads yet. Boto will collect them when users leave contact info via chat.</p>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Subject</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Message</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-blue-400">
                        <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                        {lead.phone && <div className="text-xs text-muted-foreground mt-0.5">{lead.phone}</div>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {lead.subject ?? <span className="text-xs opacity-50">No subject</span>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-xs">
                        <p className="truncate">{lead.message}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ContactLeadActions leadId={lead.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
