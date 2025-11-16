"use client";

import PasswordInput from "@/components/auth/PasswordInput";
import CustomInput from "@/components/shared/CustomInput";
import ErrorFormMessages from "@/components/shared/ErrorFormMessages";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/server/actions/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useEffectEvent } from "react";
import { toast } from "sonner";
import FormWrapper from "./FormWrapper";

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const navigate = useRouter();

  const redirectLogin = useEffectEvent(() => {
    navigate.replace("/dashboard");
  });

  // Show toast notification for success
  useEffect(() => {
    if (state?.success) {
      toast.success("Logged in successfully!");
      redirectLogin();
    }
  }, [state]);

  return (
    <FormWrapper title="Login">
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
        <div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your password"
            defaultValue={state && !state.success ? state.data?.password : ""}
            disabled={pending}
            aria-required="true"
          />
          <ErrorFormMessages
            state={state}
            fieldName="password"
            fieldId="password"
          />
          <ErrorFormMessages
            state={state}
            fieldName="_general"
            fieldId="_general"
          />
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline font-nunito-sans"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-2 w-full sm:w-auto"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span aria-live="polite">Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
