import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import ProfileContent from "./ProfileContent";
import ProfileCards from "./ProfileCards";

/**
 * ProfileView component
 * Server component that fetches user data and renders ProfileContent with ProfileCards
 * @returns The ProfileView component
 */
const ProfileView = async () => {
  const currentUser = await getCurrentUserFromSession();

  // Layout handles redirects for null/inactive users, so currentUser is guaranteed here
  if (!currentUser) {
    return null;
  }

  return (
    <ProfileContent
      currentUser={currentUser}
      cards={<ProfileCards currentUser={currentUser} />}
    />
  );
};

export default ProfileView;
