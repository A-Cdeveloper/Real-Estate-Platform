"use client";

import { Button } from "@/components/ui/button";
import { forceLogout } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForceLogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await forceLogout();
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Go to Login"}
    </Button>
  );
};

export default ForceLogoutButton;
