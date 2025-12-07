"use client";
import Modal from "@/components/shared/ui/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { News } from "@prisma/client";
import { LucideIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import NewsForm from "../add-edit/NewsForm";
import DeleteConfirm from "../delete/DeleteConfirm";

/**
 * ActionButtonProps type is used to define the props for the ActionButton component
 * @param news - The news to display the actions for
 * @param mode - The mode of the action (edit or delete)
 * @param icon - The icon to display for the action
 * @param className - The class name to apply to the button
 * @param children - The children to display in the modal
 * @returns {ActionButtonProps} The ActionButtonProps type
 */
type ActionButtonProps = {
  news: News;
  mode: "edit" | "delete";
  icon: LucideIcon;
  className?: string;
  children: (onClose: () => void) => React.ReactNode;
};

const ActionButton = ({
  news,
  mode,
  icon,
  className,
  children,
}: ActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
        aria-label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} news ${news.title || news.description}`}
        onClick={handleOpenModal}
      >
        <Icon className="size-4" />
      </Button>
    </>
  );
};

/**
 * Actions cell for the users table
 * @param news - The news to display the actions for
 * @returns {JSX.Element} The actions cell component
 */

type ActionsCellProps = {
  news: News;
};

const ActionsCell = ({ news }: ActionsCellProps) => {
  return (
    <div className="flex justify-center">
      {/* Edit Action Button */}
      <ActionButton news={news} mode="edit" icon={Pencil}>
        {(onClose) => (
          <NewsForm onClose={onClose} mode="edit" initialData={news} />
        )}
      </ActionButton>
      {/* Delete Action Button */}
      <ActionButton
        news={news}
        mode="delete"
        icon={Trash2}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        {(onClose) => (
          <DeleteConfirm
            onConfirm={() => onClose()}
            newsId={news.id}
            onClose={onClose}
          />
        )}
      </ActionButton>
    </div>
  );
};

export default ActionsCell;
