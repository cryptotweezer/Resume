"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Award, ExternalLink } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CertificationsSection() {
    const [selectedCertificate, setSelectedCertificate] = useState<{ name: string; image: string } | null>(null)

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <Award className="h-6 w-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                </div>

                <Accordion type="single" collapsible className="w-full">
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
        </>
    )
}
