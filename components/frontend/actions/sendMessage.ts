"use server";

import { contactFormSchema } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/lib/mail/sendContactEmail";
import { CONTACT_EMAIL } from "@/lib/constants";

type InputData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type ActionState =
  | { success: true; message?: string }
  | {
      success: false;
      errors: Record<string, string[]>;
      data?: InputData;
    };

export async function sendMessageAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(issue.message);
    });
    return {
      success: false,
      errors,
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
    await sendContactEmail({
      name,
      email,
      phone,
      message,
      to: CONTACT_EMAIL,
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
