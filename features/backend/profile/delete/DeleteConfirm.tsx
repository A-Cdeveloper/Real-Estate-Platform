"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconButton from "@/components/shared/ui/IconButton";
import { Loader2, X } from "lucide-react";
import { deleteProfile } from "@/server/actions/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteProfile();
      if (result?.success) {
        onConfirm();
        router.replace("/login");
      } else {
        toast.error(result?.error || "Failed to delete profile");
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
        <CardTitle className="text-xl">Are you sure?</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          This action will delete your profile and all your properties (if any)
          will be transferred to the master administrator.
          <span className="text-destructive font-bold block mt-2">
            This action is irreversible and cannot be undone.
          </span>
        </CardDescription>
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
              aria-label="Confirm profile deletion"
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
