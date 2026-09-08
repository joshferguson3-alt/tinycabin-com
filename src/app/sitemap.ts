import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-08");

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(guide.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
