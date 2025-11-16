import { render } from "@react-email/render";
import { transporter } from "./transporter";
import PasswordResetEmail from "./templates/PasswordResetEmail";
import { APP_NAME } from "@/lib/constants";

type SendPasswordResetEmailParams = {
  email: string;
  resetToken: string;
};

export async function sendPasswordResetEmail({
  email,
  resetToken,
}: SendPasswordResetEmailParams) {
  const emailHtml = await render(
    <PasswordResetEmail resetToken={resetToken} />
  );

  const mailOptions = {
    from: `${APP_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reset Your Password - ${APP_NAME}`,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

