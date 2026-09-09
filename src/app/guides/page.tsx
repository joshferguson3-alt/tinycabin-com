import type { Metadata } from "next";
import { GuideCard } from "@/components/guide-card";
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
            <GuideCard guide={guide} heading="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
