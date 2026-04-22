"use client";

import { Shield, Cloud, Code2, Bot, Lock, Server, Database, Globe, Terminal, Sparkles, Code, Workflow, Wrench, Brain, Network, Key, Search, FileSearch, HardDrive, Box, Zap, GitBranch } from "lucide-react";

const iconMap: Record<string, any> = {
    Shield,
    Cloud,
    Code2,
    Bot,
    Lock,
    Server,
    Database,
    Globe,
    Terminal,
    Sparkles,
    Code,
    Workflow,
    Wrench,
    Brain,
    Network,
    Key,
    Search,
    FileSearch,
    HardDrive,
    Box,
    Zap,
    GitBranch,
};

export function IconRenderer({ name, className }: { name: string; className?: string }) {
    const IconComponent = iconMap[name] || Globe; // Default to Globe if not found
    return <IconComponent className={className} />;
}
