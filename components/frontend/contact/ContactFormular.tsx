"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import CustomInput from "@/components/frontend/CustomInput";
import { sendMessageAction, type ActionState } from "../actions/sendMessage";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

const SuccessMessage = () => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
    >
      Message sent successfully!
    </div>
  );
};

const ErrorMessage = ({
  state,
  fieldName,
  fieldId,
}: {
  state: ActionState | null;
  fieldName: string;
  fieldId: string;
}) => {
  if (!state || state.success || !state.errors?.[fieldName]) {
    return null;
  }

  return (
    <p
      id={`${fieldId}-error`}
      role="alert"
      aria-live="polite"
      className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
    >
      <span className="text-red-500" aria-hidden="true">
        •
      </span>
      {state.errors[fieldName][0]}
    </p>
  );
};

const ContactFormular = () => {
  const [state, formAction, pending] = useActionState(sendMessageAction, null);

  return (
    <div className="rounded-2xl border bg-secondary/30 p-8 shadow-sm">
      <Typography variant="h2" className="mb-6 text-2xl">
        Send us a message
      </Typography>
      {state?.success && <SuccessMessage />}
      {state && !state.success && state.errors?._general && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
        >
          {state.errors._general[0]}
        </div>
      )}
      <form className="grid gap-4" action={formAction} noValidate>
        <div>
          <CustomInput
            id="name"
            placeholder="Full name"
            name="name"
            defaultValue={state && !state.success ? state.data?.name : ""}
            disabled={pending}
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
          <ErrorMessage state={state} fieldName="name" fieldId="name" />
        </div>
        <div>
          <CustomInput
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={state && !state.success ? state.data?.email : ""}
            disabled={pending}
            required
            aria-required="true"
            aria-invalid={
              state && !state.success && state.errors?.email ? "true" : "false"
            }
            aria-describedby={
              state && !state.success && state.errors?.email
                ? "email-error"
                : undefined
            }
          />
          <ErrorMessage state={state} fieldName="email" fieldId="email" />
        </div>
        <div>
          <CustomInput
            id="phone"
            type="tel"
            placeholder="Phone (optional)"
            name="phone"
            defaultValue={state && !state.success ? state.data?.phone : ""}
            disabled={pending}
            aria-invalid={
              state && !state.success && state.errors?.phone ? "true" : "false"
            }
            aria-describedby={
              state && !state.success && state.errors?.phone
                ? "phone-error"
                : undefined
            }
          />
          <ErrorMessage state={state} fieldName="phone" fieldId="phone" />
        </div>
        <div className="grid gap-2">
          <Textarea
            id="message"
            placeholder="Tell us a bit about your needs or the property you are interested in."
            rows={5}
            name="message"
            defaultValue={state && !state.success ? state.data?.message : ""}
            disabled={pending}
            required
            aria-required="true"
            aria-invalid={
              state && !state.success && state.errors?.message
                ? "true"
                : "false"
            }
            aria-describedby={
              state && !state.success && state.errors?.message
                ? "message-error"
                : undefined
            }
          />
          <ErrorMessage state={state} fieldName="message" fieldId="message" />
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
            "Submit message"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactFormular;
