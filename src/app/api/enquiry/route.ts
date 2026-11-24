import { NextResponse } from "next/server";

/**
 * Enquiry / tour / RSVP endpoint. Validates server-side (never trust the client) and returns a reference.
 * DELIVERY IS NOT YET WIRED: connect to the CRM/email service at [[CRM_ENDPOINT]] before launch.
 * Until then submissions are validated and acknowledged but NOT stored.
 */
const isEmail = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isPhone = (v: unknown) => typeof v === "string" && /^\d{6,15}$/.test(v.replace(/[\s\-()]/g, ""));
const str = (v: unknown, max = 200) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const errors: string[] = [];
  if (!str(body.name, 120)) errors.push("name");
  if (!isEmail(body.email)) errors.push("email");
  if (!isPhone(body.phone)) errors.push("phone");
  if (body.consent !== true) errors.push("consent");
  if (body.type === "enquiry") {
    for (const k of ["nationality", "curriculum", "program", "intake"]) if (!str(body[k])) errors.push(k);
  } else if (body.type === "visit") {
    if (typeof body.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) errors.push("date");
  } else {
    errors.push("type");
  }
  if (typeof body.message === "string" && body.message.length > 2000) errors.push("message");

  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const ref = `${body.type === "visit" ? "TOUR" : "ENQ"}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  // TODO([[CRM_ENDPOINT]]): forward { ref, ...body } to the admissions CRM.
  return NextResponse.json({ ok: true, ref });
}
