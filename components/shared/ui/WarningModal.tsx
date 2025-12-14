"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconButton from "@/components/shared/ui/IconButton";
import { X, AlertTriangle } from "lucide-react";

type WarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

const WarningModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "You have unsaved changes. Are you sure you want to close?",
}: WarningModalProps) => {
  if (!isOpen) return null;

  return (
    <Card className="min-w-full md:min-w-[400px] border-amber-500/50 py-5">
      <CardHeader className="relative">
        <IconButton
          type="button"
          variant="ghost"
          icon={X}
          label="Close warning"
          className="absolute right-2 -top-4 h-6 w-6 [&>span]:hidden"
          onClick={onClose}
        />
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              aria-label="Confirm action"
            >
              Discard Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningModal;

