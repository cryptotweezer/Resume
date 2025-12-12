"use client"
import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs"
import { useUI } from "@/context/ui-context"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAdmin } from "@/hooks/use-admin"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsHoveringAuth } = useUI()
  const { isAdmin } = useAdmin()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Resume" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/resources/tools", label: "Toolkit" },
  ]

  const adminLink = {
    href: "/admin",
    label: "Admin Dashboard"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {mounted ? (
              <Image
                src={resolvedTheme === 'light' ? "/logo_black.png" : "/logo_white.png"}
                alt="Andres Henao Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
            ) : (
              <div className="h-8 w-8" /> // Placeholder to prevent layout shift
            )}
            <span className="">Andres Henao</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-blue-500",
                pathname === link.href ? "text-blue-500 font-bold" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetTitle className="text-left">Menu</SheetTitle>

              <SignedIn>
                <div className="mt-6 mb-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonPopoverCard: "z-[9999]",
                          userButtonPopoverFooter: "z-[9999]"
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">My Account</span>
                  </div>
                  <SignOutButton>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </SignedIn>

              <nav className="flex flex-col gap-4 mt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href ? "text-blue-500 bg-blue-500/10" : "text-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Add Admin link in mobile menu */}
                {isAdmin && (
                  <Link
                    href={adminLink.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {adminLink.label}
                  </Link>
                )}
              </nav>
              <div className="mt-auto pt-6">
                <SignedOut>
                  <div
                    className="flex flex-col gap-2"
                    onMouseEnter={() => setIsHoveringAuth(true)}
                    onMouseLeave={() => setIsHoveringAuth(false)}
                  >
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Auth Buttons and Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <div
              className="flex items-center gap-3"
              onMouseEnter={() => setIsHoveringAuth(true)}
              onMouseLeave={() => setIsHoveringAuth(false)}
            >
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div
              onMouseEnter={() => setIsHoveringAuth(true)}
              onMouseLeave={() => setIsHoveringAuth(false)}
            >
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <ThemeToggle />

          {/* Admin dashboard button */}
          <SignedIn>
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link href={adminLink.href} className="flex items-center gap-2">
                  {adminLink.label}
                </Link>
              </Button>
            )}
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
