/**
 * Admin Guard
 * This function checks if the user is an admin
 * If the user is not an admin, it redirects to the dashboard page
 * @returns void
 */
import { checkIsAdmin } from "./checkIsAdmin";
import { redirect } from "next/navigation";

export async function adminGuard() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    redirect("/dashboard");
  }
}
