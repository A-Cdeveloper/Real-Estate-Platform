import { NAVIGATION_LINKS } from "@/lib/constants";
import CustomLink from "./CustumLink";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  return (
    <div
      className={`md:hidden border bg-background fixed top-16 right-0 mr-[4px] z-50 w-[200px] transition-opacity duration-500 ease-in-out  ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
      role="menu"
    >
      <div className="flex flex-col [&>*:not(:last-child)]:border-b [&>*]:uppercase [&>*]:px-3 [&>*]:py-3 [&>*]:hover:bg-secondary">
        {NAVIGATION_LINKS.map((link) => (
          <CustomLink key={link.href} href={link.href} onClick={onClose}>
            {link.label}
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
