"use client";

import IconButton from "@/components/shared/IconButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteNews } from "@/server/actions/news";
import { Loader2, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

/**
 * DeleteConfirm component
 * Displays a confirmation dialog for deleting the news item
 * @param onClose - Callback function to close the delete confirmation
 * @param onConfirm - Callback function to confirm deletion
 * @param newsId - The ID of the news item to delete
 */
const DeleteConfirm = ({
  newsId,
  onClose,
  onConfirm,
}: {
  newsId: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    if (!newsId) {
      toast.error("News ID is required");
      return;
    }
    startTransition(async () => {
      const result = await deleteNews(newsId);
      if (result?.success) {
        toast.success("News deleted successfully");
        onConfirm();
      } else {
        toast.error(result?.error || "Failed to delete news");
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
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
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
