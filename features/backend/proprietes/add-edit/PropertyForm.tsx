"use client";

import { Button } from "@/components/ui/button";
import { createProperty, updateProperty } from "@/server/actions/properties";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DetailsCard from "../form/DetailsCard";
import LocationCard from "../form/LocationCard";
import ImageGalleryCard from "../form/ImageGalleryCard";
import { PropertyWithOwner } from "@/types/properties";
import { PropertyStatus } from "@prisma/client";
import CustomSelect from "@/components/shared/form/CustomSelect";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Loader2 } from "lucide-react";

type PropertyFormProps = {
  mode: "add" | "edit";
  property?: PropertyWithOwner;
};

const PropertyForm = ({ mode, property }: PropertyFormProps) => {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [hasBlobs, setHasBlobs] = useState(false);

  // Razdvojene action-state kuke
  const [addState, addFormAction, addPending] = useActionState(
    createProperty,
    null
  );
  const [editState, editFormAction, editPending] = useActionState(
    updateProperty,
    null
  );

  const state = isEdit ? editState : addState;
  const formAction = isEdit ? editFormAction : addFormAction;
  const pending = isEdit ? editPending : addPending;

  console.log("form rendered");

  useEffect(() => {
    if (state?.success) {
      toast.success(
        mode === "add"
          ? "Property created successfully!"
          : "Property updated successfully!"
      );
      router.push("/proprietes-area?sort=status_desc");
    }
  }, [state, router, mode]);

  return (
    <div className="w-full">
      <form action={formAction} className="relative">
        {mode === "edit" && property && (
          <input type="hidden" name="id" value={property.id} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {/* Column 1 - Property Details */}
          <DetailsCard state={state} pending={pending} property={property} />

          {/* Column 2 - Location */}
          <LocationCard state={state} property={property} />

          {/* Column 3 - Gallery */}
          <ImageGalleryCard
            state={state}
            property={property}
            onHasBlobsChange={setHasBlobs}
          />
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
                    typeof (state.data as { status?: unknown }).status ===
                      "string"
                      ? (state.data as { status?: string }).status
                      : property?.status || undefined
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
            <Button type="submit" disabled={pending || hasBlobs}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span aria-live="polite">
                    {mode === "add" ? "Creating..." : "Updating..."}
                  </span>
                </>
              ) : mode === "add" ? (
                "Create Property"
              ) : (
                "Update Property"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
