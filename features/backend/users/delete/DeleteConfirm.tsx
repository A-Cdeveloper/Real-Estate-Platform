"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteUser } from "@/server/actions/users";
import { Loader2, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

/**
 * DeleteConfirm component
 * Displays a confirmation dialog for deleting the user
 * @param onClose - Callback function to close the delete confirmation
 * @param onConfirm - Callback function to confirm deletion
 * @param userId - The ID of the user to delete
 */
const DeleteConfirm = ({
  userId,
  onClose,
  onConfirm,
}: {
  userId: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    if (!userId) {
      toast.error("User ID is required");
      return;
    }
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result?.success) {
        toast.success("User deleted successfully");
        onConfirm();
      } else {
        toast.error(result?.error || "Failed to delete user");
      }
    });
  };

  return (
    <Card className="min-w-full md:min-w-[308px] border-destructive/50 py-5">
      <CardHeader className="relative">
        <IconButton
          type="button"
          variant="ghost"
          icon={X}
          label="Close delete confirmation"
          className="absolute right-2 -top-4 h-6 w-6 [&>span]:hidden"
          onClick={onClose}
          disabled={isPending}
        />
        <CardTitle className="text-lg"> Are you sure?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Exit
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={isPending}
              aria-label="Confirm user deletion"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span aria-live="polite">Deleting...</span>
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteConfirm;
