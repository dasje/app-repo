import { Resend } from "resend";
import BadgerAppsInviteUserEmail from "../templates/BadgerAppsInviteUserEmail";

interface sendEmailInterface {
  emailTo: string;
  subject: string;
  username?: string;
  //   userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  appName?: string;
  appImage?: string;
  inviteLink?: string;
  //   inviteFromIp?: string;
  //   inviteFromLocation?: string;
}
export const sendEmail = async ({
  emailTo,
  subject,
  //   username,
  invitedByUsername,
  invitedByEmail,
  appName,
  appImage,
  inviteLink,
}: sendEmailInterface) => {
  const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

  await resend.emails
    .send({
      from: process.env.REACT_APP_INFO_EMAIL,
      to: emailTo,
      subject: subject,
      react: BadgerAppsInviteUserEmail({
        // username,
        invitedByUsername,
        invitedByEmail,
        appName,
        appImage,
        inviteLink,
      }),
    })
    .then((res) => {
      return "success";
    });
};
