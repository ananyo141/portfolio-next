import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  port: parseInt(process.env.MAIL_PORT ?? "465"),
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: true,
});

type sendMailType = {
  email: string;
  message: string;
  subject: string;
  html?: any;
};

const sendMail = ({ email, message, subject, html }: sendMailType) => {
  const mailData = {
    from: process.env.MAIL_USER,
    to: [email, process.env.MAIL_RECEIVER as string],
    subject: subject,
    text: message,
    html: html,
  };
  if (process.env.MAIL_RECEIVER === undefined) {
    console.log(mailData);
    throw new Error("MAIL_RECEIVER is should be set");
  }

  // returning and awaiting a new Promise is important as vercel will not wait for the mail to be sent
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Email sent successfully");
        resolve(info);
      }
    });
  });
};

export default sendMail;
