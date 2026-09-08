"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CabinMark } from "@/components/cabin-mark";
import { cn } from "@/lib/utils";

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
          onClick={() => setOpen(false)}
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
          <Link href="/#match" className={cn(buttonVariants(), "h-10 px-4 no-underline")}>
            Start a match
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-background text-forest-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-forest-800/10 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-1 py-2 text-forest-800"
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
