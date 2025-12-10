"use client";

import { Button } from "@/components/ui/button";
import { updateProperty } from "@/server/actions/properties";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DetailsCard from "../form/DetailsCard";
import LocationCard from "../form/LocationCard";
import ImageGalleryCard from "../form/ImageGalleryCard";
import { PropertyWithOwner } from "@/types/properties";
import { PropertyStatus } from "@prisma/client";
import CustomSelect from "@/components/shared/form/CustomSelect";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";

const EditPropertyForm = ({ property }: { property: PropertyWithOwner }) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateProperty, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Property updated successfully!");
      router.push("/proprietes-area?sort=status_desc");
    }
  }, [state, router]);

  return (
    <div className="w-full">
      <form action={formAction} className="relative">
        <input type="hidden" name="id" value={property.id} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {/* Column 1 - Property Details */}
          <DetailsCard state={state} pending={pending} property={property} />

          {/* Column 2 - Location */}
          <LocationCard state={state} property={property} />

          {/* Column 3 - Gallery */}
          {/* <ImageGalleryCard /> */}
        </div>

        <div className="w-full fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-10 mt-6">
          <div className="flex justify-end gap-2">
            {/* Status - Only show in edit mode */}
            {property && (
              <>
                <CustomSelect
                  id="status"
                  name="status"
                  placeholder="Select status"
                  options={[
                    { value: PropertyStatus.APPROVED, label: "Approved" },
                    { value: PropertyStatus.IN_REVIEW, label: "In Review" },
                    { value: PropertyStatus.REJECTED, label: "Rejected" },
                  ]}
                  defaultValue={
                    state &&
                    !state.success &&
                    state.data &&
                    "status" in state.data
                      ? state.data.status
                      : property.status || undefined
                  }
                  disabled={pending}
                />
                <ErrorFormMessages
                  state={state}
                  fieldName="status"
                  fieldId="status"
                />
              </>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-auto block"
              disabled={pending}
            >
              {pending ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyForm;
