"use client"

import { useState } from "react"
import { Award, GraduationCap, Briefcase, Calendar, CheckCircle, Mail, MapPin, Linkedin, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { EducationPdfCard } from "@/components/education-pdf-card"
import Image from "next/image"

import { ExperienceRoadmap } from "@/components/experience-roadmap"
import { BusinessCard3D } from "@/components/business-card-3d"
import { KeyAchievementsSection } from "@/components/key-achievements-section"
import { LabProjectsSection } from "@/components/lab-projects-section"

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
                  <span className="text-foreground font-semibold">Cyber Security Specialist | Security Operations, Cloud & Network Security | AI Systems Engineer</span>
                </p>
                <p className="text-base text-foreground pt-2">
                  Cyber security specialist based in Sydney, securing cloud environments, networks and production applications, and building AI-driven systems with security built in.
                </p>
                {/* Contact info moved to bottom */}
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  My core expertise is cyber security: digital forensics and ethical hacking, security operations and
                  vulnerability analysis, data analytics for cyber security, data privacy and cyber physical systems,
                  enterprise network management, virtualisation and server administration, and the legal and ethical side
                  of the field.
                </p>
                <p className="text-muted-foreground">
                  I build production platforms end to end, working across a broad set of frameworks, languages, databases and
                  cloud services rather than tying myself to one stack, and secure them properly: a WAF and bot mitigation at
                  the edge, real authentication and least privilege at the database layer. Everything in the Engineering Lab
                  below is live and used by someone.
                </p>
                <p className="text-muted-foreground">
                  I design systems AI agents can operate
                  safely: the rules that protect the numbers live inside the database rather than inside a prompt, and every
                  agent connects with its own credential and its own permissions. My own services company, Awesome Services, runs
                  around 95% of its invoicing and financial year reporting through agents this way, and closes
                  its books without anyone opening a spreadsheet.
                </p>
                <p className="text-muted-foreground">
                  I am currently studying a Master of Applied Information Technology at Victoria University, and hold Google,
                  IBM and TAFE NSW certificates in cyber security, AI and full-stack development, plus an Advanced Diploma of
                  Leadership and Management. My background in international logistics and running my own business taught me
                  to judge a system by what it costs to run, not only by whether it works.
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
                What I know and what I actually use in production, grouped by area. Open a section to see the detail.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AccordionItem value="security-operations">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Security Operations &amp; Threat Detection
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">SIEM &amp; Security Monitoring</p>
                      <p className="text-sm text-muted-foreground">Collecting, correlating and alerting on security logs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Incident Response</p>
                      <p className="text-sm text-muted-foreground">Triage, containment and recovery from security incidents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Threat Analysis &amp; Intelligence</p>
                      <p className="text-sm text-muted-foreground">Understanding attacker behaviour to prioritise defences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Intrusion &amp; Anomaly Detection</p>
                      <p className="text-sm text-muted-foreground">Spotting abnormal activity with IDS and data analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Risk Assessment</p>
                      <p className="text-sm text-muted-foreground">Rating threats and vulnerabilities by business impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Security Logging</p>
                      <p className="text-sm text-muted-foreground">Audit trails that make every action traceable</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="vulnerability">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Vulnerability Management &amp; Forensics
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Vulnerability Assessment &amp; Scanning</p>
                      <p className="text-sm text-muted-foreground">Finding weaknesses in hosts, networks and applications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Penetration Testing</p>
                      <p className="text-sm text-muted-foreground">Controlled attacks to prove and prioritise risk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Ethical Hacking</p>
                      <p className="text-sm text-muted-foreground">Thinking like an attacker within ethical and legal limits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">API Security Testing</p>
                      <p className="text-sm text-muted-foreground">Testing APIs for data leaks and broken access control</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Digital Forensics</p>
                      <p className="text-sm text-muted-foreground">Evidence collection and analysis across memory, OS, email and network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Malware Analysis</p>
                      <p className="text-sm text-muted-foreground">Understanding how viruses and trojans behave and spread</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cloud">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Cloud Security &amp; Virtualisation
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">AWS Security</p>
                      <p className="text-sm text-muted-foreground">IAM, Cognito, Secrets Manager, Lambda, API Gateway, RDS and CloudWatch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Microsoft Azure</p>
                      <p className="text-sm text-muted-foreground">Securing Azure environments and identities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Identity &amp; Key Management</p>
                      <p className="text-sm text-muted-foreground">MFA, PKI, mTLS and digital certificates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Containers &amp; Virtualisation</p>
                      <p className="text-sm text-muted-foreground">Docker, Kubernetes and Hyper-V</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Infrastructure as Code</p>
                      <p className="text-sm text-muted-foreground">Repeatable, reviewable cloud deployments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Serverless &amp; Edge Computing</p>
                      <p className="text-sm text-muted-foreground">Production workloads on serverless and edge platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Disaster Recovery</p>
                      <p className="text-sm text-muted-foreground">High availability and recovery planning</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="network">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Network Security &amp; Infrastructure
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">TCP/IP, Subnetting &amp; IPv6</p>
                      <p className="text-sm text-muted-foreground">Addressing and network design fundamentals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Routing &amp; Switching</p>
                      <p className="text-sm text-muted-foreground">LAN and WAN design with Cisco technologies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Firewalls, VPN &amp; IPSec</p>
                      <p className="text-sm text-muted-foreground">Traffic filtering and encrypted tunnels</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">DNS &amp; Group Policy</p>
                      <p className="text-sm text-muted-foreground">Enterprise network services and policy management</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">System Hardening</p>
                      <p className="text-sm text-muted-foreground">Reducing the attack surface of servers and systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Linux &amp; Server Administration</p>
                      <p className="text-sm text-muted-foreground">Configuring and maintaining servers</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="appsec">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Application Security &amp; Identity
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">WAF &amp; Bot Detection</p>
                      <p className="text-sm text-muted-foreground">Edge protection with Cloudflare and Arcjet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Protecting APIs and AI endpoints from abuse and runaway cost</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">OAuth 2.1 &amp; SSO</p>
                      <p className="text-sm text-muted-foreground">Modern authentication for users and AI agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Role-Based Access Control</p>
                      <p className="text-sm text-muted-foreground">Least privilege enforced in the application and the database</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Row Level Security</p>
                      <p className="text-sm text-muted-foreground">Permissions enforced by PostgreSQL itself</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Secrets Management</p>
                      <p className="text-sm text-muted-foreground">Keeping credentials out of code and out of the browser</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="governance">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Governance, Privacy &amp; Compliance
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Cyber Law &amp; Policy</p>
                      <p className="text-sm text-muted-foreground">Australian and international cyber law</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Privacy Legislation</p>
                      <p className="text-sm text-muted-foreground">Data protection obligations and privacy regulation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Privacy-Preserving Techniques</p>
                      <p className="text-sm text-muted-foreground">Data masking and data authentication</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Security Policies &amp; Standards</p>
                      <p className="text-sm text-muted-foreground">Writing and applying security policies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Professional Ethics</p>
                      <p className="text-sm text-muted-foreground">Ethical and legal responsibilities of security work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">ICT Management</p>
                      <p className="text-sm text-muted-foreground">Aligning IT services with business goals</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ai-automation">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                AI Engineering &amp; Automation
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">AI Agents</p>
                      <p className="text-sm text-muted-foreground">Agents that run real business operations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Multi-Provider LLM Integration</p>
                      <p className="text-sm text-muted-foreground">Model-agnostic integration and tool calling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">MCP Servers</p>
                      <p className="text-sm text-muted-foreground">Model Context Protocol gateways with scoped permissions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Agentic Workflow Automation</p>
                      <p className="text-sm text-muted-foreground">Automating processes end to end with agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">AI-Assisted Development</p>
                      <p className="text-sm text-muted-foreground">Building faster with AI while keeping control of design and security</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Process Optimisation</p>
                      <p className="text-sm text-muted-foreground">Business process improvement through automation</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="development">
              <AccordionTrigger className="text-xl font-bold text-foreground">
                Software Development
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Python, TypeScript, SQL &amp; Bash</p>
                      <p className="text-sm text-muted-foreground">Working knowledge across languages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Next.js &amp; React</p>
                      <p className="text-sm text-muted-foreground">Production web applications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">PostgreSQL &amp; Supabase</p>
                      <p className="text-sm text-muted-foreground">Database design, auth and Row Level Security</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">REST &amp; API Design</p>
                      <p className="text-sm text-muted-foreground">Designing and integrating secure APIs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">CI/CD, Git &amp; GitHub</p>
                      <p className="text-sm text-muted-foreground">Version control and automated deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Agile</p>
                      <p className="text-sm text-muted-foreground">Iterative delivery in teams</p>
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
                            <h4 className="text-foreground font-semibold mb-1 group-hover:text-blue-400 transition-colors">Google IT Support Professional Certificate</h4>
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

      {/* Engineering Lab */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">

          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Engineering Lab</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Platforms I designed, built and deployed on my own. Every one of them is live, and every one of them solves a real problem for the people who use it.
              </p>
            </div>
          </div>

          <LabProjectsSection />
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Professional Experience</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Operations first, in international logistics and then in my own business, and now the security and engineering to protect and automate them.
              </p>
            </div>
          </div>

          <ExperienceRoadmap />
        </div>
      </section>

      {/* Professional Achievements */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Key Achievements</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Numbers that came out of systems people depend on, not out of a demo.
              </p>
            </div>
          </div>

          <KeyAchievementsSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-12 xl:px-24 text-center">
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Let&apos;s Connect</h2>
            <p className="max-w-[600px] text-muted-foreground">
              Open to cyber security, cloud security and AI automation roles in Sydney, and happy to talk through any of the projects above.
            </p>
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Sydney, Australia</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:andres.henaocastro@live.vu.edu.au" className="hover:text-primary transition-colors break-all">
                  andres.henaocastro@live.vu.edu.au
                </a>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:andreshenao.tech@gmail.com" className="hover:text-primary transition-colors break-all">
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

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/andreshenao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/20 text-muted-foreground hover:text-foreground hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-blue-500" />
            </a>
            <a
              href="https://au.seek.com/profiles/andres-henao-FdYyBD5Xcp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seek profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/20 text-muted-foreground hover:text-foreground hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-blue-500" />
            </a>
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
