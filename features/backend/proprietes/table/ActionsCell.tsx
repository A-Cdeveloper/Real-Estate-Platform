"use client";
import Modal from "@/components/shared/ui/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropertyWithOwner } from "@/types/properties";
import { LucideIcon, Pencil, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import DeleteConfirm from "../delete/DeleteConfirm";

/**
 * ActionButtonProps type is used to define the props for the ActionButton component
 * @param property - The property to display the actions for
 * @param mode - The mode of the action (edit or delete)
 * @param icon - The icon to display for the action
 * @param className - The class name to apply to the button
 * @param children - The children to display in the modal
 * @returns {ActionButtonProps} The ActionButtonProps type
 */
type ActionButtonProps = {
  property: PropertyWithOwner;
  mode: "edit" | "delete";
  icon: LucideIcon;
  className?: string;
  children: (onClose: () => void) => React.ReactNode;
};

const ActionButton = ({
  property,
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
        className={cn("h-8 w-8", className)}
        aria-label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} property ${property.name || property.description}`}
        onClick={handleOpenModal}
      >
        <Icon className="size-4" />
      </Button>
    </>
  );
};

/**
 * Actions cell for the properties table
 * Displays edit and delete action buttons for a property
 * @param property - The property to display the actions for
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  property: PropertyWithOwner;
};

const ActionsCell = ({ property }: ActionsCellProps) => {
  return (
    <div className="flex justify-center">
      {/* Edit Action Button */}
      <ActionButton property={property} mode="edit" icon={Pencil}>
        {(onClose) => (
          //   <PropertyForm onClose={onClose} mode="edit" initialData={property} />
          <div>Edit</div>
        )}
      </ActionButton>
      {/* Delete Action Button */}
      <ActionButton
        property={property}
        mode="delete"
        icon={Trash2}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            propertyId={property.id}
            onClose={onClose}
          />
        )}
      </ActionButton>
    </div>
  );
};

export default ActionsCell;
