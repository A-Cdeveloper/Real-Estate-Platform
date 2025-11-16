import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const Logo = ({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label={`${APP_NAME} homepage`}
    >
      {/* Light theme logo */}
      <Image
        src="/real-estate-logo.png"
        alt=""
        width={width}
        height={height}
        className="dark:hidden"
        aria-hidden="true"
      />
      {/* Dark theme logo */}
      <Image
        src="/real-estate-logo_light.png"
        alt=""
        width={width}
        height={height}
        className="hidden dark:block"
        aria-hidden="true"
      />
      <span className="sr-only">{APP_NAME}</span>
    </Link>
  );
};

export default Logo;
