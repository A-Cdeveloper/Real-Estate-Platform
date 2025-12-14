"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordInput from "@/components/auth/PasswordInput";
import CustomInput from "@/components/shared/form/CustomInput";
import IconButton from "@/components/shared/ui/IconButton";
import Modal from "@/components/shared/ui/Modal";
import WarningModal from "@/components/shared/ui/WarningModal";
import { useDirtyFormModal } from "@/hooks/useDirtyFormModal";
import { CurrentUser } from "@/types/user";
import { Loader2, X } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  startTransition,
  useState,
} from "react";
import { updateProfile } from "@/server/actions/profile";
import { toast } from "sonner";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";

/**
 * EditProfile component
 * Displays a form for editing the user's profile
 * @param currentUser - The current user data
 * @param onClose - Callback function to close the edit form
 */
const EditProfile = ({
  currentUser,
  onClose,
}: {
  currentUser: CurrentUser;
  onClose: () => void;
}) => {
  const [state, formAction, pending] = useActionState(updateProfile, null);

  // Track if form is dirty
  const [isDirty, setIsDirty] = useState(false);
  // Track if form has been successfully submitted
  const prevSuccessRef = useRef(false);

  // Use hook to handle dirty form modal
  const {
    handleClose,
    showWarning,
    handleConfirm,
    handleCancel,
    title,
    message,
  } = useDirtyFormModal({
    isDirty,
    onClose,
  });

  // Track form changes to determine if form is dirty
  const handleFormChange = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  // Reset dirty state and handle success
  useEffect(() => {
    const isSuccess = state?.success ?? false;

    // Only reset dirty state if success changed from false to true
    if (isSuccess && !prevSuccessRef.current && isDirty) {
      startTransition(() => {
        setIsDirty(false);
      });
    }

    prevSuccessRef.current = isSuccess;

    if (isSuccess) {
      toast.success("User updated successfully!");
      handleClose(); // Use wrapped handleClose
    }
  }, [state, isDirty, handleClose]);

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <Card className="min-w-full md:min-w-md border-primary/50 py-5">
      <CardHeader className="relative">
        <IconButton
          type="button"
          variant="ghost"
          icon={X}
          label="Close edit form"
          className="absolute right-2 -top-4 h-6 w-6 [&>span]:hidden"
          onClick={handleClose}
          disabled={pending}
        />
        <CardTitle className="text-lg">{currentUser.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Update your account information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          action={formAction}
          onChange={handleFormChange}
        >
          <div>
            <CustomInput
              id="profile-full-name"
              label="Full Name"
              placeholder="Enter your full name"
              defaultValue={currentUser.name ?? ""}
              labelClassName="text-sm font-medium text-muted-foreground"
              disabled={pending}
              name="name"
              required
              aria-required="true"
              aria-invalid={
                state && !state.success && state.errors?.name ? "true" : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.name
                  ? "name-error"
                  : undefined
              }
            />
            <ErrorFormMessages state={state} fieldName="name" fieldId="name" />
          </div>
          <div>
            <CustomInput
              id="profile-email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              defaultValue={currentUser.email}
              labelClassName="text-sm font-medium text-muted-foreground"
              name="email"
              disabled={pending}
              required
              aria-required="true"
              aria-invalid={
                state && !state.success && state.errors?.email
                  ? "true"
                  : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.email
                  ? "email-error"
                  : undefined
              }
            />
            <ErrorFormMessages
              state={state}
              fieldName="email"
              fieldId="email"
            />
          </div>
          <div>
            <PasswordInput
              id="profile-password"
              label="New Password (leave empty to keep current)"
              labelClassName="text-sm font-medium text-muted-foreground"
              name="password"
              placeholder="Enter new password"
              disabled={pending}
            />
            <ErrorFormMessages
              state={state}
              fieldName="password"
              fieldId="password"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span aria-live="polite">Updating...</span>
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      {/* Warning Modal */}
      <Modal
        isOpen={showWarning}
        onClose={handleCancel}
        showCloseButton={false}
        disableClose={false}
      >
        <WarningModal
          isOpen={showWarning}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          title={title}
          message={message}
        />
      </Modal>
    </Card>
  );
};

export default EditProfile;
