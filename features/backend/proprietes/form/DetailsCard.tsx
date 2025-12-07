"use client";

import CustomInput from "@/components/shared/form/CustomInput";
import CustomSelect from "@/components/shared/form/CustomSelect";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, Euro, Ruler, FileText } from "lucide-react";
import { PropertyType } from "@prisma/client";
import { PropertyActionState } from "@/types/properties";
import { CreatePropertyFormData } from "@/server/schemas/property";

interface DetailsCardProps {
  state: PropertyActionState<CreatePropertyFormData> | null;
  pending: boolean;
}

const DetailsCard = ({ state, pending }: DetailsCardProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <Home className="size-4 text-primary" />
            </div>
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Home className="size-3.5" />
              Property Name
            </label>
            <CustomInput
              id="name"
              name="name"
              placeholder="Modern Apartment in City Center"
              defaultValue={
                state && !state.success && state.data
                  ? state.data.name
                  : undefined
              }
              disabled={pending}
            />
            <ErrorFormMessages state={state} fieldName="name" fieldId="name" />
          </div>

          {/* Type */}
          <div>
            <CustomSelect
              id="type"
              name="type"
              label="Property Type"
              labelClassName="text-sm font-medium mb-2 flex items-center gap-2"
              placeholder="Select property type"
              options={[
                { value: PropertyType.Apartment, label: "Apartment" },
                { value: PropertyType.House, label: "House" },
                { value: PropertyType.Commercial, label: "Commercial" },
              ]}
              defaultValue={
                state && !state.success && state.data
                  ? state.data.type
                  : undefined
              }
              disabled={pending}
            />
            <ErrorFormMessages state={state} fieldName="type" fieldId="type" />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Euro className="size-3.5" />
              Price (€)
            </label>
            <CustomInput
              id="price"
              name="price"
              type="number"
              placeholder="250000"
              defaultValue={
                state && !state.success && state.data
                  ? state.data.price?.toString()
                  : undefined
              }
              disabled={pending}
            />
            <ErrorFormMessages
              state={state}
              fieldName="price"
              fieldId="price"
            />
          </div>

          {/* Area */}
          <div>
            <label
              htmlFor="area"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Ruler className="size-3.5" />
              Area (m²)
            </label>
            <CustomInput
              id="area"
              name="area"
              type="number"
              placeholder="85"
              defaultValue={
                state && !state.success && state.data
                  ? state.data.area?.toString()
                  : undefined
              }
              disabled={pending}
            />
            <ErrorFormMessages state={state} fieldName="area" fieldId="area" />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <FileText className="size-3.5" />
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your property in detail..."
              rows={6}
              className="dark:bg-input/30 resize-none"
              defaultValue={
                state && !state.success && state.data
                  ? state.data.description
                  : undefined
              }
              disabled={pending}
            />
            <ErrorFormMessages
              state={state}
              fieldName="description"
              fieldId="description"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsCard;

