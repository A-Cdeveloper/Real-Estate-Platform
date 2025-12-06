"use client";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { useState } from "react";

const AddProperty = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Building className="size-4 mr-2" />
        Add Property
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        disableClose={false}
      >
        {/* <PropertyForm onClose={() => setIsOpen(false)} mode="create" /> */}
        <div>PropertyForm</div>
      </Modal>
    </>
  );
};

export default AddProperty;
