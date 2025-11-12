import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  message?: string;
  variant?: "default" | "destructive";
};

const EmptyState = ({
  title = "No items found",
  message = "There are no items to display at this time.",
  variant = "default",
}: EmptyStateProps) => {
  return (
    <Alert variant={variant} className="max-w-md mx-auto mt-12">
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default EmptyState;
