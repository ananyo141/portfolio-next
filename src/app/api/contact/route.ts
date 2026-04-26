import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";

import ContactFeedbackMail from "./Email";
import sendMail from "@utils/sendMail";
import { rateLimit } from "@lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success, remaining, reset } = rateLimit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return new NextResponse(
      JSON.stringify({
        message: "Too many messages. Please try again later.",
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return new NextResponse(JSON.stringify({ message: "Please fill in all fields" }), {
      status: 400,
    });
  }

  try {
    await sendMail({
      email,
      message,
      subject: "Woohoo! Thanks for Reaching Out!",
      html: await render(
        ContactFeedbackMail({
          username: name,
          userPhone: phone ? phone : "No phone provided",
          userMessage: message,
        })
      ),
    });
    return new NextResponse(JSON.stringify({ message: "Message sent successfully!" }), {
      status: 201,
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ message: "Failed to send message" }), { status: 500 });
  }
}
