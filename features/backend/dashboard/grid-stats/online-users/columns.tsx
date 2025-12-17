import { Column } from "@/components/shared/ui/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { OnlineUser } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Role } from "@prisma/client";

/**
 * Columns for the online users table
 * @returns {Column<OnlineUser>[]} Columns for the online users table
 */
export const getColumns = (): Column<OnlineUser>[] => [
  {
    key: "name",
    label: "Name",
    render: (user) => {
      return (
        <>
          <h2 className="text-white max-w-[190px] line-clamp-2">
            {user.name || "N/A"}
          </h2>
        </>
      );
    },
  },
  {
    key: "role",
    label: "Role",
    render: (user) => {
      return (
        <Badge
          className="w-fit"
          variant={
            user.role === Role.ADMIN ? "default" : ("secondary" as const)
          }
        >
          {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },

  {
    key: "email",
    label: "Email",
    render: (user) => <span>{user.email || "N/A"}</span>,
  },

  {
    key: "lastLogin",
    label: "Last login",
    render: (user) => formatLongDate(user.lastLogin || new Date()),
  },
];
