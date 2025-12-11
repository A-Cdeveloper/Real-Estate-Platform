"use client";

import { useEffect, useEffectEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// CloseButton component is used to close the modal
type CloseButtonProps = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="absolute top-4 right-4 z-10 h-8 w-8 text-white/60 hover:!bg-transparent
       hover:!text-white p-0 [&_svg]:!w-8 [&_svg]:!h-8"
      aria-label="Close modal"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <X className="w-8 h-8 flex-shrink-0" aria-hidden="true" />
    </Button>
  );
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  disableClose?: boolean;
};

// Modal component is used to display a modal

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  disableClose = false,
}: ModalProps) => {
  // useEffectEvent is used to prevent the event from being triggered in the parent component
  const onCloseEvent = useEffectEvent(() => {
    onClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableClose) onCloseEvent();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, disableClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Modal dialog"
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={disableClose ? undefined : onClose}
    >
      {showCloseButton && <CloseButton onClose={onClose} />}

      <div
        className={cn("relative", className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
