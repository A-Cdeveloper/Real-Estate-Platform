"use client";

import { Button } from "@/components/ui/button";
import { createProperty, updateProperty } from "@/server/actions/properties";
import { useActionState, useEffect, useState, useCallback } from "react";
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
import BackButton from "@/components/shared/ui/BackButton";
import WarningModal from "@/components/shared/ui/WarningModal";

type PropertyFormProps = {
  mode: "add" | "edit";
  property?: PropertyWithOwner;
  isAdmin?: boolean;
};

const PropertyForm = ({
  mode,
  property,
  isAdmin = false,
}: PropertyFormProps) => {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [hasBlobs, setHasBlobs] = useState(false);

  // separate action states for add and edit modes
  const [addState, addFormAction, addPending] = useActionState(
    createProperty,
    null
  );
  const [editState, editFormAction, editPending] = useActionState(
    updateProperty,
    null
  );

  const [isDirty, setIsDirty] = useState(false);

  const markDirty = useCallback(() => {
    if (!isDirty) {
      setIsDirty(true);
    }
  }, [isDirty]);

  const handleHasBlobsChange = useCallback(
    (hasBlobs: boolean) => {
      setHasBlobs(hasBlobs);
      markDirty(); // Mark form as dirty when gallery changes
    },
    [markDirty]
  );

  const state = isEdit ? editState : addState;
  const formAction = isEdit ? editFormAction : addFormAction;
  const pending = isEdit ? editPending : addPending;

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(
        mode === "add"
          ? "Property created successfully!"
          : "Property updated successfully!"
      );
      router.push("/proprietes-area");
    }
  }, [state, router, mode, isDirty]);

  return (
    <>
      <div className="w-full">
        <BackButton
          label="Back"
          className="bg-transparent! text-muted-foreground! mb-3"
          onClick={() => {
            if (isDirty) {
              setShowWarning(true);
              return;
            }
            setShowWarning(false);
            router.back();
          }}
        />
        <form action={formAction} className="relative" onChange={markDirty}>
          {mode === "edit" && property && (
            <input type="hidden" name="id" value={property.id} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {/* Column 1 - Property Details */}
            <DetailsCard state={state} pending={pending} property={property} />

            {/* Column 2 - Location */}
            <LocationCard
              state={state}
              property={property}
              onLocationChange={markDirty}
            />

            {/* Column 3 - Gallery */}
            <ImageGalleryCard
              state={state}
              property={property}
              onHasBlobsChange={handleHasBlobsChange}
            />
          </div>

          <div className="w-full fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-10 mt-6">
            <div className="flex justify-end gap-2">
              {/* Status - Only show in edit mode and only for admin */}
              {property && isAdmin && (
                <>
                  <CustomSelect
                    id="status"
                    name="status"
                    placeholder="Select status"
                    options={[
                      { value: PropertyStatus.APPROVED, label: "Approved" },
                      { value: PropertyStatus.IN_REVIEW, label: "In Review" },
                      { value: PropertyStatus.REJECTED, label: "Rejected" },
                      { value: PropertyStatus.INACTIVE, label: "Inactive" },
                      { value: PropertyStatus.DELETED, label: "Deleted" },
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
                    aria-label="Property status"
                    aria-invalid={
                      state && !state.success && state.errors?.status
                        ? "true"
                        : "false"
                    }
                    aria-describedby={
                      state && !state.success && state.errors?.status
                        ? "status-error"
                        : undefined
                    }
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

      <WarningModal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          router.back();
        }}
        title="Are you sure?"
        message="You have unsaved changes. Are you sure you want to leave?"
      />
    </>
  );
};

export default PropertyForm;
