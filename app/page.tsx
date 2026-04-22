export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Server, Database, Bot, Code2, Cloud, Workflow, TrendingUp, Users, MapPin, Mail, Phone, Linkedin, Briefcase, GraduationCap, Award, ExternalLink, Calendar, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { CertificationsSection } from "@/components/certifications-section"
import { db, blogPosts } from "@/lib/db"
import { desc } from "drizzle-orm"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CountUp } from "@/components/count-up"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { IconRenderer } from "@/components/icon-renderer"
import { HeroSection } from "@/components/hero-section"


export default async function Home() {
  // Fetch the latest 3 blog posts with error handling
  let latestPosts: { id: string; title: string; excerpt: string; icon?: string; externalLink?: string; createdAt: string }[] = []
  let dbError = false

  try {
    latestPosts = (await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(3)).map(post => ({
      id: post.id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      icon: post.icon || undefined,
      externalLink: post.externalLink || undefined,
      createdAt: post.createdAt ? post.createdAt.toISOString() : ""
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    dbError = true
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Database Error Alert */}
      {dbError && (
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 py-6">
          <Alert variant="destructive">
            <AlertTitle>Database Error</AlertTitle>
            <AlertDescription>
              There was an error connecting to the database. Please try refreshing the page or contact support if the
              issue persists.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Expertise Areas Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Core Technical Areas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Multidisciplinary skills combining cybersecurity principles with automation and real-world execution to build secure, intelligent, and efficient systems.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 max-w-6xl items-stretch gap-6 py-12 lg:gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Cybersecurity & Network Defense</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Comprehensive security analysis and protection strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Cyber Threat Analysis</li>
                  <li>Vulnerability Management</li>
                  <li>Incident Response</li>
                  <li>SIEM Tools</li>
                  <li>Risk Management</li>
                  <li>Network Security</li>
                  <li>Firewall Configuration</li>
                  <li>Cloudflare & Arcjet Security</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Bot className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">AI & Automation</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Intelligent systems and workflow orchestration
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>LLM Integration</li>
                  <li>AI Agent Implementation</li>
                  <li>OpenAI API</li>
                  <li>Workflow Automation & Orchestration</li>
                  <li>MCP Servers for AI</li>
                  <li>Process Optimization</li>
                  <li>n8n Automation</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Code2 className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Full-Stack Development</CardTitle>
                <CardDescription className="text-muted-foreground">
                  End-to-end software development
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Next.js & TypeScript</li>
                  <li>Python, Flask, Django</li>
                  <li>API Development & Integration</li>
                  <li>Front-End & Back-End</li>
                  <li>Docker & Containerization</li>
                  <li>GitHub & Version Control</li>
                  <li>SQL & Database Design</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Cloud className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Cloud & Infrastructure</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Scalable cloud solutions and system administration
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Vercel & Supabase</li>
                  <li>AWS & IBM Cloud</li>
                  <li>Linux System Administration</li>
                  <li>Cloud Security Principles</li>
                  <li>Containerization</li>
                  <li>Data Mining & Analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-background/80"></div>
      </section>

      {/* About Me Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
          {/* Title */}
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-2 text-foreground">About Me</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-8">
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Cybersecurity specialist and full-stack engineer with a strong foundation in{" "}
                    <span className="text-blue-400 font-semibold">secure software architecture, cloud infrastructure, and intelligent systems integration</span>.
                    Experienced in designing and deploying production-grade applications using Next.js, TypeScript, Python, Flask, Django, Docker, and Supabase,
                    with a consistent focus on security, scalability, and operational resilience.
                  </p>

                  <p>
                    Skilled in{" "}
                    <span className="text-blue-400 font-semibold">AI agent development, LLM orchestration, and workflow automation</span>{" "}
                    using OpenAI API, MCP servers, and n8n. Applies these capabilities to solve real operational challenges,
                    having achieved a 90% improvement in operational accuracy and a 96% client retention rate through
                    targeted automation and process optimization.
                  </p>

                  <p>
                    Holds IBM and Google professional certifications across{" "}
                    <span className="text-blue-400 font-semibold">AI, cybersecurity, and full-stack development</span>.
                    Brings a multidisciplinary perspective across international logistics, business operations, and technology,
                    combining security-first engineering with practical, results-driven execution.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span>Sydney, Australia</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span>andres.henaocastro@live.vu.edu.au</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span>andreshenao.tech@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span>+61 404 682 541</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Linkedin className="h-4 w-4 text-blue-400" />
                    <Link
                      href="https://www.linkedin.com/in/andreshenao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                    <Link
                      href="https://www.seek.com.au/profiles/andres-henao-FdYyBD5Xcp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Seek Profile
                    </Link>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    Security-First Mindset
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    AI Integration
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    Process Optimizer
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    Cloud Architect
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="flex flex-col gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <Bot className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CountUp end={5} suffix="x" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Faster AI Context Handoff</div>
                      <div className="text-xs text-muted-foreground/70">Project Intelligence System</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CountUp end={100} suffix="%" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Serverless & Edge-Native</div>
                      <div className="text-xs text-muted-foreground/70">The Watchtower</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <Server className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CountUp end={24} suffix="/7" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">AI-Powered Portfolio</div>
                      <div className="text-xs text-muted-foreground/70">cv.andreshenao.com.au</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <Briefcase className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CountUp end={15} suffix="+" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-background/80"></div>
      </section>

      {/* Education & Certifications Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
          {/* Title */}
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-2 text-foreground">Education & Certifications</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4"></div>
            <p className="text-muted-foreground text-center max-w-2xl">
              Continuous learning in cybersecurity, AI, and full-stack development
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
              </div>

              <div className="space-y-4">
                {/* Bachelor of Cyber Security */}
                <div className="rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Bachelor of Cyber Security</h4>
                  <p className="text-blue-400 text-sm mb-3">Victoria University</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>2022 - Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>Sydney, Australia</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Diploma */}
                <div className="rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Advanced Diploma of Leadership and Management</h4>
                  <p className="text-blue-400 text-sm mb-3">Australian Pacific College</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Aug 2016 - May 2018</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>Sydney, Australia</span>
                    </div>
                  </div>
                </div>

                {/* Bachelor International Trade */}
                <div className="rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Bachelor of International Trade and Logistics Management</h4>
                  <p className="text-blue-400 text-sm mb-3">Uninpahu University</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Feb 2005 - Oct 2007</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>Bogotá, Colombia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Certifications */}
            <CertificationsSection />
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-background/80"></div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                Stay Updated on Tech Trends
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Subscribe to receive insights on cybersecurity, AI, automation, and cloud solutions.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-background/80"></div>
      </section>

      {/* Recent Blog Posts */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Insights</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Exploring cybersecurity, AI, automation, and cloud technologies through practical insights and real-world applications.
              </p>
            </div>
          </div>

          {dbError ? (
            <div className="mx-auto max-w-5xl py-12 text-center">
              <p className="text-muted-foreground">Unable to load blog posts at this time. Please try again later.</p>
            </div>
          ) : (
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl items-center gap-6 py-12 lg:gap-12">
              {latestPosts.map((post) => (
                <Link key={post.id} href={post.externalLink || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                    <CardHeader>
                      <div className="mb-2">
                        <IconRenderer name={post.icon || "Globe"} className="h-10 w-10 text-blue-400" />
                      </div>
                      <CardTitle className="text-foreground">{post.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline" className="hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 hover:scale-[1.02]">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
