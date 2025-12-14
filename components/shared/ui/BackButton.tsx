import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href?: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

const BackButton = ({ href, label, className, onClick }: BackButtonProps) => {
  const content = (
    <>
      <ArrowLeft
        className="w-4 h-4 mr-0 group-hover:translate-x-[-3px] transition-all duration-300"
        aria-hidden="true"
      />
      {label}
    </>
  );

  // If onClick is provided, render as button (for handling unsaved changes)
  if (onClick) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className={cn(className, "group font-nunito-sans")}
        aria-label={`Go back to ${label}`}
      >
        {content}
      </Button>
    );
  }

  // Otherwise, render as Link
  if (!href) {
    return null; // Don't render if no href and no onClick
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      asChild
      className={cn(className, "group")}
    >
      <Link
        href={href}
        className="font-nunito-sans"
        aria-label={`Go back to ${label}`}
      >
        {content}
      </Link>
    </Button>
  );
};

export default BackButton;
