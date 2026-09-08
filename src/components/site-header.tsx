import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CabinMark } from "@/components/cabin-mark";
import { cn } from "@/lib/utils";

const links = [
  { href: "/guides", label: "Guides" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#match", label: "Get matched" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-800/15 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-forest-900 no-underline"
        >
          <CabinMark className="size-8 text-forest-800" />
          <span className="font-heading text-lg tracking-tight">Tiny Cabin</span>
        </Link>

        <nav
          className="flex items-center gap-3 text-sm text-forest-800 sm:gap-6"
          aria-label="Primary"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === "/#how-it-works"
                  ? "hidden underline-offset-4 hover:underline sm:inline"
                  : "underline-offset-4 hover:underline"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#match"
            className={cn(
              buttonVariants(),
              "hidden h-10 px-4 no-underline sm:inline-flex",
            )}
          >
            Start a match
          </Link>
        </nav>
      </div>
    </header>
  );
}
