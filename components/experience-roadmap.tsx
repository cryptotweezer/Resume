"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExperienceItem {
    title: string
    company: string
    period: string
    location: string
    description: string[]
}

const experiences: ExperienceItem[] = [
    {
        title: "Managing Director",
        company: "Awesome Services",
        period: "Oct 2013 – Present",
        location: "Sydney, Australia",
        description: [
            "Led full business operations including client acquisition, workforce management, quality control, and financial oversight across multi-site operations.",
            "Designed and implemented automation workflows with n8n and Python, improving operational accuracy by 90 % and reducing administrative workload.",
            "Developed and deployed a customer service QA workflow, boosting client retention by 96% and improving overall satisfaction ratings.",
            "Built and trained cross-functional cleaning teams, enforcing service standards and safety compliance across all job sites.",
            "Handled all financial operations including budgeting, expense tracking, invoicing, payroll, and vendor payments.",
            "Resolved customer concerns with a proactive, solutions-focused approach",
            "Analyzed service trends, client feedback, and operational KPIs to continuously refine offerings and exceed customer expectations."
        ]
    },
    {
        title: "Logistics Specialist In-House",
        company: "Kemira Chemicals Brazil Ltda. / Coordinadora Logistica Internacional",
        period: "July 2008 – Mar 2013",
        location: "Bogotá, Colombia",
        description: [
            "Served as in-house logistics specialist supporting Kemira Netherlands operations in Colombia, overseeing international transport and warehousing.",
            "Led the strategic design and implementation of the Logistics Support Warehouse (DAL) in Colombia, creating a regional logistics hub that improved service coverage and reduced international delivery times to Central American markets.",
            "Analyzed shipping and warehouse data to identify inefficiencies, leading to process improvements that increased on-time delivery rates and optimized stock distribution.",
            "Developed operational reports and interactive dashboards to enhance data visibility, cost forecasting accuracy, and carrier performance tracking.",
            "Managed coordination of national and international sea, air, and overland freight, ensuring compliance with customs and safety regulations.",
            "Negotiated rates and contracts with global carriers, reducing transportation costs and improving delivery timelines.",
            "Maintained and updated logistics and inventory databases, minimizing data errors and improving cross-departmental reporting reliability.",
            "Led the implementation and training rollout of a new logistics management system, improving tracking precision and warehouse efficiency across multiple sites"
        ]
    },
    {
        title: "Account Manager",
        company: "Coordinadora Logistica Internacional",
        period: "Feb 2006 – June 2008",
        location: "Bogotá, Colombia",
        description: [
            "Managed national and international client accounts across multiple industries, delivering tailored logistics and supply chain solutions aligned with business needs.",
            "Coordinated sea, air, and overland transport operations, ensuring on-time and cost-effective delivery of goods while maintaining full compliance with international trade regulations.",
            "Oversaw daily operations across multiple warehouses, improving inventory accuracy, inbound/outbound scheduling, and operational efficiency.",
            "Negotiated contracts and freight rates with global carriers to reduce delivery costs and optimize transport timelines.",
            "Analyzed logistics performance data to identify bottlenecks, improve KPIs, and streamline end-to-end workflows.",
            "Collaborated with cross-functional teams to enhance client experience, operational visibility, and service quality.",
            "Supported business development initiatives, contributing to the acquisition of new international clients and expansion of the company’s service portfolio."
        ]
    },
    {
        title: "Operations Specialist",
        company: "Kuehne & Nagel",
        period: "Feb 2005 – Jan 2006",
        location: "Bogotá, Colombia",
        description: [
            "Oversaw international logistics operations and process optimization initiatives for major corporate clients, improving efficiency and accuracy in shipment coordination.",
            "Supported the implementation and rollout of the KN internal logistics tracking system, ensuring seamless adoption through staff training and process documentation.",
            "Coordinated international freight operations across air, sea, and land transport, managing customs documentation, regulatory compliance, and real-time tracking.",
            "Monitored performance metrics and key operational KPIs to enhance shipment visibility, reduce transit delays, and improve on-time delivery rates.",
            "Collaborated with cross-border teams to troubleshoot logistics bottlenecks and maintain smooth, end-to-end delivery workflows.",
            "Served as Chair of the Occupational Health and Safety Committee, leading compliance initiatives and promoting workplace safety standards across the branch"
        ]
    },
    {
        title: "Customer Service Specialist",
        company: "Kuehne & Nagel",
        period: "Jan 2003 – Dec 2004",
        location: "Bogotá, Colombia",
        description: [
            "Coordinated import and export operations for domestic and international clients, ensuring shipment accuracy, compliance, and timely delivery.",
            "Served as the primary client liaison, providing proactive communication, real-time updates, and resolution of shipment-related issues.",
            "Prepared and validated logistics and customs documentation, maintaining compliance with international shipping and trade regulations.",
            "Collaborated with carriers, customs agents, and warehouse teams to streamline operations and reduce delivery delays.",
            "Strengthened long-term client relationships through consistent service quality, problem resolution, and tailored logistics solutions.",
            "Contributed to internal process improvements that enhanced efficiency and supported customer satisfaction goals"
        ]
    }
]

