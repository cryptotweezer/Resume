"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, FileText, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EducationPdfCardProps {
    title: string
    institution: string
    period: string
    location: string
    pdfUrl: string
}

export function EducationPdfCard({ title, institution, period, location, pdfUrl }: EducationPdfCardProps) {
    const [open, setOpen] = useState(false)
    const [canEmbed, setCanEmbed] = useState(true)

    // Mobile browsers (Chrome on Android in particular) do not render PDFs inside
    // an iframe, so on small screens we offer a full screen viewer instead.
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)")
        const update = () => setCanEmbed(mq.matches)
        update()
        mq.addEventListener("change", update)
        return () => mq.removeEventListener("change", update)
    }, [])

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full text-left block rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
                        <p className="text-blue-400 text-sm mb-3">{institution}</p>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                <span>{period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>
                    <FileText className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                </div>
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] max-w-4xl p-4 sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg pr-8 text-left">{title}</DialogTitle>
                    </DialogHeader>

                    {canEmbed ? (
                        <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-blue-500/20 bg-muted">
                            <iframe src={pdfUrl} title={title} className="w-full h-full" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 rounded-lg border border-blue-500/20 bg-muted/50 px-4 py-8 text-center">
                            <FileText className="h-10 w-10 text-blue-400" />
                            <p className="text-sm text-muted-foreground">
                                Open the transcript in your browser PDF viewer.
                            </p>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                            >
                                View document
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
