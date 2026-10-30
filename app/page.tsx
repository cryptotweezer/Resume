export const revalidate = 600;

import Link from "next/link"
import { EducationPdfCard } from "@/components/education-pdf-card"
import { Shield, Bot, Cloud, Network, Users, MapPin, Mail, Phone, Linkedin, Briefcase, GraduationCap, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { CertificationsSection } from "@/components/certifications-section"
import { db, blogPosts } from "@/lib/db"
import { desc } from "drizzle-orm"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CountUp } from "@/components/count-up"
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
                The four areas I work in: detecting and responding to threats, securing cloud environments, hardening networks, and building AI systems that run safely in production.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 max-w-6xl items-stretch gap-6 py-12 lg:gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Security Operations</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Detecting, assessing and responding to threats
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>SIEM & Security Monitoring</li>
                  <li>Incident Response</li>
                  <li>Threat Analysis & Intelligence</li>
                  <li>Vulnerability Assessment</li>
                  <li>Penetration Testing</li>
                  <li>Digital Forensics</li>
                  <li>Risk Assessment</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Cloud className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Cloud Security</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Securing cloud and virtualised environments
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>AWS (IAM, Cognito, Lambda, RDS)</li>
                  <li>Microsoft Azure</li>
                  <li>MFA, PKI & mTLS</li>
                  <li>Secrets & Key Management</li>
                  <li>Docker & Kubernetes</li>
                  <li>Infrastructure as Code</li>
                  <li>Serverless & Edge Computing</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Network className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">Network Security</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Designing and hardening network infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>TCP/IP, Subnetting & IPv6</li>
                  <li>Routing & Switching (Cisco)</li>
                  <li>Firewalls, VPN & IPSec</li>
                  <li>DNS & Group Policy</li>
                  <li>WAF, Bot Detection & Rate Limiting</li>
                  <li>System Hardening</li>
                  <li>Linux & Server Administration</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Bot className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-foreground">AI Engineering</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Secure AI-driven systems in production
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>AI Agents</li>
                  <li>Multi-Provider LLM Integration</li>
                  <li>MCP Servers</li>
                  <li>Agentic Workflow Automation</li>
                  <li>OAuth 2.1 & Role-Based Access</li>
                  <li>PostgreSQL & API Design</li>
                  <li>CI/CD, Git & GitHub</li>
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
                    Cyber security specialist based in Sydney, with a Bachelor of Cyber Security from Victoria University
                    (Distinction average) and hands-on experience securing AWS and Azure cloud environments, enterprise networks
                    and production web applications. My foundation is in{" "}
                    <span className="text-blue-400 font-semibold">security operations, vulnerability assessment, penetration
                    testing and digital forensics</span>, supported by Australian and international cyber law, privacy regulation
                    and professional ethics.
                  </p>

                  <p>
                    I build production platforms end to end, across a{" "}
                    <span className="text-blue-400 font-semibold">broad range of frameworks, languages, databases and cloud
                    services</span> rather than a single stack, and secure them the way they should be: a WAF and bot
                    mitigation at the edge, real authentication and least privilege at the database.
                  </p>

                  <p>
                    I design systems that{" "}
                    <span className="text-blue-400 font-semibold">AI agents can operate safely</span>: the business rules live in
                    the database instead of in a prompt, and every agent holds its own credential and permissions. My own services
                    company, Awesome Services, runs around 95% of its invoicing and financial year reporting through agents this
                    way, and closes its books without anyone opening a spreadsheet.
                  </p>

                  <p>
                    I am currently studying a Master of Applied Information Technology at Victoria University, and hold Google,
                    IBM and TAFE NSW certificates in cyber security, AI and full-stack development, plus an Advanced Diploma of
                    Leadership and Management. My background in international logistics and running my own business
                    taught me to ask what a system costs to run, not just whether it works.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Sydney, Australia</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                    <span className="min-w-0 break-all">andres.henaocastro@live.vu.edu.au</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                    <span className="min-w-0 break-all">andreshenao.tech@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>+61 404 682 541</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Linkedin className="h-4 w-4 text-blue-400 shrink-0" />
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
                    <Briefcase className="h-4 w-4 text-blue-400 shrink-0" />
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
                    Security Operations
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    Cloud &amp; Network Security
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    Security-First Engineering
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium">
                    AI Agent Systems
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
                      <CountUp end={95} suffix="%" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Billing Run by AI Agents</div>
                      <div className="text-xs text-muted-foreground/70">Awesome Services</div>
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
                      <CountUp end={180} className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Automated Tests Guarding AI Triage</div>
                      <div className="text-xs text-muted-foreground/70">PitsyPet</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CountUp end={96} suffix="%" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Client Retention</div>
                      <div className="text-xs text-muted-foreground/70">Awesome Services</div>
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
                      <CountUp end={20} suffix="+" className="text-4xl font-bold text-blue-400 mb-1" />
                      <div className="text-sm text-muted-foreground">Years in Operations and Leadership</div>
                      <div className="text-xs text-muted-foreground/70">Logistics, business, now security engineering</div>
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
              My degrees, including the Master I am studying now, an earlier management diploma, and the certificates I have earned along the way. Cards with a link open the credential.
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
                {/* Master of Applied Information Technology */}
                <div className="rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Master of Applied Information Technology (In Progress)</h4>
                  <p className="text-blue-400 text-sm mb-3">Victoria University</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Sep 2026 - Expected 2028</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>Sydney, Australia</span>
                    </div>
                  </div>
                </div>

                {/* Bachelor of Cyber Security */}
                <Link
                  href="https://www.myequals.net/sharelink/dfec10ea-edd1-4de8-bc95-e6396b566714/a98af054-f99b-4ca7-b8e0-e0d309557328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">Bachelor of Cyber Security</h4>
                      <p className="text-blue-400 text-sm mb-3">Victoria University</p>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>2023 - 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>Sydney, Australia</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        Graduated with a Distinction average (WAM 73.58, GPA 5.96 / 7.0). High Distinctions in IT Capstone Project 1 and 2, Cyber Security Essentials, Virtualisation in Computing, and Small IT Business.
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                  </div>
                </Link>

                {/* Advanced Diploma */}
                <EducationPdfCard
                  title="Advanced Diploma of Leadership and Management"
                  institution="Australian Pacific College"
                  period="Aug 2016 - May 2018"
                  location="Sydney, Australia"
                  pdfUrl="/Diploma_Management.webp"
                />

                {/* Bachelor International Trade */}
                <div className="rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Bachelor of International Trade and Logistics Management</h4>
                  <p className="text-blue-400 text-sm mb-3">Uninpahu University</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Feb 2003 - Oct 2007</span>
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
                Notes From the Lab
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Occasional write-ups on cyber security, AI agents and cloud infrastructure. Only when there is something worth sending.
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
                What I am building, breaking and reading about in cyber security, AI and cloud. Written from practice, not theory.
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

      {/* Professional Profiles */}
      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-foreground mb-2">Find Me Professionally</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            My full work history and current availability, kept up to date on both platforms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://www.linkedin.com/in/andreshenao/" target="_blank" rel="noopener noreferrer" className="inline-flex">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </Button>
            </a>
            <a href="https://au.seek.com/profiles/andres-henao-FdYyBD5Xcp" target="_blank" rel="noopener noreferrer" className="inline-flex">
              <Button size="lg" variant="outline" className="gap-2 border-blue-500/20 hover:border-blue-500 hover:bg-blue-500/10">
                <Briefcase className="h-4 w-4 text-blue-500" />
                Seek Profile
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
