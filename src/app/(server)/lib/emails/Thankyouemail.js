import { render } from "@react-email/components";
import { SoumyaEmaildetails } from "../../../../../utils/envconfigs";
import { SoumyaTransporter } from "./Transporter";
import UserAcknowledgement from "./Templates/UserAcknowledgement";

export async function userEnquiryResponse(userdetails, logos) {
  return render(<UserAcknowledgement user={userdetails} logo={logos} />)
    .then((htmlContent) => {
      return SoumyaTransporter.sendMail({
        from: `"Soumya Balamaala" <${SoumyaEmaildetails.user}>`,
        to: userdetails.email,
        subject: "Thank You for Reaching Out!",
        html: htmlContent,
      });
    })
    .then((info) => {
      console.log("Email sent successfully:", info.messageId);
      return {
        status: 200,
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
      };
    })
    .catch((error) => {
      console.error("Failed to send email:", error.message);
      return {
        status: 500,
        success: false,
        message: "Failed to send email",
        error: error.message,
      };
    });
}
