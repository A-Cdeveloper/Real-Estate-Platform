"use client";
import Modal from "@/components/shared/ui/Modal";
import IconButton from "@/components/shared/ui/IconButton";
import { BookPlus } from "lucide-react";
import { useState } from "react";
import NewsForm from "./NewsForm";

const AddNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        icon={BookPlus}
        label="Add News"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        disableClose={false}
        disableBackdropClose={true}
      >
        <NewsForm onClose={() => setIsOpen(false)} mode="create" />
      </Modal>
    </>
  );
};

export default AddNews;
