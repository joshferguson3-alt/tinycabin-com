"use client";

import { useFormStatus } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonVariants(), "h-12 px-5 text-base")}
    >
      {pending ? "Sending…" : "Get a shortlist"}
    </button>
  );
}
