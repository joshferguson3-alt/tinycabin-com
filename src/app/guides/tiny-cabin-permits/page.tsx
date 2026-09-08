import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getGuide } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

const guide = getGuide("tiny-cabin-permits")!;

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

export default function TinyCabinPermitsPage() {
  return (
    <GuideArticle guide={guide}>
      <p>
        This is a <strong>high-level U.S. map</strong>, not a permit set and not
        legal advice. Counties, cities, townships, and tribal nations write the
        rules that apply to your dirt. Two parcels in the same state can
        disagree about whether a 320 sq ft cabin is a shed, a dwelling, or not
        allowed at all.
      </p>
      <p>
        Use this to know which <em>offices</em> to call and what to ask. Then
        believe the person who issues the stamp over any article — including
        this one.
      </p>

      <aside>
        <strong>Check local.</strong> Before you buy a kit or pour piers, call
        planning/zoning, building, and environmental health (septic/well) for
        the jurisdiction that contains the parcel. Ask for the answer in email.
        If a seller says “no permit needed,” ask which office confirmed that for
        your address.
      </aside>

      <h2>The stack most cabin projects run into</h2>
      <p>
        You will not need every item every time. You should know why each one
        does or does not apply.
      </p>
      <ol>
        <li>
          <strong>Zoning / land use.</strong> Can a cabin or accessory structure
          exist on this lot? Setbacks, height, lot coverage, and whether
          overnight use is allowed live here. HOAs and CC&amp;Rs are a second
          private layer.
        </li>
        <li>
          <strong>Building permit.</strong> Structure, snow/wind, exits,
          stairs/lofts, and sometimes energy code. Some rural counties exempt
          very small agricultural or storage buildings — exemptions usually
          collapse if you add a kitchen, bedroom, or full-time occupancy.
        </li>
        <li>
          <strong>Septic or sewer.</strong> Environmental health cares about
          bedrooms (they count occupants), soil, and setbacks from wells and
          water. A composting toilet can reduce wastewater, not automatically
          erase the permit.
        </li>
        <li>
          <strong>Well, water, or a documented haul plan.</strong> New wells are
          permitted. Connecting to a shared system has its own paperwork.
        </li>
        <li>
          <strong>Driveway / approach / culvert.</strong> County road
          departments often want a permit before you cut the ditch.
        </li>
        <li>
          <strong>Electrical (and sometimes mechanical/plumbing).</strong> Even
          when the “cabin” is informal, a new service or generator interlock
          usually is not.
        </li>
        <li>
          <strong>Occupancy or use sign-off.</strong> The last piece if you want
          to sleep there legally as a dwelling. Skipping it is how people get
          surprised at sale or insurance time.
        </li>
      </ol>

      <h2>Cabin vs. ADU vs. “it’s on wheels”</h2>
      <p>
        Language matters in the lobby. Calling it a <em>storage building</em>{" "}
        when you intend to live in it is how projects get stop-work orders.
        Calling it an <em>ADU</em> when the kit cannot meet residential code is
        how you stall for a year.
      </p>
      <ul>
        <li>
          <strong>Accessory structure / recreational cabin:</strong> sometimes
          allowed with lighter rules if it is not a primary residence. Sleeping
          may still trigger dwelling standards.
        </li>
        <li>
          <strong>ADU:</strong> a legal second home. Expect drawings, inspections,
          parking rules, and owner-occupancy clauses in some cities.
        </li>
        <li>
          <strong>RV / tiny house on wheels:</strong> parking duration, skirting,
          and whether it counts as a residence are usually zoning + health, not
          “the trailer title solves it.” There is no nationwide tiny-house
          loophole.
        </li>
      </ul>
      <p>
        For the product difference, see{" "}
        <a href="/guides/tiny-cabin-vs-tiny-home">tiny cabin vs. tiny home</a>.
      </p>

      <h2>A first phone script</h2>
      <p>When you call planning, have the parcel number and say:</p>
      <ul>
        <li>Approximate size and whether it has a kitchen, loft, and bathroom.</li>
        <li>Foundation type you are considering (piers, slab, skids).</li>
        <li>Whether anyone will live there full-time or seasonally.</li>
        <li>Water and waste plan (existing septic? new? sewer?).</li>
        <li>Whether you have a kit with engineered drawings.</li>
      </ul>
      <p>
        Then ask: “What permits would you expect, and what would make this a
        dwelling instead of an accessory cabin?” Write down the name of the
        person you spoke with.
      </p>

      <h2>Documents that make the second call shorter</h2>
      <ul>
        <li>Site sketch with setbacks, well, septic, and driveway.</li>
        <li>Kit or builder floor plan and elevation.</li>
        <li>Load sheet (snow, wind) and foundation note.</li>
        <li>Proof of legal access and, if relevant, HOA rules.</li>
      </ul>

      <h2>What this site will and will not do</h2>
      <p>
        Tiny Cabin can help you choose kits and builders who are used to
        permitted work, or who are honest that they sell a recreational shell.
        We cannot pull your permit, stamp your drawings, or tell you that your
        county will say yes.
      </p>
      <p>
        If you already know the land is buildable and you want a shortlist,
        send ZIP, budget, and land status through the form. Mention in the notes
        if the county has already told you “cabin only,” “ADU path,” or “not as
        a residence.”
      </p>
    </GuideArticle>
  );
}
