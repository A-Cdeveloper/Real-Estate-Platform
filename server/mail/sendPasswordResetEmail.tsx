import { render } from "@react-email/render";
import { transporter } from "./transporter";
import PasswordResetEmail from "./templates/PasswordResetEmail";
import { getSettings } from "@/server/queries/settings";

type SendPasswordResetEmailParams = {
  email: string;
  resetToken: string;
};

export async function sendPasswordResetEmail({
  email,
  resetToken,
}: SendPasswordResetEmailParams) {
  const settings = await getSettings();
  const appName = settings?.appName || "Real Estate";

  const emailHtml = await render(
    <PasswordResetEmail
      resetToken={resetToken}
      appName={appName}
      logoLight={settings?.logo_light || "/real-estate-logo.png"}
    />
  );

  const mailOptions = {
    from: `${appName} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reset Your Password - ${appName}`,
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
