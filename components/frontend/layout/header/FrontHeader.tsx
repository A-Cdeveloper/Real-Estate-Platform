import FrontNavigation from "./FrontNavigation";

const FrontHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <FrontNavigation />
    </header>
  );
};

export default FrontHeader;
