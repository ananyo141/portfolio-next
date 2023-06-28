import { NextResponse } from "next/server";

import sendMail from "@utils/sendMail";

export async function POST(req: Request, res: Response) {
  const { name, email, phone, message } = await req.json();

  sendMail({ email, message, subject: "Contact Form Submission" });
  return new NextResponse(
    JSON.stringify({ message: "Message sent successfully!" })
  );
}