export function ExperienceRoadmap() {
    const [activeIndices, setActiveIndices] = useState<number[]>([])
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"))
                        if (!isNaN(index)) {
                            setActiveIndices((prev) => {
                                if (prev.includes(index)) return prev
                                return [...prev, index]
                            })
                        }
                    }
                })
            },
            { threshold: 0.1, rootMargin: "-50px" }
        )

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref)
            })
        }
    }, [])

    return (
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
            {experiences.map((exp, index) => {
                const isActive = activeIndices.includes(index)
                const isEven = index % 2 === 0

                return (
                    <div
                        key={index}
                        ref={(el) => { itemRefs.current[index] = el }}
                        data-index={index}
                        className={cn(
                            "relative flex items-center justify-between md:justify-normal group transition-all duration-700 ease-out",
                            isEven ? "md:flex-row" : "md:flex-row-reverse",
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                    >
                        {/* Icon - Absolutely positioned in center for desktop */}
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow-sm z-10 transition-all duration-500 delay-100",
                            "md:absolute md:-translate-x-1/2",
                            isEven ? "md:left-[calc(50%-3rem)]" : "md:left-[calc(50%+3rem)]",
                            isActive ? "border-blue-500 bg-blue-500/10 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-muted-foreground/20"
                        )}>
                            <Briefcase className={cn(
                                "h-5 w-5 transition-colors duration-300",
                                isActive ? "text-blue-400" : "text-muted-foreground"
                            )} />
                        </div>

                        {/* Spacer for desktop alignment */}
                        <div className="hidden md:block md:w-1/2" />

                        {/* Content Card */}
                        <div className={cn(
                            "w-full md:w-[calc(50%-3rem)] bg-card/50 backdrop-blur-sm p-6 rounded-xl border shadow-sm transition-all duration-500 ml-16 md:ml-0",
                            isEven ? "md:mr-12" : "md:ml-12",
                            isActive ? "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "border-border"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <h3 className={cn(
                                    "font-bold text-lg transition-colors duration-300",
                                    isActive ? "text-blue-400" : "text-foreground"
                                )}>
                                    {exp.title}
                                </h3>
                                <time className="flex items-center text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                                    <Calendar className="h-3.5 w-3.5 mr-2 text-blue-400" />
                                    {exp.period}
                                </time>
                            </div>

                            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                <Briefcase className="h-4 w-4" />
                                <span className="font-medium text-foreground">{exp.company}</span>
                                <span className="mx-1">•</span>
                                <MapPin className="h-4 w-4" />
                                <span>{exp.location}</span>
                            </div>

                            <ul className="space-y-2">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
