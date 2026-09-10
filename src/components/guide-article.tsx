import type { ReactNode } from "react";
import { CreditedImage } from "@/components/credited-image";
import { GuideCta } from "@/components/guide-cta";
import { RecommendedNextSteps } from "@/components/recommended-next-steps";
import type { AffiliateId } from "@/lib/affiliates";
import type { Guide } from "@/lib/guides";
import { absoluteUrl, site } from "@/lib/site";

export function GuideArticle({
  guide,
  partners,
  children,
}: {
  guide: Guide;
  /** Contextual partner slots; cards render only when a URL is configured. */
  partners?: readonly AffiliateId[];
  children: ReactNode;
}) {
  const formatted = new Date(`${guide.updated}T00:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
        Guide
      </p>
      <h1 className="font-heading mt-3 text-4xl leading-tight tracking-tight text-balance text-forest-950 sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-forest-800/80">{guide.excerpt}</p>
      <p className="mt-3 text-sm text-muted-foreground">Updated {formatted}</p>
      <CreditedImage
        photo={guide.photo}
        className="mt-8"
        frameClassName="aspect-[16/9] rounded-2xl"
        sizes="(min-width: 768px) 48rem, 100vw"
        priority
        credit="below"
      />
      <div className="guide-prose mt-10">{children}</div>
      {partners ? <RecommendedNextSteps partners={partners} /> : null}
      <GuideCta />
    </article>
  );
}
