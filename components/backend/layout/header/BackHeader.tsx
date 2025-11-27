import LogoWithSettings from "@/components/shared/LogoWithSettings";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import NotificationArea from "./NotificationArea";
import UserArea from "./UserArea";

/**
 * BackHeader component
 * Server component that renders the backend header
 * Contains logo, notifications, theme toggle, and user area
 * @returns {Promise<JSX.Element>} The BackHeader component
 */
const BackHeader = async () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <LogoWithSettings />
      </div>
      <div className="flex items-center gap-1">
        <NotificationArea />
        <ThemeToggle />
        <UserArea />
      </div>
    </header>
  );
};

export default BackHeader;
