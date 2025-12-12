"use client";
import Modal from "@/components/shared/ui/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useState, useCallback } from "react";

/**
 * TableActionButtonProps type is used to define the props for the TableActionButton component
 * @param icon - The icon to display for the action
 * @param className - The class name to apply to the button
 * @param buttonSize - The size of the button (default: "h-8 w-8")
 * @param ariaLabel - The aria-label for the button
 * @param children - The children to display in the modal
 * @returns {TableActionButtonProps} The TableActionButtonProps type
 */
type TableActionButtonProps = {
  icon: LucideIcon;
  className?: string;
  buttonSize?: string;
  ariaLabel: string;
  children: (onClose: () => void) => React.ReactNode;
};

const TableActionButton = ({
  icon,
  className,
  buttonSize = "h-7 w-7",
  ariaLabel,
  children,
}: TableActionButtonProps) => {
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
        className={cn(buttonSize, className)}
        aria-label={ariaLabel}
        onClick={handleOpenModal}
      >
        <Icon className="size-4" aria-hidden="true" />
      </Button>
    </>
  );
};

export default TableActionButton;

