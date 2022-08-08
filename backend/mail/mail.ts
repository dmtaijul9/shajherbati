import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { createTransport } from "nodemailer";

const {
  DASHBOARD_URL,
  MESSANGER_MAIL,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
} = process.env;

const transport = createTransport({
  // @ts-ignore
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const resetPasswordSource = fs.readFileSync(
  path.resolve("mail/reset.handlebars"),
  "utf8"
);

const resetPasswordTemplateCompiled = Handlebars.compile(resetPasswordSource);

export async function sendResetPassword(resetToken: string, to: string) {
  try {
    const resetUrl = `${DASHBOARD_URL}/reset?token=${resetToken}&email=${to}`;

    await transport.sendMail({
      to,
      from: `Aleks Creation Team ${MESSANGER_MAIL}`,
      subject: "Aleks creation | Reset your password",
      html: resetPasswordTemplateCompiled({ token: resetUrl }),
    });

    return { message: "Verification url sent to your mail" };
  } catch (error) {
    console.log(error);
    throw new Error("Cannot send email.");
  }
}
