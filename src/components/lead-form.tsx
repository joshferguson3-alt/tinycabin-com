"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, landStatuses, timelines } from "@/lib/lead";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-11 w-full min-w-0 rounded-lg border border-input bg-cream-50 px-2.5 text-base outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      location: String(data.get("location") ?? ""),
      budget: String(data.get("budget") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      landStatus: String(data.get("landStatus") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        error?: string;
        preview?: boolean;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      if (result.preview) {
        setStatus("preview");
        setMessage(
          result.message ||
            "Preview mode: the form works, but no destination is configured yet.",
        );
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-forest-800/15 bg-cream-50 px-5 py-8"
        role="status"
      >
        <p className="font-heading text-2xl text-forest-950">We have your project.</p>
        <p className="mt-2 text-sm leading-6 text-forest-800/80">
          Thanks. We review land, budget, and timeline before we send a shortlist.
          You will hear back at the email you used.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Name" htmlFor="lead-name">
          <Input
            id="lead-name"
            name="name"
            autoComplete="name"
            required
            className="h-11 bg-cream-50 text-base"
          />
        </Field>
        <Field label="Email" htmlFor="lead-email">
          <Input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11 bg-cream-50 text-base"
          />
        </Field>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Phone (optional)" htmlFor="lead-phone">
          <Input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-11 bg-cream-50 text-base"
          />
        </Field>
        <Field label="ZIP or state" htmlFor="lead-location">
          <Input
            id="lead-location"
            name="location"
            autoComplete="postal-code"
            required
            placeholder="e.g. 98826 or WA"
            className="h-11 bg-cream-50 text-base"
          />
        </Field>
      </div>

      <Field label="Budget range" htmlFor="lead-budget">
        <select
          id="lead-budget"
          name="budget"
          required
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgetRanges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Timeline" htmlFor="lead-timeline">
        <select
          id="lead-timeline"
          name="timeline"
          required
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            When do you want to build?
          </option>
          {timelines.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Land status" htmlFor="lead-land">
        <select
          id="lead-land"
          name="landStatus"
          required
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            Have land, shopping, or not sure
          </option>
          {landStatuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Notes" htmlFor="lead-notes">
        <Textarea
          id="lead-notes"
          name="notes"
          rows={4}
          placeholder="Climate, off-grid, loft vs. one-level, snow load, or a kit you already like."
          className="min-h-28 bg-cream-50 text-base"
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input
          id="lead-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" || status === "preview" ? (
        <p
          role="status"
          className={
            status === "preview"
              ? "text-sm leading-6 text-forest-800"
              : "text-sm leading-6 text-destructive"
          }
        >
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 px-5 text-base"
      >
        {status === "submitting" ? "Sending…" : "Get a shortlist"}
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        Free for buyers. We do not sell your information. See our{" "}
        <a href="/privacy" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
