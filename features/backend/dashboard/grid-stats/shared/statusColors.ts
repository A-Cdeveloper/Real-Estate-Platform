import { PropertyStatus } from "@prisma/client";

/**
 * Standard color mapping for property statuses across all charts
 * APPROVED - success (green)
 * IN_REVIEW - primary (blue)
 * REJECTED - destructive (red)
 * INACTIVE - muted-foreground (gray)
 * DELETED - warning (yellow/orange)
 */
export const STATUS_COLORS: Record<PropertyStatus, string> = {
  [PropertyStatus.APPROVED]: "var(--success)",
  [PropertyStatus.IN_REVIEW]: "var(--primary)",
  [PropertyStatus.REJECTED]: "var(--destructive)",
  [PropertyStatus.INACTIVE]: "var(--muted-foreground)",
  [PropertyStatus.DELETED]: "var(--destructive)",
};

/**
 * Get color for a specific property status
 */
export const getStatusColor = (status: PropertyStatus): string => {
  return STATUS_COLORS[status];
};

/**
 * Get colors array in order: APPROVED, IN_REVIEW, REJECTED, INACTIVE, DELETED
 */
export const getStatusColorsArray = (): string[] => {
  return [
    STATUS_COLORS[PropertyStatus.APPROVED],
    STATUS_COLORS[PropertyStatus.IN_REVIEW],
    STATUS_COLORS[PropertyStatus.REJECTED],
    STATUS_COLORS[PropertyStatus.INACTIVE],
    STATUS_COLORS[PropertyStatus.DELETED],
  ];
};
