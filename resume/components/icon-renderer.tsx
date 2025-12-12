"use client";

import { Shield, Cloud, Code2, Bot, Lock, Server, Database, Globe } from "lucide-react";

const iconMap: Record<string, any> = {
    Shield,
    Cloud,
    Code2,
    Bot,
    Lock,
    Server,
    Database,
    Globe,
};

export function IconRenderer({ name, className }: { name: string; className?: string }) {
    const IconComponent = iconMap[name] || Globe; // Default to Globe if not found
    return <IconComponent className={className} />;
}
