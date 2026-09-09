import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/photos";

export function PhotoCredit({
  photo,
  className,
}: {
  photo: Photo;
  className?: string;
}) {
  return (
    <span className={className}>
      Photo:{" "}
      <a
        href={photo.profile}
        className="underline underline-offset-2"
        target="_blank"
        rel="noreferrer"
      >
        {photo.photographer}
      </a>
      {" / "}
      <a
        href={photo.unsplash}
        className="underline underline-offset-2"
        target="_blank"
        rel="noreferrer"
      >
        Unsplash
      </a>
    </span>
  );
}

export function CreditedImage({
  photo,
  className,
  imgClassName,
  sizes,
  priority = false,
  fill = false,
  credit = "overlay",
}: {
  photo: Photo;
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  credit?: "overlay" | "below" | "none";
}) {
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <Image
        src={photo.src}
        alt={`${photo.alt}. Photo by ${photo.photographer} on Unsplash.`}
        {...(fill
          ? { fill: true }
          : { width: photo.width, height: photo.height })}
        sizes={sizes}
        priority={priority}
        quality={priority ? 80 : 72}
        className={cn("object-cover", fill ? "object-cover" : "h-full w-full", imgClassName)}
      />
      {credit === "overlay" ? (
        <figcaption className="absolute right-2 bottom-2 rounded bg-forest-950/75 px-2 py-1 text-[11px] leading-none text-cream-50/90">
          <PhotoCredit photo={photo} />
        </figcaption>
      ) : null}
      {credit === "below" ? (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          <PhotoCredit photo={photo} />
        </figcaption>
      ) : null}
    </figure>
  );
}
