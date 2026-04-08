import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconRenderer } from "@/components/icon-renderer"
import { getToolkits } from "@/actions/toolkits"

export default async function SecurityToolsPage() {
    const tools = await getToolkits()

    return (
        <div className="flex flex-col">
            <section className="w-full pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-10 bg-background relative overflow-hidden">
                <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 pb-2">
                                Toolkit
                            </h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                A curated collection of essential cybersecurity tools to enhance your security posture.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
                <div className="absolute inset-0 bg-background/80"></div>
            </section>

            <section className="w-full pt-0 pb-12 md:pb-24 lg:pb-32 bg-background">
                <div className="container px-4 md:px-6 lg:px-12 xl:px-24">
                    {tools.length === 0 ? (
                        <div className="text-center py-24 text-muted-foreground">No tools yet.</div>
                    ) : (
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {tools.map((tool) => (
                                <Card
                                    key={tool.id}
                                    className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col"
                                >
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                                                <IconRenderer name={tool.icon} className="h-8 w-8 text-primary" />
                                            </div>
                                            <Badge>{tool.category}</Badge>
                                        </div>
                                        <CardTitle>{tool.name}</CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="mb-4 text-sm text-muted-foreground">{tool.body}</p>
                                        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                            <Button variant="outline" className="flex items-center gap-2" asChild>
                                                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4" />
                                                    {tool.urlLabel}
                                                </a>
                                            </Button>
                                            {tool.secondaryUrl && (
                                                <Button className="flex items-center gap-2" asChild>
                                                    <a href={tool.secondaryUrl} target="_blank" rel="noopener noreferrer">
                                                        {tool.secondaryLabel === "Download"
                                                            ? <Download className="h-4 w-4" />
                                                            : <ExternalLink className="h-4 w-4" />
                                                        }
                                                        {tool.secondaryLabel}
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
