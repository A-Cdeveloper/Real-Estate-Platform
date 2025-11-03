"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors font-bold",
        className,
        isActive && "text-primary font-bold"
      )}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
