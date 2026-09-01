"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Linkedin, Briefcase } from "lucide-react"

export function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12 px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {mounted ? (
                <Image
                  src={resolvedTheme === 'light' ? "/logo_black.png" : "/logo_white.png"}
                  alt="Andres Henao Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <div className="h-6 w-6" /> // Placeholder
              )}
              <span className="text-lg font-bold">Andres Henao</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Cyber Security Specialist | Cloud Security Engineer | Mobile and Web Applications Developer | Automation & Cloud Solutions
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="https://www.linkedin.com/in/andreshenao/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-blue-500" />
                LinkedIn
              </Link>
              <Link
                href="https://au.seek.com/profiles/andres-henao-FdYyBD5Xcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
              >
                <Briefcase className="h-4 w-4 text-blue-500" />
                Seek
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/tools" className="text-muted-foreground hover:text-foreground">
                  Tools & Technologies
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.myequals.net/sharelink/c686c840-838e-443a-b719-548dcd2d0fc1/fc0f39a7-46b7-4902-87ac-24e7f42c7a01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bachelor of Cyber Security Academic Transcript
                </Link>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Andres Henao. All rights reserved.</p>
        </div>
      </div>
    </footer >
  )
}
