import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GuideCta() {
  return (
    <aside className="mt-12 rounded-2xl border border-forest-800/12 bg-forest-950 px-6 py-8 text-cream-50 sm:px-8">
      <p className="text-xs font-medium tracking-[0.16em] text-cream-100/60 uppercase">
        Next step
      </p>
      <h2 className="font-heading mt-2 text-2xl tracking-tight text-balance">
        Ready to match a kit or builder to your land?
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-cream-100/75">
        Send budget, timeline, and land status. We reply with a shortlist — not a
        catalog dump.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/#match" />}
        className="mt-6 h-11 bg-cream-50 px-5 text-forest-950 hover:bg-cream-100"
      >
        Get matched
      </Button>
    </aside>
  );
}
