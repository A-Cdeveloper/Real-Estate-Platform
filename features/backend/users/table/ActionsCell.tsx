import { Button } from "@/components/ui/button";
import { UserWithProperties } from "@/types/user";
import { Pencil, Trash2 } from "lucide-react";

/**
 * Actions cell for the users table
 * @param {UserWithProperties} user - The user to display the actions for
 * @param {() => void} onEdit - The function to call when the edit button is clicked
 * @param {() => void} onDelete - The function to call when the delete button is clicked
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  user: UserWithProperties;
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsCell = ({ user, onEdit, onDelete }: ActionsCellProps) => {
  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label={`Edit user ${user.name || user.email}`}
        onClick={onEdit}
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        aria-label={`Delete user ${user.name || user.email}`}
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};

export default ActionsCell;
