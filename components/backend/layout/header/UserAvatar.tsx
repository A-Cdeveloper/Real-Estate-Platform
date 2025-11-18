import { getCurrentUser } from "@/server/auth/getCurrentUser";
import Link from "next/link";

/**
 * UserAvatarIcon component
 * Displays the user's avatar icon
 * @param {string} username - The user's name
 * @returns {React.ReactNode} The UserAvatarIcon component
 */
const UserAvatarIcon = ({ username }: { username: string }) => {
  if (!username) {
    return null;
  }
  return (
    <div
      className="size-8 rounded-full bg-primary/60 flex items-center justify-center text-sm font-semibold leading-4"
      aria-hidden="true"
    >
      {username.slice(0, 2)}
    </div>
  );
};

/**
 * UserAvatar component
 * Displays the user's avatar and name
 * @returns {Promise<JSX.Element | null>} The UserAvatar component
 */
const UserAvatar = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const displayName = currentUser.name || currentUser.email || "Unknown user";
  return (
    <Link href="/profile" className="flex items-center gap-2">
      <UserAvatarIcon username={displayName} />
      <span className="flex flex-col">
        <span className="text-sm font-semibold leading-4">{displayName}</span>
        <span className="text-xs text-muted-foreground">
          {currentUser.email}
        </span>
      </span>
    </Link>
  );
};

export default UserAvatar;
