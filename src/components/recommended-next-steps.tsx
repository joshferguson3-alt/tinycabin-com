import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  configuredAffiliates,
  type AffiliateId,
} from "@/lib/affiliates";
import { cn } from "@/lib/utils";

const categoryLabel: Record<string, string> = {
  plans: "Plans",
  kits: "Kit company",
  systems: "Site system",
};

export function RecommendedNextSteps({
  partners,
}: {
  partners: readonly AffiliateId[];
}) {
  const slots = configuredAffiliates(partners);

  return (
    <section
      className="mt-12 rounded-2xl border border-forest-800/12 bg-cream-50 px-5 py-7 sm:px-7"
      aria-labelledby="recommended-next-steps"
    >
      <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
        Next steps
      </p>
      <h2
        id="recommended-next-steps"
        className="font-heading mt-2 text-2xl tracking-tight text-forest-950"
      >
        Recommended next steps
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-forest-800/80">
        Start with a match against your land. Partner links, when they appear,
        are optional lookups — not a shortlist and not a “#1 kit.”
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        <li
          className={cn(
            "flex flex-col rounded-xl border border-forest-800/15 bg-forest-950 px-5 py-5 text-cream-50",
            slots.length === 0 && "sm:col-span-2",
          )}
        >
          <p className="text-xs font-medium tracking-[0.14em] text-cream-100/55 uppercase">
            Match form
          </p>
          <p className="font-heading mt-1.5 text-lg tracking-tight">
            Get a kit or builder shortlist
          </p>
          <p className="mt-2 flex-1 text-sm leading-6 text-cream-100/75">
            Send budget, timeline, and land status. We reply with a handful of
            fits — not a catalog dump.
          </p>
          <Link
            href="/#match"
            className={cn(
              buttonVariants(),
              "mt-5 h-10 w-fit bg-cream-50 px-4 text-forest-950 no-underline hover:bg-cream-100",
            )}
          >
            Open the match form
          </Link>
        </li>

        {slots.map((partner) => (
          <li
            key={partner.id}
            className="flex flex-col rounded-xl border border-forest-800/12 bg-background px-5 py-5"
          >
            <p className="text-xs font-medium tracking-[0.14em] text-forest-800/55 uppercase">
              {categoryLabel[partner.category] ?? partner.category}
            </p>
            <p className="font-heading mt-1.5 text-lg tracking-tight text-forest-950">
              {partner.name}
            </p>
            <p className="mt-2 flex-1 text-sm leading-6 text-forest-800/80">
              {partner.blurb}
            </p>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-5 h-10 w-fit px-4 no-underline",
              )}
            >
              View {partner.name}
            </a>
          </li>
        ))}
      </ul>

      {slots.length > 0 ? (
        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Partner links on this page may earn us a commission if you purchase
          through them. We do not rank kits or call anyone “#1.” Compare
          packing lists and your site before you send a deposit.
        </p>
      ) : null}
    </section>
  );
}
