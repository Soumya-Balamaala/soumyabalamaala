import { Resend } from "resend";
import { ThankyouEmail } from "../../../../../utils/envconfigs";

const resend = new Resend(ThankyouEmail);

export function sendContactEmail(user) {
  console.log(user);

  // Send the email using .then and .catch
  return resend.emails
    .send({
      from: "Soumya Balamaala <soumyabalamaala@gmail.com>", // Replace with your verified sender email
      to: [user.email],
      subject: "Thank you for contacting us!",
      html: `
      <p>Dear ${user.fullname},</p>
      <p>Thank you for reaching out to us regarding <strong>${user.services}</strong>.</p>
      <p>We have received your information and our team will contact you within 24 business hours.</p>
      <br/>
      <p>Best regards,</p>
      <p>Soumya Balamaala</p>
    `,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      throw error;
    });
}
