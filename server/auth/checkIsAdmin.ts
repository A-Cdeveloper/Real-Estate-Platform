/**
 * Check if the user is an admin
 * @returns {boolean} true if the user is an admin, false otherwise
 */

import { getCurrentUserFromSession } from "./getCurrentUserFromSession";

export async function checkIsAdmin(): Promise<boolean> {
  const user = await getCurrentUserFromSession();
  return user?.role === "ADMIN";
}
