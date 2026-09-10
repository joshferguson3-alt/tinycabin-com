import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getGuide } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

const guide = getGuide("best-tiny-cabin-kits")!;

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `/guides/${guide.slug}` },
  openGraph: {
    title: guide.title,
    description: guide.description,
    url: absoluteUrl(`/guides/${guide.slug}`),
    type: "article",
  },
};

export default function BestTinyCabinKitsPage() {
  return (
    <GuideArticle
      guide={guide}
      partners={["texasTinyHomesPlans", "tinyHomeBuilders", "jamaicaCottageShop"]}
    >
      <p>
        Search results for “best tiny cabin kits” are usually a stack of
        numbered lists with the same five logos in a different order. We will
        not invent a ranking. Brands change SKUs, freight, and what’s in the
        crate faster than a static list stays honest.
      </p>
      <p>
        What you can do instead is <strong>score kits against your site</strong>.
        The “best” kit is the one that can be delivered, assembled by the people
        you actually have, and permitted in the climate you have — not the one
        with the nicest porch photo.
      </p>

      <h2>Criteria that matter more than brand names</h2>
      <h3>Climate and structure</h3>
      <p>
        Ask for design snow load, wind speed, roof pitch, and wall assembly — in
        numbers, not adjectives. A kit engineered for a mild Mid-Atlantic
        weekend plot is not a mountain kit. If the seller cannot tell you the
        loads, you will be the one explaining it to the building official.
      </p>
      <h3>What is actually in the crate</h3>
      <p>
        Request a line-item packing list. Note windows (U-factor, not just
        “double pane”), exterior doors, roofing, fasteners, flashing, insulation
        (and whether it is included), interior lining, and anything marked “by
        owner.” Two kits with the same square footage can be a finished shell
        versus a lumber puzzle.
      </p>
      <h3>Assembly skill and crew size</h3>
      <p>
        “Two people, one weekend” is marketing. Ask how many person-days the
        last three customers needed to dry-in, whether a lift is required, and
        if the company offers a lead carpenter. If you are hiring a local
        builder, send them the manual before you pay a deposit.
      </p>
      <h3>Delivery radius and site access</h3>
      <p>
        Confirm they will deliver to your ZIP, what truck shows up, and what
        the site must provide (turnaround, crane pad, forklift). Mountain and
        island sites fail more kits than bad taste does.
      </p>
      <h3>Foundation compatibility</h3>
      <p>
        Piers, slab, or skids are not interchangeable after the fact. Get an
        anchor plan. If you are in frost country, “set it on blocks” is not a
        foundation.
      </p>
      <h3>Drawings, warranty, and who answers the phone</h3>
      <p>
        Useful kits come with dimensioned plans and, when a permit is likely,
        engineer-stamped options. Ask how long the company has been shipping
        this model, what the warranty excludes (finish, windows, your labor),
        and whether support is email-only after the truck leaves.
      </p>

      <h2>A fair way to categorize kits</h2>
      <ul>
        <li>
          <strong>DIY panel / cabin kits:</strong> lowest cash, highest owner
          labor and upgrade risk. Fine when you have skill and a mild site.
        </li>
        <li>
          <strong>Prefab shells:</strong> faster dry-in, more consistent
          openings and connections. You still own the interior and utilities.
        </li>
        <li>
          <strong>Near-complete packages:</strong> more of the finish travels
          with the kit. Check that “complete” includes mechanicals — it often
          does not.
        </li>
        <li>
          <strong>Builder-led systems:</strong> the company (or a licensed
          partner) erects the shell. You are buying process as much as
          materials. Compare that path to hiring a local carpenter with a
          simpler kit.
        </li>
      </ul>

      <h2>Questions to send every seller</h2>
      <ol>
        <li>What snow, wind, and roof loads is this model designed for?</li>
        <li>Can I see the full material list and a recent delivery photo of this SKU?</li>
        <li>Do you provide stamped drawings for my state if the county requires them?</li>
        <li>What foundation do you specify, and what is excluded?</li>
        <li>Who is responsible if a panel arrives damaged?</li>
        <li>What does assembly look like for someone who has framed a shed vs. someone who has not?</li>
        <li>Can I visit a finished example, or talk to an owner who built in a similar climate?</li>
      </ol>

      <h2>Red flags</h2>
      <ul>
        <li>No load numbers, no packing list, deposit due before either exists.</li>
        <li>“No permit needed anywhere” as a sales line.</li>
        <li>Renderings only — no photos of assembled buildings in weather.</li>
        <li>Pressure to buy this week because a ranking site featured them.</li>
        <li>Windows and roofing described as “standard” with no spec sheet.</li>
      </ul>

      <aside>
        <strong>No paid “#1 kit” lists.</strong> If a partner link appears in
        the next-steps section below, it is a labeled paid relationship — not an
        editorial award. Manufacturers and builders who want to be in the match
        pool can write{" "}
        <a href="mailto:hello@tinycabin.com">hello@tinycabin.com</a> with a spec
        sheet, delivery map, and what’s excluded from the kit price.
      </aside>

      <h2>After you shortlist two or three</h2>
      <p>
        Price them as <em>delivered + founded + dry-in</em>, not crate vs.
        crate. Then read{" "}
        <a href="/guides/tiny-cabin-kit-cost">what a kit actually costs</a> and{" "}
        <a href="/guides/tiny-cabin-permits">the permit stack</a> before you
        send a deposit. If you want help comparing options against your land,
        use the match form — that is the product.
      </p>
    </GuideArticle>
  );
}
