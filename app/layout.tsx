import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

const SITE_URL = "https://cv.andreshenao.com.au";
const SITE_TITLE = "Andres Henao Resume | Cybersecurity & AI Engineer";
const SITE_DESCRIPTION = "Cybersecurity & AI-Driven Full-Stack Engineer specializing in automation, cloud solutions, and secure software architecture. Expert in Python, Flask, Django, Docker, LLM integration, and workflow automation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'v0.dev',
  keywords: ['cybersecurity', 'AI engineer', 'full-stack developer', 'automation', 'cloud security', 'Python', 'Flask', 'Django', 'Docker', 'LLM', 'workflow automation', 'security architecture'],
  icons: {
    icon: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    siteName: 'Andres Henao',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        // 1200x630 shot of the landing. Scrapers cache the card by URL, so a
        // new one needs a new filename here rather than a replaced file.
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Andres Henao, Cybersecurity and AI Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-cover.png'],
  },
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
