import { amazonAssociatesActive } from "@/lib/affiliates";

/** Site-wide FTC affiliate disclosure. Place near the footer. */
export function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p className={className}>
      Some links on this site may be affiliate links. If you buy through them,
      we may earn a commission at no extra cost to you. That does not change
      how we match kits or builders, and it is not a product ranking.
      {amazonAssociatesActive ? (
        <>
          {" "}
          As an Amazon Associate, Tiny Cabin earns from qualifying purchases.
        </>
      ) : null}
    </p>
  );
}
