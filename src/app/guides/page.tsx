import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tiny cabin guides",
  description:
    "Practical guides on tiny cabin kit cost, cabins vs. tiny homes, how to choose a kit, and U.S. permits — written for people about to build, not browse rentals.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Tiny cabin guides",
    description:
      "Cost, cabin vs. tiny home, kit selection, and permits — starter reading before you buy a kit.",
    url: absoluteUrl("/guides"),
  },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
        Guides
      </p>
      <h1 className="font-heading mt-3 max-w-3xl text-4xl tracking-tight text-balance text-forest-950 sm:text-5xl">
        Read before you order a crate
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-forest-800/80">
        Four starter pieces on cost, definitions, kit selection, and permits.
        They are drafts with real ranges and caveats — not affiliate listicles
        and not legal advice.
      </p>
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-forest-800/10 bg-cream-50 p-6">
              <h2 className="font-heading text-2xl tracking-tight text-forest-950">
                <Link href={`/guides/${guide.slug}`} className="no-underline hover:underline">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-forest-800/80">
                {guide.excerpt}
              </p>
              <Link
                href={`/guides/${guide.slug}`}
                className="mt-5 text-sm text-wood-600 underline"
              >
                Read the guide
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
