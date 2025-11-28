"use client";

import GenericTable from "@/components/shared/GenericTable";
import { Button } from "@/components/ui/button";
import { UserWithProperties } from "@/types/user";
import { UserPlus } from "lucide-react";
import { columns } from "./table/columns";

const AllUsers = ({
  users,
  total,
}: {
  users: UserWithProperties[];
  total: number;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between w-full xl:w-3/4">
        <span className="text-sm">Total: {total}</span>
        <Button>
          <UserPlus className="size-4 mr-2" />
          Add New User
        </Button>
      </div>

      <GenericTable
        data={users}
        columns={columns}
        className="w-full xl:w-3/4 text-sm text-muted-foreground"
      />
    </div>
  );
};

export default AllUsers;
