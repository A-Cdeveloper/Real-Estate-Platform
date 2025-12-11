// features/backend/proprietes/ui/PropertyStatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { PropertyStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

type PropertyStatusBadgeProps = {
  status: PropertyStatus;
  className?: string;
};

/**
 * PropertyStatusBadge Component
 *
 * Displays a property status badge with appropriate styling based on status.
 * Automatically maps PropertyStatus enum values to badge variants.
 *
 * @param status - The property status (APPROVED, IN_REVIEW, REJECTED, etc.)
 * @param className - Optional additional CSS classes
 */
export function PropertyStatusBadge({
  status,
  className,
}: PropertyStatusBadgeProps) {
  // Map status to badge variant
  const getVariant = (
    status: PropertyStatus
  ): "success" | "warning" | "destructive" | "secondary" => {
    switch (status) {
      case PropertyStatus.APPROVED:
        return "success";
      case PropertyStatus.IN_REVIEW:
        return "warning";
      case PropertyStatus.INACTIVE:
        return "secondary";
      case PropertyStatus.REJECTED:
        return "destructive";
      case PropertyStatus.DELETED:
      default:
        return "destructive";
    }
  };

  // Format status text (capitalize first letter, lowercase rest)
  const formatStatus = (status: PropertyStatus): string => {
    if (!status) return "N/A";
    return status.toUpperCase();
  };

  return (
    <Badge
      className={cn("w-fit", className)}
      variant={getVariant(status)}
      aria-label={`Property status: ${formatStatus(status)}`}
    >
      {formatStatus(status)}
    </Badge>
  );
}
