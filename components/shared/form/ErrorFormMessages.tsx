type ErrorState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

type ErrorFormMessagesProps = {
  state: ErrorState | null;
  fieldName: string;
  fieldId: string;
};

const ErrorFormMessages = ({
  state,
  fieldName,
  fieldId,
}: ErrorFormMessagesProps) => {
  if (!state || state.success || !state.errors?.[fieldName]) {
    return null;
  }

  // Show only the first error for this field
  const errorMessage = state.errors[fieldName][0];

  return (
    <p
      id={`${fieldId}-error`}
      role="alert"
      aria-live="polite"
      className="text-sm text-red-600 dark:text-red-400 mt-2 mb-0"
    >
      {errorMessage}
    </p>
  );
};

export default ErrorFormMessages;
