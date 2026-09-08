export const site = {
  name: "Tiny Cabin",
  domain: "tinycabin.com",
  url: "https://tinycabin.com",
  tagline: "Find the right tiny cabin kit — or the builder who can put it on your land.",
  description:
    "Independent matching for tiny cabin kits and builders. Tell us your land, budget, and timeline. We send a shortlist — not a rental listing, not a marketplace.",
  email: "hello@tinycabin.com",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "" : normalized}`;
}
