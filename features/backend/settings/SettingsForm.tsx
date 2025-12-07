"use client";

import { updateSettings } from "@/server/actions/settings";
import { UpdateSettings, PartialUpdateSettings } from "@/types/settings";
import { toast } from "sonner";
import { useState, useTransition } from "react";

import LogoCard from "./form/LogoCard";
import ApplicationInfoCard from "./form/ApplicationInfoCard";
import LocationCard from "./form/LocationCard";
import ContactInfoCard from "./form/ContactInfoCard";
import SocialMediaCard from "./form/SocialMediaCard";

const FIELD_LABELS: Record<string, string> = {
  appName: "App Name",
  appDescription: "App Description",
  phone: "Phone",
  email: "Email",
  address: "Address",
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

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
        toast.error(result.error || "Failed to update settings");
        return;
      }

      // Clear errors only for the field that was successfully updated
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));

      // Show success toast
      const fieldLabel = FIELD_LABELS[name] || name;
      toast.success(`${fieldLabel} updated successfully`);
    });
  };

  return (
    <div className="w-full">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1 - App Settings */}
        <div className="space-y-6">
          {/* Card: Brand */}
          <LogoCard
            logo_light={settings.logo_light}
            logo_dark={settings.logo_dark}
          />

          {/* Card: Basic Info */}
          <ApplicationInfoCard
            appName={settings.appName}
            appDescription={settings.appDescription}
            errors={errors}
            pending={pending}
            handleBlur={handleBlur}
          />
        </div>

        {/* Column 2 - Location & Contact */}
        <div className="space-y-6">
          <LocationCard
            lat={settings.lat}
            lng={settings.lng}
            address={settings.address}
          />

          {/* Card: Contact Info */}
          <ContactInfoCard
            phone={settings.phone}
            email={settings.email}
            errors={errors}
            pending={pending}
            handleBlur={handleBlur}
          />
        </div>

        {/* Column 3 - Social Media */}
        <div className="space-y-6">
          <SocialMediaCard
            facebook={settings.facebook}
            instagram={settings.instagram}
            x={settings.x}
            linkedin={settings.linkedin}
            youtube={settings.youtube}
            errors={errors}
            handleBlur={handleBlur}
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
