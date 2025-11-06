import Link from "next/link";

type SocialLinkProps = {
  icon: string;
  href: string;
};

const SocialLink = ({ icon, href }: SocialLinkProps) => {
  // Extract platform name from URL for aria-label
  const getPlatformName = (url: string) => {
    if (url.includes("facebook")) return "Facebook";
    if (url.includes("twitter") || url.includes("x.com")) return "Twitter";
    if (url.includes("instagram")) return "Instagram";
    if (url.includes("linkedin")) return "LinkedIn";
    if (url.includes("youtube")) return "YouTube";
    return "Social media";
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit our ${getPlatformName(href)} page`}
      className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors cursor-pointer"
    >
      <span className="text-background" aria-hidden="true">
        {icon}
      </span>
    </Link>
  );
};

export default SocialLink;
