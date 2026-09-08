import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 py-24 sm:px-6">
      <p className="text-xs font-medium tracking-[0.16em] text-forest-800/70 uppercase">
        404
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight text-forest-950">
        That page is not on this map
      </h1>
      <p className="mt-4 text-base leading-7 text-forest-800/80">
        The guides and the match form are still here. This URL is not.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants(), "h-11 px-4 no-underline")}>
          Home
        </Link>
        <Link
          href="/guides"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-4 no-underline")}
        >
          Guides
        </Link>
      </div>
    </div>
  );
}
