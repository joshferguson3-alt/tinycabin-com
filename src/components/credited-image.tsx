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
  frameClassName,
  imgClassName,
  sizes,
  priority = false,
  fill = false,
  credit = "overlay",
  creditClassName,
}: {
  photo: Photo;
  className?: string;
  frameClassName?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  credit?: "overlay" | "below" | "none";
  creditClassName?: string;
}) {
  return (
    <figure
      className={cn(
        "relative",
        fill && "h-full w-full",
        credit !== "below" && "overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          fill ? "absolute inset-0" : "h-full w-full",
          frameClassName,
        )}
      >
        <Image
          src={photo.src}
          alt={`${photo.alt}. Photo by ${photo.photographer} on Unsplash.`}
          {...(fill
            ? { fill: true }
            : { width: photo.width, height: photo.height })}
          sizes={sizes}
          priority={priority}
          quality={priority ? 80 : 75}
          className={cn(
            "object-cover",
            fill ? "object-cover" : "h-full w-full",
            imgClassName,
          )}
        />
        {credit === "overlay" ? (
          <figcaption
            className={cn(
              "absolute right-2 bottom-2 z-10 rounded bg-forest-950/80 px-2 py-1 text-[11px] leading-none text-cream-50/95",
              creditClassName,
            )}
          >
            <PhotoCredit photo={photo} />
          </figcaption>
        ) : null}
      </div>
      {credit === "below" ? (
        <figcaption className={cn("mt-2 text-xs text-muted-foreground", creditClassName)}>
          <PhotoCredit photo={photo} />
        </figcaption>
      ) : null}
    </figure>
  );
}
