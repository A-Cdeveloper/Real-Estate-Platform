"use client";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { useState } from "react";
import NewsForm from "./NewsForm";

const AddNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <BookPlus className="size-4 mr-2" />
        Add News
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        disableClose={false}
      >
        <NewsForm onClose={() => setIsOpen(false)} mode="create" />
      </Modal>
    </>
  );
};

export default AddNews;
