import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

type CustomInputProps = React.ComponentProps<"input"> & {
  label?: string;
  id: string;
  labelClassName?: string;
  "aria-required"?: boolean | "true" | "false";
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
};

const CustomInput = ({
  label,
  id,
  labelClassName,
  className,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CustomInputProps) => {
  return (
    <div className="grid gap-2">
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
      <Input
        id={id}
        className={className}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
