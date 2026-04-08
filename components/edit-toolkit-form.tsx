"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { updateToolkit } from "@/actions/toolkits"
import { toast } from "sonner"
import type { ToolkitRow } from "@/actions/toolkits"

const ICONS = [
  "Shield", "Terminal", "Sparkles", "Code", "Workflow", "Database",
  "Globe", "Cloud", "Bot", "Lock", "Server", "Code2",
  "Wrench", "Brain", "Network", "Key", "Search", "FileSearch", "HardDrive",
]

const URL_LABELS = ["Visit Website", "Visit Docs", "Learn More"]
const SECONDARY_LABELS = ["Download", "Visit Docs", "Learn More", "GitHub"]

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Short description is required"),
  body: z.string().min(1, "Body text is required"),
  icon: z.string().min(1, "Icon is required"),
  url: z.string().url("Must be a valid URL"),
  urlLabel: z.string().min(1),
  secondaryUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  secondaryLabel: z.string().optional(),
  sortOrder: z.coerce.number().int().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function EditToolkitForm({ tool }: { tool: ToolkitRow }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tool.name,
      category: tool.category,
      description: tool.description,
      body: tool.body,
      icon: tool.icon,
      url: tool.url,
      urlLabel: tool.urlLabel,
      secondaryUrl: tool.secondaryUrl ?? "",
      secondaryLabel: tool.secondaryLabel ?? "",
      sortOrder: tool.sortOrder ?? 0,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    const result = await updateToolkit(tool.id, {
      ...values,
      secondaryUrl: values.secondaryUrl || undefined,
      secondaryLabel: (values.secondaryLabel && values.secondaryLabel !== "none") ? values.secondaryLabel : undefined,
    })
    if (result.success) {
      toast.success(result.message)
      router.push("/admin")
      router.refresh()
    } else {
      toast.error(result.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl><Textarea rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="body" render={({ field }) => (
          <FormItem>
            <FormLabel>Body Text</FormLabel>
            <FormControl><Textarea rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="icon" render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  {ICONS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="sortOrder" render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="url" render={({ field }) => (
            <FormItem>
              <FormLabel>Primary URL</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="urlLabel" render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Button Label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  {URL_LABELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="secondaryUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary URL <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="secondaryLabel" render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Button Label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                <FormControl><SelectTrigger><SelectValue placeholder="None" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {SECONDARY_LABELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
