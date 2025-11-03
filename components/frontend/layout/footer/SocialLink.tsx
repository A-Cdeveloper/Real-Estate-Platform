import Link from "next/link";

type SocialLinkProps = {
  icon: string;
  href: string;
};

const SocialLink = ({ icon, href }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors cursor-pointer"
    >
      <span className="text-background">{icon}</span>
    </Link>
  );
};

export default SocialLink;
