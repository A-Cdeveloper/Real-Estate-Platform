import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

type IconButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  icon: LucideIcon;
  label: string;
  className?: string;
};

const IconButton = ({
  icon: Icon,
  label,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      aria-label={label}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
};

export default IconButton;
