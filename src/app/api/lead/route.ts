import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/deliver-lead";
import { validateLead } from "@/lib/lead";

export const runtime = "nodejs";

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
