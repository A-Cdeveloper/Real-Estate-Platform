"use client";

import CustomInput from "@/components/shared/CustomInput";
import ErrorFormMessages from "@/components/shared/ErrorFormMessages";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings } from "@/server/actions/settings";
import { UpdateSettings, PartialUpdateSettings } from "@/types/settings";
import { Suspense, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/shared/Spinner";

const LocationMap = dynamic(() => import("./map/LocationMap"), { ssr: false });
const LogosUploader = dynamic(() => import("./logo/LogosUploader"));

const SettingsForm = ({ settings }: { settings: UpdateSettings }) => {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleBlur = (
    name: keyof UpdateSettings,
    value: string | null | undefined
  ) => {
    if (settings[name] === value) {
      return; // Return early if there's no change in value
    }

    startTransition(async () => {
      const updateData: PartialUpdateSettings = {
        [name]: value ?? null,
      };

      const result = await updateSettings(updateData);

      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          ...(result.errors || {}),
        }));
        return;
      }

      // Clear errors only for the field that was successfully updated
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    });
  };

  return (
    <div className="w-full xl:w-3/4">
      <form className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <LogosUploader
            logo_dark={settings.logo_dark ?? null}
            logo_light={settings.logo_light ?? null}
          />
          <div>
            <CustomInput
              id="app-name"
              placeholder="Enter app name"
              defaultValue={settings.appName}
              name="appName"
              onBlur={(e) => handleBlur("appName", e.target.value)}
              disabled={pending}
            />
            <ErrorFormMessages
              state={{ success: false, errors: { appName: errors.appName } }}
              fieldName="appName"
              fieldId="appName"
            />
          </div>
          <Textarea
            id="app-description"
            placeholder="Enter app description"
            defaultValue={settings.appDescription}
            name="appDescription"
            className="dark:bg-input/30"
            onBlur={(e) => handleBlur("appDescription", e.target.value)}
            disabled={pending}
          />
          <ErrorFormMessages
            state={{
              success: false,
              errors: { appDescription: errors.appDescription },
            }}
            fieldName="appDescription"
            fieldId="appDescription"
          />

          <div>
            <CustomInput
              id="phone"
              placeholder="Enter phone"
              defaultValue={settings.phone}
              name="phone"
              onBlur={(e) => handleBlur("phone", e.target.value)}
              disabled={pending}
            />
            <ErrorFormMessages
              state={{
                success: false,
                errors: { phone: errors.phone },
              }}
              fieldName="phone"
              fieldId="phone"
            />
          </div>
          <div>
            <CustomInput
              id="email"
              placeholder="Enter email"
              defaultValue={settings.email}
              name="email"
              onBlur={(e) => handleBlur("email", e.target.value)}
              disabled={pending}
            />

            <ErrorFormMessages
              state={{
                success: false,
                errors: { email: errors.email },
              }}
              fieldName="email"
              fieldId="email"
            />
          </div>
        </div>
        <Suspense fallback={<Spinner className="size-4" />}>
          <LocationMap
            lat={settings.lat ?? null}
            lng={settings.lng ?? null}
            address={settings.address ?? null}
          />
        </Suspense>
      </form>
    </div>
  );
};

export default SettingsForm;
