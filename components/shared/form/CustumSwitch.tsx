"use client";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

/**
 * CustumSwitch component
 * @param id - The id of the switch
 * @param name - The name of the switch
 * @param defaultChecked - The default checked state of the switch
 * @param labels - The labels of the switch
 * @param className - The class name of the switch
 */

type CustumSwitchProps = {
  id: string;
  name: string;
  defaultChecked: boolean;
  labels: { label: string; checked: boolean }[];
  className?: string;
};

const CustumSwitch = ({
  id,
  name,
  defaultChecked,
  labels,
  className,
}: CustumSwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
  };
  const currentLabel = checked
    ? labels.find((label) => label.checked)?.label
    : labels.find((label) => !label.checked)?.label;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={checked}
        className={className}
        onCheckedChange={handleCheckedChange}
        aria-label={currentLabel || "Toggle switch"}
        aria-checked={checked}
      />
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {currentLabel}
      </label>
      <input type="hidden" name={name} value={checked.toString()} />
    </div>
  );
};

export default CustumSwitch;
