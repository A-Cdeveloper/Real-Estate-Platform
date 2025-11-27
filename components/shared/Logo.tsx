"use client";

import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  appName: string;
  logoLight: string;
  logoDark: string;
};

const Logo = ({
  width = 100,
  height = 100,
  appName,
  logoLight,
  logoDark,
}: LogoProps) => {
  // Fallback to default logos if empty string or null/undefined
  const lightLogo = logoLight || "/real-estate-logo.png";
  const darkLogo = logoDark || "/real-estate-logo_light.png";

  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label={`${appName} homepage`}
    >
      {/* Light theme logo */}
      <Image
        src={lightLogo}
        alt=""
        width={width}
        height={height}
        className="dark:hidden min-w-[100px]"
        aria-hidden="true"
      />
      {/* Dark theme logo */}
      <Image
        src={darkLogo}
        alt=""
        width={width}
        height={height}
        className="hidden dark:block min-w-[100px]"
        aria-hidden="true"
      />
      <span className="sr-only">{appName}</span>
    </Link>
  );
};

export default Logo;
