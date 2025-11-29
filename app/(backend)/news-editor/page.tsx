import PageHeader from "@/components/backend/layout/PageHeader";
import { adminGuard } from "@/server/auth/adminGuard";
import { Book } from "lucide-react";

/**
 * NewsPage component
 * Displays the news page
 * @returns The NewsPage component
 */

const NewsEditorPage = async () => {
  // Check if the user is an admin
  await adminGuard();
  return (
    <div>
      <PageHeader title="News" icon={Book} />
    </div>
  );
};

export default NewsEditorPage;
