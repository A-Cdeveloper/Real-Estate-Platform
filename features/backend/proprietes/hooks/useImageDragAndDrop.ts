"use client";

import { useCallback, useState } from "react";

type UseImageDragAndDropProps = {
  onReorder: (draggedId: string, targetId: string) => void;
};

/**
 * Custom hook for image drag & drop reordering
 * Manages drag state and provides memoized event handlers
 */
export const useImageDragAndDrop = ({
  onReorder,
}: UseImageDragAndDropProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      if (draggedId && draggedId !== id) {
        setDragOverId(id);
      }
    },
    [draggedId]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const draggedImageId = e.dataTransfer.getData("text/plain");

      if (draggedImageId && draggedImageId !== targetId) {
        onReorder(draggedImageId, targetId);
      }

      setDraggedId(null);
      setDragOverId(null);
    },
    [onReorder]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  return {
    draggedId,
    dragOverId,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
};
