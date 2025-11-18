import Logout from "./Logout";
import UserAvatar from "./UserAvatar";

/**
 * UserArea component
 * Container component that displays user avatar and logout button
 * @returns {React.ReactNode} The UserArea component
 */
const UserArea = () => {
  return (
    <div className="flex items-center gap-3 px-3 py-1">
      <UserAvatar />
      <Logout />
    </div>
  );
};

export default UserArea;
