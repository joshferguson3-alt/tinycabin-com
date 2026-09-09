import Link from "next/link";
import { CabinMark } from "@/components/cabin-mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-forest-900/20 bg-forest-950 text-cream-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <CabinMark className="size-7 text-cream-100" />
            <p className="font-heading text-lg">Tiny Cabin</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream-100/75">
            Matching people with tiny cabin kits and builders. Not rentals. Not
            gear. One vertical, on purpose.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-cream-100/55 uppercase">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/#match" className="hover:underline">
                Get matched
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-cream-100/55 uppercase">
            Contact
          </p>
          <p className="mt-3 text-sm leading-6 text-cream-100/75">
            Questions or kit/builder partnerships:{" "}
            <a href={`mailto:${site.email}`} className="text-cream-50 underline">
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream-100/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-cream-100/50 sm:px-6">
          © {new Date().getFullYear()} {site.name}. Guides are educational, not
          legal or construction advice. Site photographs are real places from{" "}
          <a
            href="https://unsplash.com/?utm_source=tinycabin&utm_medium=referral"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
          ; photographers are credited on each image.
        </p>
      </div>
    </footer>
  );
}
