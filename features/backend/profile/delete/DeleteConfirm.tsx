"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * DeleteConfirm component
 * Displays a confirmation dialog for deleting the profile
 * @param onClose - Callback function to close the delete confirmation
 * @param onConfirm - Callback function to confirm deletion
 */
const DeleteConfirm = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const handleConfirm = () => {
    // TODO: Implement delete functionality
    console.log("Delete confirmed");
    onConfirm();
  };

  return (
    <Card className="w-full max-w-md min-h-[400px] border-destructive/50">
      <CardHeader>
        <CardTitle className="text-lg">Delete Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-center text-base text-muted-foreground">
            Are you sure?
          </p>
          <div className="flex justify-center gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Exit
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteConfirm;

