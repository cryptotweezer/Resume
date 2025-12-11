import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthSync } from "@/components/auth-sync";
import ChatWidget from "@/components/ChatWidget";
import { UIProvider } from "@/context/ui-context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs"; // Removed unused imports

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andres Henao Resume | Cybersecurity & AI Engineer",
  description: "Cybersecurity & AI-Driven Full-Stack Engineer specializing in automation, cloud solutions, and secure software architecture. Expert in Python, Flask, Django, Docker, LLM integration, and workflow automation.",
  generator: 'v0.dev',
  keywords: ['cybersecurity', 'AI engineer', 'full-stack developer', 'automation', 'cloud security', 'Python', 'Flask', 'Django', 'Docker', 'LLM', 'workflow automation', 'security architecture'],
  icons: {
    icon: '/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* Include AuthSync component for auto user role assignment */}
          <AuthSync />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <UIProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster />
                <ChatWidget />
              </div>
            </UIProvider>
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
