"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Logout component
 * Client component that handles user logout functionality
 * Calls the logout server action and redirects to login page
 * @returns {React.ReactNode} The Logout component
 */
const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout}>
      <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Logout</span>
    </Button>
  );
};

export default Logout;
