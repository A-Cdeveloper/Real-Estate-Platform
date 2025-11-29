import { adminGuard } from "@/server/auth/adminGuard";

/**
const NotificationsPage = () => {
 * NotificationsPage component
 * Displays the user's notifications page
 * @returns The NotificationsPage component
 */
const NotificationsPage = async () => {
  // Check if the user is an admin
  await adminGuard();
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;
