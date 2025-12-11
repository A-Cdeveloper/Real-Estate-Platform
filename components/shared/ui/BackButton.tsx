import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href: string;
  label: string;
  className?: string;
};

const BackButton = ({ href, label, className }: BackButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      asChild
      className={cn(className, "group")}
    >
      <Link href={href} className="font-nunito-sans" aria-label={`Go back to ${label}`}>
        <ArrowLeft
          className="w-4 h-4 mr-0 group-hover:translate-x-[-3px] transition-all duration-300"
          aria-hidden="true"
        />
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
