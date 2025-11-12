import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type AboutWidgetProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
};

const AboutWidget = ({
  title,
  description,
  icon: Icon,
  variant = "primary",
}: AboutWidgetProps) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        isPrimary
          ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
          : "bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent"
      )}
    >
      {/* Background icon */}
      <div
        className={cn(
          "absolute right-0 top-0 -translate-y-4 translate-x-4 opacity-10 transition-opacity duration-300 group-hover:opacity-20",
          isPrimary ? "text-primary" : "text-secondary-foreground"
        )}
      >
        <Icon className="h-24 w-24" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Icon badge */}
        <div
          className={cn(
            "mb-4 inline-flex rounded-full p-3",
            isPrimary ? "bg-primary/20" : "bg-secondary"
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8",
              isPrimary ? "text-primary" : "text-secondary-foreground"
            )}
          />
        </div>

        {/* Title */}
        <Typography
          variant="h3"
          className="mb-2 text-4xl font-bold text-foreground"
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography className="text-sm text-muted-foreground">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default AboutWidget;
