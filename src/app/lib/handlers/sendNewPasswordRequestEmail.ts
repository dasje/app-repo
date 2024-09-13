import { Resend } from "resend";
import BadgerAppsResetPasswordEmail from "../templates/BadgerAppsRequestNewPasswordEmail";

interface sendEmailInterface {
  emailTo: string;
  subject: string;
  appName?: string;
  resetLink?: string;
}
export const sendEmail = async ({
  emailTo,
  subject,
  appName,
  resetLink,
}: sendEmailInterface) => {
  const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

  await resend.emails
    .send({
      from: process.env.REACT_APP_INFO_EMAIL,
      to: emailTo,
      subject: subject,
      react: BadgerAppsResetPasswordEmail({
        appName,
        resetLink,
      }),
    })
    .then((res) => {
      return "success";
    });
};
