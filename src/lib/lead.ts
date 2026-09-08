export const budgetRanges = [
  { value: "under-20k", label: "Under $20,000" },
  { value: "20-40k", label: "$20,000–$40,000" },
  { value: "40-70k", label: "$40,000–$70,000" },
  { value: "70-120k", label: "$70,000–$120,000" },
  { value: "120k-plus", label: "$120,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelines = [
  { value: "0-3", label: "ASAP (0–3 months)" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12-plus", label: "12+ months" },
  { value: "researching", label: "Just researching" },
] as const;

export const landStatuses = [
  { value: "have-land", label: "I have land" },
  { value: "shopping", label: "Shopping for land" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  location: string;
  budget: string;
  timeline: string;
  landStatus: string;
  notes?: string;
  company?: string;
};

export type LeadValidation =
  | { ok: true; data: Required<Pick<LeadInput, "name" | "email" | "location" | "budget" | "timeline" | "landStatus">> & Pick<LeadInput, "phone" | "notes"> }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLead(body: unknown): LeadValidation {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Send a JSON object with your project details." };
  }

  const input = body as Record<string, unknown>;
  const name = asString(input.name);
  const email = asString(input.email);
  const phone = asString(input.phone);
  const location = asString(input.location);
  const budget = asString(input.budget);
  const timeline = asString(input.timeline);
  const landStatus = asString(input.landStatus);
  const notes = asString(input.notes);

  if (name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!emailPattern.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (location.length < 2) {
    return { ok: false, error: "Add a ZIP code or state so we can match locally." };
  }
  if (!budgetRanges.some((option) => option.value === budget)) {
    return { ok: false, error: "Choose a budget range." };
  }
  if (!timelines.some((option) => option.value === timeline)) {
    return { ok: false, error: "Choose a timeline." };
  }
  if (!landStatuses.some((option) => option.value === landStatus)) {
    return { ok: false, error: "Tell us your land status." };
  }
  if (phone && phone.length > 40) {
    return { ok: false, error: "Phone number looks too long." };
  }
  if (notes.length > 2000) {
    return { ok: false, error: "Notes are limited to 2,000 characters." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      location,
      budget,
      timeline,
      landStatus,
      ...(phone ? { phone } : {}),
      ...(notes ? { notes } : {}),
    },
  };
}

export function leadLabel(
  list: readonly { value: string; label: string }[],
  value: string,
) {
  return list.find((item) => item.value === value)?.label ?? value;
}
