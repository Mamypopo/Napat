import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Portfolio] ${name} ส่งข้อความมา`,
    text: `ชื่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#111;color:#eee;border-radius:8px;">
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#553F83;margin-bottom:24px;">Portfolio · Contact Form</p>
        <h2 style="font-size:20px;font-weight:700;margin-bottom:4px;color:#fff;">${name}</h2>
        <p style="font-size:13px;color:#aaa;margin-bottom:24px;"><a href="mailto:${email}" style="color:#553F83;">${email}</a></p>
        <div style="border-top:1px solid #333;padding-top:20px;">
          <p style="font-size:15px;line-height:1.7;color:#ccc;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
