import {
  budgetRanges,
  landStatuses,
  leadLabel,
  timelines,
  type LeadValidation,
} from "@/lib/lead";
import { site } from "@/lib/site";

export type LeadRecord = Extract<LeadValidation, { ok: true }>["data"];

function formatLeadText(data: LeadRecord) {
  return [
    `New tiny cabin lead from ${site.domain}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `ZIP / state: ${data.location}`,
    `Budget: ${leadLabel(budgetRanges, data.budget)}`,
    `Timeline: ${leadLabel(timelines, data.timeline)}`,
    `Land: ${leadLabel(landStatuses, data.landStatus)}`,
    `Notes: ${data.notes || "—"}`,
  ].join("\n");
}

export async function deliverLead(data: LeadRecord) {
  const payload = {
    ...data,
    budgetLabel: leadLabel(budgetRanges, data.budget),
    timelineLabel: leadLabel(timelines, data.timeline),
    landStatusLabel: leadLabel(landStatuses, data.landStatus),
    source: site.url,
    submittedAt: new Date().toISOString(),
  };

  const formspreeId = process.env.FORMSPREE_FORM_ID?.trim();
  if (formspreeId) {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        _subject: `Tiny Cabin lead — ${data.name} (${data.location})`,
      }),
    });
    if (!response.ok) {
      throw new Error(`Formspree returned ${response.status}`);
    }
    return { destination: "formspree" as const };
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }
    return { destination: "webhook" as const };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.LEAD_TO_EMAIL?.trim();
  if (resendKey && toEmail) {
    const from =
      process.env.LEAD_FROM_EMAIL?.trim() || "Tiny Cabin <onboarding@resend.dev>";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [toEmail],
        reply_to: data.email,
        subject: `Tiny Cabin lead — ${data.name} (${data.location})`,
        text: formatLeadText(data),
      }),
    });
    if (!response.ok) {
      throw new Error(`Resend returned ${response.status}`);
    }
    return { destination: "resend" as const };
  }

  return { destination: "unconfigured" as const };
}
