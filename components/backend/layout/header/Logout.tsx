"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Logout component
 * Client component that handles user logout functionality
 * Calls the logout server action and redirects to login page
 * @returns The Logout component
 */
const Logout = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(userId);
    router.replace("/login");
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <LogOutIcon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
      <span className="sr-only">Logout</span>
    </Button>
  );
};

export default Logout;
