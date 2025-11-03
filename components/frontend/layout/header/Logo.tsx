"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { useTheme } from "next-themes";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  // resolvedTheme je null na serveru i klijentu dok se ne učita - konzistentno
  // Koristimo default logo kada je null ili "light"
  const logoSrc =
    resolvedTheme === "dark"
      ? "/real-estate-logo_light.png"
      : "/real-estate-logo.png";

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt={APP_NAME}
        width={100}
        height={100}
        suppressHydrationWarning
      />
    </Link>
  );
};

export default Logo;
