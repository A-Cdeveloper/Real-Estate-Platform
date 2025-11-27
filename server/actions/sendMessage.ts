"use server";

import { contactFormSchema } from "@/server/schemas/contact";
import { sendContactEmail } from "@/server/mail/sendContactEmail";
import { formatZodErrors } from "@/server/utils/zod";
import { getSettings } from "@/server/queries/settings";

export type InputData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type ActionState<TData, TSuccess = { message?: string }> =
  | ({ success: true } & TSuccess)
  | {
      success: false;
      errors: Record<string, string[]>;
      data?: TData;
    };

export async function sendMessageAction(
  prevState: ActionState<InputData> | null,
  formData: FormData
): Promise<ActionState<InputData>> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        name: String(rawData.name || ""),
        email: String(rawData.email || ""),
        phone: rawData.phone ? String(rawData.phone) : undefined,
        message: String(rawData.message || ""),
      },
    };
  }

  const { name, email, phone, message } = result.data;

  try {
    const settings = await getSettings();
    const contactEmail = settings?.email;

    if (!contactEmail) {
      return {
        success: false,
        errors: {
          _general: [
            "Contact email not configured. Please contact administrator.",
          ],
        },
        data: {
          name,
          email,
          phone,
          message,
        },
      };
    }

    await sendContactEmail({
      name,
      email,
      phone,
      message,
      to: contactEmail,
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      errors: {
        _general: ["Failed to send message. Please try again later."],
      },
      data: {
        name,
        email,
        phone,
        message,
      },
    };
  }
}
