import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactElement } from "react";
import { cloneElement, isValidElement } from "react";

type IconButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  icon: LucideIcon;
  label: string;
  className?: string;
  asChild?: boolean;
  children?: ReactElement;
};

const IconButton = ({
  icon: Icon,
  label,
  className,
  asChild = false,
  children,
  ...props
}: IconButtonProps) => {
  const content = (
    <>
      <Icon className="size-4" aria-hidden="true" />
      <span>{label}</span>
    </>
  );

  if (asChild && children && isValidElement(children)) {
    return (
      <Button
        aria-label={label}
        className={cn("flex items-center gap-2", className)}
        asChild
        {...props}
      >
        {cloneElement(
          children as ReactElement<{ children?: React.ReactNode }>,
          {
            children: content,
          }
        )}
      </Button>
    );
  }

  return (
    <Button
      aria-label={label}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {content}
    </Button>
  );
};

export default IconButton;
