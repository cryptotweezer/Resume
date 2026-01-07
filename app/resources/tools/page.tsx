import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Shield, Download, Terminal, Sparkles, Code, Workflow, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SecurityToolsPage() {
    return (
        <div className="flex flex-col">
            <section className="w-full pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-10 bg-background relative overflow-hidden">
                <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 pb-2">Toolkit</h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                A curated collection of essential cybersecurity tools to enhance your security posture.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Animated background */}
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
                <div className="absolute inset-0 bg-background/80"></div>
            </section>

            <section className="w-full pt-0 pb-12 md:pb-24 lg:pb-32 bg-background">
                <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {/* Network Security Tools */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Network Security</Badge>
                                </div>
                                <CardTitle>Wireshark</CardTitle>
                                <CardDescription>
                                    The world&apos;s foremost and widely-used network protocol analyzer for network troubleshooting and
                                    analysis.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Wireshark is a free and open-source packet analyzer used for network troubleshooting, analysis,
                                    software and communications protocol development, and education.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://www.wireshark.org/download.html" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vulnerability Assessment */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Vulnerability Assessment</Badge>
                                </div>
                                <CardTitle>Nmap</CardTitle>
                                <CardDescription>
                                    A free and open source utility for network discovery and security auditing.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Nmap uses raw IP packets to determine what hosts are available on the network, what services those
                                    hosts are offering, what operating systems they are running, and more.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://nmap.org/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://nmap.org/download.html" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Penetration Testing */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Penetration Testing</Badge>
                                </div>
                                <CardTitle>Metasploit Framework</CardTitle>
                                <CardDescription>
                                    A powerful open-source penetration testing framework used for developing and executing exploit code
                                    against remote targets.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    The Metasploit Framework is a Ruby-based, modular penetration testing platform that enables you to
                                    write, test, and execute exploit code.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://www.metasploit.com/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://www.metasploit.com/download" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kali Linux */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Penetration Testing</Badge>
                                </div>
                                <CardTitle>Kali Linux</CardTitle>
                                <CardDescription>
                                    The most advanced Penetration Testing Distribution.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Kali Linux is an open-source, Debian-based Linux distribution geared towards various information security tasks, such as Penetration Testing, Security Research, Computer Forensics and Reverse Engineering.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://www.kali.org/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://www.kali.org/get-kali/" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Password Security */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Password Security</Badge>
                                </div>
                                <CardTitle>KeePass</CardTitle>
                                <CardDescription>A free, open source, lightweight, and easy-to-use password manager.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    KeePass helps you to manage your passwords in a secure way. You can store all your passwords in one
                                    database, which is locked with a master key.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://keepass.info/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://keepass.info/download.html" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Forensics */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Digital Forensics</Badge>
                                </div>
                                <CardTitle>Autopsy</CardTitle>
                                <CardDescription>
                                    A digital forensics platform and graphical interface to The Sleuth Kit and other digital forensics
                                    tools.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Autopsy is a digital forensics tool that makes it easier to analyze hard drives and smartphones. It
                                    has a plug-in architecture that allows you to find add-on modules or develop custom modules.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://www.autopsy.com/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://www.autopsy.com/download/" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Encryption */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Encryption</Badge>
                                </div>
                                <CardTitle>VeraCrypt</CardTitle>
                                <CardDescription>A free disk encryption software based on TrueCrypt.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    VeraCrypt is a free, open-source disk encryption software that can create a virtual encrypted disk
                                    within a file or encrypt a partition or the entire storage device with pre-boot authentication.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://www.veracrypt.fr/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://www.veracrypt.fr/en/Downloads.html" target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Development */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Terminal className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>AI Development</Badge>
                                </div>
                                <CardTitle>Claude Code CLI</CardTitle>
                                <CardDescription>
                                    An advanced AI coding assistant that lives in your terminal, helping you write, debug, and understand code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Claude Code is a CLI tool that brings the power of Claude directly into your development workflow,
                                    enabling complex reasoning and code generation.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Docs
                                        </a>
                                    </Button>
                                    {/* No direct download link, usually installed via npm/pip/curl */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gemini CLI */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Sparkles className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>AI Development</Badge>
                                </div>
                                <CardTitle>Gemini CLI</CardTitle>
                                <CardDescription>
                                    Interact with Google&apos;s Gemini models directly from your command line for rapid prototyping and development.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    The Gemini CLI allows developers to access Gemini Pro and other models to generate text, code, and analyze images
                                    via the Google AI SDK.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://geminicli.com/docs/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Docs
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Codex CLI */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Code className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>AI Development</Badge>
                                </div>
                                <CardTitle>Codex CLI</CardTitle>
                                <CardDescription>
                                    An AI-powered coding assistant for your terminal, capable of reading, writing, and executing code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    The OpenAI Codex CLI brings reasoning models directly to your command line, helping you build features,
                                    debug issues, and understand code.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://chatgpt.com/features/codex" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Docs
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* n8n */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Workflow className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>Workflow Automation</Badge>
                                </div>
                                <CardTitle>n8n</CardTitle>
                                <CardDescription>
                                    Fair-code workflow automation tool that helps you connect any app with an API to any other.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    n8n lets you build complex automation workflows with AI capabilities, integrating with thousands of services
                                    and using custom code when needed.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Website
                                        </a>
                                    </Button>
                                    <Button className="flex items-center gap-2" asChild>
                                        <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Docs
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Model Context Protocol */}
                        <Card className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                        <Database className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge>AI Protocol</Badge>
                                </div>
                                <CardTitle>Model Context Protocol (MCP)</CardTitle>
                                <CardDescription>
                                    The open standard for connecting AI assistants to systems.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    MCP provides a universal way to connect AI models to data sources and tools, replacing fragmented integrations with a standardized protocol.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                    <Button variant="outline" className="flex items-center gap-2" asChild>
                                        <a href="https://modelcontextprotocol.io/introduction" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Docs
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section >
        </div >
    )
}
