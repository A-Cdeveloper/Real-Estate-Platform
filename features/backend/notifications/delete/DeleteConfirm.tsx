"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteNotification } from "@/server/actions/notifications";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

/**
 * DeleteConfirm component
 * Displays a confirmation dialog for deleting a notification
 * @param onClose - Callback function to close the delete confirmation
 * @param onConfirm - Callback function to confirm deletion
 * @param notificationId - The ID of the notification to delete
 */
const DeleteConfirm = ({
  notificationId,
  onClose,
  onConfirm,
}: {
  notificationId: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    if (!notificationId) {
      toast.error("Notification ID is required");
      return;
    }
    startTransition(async () => {
      const result = await deleteNotification(notificationId);
      if (result?.success) {
        toast.success("Notification deleted successfully");
        // Dispatch custom event to refresh dropdown
        window.dispatchEvent(
          new CustomEvent("notificationDeleted", { detail: { notificationId } })
        );
        onConfirm();
        router.refresh();
      } else {
        toast.error(result?.error || "Failed to delete notification");
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
        <CardTitle className="text-lg">Are you sure?</CardTitle>
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
              aria-label="Confirm notification deletion"
            >
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
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
