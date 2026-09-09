import { photos, type Photo } from "@/lib/photos";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  updated: string;
  photo: Photo;
};

export const guides: Guide[] = [
  {
    slug: "tiny-cabin-kit-cost",
    title: "What a tiny cabin kit actually costs",
    description:
      "Realistic 2026 ranges for tiny cabin kits, delivery, foundation, site work, and finishing — plus two worked examples.",
    excerpt:
      "The kit price is rarely the project price. Here is how to budget the shell, the site, and the finish so you are not surprised at month six.",
    updated: "2026-09-08",
    photo: photos.modernCabin,
  },
  {
    slug: "tiny-cabin-vs-tiny-home",
    title: "Tiny cabin vs. tiny home: which one do you actually want?",
    description:
      "How foundation cabins, tiny houses on wheels, and ADUs differ in code, cost, and daily use — without the marketing blur.",
    excerpt:
      "Wheels change the rules. So does calling it an ADU. Use this to pick a path before you shop kits.",
    updated: "2026-09-08",
    photo: photos.snowCabin,
  },
  {
    slug: "best-tiny-cabin-kits",
    title: "How to choose a tiny cabin kit (without fake rankings)",
    description:
      "A criteria-first way to compare tiny cabin kits: climate, what’s included, assembly skill, delivery, and red flags.",
    excerpt:
      "There is no honest “#1 kit.” There is a kit that fits your climate, skill, and land. Here is how to tell.",
    updated: "2026-09-08",
    photo: photos.snowyHut,
  },
  {
    slug: "tiny-cabin-permits",
    title: "Tiny cabin permits in the U.S.: a high-level starting map",
    description:
      "The permits most U.S. cabin projects run into — plus why your county still has the last word.",
    excerpt:
      "Building, septic, well, driveway, and occupancy are the usual stack. Confirm every item with the office that issues the stamp.",
    updated: "2026-09-08",
    photo: photos.woodsCabin,
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
