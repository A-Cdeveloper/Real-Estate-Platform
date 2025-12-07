"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/shared/form/CustomInput";
import { cn } from "@/lib/utils";

type PasswordInputProps = {
  id: string;
  name: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  "aria-required"?: boolean | "true" | "false";
  className?: string;
};

const PasswordInput = ({
  id,
  name,
  label,
  labelClassName,
  placeholder,
  defaultValue,
  value,
  onChange,
  disabled,
  "aria-required": ariaRequired,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <CustomInput
        id={id}
        label={label}
        labelClassName={labelClassName}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-required={ariaRequired}
        className={cn("pr-10", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 bottom-1 h-7 w-7"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
