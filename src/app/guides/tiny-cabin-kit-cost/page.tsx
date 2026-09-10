import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getGuide } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

const guide = getGuide("tiny-cabin-kit-cost")!;

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

export default function TinyCabinKitCostPage() {
  return (
    <GuideArticle
      guide={guide}
      partners={["texasTinyHomesPlans", "compoCloset"]}
    >
      <p>
        Most people google “tiny cabin kit cost” and get a single number: the
        manufacturer’s crate price. That number is real, and it is also the
        least complete number on the project. A $28,000 kit on land that still
        needs a driveway, a septic design, and a pier foundation is a $70,000
        conversation.
      </p>
      <p>
        This guide is a budgeting map for 2026, in U.S. dollars, for people
        buying a <strong>kit or hiring a builder</strong> — not booking a
        rental. Ranges are typical, not bids. Freight, frost line, and whether
        you can swing a hammer move the total more than the brochure does.
      </p>

      <h2>What “kit price” usually includes</h2>
      <p>
        Kits are sold in layers. Read the packing list before you compare two
        quotes that look $15,000 apart.
      </p>
      <ul>
        <li>
          <strong>Shell / dry-in:</strong> wall panels or logs, roof structure,
          exterior cladding, windows and exterior doors. Sometimes housewrap.
          Often not insulation, flooring, or a bathroom.
        </li>
        <li>
          <strong>Weathertight package:</strong> shell plus roofing, flashing,
          and enough trim that the building can sit through a winter while you
          finish the inside.
        </li>
        <li>
          <strong>Interior package:</strong> insulation, drywall or wood lining,
          flooring, kitchen boxes, bath rough-in. Wiring and plumbing are still
          often “by others.”
        </li>
        <li>
          <strong>Turnkey-ish kit:</strong> most materials to finish, still
          assuming you or a contractor provide foundation, utilities, and labor.
        </li>
      </ul>
      <p>
        If a quote does not say who supplies the foundation, septic, well or
        water line, electrical service, crane or lull, fasteners beyond a
        starter box, and interior finish, treat those as extra lines — because
        they will be.
      </p>

      <h2>Kit ranges you can plan around</h2>
      <p>
        For a one-room or lofted cabin roughly 200–600 sq ft, these are common
        2026 asking prices <em>for the kit only</em>, delivered to a nearby
        terminal or jobsite:
      </p>
      <table>
        <thead>
          <tr>
            <th>Kit type</th>
            <th>Typical kit</th>
            <th>What you are buying</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DIY panel or shed-grade cabin</td>
            <td>$8,000–$25,000</td>
            <td>Basic shell. Expect to upgrade insulation, windows, and snow/wind details in cold or wet climates.</td>
          </tr>
          <tr>
            <td>Mid-range prefab shell</td>
            <td>$25,000–$55,000</td>
            <td>Better glazing and structure. Still a finishing project unless you add labor.</td>
          </tr>
          <tr>
            <td>Higher-spec or near-complete kit</td>
            <td>$55,000–$120,000+</td>
            <td>Thicker walls, designed connections, more interior materials. Not the same as a certificate of occupancy.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Custom timber, SIP, or architect-designed modules sit above that.
        Shipping a kit across the country can add as much as a cheap kit costs.
      </p>

      <h2>The rest of the project</h2>
      <p>Budget these as their own decisions, not rounding error:</p>
      <ul>
        <li>
          <strong>Delivery and offload:</strong> $1,000–$8,000+. Remote roads,
          seasonal weight limits, and a site that needs a crane change this
          fast.
        </li>
        <li>
          <strong>Foundation:</strong> $3,000–$15,000+ for piers or a simple
          slab on a prepared pad. Full frost-protected or walk-out work costs
          more.
        </li>
        <li>
          <strong>Site work:</strong> clearing, pad, drainage, and a driveway or
          spur. $2,000 on an already-flat lot; $20,000+ if you are cutting a
          road.
        </li>
        <li>
          <strong>Water and waste:</strong> well + septic commonly $15,000–$40,000
          where soil and setbacks cooperate. A sewer tap in town can be cheaper
          or surprisingly expensive. Composting toilets change plumbing, not
          always the permit.
        </li>
        <li>
          <strong>Power:</strong> a trench and panel from an existing service
          might be a few thousand. A new utility drop or a serious off-grid
          array is a second project.
        </li>
        <li>
          <strong>Permits and design:</strong> $500–$5,000+ for stamps, septic
          design, and engineered drawings if the county asks.
        </li>
        <li>
          <strong>Labor:</strong> a skilled owner-builder can keep this near
          zero and spend months. Hiring a crew to dry-in and finish a small
          cabin often lands between $20,000 and $80,000 depending on access and
          finish level.
        </li>
      </ul>

      <h2>Two worked examples</h2>
      <h3>Example A — owner-builder, land already owned</h3>
      <p>
        320 sq ft weathertight kit at $36,000. Local delivery $2,400. Pier
        foundation $6,500. Existing well, new septic $18,000. Owner hangs the
        interior over a summer, $9,000 in materials. Permits $1,800.{" "}
        <strong>Planning total: about $74,000</strong>, plus tools and the
        months of labor you do not invoice yourself.
      </p>
      <h3>Example B — hired builder, turnkey on raw land</h3>
      <p>
        480 sq ft higher-spec kit $88,000. Freight and crane $7,500. Driveway
        and pad $22,000. Foundation $12,000. Well and septic $32,000. Builder
        assembly and finish $55,000. Power drop $8,000. Permits and engineering
        $4,200. <strong>Planning total: about $229,000</strong>. That is still
        not a custom architect home — and it is a normal all-in number when
        nobody on the project is working for free.
      </p>

      <aside>
        If your form budget is “under $20,000,” be honest about what that can
        buy: a modest kit on land you already own, with you doing the work, and
        utilities already close. It is not a turnkey cabin on raw acreage.
      </aside>

      <h2>How to use this on the match form</h2>
      <p>
        Pick the range that covers <strong>kit + foundation + getting it
        weathertight</strong>, or say you are still researching. In the notes,
        mention climate (snow, coastal wet, desert heat), whether the site is
        already served by power and water, and if you will build it yourself.
        Those three facts change the shortlist more than square footage.
      </p>
      <p>
        Next: if you are still deciding whether a cabin, a wheeled tiny house,
        or an ADU is the right box, read{" "}
        <a href="/guides/tiny-cabin-vs-tiny-home">tiny cabin vs. tiny home</a>.
      </p>
    </GuideArticle>
  );
}
