"use client"

import { useState } from "react"
import { Award, GraduationCap, Briefcase, Calendar, CheckCircle, Mail, Phone, MapPin, Linkedin, ExternalLink, X, Download, Terminal, Shield, Bot, Globe, Github, Code2, Cpu, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

import { ExperienceRoadmap } from "@/components/experience-roadmap"
import { CountUp } from "@/components/count-up"
import { BusinessCard3D } from "@/components/business-card-3d"
import { KeyAchievementsSection } from "@/components/key-achievements-section"

export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<{ name: string; image: string } | null>(null)

  return (
    <div className="flex flex-col">
      {/* Profile Section */}
      <section className="w-full pt-12 md:pt-20 lg:pt-28 pb-12 md:pb-24 lg:pb-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                  Andres <span className="text-blue-500">Henao</span>
                </h2>
                <p className="text-xl">
                  <span className="text-foreground font-semibold">Cyber security specialist | cloud security engineer | mobile and web applications developer | Automation & Cloud Solutions</span>
                </p>
                <p className="text-base text-foreground pt-2">
                  Cyber security specialist with a strong foundation in secure software architecture, cloud automation, and intelligent systems integration
                </p>
                {/* Contact info moved to bottom */}
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Cybersecurity & AI-Driven Full-Stack Engineer with a strong foundation in secure software architecture,
                  cloud automation, and intelligent systems integration. Experienced in designing and deploying end-to-end
                  solutions using Python, Flask, Django, Docker, and SQL, with a focus on security, scalability, and
                  resilience.
                </p>
                <p className="text-muted-foreground">
                  Skilled in implementing AI agents, LLM orchestration, and automation pipelines that enhance performance
                  and streamline operations. As Founder of Awesome Services, I led the adoption of AI and workflow
                  automation to improve operational accuracy by 90% and client retention by 96%.
                </p>
                <p className="text-muted-foreground">
                  Backed by IBM certifications in AI, backend, and full-stack development, I bring a practical,
                  multidisciplinary perspective combining cybersecurity principles with automation and real-world execution
                  to build secure, intelligent, and efficient systems.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="relative w-full">
                <div className="relative w-full">
                  <BusinessCard3D />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Skills & Specializations</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Comprehensive technical skills across cybersecurity, AI, development, and cloud infrastructure.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AccordionItem value="cybersecurity">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Cybersecurity & Network Defense
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cyber Threat Analysis</p>
                      <p className="text-sm text-muted-foreground">Identifying and analyzing security threats</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Vulnerability Management</p>
                      <p className="text-sm text-muted-foreground">Systematic vulnerability assessment and remediation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Incident Response</p>
                      <p className="text-sm text-muted-foreground">Security incident handling and recovery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">SIEM Tools & Risk Management</p>
                      <p className="text-sm text-muted-foreground">Security monitoring and risk assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Network Security</p>
                      <p className="text-sm text-muted-foreground">Network architecture protection and monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Firewall Configuration</p>
                      <p className="text-sm text-muted-foreground">Rule management and traffic filtering</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Security Hardening</p>
                      <p className="text-sm text-muted-foreground">System and application hardening practices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cloudflare & Arcjet Security</p>
                      <p className="text-sm text-muted-foreground">Edge security, WAF, and bot mitigation</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="development">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Software & Full-Stack Development
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Next.js & TypeScript</p>
                      <p className="text-sm text-muted-foreground">Production-grade React applications with App Router</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Python Development</p>
                      <p className="text-sm text-muted-foreground">Python, Flask, Django frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">API Development</p>
                      <p className="text-sm text-muted-foreground">RESTful API design and integration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Full-Stack Development</p>
                      <p className="text-sm text-muted-foreground">Front-end and back-end development</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Docker & Containerization</p>
                      <p className="text-sm text-muted-foreground">Container orchestration and deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">GitHub & Version Control</p>
                      <p className="text-sm text-muted-foreground">Git workflows and collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">SQL & Database Design</p>
                      <p className="text-sm text-muted-foreground">Database architecture and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Supabase & PostgreSQL</p>
                      <p className="text-sm text-muted-foreground">Serverless database, auth, and MCP integration</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-automation">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Artificial Intelligence & Automation
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">LLM Integration</p>
                      <p className="text-sm text-muted-foreground">Large language model implementation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">AI Agent Implementation</p>
                      <p className="text-sm text-muted-foreground">Autonomous AI agent development</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Workflow Automation</p>
                      <p className="text-sm text-muted-foreground">n8n and workflow orchestration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Process Optimization</p>
                      <p className="text-sm text-muted-foreground">Business process improvement through automation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">MCP Servers for AI</p>
                      <p className="text-sm text-muted-foreground">Model Context Protocol implementation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">OpenAI API</p>
                      <p className="text-sm text-muted-foreground">GPT-4o integration, function calling, and AI assistants</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cloud">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Cloud Computing & Infrastructure
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cloud Computing</p>
                      <p className="text-sm text-muted-foreground">AWS and IBM Cloud platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Linux System Administration</p>
                      <p className="text-sm text-muted-foreground">Server management and configuration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Containerization</p>
                      <p className="text-sm text-muted-foreground">Docker and container orchestration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cloud Security Principles</p>
                      <p className="text-sm text-muted-foreground">Secure cloud architecture and deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Vercel & Edge Deployment</p>
                      <p className="text-sm text-muted-foreground">Serverless and edge-native production deployments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">GitHub Actions & CI/CD</p>
                      <p className="text-sm text-muted-foreground">Automated build, test, and deployment pipelines</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Data Analysis & Visualization
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data Mining</p>
                      <p className="text-sm text-muted-foreground">Extracting insights from large datasets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data Analysis</p>
                      <p className="text-sm text-muted-foreground">Statistical analysis and interpretation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data Visualization</p>
                      <p className="text-sm text-muted-foreground">Creating interactive dashboards and reports</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data-Driven Decision-Making</p>
                      <p className="text-sm text-muted-foreground">Business intelligence and analytics</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="problem-solving">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Problem Solving & Collaboration
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Debugging & Troubleshooting</p>
                      <p className="text-sm text-muted-foreground">Root cause analysis and systematic problem resolution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cross-Functional Communication</p>
                      <p className="text-sm text-muted-foreground">Bridging technical and non-technical stakeholders</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Continuous Improvement</p>
                      <p className="text-sm text-muted-foreground">Iterative refinement of systems and workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Technical Leadership</p>
                      <p className="text-sm text-muted-foreground">Leading cross-functional teams and technology adoption</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Professional Experience</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                My journey from international logistics to tech entrepreneurship and cybersecurity.
              </p>
            </div>
          </div>

          <ExperienceRoadmap />
        </div>
      </section>

      {/* Engineering Lab */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">

          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Engineering Lab</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Production platforms designed, built, and deployed independently. Each one solves a real problem with real infrastructure.
              </p>
            </div>
          </div>

          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl items-stretch gap-6 lg:gap-8">

            {/* THE WATCHTOWER */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-400 mb-2" />
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-foreground">The Watchtower</CardTitle>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Live
                  </span>
                </div>
                <CardDescription className="text-blue-400 text-xs font-medium">Security Engineer & AI Developer</CardDescription>
                <p className="text-sm text-muted-foreground pt-1">
                  Live threat-hunting honeypot and active defense platform. Hardware-fingerprints every visitor, assigns a dynamic risk score, and deploys Sentinel-02, a GPT-4o AI persona that turns adversaries into the dataset.
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <ul className="space-y-2">
                  {[
                    "Triple Lock honeypot system targeting script kiddies, scanners, and skilled manual adversaries",
                    "Sentinel-02 GPT-4o security persona with gamified operations and Wall of Infamy",
                    "Real-time global threat heatmap via D3-Geo classifying 13 attack technique types",
                    "Vercel Edge runtime with Arcjet WAF, bot detection, and hardware fingerprinting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js 16", "GPT-4o", "Arcjet", "Neon DB", "D3-Geo", "TypeScript", "Vercel Edge"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-2">
                  <Link href="https://sentinel.andreshenao.com.au/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" /> Live Platform
                  </Link>
                  <Link href="https://github.com/cryptotweezer/cryptotweezer-THE-WATCHTOWER" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* PROJECT INTELLIGENCE SYSTEM */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Brain className="h-10 w-10 text-blue-400 mb-2" />
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-foreground">Project Intelligence System</CardTitle>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Live
                  </span>
                </div>
                <CardDescription className="text-blue-400 text-xs font-medium">Full-Stack Engineer & AI Architect</CardDescription>
                <p className="text-sm text-muted-foreground pt-1">
                  Shared AI context layer built on Supabase MCP. Claude, Cursor, and Windsurf all read the same structured project database, eliminating repeated context-setting across tool switches.
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <ul className="space-y-2">
                  {[
                    "Supabase MCP integration as shared intelligence layer across all connected AI tools",
                    "Dash GPT-4o agent with 20-iteration tool-calling loop for full project lifecycle management",
                    "Multi-user Google OAuth with Row Level Security and pg_cron automated data cleanup",
                    "Drag-and-drop step planning with DnD Kit and automatic completion percentage tracking",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js 14", "GPT-4o", "Supabase MCP", "TypeScript", "Arcjet", "DnD Kit", "Vercel"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-2">
                  <Link href="https://intel.andreshenao.com.au" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" /> Live Platform
                  </Link>
                  <Link href="https://github.com/cryptotweezer/Project-Intelligence-System" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* PORTFOLIO WEBSITE */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              <CardHeader>
                <Globe className="h-10 w-10 text-blue-400 mb-2" />
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-foreground">Portfolio Website</CardTitle>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Live
                  </span>
                </div>
                <CardDescription className="text-blue-400 text-xs font-medium">Full-Stack Engineer & Designer</CardDescription>
                <p className="text-sm text-muted-foreground pt-1">
                  Production full-stack portfolio and personal CMS. Every section is database-driven and manageable through a custom admin dashboard without touching the codebase after deployment.
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <ul className="space-y-2">
                  {[
                    "Database-driven CMS with custom admin dashboard and RBAC authentication via Clerk",
                    "Boto AI assistant powered by OpenAI with function calling for conversational lead collection",
                    "Bot protection and WAF via Arcjet across all public routes and API endpoints",
                    "Three.js interactive 3D globe with React Three Fiber and auto-slug PostgreSQL trigger",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js 16", "TypeScript", "Supabase", "Clerk", "OpenAI", "Arcjet", "Three.js", "Vercel"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-2">
                  <Link href="https://cv.andreshenao.com.au/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" /> cv.andreshenao.com.au
                  </Link>
                  <Link href="https://github.com/cryptotweezer/Resume" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Professional Achievements */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Key Achievements</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Measurable results demonstrating business impact and technical excellence.
              </p>
            </div>
          </div>

          <KeyAchievementsSection />
        </div>
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
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {/* Google Certifications */}
                <AccordionItem value="google-certs">
                  <AccordionTrigger className="text-lg font-bold text-foreground hover:text-blue-400">
                    Google
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {/* Google Cybersecurity */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/professional-cert/BINIP8X1QBM3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Google Cybersecurity Professional Certificate</h4>
                            <p className="text-sm text-muted-foreground">Google</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* Google IT Support */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/professional-cert/Y35QY6SIKLXI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Google IT Support</h4>
                            <p className="text-sm text-muted-foreground">Google</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* IBM Certifications */}
                <AccordionItem value="ibm-certs">
                  <AccordionTrigger className="text-lg font-bold text-foreground hover:text-blue-400">
                    IBM
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {/* IBM Back-End Development */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/specialization/0BVEGHMWSPLF"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">IBM Back-End Development Specialization</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* IBM Front-End Developer */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/specialization/AG9RGMR504RD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">IBM Front-End Developer Specialization</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* IBM Full Stack Software Developer */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/specialization/Q817ETDN3EKR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">IBM Full Stack Software Developer Specialization</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* IBM Full-Stack JavaScript */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/specialization/HGMED6ZIZIUL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">IBM Full-Stack JavaScript Developer Specialization</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* Developing AI Applications */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/verify/NKK0VVE1OAJP"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Developing AI Applications with Python and Flask</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>

                      {/* Python for Data Science */}
                      <Link
                        href="https://www.coursera.org/account/accomplishments/verify/LQB0JNP5C3AX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Python for Data Science, AI & Development</h4>
                            <p className="text-sm text-muted-foreground">IBM</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* TAFE NSW Certifications */}
                <AccordionItem value="tafe-certs">
                  <AccordionTrigger className="text-lg font-bold text-foreground hover:text-blue-400">
                    TAFE NSW
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {/* Responsible AI */}
                      <button
                        onClick={() => setSelectedCertificate({
                          name: "Responsible Artificial Intelligence",
                          image: "/responsible_artificial_intelligence.png"
                        })}
                        className="w-full text-left rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Responsible Artificial Intelligence</h4>
                            <p className="text-sm text-muted-foreground">TAFE NSW</p>
                          </div>
                          <Award className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </button>

                      {/* Introduction to AI */}
                      <button
                        onClick={() => setSelectedCertificate({
                          name: "Introduction to Artificial Intelligence (AI)",
                          image: "/Introduction_to_artificial_intelligence.png"
                        })}
                        className="w-full text-left rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Introduction to Artificial Intelligence (AI)</h4>
                            <p className="text-sm text-muted-foreground">TAFE NSW</p>
                          </div>
                          <Award className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </button>

                      {/* Generative AI */}
                      <button
                        onClick={() => setSelectedCertificate({
                          name: "Generative AI and its Business Applications",
                          image: "/generative_ai_and_its_business_applications.png"
                        })}
                        className="w-full text-left rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-4 hover:border-blue-500 transition-all duration-500 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Generative AI and its Business Applications</h4>
                            <p className="text-sm text-muted-foreground">TAFE NSW</p>
                          </div>
                          <Award className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                        </div>
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 text-center">
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Let's Connect</h2>
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Sydney, Australia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:andres.henaocastro@live.vu.edu.au" className="hover:text-primary transition-colors">
                  andres.henaocastro@live.vu.edu.au
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:andreshenao.tech@gmail.com" className="hover:text-primary transition-colors">
                  andreshenao.tech@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/Andres_Henao_Resume.pdf" download="Andres_Henao_Resume.pdf" className="inline-flex">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-4 w-4" />
                Download Full Resume
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2 border-blue-500/20 hover:border-blue-500 hover:bg-blue-500/10">
                <Mail className="h-4 w-4 text-blue-500" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="p-6 pb-4 flex-shrink-0">
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedCertificate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full overflow-y-auto overflow-x-hidden px-6 pb-6 flex-1">
            {selectedCertificate && (
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                priority={false}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
