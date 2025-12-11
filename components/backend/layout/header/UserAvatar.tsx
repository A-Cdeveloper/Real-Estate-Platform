import { CurrentUser } from "@/types/user";
import Link from "next/link";

/**
 * UserAvatarIcon component
 *
 * Displays the user's avatar icon with first two characters of username.
 * Admin users get a square primary-colored icon, regular users get a rounded accent-colored icon.
 *
 * @param username - The user's display name (used for initials)
 * @param isAdmin - Whether the user has admin role (affects styling)
 * @returns Avatar icon or null if username is empty
 */
const UserAvatarIcon = ({
  username,
  isAdmin,
}: {
  username: string;
  isAdmin: boolean;
}): React.ReactNode | null => {
  if (!username) {
    return null;
  }
  return (
    <div
      className={`size-8 ${isAdmin ? "rounded-none bg-primary" : "rounded-full bg-accent"} flex items-center justify-center text-sm font-semibold leading-4`}
      aria-hidden="true"
    >
      {username.slice(0, 2)}
    </div>
  );
};

/**
 * UserAvatar component
 *
 * Server component that displays user avatar icon with name and email.
 * Links to user profile page on click.
 *
 * @param user - The current user object containing name, email, etc.
 * @param isAdmin - Whether the user has admin role (passed to avatar icon for styling)
 * @returns Clickable user avatar with name and email or null
 */
const UserAvatar = async ({
  user,
  isAdmin,
}: {
  user: CurrentUser;
  isAdmin: boolean;
}): Promise<React.ReactNode | null> => {
  const displayName = user.name || user.email || "Unknown user";

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2"
      aria-label={`Go to profile for ${displayName}`}
    >
      <UserAvatarIcon username={displayName} isAdmin={isAdmin} />
      <span className="flex flex-col">
        <span className="text-sm font-semibold leading-4">{displayName}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </span>
    </Link>
  );
};

export default UserAvatar;
