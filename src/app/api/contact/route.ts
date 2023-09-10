import { NextResponse } from "next/server";
import { render } from "@react-email/render";

import ContactFeedbackMail from "./Email";
import sendMail from "@utils/sendMail";

export async function POST(req: Request, res: Response) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return new NextResponse(
      JSON.stringify({ message: "Please fill in all fields" }),
      { status: 400 }
    );
  }

  try {
    await sendMail({
      email,
      message,
      subject: "Woohoo! Thanks for Reaching Out!",
      html: render(
        ContactFeedbackMail({
          username: name,
          userPhone: phone ? phone : "No phone provided",
          userMessage: message,
        })
      ),
    });
    return new NextResponse(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to send message" }),
      { status: 500 }
    );
  }
}
