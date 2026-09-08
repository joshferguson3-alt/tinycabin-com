import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getGuide } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

const guide = getGuide("tiny-cabin-vs-tiny-home")!;

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

export default function TinyCabinVsTinyHomePage() {
  return (
    <GuideArticle guide={guide}>
      <p>
        “Tiny cabin” and “tiny home” get used as if they were the same product
        with different Instagram filters. They are not. The difference that
        matters is not square footage. It is{" "}
        <strong>how the building is classified</strong> — on a foundation, on a
        trailer, or as an accessory dwelling — because that classification
        decides permits, lenders, insurers, and whether you can live in it
        year-round.
      </p>
      <p>
        Tiny Cabin matches <strong>kits and builders for cabins</strong>. We
        still explain the other paths so you do not buy the wrong crate.
      </p>

      <h2>Three boxes people mix up</h2>
      <h3>1. Tiny cabin (usually foundation-built)</h3>
      <p>
        A small, one-story or lofted building meant to sit on piers, a slab, or
        a crawlspace. It may be sold as a kit, a panelized shell, or a
        stick-built job. In many counties it is an accessory structure, a cabin,
        or — if you add a kitchen and full-time occupancy — something closer to
        a dwelling. Sleeping lofts, wood stoves, and simple kitchens are common.
        It is not designed to be towed.
      </p>
      <h3>2. Tiny house on wheels (THOW)</h3>
      <p>
        A dwelling built on a trailer. Movement is the point of the chassis even
        if you never leave the first pad. Many units are built to RV or tiny
        house construction standards rather than the local residential code.
        Parking, dumping tanks, and whether you can claim it as a residence are
        local fights, not brochure features.
      </p>
      <h3>3. ADU or small house</h3>
      <p>
        A legal second dwelling (or a very small primary) built to residential
        code, with the inspections that come with that. Some “cabin kits” can be
        adapted into an ADU if the manufacturer provides engineered drawings and
        the design meets egress, insulation, and energy rules. Many cannot
        without redesign.
      </p>

      <h2>What actually changes day to day</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Foundation cabin</th>
            <th>Tiny house on wheels</th>
            <th>ADU / small house</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Typical intent</td>
            <td>Land you control; stay or visit</td>
            <td>Move, or park where RVs are allowed</td>
            <td>Legal full-time dwelling</td>
          </tr>
          <tr>
            <td>Code path</td>
            <td>Building permit, or limited cabin/ag rules</td>
            <td>RV / trailer rules; sometimes none of the above</td>
            <td>IRC / local residential + ADU ordinance</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>Well/septic or hookups you install</td>
            <td>Hookups, tanks, or both</td>
            <td>Required like a house</td>
          </tr>
          <tr>
            <td>Financing</td>
            <td>Cash, construction, or land loan</td>
            <td>Personal, RV, or specialized tiny-house loans</td>
            <td>Mortgage-like products more often available</td>
          </tr>
          <tr>
            <td>Resale</td>
            <td>Tied to the land</td>
            <td>Tied to the trailer title</td>
            <td>Tied to the property as a dwelling</td>
          </tr>
        </tbody>
      </table>

      <h2>Lofts, snow, and “I just want a simple cabin”</h2>
      <p>
        A loft that feels charming in a 10-foot-wide THOW can be a code problem
        in a permitted dwelling (ceiling height, stairs, egress). A metal roof
        that is fine in the South may be underspec’d for a 60 psf snow load. A
        cabin kit sold as a “weekend shelter” may be perfectly honest — and
        still illegal to live in full-time on your lot.
      </p>
      <p>
        If your goal is a quiet building on land you own, start with a
        foundation cabin and ask the county what occupancy they will allow. If
        your goal is to relocate every year, a THOW is the more honest product.
        If your goal is a rental unit your lender and insurer understand, price
        an ADU and only then look at kits that can meet that path.
      </p>

      <aside>
        There is no national “tiny house exemption” that lets you skip zoning.
        RV parks, agricultural cabin rules, and ADU ordinances are local. If
        someone says “it’s on wheels so you don’t need a permit,” ask them which
        office told them that — in writing.
      </aside>

      <h2>A simple way to choose</h2>
      <ol>
        <li>Will this sit on land you own (or have a long lease on) for years?</li>
        <li>Do you need it to be a legal full-time residence?</li>
        <li>Do you need to move it more than once?</li>
        <li>Will a bank or insurer be involved?</li>
      </ol>
      <p>
        Yes / yes / no / maybe → look at ADU-capable cabins and builders who
        pull permits. Yes / no / no / cash → a foundation cabin kit is usually
        the cleaner project. No / varies / yes → you are shopping a tiny house
        on wheels, which is outside this site’s matching focus.
      </p>
      <p>
        When you know which box you are in,{" "}
        <a href="/guides/best-tiny-cabin-kits">use criteria to compare kits</a>{" "}
        and <a href="/guides/tiny-cabin-permits">map the permit stack</a>.
      </p>
    </GuideArticle>
  );
}
