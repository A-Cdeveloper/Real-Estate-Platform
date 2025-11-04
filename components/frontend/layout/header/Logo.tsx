import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Light theme logo */}
      <Image
        src="/real-estate-logo.png"
        alt={APP_NAME}
        width={100}
        height={100}
        className="dark:hidden"
      />
      {/* Dark theme logo */}
      <Image
        src="/real-estate-logo_light.png"
        alt={APP_NAME}
        width={100}
        height={100}
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
