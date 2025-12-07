"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import CustomInput from "@/components/shared/form/CustomInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { sendMessageAction } from "@/server/actions/sendMessage";
import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ContactFormular = () => {
  const [state, formAction, pending] = useActionState(sendMessageAction, null);

  // Show toast notification for success
  useEffect(() => {
    if (state?.success) {
      toast.success("Message sent successfully!");
    }
  }, [state]);

  return (
    <div className="rounded-2xl border bg-secondary/30 p-8 shadow-sm">
      <Typography variant="h2" className="mb-6 text-2xl">
        Send us a message
      </Typography>
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
          <ErrorFormMessages state={state} fieldName="name" fieldId="name" />
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
          <ErrorFormMessages state={state} fieldName="email" fieldId="email" />
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
          <ErrorFormMessages state={state} fieldName="phone" fieldId="phone" />
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
          <ErrorFormMessages
            state={state}
            fieldName="message"
            fieldId="message"
          />
        </div>
        <ErrorFormMessages
          state={state}
          fieldName="_general"
          fieldId="_general"
        />
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
