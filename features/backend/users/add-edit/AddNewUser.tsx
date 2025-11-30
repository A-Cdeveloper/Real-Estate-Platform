"use client";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import UserForm from "./UserForm";

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="size-4 mr-2" />
        Add New User
      </Button>
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
