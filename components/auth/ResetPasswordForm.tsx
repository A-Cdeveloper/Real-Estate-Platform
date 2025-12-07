"use client";

import { useState, useActionState, useEffect, useEffectEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import PasswordInput from "@/components/auth/PasswordInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Button } from "@/components/ui/button";
import { resetPasswordAction } from "@/server/actions/auth";
import FormWrapper from "./FormWrapper";

const ResetPasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    null
  );
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Local state for password matching validation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if passwords do not match
  const passwordsDoNotMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const redirectToLogin = useEffectEvent(() => {
    navigate.replace("/login");
  });

  // Show toast notification for success and redirect
  useEffect(() => {
    if (state?.success) {
      toast.success("Password reset successfully!");
      redirectToLogin();
    }
  }, [state]);

  return (
    <FormWrapper title="Reset Password">
      <form className="grid gap-4" action={formAction}>
        {/* Hidden token input */}
        <input type="hidden" name="token" value={token || ""} />

        <div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            aria-required="true"
          />
          <ErrorFormMessages
            state={state}
            fieldName="password"
            fieldId="password"
          />
        </div>

        <div>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={pending}
            aria-required="true"
          />
          {passwordsDoNotMatch && (
            <p
              id="confirmPassword-match-error"
              role="alert"
              aria-live="polite"
              className="text-sm text-red-600 dark:text-red-400 mt-2 mb-0"
            >
              Passwords do not match
            </p>
          )}
          <ErrorFormMessages
            state={state}
            fieldName="confirmPassword"
            fieldId="confirmPassword"
          />
          <ErrorFormMessages
            state={state}
            fieldName="_general"
            fieldId="_general"
          />
        </div>

        <Button
          type="submit"
          className="mt-2 w-full sm:w-auto"
          disabled={pending || passwordsDoNotMatch}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span aria-live="polite">Resetting...</span>
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ResetPasswordForm;
