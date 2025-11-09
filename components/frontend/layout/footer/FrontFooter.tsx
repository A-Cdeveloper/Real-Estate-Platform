import Link from "next/link";
import { APP_NAME, COPYRIGHT } from "@/lib/constants";
import SocialLinks from "./SocialLinks";
import MetaMenu from "./MetaMenu";

const FrontFooter = () => {
  return (
    <footer
      className="bg-foreground text-background mt-auto"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Left Column */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
              aria-label={`${APP_NAME} homepage`}
            >
              <span className="text-2xl font-nunito font-bold text-background">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-background/80 font-nunito-sans mb-4 max-w-md">
              Stay connected, explore opportunities, and invest with confidence.
              Your real estate success starts here
            </p>
            <SocialLinks />
          </div>

          {/* Middle Columns */}
          <MetaMenu
            title="Quick Links"
            links={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/proprietes" },
            ]}
          />
          <MetaMenu
            title="Legal"
            links={[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms" },
            ]}
          />
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-background/20">
          <p className="text-background/60 font-nunito-sans text-sm">
            {COPYRIGHT.text} {COPYRIGHT.year} {COPYRIGHT.company}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FrontFooter;
