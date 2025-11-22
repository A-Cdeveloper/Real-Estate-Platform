"use client";

import IconButton from "@/components/shared/IconButton";
import { Edit, Trash2 } from "lucide-react";

/**
 * ProfileActionsButtons component
 * Client component for profile action buttons (Edit and Delete)
 * @param onEditClick - Callback function when Edit button is clicked
 * @param onDeleteClick - Callback function when Delete button is clicked
 */
const ProfileActionsButtons = ({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onDeleteClick?: () => void;
}) => {
  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete profile");
    onDeleteClick?.();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-end w-full xl:w-2/3">
      <IconButton
        variant="outline"
        className="w-full sm:w-auto"
        icon={Edit}
        label="Edit Profile"
        onClick={onEditClick}
      />
      <IconButton
        variant="destructive"
        className="w-full sm:w-auto"
        icon={Trash2}
        label="Delete Profile"
        onClick={handleDelete}
      />
    </div>
  );
};

export default ProfileActionsButtons;
