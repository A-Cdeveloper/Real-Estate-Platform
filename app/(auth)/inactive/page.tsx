/**
 * Inactive Account Page
 * Displays a message when user account is inactive
 */
const InactivePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-2xl font-semibold">
        Your account is inactive. Please contact administrator.
      </p>
    </div>
  );
};

export default InactivePage;

