"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook to warn user when form is dirty and they try to close modal
 * Returns a wrapped onClose function and warning modal state
 * @param isDirty - Whether the form has unsaved changes
 * @param onClose - Function to close the modal
 * @param title - Optional custom warning title
 * @param message - Optional custom warning message
 * @returns Object with handleClose function and warning modal state
 */
export function useDirtyFormModal({
  isDirty,
  onClose,
  title = "Are you sure?",
  message = "You have unsaved changes. Are you sure you want to close?",
}: {
  isDirty: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}) {
  const [showWarning, setShowWarning] = useState(false);
  const isDirtyRef = useRef(isDirty);
  const onCloseRef = useRef(onClose);

  // Keep refs updated
  useEffect(() => {
    isDirtyRef.current = isDirty;
    onCloseRef.current = onClose;
  }, [isDirty, onClose]);

  // Return a wrapped onClose function that checks for dirty state
  const handleClose = useCallback(() => {
    if (isDirtyRef.current) {
      setShowWarning(true);
    } else {
      onCloseRef.current();
    }
  }, []);

  const handleConfirm = useCallback(() => {
    setShowWarning(false);
    onCloseRef.current();
  }, []);

  const handleCancel = useCallback(() => {
    setShowWarning(false);
  }, []);

  return {
    handleClose,
    showWarning,
    handleConfirm,
    handleCancel,
    title,
    message,
  };
}
