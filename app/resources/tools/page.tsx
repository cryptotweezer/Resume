export const revalidate = 3600;

import { getToolkits } from "@/actions/toolkits"
import { ToolkitGrid } from "@/components/toolkit-grid"

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
                                A curated collection of tools across cybersecurity, AI development, and cloud infrastructure.
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
                        <ToolkitGrid tools={tools} />
                    )}
                </div>
            </section>
        </div>
    )
}
