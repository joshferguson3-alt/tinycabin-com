import { NextResponse } from "next/server";
import {
  budgetRanges,
  landStatuses,
  leadLabel,
  timelines,
  validateLead,
} from "@/lib/lead";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function formatLeadText(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  budget: string;
  timeline: string;
  landStatus: string;
  notes?: string;
}) {
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

async function deliverLead(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  budget: string;
  timeline: string;
  landStatus: string;
  notes?: string;
}) {
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
    const from = process.env.LEAD_FROM_EMAIL?.trim() || "Tiny Cabin <onboarding@resend.dev>";
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body && typeof body === "object" && "company" in body) {
    const honeypot = String((body as { company?: unknown }).company ?? "").trim();
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }
  }

  const parsed = validateLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await deliverLead(parsed.data);

    if (result.destination === "unconfigured") {
      if (process.env.NODE_ENV === "production") {
        console.error(
          "[lead] No destination configured. Set FORMSPREE_FORM_ID, LEAD_WEBHOOK_URL, or RESEND_API_KEY + LEAD_TO_EMAIL.",
        );
        return NextResponse.json(
          {
            error:
              "The lead form is not connected yet. Email hello@tinycabin.com and we will follow up.",
          },
          { status: 503 },
        );
      }

      console.info("[lead preview — not delivered]", parsed.data);
      return NextResponse.json({
        ok: true,
        preview: true,
        message:
          "Preview mode: no Formspree, webhook, or Resend destination is set. The lead was logged in the server console only.",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return NextResponse.json(
      {
        error:
          "We could not send that just now. Try again, or email hello@tinycabin.com.",
      },
      { status: 502 },
    );
  }
}
