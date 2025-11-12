import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;
  label: string;
  className?: string;
};

const BackButton = ({ href, label, className }: BackButtonProps) => {
  return (
    <Button variant="secondary" size="sm" asChild className={className}>
      <Link href={href} className="font-nunito-sans">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
