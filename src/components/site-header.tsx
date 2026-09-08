"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CabinMark } from "@/components/cabin-mark";

const links = [
  { href: "/guides", label: "Guides" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#match", label: "Get matched" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-800/15 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-forest-900 no-underline"
        >
          <CabinMark className="size-8 text-forest-800" />
          <span className="font-heading text-lg tracking-tight">Tiny Cabin</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-forest-800 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <Button nativeButton={false} render={<Link href="/#match" />} className="h-10 px-4">
            Start a match
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-forest-800/10 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-3 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1 text-forest-800"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
