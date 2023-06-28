import { NextResponse } from "next/server";
import { render } from "@react-email/render";

import ContactFeedbackMail from "./Email";
import sendMail from "@utils/sendMail";

export async function POST(req: Request, res: Response) {
  const { name, email, phone, message } = await req.json();

  await sendMail({
    email,
    message,
    subject: "Woohoo! Thanks for Reaching Out!",
    html: render(
      ContactFeedbackMail({
        username: name,
        userPhone: phone,
        userMessage: message,
      })
    ),
  });
  return new NextResponse(
    JSON.stringify({ message: "Message sent successfully!" })
  );
}
