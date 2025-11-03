import CustomLink from "./CustumLink";
import Logo from "./Logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const FrontNavigation = () => {
  return (
    <nav className="container mx-auto px-4 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 font-nunito-sans">
            <CustomLink href="/">Home</CustomLink>
            <CustomLink href="/about">About</CustomLink>
            <CustomLink href="/proprietes">Proprietes</CustomLink>
            <CustomLink href="/contact">Contact</CustomLink>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default FrontNavigation;
