import ForceLogoutButton from "@/components/backend/layout/ForceLogoutButton";

/**
 * Deleted Account Page
 * Displays a message when user account has been deleted
 */
const DeletedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-2xl font-semibold">
        Your account has been deleted. Please contact administrator.
      </p>
      <ForceLogoutButton />
    </div>
  );
};

export default DeletedPage;

