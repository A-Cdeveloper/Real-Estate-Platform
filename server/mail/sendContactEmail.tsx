import { render } from "@react-email/render";
import { transporter } from "./transporter";
import ContactEmail from "./templates/ContactEmail";
import { getSettings } from "@/server/queries/settings";

type SendContactEmailParams = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  to: string;
};

export async function sendContactEmail({
  name,
  email,
  phone,
  message,
  to,
}: SendContactEmailParams) {
  const settings = await getSettings();
  const appName = settings?.appName || "Real Estate";

  const emailHtml = await render(
    <ContactEmail
      name={name}
      email={email}
      phone={phone}
      message={message}
      appName={appName}
      logoLight={settings?.logo_light || "/real-estate-logo.png"}
    />
  );

  const mailOptions = {
    from: `${appName} <${process.env.EMAIL_USER}>`,
    to,
    subject: `New Contact Form Message`,
    html: emailHtml,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
