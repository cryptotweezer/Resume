"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateProject } from "@/actions/projects"
import { toast } from "sonner"
import { Plus, Trash2, Shield, Cloud, Code2, Bot, Lock, Server, Database, Globe } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { ProjectRow } from "@/actions/projects"

// ---------------------------------------------------------------------------
// Form schema
// ---------------------------------------------------------------------------
const featureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Short description is required"),
  longDescription: z.string().optional(),
  icon: z.string().min(1, "Icon is required"),
  goal: z.string().optional(),
  techStackRaw: z.string().optional(), // one per line
  features: z.array(featureSchema),
  challenges: z.array(featureSchema),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["Live", "In Development", "Completed", "Archived"]).optional(),
  createdAt: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const icons = [
  { name: "Shield", icon: Shield },
  { name: "Cloud", icon: Cloud },
  { name: "Code2", icon: Code2 },
  { name: "Bot", icon: Bot },
  { name: "Lock", icon: Lock },
  { name: "Server", icon: Server },
  { name: "Database", icon: Database },
  { name: "Globe", icon: Globe },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface EditProjectFormProps {
  project: ProjectRow
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      longDescription: project.longDescription ?? "",
      icon: project.icon,
      goal: project.goal ?? "",
      techStackRaw: project.techStack?.join("\n") ?? "",
      features: project.features ?? [],
      challenges: project.challenges ?? [],
      projectUrl: project.projectUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      linkedinUrl: project.linkedinUrl ?? "",
      status: (project.status as FormValues["status"]) ?? undefined,
      createdAt: project.createdAt
        ? new Date(new Date(project.createdAt).getTime() - new Date(project.createdAt).getTimezoneOffset() * 60000).toISOString().slice(0, 16)
        : "",
    },
  })

  const featuresField = useFieldArray({ control: form.control, name: "features" })
  const challengesField = useFieldArray({ control: form.control, name: "challenges" })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    const techStack = values.techStackRaw
      ? values.techStackRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : []

    const result = await updateProject(project.id, {
      title: values.title,
      description: values.description,
      longDescription: values.longDescription,
      icon: values.icon,
      goal: values.goal,
      techStack,
      features: values.features,
      challenges: values.challenges,
      projectUrl: values.projectUrl,
      repoUrl: values.repoUrl,
      linkedinUrl: values.linkedinUrl,
      status: values.status,
      createdAt: values.createdAt ? new Date(values.createdAt).toISOString() : undefined,
    })

    if (result.success) {
      toast.success(result.message)
      const newSlug = result.data?.slug ?? project.slug ?? project.id
      router.push(`/projects/${newSlug}`)
      router.refresh()
    } else {
      toast.error(result.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ── Basic Info ── */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Basic Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {icons.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description <span className="text-muted-foreground font-normal">(shown on cards)</span></FormLabel>
                <FormControl><Textarea rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description <span className="text-muted-foreground font-normal">(detail page)</span></FormLabel>
                <FormControl><Textarea rows={6} placeholder="Detailed description of the project..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal / Objective</FormLabel>
                <FormControl><Textarea rows={3} placeholder="What was the goal of this project?" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* ── Links & Status ── */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Links & Status</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Project URL</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repo URL</FormLabel>
                  <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Post URL</FormLabel>
                  <FormControl><Input placeholder="https://linkedin.com/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Live", "In Development", "Completed", "Archived"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* ── Tech Stack ── */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Tech Stack</h3>
          <FormField
            control={form.control}
            name="techStackRaw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies <span className="text-muted-foreground font-normal">(one per line)</span></FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder={"Next.js 16\nReact 19\nTypeScript\nSupabase PostgreSQL"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* ── Key Features ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Key Features</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => featuresField.append({ title: "", description: "" })}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Feature
            </Button>
          </div>

          {featuresField.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">No features yet. Click "Add Feature" to start.</p>
          )}

          {featuresField.fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-border p-4 space-y-3 bg-card/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Feature {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive h-7 w-7 p-0"
                  onClick={() => featuresField.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`features.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Title</FormLabel>
                    <FormControl><Input placeholder="Feature name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`features.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <FormControl><Textarea rows={2} placeholder="Describe this feature..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Separator />

        {/* ── Challenges ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Challenges Solved</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => challengesField.append({ title: "", description: "" })}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Challenge
            </Button>
          </div>

          {challengesField.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">No challenges yet. Click "Add Challenge" to start.</p>
          )}

          {challengesField.fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-yellow-500/20 p-4 space-y-3 bg-card/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Challenge {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive h-7 w-7 p-0"
                  onClick={() => challengesField.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`challenges.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Title</FormLabel>
                    <FormControl><Input placeholder="Challenge name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`challenges.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <FormControl><Textarea rows={2} placeholder="Describe how you solved this..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Separator />

        {/* ── Actions ── */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/projects/${project.slug ?? project.id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
