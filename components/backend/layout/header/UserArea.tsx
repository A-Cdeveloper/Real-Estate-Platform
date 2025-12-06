import { CurrentUser } from "@/types/user";
import Logout from "./Logout";
import UserAvatar from "./UserAvatar";

/**
 * UserArea component
 *
 * Server component that displays user avatar and logout button.
 * Receives user data and admin status from parent BackHeader component.
 *
 * @param currentUser - The current logged-in user object
 * @param isAdmin - Whether the current user has admin role
 * @returns User area with avatar and logout button
 */
const UserArea = ({
  currentUser,
  isAdmin,
}: {
  currentUser: CurrentUser;
  isAdmin: boolean;
}) => {
  return (
    <div className="flex items-center gap-3 px-3 py-1">
      <UserAvatar user={currentUser} isAdmin={isAdmin} />
      <Logout userId={currentUser.id} />
    </div>
  );
};

export default UserArea;
