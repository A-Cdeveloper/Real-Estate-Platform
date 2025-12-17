"use client";

import { Info } from "lucide-react";
import GenericTable from "@/components/shared/ui/GenericTable";
import { OnlineUser } from "@/types/user";
import GridCard from "../shared/GridCard";
import { getColumns } from "./columns";

/**
 * Client component that displays online users table with a grid card wrapper
 * Receives data as props from server component
 * Displays online users data in a table format
 */
const OnlineUsersTable = ({ onlineUsers }: { onlineUsers: OnlineUser[] }) => {
  const isEmpty = onlineUsers.length === 0;

  return (
    <GridCard
      title="Users online"
      subtitle={`${onlineUsers.length === 1 ? "1 user" : `${onlineUsers.length} users`}`}
    >
      {isEmpty ? (
        <div className="text-sm text-muted-foreground py-6 px-3 mx-auto flex items-center gap-2">
          <Info className="size-4" aria-hidden="true" />
          <span>No users online</span>
        </div>
      ) : (
        <GenericTable
          data={onlineUsers}
          columns={getColumns()}
          showHeader={false}
          className="text-[13px] text-muted-foreground w-full"
        />
      )}
    </GridCard>
  );
};

export default OnlineUsersTable;
