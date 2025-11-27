import FrontNavigation from "./FrontNavigation";
import LogoWithSettings from "@/components/shared/LogoWithSettings";

const FrontHeader = async () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <FrontNavigation logo={<LogoWithSettings />} />
    </header>
  );
};

export default FrontHeader;
