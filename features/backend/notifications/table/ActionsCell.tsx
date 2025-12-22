"use client";

import { Notification } from "@prisma/client";
import { Trash2 } from "lucide-react";
import TableActionButton from "@/components/shared/table/TableActionButton";
import DeleteConfirm from "../delete/DeleteConfirm";

type ActionsCellProps = {
  notification: Notification;
};

/**
 * Actions cell for the notifications table
 * Displays delete action button for a notification
 * Note: Mark as read is handled in the dropdown, not in the table
 */
const ActionsCell = ({ notification }: ActionsCellProps) => {
  return (
    <div className="flex justify-end flex-1 md:justify-center gap-0">
      {/* Delete Action Button */}
      <TableActionButton
        icon={Trash2}
        ariaLabel={`Delete notification ${notification.title}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            notificationId={notification.id}
            onClose={onClose}
          />
        )}
      </TableActionButton>
    </div>
  );
};

export default ActionsCell;
