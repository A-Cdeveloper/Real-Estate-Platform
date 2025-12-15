import { Column } from "@/components/shared/ui/GenericTable";
import { Badge } from "@/components/ui/badge";
import { formatLongDate } from "@/lib/utils/date";
import { UserWithProperties } from "@/types/user";
import {
  Building2,
  Mail,
  User2Icon,
  User as UserIcon,
  UserX,
} from "lucide-react";
import Link from "next/link";
import ActionsCell from "./ActionsCell";
import { Role } from "@prisma/client";

const getRoleBadgeVariant = (role: string) => {
  return role === "ADMIN" ? "default" : "secondary";
};

/**
 * Columns for the users table
 * @param currentUserId - The currently logged-in user id
 * @returns {Column<UserWithProperties>[]} Columns for the users table
 */
export const getColumns = (
  currentUserId?: string | null
): Column<UserWithProperties>[] => [
  {
    key: "online",
    label: "",
    render: (user) => {
      return (
        <Badge
          className="w-fit"
          variant={user.isOnline ? "success" : "destructive"}
        >
          {user.isOnline ? "Online" : "Offline"}
        </Badge>
      );
    },
  },
  {
    key: "name",
    label: "Name",
    render: (user) => (
      <div className="flex items-center gap-2">
        <UserIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-white">{user.name || "N/A"}</span>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (user) => (
      <div className="flex items-center gap-2">
        <Mail className="size-4 text-muted-foreground" aria-hidden="true" />
        <Link
          href={`mailto:${user.email}`}
          className="text-sm"
          aria-label={`Send email to ${user.email}`}
        >
          {user.email}
        </Link>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (user) => {
      return (
        <Badge className="w-fit" variant={getRoleBadgeVariant(user.role)}>
          {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
  {
    key: "isActive",
    label: "Status",
    render: (user) => (
      <span className="text-sm font-medium">
        {user.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },

  {
    key: "createdAt",
    label: "Created",
    render: (user) => formatLongDate(user.createdAt),
  },
  {
    key: "propertyCount",
    label: "Properties",
    render: (user) => (
      <Link
        href={`/proprietes-area?ownerId=${user.id}`}
        className="text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <Building2
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          {user.propertyCount}
        </div>
      </Link>
    ),
  },
  {
    key: "edit/delete",
    label: "",
    render: (user) => {
      return currentUserId === user.id ? (
        <>
          <Link
            href={`/profile`}
            className="text-sm hover:text-primary"
            aria-label={`View profile for ${user.name || user.email}`}
          >
            <User2Icon
              className="size-5 text-muted-foreground mx-auto"
              aria-hidden="true"
            />
          </Link>
        </>
      ) : user.role !== Role.ADMIN ? (
        <ActionsCell key={user.id} user={user} />
      ) : (
        <UserX
          className="size-5 text-muted-foreground/30 mx-auto"
          aria-hidden="true"
        />
      );
    },
  },
];
