"use client";

import { useState } from "react";
import { CurrentUser } from "@/types/user";
import EditProfile from "./edit/EditProfile";
import ProfileActionsButtons from "./ProfileActionsButtons";
import DeleteConfirm from "./delete/DeleteConfirm";
import Modal from "@/components/shared/ui/Modal";

/**
 * ProfileContent component
 * Client component that manages the edit and delete modal state
 * @param currentUser - The current user data
 * @param cards - The profile cards (server component) passed as children
 */
const ProfileContent = ({
  currentUser,
  cards,
}: {
  currentUser: CurrentUser;
  cards: React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsDeleting(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setIsEditing(false);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4">
      {cards}
      <ProfileActionsButtons
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <Modal
        isOpen={isEditing}
        onClose={handleCloseEdit}
        showCloseButton={false}
        disableClose={true}
      >
        <EditProfile
          key={isEditing ? "edit-open" : "edit-closed"}
          currentUser={currentUser}
          onClose={handleCloseEdit}
        />
      </Modal>

      <Modal
        isOpen={isDeleting}
        onClose={handleCloseDelete}
        showCloseButton={false}
        disableClose={true}
      >
        <DeleteConfirm
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        />
      </Modal>
    </div>
  );
};

export default ProfileContent;
