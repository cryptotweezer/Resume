"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, ChevronDown } from "lucide-react";
import { IconRenderer } from "@/components/icon-renderer";
import { ToolkitRow } from "@/actions/toolkits";
import { cn } from "@/lib/utils";

export function ToolkitGrid({ tools }: { tools: ToolkitRow[] }) {
    const categories = ["All", ...Array.from(new Set(tools.map((t) => t.category)))];
    const [active, setActive] = useState("All");

    const filtered = active === "All" ? tools : tools.filter((t) => t.category === active);

    return (
        <div>
            {/* Mobile: dropdown */}
            <div className="md:hidden mb-8">
                <div className="relative">
                    <select
                        value={active}
                        onChange={(e) => setActive(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-primary/20 bg-background px-4 py-3 pr-10 text-sm font-medium text-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
            </div>

            {/* Desktop: pill buttons */}
            <div className="hidden md:flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                            active === cat
                                ? "bg-blue-500 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                                : "border-primary/20 text-muted-foreground hover:border-blue-500/50 hover:text-foreground"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
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
        </div>
    );
}
