// Static resume data shared by the UI (experience roadmap, education cards)
// and by the Boto chat assistant system prompt in app/api/chat/route.ts.
// Keep this file as the single source of truth for anything not stored in the DB.

export interface ExperienceItem {
    title: string
    company: string
    period: string
    location: string
    description: string[]
}

export const experiences: ExperienceItem[] = [
    {
        title: "Managing Director",
        company: "Awesome Services",
        period: "Oct 2013 - Present",
        location: "Sydney, Australia",
        description: [
            "Run the business end to end: client acquisition, workforce management, quality control and financial oversight across multiple sites.",
            "Rebuilt billing and financial year reporting around AI agents. Around 95% of invoicing and tax reporting now runs through Claude Code and Codex for day to day work, with more autonomous runners like Hermes and OpenClaw handling the scheduled jobs.",
            "Built the platform those agents operate, with an MCP gateway where each agent connects using its own credential and permissions, and the accounting rules enforced in PostgreSQL instead of in a prompt.",
            "Designed automation workflows with n8n and Python that improved operational accuracy by 90% and removed most of the manual admin from the daily routine.",
            "Deployed a customer service QA workflow that holds client retention at 96% by catching problems before clients have to raise them.",
            "Hired and trained cross-functional cleaning teams, enforcing service standards and safety compliance across every job site.",
            "Handle budgeting, expense tracking, invoicing, payroll and vendor payments.",
            "Track service trends, client feedback and operational KPIs to keep refining what the business offers."
        ]
    },
    {
        title: "Cyber Security Analyst Intern (Industry Project)",
        company: "Employability Advantage, supported by AusBiz Consulting",
        period: "Nov 2025 - Mar 2026",
        location: "Australia",
        description: [
            "Completed a 10-week hands-on Cyber Security (Cloud) industry project, securing AWS and Microsoft Azure environments against real-world vulnerabilities such as misconfigured storage, weak access controls, and vulnerable APIs.",
            "Implemented cloud access control and authentication with AWS IAM, Cognito, MFA, and Secrets Manager, and provisioned firewall-configured RDS databases.",
            "Secured APIs using Lambda, API Gateway, and API key management, and applied key management and mTLS with digital certificates.",
            "Set up monitoring and logging with AWS CloudWatch and demonstrated hands-on threat exposure through API and data-leak penetration testing.",
            "Collaborated through GitHub under Agile project management, accelerating tasks and vulnerability testing with GenAI tools."
        ]
    },
    {
        title: "Logistics Specialist In-House",
        company: "Kemira Chemicals Brazil Ltda. / Coordinadora Logistica Internacional",
        period: "July 2008 - Mar 2013",
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
        period: "Feb 2006 - June 2008",
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
        period: "Feb 2005 - Jan 2006",
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
        period: "Jan 2003 - Dec 2004",
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

export const profileLinks = {
    linkedin: "https://www.linkedin.com/in/andreshenao/",
    seek: "https://au.seek.com/profiles/andres-henao-FdYyBD5Xcp",
    resumePdf: "/Andres_Henao_Resume.pdf",
    academicTranscript:
        "https://www.myequals.net/sharelink/c686c840-838e-443a-b719-548dcd2d0fc1/fc0f39a7-46b7-4902-87ac-24e7f42c7a01",
    degreeCredential:
        "https://www.myequals.net/sharelink/dfec10ea-edd1-4de8-bc95-e6396b566714/a98af054-f99b-4ca7-b8e0-e0d309557328",
    watchtower: "https://sentinel.andreshenao.com.au",
}

export interface EducationItem {
    degree: string
    institution: string
    period: string
    location: string
    notes?: string
    credentialUrl?: string
}

export const education: EducationItem[] = [
    {
        degree: "Bachelor of Cyber Security",
        institution: "Victoria University",
        period: "2023 - 2026",
        location: "Sydney, Australia",
        notes:
            "Graduated with a Distinction average (WAM 73.58, GPA 5.96 / 7.0). High Distinctions in IT Capstone Project 1 and 2, Cyber Security Essentials, Virtualisation in Computing, and Small IT Business.",
        credentialUrl: profileLinks.degreeCredential
    },
    {
        degree: "Advanced Diploma of Leadership and Management",
        institution: "Australian Pacific College",
        period: "Aug 2016 - May 2018",
        location: "Sydney, Australia"
    },
    {
        degree: "Bachelor of International Trade and Logistics Management",
        institution: "Uninpahu University",
        period: "Feb 2005 - Oct 2007",
        location: "Bogota, Colombia"
    }
]

export interface CertificationItem {
    name: string
    issuer: string
    url: string
}

export const certifications: CertificationItem[] = [
    { name: "Google Cybersecurity Professional Certificate", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/professional-cert/BINIP8X1QBM3" },
    { name: "Google IT Support", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/professional-cert/Y35QY6SIKLXI" },
    { name: "IBM Back-End Development Specialization", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/specialization/0BVEGHMWSPLF" },
    { name: "IBM Front-End Developer Specialization", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/specialization/AG9RGMR504RD" },
    { name: "IBM Full Stack Software Developer Specialization", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/specialization/Q817ETDN3EKR" },
    { name: "IBM Full-Stack JavaScript Developer Specialization", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/specialization/HGMED6ZIZIUL" },
    { name: "Developing AI Applications with Python and Flask", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/NKK0VVE1OAJP" },
    { name: "Python for Data Science, AI & Development", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/LQB0JNP5C3AX" },
    { name: "Responsible Artificial Intelligence", issuer: "TAFE NSW", url: "" },
    { name: "Introduction to Artificial Intelligence (AI)", issuer: "TAFE NSW", url: "" },
    { name: "Generative AI and its Business Applications", issuer: "TAFE NSW", url: "" }
]
