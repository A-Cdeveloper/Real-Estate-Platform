import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import CustomInput from "@/components/shared/form/CustomInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Textarea } from "@/components/ui/textarea";

type ApplicationInfoCardProps = {
  appName: string;
  appDescription: string;
  errors: { appName?: string[]; appDescription?: string[] };
  pending: boolean;
  handleBlur: (name: "appName" | "appDescription", value: string) => void;
};

const ApplicationInfoCard = ({
  appName,
  appDescription,
  errors,
  pending,
  handleBlur,
}: ApplicationInfoCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-primary/10">
          <FileText className="size-4 text-primary" aria-hidden="true" />
        </div>
        Application Info
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* App Name */}
      <div>
        <label
          htmlFor="app-name"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <FileText className="size-3.5" aria-hidden="true" />
          App Name
        </label>
        <CustomInput
          id="app-name"
          placeholder="Enter app name"
          defaultValue={appName}
          name="appName"
          onBlur={(e) => handleBlur("appName", e.target.value)}
          disabled={pending}
          required
          aria-required="true"
          aria-invalid={errors.appName ? "true" : "false"}
          aria-describedby={errors.appName ? "app-name-error" : undefined}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { appName: errors.appName || [] } }}
          fieldName="appName"
          fieldId="appName"
        />
      </div>

      {/* App Description */}
      <div>
        <label
          htmlFor="app-description"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <FileText className="size-3.5" aria-hidden="true" />
          App Description
        </label>
        <Textarea
          id="app-description"
          placeholder="Enter app description"
          defaultValue={appDescription}
          name="appDescription"
          className="dark:bg-input/30 resize-none"
          onBlur={(e) => handleBlur("appDescription", e.target.value)}
          disabled={pending}
          rows={4}
          required
          aria-required="true"
          aria-invalid={errors.appDescription ? "true" : "false"}
          aria-describedby={
            errors.appDescription ? "app-description-error" : undefined
          }
        />
        <ErrorFormMessages
          state={{
            success: false,
            errors: { appDescription: errors.appDescription || [] },
          }}
          fieldName="appDescription"
          fieldId="appDescription"
        />
      </div>
    </CardContent>
  </Card>
);

export default ApplicationInfoCard;
