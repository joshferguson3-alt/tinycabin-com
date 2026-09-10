/**
 * Partner / affiliate tracking URLs.
 *
 * Tiny Cabin is kits-and-builders lead-gen, not a gear shop. Paste approved
 * tracking links after Josh signs each program. Empty string or "#" keeps the
 * partner card hidden.
 *
 * Env vars (set on Netlify, then rebuild) win over the in-file placeholder:
 *   AFFILIATE_TEXAS_TINY_HOMES
 *   AFFILIATE_JAMAICA_COTTAGE_SHOP
 *   AFFILIATE_COMPO_CLOSET
 *   AFFILIATE_AMAZON_ASSOCIATES  — any non-empty value shows the Amazon line
 */

export type AffiliateId =
  | "texasTinyHomesPlans"
  | "jamaicaCottageShop"
  | "compoCloset";

export type AffiliateCategory = "plans" | "kits" | "systems";

export type AffiliatePartner = {
  id: AffiliateId;
  name: string;
  category: AffiliateCategory;
  /** Empty until a real tracking URL is configured. */
  href: string;
  blurb: string;
};

function trackingUrl(envName: string, placeholder = ""): string {
  const fromEnv = process.env[envName]?.trim();
  const value = (fromEnv || placeholder).trim();
  if (!value || value === "#") return "";
  return value;
}

const amazonAssociatesFlag = process.env.AFFILIATE_AMAZON_ASSOCIATES?.trim() ?? "";

/** True once Amazon Associates links are actually used on the site. */
export const amazonAssociatesActive = Boolean(
  amazonAssociatesFlag && amazonAssociatesFlag !== "#",
);

export const affiliates = {
  // Cabin plan sets — not a kit ranking.
  texasTinyHomesPlans: {
    id: "texasTinyHomesPlans",
    name: "Texas Tiny Homes plans",
    category: "plans",
    href: trackingUrl("AFFILIATE_TEXAS_TINY_HOMES", ""),
    blurb:
      "Plan sets for small cabins. Useful when you want drawings before you commit to a crate — not a substitute for a local permit conversation.",
  },
  // Kit company slot. Shown as a partner to request a packing list from, never as “#1”.
  jamaicaCottageShop: {
    id: "jamaicaCottageShop",
    name: "Jamaica Cottage Shop",
    category: "kits",
    href: trackingUrl("AFFILIATE_JAMAICA_COTTAGE_SHOP", ""),
    blurb:
      "New England cabin and cottage kits. Ask for snow load, a packing list, and delivery radius — the same questions we send every seller.",
  },
  // Site system, not merchandise.
  compoCloset: {
    id: "compoCloset",
    name: "CompoCloset",
    category: "systems",
    href: trackingUrl("AFFILIATE_COMPO_CLOSET", ""),
    blurb:
      "Composting toilet systems. They can change the plumbing line on a small cabin; they do not always change the permit.",
  },
} satisfies Record<AffiliateId, AffiliatePartner>;

export function configuredAffiliates(
  ids: readonly AffiliateId[],
): AffiliatePartner[] {
  return ids
    .map((id) => affiliates[id])
    .filter((partner) => Boolean(partner.href));
}
