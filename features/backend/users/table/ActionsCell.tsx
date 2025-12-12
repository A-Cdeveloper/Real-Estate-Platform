"use client";
import Modal from "@/components/shared/ui/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserWithProperties } from "@/types/user";
import { LucideIcon, Pencil, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import UserForm from "../add-edit/UserForm";
import DeleteConfirm from "../delete/DeleteConfirm";

/**
 * ActionButtonProps type is used to define the props for the ActionButton component
 * @param user - The user to display the actions for
 * @param mode - The mode of the action (edit or delete)
 * @param icon - The icon to display for the action
 * @param className - The class name to apply to the button
 * @param children - The children to display in the modal
 * @returns {ActionButtonProps} The ActionButtonProps type
 */
type ActionButtonProps = {
  user: UserWithProperties;
  mode: "edit" | "delete";
  icon: LucideIcon;
  className?: string;
  children: (onClose: () => void) => React.ReactNode;
};

const ActionButton = ({
  user,
  mode,
  icon,
  className,
  children,
}: ActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const Icon = icon;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        showCloseButton={false}
        disableClose={false}
      >
        {children(handleCloseModal)}
      </Modal>
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        aria-label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} user ${user.name || user.email}`}
        onClick={handleOpenModal}
      >
        <Icon className="size-4" aria-hidden="true" />
      </Button>
    </>
  );
};

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
      <ActionButton user={user} mode="edit" icon={Pencil}>
        {(onClose) => (
          <UserForm mode="edit" initialData={user} onClose={onClose} />
        )}
      </ActionButton>
      {/* Delete Action Button */}
      <ActionButton
        user={user}
        mode="delete"
        icon={Trash2}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            userId={user.id}
            onClose={onClose}
          />
        )}
      </ActionButton>
    </div>
  );
};

export default ActionsCell;
