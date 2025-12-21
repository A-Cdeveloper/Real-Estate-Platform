import { Column } from "@/components/shared/ui/GenericTable";
import { Badge } from "@/components/ui/badge";
import { formatLongDate } from "@/lib/utils/date";
import { Notification } from "@prisma/client";
import { Bell, CheckCircle2 } from "lucide-react";
import ActionsCell from "./ActionsCell";

/**
 * Columns for the notifications table
 * @returns {Column<Notification>[]} Columns for the notifications table
 */
export const getColumns = (): Column<Notification>[] => [
  {
    key: "isRead",
    label: "Status",
    render: (notification) => {
      return (
        <Badge
          className="w-fit"
          variant={notification.isRead ? "secondary" : "default"}
        >
          <div className="flex items-center gap-1.5">
            {notification.isRead ? (
              <>
                <CheckCircle2 className="size-3" />
                <span>Read</span>
              </>
            ) : (
              <>
                <Bell className="size-3" />
                <span>Unread</span>
              </>
            )}
          </div>
        </Badge>
      );
    },
  },
  {
    key: "title",
    label: "Title",
    render: (notification) => (
      <span
        className={`text-foreground ${
          !notification.isRead ? "font-semibold" : ""
        }`}
      >
        {notification.title}
      </span>
    ),
  },
  {
    key: "message",
    label: "Message",
    render: (notification) => (
      <p className="text-sm text-muted-foreground line-clamp-2">
        {notification.message}
      </p>
    ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (notification) => formatLongDate(notification.createdAt),
  },
  {
    key: "readAt",
    label: "Read At",
    render: (notification) =>
      notification.readAt ? (
        formatLongDate(notification.readAt)
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  },
  {
    key: "actions",
    label: "",
    render: (notification) => <ActionsCell notification={notification} />,
  },
];

