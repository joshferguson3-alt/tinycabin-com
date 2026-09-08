import Link from "next/link";
import { Compass, LandPlot, ListChecks, Shield } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { buttonVariants } from "@/components/ui/button";
import { guides } from "@/lib/guides";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Tell us the land and the budget",
    body: "ZIP or state, what you can spend, when you want to build, and whether you already have dirt.",
  },
  {
    n: "02",
    title: "We filter kits and builders",
    body: "Climate, delivery radius, skill level, and what’s actually in the crate — not a generic vendor blast.",
  },
  {
    n: "03",
    title: "You get a shortlist",
    body: "A handful of fits, with the questions to ask next. You decide who to call.",
  },
];

const trust = [
  {
    icon: Compass,
    title: "Kits and builders only",
    body: "No cabin rentals, no gadget shop. The site exists to match a build, not a weekend stay.",
  },
  {
    icon: Shield,
    title: "We don’t sell the kit",
    body: "Tiny Cabin is an independent match service. We are not a manufacturer and we don’t take checkout payments.",
  },
  {
    icon: LandPlot,
    title: "Land comes first",
    body: "A kit that can’t be delivered, permitted, or founded on your site is a brochure, not a plan.",
  },
  {
    icon: ListChecks,
    title: "No invented reviews",
    body: "We will not publish fake testimonials. Until we have first-party case notes, we stick to criteria and process.",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string; msg?: string }>;
}) {
  const { lead, msg } = await searchParams;
  return (
    <>
      <section className="hero-grain text-cream-50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-cream-100/65 uppercase">
              {site.domain}
            </p>
            <h1 className="font-heading mt-4 max-w-3xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-6xl">
              Find the right tiny cabin kit — or the builder who can set it on your land.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream-100/80">
              {site.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#match"
                className={cn(
                  buttonVariants(),
                  "h-12 bg-cream-50 px-6 text-base text-forest-950 no-underline hover:bg-cream-100",
                )}
              >
                Get a shortlist
              </Link>
              <Link
                href="/guides"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 border-cream-100/25 bg-transparent px-6 text-base text-cream-50 no-underline hover:bg-cream-100/10 hover:text-cream-50",
                )}
              >
                Read the guides
              </Link>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-cream-100/65 lg:justify-self-end">
            Soft launch: matching is manual and regional. If we don’t have a fit
            yet, we say so instead of padding a list.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
          How it works
        </p>
        <h2 className="font-heading mt-2 text-3xl tracking-tight text-forest-950 sm:text-4xl">
          Three steps. Then a shortlist.
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-forest-800/10 bg-cream-50 p-6"
            >
              <p className="font-heading text-sm text-wood-600">{step.n}</p>
              <h3 className="font-heading mt-3 text-xl tracking-tight text-forest-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-forest-800/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-forest-800/10 bg-cream-50/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-3xl tracking-tight text-forest-950">
            What you can trust on this site
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {trust.map((item) => (
              <li key={item.title} className="flex gap-4">
                <item.icon className="mt-0.5 size-5 shrink-0 text-forest-800" aria-hidden />
                <div>
                  <h3 className="font-medium text-forest-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-forest-800/80">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
              Guides
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-tight text-forest-950">
              Start with the decisions that change the budget
            </h2>
          </div>
          <Link href="/guides" className="text-sm text-wood-600 underline">
            All guides
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block h-full rounded-2xl border border-forest-800/10 bg-cream-50 p-6 no-underline transition-colors hover:border-forest-800/25"
              >
                <h3 className="font-heading text-xl tracking-tight text-forest-950">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-forest-800/80">
                  {guide.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="match" className="border-t border-forest-800/10 bg-cream-50/80">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
              Lead form
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-tight text-forest-950 sm:text-4xl">
              Get matched
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-forest-800/80">
              Name, email, location, budget, timeline, and land status are enough
              to start. Phone and notes help if you already know the climate or a
              kit you like.
            </p>
          </div>
          <div className="rounded-2xl border border-forest-800/12 bg-card p-5 shadow-sm sm:p-8">
            <LeadForm result={lead} message={msg} />
          </div>
        </div>
      </section>
    </>
  );
}
