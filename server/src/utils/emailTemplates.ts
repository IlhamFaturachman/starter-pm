import { OTP_EXPIRATION_MINUTES } from "./authHelpers";

export function buildOtpEmailHtml(code: string): string {
  return `
    <p>Your password reset code is <strong>${code}</strong>.</p>
    <p>This code expires in ${OTP_EXPIRATION_MINUTES} minutes.</p>
  `;
}

export function buildTemporaryPasswordEmailHtml(temporaryPassword: string): string {
  return `
    <p>Your password has been reset.</p>
    <p>Your temporary password is <strong>${temporaryPassword}</strong>.</p>
    <p>Please sign in and change it immediately.</p>
  `;
}
