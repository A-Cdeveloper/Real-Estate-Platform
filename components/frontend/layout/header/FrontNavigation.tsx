"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import DesktopNavigation from "./DesktopNavigation";
import Logo from "@/components/shared/Logo";
import MobileNavigation from "./MobileNavigation";

const FrontNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { refEl } = useOutsideClick(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  return (
    <nav
      ref={refEl}
      aria-label="Main navigation"
      className="container mx-auto px-4 lg:px-8"
    >
      <div className="flex h-16 items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4 md:gap-10">
          <DesktopNavigation />

          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="md:hidden font-nunito-sans"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default FrontNavigation;
