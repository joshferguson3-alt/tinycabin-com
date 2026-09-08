"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, landStatuses, timelines } from "@/lib/lead";

const empty = {
  name: "",
  email: "",
  phone: "",
  location: "",
  budget: "",
  timeline: "",
  landStatus: "",
  notes: "",
  company: "",
};

type FormState = typeof empty;

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as {
        error?: string;
        preview?: boolean;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Something went wrong. Please try again.");
        return;
      }

      if (payload.preview) {
        setStatus("preview");
        setMessage(
          payload.message ||
            "Preview mode: the form works, but no destination is configured yet.",
        );
        return;
      }

      setStatus("success");
      setValues(empty);
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
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
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
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
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
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
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
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            className="h-11 bg-cream-50 text-base"
          />
        </Field>
      </div>

      <Field label="Budget range" htmlFor="lead-budget">
        <Select
          required
          items={[...budgetRanges]}
          value={values.budget || null}
          onValueChange={(value) => update("budget", value ?? "")}
        >
          <SelectTrigger
            id="lead-budget"
            className="h-11 w-full bg-cream-50 text-base"
            aria-label="Budget range"
          >
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false} className="w-[var(--anchor-width)]">
            {budgetRanges.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Timeline" htmlFor="lead-timeline">
        <Select
          required
          items={[...timelines]}
          value={values.timeline || null}
          onValueChange={(value) => update("timeline", value ?? "")}
        >
          <SelectTrigger
            id="lead-timeline"
            className="h-11 w-full bg-cream-50 text-base"
            aria-label="Timeline"
          >
            <SelectValue placeholder="When do you want to build?" />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false}>
            {timelines.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Land status" htmlFor="lead-land">
        <Select
          required
          items={[...landStatuses]}
          value={values.landStatus || null}
          onValueChange={(value) => update("landStatus", value ?? "")}
        >
          <SelectTrigger
            id="lead-land"
            className="h-11 w-full bg-cream-50 text-base"
            aria-label="Land status"
          >
            <SelectValue placeholder="Have land, shopping, or not sure" />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false}>
            {landStatuses.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Notes" htmlFor="lead-notes">
        <Textarea
          id="lead-notes"
          name="notes"
          rows={4}
          placeholder="Climate, off-grid, loft vs. one-level, snow load, or a kit you already like."
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
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
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
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
