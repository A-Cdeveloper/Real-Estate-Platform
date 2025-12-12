"use client";
import TableActionButton from "@/components/shared/table/TableActionButton";
import { UserWithProperties } from "@/types/user";
import { Pencil, Trash2 } from "lucide-react";
import UserForm from "../add-edit/UserForm";
import DeleteConfirm from "../delete/DeleteConfirm";

/**
 * Actions cell for the users table
 * Displays edit and delete action buttons for a user
 * @param user - The user to display the actions for
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  user: UserWithProperties;
};

const ActionsCell = ({ user }: ActionsCellProps) => {
  return (
    <div className="flex justify-center gap-0">
      {/* Edit Action Button */}
      <TableActionButton
        icon={Pencil}
        ariaLabel={`Edit user ${user.name || user.email}`}
      >
        {(onClose) => (
          <UserForm mode="edit" initialData={user} onClose={onClose} />
        )}
      </TableActionButton>
      {/* Delete Action Button */}
      <TableActionButton
        icon={Trash2}
        ariaLabel={`Delete user ${user.name || user.email}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            userId={user.id}
            onClose={onClose}
          />
        )}
      </TableActionButton>
    </div>
  );
};

export default ActionsCell;
