import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import CustomInput from "@/components/shared/form/CustomInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";

type ContactInfoCardProps = {
  phone: string;
  email: string;
  errors: { phone?: string[]; email?: string[] };
  pending: boolean;
  handleBlur: (name: "phone" | "email", value: string) => void;
};

const ContactInfoCard = ({
  phone,
  email,
  errors,
  pending,
  handleBlur,
}: ContactInfoCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-500/10">
          <Phone
            className="size-4 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
        </div>
        Contact Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Phone className="size-3.5" aria-hidden="true" />
          Phone
        </label>
        <CustomInput
          id="phone"
          placeholder="Enter phone"
          defaultValue={phone}
          name="phone"
          onBlur={(e) => handleBlur("phone", e.target.value)}
          disabled={pending}
          required
          aria-required="true"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { phone: errors.phone || [] } }}
          fieldName="phone"
          fieldId="phone"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Mail className="size-3.5" aria-hidden="true" />
          Email
        </label>
        <CustomInput
          id="email"
          type="email"
          placeholder="Enter email"
          defaultValue={email}
          name="email"
          onBlur={(e) => handleBlur("email", e.target.value)}
          disabled={pending}
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { email: errors.email || [] } }}
          fieldName="email"
          fieldId="email"
        />
      </div>
    </CardContent>
  </Card>
);

export default ContactInfoCard;
