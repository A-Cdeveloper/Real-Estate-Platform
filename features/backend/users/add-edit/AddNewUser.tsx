"use client";
import Modal from "@/components/shared/ui/Modal";
import IconButton from "@/components/shared/ui/IconButton";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import UserForm from "./UserForm";

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        icon={UserPlus}
        label="Add New User"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        disableClose={false}
      >
        <UserForm onClose={() => setIsOpen(false)} mode="create" />
      </Modal>
    </>
  );
};

export default AddNewUser;
