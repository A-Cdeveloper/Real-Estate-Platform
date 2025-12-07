"use client";

import { Button } from "@/components/ui/button";
import { createProperty } from "@/server/actions/properties";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DetailsCard from "../form/DetailsCard";
import LocationCard from "../form/LocationCard";
import ImageGalleryCard from "../form/ImageGalleryCard";

const AddPropertyForm = () => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createProperty, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Property created successfully!");
      router.push("/proprietes-area?sort=status_desc");
    }
  }, [state, router]);

  return (
    <div className="w-full">
      <form action={formAction} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {/* Column 1 - Property Details */}
          <DetailsCard state={state} pending={pending} />

          {/* Column 2 - Location */}
          <LocationCard state={state} pending={pending} />

          {/* Column 3 - Gallery */}
          <ImageGalleryCard />
        </div>

        <div className="w-full fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-10 mt-6">
          <Button
            type="submit"
            size="lg"
            className="w-auto block ml-auto"
            disabled={pending}
          >
            {pending ? "Creating..." : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
