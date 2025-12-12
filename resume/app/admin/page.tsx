import { isAdmin } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRoleManagement } from "@/components/user-role-management";
import { AddBlogPostForm } from "@/components/add-blog-post-form";
import { AddProjectForm } from "@/components/add-project-form";
import Link from "next/link";
import { Database } from "lucide-react";

export default async function AdminPage() {
  // Assuming isAdmin is a valid function to protect the route
  if (!isAdmin) {
    return (
      <div className="container py-12">
        <p>Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Database Tools Card */}
        <Card>
          <CardHeader>
            <CardTitle>Database Tools</CardTitle>
            <CardDescription>Access database utilities and testing functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/db-test" className="flex items-center justify-center gap-2">
                  <Database className="h-4 w-4" />
                  DB Test
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserRoleManagement />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Blog Post</CardTitle>
          <CardDescription>Create a new blog post card.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
          <CardDescription>Create a new project card.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProjectForm />
        </CardContent>
      </Card>

    </div>
  );
}
