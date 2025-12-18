"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "children"
> & {
  label?: string;
  id: string;
  labelClassName?: string;
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
  className?: string;
  "aria-required"?: boolean | "true" | "false";
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  "aria-label"?: string;
};

/**
 * CustomSelect component
 * A reusable select component with label support
 * @param label - Optional label text
 * @param id - Required id for the select
 * @param labelClassName - Optional className for the label
 * @param options - Array of select options
 * @param placeholder - Placeholder text
 * @param triggerClassName - Optional className for the trigger
 * @param ...props - All other Select props
 */
const CustomSelect = ({
  label,
  id,
  labelClassName,
  options,
  placeholder = "Select an option",
  triggerClassName,
  className,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  ...props
}: CustomSelectProps) => {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "font-nunito-sans text-sm font-semibold",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <Select {...props}>
        <SelectTrigger
          id={id}
          className={cn("w-full", triggerClassName)}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
