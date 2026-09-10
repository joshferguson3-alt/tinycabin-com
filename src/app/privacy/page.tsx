import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Tiny Cabin collects and uses lead-form information if you ask to be matched with a tiny cabin kit or builder.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
        Legal
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight text-forest-950">
        Privacy policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated September 10, 2026</p>

      <div className="guide-prose mt-10">
        <p>
          Tiny Cabin ({site.domain}) is a small lead-generation and editorial
          site about tiny cabin kits and builders. This policy describes what we
          collect when you use the site or submit the match form. It is written
          for a real operating site, not as filler.
        </p>

        <h2>Who we are</h2>
        <p>
          Tiny Cabin is operated as an independent matching and publishing
          project. Contact:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Information you give us</h2>
        <p>If you submit the match form, we collect:</p>
        <ul>
          <li>Name and email (required)</li>
          <li>Phone (optional)</li>
          <li>ZIP code or state</li>
          <li>Budget range, timeline, and land status</li>
          <li>Notes you choose to add</li>
        </ul>
        <p>
          We use this to review your project and, when there is a fit, to
          introduce you to kit companies or builders, or to email you a
          shortlist. We also use it to reply to you and to keep an internal
          record of inquiries.
        </p>

        <h2>Information collected automatically</h2>
        <p>
          The host that serves this site (for example Vercel) and the browser
          typically log technical data such as IP address, user agent, pages
          requested, and approximate location derived from IP. We do not use
          that log data to build a marketing profile. If we later add a
          privacy-respecting analytics tool, we will name it here.
        </p>

        <h2>Processors and sharing</h2>
        <p>
          The match form is delivered through one of these destinations, once
          configured: <strong>Formspree</strong>, a{" "}
          <strong>webhook you control</strong>, or <strong>Resend</strong> email.
          Those providers process the submission so we can receive it. Their own
          privacy terms apply to that processing.
        </p>
        <p>
          If we match you with a kit company or builder, we share the details
          you submitted that are needed for that introduction (typically name,
          contact, location, budget, timeline, land status, and notes). We do
          not sell inquiry lists, and we do not share leads with rental
          marketplaces or unrelated advertisers.
        </p>
        <p>
          We may disclose information if required by law, or to prevent fraud
          or abuse of the form.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some outbound links may be affiliate or partner links. If you click
          one and later buy from that company, we may earn a commission at no
          extra cost to you. That is a paid relationship with the merchant or
          their network — not a ranking, and not a sale of your inquiry.
        </p>
        <p>
          We do not send your match-form details to affiliate networks. If you
          follow a partner link, that merchant’s own site, cookies, and privacy
          terms apply. The footer discloses this site-wide; guide pages that
          show a partner card also include a short note next to the link.
        </p>

        <h2>Cookies</h2>
        <p>
          We do not set advertising cookies. The site may use essential cookies
          or similar storage required to run the application or remember a
          short-lived form state. Third-party embeds are not part of the
          current pages. If you follow an affiliate or partner link, that
          company’s site may set its own cookies.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Lead records are kept as long as needed to complete a match, answer
          follow-ups, and maintain a basic business record (typically up to 24
          months unless a longer retention is required for accounting or
          disputes). You can ask us to delete your inquiry.
        </p>

        <h2>Your choices</h2>
        <p>
          You do not have to submit the form to read the guides. You may email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> to access, correct,
          or delete the information you sent, or to object to further contact.
          If you are in a jurisdiction with additional privacy rights (including
          some U.S. states and the EEA/UK), we will honor applicable requests.
        </p>

        <h2>Children</h2>
        <p>
          This site is for adults planning a construction project. We do not
          knowingly collect information from children under 13 (or under 16
          where that is the standard).
        </p>

        <h2>Changes</h2>
        <p>
          If our practices change in a material way — for example, adding
          analytics, a new form processor, or new affiliate programs — we will
          update this page and the “last updated” date.
        </p>
      </div>
    </article>
  );
}
