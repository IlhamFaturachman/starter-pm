import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.com",
  port: 587,
  auth: {
    user: "emailapikey",
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email via ZeptoMail SMTP.
 *
 * @param to      - Recipient email address.
 * @param subject - Email subject line.
 * @param html    - HTML body content.
 *
 * Requires `SMTP_PASS` env var (ZeptoMail SMTP API token)
 * and `SMTP_FROM` env var (sender address).
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const from = process.env.SMTP_FROM;
  if (!from) {
    throw new Error("SMTP_FROM environment variable is not set");
  }
  if (!process.env.SMTP_PASS) {
    throw new Error("SMTP_PASS environment variable is not set");
  }

  await transporter.sendMail({ from, to, subject, html });
}
