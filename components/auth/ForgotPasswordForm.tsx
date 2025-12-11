"use client";
import { useActionState, useEffect } from "react";
import CustomInput from "@/components/shared/form/CustomInput";
import { forgotPasswordAction } from "@/server/actions/auth";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormWrapper from "./FormWrapper";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    null
  );

  // Show toast notification for success
  useEffect(() => {
    if (state?.success) {
      toast.success("Password reset link sent successfully!");
    }
  }, [state]);
  return (
    <FormWrapper title="Forgot Password">
      <form className="grid gap-4" action={formAction}>
        <div>
          <CustomInput
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            defaultValue={state && !state.success ? state.data?.email : ""}
            disabled={pending}
            aria-required="true"
          />
          <ErrorFormMessages state={state} fieldName="email" fieldId="email" />
        </div>
        <Button
          type="submit"
          className="mt-2 w-full sm:w-auto"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span aria-live="polite">Sending...</span>
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </FormWrapper>
  );
};
export default ForgotPasswordForm;
