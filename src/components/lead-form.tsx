import { submitLead } from "@/app/actions/lead";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, landStatuses, timelines } from "@/lib/lead";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-11 w-full min-w-0 rounded-lg border border-input bg-cream-50 px-2.5 text-base text-forest-950 outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export function LeadForm({
  compact = false,
  result,
  message,
}: {
  compact?: boolean;
  result?: string;
  message?: string;
}) {
  if (result === "sent") {
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
    <form action={submitLead} className="grid gap-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Name" htmlFor="lead-name">
          <Input
            id="lead-name"
            name="name"
            autoComplete="name"
            required
            className="h-11 bg-cream-50 text-base text-forest-950"
          />
        </Field>
        <Field label="Email" htmlFor="lead-email">
          <Input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11 bg-cream-50 text-base text-forest-950"
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
            className="h-11 bg-cream-50 text-base text-forest-950"
          />
        </Field>
        <Field label="ZIP or state" htmlFor="lead-location">
          <Input
            id="lead-location"
            name="location"
            autoComplete="postal-code"
            required
            placeholder="e.g. 98826 or WA"
            className="h-11 bg-cream-50 text-base text-forest-950"
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
          className="min-h-28 bg-cream-50 text-base text-forest-950"
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

      {result === "error" || result === "preview" ? (
        <p
          role="status"
          className={
            result === "preview"
              ? "text-sm leading-6 text-forest-800"
              : "text-sm leading-6 text-destructive"
          }
        >
          {result === "preview"
            ? "Preview mode: the form works, but no Formspree, webhook, or Resend destination is set yet. The lead was logged on the server only."
            : message || "Something went wrong. Please try again."}
        </p>
      ) : null}

      <SubmitButton />
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
