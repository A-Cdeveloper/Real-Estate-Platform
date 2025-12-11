import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  icon?: LucideIcon;
  className?: string;
};

/**
 * PageHeader component
 * Consistent page header for all backend pages
 * @param {string} title - The page title
 * @param {LucideIcon} icon - Optional icon component
 * @param {string} className - Optional additional classes
 * @returns {React.ReactNode} The PageHeader component
 */
const PageHeader = ({ title, icon: Icon, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-wide">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
