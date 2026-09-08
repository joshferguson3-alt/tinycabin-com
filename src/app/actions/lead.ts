"use server";

import { redirect } from "next/navigation";
import { deliverLead } from "@/lib/deliver-lead";
import { validateLead } from "@/lib/lead";

function redirectToMatch(lead: string, message?: string) {
  const params = new URLSearchParams({ lead });
  if (message) params.set("msg", message);
  redirect(`/?${params.toString()}#match`);
}

export async function submitLead(formData: FormData) {
  if (String(formData.get("company") ?? "").trim()) {
    redirectToMatch("sent");
  }

  const parsed = validateLead({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    landStatus: formData.get("landStatus"),
    notes: formData.get("notes"),
  });

  if (!parsed.ok) {
    redirectToMatch("error", parsed.error);
    return;
  }

  let result;
  try {
    result = await deliverLead(parsed.data);
  } catch (error) {
    console.error("[lead] delivery failed", error);
    redirectToMatch(
      "error",
      "We could not send that just now. Try again, or email hello@tinycabin.com.",
    );
    return;
  }

  if (result.destination === "unconfigured") {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[lead] No destination configured. Set FORMSPREE_FORM_ID, LEAD_WEBHOOK_URL, or RESEND_API_KEY + LEAD_TO_EMAIL.",
      );
      redirectToMatch(
        "error",
        "The lead form is not connected yet. Email hello@tinycabin.com and we will follow up.",
      );
      return;
    }

    console.info("[lead preview — not delivered]", parsed.data);
    redirectToMatch("preview");
    return;
  }

  redirectToMatch("sent");
}
