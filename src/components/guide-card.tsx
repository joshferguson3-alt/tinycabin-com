import Link from "next/link";
import { CreditedImage } from "@/components/credited-image";
import type { Guide } from "@/lib/guides";

export function GuideCard({
  guide,
  heading = "h3",
}: {
  guide: Guide;
  heading?: "h2" | "h3";
}) {
  const Title = heading;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-forest-800/10 bg-cream-50">
      <Link href={`/guides/${guide.slug}`} className="no-underline">
        <CreditedImage
          photo={guide.photo}
          className="aspect-[16/10]"
          sizes="(min-width: 768px) 28rem, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Title className="font-heading text-xl tracking-tight text-forest-950 sm:text-2xl">
          <Link href={`/guides/${guide.slug}`} className="no-underline hover:underline">
            {guide.title}
          </Link>
        </Title>
        <p className="mt-3 flex-1 text-sm leading-6 text-forest-800/80">
          {guide.excerpt}
        </p>
        <Link
          href={`/guides/${guide.slug}`}
          className="mt-5 text-sm text-wood-600 underline"
        >
          Read the guide
        </Link>
      </div>
    </article>
  );
}
