"use client";

import PasswordInput from "@/components/auth/PasswordInput";
import CustomInput from "@/components/shared/form/CustomInput";
import CustomSelect from "@/components/shared/form/CustomSelect";
import CustumSwitch from "@/components/shared/form/CustumSwitch";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import IconButton from "@/components/shared/ui/IconButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { USER_ROLE_OPTIONS } from "@/lib/constants";
import { createUser, updateUser } from "@/server/actions/users";
import { CurrentUser } from "@/types/user";
import { Role } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import {
  Activity,
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useDirtyFormModal } from "@/hooks/useDirtyFormModal";
import WarningModal from "@/components/shared/ui/WarningModal";

/**
 * UserForm component
 * Displays a form for creating or updating a user
 * @param onClose - Callback function to close the form
 * @param mode - The mode of the form ("create" or "edit")
 * @param initialData - The initial data for the form (only used for edit mode)
 */

type UserFormMode = "create" | "edit";
type UserFormProps = {
  onClose: () => void;
  mode: UserFormMode;
  initialData?: CurrentUser;
};

const UserForm = ({ onClose, mode, initialData }: UserFormProps) => {
  const [createState, createAction, createPending] = useActionState(
    createUser,
    null
  );
  const [updateState, updateAction, updatePending] = useActionState(
    updateUser,
    null
  );
  //
  const [isRoleAdmin, setIsRoleAdmin] = useState<boolean>(false);

  // Track if form is dirty
  const [isDirty, setIsDirty] = useState(false);
  // Track if form has been successfully submitted
  const prevSuccessRef = useRef(false);

  // Get the state and form action for the current mode
  const state = mode === "create" ? createState : updateState;
  const formAction = mode === "create" ? createAction : updateAction;
  // Get the pending state for the current mode
  const pending = mode === "create" ? createPending : updatePending;

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

    if (isSuccess && !prevSuccessRef.current && isDirty) {
      startTransition(() => {
        setIsDirty(false);
      });
    }

    prevSuccessRef.current = isSuccess;

    if (isSuccess) {
      toast.success(
        mode === "create"
          ? "User created successfully!"
          : "User updated successfully!"
      );
      handleClose(); // Use wrapped handleClose
    }
  }, [state, mode, isDirty, handleClose]);

  return (
    <Card className="min-w-[90%] md:min-w-md max-w-[90%] md:max-w-md border-primary/50 py-5">
      <CardHeader className="relative">
        <IconButton
          type="button"
          variant="ghost"
          icon={X}
          label="Close form"
          className="absolute right-2 -top-4 h-6 w-6 [&>span]:hidden"
          onClick={handleClose}
        />
        <CardTitle className="text-lg">
          {mode === "create" ? "Add New User" : "Edit Existing User"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {mode === "create"
            ? "Create a new user account here."
            : "Edit an existing user account here."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          className="space-y-5"
          onChange={handleFormChange}
        >
          {mode === "edit" && initialData && (
            <div>
              <input type="hidden" name="id" value={initialData?.id} />
            </div>
          )}
          <div>
            <CustomInput
              id="new-user-name"
              label="Name"
              placeholder="Enter name"
              labelClassName="text-sm font-medium text-muted-foreground"
              name="name"
              defaultValue={
                state && !state.success
                  ? state.data?.name
                  : initialData?.name || ""
              }
              disabled={pending}
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
              id="new-user-email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              labelClassName="text-sm font-medium text-muted-foreground"
              name="email"
              defaultValue={
                state && !state.success
                  ? state.data?.email
                  : initialData?.email || ""
              }
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
            <CustomSelect
              id="new-user-role"
              label="Role"
              options={USER_ROLE_OPTIONS}
              placeholder="Select a role"
              labelClassName="text-sm font-medium text-muted-foreground"
              name="role"
              onValueChange={(value) => {
                setIsRoleAdmin(value === Role.ADMIN);
              }}
              defaultValue={
                state && !state.success
                  ? state.data?.role
                  : initialData?.role || USER_ROLE_OPTIONS[1].value
              }
              disabled={pending}
              required
              aria-required="true"
              aria-invalid={
                state && !state.success && state.errors?.role ? "true" : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.role
                  ? "role-error"
                  : undefined
              }
            />
          </div>
          <div>
            <PasswordInput
              id="new-user-password"
              label={
                mode === "edit"
                  ? "New Password (leave empty to keep current)"
                  : "Password"
              }
              labelClassName="text-sm font-medium text-muted-foreground"
              name="password"
              placeholder="Enter password"
              defaultValue={state && !state.success ? state.data?.password : ""}
              disabled={pending}
              required={mode === "create"}
              aria-required={mode === "create" ? "true" : "false"}
              aria-invalid={
                state && !state.success && state.errors?.password
                  ? "true"
                  : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.password
                  ? "password-error"
                  : undefined
              }
            />
            <ErrorFormMessages
              state={state}
              fieldName="password"
              fieldId="password"
            />
          </div>
          <Activity mode={isRoleAdmin ? "hidden" : "visible"}>
            <CustumSwitch
              id="new-user-active"
              name="isActive"
              defaultChecked={
                mode === "edit" ? (initialData?.isActive ?? false) : true
              }
              labels={[
                { label: "Inactive", checked: false },
                { label: "Active", checked: true },
              ]}
            />
          </Activity>

          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span aria-live="polite">
                    {mode === "create"
                      ? "Creating user..."
                      : "Updating user..."}
                  </span>
                </>
              ) : mode === "create" ? (
                "Create User"
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      {/* Warning Modal */}
      <WarningModal
        isOpen={showWarning}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={title}
        message={message}
      />
    </Card>
  );
};

export default UserForm;
